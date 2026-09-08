import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'flex',
    gap: '139px',
    alignItems: 'flex-start',
    height: { sm: '485px' },
    paddingBottom: { xs: '30px', sm: '0' },
    ...fadeAnimation
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    width: '432px'
  },
  title: {
    typography: 'body1',
    color: '#263238'
  },
  namesRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  locationRow: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  textAreaWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    width: '100%'
  },
  textarea: {
    width: '100%',
    '& .MuiInputBase-root': {
      height: '117px',
      borderRadius: '4px',
      '& fieldset': {
        borderColor: '#90A4AE'
      }
    }
  },
  helperText: {
    color: 'text.secondary',
    typography: 'body2'
  }
}
