import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: {
      xs: '1fr',
      sm: '1.2fr 1fr'
    },
    gridTemplateAreas: {
      xs: '"content" "buttons"',
      sm: '"image content" "image buttons"'
    },
    gridTemplateRows: {
      xs: 'auto auto',
      sm: '1fr auto'
    },
    columnGap: '40px',
    rowGap: '24px',
    width: '100%',
    minHeight: {
      sm: '485px'
    },
    ...fadeAnimation
  },

  image: {
    display: { xs: 'none', sm: 'block' },
    gridArea: 'image',
    maxWidth: { xs: '240px', sm: '400px' },
    width: '100%',
    height: '100%',
    objectFit: 'contain',
    alignSelf: 'center'
  },

  rightBox: {
    gridArea: 'content',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    width: '100%',
    minWidth: 0
  },

  title: {
    margin: 0
  },

  fieldsWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
    width: '100%'
  },

  buttons: {
    gridArea: 'buttons',
    alignSelf: 'end'
  }
}
