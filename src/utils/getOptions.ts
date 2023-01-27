import {R4} from "@ahryman40k/ts-fhir-types";
import {getControlType} from "../utils";
import {EXTENSION_CHECKBOX} from "../constants";

const getOptions = (item: R4.IQuestionnaire_Item) => {
  let enumOptions: (string|number)[] = [];
  let enumNames: string[] = [];

  if (typeof item.answerOption !== 'undefined') {
    item.answerOption?.forEach(function(choice, _) {
      let code =
        typeof choice.valueCoding === 'undefined'
          ? ''
          : getControlType(item) === 'integer'
            ? choice.valueCoding.code && parseInt(choice.valueCoding.code)
            : choice.valueCoding.code?.toString();

      enumOptions.push(typeof code === 'undefined' ? '' : code);

      let display = choice.valueCoding?.display?.toString();
      if (display !== undefined) {
        enumNames.push(display);
      }
    });

    const options = {
      enum: enumOptions,
      enumNames,
    }

    const ext: R4.IExtension = (item.extension || [])[0]
    const coding: R4.ICoding = (ext?.valueCodeableConcept?.coding || [])[0]

    if (coding?.code === EXTENSION_CHECKBOX) {
      return {
        uniqueItems: true,
        items: {
          type: "string",
          ...options
        }
      }
    }

    return options;
  }
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._choice ||
  //   item.type == R4.Questionnaire_ItemTypeKind._openChoice
  // ) {
  //   return 'select';
  // }
  // if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
  //   return 'boolean';
  // }
  return '';
};


export {getOptions}