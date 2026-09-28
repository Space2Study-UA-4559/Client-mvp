import { cloneElement, useEffect } from 'react'
import { useTranslation } from 'react-i18next'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import EastIcon from '@mui/icons-material/East'
import WestIcon from '@mui/icons-material/West'

import AppButton from '~/components/app-button/AppButton'
import { styles } from '~/components/step-wrapper/StepWrapper.styles'
import { useStepContext } from '~/context/step-context'
import useConfirm from '~/hooks/use-confirm'
import useSteps from '~/hooks/use-steps'

const isFilled = (value) =>
  Array.isArray(value) ? value.length > 0 : Boolean(value)

const StepWrapper = ({ children, steps }) => {
  const { activeStep, isLastStep, loading, stepOperation } = useSteps({
    steps
  })
  const { next, back, setActiveStep, handleSubmit } = stepOperation
  const { t } = useTranslation()
  const { stepData } = useStepContext()
  const { setNeedConfirmation } = useConfirm()

  const isDirty = Object.values(stepData).some((step) =>
    step && !Array.isArray(step) && step.data
      ? Object.values(step.data).some(isFilled)
      : isFilled(step)
  )

  useEffect(() => {
    setNeedConfirmation(isDirty)
  }, [isDirty, setNeedConfirmation])

  const stepLabels = steps.map((step, index) => (
    <Box
      key={step}
      onClick={() => setActiveStep(index)}
      sx={[styles.defaultTab, index === activeStep && styles.activeTab]}
      typography='caption'
    >
      {t(`step.stepLabels.${step}`)}
    </Box>
  ))

  const nextButton = isLastStep ? (
    <AppButton
      loading={loading}
      onClick={handleSubmit}
      size='small'
      sx={styles.finishBtn}
      variant='contained'
    >
      {t('common.finish')}
    </AppButton>
  ) : (
    <AppButton onClick={next} size='small' sx={styles.btn} variant='contained'>
      {t('common.next')}
      <EastIcon fontSize='small' />
    </AppButton>
  )

  const btnsBox = (
    <Box sx={styles.btnWrapper}>
      <AppButton
        disabled={activeStep === 0}
        onClick={back}
        size='small'
        sx={styles.btn}
        variant='outlined'
      >
        <WestIcon fontSize='small' />
        {t('common.back')}
      </AppButton>
      {nextButton}
    </Box>
  )

  return (
    <Container sx={styles.root}>
      <Box sx={styles.steps}>{stepLabels}</Box>
      <Box sx={styles.stepContent}>
        {cloneElement(children[activeStep], {
          btnsBox,
          stepLabel: steps[activeStep]
        })}
      </Box>
    </Container>
  )
}

export default StepWrapper
