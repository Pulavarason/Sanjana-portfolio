"use client";

import { createContext, useContext } from "react";

/** `true` once the loading screen has finished – the hero waits for it to animate in. */
export const ReadyContext = createContext(false);
export const useReady = () => useContext(ReadyContext);
