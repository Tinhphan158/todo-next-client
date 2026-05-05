import { AppProvider } from "@/lib/app-provider";
import { AppMessage } from "./AppMessage";
import { AppNotification } from "./AppNotification";

type Props = {
  children: React.ReactNode;
};

const AppLayout = ({ children }: Props) => {
  return (
    <AppProvider>
      {children}
      <AppMessage />
      <AppNotification />
    </AppProvider>
  );
};

export default AppLayout;
