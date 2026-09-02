import { expect, test, vi } from 'vitest'
import SearchAutocomplete from '~/components/search-autocomplete/SearchAutocomplete'
import { renderWithProviders } from '~tests/test-utils'
import { fireEvent, screen } from '@testing-library/react'

test('renders an empty search input', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchAutocomplete search='' setSearch={setSearch} />)
  const input = screen.getByRole('combobox')
  expect(input).toBeInTheDocument()
  expect(input).toHaveValue('')
})
test('updates search input on typing', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchAutocomplete search='' setSearch={setSearch} />)
  const input = screen.getByRole('combobox')
  fireEvent.change(input, {
    target: { value: 'Math' }
  })
  expect(input).toHaveValue('Math')
})
test('triggers search on search button click', () => {
  const setSearch = vi.fn()
  renderWithProviders(<SearchAutocomplete search='' setSearch={setSearch} />)
  const input = screen.getByRole('combobox')
  fireEvent.change(input, {
    target: { value: 'Math' }
  })
  const btnSearch = screen.getByRole('button', { name: 'common.search' })
  fireEvent.click(btnSearch)
  expect(setSearch).toHaveBeenCalledWith('Math')
})
test('clears search input on clear button click', () => {
  const setSearch = vi.fn()
  renderWithProviders(
    <SearchAutocomplete search='Math' setSearch={setSearch} />
  )
  const input = screen.getByRole('combobox')
  expect(input).toHaveValue('Math')
  const btnDelete = screen.getByRole('button', { name: '' })
  fireEvent.click(btnDelete)
  expect(input).toHaveValue('')
  expect(setSearch).toHaveBeenCalledWith('')
})
test('filters options on typing', () => {
  const setSearch = vi.fn()
  renderWithProviders(
    <SearchAutocomplete
      options={['Math', 'English', 'Code']}
      search=''
      setSearch={setSearch}
    />
  )
  const input = screen.getByRole('combobox')
  fireEvent.change(input, {
    target: { value: 'ma' }
  })
  expect(
    screen.getByRole('option', {
      name: 'Math'
    })
  ).toBeInTheDocument()
  expect(
    screen.queryByRole('option', {
      name: 'English'
    })
  ).not.toBeInTheDocument()
  expect(
    screen.queryByRole('option', {
      name: 'Code'
    })
  ).not.toBeInTheDocument()
})
test('selects an option on click', () => {
  const setSearch = vi.fn()
  renderWithProviders(
    <SearchAutocomplete
      options={['Math', 'English', 'Code']}
      search=''
      setSearch={setSearch}
    />
  )
  const input = screen.getByRole('combobox')
  fireEvent.change(input, {
    target: { value: 'ma' }
  })
  const elMath = screen.getByRole('option', {
    name: 'Math'
  })
  expect(elMath).toBeInTheDocument()
  fireEvent.click(elMath)
  expect(input).toHaveValue('Math')
  expect(setSearch).toHaveBeenCalledWith('Math')
})
