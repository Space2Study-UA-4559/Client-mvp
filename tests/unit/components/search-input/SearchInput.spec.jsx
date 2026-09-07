import { expect, test, vi } from 'vitest'
import SearchInput from '~/components/search-input/SearchInput'
import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'

test('renders search text correctly', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchInput search='math' setSearch={setSearch} />)
  const input = screen.getByRole('textbox')
  expect(input).toBeInTheDocument()
  expect(input).toHaveValue('math')
})
test('calls setSearch when search icon is clicked', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchInput search='' setSearch={setSearch} />)
  const input = screen.getByRole('textbox')
  const searchBtn = screen.getByTestId('search-icon')
  fireEvent.change(input, {
    target: { value: 'Math' }
  })
  fireEvent.click(searchBtn)
  expect(setSearch).toHaveBeenCalledWith('Math')
})
test('calls setSearch with empty string', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchInput search='Math' setSearch={setSearch} />)
  const deleteBtn = screen.getByTestId('delete-icon')
  fireEvent.click(deleteBtn)
  expect(setSearch).toHaveBeenCalledWith('')
})
test('calls setSearch when enter is pressed', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchInput search='Math' setSearch={setSearch} />)
  const input = screen.getByRole('textbox')
  fireEvent.keyPress(input, {
    key: 'Enter',
    code: 'Enter',
    charCode: 13
  })
  expect(setSearch).toHaveBeenCalledWith('Math')
})
test('should have hidden class if search is empty', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchInput search='' setSearch={setSearch} />)
  const deleteBtn = screen.getByTestId('delete-icon')
  expect(deleteBtn).toHaveClass('hidden')
})
test('should have visible class if search is not empty', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchInput search='Math' setSearch={setSearch} />)
  const deleteBtn = screen.getByTestId('delete-icon')
  expect(deleteBtn).toHaveClass('visible')
})
