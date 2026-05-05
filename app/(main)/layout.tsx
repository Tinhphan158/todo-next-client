import { MainAuthGate } from "@/module/shared/components/MainAuthGate";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <MainAuthGate>
      <div>{children}</div>
    </MainAuthGate>
  );
};

export default MainLayout;
