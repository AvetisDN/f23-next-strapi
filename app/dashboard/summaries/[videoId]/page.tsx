import { getSummaryById } from "@/data/loader";
import { SummarySingleProps } from "@/lib/interfaces";
import React from "react";
import Markdown from "react-markdown";

const page = async (props: Readonly<SummarySingleProps>) => {
  const params = await props?.params;
  const { videoId } = params;
  const data = await getSummaryById(videoId);

  return (
    <div className="w-full p-4 prose prose-zinc prose-headings:text-gray-700 prose-h1:text-primary dark:prose-headings:text-gray-200  dark:prose-h1:text-primary dark:prose-p:text-gray-400 dark:text-gray-400 dark:prose-strong:text-gray-300 max-w-none">
      <Markdown className="w-full">{data.summary}</Markdown>
    </div>
  );
};

export default page;
