// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import SshKeyListTable from './SshKeyListTable'

const SshKeyList = ({ sshKeyData }: { sshKeyData?: InvoiceType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <SshKeyListTable sshKeyData={sshKeyData} />
      </Grid>
    </Grid>
  )
}

export default SshKeyList
