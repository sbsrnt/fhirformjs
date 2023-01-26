export default interface FhirJsonSchema {
  type?: string;
  title?: string;
  properties?: any;
  dependencies?: any;
  required?: string[];
}
