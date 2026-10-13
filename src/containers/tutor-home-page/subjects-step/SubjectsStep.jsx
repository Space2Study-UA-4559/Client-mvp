import { useCallback, useEffect, useRef, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import Typography from '@mui/material/Typography'
import ClearIcon from '@mui/icons-material/Clear'

import { useTranslation } from 'react-i18next'

import studyCategoryImage from '~/assets/img/tutor-home-page/become-tutor/study-category.svg'
import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import {
  categoriesMock,
  languagesMock
} from '~/containers/tutor-home-page/subjects-step/constants'
import { useStepContext } from '~/context/step-context'

const SubjectsStep = ({ btnsBox, stepLabel, isStudent = false }) => {
  const { t } = useTranslation()
  const { stepData, handleStepData } = useStepContext()

  const [category, setCategory] = useState('')
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState([])
  const [subjects, setSubjects] = useState([])

  const restoredStep = useRef(null)

  const studentStep = isStudent || stepLabel === 'interests'

  const updateStepData = useCallback(
    (newSubjects, selectedCategory = category) => {
      handleStepData(
        stepLabel,
        newSubjects.map((subject) => ({
          category: selectedCategory || null,
          subject: subject._id
        }))
      )
    },
    [category, handleStepData, stepLabel]
  )

  const getSubjectsByCategory = (categoryName) => {
    if (categoryName === 'Languages') {
      return languagesMock.map((item) => ({
        _id: item.name,
        name: item.name
      }))
    }

    return []
  }

  useEffect(() => {
    const savedSubjects = stepData[stepLabel] || []

    if (restoredStep.current === stepLabel) {
      return
    }

    restoredStep.current = stepLabel

    if (!savedSubjects.length || !savedSubjects[0].category) {
      return
    }

    const savedCategory = savedSubjects[0].category
    const availableSubjects = getSubjectsByCategory(savedCategory)

    setCategory(savedCategory)
    setSubjects(availableSubjects)

    setSelectedSubjects(
      savedSubjects
        .map((saved) =>
          availableSubjects.find((subject) => subject._id === saved.subject)
        )
        .filter(Boolean)
    )
  }, [stepData, stepLabel])

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value

    setCategory(newCategory)
    setSelectedSubject('')
    setSelectedSubjects([])
    setSubjects(getSubjectsByCategory(newCategory))

    updateStepData([], newCategory)
  }

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value)
  }

  const clearCategory = () => {
    setCategory('')
    setSelectedSubject('')
    setSelectedSubjects([])
    setSubjects([])

    updateStepData([], null)
  }

  const clearSubject = () => {
    setSelectedSubject('')
  }

  const removeSubject = (subjectId) => {
    const newSubjects = selectedSubjects.filter(
      (subject) => subject._id !== subjectId
    )

    setSelectedSubjects(newSubjects)
    updateStepData(newSubjects)
  }

  const addSubject = () => {
    if (!selectedSubject) {
      return
    }

    const subject = subjects.find((item) => item._id === selectedSubject)

    if (!subject || selectedSubjects.some((item) => item._id === subject._id)) {
      return
    }

    const newSubjects = [...selectedSubjects, subject]

    setSelectedSubjects(newSubjects)
    setSelectedSubject('')
    updateStepData(newSubjects)
  }

  const visibleSubjects = selectedSubjects.slice(0, 2)
  const hiddenSubjectsCount = Math.max(selectedSubjects.length - 2, 0)

  return (
    <Box sx={styles.container}>
      <Box alt='' component='img' src={studyCategoryImage} sx={styles.image} />

      <Box sx={styles.rightBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor.categories.title')}
        </Typography>

        <FormControl fullWidth>
          <InputLabel id='subjects-step-category-label'>
            {t(
              studentStep
                ? 'becomeTutor.categories.mainInterestsLabel'
                : 'becomeTutor.categories.mainSubjectsLabel'
            )}
          </InputLabel>

          <Select
            endAdornment={
              category ? (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='clear category'
                    edge='end'
                    onClick={clearCategory}
                    onMouseDown={(event) => event.stopPropagation()}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            label={t(
              studentStep
                ? 'becomeTutor.categories.mainInterestsLabel'
                : 'becomeTutor.categories.mainSubjectsLabel'
            )}
            labelId='subjects-step-category-label'
            onChange={handleCategoryChange}
            value={category}
          >
            {categoriesMock.map((item) => (
              <MenuItem key={item.name} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl disabled={!category} fullWidth>
          <InputLabel id='subjects-step-subject-label'>
            {t('becomeTutor.categories.subjectLabel')}
          </InputLabel>

          <Select
            endAdornment={
              selectedSubject ? (
                <InputAdornment position='end'>
                  <IconButton
                    aria-label='clear subject'
                    edge='end'
                    onClick={clearSubject}
                    onMouseDown={(event) => event.stopPropagation()}
                  >
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ) : null
            }
            label={t('becomeTutor.categories.subjectLabel')}
            labelId='subjects-step-subject-label'
            onChange={handleSubjectChange}
            value={selectedSubject}
          >
            {subjects.map((item) => (
              <MenuItem
                disabled={selectedSubjects.some(
                  (subject) => subject._id === item._id
                )}
                key={item._id}
                value={item._id}
              >
                {item.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button
          disabled={!selectedSubject}
          onClick={addSubject}
          sx={styles.addButton}
          type='button'
          variant='contained'
        >
          {t('becomeTutor.categories.btnText')}
        </Button>

        {selectedSubjects.length > 0 && (
          <Box sx={styles.chips}>
            {visibleSubjects.map((subject) => (
              <Chip
                deleteIcon={<ClearIcon />}
                key={subject._id}
                label={subject.name}
                onDelete={() => removeSubject(subject._id)}
              />
            ))}

            {hiddenSubjectsCount > 0 && (
              <Chip label={`+${hiddenSubjectsCount}`} />
            )}
          </Box>
        )}
      </Box>

      <Box sx={styles.buttons}>{btnsBox}</Box>
    </Box>
  )
}

export default SubjectsStep
