import {R4} from "@ahryman40k/ts-fhir-types";
import {extensionToWidget} from "../constants";

const getWidget = (item: R4.IQuestionnaire_Item) => {
  if (
    item.type === R4.Questionnaire_ItemTypeKind._date ||
    item.type === R4.Questionnaire_ItemTypeKind._dateTime ||
    item.type === R4.Questionnaire_ItemTypeKind._time
  ) {
    return 'datetime';
  }
  if (
    item.type == R4.Questionnaire_ItemTypeKind._choice ||
    item.type == R4.Questionnaire_ItemTypeKind._openChoice ||
    item.type == R4.Questionnaire_ItemTypeKind._integer
  ) {
    const ext: R4.IExtension = (item.extension || [])[0]
    const coding: R4.ICoding = (ext?.valueCodeableConcept?.coding || [])[0]

    if (coding?.code && extensionToWidget[coding?.code]) {
      return extensionToWidget[coding?.code]
    }
  }
  // if (item.type === R4.Questionnaire_ItemTypeKind._boolean) {
  //   return 'boolean';
  // }
  return '';
};


export {getWidget}