"use client";

import { RichTextEditor } from "@/components/rich-text-editor";

interface WorkspaceTaskRichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
}

const WorkspaceTaskRichTextEditor = ({
  value,
  onChange,
}: WorkspaceTaskRichTextEditorProps) => {
  return (
    <div className="flex flex-col gap-2">
      <p className="body-s font-medium text-neutral-700">Content</p>
      <RichTextEditor
        value={value}
        onChange={onChange}
        placeholder="Enter task content..."
        className="rounded-[10px] border border-neutral-200 p-3"
      />
    </div>
  );
};

export default WorkspaceTaskRichTextEditor;
