import * as yup from 'yup';

export default yup
  .array()
  .of(
    yup.object({
      type: yup.string().required(),
      data: yup.object().nullable(),
    }),
  );
