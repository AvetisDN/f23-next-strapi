import { BugIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const NotFound = () => {
  return (
    <div className="flex-grow grid place-items-center">
      <div className="flex gap-4 flex-col items-center">
        <BugIcon size={80} className="text-destructive" />
        <h2 className="text-2xl font-bold">Ой! Что-то пошло не так</h2>
        <h3 className="text-xl font-semibold">
          Error 404. Похоже, что такой страницы не существует
        </h3>
        <div className="flex gap-1">
          Но вы же можете же
          <Link className="text-primary underline" href="/">
            вернуться же на главную же
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
