import {R4} from "@ahryman40k/ts-fhir-types";
// import {oneOfBooleanAnswers} from "../dependencies";
import {oneOfIntegerAnswers} from "../dependencies";

const processQuestionnaireDependencies = (items: R4.IQuestionnaire_Item[]) => {
  const itemsWithEnableWhen = items.filter(item => item.enableWhen);

  const dependencies = itemsWithEnableWhen.reduce((previousItem, itemToBeDynamicallyRendered) => {
    let tempDependencies = {}

    const conditions: any = itemToBeDynamicallyRendered?.enableWhen?.reduce((existingConditions: any, currentCondition: R4.IQuestionnaire_EnableWhen) => {
      const questionnaireItem = items.find(item => item.linkId === currentCondition.question)

      if (!questionnaireItem) return existingConditions;

      const oneOf = oneOfIntegerAnswers({questionnaireItem, itemToBeDynamicallyRendered})

        tempDependencies = {
          ...tempDependencies,
          [questionnaireItem.linkId as string]: {
            oneOf
          }
        }

      return oneOf
    }, [])

    if(!conditions || conditions.length === 0) return previousItem;

    return {
      ...previousItem,
      ...tempDependencies
    }
  }, {})

  return dependencies;
}

export {processQuestionnaireDependencies}