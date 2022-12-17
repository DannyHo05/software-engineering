import React from "react";
import { useRouter } from "next/router";
export const EmptyLayout = ({ children }: React.PropsWithChildren<{}>) => {
  const router = useRouter();
  return (
    <>
      {children}
    </>
  );
};


