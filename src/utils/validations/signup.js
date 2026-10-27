import { signupSchema } from './signup.schema'

export const firstName = (value) => {
  const res = signupSchema.shape.firstName.safeParse(value)
  return !res.success ? res.error.issues[0]?.message ?? '' : ''
}

export const lastName = (value) => {
  const res = signupSchema.shape.lastName.safeParse(value)
  return !res.success ? res.error.issues[0]?.message ?? '' : ''
}

export const email = (value) => {
  const res = signupSchema.shape.email.safeParse(value)
  return !res.success ? res.error.issues[0]?.message ?? '' : ''
}

export const password = (value) => {
  const res = signupSchema.shape.password.safeParse(value)
  return !res.success ? res.error.issues[0]?.message ?? '' : ''
}

export const confirmPassword = (value, data) => {
  const res = signupSchema.shape.confirmPassword.safeParse(value)

  if (!res.success) {
    return res.error.issues[0]?.message ?? ''
  }
  if (value !== data.password) {
    return 'common.errorMessages.passwordsDontMatch'
  }

  return ''
}
