"use client";
import AppNotFound from "@/modules/shared/components/AppNotFound";
import { useRouter } from "next/navigation";

const NotFound = () => {
  const router = useRouter();

  const handleGoBack = () => {
    router.back();
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <AppNotFound
        illustrationUrl="/images/not-found-illustration.png"
        title="Not Found"
        message="The page you are looking for does not exist."
        actionButtonLabel="Go Back"
        onActionButtonClick={handleGoBack}
      />
    </div>
  );
};

export default NotFound;
