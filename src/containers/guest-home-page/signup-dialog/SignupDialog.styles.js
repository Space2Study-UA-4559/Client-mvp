import loginStyles from '~/containers/guest-home-page/login-dialog/LoginDialog.styles'

const style = {
  ...loginStyles,
  title: {
    mb: '16px',
    fontWeight: '500',
    fontSize: '34px'
  },
  form: {
    ...loginStyles.form,
    maxWidth: { xs: '315px', md: '400px' }
  }
}

export default style
