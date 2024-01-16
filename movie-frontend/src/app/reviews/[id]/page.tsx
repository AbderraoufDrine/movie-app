"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Movie } from "@/types";

const Review = ({ params }: { params: { id: string } }) => {
  const [movie, setMovie] = useState<Movie>({
    imdbId: "",
    title: "",
    trailerLink: "",
    poster: "",
    reviewIds: [
      {
        body: "",
        _class: "",
      },
    ],
    backdrops: [],
  });
  const [comment, setComment] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      const Ed: string = params.id;
      const res = await axios.post("http://localhost:8080/api/reviews", {
        body: comment,
        ImdbId: Ed,
      });
      setComment("");
    } catch (error) {
      console.log(error);
      throw new Error("Something went wrong");
    }
  };

  useEffect(() => {
    // Fetch reviews whenever the comment state changes
    const fetchReviews = async () => {
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

    fetchReviews();
  }, [params.id, comment]);

  return (
    <div className="w-screen h-screen flex flex-col lg:flex-row justify-between p-4">
      <div className="flex-1 flex justify-center items-center lg:items-start lg:justify-normal">
        {" "}
        <img src={movie.poster} alt="" className="lg:w-[90%] xl:w-[65%]" />
      </div>
      <div className="flex-1 flex flex-col gap-5 mt-5 lg:mt-0">
        <h1 className="text-2xl font-bold">Write a Review?</h1>
        <form className="flex flex-col">
          <textarea
            placeholder="Write your review here"
            rows={7}
            cols={70}
            className="rounded-md p-2"
            value={comment}
            onChange={handleChange}
          />
          <button
            className="btn bg-yellow-400 text-black mt-8 pr-2 pl-2 md:pr-4 md:pl-4 lg:pr-8 lg:pl-8 w-[100px]"
            onClick={handleSubmit}
          >
            Post
          </button>
        </form>
        <div className="flex flex-col">
          {movie.reviewIds.map((reviewId, index) => (
            <div key={index} className="flex flex-col gap-3">
              <span className="mt-2">{reviewId.body}</span>
              <div className="border-b-2"></div>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Review;
