import Button from '@mui/material/Button'

import { styles } from '~/components/tab/Tab.styles'

const Tab = ({ activeTab, onClick, children, sx, ...props }) => {
  return (
    <Button
      onClick={onClick}
      sx={[styles.defaultTab, activeTab && styles.activeTab, sx]}
      {...props}
    >
      {children}
    </Button>
  )
}

export default Tab
