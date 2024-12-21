"use client";
import dynamic from "next/dynamic";
import React from "react";

const YtPlayer = dynamic(() => import("@/components/yt-client/yt-player"), {
  ssr: false,
});

const ClientYT = ({ videoId }: { videoId: string }) => {
  return <YtPlayer videoId={videoId} />;
};

export default ClientYT;
