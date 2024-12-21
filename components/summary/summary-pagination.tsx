"use client";
import { PaginationArrowProps } from "@/lib/interfaces";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "../ui/pagination";

const SummaryPaginationArrow: React.FC<PaginationArrowProps> = ({
  direction,
  href,
  isDisabled,
}) => {
  const router = useRouter();
  const isPrev = direction === "prev";
  const disabledClassName = isDisabled ? "opacity-40 pointer-events-none" : "";

  return (
    <PaginationLink className={`${disabledClassName}`} href={href}>
      {isPrev ? <ChevronsLeft /> : <ChevronsRight />}
    </PaginationLink>
  );
};

const SummaryPagination = () => {
  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <SummaryPaginationArrow direction="prev" href="" isDisabled={true} />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            {1}
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <SummaryPaginationArrow direction="next" href="" isDisabled={false} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default SummaryPagination;
