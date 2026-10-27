import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import { renderWithProviders } from '~tests/test-utils'

const errors = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const data = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  confirmPassword: '',
  iAgree: false
}

const handleChange = vi.fn()
const handleBlur = vi.fn()
const handleSubmit = vi.fn()

describe('SignupForm', () => {
  beforeEach(() => {
    handleChange.mockClear()
    handleBlur.mockClear()
    handleSubmit.mockClear()

    renderWithProviders(
      <SignupForm
        data={data}
        errors={errors}
        handleBlur={handleBlur}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    )
  })

  it('should render all signup fields', () => {
    expect(screen.getByTestId('first-name')).toBeInTheDocument()
    expect(screen.getByTestId('last-name')).toBeInTheDocument()
    expect(screen.getByTestId('email')).toBeInTheDocument()
    expect(screen.getByLabelText(/common.labels.password/i)).toBeInTheDocument()
    expect(
      screen.getByLabelText(/common.labels.confirmPassword/i)
    ).toBeInTheDocument()
  })

  it('should render agreement labels', () => {
    expect(screen.getByText(/signup.iAgree/i)).toBeInTheDocument()
    expect(screen.getByText('common.labels.terms')).toBeInTheDocument()
    expect(screen.getByText('common.labels.privacyPolicy')).toBeInTheDocument()
  })

  it('should keep sign up button disabled', () => {
    const button = screen.getByText('common.labels.signup').closest('button')

    expect(button).toBeDisabled()
  })

  it('should not submit when sign up button is clicked', () => {
    const button = screen.getByText('common.labels.signup').closest('button')
    fireEvent.click(button)

    expect(handleSubmit).not.toHaveBeenCalled()
  })
})
