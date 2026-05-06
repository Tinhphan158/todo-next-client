import { AppButton } from "@/modules/shared/components/AppButton";
import AppEmptyState from "@/modules/shared/components/AppEmptyState";
import AppPaginationTable from "@/modules/shared/components/AppPaginationTable";
import { AppColumn } from "@/modules/shared/components/AppTable";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

// Create a typed version of the component for stories
const AppPaginationTableWithUsers = AppPaginationTable<User>;

const meta = {
  title: "Shared/Components/AppPaginationTable",
  component: AppPaginationTableWithUsers,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    table: {
      control: false,
      description: "Table configuration object",
    },
    pagination: {
      control: false,
      description: "Pagination configuration object",
    },
  },
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-6xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof AppPaginationTableWithUsers>;

export default meta;
type Story = StoryObj<typeof meta>;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
}

const allUsers: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Alice Williams",
    email: "alice@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 5,
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Viewer",
    status: "Active",
  },
  {
    id: 6,
    name: "Diana Ross",
    email: "diana@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 7,
    name: "Frank Miller",
    email: "frank@example.com",
    role: "Editor",
    status: "Inactive",
  },
  {
    id: 8,
    name: "Grace Lee",
    email: "grace@example.com",
    role: "Viewer",
    status: "Active",
  },
  {
    id: 9,
    name: "Henry Ford",
    email: "henry@example.com",
    role: "Admin",
    status: "Active",
  },
  {
    id: 10,
    name: "Ivy Chen",
    email: "ivy@example.com",
    role: "Editor",
    status: "Active",
  },
  {
    id: 11,
    name: "Jack Wilson",
    email: "jack@example.com",
    role: "Viewer",
    status: "Inactive",
  },
  {
    id: 12,
    name: "Kelly Davis",
    email: "kelly@example.com",
    role: "Admin",
    status: "Active",
  },
];

const columns: AppColumn<User>[] = [
  { key: "name", header: "Name", accessor: "name", sortable: true },
  { key: "email", header: "Email", accessor: "email", sortable: true },
  { key: "role", header: "Role", accessor: "role", sortable: true },
  {
    key: "status",
    header: "Status",
    render: (row) => (
      <span
        className={`text-caption-s rounded-full px-2 py-1 font-medium ${
          row.status === "Active"
            ? "bg-positive-50 text-positive-700"
            : "bg-neutral-100 text-neutral-600"
        }`}
      >
        {row.status}
      </span>
    ),
  },
  {
    key: "actions",
    header: "Actions",
    align: "right",
    render: () => (
      <div className="flex justify-end gap-2">
        <AppButton size="s" variant="secondary">
          Edit
        </AppButton>
        <AppButton size="s" variant="ghost">
          Delete
        </AppButton>
      </div>
    ),
  },
];

// Sample data for stories
const pageSizeOptions = [
  { value: 5, children: "5" },
  { value: 10, children: "10" },
  { value: 20, children: "20" },
  { value: 50, children: "50" },
];

// Generate large dataset for testing
const largeDataset = Array.from({ length: 247 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "Editor", "Viewer"][i % 3],
  status: (i % 3 === 0 ? "Inactive" : "Active") as "Active" | "Inactive",
}));

export const Default: Story = {
  args: {
    table: {
      data: allUsers.slice(0, 10),
      columns,
      sortValue: "",
      sortDirection: "NONE",
    },
    pagination: {
      totalItems: allUsers.length,
      totalPages: Math.ceil(allUsers.length / 10),
      currentPage: 1,
      currentPageSize: 10,
      pageSizeOptions,
      formatTotalItemTitle: (total: number) => `${total} users`,
    },
  },
};

export const WithLargeDataset: Story = {
  args: {
    table: {
      data: largeDataset.slice(0, 10),
      columns,
    },
    pagination: {
      totalItems: largeDataset.length,
      totalPages: Math.ceil(largeDataset.length / 10),
      currentPage: 1,
      currentPageSize: 10,
      pageSizeOptions,
      formatTotalItemTitle: (total: number) =>
        `${total.toLocaleString()} records`,
    },
  },
};

export const Loading: Story = {
  args: {
    table: {
      data: [],
      columns,
      isLoading: true,
      skeletonRowCount: 5,
    },
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      currentPageSize: 10,
      disabled: true,
      pageSizeOptions,
      formatTotalItemTitle: (total: number) => `${total} users`,
    },
  },
};

export const EmptyState: Story = {
  args: {
    table: {
      data: [],
      columns,
      isEmpty: true,
      emptyComponent: <AppEmptyState label="No users found" />,
    },
    pagination: {
      totalItems: 0,
      totalPages: 0,
      currentPage: 1,
      currentPageSize: 10,
      pageSizeOptions,
      formatTotalItemTitle: (total: number) =>
        total === 0 ? "No users" : `${total} users`,
    },
  },
};

export const SmallPagination: Story = {
  args: {
    table: {
      data: allUsers.slice(0, 3),
      columns,
    },
    pagination: {
      totalItems: 8,
      totalPages: Math.ceil(8 / 3),
      currentPage: 1,
      currentPageSize: 3,
      size: "M",
      pageSizeOptions: [
        { value: 3, children: "3" },
        { value: 5, children: "5" },
        { value: 8, children: "8" },
      ],
      formatTotalItemTitle: (total: number) => `${total} items`,
    },
  },
};

interface Order {
  orderId: string;
  customer: string;
  date: string;
  amount: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const ordersData: Order[] = [
  {
    orderId: "#ORD-001",
    customer: "John Doe",
    date: "2024-01-15",
    amount: 1299.99,
    status: "Delivered",
  },
  {
    orderId: "#ORD-002",
    customer: "Jane Smith",
    date: "2024-01-16",
    amount: 599.5,
    status: "Shipped",
  },
  {
    orderId: "#ORD-003",
    customer: "Bob Johnson",
    date: "2024-01-17",
    amount: 899.0,
    status: "Pending",
  },
  {
    orderId: "#ORD-004",
    customer: "Alice Williams",
    date: "2024-01-18",
    amount: 1499.99,
    status: "Delivered",
  },
  {
    orderId: "#ORD-005",
    customer: "Charlie Brown",
    date: "2024-01-19",
    amount: 299.0,
    status: "Cancelled",
  },
  {
    orderId: "#ORD-006",
    customer: "Diana Ross",
    date: "2024-01-20",
    amount: 799.99,
    status: "Shipped",
  },
  {
    orderId: "#ORD-007",
    customer: "Frank Miller",
    date: "2024-01-21",
    amount: 1099.5,
    status: "Pending",
  },
];

const orderColumns: AppColumn<Order>[] = [
  {
    key: "orderId",
    header: "Order ID",
    accessor: "orderId",
    sortable: true,
  },
  {
    key: "customer",
    header: "Customer",
    accessor: "customer",
    sortable: true,
  },
  { key: "date", header: "Date", accessor: "date", sortable: true },
  {
    key: "amount",
    header: "Amount",
    accessor: (row) => `$${row.amount.toFixed(2)}`,
    align: "right",
    sortable: true,
  },
  {
    key: "status",
    header: "Status",
    align: "center",
    render: (row) => {
      const statusColors = {
        Pending: "bg-warning-50 text-warning-700",
        Shipped: "bg-info-50 text-info-700",
        Delivered: "bg-positive-50 text-positive-700",
        Cancelled: "bg-negative-50 text-negative-700",
      };

      return (
        <span
          className={`text-caption-s rounded-full px-3 py-1 font-medium ${statusColors[row.status]}`}
        >
          {row.status}
        </span>
      );
    },
  },
];

// Create a typed version for orders
const AppPaginationTableWithOrders = AppPaginationTable<Order>;

export const OrdersExample: StoryObj<
  Meta<typeof AppPaginationTableWithOrders>
> = {
  render: () => (
    <div className="mx-auto w-full max-w-6xl">
      <AppPaginationTableWithOrders
        table={{
          data: ordersData.slice(0, 5),
          columns: orderColumns,
        }}
        pagination={{
          totalItems: ordersData.length,
          totalPages: Math.ceil(ordersData.length / 5),
          currentPage: 1,
          currentPageSize: 5,
          pageSizeOptions: [
            { value: 5, children: "5" },
            { value: 10, children: "10" },
          ],
          formatTotalItemTitle: (total: number) => `${total} orders`,
        }}
      />
    </div>
  ),
};
