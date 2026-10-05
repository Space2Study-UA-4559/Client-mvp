import { screen } from '@testing-library/react'
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
})
