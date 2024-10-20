import React from 'react';
import { useNavigate, useParams, Link as ReactRouter } from 'react-router-dom';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Link,
  Stack,
  Typography,
} from '@mui/material';
import { ArrowBack, Language, Movie } from '@mui/icons-material';

import {
  useGetFilmQuery,
  useGetSequelsAndPrequelsQuery,
  useGetStaffQuery,
} from '../../../services/kinopoiskApi';
import ErrorMessage from '../../ui/ErrorMessage';
import MovieCard from '../../ui/MovieCard/MovieCard';
import VideoPlayer from '../../ui/VideoPlayer';

export default function MovieDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const responseFilm = useGetFilmQuery(id);
  const responseSequelsAndPrequels = useGetSequelsAndPrequelsQuery(id);
  const responseStaff = useGetStaffQuery(id);

  if (
    responseFilm.isLoading ||
    responseSequelsAndPrequels.isLoading ||
    responseStaff.isLoading
  ) {
    return (
      <Box display="flex" justifyContent="center" margin="auto">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (responseFilm.error || responseStaff.error) {
    return <ErrorMessage />;
  }
  return (
    <>
      <Grid container spacing={2} sx={{ mt: { md: 2 } }}>
        <Grid item md={4} sm={12}>
          <img
            src={responseFilm.data.posterUrl}
            alt={responseFilm.data.nameRu}
            width="100%"
          />
        </Grid>
        <Grid item md={6} sm={12}>
          <Grid container>
            <Grid item xs={3}>
              <Button
                startIcon={<ArrowBack />}
                size="large"
                onClick={() => navigate(-1)}
              />
            </Grid>
            <Grid item xs={4} alignContent="center" marginBottom="15px">
              <Typography variant="h5">{responseFilm.data.nameRu}</Typography>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item xs={6} marginBottom="5px">
              <Typography>Год</Typography>
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              <Typography>{responseFilm.data.year}</Typography>
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              <Typography>Страна</Typography>
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              {responseFilm.data.countries.map(({ country }) => (
                <Typography key={country}>{country}</Typography>
              ))}
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              <Typography>Жанр</Typography>
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              {responseFilm.data.genres.map(({ genre }) => (
                <Typography key={genre}>{genre}</Typography>
              ))}
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              <Typography>Режиссёр</Typography>
            </Grid>
            <Grid item xs={6} marginBottom="5px">
              {responseStaff.data
                .filter((el) => el.professionText === 'Режиссеры')
                .map(({ nameRu }) => (
                  <Typography key={nameRu}>{nameRu}</Typography>
                ))}
            </Grid>
            <Grid item xs={6} marginBottom="15px">
              <Typography>Продолжительность</Typography>
            </Grid>
            <Grid item xs={6} marginBottom="15px">
              <Typography>{responseFilm.data.filmLength} мин</Typography>
            </Grid>
            <Grid item xs={12} marginBottom="5px">
              <Typography>Описание</Typography>
            </Grid>
            <Grid item xs={12} marginBottom="5px">
              <Typography>
                {responseFilm.data.description
                  ? responseFilm.data.description
                  : 'Описание отсутствует.'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item md={2} sm={12}>
          <Typography marginBottom="10px" variant="h6">
            В ролях:
          </Typography>
          {responseStaff.data
            .filter((el) => el.professionText === 'Актеры')
            .slice(0, 15)
            .map(({ nameRu, staffId }) => (
              <div key={nameRu}>
                <Link component={ReactRouter} to={`/actor/${staffId}`}>
                  {nameRu}
                </Link>
              </div>
            ))}
        </Grid>
      </Grid>
      <Grid
        container
        spacing={2}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Grid item xs={12} marginTop="10px">
          <ButtonGroup variant="outlined" aria-label="Basic button group">
            <Button
              target="_blank"
              href={responseFilm.data.webUrl}
              endIcon={<Language />}
            >
              Кинопоиск
            </Button>
            <Button
              target="_blank"
              href={`https://www.imdb.com/title/${responseFilm.data.imdbId}`}
              endIcon={<Movie />}
            >
              IMDB
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} marginTop="10px"></Grid>
        <Typography variant="h5">Смотреть онлайн</Typography>
        <VideoPlayer />
      </Grid>
      {responseSequelsAndPrequels.data && (
        <Stack alignItems="center">
          <Typography gutterBottom variant="h5" sx={{ mt: 2, mb: 2 }}>
            Сиквелы и приквелы
          </Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            justifyContent="center"
            sx={{ gap: 2 }}
          >
            {responseSequelsAndPrequels.data.map((el) => (
              <MovieCard key={el.filmId} movie={el} reload />
            ))}
          </Stack>
        </Stack>
      )}
    </>
  );
}
