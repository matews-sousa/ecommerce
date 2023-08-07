"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      <main
        className={
          !pathname.startsWith("/studio") ? "container mx-auto p-6" : ""
        }
      >
        {children}
      </main>
    </>
  );
}
