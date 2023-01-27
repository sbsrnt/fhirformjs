import {R4} from "@ahryman40k/ts-fhir-types";

type UIOptionsTypes = {
  unit?: string
  step?: number
  min?: number
  max?: number
}

const getUIOptions = (item: R4.IQuestionnaire_Item) => {
  const extensions = item.extension

  return extensions?.reduce((uiOptions: UIOptionsTypes, ext) => {
    const splitUrl = ext?.url?.split('/')
    const extensionName = splitUrl && splitUrl[splitUrl.length-1]

    switch (extensionName) {
      case 'questionnaire-unit':
        uiOptions['unit'] = ext?.valueCoding?.display
        break;
      case 'questionnaire-sliderStepValue':
        uiOptions['step'] = ext?.valueInteger
        break;
      case 'minValue':
        uiOptions['min'] = ext?.valueInteger
        break;
      case 'maxValue':
        uiOptions['max'] = ext?.valueInteger
        break;
      default:
        break
    }

    return uiOptions
  }, {})
}


export {getUIOptions}