import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export interface AppTooltipProps {
  trigger?: React.ReactNode;
  content?: React.ReactNode;
  align?: "start" | "center" | "end";
  side?: "top" | "right" | "bottom" | "left";
  offset?: number;
}

const AppTooltip = ({
  trigger,
  content,
  align,
  side,
  offset,
}: AppTooltipProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{trigger}</TooltipTrigger>
      <TooltipContent
        className="bg-base-white body-s max-w-[254px] rounded-[8px] p-2 font-medium text-neutral-950 shadow-sm"
        align={align}
        side={side}
        alignOffset={offset}
        sideOffset={5}
      >
        {content}
      </TooltipContent>
    </Tooltip>
  );
};

export default AppTooltip;
