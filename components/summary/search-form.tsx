"use client";
import React from "react";
import { Input } from "../ui/input";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

const SearchForm = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const handleChange = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("search", term);
    } else {
      params.delete("search");
    }

    router.replace(`${pathName}?${params.toString()}`);
  }, 300);

  return (
    <div>
      <Input
        type="search"
        placeholder="поиск..."
        defaultValue={searchParams.get("search")?.toString()}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
};

export default SearchForm;
