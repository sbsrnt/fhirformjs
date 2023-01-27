import {R4} from "@ahryman40k/ts-fhir-types";
import FhirJsonField from "field";
import {getControlType} from "../utils";

/**
 * Takes a R4.IQuestionnaire_Item and returns the VueFormGeneratorField
 * @param {R4.IQuestionnaire_Item} item
 *
 * @returns {VueFormGeneratorField}
 */
const processQuestionnaireItem = (item: R4.IQuestionnaire_Item) => {
  let ff_field: FhirJsonField = {
    type: getControlType(item),
    title: item.text?.toString(),
  };

  return ff_field;
};

export {processQuestionnaireItem}