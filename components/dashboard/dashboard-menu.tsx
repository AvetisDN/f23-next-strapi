"use client";
import React from "react";
import Link from "next/link";
import LogoutButton from "@/components/auth/logout-button";
import { Dock, LayoutDashboard, User2 } from "lucide-react";
import { usePathname } from "next/navigation";

const DashboardMenu = () => {
  const pathName = usePathname();
  return (
    <div className="flex-col gap-1 p-3 bg-card min-w-64 rounded-md hidden md:flex">
      <Link
        href="/dashboard"
        className={`dashboard-link ${
          pathName === "/dashboard" ? "active" : ""
        }`}
      >
        <LayoutDashboard />
        <span className="text-xl font-bold">Консоль</span>
      </Link>
      <div className="divider"></div>
      <Link
        href="/dashboard/summaries"
        className={`dashboard-link ${
          pathName === "/dashboard/summaries" ? "active" : ""
        }`}
      >
        <Dock size={18} />
        Пересказы
      </Link>
      <Link
        href="/dashboard/account"
        className={`dashboard-link ${
          pathName === "/dashboard/account" ? "active" : ""
        }`}
      >
        <User2 size={18} />
        Аккаунт
      </Link>
      <div className="flex-grow"></div>
      <LogoutButton />
    </div>
  );
};

export default DashboardMenu;
