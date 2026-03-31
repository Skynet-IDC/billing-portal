// MUI Imports
import Grid from '@mui/material/Grid2'

// Data Imports
import { getDomainData } from '@/app/server/actions'
import HostingList from "@views/apps/hosting/list";

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/invoice` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

/* const getDomainData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
} */

const DomainApp = async () => {
  // Vars
  const data = await getDomainData()

  return (
    <Grid container>
      <Grid size={{ xs: 12 }}>
        <HostingList hostingData={data} />
      </Grid>
    </Grid>
  )
}

export default DomainApp
