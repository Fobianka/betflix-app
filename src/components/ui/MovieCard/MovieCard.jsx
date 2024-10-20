import React from 'react';
import { Box, Rating, Stack, Tooltip, Link } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

import styles from './MovieCard.module.css';

export default function MovieCard({ movie, reload = false }) {
  const linkProps = reload
    ? { component: 'a', href: `/movie/${movie.kinopoiskId}` }
    : { component: RouterLink, to: `/movie/${movie.kinopoiskId}` };
  return (
    <Stack>
      <Link {...linkProps}>
        <img
          src={movie.posterUrlPreview}
          alt={movie.nameRu}
          className={styles.img}
        />
        <Link component="p" className={styles.link} sx={{ width: '200px' }}>
          {movie.nameRu ? movie.nameRu : movie.nameEn}
        </Link>
      </Link>
      {movie.ratingKinopoisk && (
        <Stack>
          <Tooltip title={`${movie.ratingKinopoisk} / 10`}>
            <Box>
              <Rating
                name="read-only"
                value={movie.ratingKinopoisk / 2}
                precision={0.1}
                size="small"
                readOnly
              />
            </Box>
          </Tooltip>
        </Stack>
      )}
    </Stack>
  );
}
