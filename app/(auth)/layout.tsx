import { AuthLayout } from "@/modules/auth/components/AuthLayout";

export default function AuthGroupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthLayout>{children}</AuthLayout>;
}
