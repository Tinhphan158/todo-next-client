interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = async ({ children }: MainLayoutProps) => {
  return <div>{children}</div>;
};

export default MainLayout;
