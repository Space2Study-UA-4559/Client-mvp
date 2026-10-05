import { fireEvent, screen } from '@testing-library/react'
import CardsWithButton from '~/containers/guest-home-page/cards-with-button/CardsWithButton'
import { renderWithProviders } from '~tests/test-utils'
import howItWorksTutorFirst from '~/assets/img/guest-home-page/howItWorksTutorFirst.svg'
import howItWorksTutorSecond from '~/assets/img/guest-home-page/howItWorksTutorSecond.svg'
import { tutor } from '~/constants'

describe('CardsWithButton container', () => {
  const items = [
    {
      image: howItWorksTutorFirst,
      title: 'guestHomePage.howItWorks.tutor.signUp.title',
      description: 'guestHomePage.howItWorks.tutor.signUp.description'
    },
    {
      image: howItWorksTutorSecond,
      title: 'guestHomePage.howItWorks.tutor.createATutorAccount.title',
      description:
        'guestHomePage.howItWorks.tutor.createATutorAccount.description'
    }
  ]

  it('should open signup popup after click', async () => {
    renderWithProviders(
      <CardsWithButton array={items} btnText={'Become a tutor'} role={tutor} />
    )

    const btn = screen.getByText('Become a tutor')
    fireEvent.click(btn)

    expect(await screen.findByTestId('popup')).toBeInTheDocument()
    expect(screen.getByText('signup.head.tutor')).toBeInTheDocument()
  })
})
