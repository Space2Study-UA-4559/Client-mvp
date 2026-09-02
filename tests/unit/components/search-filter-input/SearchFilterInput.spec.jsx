import { fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'

import SearchFilterInput from '~/components/search-filter-input/SearchFilterInput'
import { renderWithProviders } from '~tests/test-utils'

vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => key
  })
}))

describe('SearchFilterInput component', () => {
  const updateFilter = vi.fn()
  const textFieldProps = {
    placeholder: 'Search...'
  }

  beforeEach(() => {
    vi.clearAllMocks()

    renderWithProviders(
      <SearchFilterInput
        textFieldProps={textFieldProps}
        updateFilter={updateFilter}
      />
    )
  })

  it('should render component with input in it', () => {
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('should render typed text correctly', () => {
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, {
      target: { value: 'React' }
    })

    expect(input).toHaveValue('React')
  })

  it('should delete typed text when delete button is clicked', () => {
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, {
      target: { value: 'React' }
    })

    fireEvent.click(screen.getByTestId('clearIcon'))

    expect(input).toHaveValue('')
    expect(updateFilter).toHaveBeenCalledWith('')
  })

  it('should call updateFilter function on search button click', () => {
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, {
      target: { value: 'React' }
    })

    fireEvent.click(screen.getByText('common.search'))

    expect(updateFilter).toHaveBeenCalledWith('React')
  })

  it('should call updateFilter function when enter is pressed', () => {
    const input = screen.getByPlaceholderText('Search...')

    fireEvent.change(input, {
      target: { value: 'React' }
    })

    fireEvent.keyPress(input, {
      key: 'Enter',
      code: 'Enter',
      charCode: 13
    })

    expect(updateFilter).toHaveBeenCalledWith('React')
  })
})
