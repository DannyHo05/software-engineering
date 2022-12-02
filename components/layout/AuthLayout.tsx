import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { layoutPro } from "@/models/common";
import bgAuth from "@/assets/images/bgAuth.jpeg";
import Image from "next/image";
export const AuthLayout = ({ children }: layoutPro) => {
  const router = useRouter();
  return (
    <>
       <div className="w-screen h-screen absolute -z-50">
        <Image src={bgAuth} alt="image" layout="fill"
              objectFit="cover" priority />
      </div>
      {children}
    </>
  );
};

