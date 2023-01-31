import {processQuestionnaireItem} from "../utils";
import {R4} from "@ahryman40k/ts-fhir-types";

type OneOfBooleanAnswersProps = {
  questionnaireItem: R4.IQuestionnaire_Item
  itemToBeDynamicallyRendered: R4.IQuestionnaire_Item
}

const oneOfBooleanAnswers = ({questionnaireItem, itemToBeDynamicallyRendered}: OneOfBooleanAnswersProps) => ([
  {
    properties: {
      [questionnaireItem.linkId as string]: {
        enum: [false],
      }
    }
  },
  {
    properties: {
      [questionnaireItem.linkId as string]: {
        enum: [true],
      },
      [itemToBeDynamicallyRendered.linkId as string]: processQuestionnaireItem(itemToBeDynamicallyRendered)
    }
  }
])

export {oneOfBooleanAnswers}