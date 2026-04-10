import { createContext } from "react";

import type { ThemeContextValueInterface } from "@/interfaces";

export const ThemeContext = createContext<ThemeContextValueInterface | undefined>(undefined);
