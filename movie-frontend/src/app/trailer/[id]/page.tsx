"use client";
import { Movie } from "@/types";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactPlayer from "react-player";

const Trailer = ({ params }: { params: { id: string } }) => {
  const [movie, setMovie] = useState<Movie>({
    imdbId: "",
    title: "",
    trailerLink: "",
    poster: "",
    reviewIds: [],
    backdrops: [],
  });

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/movies/${params.id}`
        );
        setMovie(res.data);
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    };
    getMovie();
  }, [params.id]);

  return (
    <div className="flex w-screen h-screen items-center justify-center">
      {/* <ReactPlayer playing={true} url={movie.trailerLink} controls={true} width="50%" height="50%" /> */}
      <iframe
        src={movie.trailerLink}
        className="w-[70%] h-[70%]"
        allow="autoplay"
        allowFullScreen
      />
    </div>
  );
};

export default Trailer;
