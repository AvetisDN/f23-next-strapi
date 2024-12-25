import DeleteForm from "@/components/summary/delete-form";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ClientYT from "@/components/yt-client";
import { getSummaryById } from "@/data/loader";
import { SummarySingleProps } from "@/lib/interfaces";
import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import Markdown from "react-markdown";

const page = async ({ params }: { params: Promise<SummarySingleProps> }) => {
  const summaryId = (await params).summaryId;
  const data = await getSummaryById(summaryId);

  return (
    <div className="w-full p-4 prose prose-zinc prose-headings:text-gray-700 prose-h1:text-primary dark:prose-headings:text-gray-200  dark:prose-h1:text-primary dark:prose-p:text-gray-400 dark:text-gray-400 dark:prose-strong:text-gray-300 max-w-none relative">
      <div className="absolute top-4 right-4">
        <DeleteForm summaryId={summaryId} />
      </div>
      <Tabs defaultValue="video">
        <TabsList className="mb-5">
          <TabsTrigger value="video">Видео</TabsTrigger>
          <TabsTrigger value="summary">Пересказ</TabsTrigger>
        </TabsList>
        <TabsContent value="video">
          <ClientYT videoId={data.videoId} />
        </TabsContent>
        <TabsContent value="summary">
          <Markdown className="w-full">{data.summary}</Markdown>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default page;
