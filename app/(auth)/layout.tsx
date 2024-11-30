import React from "react";

const AuthLayout = ({ children }: { readonly children: React.ReactNode }) => {
  return <div className="flex-grow grid place-items-center">{children}</div>;
};

export default AuthLayout;
