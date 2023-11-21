class StringUtils {
  /**
   * Determines whether the given object is a string.
   *
   * @param obj - The object to check.
   * @returns `true` if the object is a string, `false` otherwise.
   */
  public isString(obj: unknown): boolean {
    return typeof obj === 'string' || obj instanceof String;
  }
}

const stringUtils = new StringUtils();

export { stringUtils as StringUtils };
