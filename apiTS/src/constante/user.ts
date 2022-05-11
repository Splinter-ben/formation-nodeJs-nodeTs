/**
 * @desc constantes mostly dealing with the user environement, as there is no "final" in TypeScript
 */
 export namespace UserValidator {
    export const SALT_WORK_FACTOR: number = 10;
    export const EMAIL_REGEX: RegExp = new RegExp(
      /^(([^<>()[]\\.,;:s@"]+(.[^<>()[]\\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/
    );
  }
  