import { Box, Typography } from '@mui/material'
import useInputVisibility from '~/hooks/use-input-visibility'
import AppTextField from '~/components/app-text-field/AppTextField'
import { useTranslation } from 'react-i18next'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'

import { styles } from '~/containers/guest-home-page/signup-form/SignupForm.styles'
import AppButton from '~/components/app-button/AppButton'

const SignupForm = ({
  data,
  errors,
  handleBlur,
  handleChange,
  handleSubmit
}) => {
  const { t } = useTranslation()

  const { inputVisibility: passwordVisibility, showInputText: showPassword } =
    useInputVisibility(errors.password)

  const {
    inputVisibility: confirmPasswordVisibility,
    showInputText: showConfirmPassword
  } = useInputVisibility(errors.confirmPassword)

  return (
    <Box component='form' onSubmit={handleSubmit} sx={styles.form}>
      <Box sx={styles.nameFields}>
        <AppTextField
          autoFocus
          data-testid={'first-name'}
          errorMsg={t(errors.firstName)}
          fullWidth
          label={t('common.labels.firstName')}
          onBlur={handleBlur('firstName')}
          onChange={handleChange('firstName')}
          required
          size='large'
          sx={{ mb: '5px' }}
          type='text'
          value={data.firstName}
        />
        <AppTextField
          data-testid={'last-name'}
          errorMsg={t(errors.lastName)}
          fullWidth
          label={t('common.labels.lastName')}
          onBlur={handleBlur('lastName')}
          onChange={handleChange('lastName')}
          required
          size='large'
          sx={{ mb: '5px' }}
          type='text'
          value={data.lastName}
        />
      </Box>
      <AppTextField
        data-testid={'email'}
        errorMsg={t(errors.email)}
        fullWidth
        label={t('common.labels.email')}
        onBlur={handleBlur('email')}
        onChange={handleChange('email')}
        required
        size='large'
        type='email'
        value={data.email}
      />

      <AppTextField
        InputProps={passwordVisibility}
        errorMsg={t(errors.password)}
        fullWidth
        label={t('common.labels.password')}
        onBlur={handleBlur('password')}
        onChange={handleChange('password')}
        required
        type={showPassword ? 'text' : 'password'}
        value={data.password}
      />

      <AppTextField
        InputProps={confirmPasswordVisibility}
        errorMsg={t(errors.confirmPassword)}
        fullWidth
        label={t('common.labels.confirmPassword')}
        onBlur={handleBlur('confirmPassword')}
        onChange={handleChange('confirmPassword')}
        required
        type={showConfirmPassword ? 'text' : 'password'}
        value={data.confirmPassword}
      />

      <FormControlLabel
        control={
          <Checkbox checked={data.iAgree} onChange={handleChange('iAgree')} />
        }
        label={
          <Typography variant='body2'>
            {t('signup.iAgree')}{' '}
            <Typography
              component='span'
              sx={{ textDecoration: 'underline', color: 'primary.900' }}
              variant='body2'
            >
              {t('common.labels.terms')}
            </Typography>{' '}
            {t('signup.and')}{' '}
            <Typography
              component='span'
              sx={{ textDecoration: 'underline', color: 'primary.900' }}
              variant='body2'
            >
              {t('common.labels.privacyPolicy')}
            </Typography>
          </Typography>
        }
      />
      <AppButton
        disabled
        size='large'
        sx={styles.signupButton}
        type='submit'
        variant='contained'
      >
        {t('common.labels.signup')}
      </AppButton>
    </Box>
  )
}

export default SignupForm
