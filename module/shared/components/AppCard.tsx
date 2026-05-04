"use client";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

export interface AppCardProps extends Omit<
  React.ComponentProps<"div">,
  "title"
> {
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
  CardAction as AppCardAction,
  CardContent as AppCardContent,
  CardDescription as AppCardDescription,
  CardFooter as AppCardFooter,
  CardHeader as AppCardHeader,
  Card as AppCardRaw,
  CardTitle as AppCardTitle,
};
