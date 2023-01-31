import {processQuestionnaireItem} from "../utils";
import {R4} from "@ahryman40k/ts-fhir-types";

type OneOfBooleanAnswersProps = {
  questionnaireItem: R4.IQuestionnaire_Item
  itemToBeDynamicallyRendered: R4.IQuestionnaire_Item
}

type RangeProps = {
  operator?: 'exists' | '=' | '!=' | '>' | '<' | '>=' | '<=',
  value?: string | number
  answerType?: 'answerInteger'
}

// https://json-schema.org/understanding-json-schema/reference/numeric.html#range
type SupportedRanges = {
  // x ≥ minimum
  minimum?: string | number,
  // x ≤ maximum
  maximum?: string | number,
  // x > exclusiveMinimum
  exclusiveMinimum?: string | number,
  // x < exclusiveMaximum
  exclusiveMaximum?: string | number,
}

type ReturnRangeProps = {
  valid: SupportedRanges,
  invalid: SupportedRanges
}

function range({operator, value, answerType}: RangeProps): ReturnRangeProps {
  const noRange = {
    valid: {},
    invalid: {}
  }
  if(!operator || !value) return noRange

  if (answerType === 'answerInteger') {

    switch (operator) {
      case '=':
        return {
          valid: {
            minimum: value,
            maximum: value
          },
          invalid: {
            exclusiveMaximum: value,
            exclusiveMinimum: value
          },
        }
      case '!=':
        return {
          valid: {
            exclusiveMaximum: value,
            exclusiveMinimum: value,
          },
          invalid: {
            minimum: value,
            maximum: value
          },
        }
      case '>':
        return {
          valid: {
            exclusiveMinimum: value
          },
          invalid: {
            maximum: value
          }
        }
      case '<':
        return {
          valid: {
            exclusiveMaximum: value,
          },
          invalid: {
            minimum: value
          }
        }
      case '>=':
        return {
          valid: {
            minimum: value
          },
          invalid: {
            exclusiveMaximum: value
          }
        };
      case '<=':
        return {
          valid: {
            maximum: value
          },
          invalid: {
            exclusiveMinimum: value
          }
        };
    }
  }

  return noRange;
}


const oneOfIntegerAnswers = ({questionnaireItem, itemToBeDynamicallyRendered}: OneOfBooleanAnswersProps) => {
  if(!itemToBeDynamicallyRendered?.enableWhen?.[0]) return [];
  const {answerInteger, operator} = itemToBeDynamicallyRendered.enableWhen[0];

  const rangeValue = range({operator, value: answerInteger, answerType: 'answerInteger'})

  return [
    {
      properties: {
        [questionnaireItem.linkId as string]: {
          type: "integer",
          ...rangeValue.invalid
        }
      },
    },
    {
      properties: {
        [questionnaireItem.linkId as string]: {
          type: "integer",
          ...rangeValue.valid
        },
        [itemToBeDynamicallyRendered.linkId as string]: processQuestionnaireItem(itemToBeDynamicallyRendered)
      }
    }
  ]
}

export {oneOfIntegerAnswers}