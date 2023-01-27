import {R4} from "@ahryman40k/ts-fhir-types";
import {EXTENSION_CHECKBOX, EXTENSION_SLIDER} from "../constants";

const getControlType = (item: R4.IQuestionnaire_Item) => {
  // if (
  //   item.type == R4.Questionnaire_ItemTypeKind._date ||
  //   item.type == R4.Questionnaire_ItemTypeKind._dateTime ||
  //   item.type == R4.Questionnaire_ItemTypeKind._time
  // ) {
  //   return 'dateTimePicker';
  // }

  if (
    item.type == R4.Questionnaire_ItemTypeKind._choice ||
    item.type == R4.Questionnaire_ItemTypeKind._openChoice
  ) {
    const ext: R4.IExtension = (item.extension || [])[0]
    const coding: R4.ICoding = (ext?.valueCodeableConcept?.coding || [])[0]

    if (coding?.code === EXTENSION_CHECKBOX) {
      return 'array'
    }

    if (coding?.code === EXTENSION_SLIDER) {
      return 'integer'
    }
  }

  if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
    return 'boolean';
  }

  if (item.type == R4.Questionnaire_ItemTypeKind._decimal) {
    return 'number';
  }

  if (item.type == R4.Questionnaire_ItemTypeKind._integer) {
    return 'integer';
  }

  return 'string';
};

export {getControlType}