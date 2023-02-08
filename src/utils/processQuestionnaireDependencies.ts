import {R4} from "@ahryman40k/ts-fhir-types";
import {processQuestionnaireItem, range} from "../utils";

const processQuestionnaireDependencies = (items: R4.IQuestionnaire_Item[]) => {
  const itemsWithEnableWhen = items.filter(item => item.enableWhen);
  const dependencies = itemsWithEnableWhen.reduce((previousItem, itemToBeDynamicallyRendered) => {
    let tempThen = {}
    let tempIf = {}

    const dynamicIfThenElse: any = itemToBeDynamicallyRendered?.enableWhen?.reduce((existingConditions: any, currentCondition: R4.IQuestionnaire_EnableWhen) => {

      const questionnaireItem = items.find(item => item.linkId === currentCondition.question)

      if (!questionnaireItem) return existingConditions;

      tempIf = {
        ...tempIf,
        [questionnaireItem.linkId as string]: {
          ...(currentCondition.hasOwnProperty('answerBoolean') && {enum: [currentCondition.answerBoolean]}),
          ...(currentCondition.hasOwnProperty('answerInteger') && {...range({
              operator: currentCondition.operator,
              value: currentCondition.answerInteger,
              answerType: 'answerInteger'
            })})
        }
      }

      tempThen = {
        ...tempThen,
        [itemToBeDynamicallyRendered.linkId as string]: processQuestionnaireItem(itemToBeDynamicallyRendered)
      }

      return {
        [questionnaireItem.linkId as string]: {
          if: {
            properties: tempIf
          },
          then: {
            properties: tempThen
          }
        }
      }
    }, [])

    if(!dynamicIfThenElse || dynamicIfThenElse.length === 0) return previousItem;

    return {
      ...previousItem,
      ...dynamicIfThenElse
    }
  }, {})

  return dependencies;
}

export {processQuestionnaireDependencies}