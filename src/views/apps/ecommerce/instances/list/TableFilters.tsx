// React Imports
import { useState, useEffect } from 'react'

// MUI Imports
import Grid from '@mui/material/Grid2'
import CardContent from '@mui/material/CardContent'
import MenuItem from '@mui/material/MenuItem'

// Type Imports
import type { InstanceType } from '@/types/apps/ecommerceTypes'

// Component Imports
import CustomTextField from '@core/components/mui/TextField'

type InstanceStockType = { [key: string]: boolean }

// Vars
const instanceStockObj: InstanceStockType = {
  'In Stock': true,
  'Out of Stock': false
}

const TableFilters = ({
  setData,
  instanceData
}: {
  setData: (data: InstanceType[]) => void
  instanceData?: InstanceType[]
}) => {
  // States
  const [category, setCategory] = useState<InstanceType['category']>('')
  const [stock, setStock] = useState('')
  const [status, setStatus] = useState<InstanceType['status']>('')

  useEffect(
    () => {
      const filteredData = instanceData?.filter(instance => {
        if (category && instance.category !== category) return false
        if (stock && instance.stock !== instanceStockObj[stock]) return false
        if (status && instance.status !== status) return false

        return true
      })

      setData(filteredData ?? [])
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [category, stock, status, instanceData]
  )

  return (
    <CardContent>
      <Grid container spacing={6}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-status'
            value={status}
            onChange={e => setStatus(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Status</MenuItem>
            <MenuItem value='Scheduled'>Scheduled</MenuItem>
            <MenuItem value='Published'>Publish</MenuItem>
            <MenuItem value='Inactive'>Inactive</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-category'
            value={category}
            onChange={e => setCategory(e.target.value)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Category</MenuItem>
            <MenuItem value='Accessories'>Accessories</MenuItem>
            <MenuItem value='Home Decor'>Home Decor</MenuItem>
            <MenuItem value='Electronics'>Electronics</MenuItem>
            <MenuItem value='Shoes'>Shoes</MenuItem>
            <MenuItem value='Office'>Office</MenuItem>
            <MenuItem value='Games'>Games</MenuItem>
          </CustomTextField>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <CustomTextField
            select
            fullWidth
            id='select-stock'
            value={stock}
            onChange={e => setStock(e.target.value as string)}
            slotProps={{
              select: { displayEmpty: true }
            }}
          >
            <MenuItem value=''>Select Stock</MenuItem>
            <MenuItem value='In Stock'>In Stock</MenuItem>
            <MenuItem value='Out of Stock'>Out of Stock</MenuItem>
          </CustomTextField>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default TableFilters
