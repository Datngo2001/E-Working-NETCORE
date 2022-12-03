import { Skeleton, Stack } from '@mui/material'
import React from 'react'

function AppSkeleton() {
    return (
        <Stack spacing={1}>
            <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
            <Skeleton variant="rectangular" width={210} height={60} />
            <Skeleton variant="rounded" width={210} height={60} />
        </Stack>
    )
}

export default AppSkeleton