import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getSummaries } from "@/data/loader";
import { SummaryCardProps } from "@/lib/interfaces";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";

const SummaryCard = ({
  documentId,
  title,
  summary,
}: Readonly<SummaryCardProps>) => (
  <Link href={`/dashboard/summaries/${documentId}`}>
    <Card>
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          {title || "Пересказ видео"}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Markdown className="prose prose-zinc prose-sm prose-headings:text-gray-600 dark:prose-headings:text-gray-400 prose-h3:text-[16px] dark:prose-p:text-gray-300">
          {summary.slice(0, 90)}
        </Markdown>
        <p className="mt-2 opacity-50">[подробнее...]</p>
      </CardContent>
    </Card>
  </Link>
);

const page = async () => {
  const { data } = await getSummaries();
  if (!data || !data.length)
    return (
      <div className="w-full h-full grid place-items-center">
        <h2 className="font-bold opacity-25 uppercase tracking-wide text-2xl">
          Переводов пока нет
        </h2>
      </div>
    );
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {data.map((item: SummaryCardProps) => (
        <SummaryCard key={item.documentId} {...item} />
      ))}
    </div>
  );
};

export default page;
