import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import * as React from "react";

const appHelperTextVariants = cva(
  "caption-s font-medium flex items-center gap-1",
  {
    variants: {
      state: {
        normal: "text-neutral-700",
        error: "text-primary-500",
      },
    },
    defaultVariants: {
      state: "normal",
    },
  },
);

interface AppHelperTextProps
  extends
    React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof appHelperTextVariants> {
  children: React.ReactNode;
  showIcon?: boolean;
  icon?: React.ReactNode;
}

const AppHelperText = React.forwardRef<
  HTMLParagraphElement,
  AppHelperTextProps
>(({ className, state, children, showIcon = false, icon, ...props }, ref) => {
  return (
    <p
      ref={ref}
      className={cn(appHelperTextVariants({ state }), className)}
      {...props}
    >
      {showIcon && icon && (
        <span className="shrink-0 [&_svg]:h-4 [&_svg]:w-4">{icon}</span>
      )}
      <span>{children}</span>
    </p>
  );
});

AppHelperText.displayName = "AppHelperText";

export { AppHelperText, appHelperTextVariants };
export type { AppHelperTextProps };
