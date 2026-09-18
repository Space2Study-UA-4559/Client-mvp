import CloseIcon from '@mui/icons-material/Close'
import { Box, IconButton } from '@mui/material'
import { useTranslation } from 'react-i18next'
import AppButton from '~/components/app-button/AppButton'
import ImgTitleDescription from '~/components/img-title-description/ImgTitleDescription'
import { styles } from '~/containers/guest-home-page/notification-modal/NotificationModal.styles'
import info from '~/assets/img/guest-home-page/info.svg'

const NotificationModal = ({ onClose, email }) => {
  const { t } = useTranslation()
  const handleClose = (event) => {
    event.stopPropagation()
    onClose()
  }
  const handleContentClick = (event) => {
    event.stopPropagation()
  }
  return (
    <Box onClick={handleContentClick} sx={styles.root}>
      <IconButton
        aria-label='close'
        onClick={handleClose}
        sx={styles.iconButton}
      >
        <CloseIcon />
      </IconButton>
      <ImgTitleDescription
        description={`${t('signup.confirmEmailMessage')} ${email} ${t(
          'signup.confirmEmailDesc'
        )}`}
        img={info}
        style={styles.imgTitleDesc}
        title={t('signup.confirmEmailTitle')}
      />
      <AppButton onClick={onClose}>{t('common.confirmButton')}</AppButton>
    </Box>
  )
}

export default NotificationModal
