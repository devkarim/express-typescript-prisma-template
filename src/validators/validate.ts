import { Schemas, validate as zodValidate } from "zod-express-validator";

const validate = <P, Q extends PropertyDescriptor & ThisType<any>, B, R>(
  schemas: Schemas<P, Q, B, R>
) => zodValidate(schemas);

export default validate;
