import {R4} from "@ahryman40k/ts-fhir-types";

const getValueType = (item: R4.IQuestionnaire_Item) => {
  switch (item.type) {
    case R4.Questionnaire_ItemTypeKind._date:
      return 'item.answer[0].valueDate';
    case R4.Questionnaire_ItemTypeKind._time:
      return 'item.answer[0].valueTime';
    case R4.Questionnaire_ItemTypeKind._dateTime:
      return 'item.answer[0].valueDateTime';
    case R4.Questionnaire_ItemTypeKind._integer:
      return 'item.answer[0].valueInteger';
    case R4.Questionnaire_ItemTypeKind._decimal:
      return 'item.answer[0].valueDecimal';
    case R4.Questionnaire_ItemTypeKind._boolean:
      return 'item.answer[0].valueBoolean';
    case R4.Questionnaire_ItemTypeKind._choice:
    case R4.Questionnaire_ItemTypeKind._openChoice:
      return 'item.answer[0].valueCoding'

    default:
      return 'item.answer[0].valueString';
  }
};

export {getValueType}