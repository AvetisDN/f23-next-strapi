import DashboardMenu from "@/components/dashboard/dashboard-menu";
import DashboardMobileMenu from "@/components/dashboard/dashboard-mobile-menu";
import React from "react";

const DashboardLayout = ({
  children,
}: {
  readonly children: React.ReactNode;
}) => {
  return (
    <div className="flex-grow p-4 flex flex-col md:flex-row gap-4">
      <DashboardMenu />
      <DashboardMobileMenu />
      <div className="flex-grow flex">{children}</div>
    </div>
  );
};

export default DashboardLayout;
