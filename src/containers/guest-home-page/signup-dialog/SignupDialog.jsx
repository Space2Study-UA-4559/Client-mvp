import { Box, Typography } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { tutor, signup } from '~/constants'
import tutorImg from '~/assets/img/signup-dialog/tutor.svg'
import studentImg from '~/assets/img/signup-dialog/student.svg'
import styles from '~/containers/guest-home-page/signup-dialog/SignupDialog.styles'
import SignupForm from '~/containers/guest-home-page/signup-form/SignupForm'
import useForm from '~/hooks/use-form'
import GoogleLogin from '~/containers/guest-home-page/google-login/GoogleLogin'

const SignupDialog = ({ type }) => {
  const { t } = useTranslation()

  const { data, errors, handleBlur, handleInputChange, handleSubmit } = useForm(
    {
      initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        iAgree: false
      }
    }
  )

  return (
    <Box sx={styles.root}>
      <Box sx={styles.imgContainer}>
        <Box
          alt='signup'
          component='img'
          src={type === tutor ? tutorImg : studentImg}
          sx={styles.img}
        />
      </Box>
      <Box sx={styles.formContainer}>
        <Typography sx={styles.title} variant='h4'>
          {type === tutor ? t('signup.head.tutor') : t('signup.head.student')}
        </Typography>
        <Box sx={styles.form}>
          <SignupForm
            data={data}
            errors={errors}
            handleBlur={handleBlur}
            handleChange={handleInputChange}
            handleSubmit={handleSubmit}
          />
          <GoogleLogin
            buttonWidth={styles.form.maxWidth}
            disabled
            role={type}
            type={signup}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default SignupDialog
