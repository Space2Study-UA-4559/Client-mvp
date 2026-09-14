import { useState } from 'react'
import { fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import LanguageStep from '~/containers/tutor-home-page/language-step/LanguageStep'
import { StepProvider, useStepContext } from '~/context/step-context'
import { renderWithProviders } from '~tests/test-utils'

const StepContent = () => {
  const [showLanguage, setShowLanguage] = useState(true)
  const { stepData } = useStepContext()

  return (
    <>
      <button onClick={() => setShowLanguage(!showLanguage)}>
        Change step
      </button>
      <output data-testid='selected-language'>
        {stepData.language ?? 'null'}
      </output>
      {showLanguage && <LanguageStep stepLabel='language' />}
    </>
  )
}

const renderStep = (subjectLabel = 'subjects') =>
  renderWithProviders(
    <StepProvider
      initialValues={{}}
      stepLabels={['generalInfo', subjectLabel, 'language', 'photo']}
    >
      <StepContent />
    </StepProvider>
  )

describe('LanguageStep', () => {
  it('shows six languages and reveals the rest at the bottom of the list', () => {
    renderStep()
    userEvent.click(screen.getByRole('combobox'))
    expect(screen.getAllByRole('option')).toHaveLength(6)

    const listbox = screen.getByRole('listbox')
    Object.defineProperties(listbox, {
      clientHeight: { value: 288 },
      scrollHeight: { value: 336 }
    })
    fireEvent.scroll(listbox, { target: { scrollTop: 24 } })

    expect(screen.getAllByRole('option')).toHaveLength(7)
    expect(listbox.scrollTop).toBe(24)
    expect(screen.getByRole('option', { name: 'Arabic' })).toBeInTheDocument()
  })

  it('searches languages that have not been displayed yet', () => {
    renderStep()
    userEvent.type(screen.getByRole('combobox'), 'arab')

    expect(screen.getAllByRole('option')).toHaveLength(1)
    expect(screen.getByRole('option', { name: 'Arabic' })).toBeInTheDocument()
  })

  it('allows selecting the last language with the keyboard', () => {
    renderStep()
    const input = screen.getByRole('combobox')
    userEvent.click(input)
    for (let index = 0; index < 7; index++) {
      fireEvent.keyDown(input, { key: 'ArrowDown' })
    }
    fireEvent.keyDown(input, { key: 'Enter' })

    expect(input).toHaveValue('Arabic')
    expect(screen.getByTestId('selected-language')).toHaveTextContent('Arabic')
  })

  it('searches, selects and clears a language in the step context', () => {
    renderStep()
    const input = screen.getByRole('combobox')

    userEvent.type(input, 'ukr')
    expect(screen.getAllByRole('option')).toHaveLength(1)
    fireEvent.click(screen.getByRole('option', { name: 'Ukrainian' }))

    expect(input).toHaveValue('Ukrainian')
    expect(screen.getByTestId('selected-language')).toHaveTextContent(
      'Ukrainian'
    )

    userEvent.click(screen.getByTitle('Clear'))
    expect(input).toHaveValue('')
    expect(screen.getByTestId('selected-language')).toHaveTextContent('null')
  })

  it('does not save text that is not a language option', () => {
    renderStep()
    const input = screen.getByRole('combobox')

    userEvent.type(input, 'unknown language')
    expect(
      screen.getByText('becomeTutor.languages.noOptions')
    ).toBeInTheDocument()
    fireEvent.blur(input)

    expect(screen.getByTestId('selected-language')).toHaveTextContent('null')
  })

  it.each(['subjects', 'interests'])(
    'preserves the language between steps for the %s stepper',
    (subjectLabel) => {
      renderStep(subjectLabel)
      fireEvent.mouseDown(screen.getByRole('combobox'))
      fireEvent.scroll(screen.getByRole('listbox'))
      fireEvent.click(screen.getByRole('option', { name: 'Arabic' }))

      fireEvent.click(screen.getByRole('button', { name: 'Change step' }))
      expect(screen.queryByRole('combobox')).not.toBeInTheDocument()
      fireEvent.click(screen.getByRole('button', { name: 'Change step' }))

      expect(screen.getByRole('combobox')).toHaveValue('Arabic')
    }
  )
})
