"use client";
import { Movie } from "@/types";
import React from "react";
import axios from "axios";
import { FaRegCirclePlay } from "react-icons/fa6";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const CarouselComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getMovies = async () => {
      try {
        const res = await axios.get("http://localhost:8080/api/movies");
        setMovies(res.data);
      } catch (error) {
        console.log(error);
        throw new Error("Something went wrong");
      }
    };
    getMovies();
  }, []);

  return (
    <div className="w-[100%] carousel rounded-box h-[10%]">
      {movies.map((movie, index) => (
        <div className="carousel-item w-full relative" key={index}>
          <img
            src={movie.backdrops[0]}
            alt=""
            className=" w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black to-black/[1] opacity-50"></div>
          <div className="absolute top-[30%] flex justify-evenly w-[100%]">
            <div className="h-[100px] md:h-[200px] lg:h-[300px] border rounded-lg border-solid border-yellow-400">
              <img src={movie.poster} alt="" className="w-[100%] h-[100%]" />
            </div>
            <div className="p-0 m-0 md:w-[100px] lg:w-[150px] mt-10 md:mt-28">
              <Link href={`/trailer/${movie.imdbId}`}>
                <FaRegCirclePlay className="p-0 m-0 text-yellow-400 md:w-[35px] md:h-[35px] lg:w-[50px] lg:h-[50px] transition-all cursor-pointer" />
              </Link>
            </div>
            <button
              className="btn bg-yellow-400 text-black mt-8 md:mt-28 pr-2 pl-2 md:pr-4 md:pl-4 lg:pr-8 lg:pl-8"
              onClick={() => router.push(`/reviews/${movie.imdbId}`)}
            >
              Reviews
            </button>{" "}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CarouselComponent;
