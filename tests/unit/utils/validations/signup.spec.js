import {
  firstName,
  lastName,
  email,
  password,
  confirmPassword
} from '~/utils/validations/signup'

const emptyField = 'common.errorMessages.emptyField'
const nameLength = 'common.errorMessages.nameLength'
const nameAlphabeticOnly = 'common.errorMessages.nameAlphabeticOnly'
const emailValid = 'common.errorMessages.emailValid'
const passwordLength = 'common.errorMessages.passwordLength'
const passwordValid = 'common.errorMessages.passwordValid'
const passwordsDontMatch = 'common.errorMessages.passwordsDontMatch'

describe('signup validations', () => {
  describe.each([
    ['firstName', firstName],
    ['lastName', lastName]
  ])('%s', (_label, validate) => {
    it('should return emptyField for empty value', () => {
      expect(validate('')).toBe(emptyField)
    })

    it('should return nameLength for value shorter than 2', () => {
      expect(validate('a')).toBe(nameLength)
    })

    it('should return nameLength for value longer than 15', () => {
      expect(validate('abcdefghijklmnop')).toBe(nameLength)
    })

    it('should return nameAlphabeticOnly for non-alphabetic characters', () => {
      expect(validate('Ann2')).toBe(nameAlphabeticOnly)
      expect(validate('Ann-')).toBe(nameAlphabeticOnly)
    })

    it('should return empty string for valid names', () => {
      expect(validate('Ann')).toBe('')
      expect(validate('abcdefghijklmno')).toBe('')
      expect(validate('Іван')).toBe('')
      expect(validate('Mary Ann')).toBe('')
    })
  })

  describe('email', () => {
    it('should return emptyField for empty value', () => {
      expect(email('')).toBe(emptyField)
    })

    it('should return emailValid for invalid emails', () => {
      expect(email('a@')).toBe(emailValid)
      expect(email('a@b')).toBe(emailValid)
      expect(email('user@domain')).toBe(emailValid)
    })

    it('should return empty string for valid email', () => {
      expect(email('test@mail.com')).toBe('')
    })
  })

  describe('password', () => {
    it('should return emptyField for empty value', () => {
      expect(password('')).toBe(emptyField)
    })

    it('should return passwordLength for too short value', () => {
      expect(password('Ab1')).toBe(passwordLength)
    })

    it('should return passwordLength for too long value', () => {
      expect(password(`${'a'.repeat(25)}1`)).toBe(passwordLength)
    })

    it('should return passwordValid when missing digit or letter', () => {
      expect(password('abcdefgh')).toBe(passwordValid)
      expect(password('12345678')).toBe(passwordValid)
    })

    it('should return passwordValid when value contains spaces', () => {
      expect(password('abcd efg1')).toBe(passwordValid)
    })

    it('should return empty string for valid password', () => {
      expect(password('12345678a')).toBe('')
      expect(password('Пароль123')).toBe('')
    })
  })

  describe('confirmPassword', () => {
    it('should return emptyField for empty value', () => {
      expect(confirmPassword('', { password: '12345678a' })).toBe(emptyField)
    })

    it('should return passwordLength for too short value', () => {
      expect(confirmPassword('Ab1', { password: '12345678a' })).toBe(
        passwordLength
      )
    })

    it('should return passwordsDontMatch when values differ', () => {
      expect(confirmPassword('12345678a', { password: '12345678b' })).toBe(
        passwordsDontMatch
      )
    })

    it('should return empty string when values match', () => {
      expect(confirmPassword('12345678a', { password: '12345678a' })).toBe('')
    })
  })
})
