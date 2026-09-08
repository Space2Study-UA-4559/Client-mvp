import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import AppTextField from '~/components/app-text-field/AppTextField'
import AppTextArea from '~/components/app-text-area/AppTextArea'

import useForm from '~/hooks/use-form'
import useAxios from '~/hooks/use-axios'
import { useStepContext } from '~/context/step-context'
import { userService } from '~/services/user-service'
import {
  initialValues,
  validations
} from '~/components/user-steps-wrapper/constants'

import generalInfoImg from '~/assets/img/tutor-home-page/become-tutor/general-info.svg'

import { styles } from '~/containers/tutor-home-page/general-info-step/GeneralInfoStep.styles'

const fieldWidth = { width: '208px' }

const GeneralInfoStep = ({
  btnsBox,
  stepLabel,
  isUserFetched,
  setIsUserFetched
}) => {
  const { t } = useTranslation()
  const { userId, userRole } = useSelector((state) => state.appMain)
  const { handleStepData } = useStepContext()

  const { data, errors, handleInputChange, handleBlur, handleDataChange } =
    useForm({ initialValues, validations })

  useAxios({
    service: () => userService.getUserById(userId, userRole),
    fetchOnMount: !isUserFetched,
    onResponse: (responseData) => {
      handleDataChange({
        firstName: responseData.firstName,
        lastName: responseData.lastName
      })
      setIsUserFetched(true)
    }
  })

  useEffect(() => {
    handleStepData(stepLabel, data, errors)
  }, [data, errors])

  return (
    <Box sx={styles.container}>
      <Box alt='general info' component='img' src={generalInfoImg} />

      <Box sx={styles.formContainer}>
        <Typography sx={styles.title}>
          {t('becomeTutor.generalInfo.title')}
        </Typography>

        <Box sx={styles.namesRow}>
          <AppTextField
            autoFocus
            errorMsg={t(errors.firstName)}
            label={`${t('common.labels.firstName')} *`}
            onBlur={handleBlur('firstName')}
            onChange={handleInputChange('firstName')}
            sx={fieldWidth}
            value={data.firstName}
          />
          <AppTextField
            errorMsg={t(errors.lastName)}
            label={`${t('common.labels.lastName')} *`}
            onBlur={handleBlur('lastName')}
            onChange={handleInputChange('lastName')}
            sx={fieldWidth}
            value={data.lastName}
          />
        </Box>

        <Box sx={styles.locationRow}>
          <AppTextField label={t('common.labels.country')} sx={fieldWidth} />
          <AppTextField label={t('common.labels.city')} sx={fieldWidth} />
        </Box>

        <Box sx={styles.textAreaWrapper}>
          <AppTextArea
            fullWidth
            maxLength={100}
            onChange={handleInputChange('professionalSummary')}
            placeholder={t('becomeTutor.generalInfo.textFieldLabel')}
            sx={styles.textarea}
            value={data.professionalSummary}
          />

          <Typography sx={styles.helperText}>
            {t('becomeTutor.generalInfo.helperText')}
          </Typography>
        </Box>

        {btnsBox}
      </Box>
    </Box>
  )
}

export default GeneralInfoStep
