"use client";
import AppForbidden from "@/module/shared/components/AppForbidden";
import { useRouter } from "next/navigation";

const Forbidden = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AppForbidden
        illustrationUrl="/images/fobbiden-illustration.png"
        title="Forbidden"
        message="You are not authorized to access this page."
        actionButtonLabel="Go Back"
        onActionButtonClick={handleGoBack}
      />
    </div>
  );
};

export default Forbidden;
