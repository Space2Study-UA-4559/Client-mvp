import { useCallback, useState } from 'react'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ClearIcon from '@mui/icons-material/Clear'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'

import { useTranslation } from 'react-i18next'

import { styles } from '~/containers/tutor-home-page/subjects-step/SubjectsStep.styles'
import { categoryService } from '~/services/category-service'
import { subjectService } from '~/services/subject-service'
import { useStepContext } from '~/context/step-context'

const createEmptySubject = () => ({
  category: null,
  subject: null
})

const SubjectsStep = ({ btnsBox, stepLabel, isStudent = false }) => {
  const { t } = useTranslation()
  const { handleStepData } = useStepContext()

  const [fields, setFields] = useState([createEmptySubject()])
  const [categories, setCategories] = useState([])
  const [subjects, setSubjects] = useState({})
  const [categoriesLoading, setCategoriesLoading] = useState(false)
  const [subjectsLoading, setSubjectsLoading] = useState({})

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

  const fetchSubjects = async (categoryId, index) => {
    if (!categoryId) {
      return
    }

    try {
      setSubjectsLoading((prev) => ({
        ...prev,
        [index]: true
      }))

      const response = await subjectService.getSubjectsNames(categoryId)

      setSubjects((prev) => ({
        ...prev,
        [categoryId]: response.data
      }))
    } finally {
      setSubjectsLoading((prev) => ({
        ...prev,
        [index]: false
      }))
    }
  }

  const updateFields = useCallback(
    (newFields) => {
      setFields(newFields)

      handleStepData(stepLabel, newFields)
    },
    [handleStepData, stepLabel]
  )

  const handleCategoryChange = (index, categoryId) => {
    const newFields = [...fields]

    newFields[index] = {
      category: categoryId,
      subject: null
    }

    updateFields(newFields)

    setSubjects((prev) => ({
      ...prev
    }))
  }

  const handleSubjectChange = (index, subjectId) => {
    const newFields = [...fields]

    newFields[index] = {
      ...newFields[index],
      subject: subjectId
    }

    updateFields(newFields)
  }

  const clearCategory = (index) => {
    const newFields = [...fields]

    newFields[index] = {
      category: null,
      subject: null
    }

    updateFields(newFields)
  }

  const clearSubject = (index) => {
    const newFields = [...fields]

    newFields[index] = {
      ...newFields[index],
      subject: null
    }

    updateFields(newFields)
  }

  const addSubject = () => {
    updateFields([...fields, createEmptySubject()])
  }

  return (
    <Box sx={styles.container}>
      <Box sx={styles.rightBox}>
        <Typography sx={styles.title}>
          {t('becomeTutor.categories.title')}
        </Typography>

        {fields.map((field, index) => (
          <Box key={index} sx={styles.fieldsWrapper}>
            <FormControl fullWidth>
              <InputLabel>
                {t(
                  isStudent
                    ? 'becomeTutor.categories.mainInterestsLabel'
                    : 'becomeTutor.categories.mainSubjectsLabel'
                )}
              </InputLabel>

              <Select
                endAdornment={
                  field.category ? (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='clear category'
                        edge='end'
                        onClick={() => clearCategory(index)}
                        onMouseDown={(event) => event.stopPropagation()}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
                label={t('becomeTutor.categories.mainSubjectsLabel')}
                onChange={(event) =>
                  handleCategoryChange(index, event.target.value)
                }
                onOpen={fetchCategories}
                value={field.category || ''}
              >
                {categoriesLoading ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  categories.map((category) => (
                    <MenuItem key={category._id} value={category._id}>
                      {category.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>

            <FormControl disabled={!field.category} fullWidth>
              <InputLabel>
                {t('becomeTutor.categories.subjectLabel')}
              </InputLabel>

              <Select
                endAdornment={
                  field.subject ? (
                    <InputAdornment position='end'>
                      <IconButton
                        aria-label='clear subject'
                        edge='end'
                        onClick={() => clearSubject(index)}
                        onMouseDown={(event) => event.stopPropagation()}
                      >
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  ) : null
                }
                label={t('becomeTutor.categories.subjectLabel')}
                onChange={(event) =>
                  handleSubjectChange(index, event.target.value)
                }
                onOpen={() => fetchSubjects(field.category, index)}
                value={field.subject || ''}
              >
                {subjectsLoading[index] ? (
                  <MenuItem disabled>
                    <CircularProgress size={20} />
                  </MenuItem>
                ) : (
                  (subjects[field.category] || []).map((subject) => (
                    <MenuItem key={subject._id} value={subject._id}>
                      {subject.name}
                    </MenuItem>
                  ))
                )}
              </Select>
            </FormControl>
          </Box>
        ))}

        <button onClick={addSubject} type='button'>
          {t('becomeTutor.categories.btnText')}
        </button>
      </Box>

      {btnsBox}
    </Box>
  )
}

export default SubjectsStep
