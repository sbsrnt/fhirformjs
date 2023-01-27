import {R4} from "@ahryman40k/ts-fhir-types";
import {getValueType, getOnlyValueType} from "../utils";

const createResponseItem = (item: R4.IQuestionnaire_Item) => {
  let responseItem: R4.IQuestionnaireResponse_Item = {
    linkId: item.linkId,
    text: item.text,
    answer: [],
  };

  const key = getOnlyValueType(getValueType(item));
  let ans: R4.IQuestionnaireResponse_Answer = {};

  switch (item.type) {
    case R4.Questionnaire_ItemTypeKind._choice:
    case R4.Questionnaire_ItemTypeKind._openChoice:
      const option = (item.answerOption || [])[0]
      ans[key] = Object
        .keys(option?.valueCoding || {})
        .reduce((acc, prop) => ({...acc, [prop]: ''}), {})
      break;

    default:
      ans[key] = '';
      break;
  }

  responseItem.answer?.push(ans);
  return responseItem;
};


export {createResponseItem}