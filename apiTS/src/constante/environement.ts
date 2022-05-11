/**
 * @desc constantes you need for the dabatabase as there is no "final" in TypeScript
 */
export namespace Environement {
  export const PORT: string = process.env.PORT!;
  export const HOST: string = process.env.DB_HOST_ATLAS!;
  export const PASSWORD: string = process.env.DB_PASSWORD!;
  export const BDD_NAME: string = process.env.DB_NAME!;
  export const BDD_URI: string = `mongodb+srv://${HOST}:${PASSWORD}@mongocluster-h3gqv.mongodb.net/${BDD_NAME}?retryWrites=true&w=majority`;
}
