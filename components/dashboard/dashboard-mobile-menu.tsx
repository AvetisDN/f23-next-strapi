import { Dock, LayoutDashboard, Menu, User2 } from "lucide-react";
import React from "react";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import Link from "next/link";

const DashboardMobileMenu = () => {
  return (
    <div className="flex justify-between md:hidden">
      <div className="flex gap-1 items-center">
        <LayoutDashboard size={20} />
        <span className="text-lg font-bold">Консоль</span>
      </div>

      <Drawer>
        <DrawerTrigger className="flex gap-1 items-center">
          <Menu />
          Меню
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>
              <Link href="/dashboard" className="dashboard-link">
                <LayoutDashboard />
                <span className="text-xl font-bold">Консоль</span>
              </Link>
            </DrawerTitle>
          </DrawerHeader>
          <div className="flex flex-col p-4 gap-2">
            <Link href="/dashboard/summaries" className="dashboard-link">
              <Dock size={18} />
              Пересказы
            </Link>
            <Link href="/dashboard/account" className="dashboard-link">
              <User2 size={18} />
              Аккаунт
            </Link>
          </div>
          <DrawerFooter>
            <div className="h-10"></div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default DashboardMobileMenu;
