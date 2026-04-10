"use client";

import { useContext } from "react";

import { ThemeContext } from "@/contexts";
import { componentStringsData } from "@/data";
import type { ThemeContextValueInterface } from "@/interfaces";

export const useTheme = (): ThemeContextValueInterface => {
    const context = useContext(ThemeContext);

    if (!context) throw new Error(componentStringsData.useThemeError);

    return context;
};
