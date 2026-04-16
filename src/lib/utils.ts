import type { ClassInputType } from "@/types";

export const joinClassesHandler = (...classes: ClassInputType[]): string => classes.filter(Boolean).join(" ");
