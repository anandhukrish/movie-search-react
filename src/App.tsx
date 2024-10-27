import { useEffect, useState } from "react";

import "./App.css";
import { useDebounce } from "./useDebounce";
import { api } from "./api";
import MovieCrad from "./assets/components/MovieCrad";
import CardPlacholder from "./assets/components/CardPlacholder";
import { cn } from "./utils";

type MovieApiResponse = {
  Search: Movie[];
  Response: string;
  totalResults: string;
  Error?: string;
};
type Movie = {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
};

function App() {
  const [search, setSearch] = useState("batman");
  const [movieResponse, setMovieResponse] = useState<MovieApiResponse | null>(
    null
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const movies = movieResponse?.Search;
  const totelPages = Math.ceil(Number(movieResponse?.totalResults) / 10);

  const debouncedValue = useDebounce(search);

  useEffect(() => {
    if (search === "") return;
    setLoading(true);
    const getMovies = async () => {
      const res = await api.get("", {
        params: {
          s: debouncedValue,
          page: page,
          type: "movie",
        },
      });
      if (res.data.Response === "False") {
        return;
      }
      setMovieResponse(res.data);
      setLoading(false);
    };
    getMovies();
  }, [debouncedValue, page]);

  return (
    <main className="bg-black/90 h-full py-5">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <input
            type="text"
            placeholder="Type here movie title"
            className="w-11/12 text-white border border-white/20 py-3 px-5 rounded-full  my-10 bg-transparent outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex flex-wrap">
          {loading && Array.from({ length: 10 }).map((_) => <CardPlacholder />)}
          {movies &&
            movies.length > 0 &&
            movies.map((movie, i) => <MovieCrad {...movie} key={i} />)}
        </div>
        <div>
          <button
            className="px-5 py-3 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/20"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            prev
          </button>
          {Array.from({ length: totelPages }).map((_, pageIndex) => (
            <button
              className={cn(
                "size-12  border-r border-white/20 text-white hover:bg-white/20",
                page === pageIndex + 1 && "bg-white/20"
              )}
              onClick={() => setPage(pageIndex + 1)}
            >
              {pageIndex + 1}
            </button>
          ))}
          <button
            className="px-5 py-3 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/20"
            onClick={() => setPage(page + 1)}
            disabled={page === totelPages}
          >
            next
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
