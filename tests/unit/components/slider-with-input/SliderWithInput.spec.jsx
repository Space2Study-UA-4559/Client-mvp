import { fireEvent, screen, waitFor } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import { expect, vi } from 'vitest'
import SliderWithInput from '~/components/slider-with-input/SliderWithInput'

test('renders correctly', () => {
  const onChange = vi.fn()
  renderWithProviders(
    <SliderWithInput
      defaultValue={5}
      max={10}
      min={1}
      onChange={onChange}
      title='lorem ipsum'
    />
  )
  const slider = screen.getByRole('slider')
  const title = screen.getByText('lorem ipsum')
  const input = screen.getByRole('textbox')
  expect(slider).toBeInTheDocument()
  expect(title).toBeInTheDocument()
  expect(input).toHaveValue('5')
})
test('calls onChange when slider is moved', async () => {
  const onChange = vi.fn()
  renderWithProviders(
    <SliderWithInput
      defaultValue={5}
      max={10}
      min={1}
      onChange={onChange}
      title='lorem ipsum'
    />
  )
  const slider = screen.getByRole('slider')
  fireEvent.change(slider, { target: { value: '8' } })
  await waitFor(() => {
    expect(onChange).toHaveBeenCalledWith(8)
  })
})
test('updates inputValue correctly when input value is empty', () => {
  const onChange = vi.fn()
  renderWithProviders(
    <SliderWithInput
      defaultValue={5}
      max={10}
      min={1}
      onChange={onChange}
      title='lorem ipsum'
    />
  )
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: '' } })
  expect(input).toHaveValue('')
})
test('does not update price when input is blurred and value has not changed', () => {
  const onChange = vi.fn()
  renderWithProviders(
    <SliderWithInput
      defaultValue={5}
      max={10}
      min={1}
      onChange={onChange}
      title='lorem ipsum'
    />
  )
  const input = screen.getByRole('textbox')
  fireEvent.blur(input)
  expect(input).toHaveValue('5')
  expect(onChange).not.toHaveBeenCalled()
})
test('updates price when input is blurred and value is greater than max', () => {
  const onChange = vi.fn()
  renderWithProviders(
    <SliderWithInput
      defaultValue={5}
      max={10}
      min={1}
      onChange={onChange}
      title='lorem ipsum'
    />
  )
  const input = screen.getByRole('textbox')
  fireEvent.change(input, { target: { value: '15' } })
  fireEvent.blur(input)
  expect(input).toHaveValue('10')
})
