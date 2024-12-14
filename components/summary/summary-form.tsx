"use client";
import { useToast } from "@/hooks/use-toast";
import { StrapiErrorsProps } from "@/lib/interfaces";
import React, { useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../submit-button";
import { generateSummaryService } from "@/services/summary-service";
import { getVideoId } from "@/lib/utils";

const INITIAL_STATE: StrapiErrorsProps = {
  message: null,
  name: "",
};

const SummaryForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>("");

  const { toast } = useToast();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const formData = new FormData(event.currentTarget);
    const videoId = getVideoId(formData.get("videoId") as string);

    if (!videoId) {
      toast({
        title: "Неверная ссылка или ID видео!",
        variant: "destructive",
      });
      setLoading(false);
      setValue("");
      setError({
        ...INITIAL_STATE,
        message: "Неверная ссылка или ID видео!",
      });
      return;
    }

    const summaryResponse = await generateSummaryService(videoId);

    if (summaryResponse.data) {
      toast({
        title: "Видео пересказано!",
        variant: "success",
      });
    } else {
      toast({
        title: summaryResponse.error,
        variant: "destructive",
      });
    }
    setLoading(false);
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          name="videoId"
          placeholder={
            error.message ? error.message : "ID или URL видео на Youtube"
          }
          value={value}
          onChange={(e) => setValue(e.target.value)}
          required
        />
        <SubmitButton
          text="Пересказать"
          loadingText="Пересказываем..."
          loading={loading}
        />
      </form>
    </div>
  );
};

export default SummaryForm;
