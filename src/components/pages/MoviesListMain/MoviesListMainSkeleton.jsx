import React from 'react';
import { Skeleton, Stack, useMediaQuery } from '@mui/material';

export default function MoviesListMainSkeleton() {
  const isMobile = useMediaQuery('(max-width:600px)');

  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="200px"
        height="32px"
        sx={{ mt: 3, mb: 3 }}
      />
      <Stack sx={{ flexDirection: { sm: 'column', md: 'row' }, gap: 1, mb: 1 }}>
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton
          animation="wave"
          variant="rounded"
          width={isMobile ? '100%' : '25%'}
          height={40}
        />
        <Skeleton animation="wave" variant="rounded" width={132} height={40} />
      </Stack>
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ mt: 2, mb: 2 }}
      >
        {Array(15)
          .fill(null)
          .map((_, index) => (
            <React.Fragment key={index}>
              <Stack flexDirection="column">
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width="215px"
                  height="322px"
                />
                <Skeleton animation="wave" variant="text" width="170px" />
                <Skeleton
                  animation="wave"
                  variant="text"
                  width="120px"
                  sx={{ mb: 2 }}
                />
              </Stack>
            </React.Fragment>
          ))}
      </Stack>
    </>
  );
}
