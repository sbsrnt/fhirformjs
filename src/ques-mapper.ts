// Copyright (c) 2020 Bell Eapen
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

import { R4 } from '@ahryman40k/ts-fhir-types';
import { uuid } from 'uuidv4';
import FhirJsonSchema from './schema';
import FhirForm from './fhirForm';
import {processQuestionnaireDependencies, getUIOptions, createResponseItem, getWidget, getItemProperties} from "./utils";

export const FhirJsonForm = (
  fhirQuestionnaire: R4.IQuestionnaire
): FhirForm => {
  let ALL_PROPERTIES: any = {};
  let dependencies: any = {};
  let requiredProperties: string[] = [];
  let UISchema: any = {};

  let fhirQuestionnaireResponse: R4.IQuestionnaireResponse = {
    resourceType: 'QuestionnaireResponse',
    item: [],
    status: R4.QuestionnaireResponseStatusKind._inProgress,
  };

  fhirQuestionnaire.item?.forEach(function(item, _, items) {
    // _ is the ignored index

    // Linked items in "enableWhen" need to be rendered dynamically thus can't be visible from the beginning
    // In that case we omit adding those items to the root properties object
    if (item?.enableWhen) return;

    // If the item is a group
    if (item.type === R4.Questionnaire_ItemTypeKind._group) {
      // Add legend to the group
      let groupProperty =
        typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();
      let groupTitle =
        typeof item.text === 'undefined' ? uuid() : item.text.toString();

      UISchema[groupProperty] = {};
      ALL_PROPERTIES[groupProperty] = {};
      ALL_PROPERTIES[groupProperty]['type'] = 'object';
      ALL_PROPERTIES[groupProperty]['title'] = groupTitle;
      ALL_PROPERTIES[groupProperty]['properties'] = {};

      // Get group items from outer item
      let groupItems: Array<R4.IQuestionnaire_Item> = [];

      if (item.item) groupItems = item.item;

      groupItems.forEach(function(groupItem, _) {
        let myProperty =
          typeof groupItem.linkId === 'undefined'
            ? uuid()
            : groupItem.linkId.toString();

        ALL_PROPERTIES[groupProperty]['properties'][
          myProperty
        ] = getItemProperties(groupItem);

        if (groupItem.required) {
          if (ALL_PROPERTIES[groupProperty]['required'] === undefined) {
            ALL_PROPERTIES[groupProperty]['required'] = []
          }
          ALL_PROPERTIES[groupProperty]['required'].push(myProperty)
        }

        UISchema[groupProperty][myProperty] = {};

        const uiWidget = getWidget(groupItem)
        if (uiWidget !== '') {
          UISchema[groupProperty][myProperty]['ui:widget'] = uiWidget;
        }
        
        const uiOptions = getUIOptions(groupItem)
        if (uiOptions && Object.keys(uiOptions).length) {
          UISchema[groupProperty][myProperty]['ui:options'] = uiOptions;

          if (uiOptions?.unit) {
            UISchema[groupProperty][myProperty]['ui:placeholder'] = uiOptions.unit
          }
        }

        fhirQuestionnaireResponse.item?.push(createResponseItem(groupItem));
      });

      item.required && requiredProperties.push(groupProperty)

      // Just push the fields if not a group
    } else {
      let myProperty =
        typeof item.linkId === 'undefined' ? uuid() : item.linkId.toString();

      ALL_PROPERTIES[myProperty] = getItemProperties(item);
      dependencies = processQuestionnaireDependencies(items)
      UISchema[myProperty] = {};

      const uiWidget = getWidget(item)
      if (uiWidget !== '') {
        UISchema[myProperty]['ui:widget'] = uiWidget;
      }

      const uiOptions = getUIOptions(item)
      if (uiOptions && Object.keys(uiOptions).length) {
        UISchema[myProperty]['ui:options'] = uiOptions;
      }

      fhirQuestionnaireResponse.item?.push(createResponseItem(item));

      item.required && requiredProperties.push(myProperty)
    }
  });

  const fhirJsonSchema: FhirJsonSchema = {
    type: 'object',
    title: fhirQuestionnaire.id?.toString(),
    properties: ALL_PROPERTIES,
    required: requiredProperties,
    dependencies
  };
  const fhirForm: FhirForm = {
    model: fhirQuestionnaireResponse,
    schema: fhirJsonSchema,
    uiSchema: UISchema,
  };
  return fhirForm;
};
