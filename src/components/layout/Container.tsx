import { cn } from "@/lib/utils";
import type { ElementType, ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  as?: ElementType;
  size?: "default" | "narrow" | "wide";
  className?: string;
}

const SIZE_CLASSES: Record<NonNullable<ContainerProps["size"]>, string> = {
  default: "max-w-6xl",
  narrow: "max-w-3xl",
  wide: "max-w-7xl",
};

export function Container({ children, as, size = "default", className }: ContainerProps) {
  const Tag = as ?? "div";
  return <Tag className={cn("mx-auto w-full px-5 sm:px-8", SIZE_CLASSES[size], className)}>{children}</Tag>;
}
