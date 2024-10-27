/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_MOVIE_APP_ID: string;
}

interface ImportMeta {
  env: ImportMetaEnv;
}
