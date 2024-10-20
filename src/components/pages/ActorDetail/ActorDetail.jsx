import React from 'react';
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { useGetStaffByIdQuery } from '../../../services/kinopoiskApi';
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import ErrorMessage from '../../ui/ErrorMessage';

export default function ActorDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetStaffByIdQuery(id);

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) return <ErrorMessage />;

  return (
    <>
      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <img
            src={data.posterUrl}
            style={{ width: '100%' }}
            alt={data.nameRu}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack flexDirection="row">
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color="primary"
            ></Button>
            <Stack flexDirection="column" sx={{ mb: 2 }}>
              <Typography variant="h6">{data.nameRu}</Typography>
              <Typography>{data.nameEn}</Typography>
            </Stack>
          </Stack>
          <Typography variant="h6" mt="2">
            Об актёре
          </Typography>
          <Grid container>
            <Grid item xs={6}>
              <Typography gutterBottom>Карьера</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.profession}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Дата рождения</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {data.birthday ? `${data.birthday} (${data.age} лет)` : '-'}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Место рождения</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {data.birthplace ? data.birthplace : '-'}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Рост</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {data.growth ? data.growth : '-'}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Дата смерти</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>
                {data.death ? data.death : '-'}
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Всего фильмов</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography gutterBottom>{data.films.length}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography gutterBottom>Факты</Typography>
            </Grid>
            <Grid item xs={12}>
              {data.facts.map((fact, index) => (
                <Typography key={index}>
                  {index + 1}. {fact}
                </Typography>
              ))}
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Фильмы</Typography>
        </Grid>
      </Grid>
      <Stack>
        {data.films
          .filter(
            (item, index, self) =>
              index === self.findIndex((el) => el.filmId === item.filmId)
          )
          .map((film, index) => (
            <Stack
              key={index}
              flexDirection="row"
              justifyContent="space-between"
              gap="20px"
            >
              <Typography>{index + 1}</Typography>
              <Link component={RouterLink} to={`/movie/${film.filmId}`}>
                {film.nameRu ? film.nameRu : film.nameEn}
              </Link>
              <Typography>{film.rating ? film.rating : '-'}</Typography>
            </Stack>
          ))}
      </Stack>
    </>
  );
}
