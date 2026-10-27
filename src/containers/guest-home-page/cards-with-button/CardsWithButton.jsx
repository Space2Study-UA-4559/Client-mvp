import { useTranslation } from 'react-i18next'
import Transition from 'react-transition-group/Transition'

import Box from '@mui/material/Box'
import dots from '~/assets/img/guest-home-page/dots.svg'
import AppButton from '~/components/app-button/AppButton'
import TitleWithDescription from '~/components/title-with-description/TitleWithDescription'
import SignupDialog from '~/containers/guest-home-page/signup-dialog/SignupDialog'

import { styles } from '~/containers/guest-home-page/cards-with-button/CardsWithButton.styles'
import { useModalContext } from '~/context/modal-context'

const CardsWithButton = ({ array, btnText, isStudent, role }) => {
  const { t } = useTranslation()
  const { openModal } = useModalContext()

  const cards = (state) =>
    array.map((item, key) => {
      const boxSide = key % 2 === 0 ? 'right' : 'left'

      return (
        <Box
          key={item.title}
          sx={[
            styles[boxSide].box,
            state === 'exiting' && styles[boxSide].slidesIn,
            state === 'entering' && styles[boxSide].slidesIn
          ]}
        >
          <Box sx={styles[boxSide].clearBox} />
          <Box sx={styles.image}>
            <Box component='img' src={item.image} />
            <Box className='dots' component='img' src={dots} />
          </Box>
          <TitleWithDescription
            description={t(item.description)}
            style={styles[boxSide]}
            title={t(item.title)}
          />
        </Box>
      )
    })

  return (
    <>
      <Transition in={isStudent} timeout={300}>
        {(state) => cards(state)}
      </Transition>
      <AppButton
        onClick={() => openModal({ component: <SignupDialog type={role} /> })}
        size={'extraLarge'}
        sx={styles.button}
      >
        {btnText}
      </AppButton>
    </>
  )
}

export default CardsWithButton
