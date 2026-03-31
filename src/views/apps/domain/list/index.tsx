// MUI Imports
import Grid from '@mui/material/Grid2'

// Type Imports
import type { InvoiceType } from '@/types/apps/invoiceTypes'

// Component Imports
import DomainListTable from './DomainListTable'

const DomainList = ({ domainData }: { domainData?: InvoiceType[] }) => {
  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <DomainListTable domainData={domainData} />
      </Grid>
    </Grid>
  )
}

export default DomainList
