// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import HostingListTable from './HostingListTable'

const HostingList = ({ hostingData }: { hostingData?: InvoiceType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <HostingListTable hostingData={hostingData} />
      </Grid>
    </Grid>
  )
}

export default HostingList
