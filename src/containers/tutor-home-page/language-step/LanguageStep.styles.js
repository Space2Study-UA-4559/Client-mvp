import { fadeAnimation } from '~/styles/app-theme/custom-animations'

export const styles = {
  container: {
    display: 'grid',
    gridTemplateColumns: {
      xs: 'minmax(0, 1fr)',
      sm: 'repeat(2, minmax(0, 1fr))'
    },
    gridTemplateAreas: {
      xs: '"description" "image" "select" "buttons"',
      sm: '"image description" "image select" "image buttons"'
    },
    gridTemplateRows: { xs: 'auto auto auto 1fr', sm: 'auto 1fr auto' },
    columnGap: '40px',
    rowGap: '24px',
    width: '100%',
    minHeight: { sm: '485px' },
    ...fadeAnimation
  },
  description: {
    gridArea: 'description'
  },
  image: {
    gridArea: 'image',
    width: '100%',
    maxWidth: { xs: '240px', sm: '400px' },
    alignSelf: 'center',
    justifySelf: 'center'
  },
  select: {
    gridArea: 'select',
    alignSelf: 'start'
  },
  buttons: {
    gridArea: 'buttons',
    alignSelf: 'end'
  },
  listbox: {
    boxSizing: 'border-box',
    maxHeight: '288px',
    overflowY: 'auto',
    padding: 0,
    '& .MuiAutocomplete-option': {
      minHeight: '48px',
      height: '48px'
    }
  }
}
