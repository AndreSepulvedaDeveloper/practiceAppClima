import { Box, Container, } from '@mui/material/'
import TextField from '@mui/material/TextField'
import LoadingButton from '@mui/lab/LoadingButton'
import { useState } from 'react'
import Typography from '@mui/material/Typography'
import { GitHubIcon } from './components/IconUse'





export const API_WEATHER = `http://api.weatherapi.com/v1/current.json?key=${import.meta.env.VITE_API_KEY}&q=`;


export function App() {
  const [city, setCity] = useState("");
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState({
    error: false,
    message: '',
  })
  const [weather, setWeather] = useState({
    city: '',
    country: '',
    temp: '',
    condition: '',
    icon: '',
    conditionText: '',
  });

  const onSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError({
      error: false,
      message: "",
    })
    try {
      if (!city.trim()) throw { message: "El campo ciudad es obligatorio" };

      const response = await fetch(`${API_WEATHER}${city}`);
      const data = await response.json();

      if (data.error) throw { message: data.error.message }

      setWeather({
        city: data.location.name,
        country: data.location.country,
        temp: data.current.temp_c,
        condition: data.current.condition.code,
        icon: data.current.condition.icon,
        conditionText: data.current.condition.text,
      });

    } catch (error) {

      setError({
        error: true,
        message: error.message,
      });
    } finally {
      setLoading(false);
    }
  }


  return (
    <>
      <Container maxWidth="xs" sx={{ mt: 2 }}>
        <Typography
          variant="h3"
          color="initial"
          component="h1"
          align='center'
          gutterBottom
        >
          Weather App
        </Typography>
        <Box
          sx={{ display: "grid", gap: 2 }}
          component="form"
          autoComplete='off'
          onSubmit={onSubmit}

        >
          <TextField
            id="city"
            label="ciudad"
            variant='outlined'
            size='small'
            required
            fullWidth
            value={city}
            onChange={(e) => setCity(e.target.value)}
            error={error.error}
            helperText={error.message}
          />
          <LoadingButton
            type="submit"
            variant="contained"
            loading={loading}
            loadingIndicator="cargando.."

          >
            buscar
          </LoadingButton>
        </Box>
        {weather.city && (
          <Box
            sx={{
              mt: 2,
              display: 'grid',
              gap: 2,
              textAlign: 'center',
            }}>
            <Typography variant="h4" component="h2">
              {weather.city}, {weather.country}
            </Typography>
            <Box
              component="img"
              alt={weather.conditionText}
              src={weather.icon}
              sx={{ margin: "0 auto" }}

            />
            <Typography variant="h5" component="h3">

              {weather.temp} C
            </Typography>
            <Typography variant="h6" component="h4">
              {weather.conditionText}
            </Typography>

          </Box>
        )}
        <Typography textAlign="center"
          sx={{ mt: 2, fontSize: "10px" }}>
          Powered by: {"   "}
          <a href="https://rapidapi.com/weatherapi/api/weatherapi-com/"
            title='Weather API'>
            WeatherAPI.com
          </a>
        </Typography>
        <footer>
          <Typography textAlign="center"
            sx={{ mt: 2, fontSize: "30px" }}>
            Powered by: {"   "}
            <a href="https://github.com/AndreSepulvedaDeveloper?tab=repositories"
              title='Weather API'><GitHubIcon /></a>
            <span>AndreSepulvedaDev</span>

          </Typography>
        </footer>
      </Container >
    </>
  )
}
