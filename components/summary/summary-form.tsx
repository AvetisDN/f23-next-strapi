"use client";
import { useToast } from "@/hooks/use-toast";
import { StrapiErrorsProps } from "@/lib/interfaces";
import React, { useState } from "react";
import { Input } from "../ui/input";
import SubmitButton from "../submit-button";
import { generateSummaryService } from "@/services/summary-service";
import { getVideoId } from "@/lib/utils";
import { createSummaryAction } from "@/data/summary-actions";
import { useRouter } from "next/navigation";

const INITIAL_STATE: StrapiErrorsProps = {
  message: null,
  name: "",
};

const defaultVideoID: string = "";

const SummaryForm = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<StrapiErrorsProps>(INITIAL_STATE);
  const [value, setValue] = useState<string>(defaultVideoID);

  const router = useRouter();

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
      setValue(defaultVideoID);
      setError({
        ...INITIAL_STATE,
        message: "Неверная ссылка или ID видео!",
      });

      return;
    }

    const summaryResponse = await generateSummaryService(videoId);

    if (summaryResponse.error) {
      toast({
        title: summaryResponse.error,
        variant: "destructive",
      });
      setLoading(false);
      setValue(defaultVideoID);
      setError({
        ...INITIAL_STATE,
        message: summaryResponse.error,
      });
      return;
    }

    const summaryText = summaryResponse.data as string;
    const payload = {
      data: {
        title:
          summaryText.match(/["]{1}.+["]{1}/m)?.[0].replace(/\"/g, "") ||
          "video",
        videoId: videoId,
        summary: summaryText,
      },
    };

    try {
      await createSummaryAction(payload);
      toast({
        title: "Видео пересказано!",
        variant: "success",
      });
      setValue(defaultVideoID);
      setError(INITIAL_STATE);
      router.push("/dashboard/summaries");
    } catch (error) {
      console.log(error);

      toast({
        title: "Что-то пошло не так 2",
        variant: "destructive",
      });
      setLoading(false);
      return;
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
