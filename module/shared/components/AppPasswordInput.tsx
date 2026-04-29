"use client";
import React, { useState } from "react";
import { AppInputV2, AppInputV2Props } from "./AppInput";
import { Lock1Icon } from "../icons/Lock1Icon";
import { EyeHiddenIcon } from "../icons/EyeHiddenIcon";
import { EyeShowVisibleIcon } from "../icons/EyeShowVisibleIcon";

type AppPasswordInputProps = Omit<
  AppInputV2Props,
  "startIcon" | "endIcon" | "type"
>;

export const AppPasswordInput = React.forwardRef<
  HTMLInputElement,
  AppPasswordInputProps
>((props, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickEndIcon = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowPassword(!showPassword);
  };

  return (
    <AppInputV2
      {...props}
      ref={ref}
      type={showPassword ? "text" : "password"}
      startIcon={<Lock1Icon />}
      endIcon={
        <button
          tabIndex={-1}
          disabled={props.disabled}
          onClick={handleClickEndIcon}
          className="cursor-pointer"
          type="button"
        >
          {showPassword ? <EyeShowVisibleIcon /> : <EyeHiddenIcon />}
        </button>
      }
    />
  );
});

AppPasswordInput.displayName = "AppPasswordInput";
