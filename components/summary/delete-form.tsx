"use client";
import React from "react";
import DeleteButton from "../delete-button";
import { deleteSummaryAction } from "@/data/summary-actions";

const DeleteForm = ({ summaryId }: { summaryId: string }) => {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await deleteSummaryAction(summaryId);
  };
  return (
    <form onSubmit={handleSubmit}>
      <DeleteButton />
    </form>
  );
};

export default DeleteForm;
