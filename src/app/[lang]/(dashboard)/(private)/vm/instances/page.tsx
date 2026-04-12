// MUI Imports
import Grid from '@mui/material/Grid2'

// Component Imports
import InstanceListTable from "@views/apps/ecommerce/instances/list/InstanceListTable";

// Data Imports
import { getInstanceData } from '@/app/server/vm-actions'

/**
 * ! If you need data using an API call, uncomment the below API code, update the `process.env.API_URL` variable in the
 * ! `.env` file found at root of your project and also update the API endpoints like `/apps/ecommerce` in below example.
 * ! Also, remove the above server action import and the action itself from the `src/app/server/actions.ts` file to clean up unused code
 * ! because we've used the server action for getting our static data.
 */

interface PageProps {
  searchParams: Promise<{
    page?: string
    limit?: string
    [key: string]: string | string[] | undefined
  }>
}

const instancesList = async ({ searchParams }: PageProps) => {
  const params = await searchParams

  // Get pagination parameters
  const page = params?.page ? parseInt(params.page, 10) : 1
  const limit = params?.limit ? parseInt(params.limit, 10) : 10

  // Fetch data with pagination
  const result = await getInstanceData({ page, limit })

  return (
    <Grid container spacing={6}>
      <Grid size={{ xs: 12 }}>
        <InstanceListTable
          instanceData={result.data}
          pagination={result.pagination}
        />
      </Grid>
    </Grid>
  )
}

export default instancesList
