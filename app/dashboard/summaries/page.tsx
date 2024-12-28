import SearchForm from "@/components/summary/search-form";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getSummaries } from "@/data/loader";
import { SearchParamsProps, SummaryCardProps } from "@/lib/interfaces";
import Link from "next/link";
import React from "react";
import Markdown from "react-markdown";
import moment from "moment";
import SummaryPagination from "@/components/summary/summary-pagination";

const SummaryCard = ({
  documentId,
  title,
  summary,
  createdAt,
}: Readonly<SummaryCardProps>) => (
  <Card>
    <CardHeader>
      <Link href={`/dashboard/summaries/${documentId}`}>
        <CardTitle className="text-primary text-base h-[72px]">
          {title || "Пересказ видео"}
        </CardTitle>
      </Link>
      <p>{moment(createdAt).format("DD.MM.YYYY HH:mm")}</p>
    </CardHeader>
    <CardContent className="h-[200px] overflow-hidden">
      <Markdown className="prose prose-zinc prose-sm prose-headings:text-gray-600 dark:prose-headings:text-gray-400 prose-h3:text-[16px] dark:prose-p:text-gray-300 dark:prose-strong:text-gray-200 dark:prose-hr:border-gray-600 prose-hr:my-4">
        {summary.slice(0, 200)}
      </Markdown>
    </CardContent>
    <CardFooter className="flex justify-between">
      <Link href={`/dashboard/summaries/${documentId}`}>
        <p className="mt-2 opacity-50">[подробнее...]</p>
      </Link>
    </CardFooter>
  </Card>
);

const page = async ({
  searchParams,
}: {
  searchParams: Promise<SearchParamsProps>;
}) => {
  const searchQuery = (await searchParams).search ?? "";
  const currentPage = Number((await searchParams).page) || 1;

  const { data, meta } = await getSummaries(searchQuery, currentPage);

  const pageCount = meta?.pagination?.pageCount;

  return (
    <div className="flex flex-col gap-5 w-full">
      <SearchForm />
      {!data || !data.length ? (
        <div className="w-full h-full grid place-items-center">
          <h2 className="font-bold opacity-25 uppercase tracking-wide text-2xl">
            Переводов пока нет
          </h2>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
            {data.map((item: SummaryCardProps) => (
              <SummaryCard key={item.documentId} {...item} />
            ))}
          </div>
          <SummaryPagination pageCount={pageCount} />
        </div>
      )}
    </div>
  );
};

export default page;
