"use client";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  CardAction,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import React from "react";

export interface AppCardProps extends React.ComponentProps<"div"> {
  size?: "default" | "sm";
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  footer?: React.ReactNode;
  headerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
}

export const AppCard = React.forwardRef<HTMLDivElement, AppCardProps>(
  (
    {
      size = "default",
      title,
      description,
      action,
      footer,
      headerClassName,
      contentClassName,
      footerClassName,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Card ref={ref} size={size} className={className} {...props}>
        {(title || description || action) && (
          <CardHeader className={headerClassName}>
            {title && <CardTitle>{title}</CardTitle>}
            {description && <CardDescription>{description}</CardDescription>}
            {action && <CardAction>{action}</CardAction>}
          </CardHeader>
        )}

        {children && (
          <CardContent className={contentClassName}>{children}</CardContent>
        )}

        {footer && (
          <CardFooter className={footerClassName}>{footer}</CardFooter>
        )}
      </Card>
    );
  },
);

AppCard.displayName = "AppCard";

export {
  Card as AppCardRaw,
  CardHeader as AppCardHeader,
  CardTitle as AppCardTitle,
  CardDescription as AppCardDescription,
  CardContent as AppCardContent,
  CardFooter as AppCardFooter,
  CardAction as AppCardAction,
};
