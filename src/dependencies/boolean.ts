import {processQuestionnaireItem} from "../utils";

const oneOfBooleanAnswers = ({questionnaireItem, itemToBeDynamicallyRendered}) => ([
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