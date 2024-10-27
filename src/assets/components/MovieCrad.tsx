import React from "react";

const MovieCrad = ({
  Poster,
  Title,
  Type,
  Year,
  imdbID,
}: {
  Poster: string;
  Title: string;
  Type: string;
  Year: string;
  imdbID: string;
}) => {
  return (
    <div className="w-[calc(100%_/_4_-_20px)] mx-[10px] my-5 rounded-lg overflow-hidden">
      <div className="h-[300px]">
        <img src={Poster} alt="" className="h-full w-full object-cover" />
      </div>
      <h1 className="text-white my-3">{Title}</h1>
    </div>
  );
};

export default MovieCrad;
