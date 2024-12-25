"use client";
import {
  PaginationArrowProps,
  PaginationNumberProps,
  PaginationProps,
} from "@/lib/interfaces";
import React from "react";
import {
  ChevronFirst,
  ChevronLast,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";
import { usePathname, useSearchParams } from "next/navigation";

const disabledClasses = "opacity-40 pointer-events-none";

const SummaryPaginationArrow: React.FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const isPrev = direction === "prev";
  const disabledClassName = isDisabled ? disabledClasses : "";

  return (
    <PaginationLink className={`${disabledClassName}`} href={href}>
      {isPrev ? <ChevronsLeft /> : <ChevronsRight />}
    </PaginationLink>
  );
};

const SummaryPaginationNumbers: React.FC<PaginationNumberProps> = ({
  current,
  pageCount,
  createPageURL,
}) => {
  const start =
    current === 1 ? 1 : current === pageCount ? current - 2 : current - 1;

  const numbers: number[] = Array.from(Array(3).keys()).map((n) => n + start);

  // const arr = [];

  // for (let i = start; i < start + 3; i++) {
  //   arr.push(i);
  // }

  return (
    <>
      {numbers.map((n) => (
        <PaginationLink
          href={createPageURL(n)}
          isActive={current === n}
          key={n}
        >
          {n}
        </PaginationLink>
      ))}
    </>
  );
};

const SummaryPagination = ({ pageCount }: Readonly<PaginationProps>) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationLink
            href={createPageURL(1)}
            className={`${currentPage <= 1 ? disabledClasses : ""}`}
          >
            <ChevronFirst />
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <SummaryPaginationArrow
            direction="prev"
            href={createPageURL(currentPage - 1)}
            isDisabled={currentPage <= 1}
          />
        </PaginationItem>
        <PaginationItem className="flex gap-1 mx-3">
          <SummaryPaginationNumbers
            current={currentPage}
            pageCount={pageCount}
            createPageURL={createPageURL}
          />
        </PaginationItem>
        <PaginationItem>
          <SummaryPaginationArrow
            direction="next"
            href={createPageURL(currentPage + 1)}
            isDisabled={currentPage >= pageCount}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink
            href={createPageURL(pageCount)}
            className={`${currentPage >= pageCount ? disabledClasses : ""}`}
          >
            <ChevronLast />
          </PaginationLink>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SummaryPagination;
