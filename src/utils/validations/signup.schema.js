import z from 'zod'

const emptyField = { message: 'common.errorMessages.emptyField' }

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(1, emptyField)
    .min(2, { message: 'common.errorMessages.nameLength' })
    .max(15, { message: 'common.errorMessages.nameLength' })
    .regex(/^[a-zа-яєії ]+$/i, {
      message: 'common.errorMessages.nameAlphabeticOnly'
    }),
  lastName: z
    .string()
    .min(1, emptyField)
    .min(2, { message: 'common.errorMessages.nameLength' })
    .max(15, { message: 'common.errorMessages.nameLength' })
    .regex(/^[a-zа-яєії ]+$/i, {
      message: 'common.errorMessages.nameAlphabeticOnly'
    }),
  email: z
    .string()
    .min(1, emptyField)
    .regex(
      /^([a-z\d]+([._-][a-z\d]+)*)@([a-z\d]+([.-][a-z\d]+)*\.[a-z]{2,})$/i,
      { message: 'common.errorMessages.emailValid' }
    ),
  password: z
    .string()
    .min(1, emptyField)
    .min(8, { message: 'common.errorMessages.passwordLength' })
    .max(25, { message: 'common.errorMessages.passwordLength' })
    .regex(/^(?=.*\d)(?=.*[a-zа-яєії])\S+$/i, {
      message: 'common.errorMessages.passwordValid'
    }),
  confirmPassword: z
    .string()
    .min(1, emptyField)
    .min(8, { message: 'common.errorMessages.passwordLength' })
    .max(25, { message: 'common.errorMessages.passwordLength' })
})
