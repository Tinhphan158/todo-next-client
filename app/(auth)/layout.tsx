interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  return <div>{children}</div>;
};

export default AuthLayout;
