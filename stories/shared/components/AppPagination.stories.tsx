import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { useState } from "react";
import AppPagination from "@/module/shared/components/AppPagination";

const meta = {
  title: "Shared/Components/AppPagination",
  component: AppPagination,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof AppPagination>;

export default meta;
type Story = StoryObj<typeof meta>;

const ControlledWrapper = ({
  initialPage = 1,
  totalPages = 10,
  size,
}: {
  initialPage?: number;
  totalPages?: number;
  size?: "L" | "M";
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="body-s text-neutral-500">
        Current page:{" "}
        <span className="font-medium text-neutral-950">{currentPage}</span> of{" "}
        {totalPages}
      </div>
      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        size={size}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

const DisabledToggleWrapper = ({
  initialPage = 1,
  totalPages = 10,
  size,
}: {
  initialPage?: number;
  totalPages?: number;
  size?: "L" | "M";
}) => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isDisabled, setIsDisabled] = useState(false);

  return (
    <div className="flex flex-col items-center gap-4">
      <div className="body-s text-neutral-500">
        Current page:{" "}
        <span className="font-medium text-neutral-950">{currentPage}</span> of{" "}
        {totalPages}
      </div>
      <AppPagination
        currentPage={currentPage}
        totalPages={totalPages}
        size={size}
        onPageChange={setCurrentPage}
        disabled={isDisabled}
      />
      <button
        onClick={() => setIsDisabled(!isDisabled)}
        className="body-s rounded-md border border-neutral-300 px-4 py-2 font-medium hover:bg-neutral-50"
      >
        {isDisabled ? "Enable" : "Disable"} Pagination
      </button>
    </div>
  );
};

export const Default: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const FirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const MiddlePage: Story = {
  args: {
    currentPage: 10,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const LastPage: Story = {
  args: {
    currentPage: 20,
    totalPages: 20,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const FewPages: Story = {
  args: {
    currentPage: 3,
    totalPages: 5,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const SinglePage: Story = {
  args: {
    currentPage: 1,
    totalPages: 1,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const SizeMedium: Story = {
  args: {
    currentPage: 5,
    totalPages: 15,
    size: "M",
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const ControlledState: Story = {
  render: () => <ControlledWrapper initialPage={1} totalPages={15} />,
};

export const Disabled: Story = {
  args: {
    currentPage: 5,
    totalPages: 10,
    disabled: true,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const DisabledFirstPage: Story = {
  args: {
    currentPage: 1,
    totalPages: 10,
    disabled: true,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const DisabledLastPage: Story = {
  args: {
    currentPage: 10,
    totalPages: 10,
    disabled: true,
    onPageChange: (page: number) => console.log("Page changed to:", page),
  },
};

export const DisabledToggle: Story = {
  render: () => <DisabledToggleWrapper initialPage={5} totalPages={15} />,
};
