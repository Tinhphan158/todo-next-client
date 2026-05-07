import WorkspaceTasksPage from "@/modules/workspace/pages/WorkspaceTasksPage";
import { Suspense } from "react";

function WorkspaceTasksRoute() {
  return (
    <Suspense fallback={<div className="bg-base-white rounded-lg p-4">Loading…</div>}>
      <WorkspaceTasksPage />
    </Suspense>
  );
}

export default WorkspaceTasksRoute;
