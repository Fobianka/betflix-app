import React from 'react';
import { Skeleton, Stack } from '@mui/material';

export default function MoviesListTopSkeleton() {
  return (
    <>
      <Skeleton
        animation="wave"
        variant="rectangular"
        width="200px"
        height="32px"
        sx={{ mt: 3, mb: 3 }}
      />
      <Stack
        direction="row"
        justifyContent="center"
        flexWrap="wrap"
        sx={{ mt: 3, mb: 3 }}
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
