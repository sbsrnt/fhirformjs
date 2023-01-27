import {R4} from "@ahryman40k/ts-fhir-types";
import {processQuestionnaireItem, getOptions} from "../utils";

/**
 * Takes a R4.IQuestionnaire_Item and returns an extended FhirJsonField
 * @param {R4.IQuestionnaire_Item} item
 *
 * @returns {FhirJsonField} properties
 */
const getItemProperties = (item: R4.IQuestionnaire_Item) => {
  const properties = processQuestionnaireItem(item);
  const itemOptions = getOptions(item);
  if (itemOptions !== '') {
    return { ...properties, ...itemOptions };
  }

  return properties;
};

export {getItemProperties}