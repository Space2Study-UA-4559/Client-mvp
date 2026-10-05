import { useCallback, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Chip from '@mui/material/Chip'
import CircularProgress from '@mui/material/CircularProgress'
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
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { useStepContext } from '~/context/step-context'

const SubjectsStep = ({ btnsBox, stepLabel, isStudent = false }) => {
  const { t } = useTranslation()
  const { handleStepData } = useStepContext()

  const [category, setCategory] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState('')
  const [selectedSubjects, setSelectedSubjects] = useState([])

  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState([])

  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [subjectsLoading, setSubjectsLoading] = useState(false)

  const studentStep = isStudent || stepLabel === 'interests'

  const fetchCategories = async () => {
    if (categories.length) {
      return
    }

    try {
      setCategoriesLoading(true)

      const response = await categoryService.getCategoriesNames()

      setCategories(response.data)
    } finally {
      setCategoriesLoading(false)
    }
  }

  const fetchSubjects = async () => {
    if (!category) {
      return
    }

    try {
      setSubjectsLoading(true)

      const response = await subjectService.getSubjectsNames(category)

      setSubjects(response.data)
    } finally {
      setSubjectsLoading(false)
    }
  }

  const updateStepData = useCallback(
    (newSubjects, selectedCategory = category) => {
      const stepData = newSubjects.map((subject) => ({
        category: selectedCategory,
        subject: subject._id
      }))

      handleStepData(stepLabel, stepData)
    },
    [category, handleStepData, stepLabel]
  )

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value

    setCategory(newCategory)
    setSelectedSubject('')
    setSelectedSubjects([])
    setSubjects([])

    updateStepData([], newCategory)
  }

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value)
  }

  const clearCategory = () => {
    setCategory(null)
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

    if (!subject) {
      return
    }

    const newSubjects = [...selectedSubjects, subject]

    setSelectedSubjects(newSubjects)
    setSelectedSubject('')

    updateStepData(newSubjects)
  }

  const visibleSubjects = selectedSubjects.slice(0, 6)
  const hiddenSubjectsCount = Math.max(selectedSubjects.length - 6, 0)

  return (
    <Box sx={styles.container}>
      <Box alt='' component='img' src={studyCategoryImage} sx={styles.image} />

      <Box sx={styles.rightBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor.categories.title')}
        </Typography>

        <FormControl fullWidth>
          <InputLabel>
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
            onChange={handleCategoryChange}
            onOpen={fetchCategories}
            value={category || ''}
          >
            {categoriesLoading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              categories.map((item) => (
                <MenuItem key={item._id} value={item._id}>
                  {item.name}
                </MenuItem>
              ))
            )}
          </Select>
        </FormControl>

        <FormControl disabled={!category} fullWidth>
          <InputLabel>{t('becomeTutor.categories.subjectLabel')}</InputLabel>

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
            onChange={handleSubjectChange}
            onOpen={fetchSubjects}
            value={selectedSubject}
          >
            {subjectsLoading ? (
              <MenuItem disabled>
                <CircularProgress size={20} />
              </MenuItem>
            ) : (
              subjects.map((item) => (
                <MenuItem
                  disabled={selectedSubjects.some(
                    (subject) => subject._id === item._id
                  )}
                  key={item._id}
                  value={item._id}
                >
                  {item.name}
                </MenuItem>
              ))
            )}
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
