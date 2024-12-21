"use client";
import { YtPlayerProps } from "@/lib/interfaces";
import React from "react";
import ReactPlayer from "react-player";

function generateYoutubeUrl(videoId: string) {
  const baseUrl = new URL("https://www.youtube.com/watch");
  baseUrl.searchParams.append("v", videoId);
  return baseUrl.href;
}

const YtPlayer = ({ videoId }: Readonly<YtPlayerProps>) => {
  if (!videoId) return null;
  const url = generateYoutubeUrl(videoId);
  return (
    <div className=" aspect-video mb-10">
      <ReactPlayer url={url} width={"100%"} height={"100%"} />
    </div>
  );
};

export default YtPlayer;
