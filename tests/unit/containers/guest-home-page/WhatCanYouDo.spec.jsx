import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'

describe('WhatCanYoDo component', () => {
  it('should render action buttons without opening a popup', () => {
    renderWithProviders(<WhatCanYouDo />)

    const btn = screen.getByText(/guestHomePage.whatCanYouDo.teach.actionLabel/)
    fireEvent.click(btn)

    expect(screen.queryByTestId('popup')).not.toBeInTheDocument()
  })
})
