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

function range({operator, value, answerType}: RangeProps): SupportedRanges {
  if(!operator || !value) return {}

  if (answerType === 'answerInteger') {

    switch (operator) {
      case '=':
        return {
          minimum: value,
          maximum: value
        }
      case '!=':
        return {
          exclusiveMaximum: value,
          exclusiveMinimum: value,
        }
      case '>':
        return {
          exclusiveMinimum: value
        }
      case '<':
        return {
          exclusiveMaximum: value,
        }
      case '>=':
        return {
          minimum: value
        };
      case '<=':
        return {
          maximum: value
        }
    }
  }

  return {};
}

export {range}