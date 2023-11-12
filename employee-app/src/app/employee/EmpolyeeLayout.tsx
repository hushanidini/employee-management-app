"use client";
import React, {useEffect} from "react";
import { useRouter } from "next/navigation";

type EmpolyeeLayoutProps = {
  children: React.ReactNode;
};

const EmpolyeeLayout = ({ children }: EmpolyeeLayoutProps) => {
  const router = useRouter();


  return (
    <div className="container">
      <div className="grid w-full min-h-screen grid-cols-12">
        <section className="col-span-12 md:col-span-5 h-full px-10 flex justify-center items-center flex-col gap-12">
          <div className="max-w-lg flex justify-center items-center flex-col gap-12 w-full">
          {children}
          </div>
        </section>
        
      </div>
    </div>
  );
};

export default EmpolyeeLayout;
