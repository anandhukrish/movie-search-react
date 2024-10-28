import { useCallback, useEffect, useState } from "react";

import "./App.css";
import { useDebounce } from "./useDebounce";
import { api } from "./api";
import MovieCrad from "./assets/components/MovieCrad";
import CardPlacholder from "./assets/components/CardPlacholder";
import { cn } from "./utils";
import { useSearchParams } from "react-router-dom";

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

function Home() {
  const [movieResponse, setMovieResponse] = useState<MovieApiResponse | null>(
    null
  );
  //   const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [searchQuery, setSearchQuery] = useSearchParams();

  const initialSearch = searchQuery.get("s") || "";
  const [search, setSearch] = useState(initialSearch);

  const debouncedValue = useDebounce(search);

  useEffect(() => {
    setSearchQuery({
      page: searchQuery.get("page") || "1",
      s: search,
    });
  }, [search]);

  const totelPages = Math.ceil(Number(movieResponse?.totalResults) / 10);
  const currentPage = Number(searchQuery.get("page")) || 1;

  const generatePagenumbers = useCallback(() => {
    const numberPlaceholder = 4;
    const startPage = Math.max(1, currentPage - numberPlaceholder);
    const endPage = Math.min(totelPages, currentPage + numberPlaceholder);
    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => i + startPage
    );
  }, [currentPage, totelPages]);

  useEffect(() => {
    if (!debouncedValue || debouncedValue === "") {
      setMovies(null);
      return;
    }
    const getMovies = async () => {
      console.log("called getMovies", debouncedValue);
      setError("");
      setLoading(true);
      try {
        const res = await api.get("", {
          params: {
            s: debouncedValue,
            page: currentPage,
            type: "movie",
          },
        });
        if (res.data.Response === "False") {
          setError(res.data.Error);
          return;
        }
        setMovieResponse(res.data);
        setMovies(res.data?.Search);
      } catch (e) {
        setError("An error occurred while fetching data");
      } finally {
        setLoading(false);
      }
    };

    getMovies();
  }, [debouncedValue, currentPage]);

  if (error != "")
    return (
      <div className="flex items-center justify-center font-bold flex-col h-screen">
        <p className="text-red-600 text-xl">{error}</p>
        <button
          onClick={() => {
            setError("");
            setSearch("");
            setSearchQuery({
              page: "1",
              s: "",
            });
          }}
          className="border border-black px-5 py-2 rounded-md mt-5"
        >
          Back To Home
        </button>
      </div>
    );

  return (
    <main
      className={cn(
        "bg-black/90  py-5",
        movies && movies.length > 0 ? "h-full" : "h-screen"
      )}
    >
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
        {!movies && initialSearch === "" && (
          <div className="h-full w-full flex items-center justify-center text-white">
            No Movies To List Please Search
          </div>
        )}
        <div className="flex flex-wrap">
          {loading &&
            Array.from({ length: 10 }).map((_, i) => (
              <CardPlacholder key={i} />
            ))}
          {!loading &&
            movies &&
            movies.length > 0 &&
            movies.map((movie, i) => <MovieCrad {...movie} key={i} />)}
        </div>
        {movies && (
          <div className="flex justify-center py-5">
            <button
              className="px-5 py-3 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/20"
              onClick={() =>
                setSearchQuery({ page: `${currentPage - 1}`, s: search })
              }
              disabled={currentPage === 1}
            >
              prev
            </button>
            {generatePagenumbers().map((pageNum, i) => (
              <button
                className={cn(
                  "size-12  border-r border-white/20 text-white hover:bg-white/20",
                  currentPage === pageNum && "bg-white/20"
                )}
                onClick={() =>
                  setSearchQuery({ page: `${pageNum}`, s: search })
                }
                key={i}
              >
                {pageNum}
              </button>
            ))}
            <button
              className="px-5 py-3 border border-white/20 text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-white/20"
              onClick={() =>
                setSearchQuery({ page: `${currentPage + 1}`, s: search })
              }
              disabled={currentPage === totelPages}
            >
              next
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;
