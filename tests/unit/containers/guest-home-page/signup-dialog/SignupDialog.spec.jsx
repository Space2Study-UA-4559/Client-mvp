import { fireEvent, screen } from '@testing-library/react'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'
import { student, tutor } from '~/constants'
import { renderWithProviders } from '~tests/test-utils'

describe('SignupDialog', () => {
  it('should render student title and image', () => {
    renderWithProviders(<SignupDialog type={student} />)

    expect(screen.getByText('signup.head.student')).toBeInTheDocument()
    expect(screen.getByAltText('signup')).toBeInTheDocument()
  })

  it('should render tutor title', () => {
    renderWithProviders(<SignupDialog type={tutor} />)

    expect(screen.getByText('signup.head.tutor')).toBeInTheDocument()
  })

  it('should render signup form fields', () => {
    renderWithProviders(<SignupDialog type={student} />)

    expect(
      screen.getByLabelText(/common.labels.firstName/i)
    ).toBeInTheDocument()
    expect(screen.getByLabelText(/common.labels.lastName/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/common.labels.email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/common.labels.password/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/common.labels.confirmPassword/i)
    ).toBeInTheDocument()
  })

  it('should render agreement text and google signup section', () => {
    renderWithProviders(<SignupDialog type={student} />)

    expect(screen.getByText(/signup.iAgree/i)).toBeInTheDocument()
    expect(screen.getByText('common.labels.terms')).toBeInTheDocument()
    expect(screen.getByText('common.labels.privacyPolicy')).toBeInTheDocument()
    expect(screen.getByText('signup.continue')).toBeInTheDocument()
    expect(screen.getByText('signup.haveAccount')).toBeInTheDocument()
    expect(screen.getByText('signup.joinUs')).toBeInTheDocument()
  })

  it('should keep sign up button disabled', () => {
    renderWithProviders(<SignupDialog type={student} />)

    expect(
      screen.getByText('common.labels.signup').closest('button')
    ).toBeDisabled()
  })

  it('should show emptyField error on first name blur', () => {
    renderWithProviders(<SignupDialog type={student} />)

    fireEvent.focusOut(screen.getByLabelText(/common.labels.firstName/i))

    expect(
      screen.getByText('common.errorMessages.emptyField')
    ).toBeInTheDocument()
  })

  it('should show emailValid error for invalid email', () => {
    renderWithProviders(<SignupDialog type={student} />)

    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    fireEvent.change(inputEmail, { target: { value: 'invalid' } })
    fireEvent.focusOut(inputEmail)

    expect(
      screen.getByText('common.errorMessages.emailValid')
    ).toBeInTheDocument()
  })

  it('should show passwordsDontMatch when confirm password differs', () => {
    renderWithProviders(<SignupDialog type={student} />)

    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    const inputConfirmPassword = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )

    fireEvent.change(inputPassword, { target: { value: '12345678a' } })
    fireEvent.change(inputConfirmPassword, { target: { value: '12345678b' } })
    fireEvent.focusOut(inputConfirmPassword)

    expect(
      screen.getByText('common.errorMessages.passwordsDontMatch')
    ).toBeInTheDocument()
  })

  it('should not show validation errors for valid field values', () => {
    renderWithProviders(<SignupDialog type={student} />)

    const inputFirstName = screen.getByLabelText(/common.labels.firstName/i)
    const inputLastName = screen.getByLabelText(/common.labels.lastName/i)
    const inputEmail = screen.getByLabelText(/common.labels.email/i)
    const inputPassword = screen.getByLabelText(/common.labels.password/i)
    const inputConfirmPassword = screen.getByLabelText(
      /common.labels.confirmPassword/i
    )

    fireEvent.change(inputFirstName, { target: { value: 'Ann' } })
    fireEvent.focusOut(inputFirstName)
    fireEvent.change(inputLastName, { target: { value: 'Smith' } })
    fireEvent.focusOut(inputLastName)
    fireEvent.change(inputEmail, { target: { value: 'test@mail.com' } })
    fireEvent.focusOut(inputEmail)
    fireEvent.change(inputPassword, { target: { value: '12345678a' } })
    fireEvent.focusOut(inputPassword)
    fireEvent.change(inputConfirmPassword, { target: { value: '12345678a' } })
    fireEvent.focusOut(inputConfirmPassword)

    expect(
      screen.queryByText('common.errorMessages.emptyField')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('common.errorMessages.emailValid')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('common.errorMessages.passwordValid')
    ).not.toBeInTheDocument()
    expect(
      screen.queryByText('common.errorMessages.passwordsDontMatch')
    ).not.toBeInTheDocument()
  })
})
