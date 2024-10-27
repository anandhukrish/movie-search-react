import { twMerge } from "./../node_modules/tw-merge/src/index";
import clsx from "clsx";
import { ClassValue } from "clsx";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
