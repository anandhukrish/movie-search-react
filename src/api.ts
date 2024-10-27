import axios from "axios";

export const api = axios.create({
  baseURL: `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_MOVIE_APP_ID
  }`,
});
