"use client";

import { useState } from "react";
import { ReadyContext } from "./ReadyContext";
import SmoothScroll from "./SmoothScroll";
import Loader from "@/components/ui/Loader";
import CustomCursor from "@/components/ui/CustomCursor";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  return (
    <ReadyContext.Provider value={ready}>
      <SmoothScroll />
      <CustomCursor />
      <Loader onDone={() => setReady(true)} />
      {children}
    </ReadyContext.Provider>
  );
}
