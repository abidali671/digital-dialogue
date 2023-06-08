export type JSONValue = {
  [key: string]: JSONValue | JSONValue[] | string | boolean | number;
};
