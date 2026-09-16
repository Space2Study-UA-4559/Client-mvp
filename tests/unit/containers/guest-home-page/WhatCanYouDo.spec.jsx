import { fireEvent, screen } from '@testing-library/react'
import { renderWithProviders } from '~tests/test-utils'
import WhatCanYouDo from '~/containers/guest-home-page/WhatCanYouDo'

describe('WhatCanYouDo component', () => {
  it('should open signup popup for tutor after click', async () => {
    renderWithProviders(<WhatCanYouDo />)

    const btn = screen.getByText(/guestHomePage.whatCanYouDo.teach.actionLabel/)
    fireEvent.click(btn)

    expect(await screen.findByTestId('popup')).toBeInTheDocument()
    expect(screen.getByText('signup.head.tutor')).toBeInTheDocument()
  })

  it('should open signup popup for student after click', async () => {
    renderWithProviders(<WhatCanYouDo />)

    const btn = screen.getByText(/guestHomePage.whatCanYouDo.learn.actionLabel/)
    fireEvent.click(btn)

    expect(await screen.findByTestId('popup')).toBeInTheDocument()
    expect(screen.getByText('signup.head.student')).toBeInTheDocument()
  })
})
