import * as yup from "yup";

const loginSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup
    .string()
    .min(5, `Password's minimal length must be 5`)
    .max(12, `Password's maximal length must be 12`),
});

export default loginSchema;
