const EXTENSION_DROPDOWN = 'drop-down'
const EXTENSION_RADIOBUTTON = 'radio-button'
const EXTENSION_CHECKBOX = 'check-box'
const EXTENSION_SLIDER = 'slider'

const extensionToWidget = {
  [EXTENSION_DROPDOWN]: 'select',
  [EXTENSION_RADIOBUTTON]: 'radio',
  [EXTENSION_CHECKBOX]: 'checkboxes',
  [EXTENSION_SLIDER]: 'range'
}

export {
  EXTENSION_SLIDER,
  EXTENSION_CHECKBOX,
  EXTENSION_DROPDOWN,
  EXTENSION_RADIOBUTTON,
  extensionToWidget
}