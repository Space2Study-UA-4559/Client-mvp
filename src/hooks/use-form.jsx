import { useState } from 'react'
import { getEmptyValues } from '~/utils/helper-functions'
import { isEqual } from '~/utils/isEqual'

export const useForm = ({
  initialValues,
  initialErrors = getEmptyValues(initialValues, ''),
  validations,
  onSubmit,
  submitWithData
}) => {
  const [data, setData] = useState(initialValues)
  const [isDirty, setDirty] = useState(false)
  const [errors, setErrors] = useState(initialErrors)
  const [isTouched, setTouched] = useState(getEmptyValues(initialValues, false))

  const validateValue = (key, value) => {
    if (validations && validations[key]) {
      return validations[key]?.(value, data)
    }
  }

  const checkForError = (key, value) => {
    if (isTouched[key] || errors[key]) {
      const valid = validateValue(key, value)

      setErrors((prev) => ({
        ...prev,
        [key]: valid ?? ''
      }))
    }
  }

  const handleInputChange = (key) => (event) => {
    const value =
      event.target.type === 'checkbox'
        ? event.target.checked
        : event.target.value
    setData((prev) => ({
      ...prev,
      [key]: value
    }))
    checkForError(key, event.target.value)
  }

  const handleNonInputValueChange = (key, value) => {
    setData((prev) => {
      const newData = {
        ...prev,
        [key]: value
      }
      setDirty(!isEqual(newData, initialValues))
      return newData
    })
    checkForError(key, value)
  }

  const handleErrors = (key, error) => {
    setErrors((prev) => ({
      ...prev,
      [key]: error
    }))
  }

  const handleBlur = (key) => (event) => {
    setDirty(!isEqual(data, initialValues))

    const valid = validateValue(key, event.target.value)

    setErrors((prev) => ({
      ...prev,
      [key]: valid ?? ''
    }))
    setTouched((prev) => ({
      ...prev,
      [key]: true
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    let isValid = true
    const submittedData = submitWithData ? data : undefined
    const newErrors = { ...errors }

    if (validations) {
      for (const key in validations) {
        const value = data[key]
        const validation = validateValue(key, value)
        if (validation) {
          isValid = false
          newErrors[key] = validation
        }
      }
    }

    isValid ? onSubmit && void onSubmit(submittedData) : setErrors(newErrors)
  }

  const resetData = (keys = []) => {
    setData((prev) => {
      if (keys.length === 0) return initialValues

      const newData = { ...prev }

      keys.forEach((key) => {
        newData[key] = initialValues[key]
      })

      return newData
    })
  }

  const handleDataChange = (newData) => {
    const filteredNewData = Object.keys(newData).reduce((acc, key) => {
      if (Object.prototype.hasOwnProperty.call(initialValues, key)) {
        return { ...acc, [key]: newData[key] }
      }
      return acc
    }, {})

    setData((prev) => ({
      ...prev,
      ...filteredNewData
    }))
  }

  return {
    data,
    isDirty,
    errors,
    handleDataChange,
    handleInputChange,
    handleNonInputValueChange,
    handleBlur,
    handleErrors,
    handleSubmit,
    resetData
  }
}

export default useForm
