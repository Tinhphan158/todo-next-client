import {
  DashboardIcon,
  LabelManagementIcon,
  NotificationManagementIcon,
  WorkspaceIcon,
} from "../icons";

const SIDEBAR_ICON_BOX = 18;

const squareIconSize = SIDEBAR_ICON_BOX;

const labelIconHeight = (SIDEBAR_ICON_BOX * 16) / 20;

const notificationIconHeight = 20;

export const getSidebarItems = (quantityNotification: number = 0) => [
  {
    icon: <DashboardIcon size={squareIconSize} />,
    title: "Dashboard",
    href: "/dashboard",
  },
  {
    icon: <WorkspaceIcon size={squareIconSize} />,
    title: "Workspace Management",
    href: "/workspace",
  },
  {
    icon: <LabelManagementIcon size={labelIconHeight} />,
    title: "Label Management",
    href: "/label",
  },
  {
    icon: <NotificationManagementIcon size={notificationIconHeight} />,
    title: "Notification",
    href: "/notification",
    slotRight: (
      <span className="caption-s bg-primary-500 text-base-white flex h-6 w-6 items-center justify-center rounded-full font-medium">
        {quantityNotification}
      </span>
    ),
  },
];
