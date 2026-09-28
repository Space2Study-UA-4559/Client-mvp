import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import languageImage from '~/assets/img/tutor-home-page/become-tutor/languages.svg'
import { useStepContext } from '~/context/step-context'
import { languages } from '~/containers/tutor-home-page/language-step/constants'
import { styles } from '~/containers/tutor-home-page/language-step/LanguageStep.styles'

const pageSize = 6
const optionHeight = 48
const filterLanguages = createFilterOptions()

const LanguageStep = ({ btnsBox, stepLabel }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()
  const [visibleCount, setVisibleCount] = useState(pageSize)
  const [inputValue, setInputValue] = useState('')
  const pendingScroll = useRef(null)
  const search = inputValue === stepData[stepLabel] ? '' : inputValue
  const matchingCount = filterLanguages(languages, {
    inputValue: search,
    getOptionLabel: (option) => option
  }).length
  const remainingCount = Math.max(matchingCount - visibleCount, 0)

  useEffect(() => {
    if (pendingScroll.current) {
      const { listbox, scrollTop } = pendingScroll.current
      listbox.scrollTop = scrollTop
      pendingScroll.current = null
    }
  }, [visibleCount])

  const loadMore = () => {
    setVisibleCount((count) => Math.min(count + pageSize, languages.length))
  }

  const handleScroll = (event) => {
    const listbox = event.currentTarget
    const { scrollTop, clientHeight, scrollHeight } = listbox
    if (
      remainingCount &&
      scrollTop + clientHeight >= scrollHeight - optionHeight
    ) {
      pendingScroll.current = { listbox, scrollTop }
      loadMore()
    }
  }

  const handleHighlightChange = (event, option, reason) => {
    if (reason === 'keyboard' && event?.key === 'ArrowDown') loadMore()
  }

  const handleInputChange = (_, value) => {
    setInputValue(value)
    setVisibleCount(pageSize)
  }

  return (
    <Box sx={styles.container}>
      <Typography sx={styles.description}>
        {t('becomeTutor.languages.title')}
      </Typography>
      <Box alt='' component='img' src={languageImage} sx={styles.image} />
      <Autocomplete
        ListboxProps={{
          onScroll: handleScroll,
          sx: {
            ...styles.listbox,
            paddingBottom: `${remainingCount * optionHeight}px`
          }
        }}
        filterOptions={(options, state) =>
          filterLanguages(options, state).slice(0, visibleCount)
        }
        noOptionsText={t('becomeTutor.languages.noOptions')}
        onChange={(_, value) => handleStepData(stepLabel, value)}
        onHighlightChange={handleHighlightChange}
        onInputChange={handleInputChange}
        onOpen={() => setVisibleCount(pageSize)}
        options={languages}
        renderInput={(params) => (
          <TextField
            {...params}
            label={t('becomeTutor.languages.autocompleteLabel')}
          />
        )}
        sx={styles.select}
        value={stepData[stepLabel]}
      />
      <Box sx={styles.buttons}>{btnsBox}</Box>
    </Box>
  )
}

export default LanguageStep
