import { AppButton } from "@/modules/shared/components/AppButton";
import AppEmptyState from "@/modules/shared/components/AppEmptyState";
import AppTable, {
  AppColumn,
  SortDirection,
} from "@/modules/shared/components/AppTable";
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import * as React from "react";

const meta = {
  title: "Shared/Components/AppTable",
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="mx-auto w-full max-w-6xl">
        <Story />
      </div>
    ),
  ],
} satisfies Meta;

export default meta;
type Story = StoryObj;

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  status: "Active" | "Inactive";
  subTable?: React.ReactNode;
  isSubTableOpen?: boolean;
}

const sampleUsers: User[] = [
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
];

export const Default: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name" },
      { key: "email", header: "Email", accessor: "email" },
      { key: "role", header: "Role", accessor: "role" },
      { key: "status", header: "Status", accessor: "status" },
    ];

    return <AppTable<User> data={sampleUsers} columns={columns} />;
  },
};

export const WithSorting: Story = {
  render: function WithSortingRender() {
    const [sortValue, setSortValue] = React.useState<string>("");
    const [sortDirection, setSortDirection] =
      React.useState<SortDirection>("NONE");

    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name", sortable: true },
      { key: "email", header: "Email", accessor: "email", sortable: true },
      { key: "role", header: "Role", accessor: "role", sortable: true },
      { key: "status", header: "Status", accessor: "status", sortable: true },
    ];

    const handleSort = (value: string, direction: SortDirection) => {
      setSortValue(value);
      setSortDirection(direction);
    };

    // Sort data based on current sort state
    const sortedData = [...sampleUsers].sort((a, b) => {
      if (sortDirection === "NONE" || !sortValue) return 0;

      const aValue = a[sortValue as keyof User];
      const bValue = b[sortValue as keyof User];

      if (aValue != null && bValue != null) {
        if (aValue < bValue) return sortDirection === "ASC" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "ASC" ? 1 : -1;
      }
      return 0;
    });

    return (
      <div className="space-y-4">
        <div className="text-body-s text-neutral-600">
          Current sort: {sortValue || "None"} ({sortDirection})
        </div>
        <AppTable<User>
          data={sortedData}
          columns={columns}
          sortValue={sortValue}
          sortDirection={sortDirection}
          onSortChange={handleSort}
        />
      </div>
    );
  },
};

export const WithCustomRender: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name", sortable: true },
      { key: "email", header: "Email", accessor: "email" },
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

    return <AppTable<User> data={sampleUsers} columns={columns} />;
  },
};

export const WithAlignment: Story = {
  render: () => {
    interface Product {
      id: number;
      name: string;
      price: number;
      quantity: number;
      total: number;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const products: Product[] = [
      { id: 1, name: "Laptop", price: 999.99, quantity: 2, total: 1999.98 },
      { id: 2, name: "Mouse", price: 29.99, quantity: 5, total: 149.95 },
      { id: 3, name: "Keyboard", price: 79.99, quantity: 3, total: 239.97 },
      { id: 4, name: "Monitor", price: 299.99, quantity: 1, total: 299.99 },
    ];

    const columns: AppColumn<Product>[] = [
      { key: "name", header: "Product", accessor: "name", align: "left" },
      {
        key: "price",
        header: "Price",
        accessor: (row) => `$${row.price.toFixed(2)}`,
        align: "right",
      },
      {
        key: "quantity",
        header: "Qty",
        accessor: "quantity",
        align: "center",
      },
      {
        key: "total",
        header: "Total",
        accessor: (row) => `$${row.total.toFixed(2)}`,
        align: "right",
        sortable: true,
      },
    ];

    return <AppTable<Product> data={products} columns={columns} />;
  },
};

export const WithVerticalAlignment: Story = {
  render: () => {
    interface Product {
      id: number;
      name: string;
      description: string;
      price: number;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const products: Product[] = [
      {
        id: 1,
        name: "Laptop",
        description:
          "High-performance laptop with 16GB RAM, 512GB SSD storage, Intel i7 processor, and dedicated graphics card. Perfect for gaming and professional work.",
        price: 999.99,
      },
      {
        id: 2,
        name: "Mouse",
        description: "Wireless ergonomic mouse with precision tracking",
        price: 29.99,
      },
      {
        id: 3,
        name: "Monitor",
        description:
          "Ultra-wide 4K display with HDR support, perfect for multitasking and creative work. Features USB-C connectivity and height-adjustable stand.",
        price: 599.99,
      },
    ];

    const columns: AppColumn<Product>[] = [
      {
        key: "name",
        header: "Product",
        accessor: "name",
        verticalAlign: "top",
      },
      {
        key: "description",
        header: "Description",
        accessor: "description",
        verticalAlign: "top",
      },
      {
        key: "price",
        header: "Price",
        accessor: (row) => `$${row.price.toFixed(2)}`,
        align: "right",
        verticalAlign: "middle",
      },
    ];

    return <AppTable<Product> data={products} columns={columns} />;
  },
};

export const WithCustomSizes: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "id", header: "ID", accessor: "id", size: 80 },
      { key: "name", header: "Name", accessor: "name", size: 200 },
      { key: "email", header: "Email", accessor: "email", size: 250 },
      { key: "role", header: "Role", accessor: "role", size: 120 },
      { key: "status", header: "Status", accessor: "status", size: 120 },
    ];

    return <AppTable<User> data={sampleUsers} columns={columns} />;
  },
};

export const OrdersTable: Story = {
  render: () => {
    interface Order {
      orderId: string;
      customer: string;
      date: string;
      amount: number;
      status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const orders: Order[] = [
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
    ];

    const columns: AppColumn<Order>[] = [
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
            Pending: "bg-warning-50 text-wanring-700",
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

    return <AppTable<Order> data={orders} columns={columns} />;
  },
};

export const EmptyState: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name" },
      { key: "email", header: "Email", accessor: "email" },
      { key: "role", header: "Role", accessor: "role" },
      { key: "status", header: "Status", accessor: "status" },
    ];

    return (
      <AppTable<User>
        data={[]}
        columns={columns}
        isEmpty={true}
        emptyComponent={<AppEmptyState label="No users found" />}
      />
    );
  },
};

export const EmptyStateWithCustomMessage: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name" },
      { key: "email", header: "Email", accessor: "email" },
      { key: "role", header: "Role", accessor: "role" },
      { key: "status", header: "Status", accessor: "status" },
    ];

    return (
      <AppTable<User>
        data={[]}
        columns={columns}
        isEmpty={true}
        emptyComponent={
          <AppEmptyState label="No search results found. Try adjusting your filters." />
        }
      />
    );
  },
};

export const EmptyStateProducts: Story = {
  render: () => {
    interface Product {
      id: number;
      name: string;
      price: number;
      quantity: number;
      total: number;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const columns: AppColumn<Product>[] = [
      { key: "name", header: "Product", accessor: "name" },
      { key: "price", header: "Price", accessor: "price" },
      { key: "quantity", header: "Qty", accessor: "quantity" },
      { key: "total", header: "Total", accessor: "total" },
    ];

    return (
      <AppTable<Product>
        data={[]}
        columns={columns}
        isEmpty={true}
        emptyComponent={<AppEmptyState label="No products available" />}
      />
    );
  },
};

export const Loading: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name" },
      { key: "email", header: "Email", accessor: "email" },
      { key: "role", header: "Role", accessor: "role" },
      { key: "status", header: "Status", accessor: "status" },
    ];

    return <AppTable<User> data={[]} columns={columns} isLoading={true} />;
  },
};

export const LoadingWithCustomRowCount: Story = {
  render: () => {
    const columns: AppColumn<User>[] = [
      { key: "name", header: "Name", accessor: "name" },
      { key: "email", header: "Email", accessor: "email" },
      { key: "role", header: "Role", accessor: "role" },
      { key: "status", header: "Status", accessor: "status" },
    ];

    return (
      <AppTable<User>
        data={[]}
        columns={columns}
        isLoading={true}
        skeletonRowCount={8}
      />
    );
  },
};

export const ComplexTable: Story = {
  render: function ComplexTableRender() {
    const [sortValue, setSortValue] = React.useState<string>("");
    const [sortDirection, setSortDirection] =
      React.useState<SortDirection>("NONE");

    interface Employee {
      id: number;
      avatar: string;
      name: string;
      position: string;
      department: string;
      salary: number;
      startDate: string;
      status: "Active" | "On Leave" | "Terminated";
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const employees: Employee[] = [
      {
        id: 1,
        avatar: "👨‍💼",
        name: "John Doe",
        position: "Senior Developer",
        department: "Engineering",
        salary: 120000,
        startDate: "2020-01-15",
        status: "Active",
      },
      {
        id: 2,
        avatar: "👩‍💼",
        name: "Jane Smith",
        position: "Product Manager",
        department: "Product",
        salary: 135000,
        startDate: "2019-03-20",
        status: "Active",
      },
      {
        id: 3,
        avatar: "👨‍💻",
        name: "Bob Johnson",
        position: "Junior Developer",
        department: "Engineering",
        salary: 80000,
        startDate: "2022-06-01",
        status: "Active",
      },
      {
        id: 4,
        avatar: "👩‍🎨",
        name: "Alice Williams",
        position: "UX Designer",
        department: "Design",
        salary: 95000,
        startDate: "2021-09-10",
        status: "On Leave",
      },
      {
        id: 5,
        avatar: "👨‍🔬",
        name: "Charlie Brown",
        position: "QA Engineer",
        department: "Engineering",
        salary: 85000,
        startDate: "2021-11-05",
        status: "Active",
      },
    ];

    const columns: AppColumn<Employee>[] = [
      {
        key: "employee",
        header: "Employee",
        render: (row) => (
          <div className="flex items-center gap-3">
            <div className="text-2xl">{row.avatar}</div>
            <div>
              <div className="font-bold text-neutral-950">{row.name}</div>
              <div className="text-caption-s text-neutral-500">
                {row.position}
              </div>
            </div>
          </div>
        ),
        sortable: true,
      },
      {
        key: "department",
        header: "Department",
        accessor: "department",
        sortable: true,
      },
      {
        key: "salary",
        header: "Salary",
        accessor: (row) => `$${row.salary.toLocaleString()}`,
        align: "right",
        sortable: true,
      },
      {
        key: "startDate",
        header: "Start Date",
        accessor: "startDate",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        align: "center",
        render: (row) => {
          const statusColors = {
            Active: "bg-positive-50 text-positive-700",
            "On Leave": "bg-warning-50 text-wanring-700",
            Terminated: "bg-negative-50 text-negative-700",
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
      {
        key: "actions",
        header: "",
        align: "right",
        render: () => (
          <AppButton size="s" variant="secondary">
            View
          </AppButton>
        ),
      },
    ];

    const handleSort = (value: string, direction: SortDirection) => {
      setSortValue(value);
      setSortDirection(direction);
    };

    return (
      <div className="space-y-4">
        <h2 className="text-heading-4 font-bold text-neutral-950">
          Employee Directory
        </h2>
        <AppTable<Employee>
          data={employees}
          columns={columns}
          sortValue={sortValue}
          sortDirection={sortDirection}
          onSortChange={handleSort}
        />
      </div>
    );
  },
};

export const WithStickyLeftColumns: Story = {
  render: () => {
    interface Transaction {
      id: string;
      date: string;
      customer: string;
      product: string;
      category: string;
      quantity: number;
      unitPrice: number;
      total: number;
      status: string;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const transactions: Transaction[] = [
      {
        id: "TXN-001",
        date: "2024-01-15",
        customer: "John Doe",
        product: "Wireless Headphones",
        category: "Electronics",
        quantity: 2,
        unitPrice: 79.99,
        total: 159.98,
        status: "Completed",
      },
      {
        id: "TXN-002",
        date: "2024-01-16",
        customer: "Jane Smith",
        product: "Office Chair",
        category: "Furniture",
        quantity: 1,
        unitPrice: 299.99,
        total: 299.99,
        status: "Pending",
      },
      {
        id: "TXN-003",
        date: "2024-01-17",
        customer: "Bob Johnson",
        product: "Mechanical Keyboard",
        category: "Electronics",
        quantity: 3,
        unitPrice: 129.99,
        total: 389.97,
        status: "Completed",
      },
      {
        id: "TXN-004",
        date: "2024-01-18",
        customer: "Alice Williams",
        product: "Desk Lamp",
        category: "Lighting",
        quantity: 2,
        unitPrice: 49.99,
        total: 99.98,
        status: "Shipped",
      },
      {
        id: "TXN-005",
        date: "2024-01-19",
        customer: "Charlie Brown",
        product: "Monitor Stand",
        category: "Accessories",
        quantity: 1,
        unitPrice: 39.99,
        total: 39.99,
        status: "Completed",
      },
    ];

    const columns: AppColumn<Transaction>[] = [
      {
        key: "id",
        header: "ID",
        accessor: "id",
        size: 100,
        fixed: "left",
      },
      {
        key: "date",
        header: "Date",
        accessor: "date",
        size: 120,
        fixed: "left",
      },
      {
        key: "customer",
        header: "Customer",
        accessor: "customer",
        size: 180,
      },
      {
        key: "product",
        header: "Product",
        accessor: "product",
        size: 200,
      },
      {
        key: "category",
        header: "Category",
        accessor: "category",
        size: 150,
      },
      {
        key: "quantity",
        header: "Qty",
        accessor: "quantity",
        size: 80,
        align: "center",
      },
      {
        key: "unitPrice",
        header: "Unit Price",
        accessor: (row) => `$${row.unitPrice.toFixed(2)}`,
        size: 120,
        align: "right",
      },
      {
        key: "total",
        header: "Total",
        accessor: (row) => `$${row.total.toFixed(2)}`,
        size: 120,
        align: "right",
      },
      {
        key: "status",
        header: "Status",
        accessor: "status",
        size: 120,
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-heading-5 font-bold text-neutral-950">
          Sticky Left Columns
        </h3>
        <p className="text-body-s text-neutral-600">
          The ID and Date columns are fixed on the left. Scroll horizontally to
          see the effect.
        </p>
        <div className="overflow-x-auto">
          <AppTable<Transaction> data={transactions} columns={columns} />
        </div>
      </div>
    );
  },
};

export const WithStickyRightColumns: Story = {
  render: () => {
    interface Product {
      name: string;
      description: string;
      category: string;
      brand: string;
      sku: string;
      stock: number;
      price: number;
      actions: string;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const products: Product[] = [
      {
        name: "Laptop Pro 15",
        description: "High-performance laptop with 16GB RAM",
        category: "Electronics",
        brand: "TechCorp",
        sku: "LAP-PRO-15",
        stock: 45,
        price: 1299.99,
        actions: "Edit",
      },
      {
        name: "Wireless Mouse",
        description: "Ergonomic wireless mouse with precision tracking",
        category: "Accessories",
        brand: "PeripheralCo",
        sku: "MOU-WRL-01",
        stock: 120,
        price: 29.99,
        actions: "Edit",
      },
      {
        name: "USB-C Hub",
        description: "7-in-1 USB-C hub with HDMI and ethernet",
        category: "Accessories",
        brand: "ConnectTech",
        sku: "HUB-USC-07",
        stock: 78,
        price: 49.99,
        actions: "Edit",
      },
      {
        name: "Monitor 27 4K",
        description: "27-inch 4K monitor with HDR support",
        category: "Displays",
        brand: "ViewTech",
        sku: "MON-27-4K",
        stock: 32,
        price: 599.99,
        actions: "Edit",
      },
      {
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with blue switches",
        category: "Accessories",
        brand: "KeyMaster",
        sku: "KEY-MEC-RGB",
        stock: 64,
        price: 129.99,
        actions: "Edit",
      },
    ];

    const columns: AppColumn<Product>[] = [
      {
        key: "name",
        header: "Product Name",
        accessor: "name",
        size: 180,
      },
      {
        key: "description",
        header: "Description",
        accessor: "description",
        size: 300,
      },
      {
        key: "category",
        header: "Category",
        accessor: "category",
        size: 150,
      },
      {
        key: "brand",
        header: "Brand",
        accessor: "brand",
        size: 150,
      },
      {
        key: "sku",
        header: "SKU",
        accessor: "sku",
        size: 140,
      },
      {
        key: "stock",
        header: "Stock",
        accessor: "stock",
        size: 100,
        align: "center",
        fixed: "right",
      },
      {
        key: "price",
        header: "Price",
        accessor: (row) => `$${row.price.toFixed(2)}`,
        size: 120,
        align: "right",
        fixed: "right",
      },
      {
        key: "actions",
        header: "Actions",
        size: 100,
        align: "center",
        fixed: "right",
        render: () => (
          <AppButton size="s" variant="secondary">
            Edit
          </AppButton>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-heading-5 font-bold text-neutral-950">
          Sticky Right Columns
        </h3>
        <p className="text-body-s text-neutral-600">
          The Stock, Price, and Actions columns are fixed on the right. Scroll
          horizontally to see the effect.
        </p>
        <div className="overflow-x-auto">
          <AppTable<Product> data={products} columns={columns} />
        </div>
      </div>
    );
  },
};

export const WithStickyBothSides: Story = {
  render: () => {
    interface SalesData {
      id: string;
      region: string;
      product: string;
      q1Sales: number;
      q2Sales: number;
      q3Sales: number;
      q4Sales: number;
      totalSales: number;
      growth: string;
      actions: string;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const salesData: SalesData[] = [
      {
        id: "REG-001",
        region: "North America",
        product: "Software Licenses",
        q1Sales: 125000,
        q2Sales: 138000,
        q3Sales: 142000,
        q4Sales: 155000,
        totalSales: 560000,
        growth: "+12.5%",
        actions: "View",
      },
      {
        id: "REG-002",
        region: "Europe",
        product: "Cloud Services",
        q1Sales: 98000,
        q2Sales: 105000,
        q3Sales: 112000,
        q4Sales: 128000,
        totalSales: 443000,
        growth: "+18.3%",
        actions: "View",
      },
      {
        id: "REG-003",
        region: "Asia Pacific",
        product: "Hardware Sales",
        q1Sales: 210000,
        q2Sales: 225000,
        q3Sales: 238000,
        q4Sales: 245000,
        totalSales: 918000,
        growth: "+9.7%",
        actions: "View",
      },
      {
        id: "REG-004",
        region: "Latin America",
        product: "Consulting",
        q1Sales: 45000,
        q2Sales: 52000,
        q3Sales: 58000,
        q4Sales: 67000,
        totalSales: 222000,
        growth: "+25.1%",
        actions: "View",
      },
      {
        id: "REG-005",
        region: "Middle East",
        product: "Support Services",
        q1Sales: 32000,
        q2Sales: 35000,
        q3Sales: 38000,
        q4Sales: 42000,
        totalSales: 147000,
        growth: "+15.6%",
        actions: "View",
      },
    ];

    const columns: AppColumn<SalesData>[] = [
      {
        key: "id",
        header: "ID",
        accessor: "id",
        size: 100,
        fixed: "left",
      },
      {
        key: "region",
        header: "Region",
        accessor: "region",
        size: 160,
        fixed: "left",
      },
      {
        key: "product",
        header: "Product",
        accessor: "product",
        size: 180,
      },
      {
        key: "q1Sales",
        header: "Q1 Sales",
        accessor: (row) => `$${row.q1Sales.toLocaleString()}`,
        size: 120,
        align: "right",
      },
      {
        key: "q2Sales",
        header: "Q2 Sales",
        accessor: (row) => `$${row.q2Sales.toLocaleString()}`,
        size: 120,
        align: "right",
      },
      {
        key: "q3Sales",
        header: "Q3 Sales",
        accessor: (row) => `$${row.q3Sales.toLocaleString()}`,
        size: 120,
        align: "right",
      },
      {
        key: "q4Sales",
        header: "Q4 Sales",
        accessor: (row) => `$${row.q4Sales.toLocaleString()}`,
        size: 120,
        align: "right",
      },
      {
        key: "totalSales",
        header: "Total",
        accessor: (row) => `$${row.totalSales.toLocaleString()}`,
        size: 140,
        align: "right",
        fixed: "right",
      },
      {
        key: "growth",
        header: "Growth",
        accessor: "growth",
        size: 100,
        align: "center",
        fixed: "right",
      },
      {
        key: "actions",
        header: "",
        size: 100,
        align: "center",
        fixed: "right",
        render: () => (
          <AppButton size="s" variant="secondary">
            View
          </AppButton>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-heading-5 font-bold text-neutral-950">
          Sticky Columns on Both Sides
        </h3>
        <p className="text-body-s text-neutral-600">
          ID and Region are fixed on the left. Total, Growth, and Actions are
          fixed on the right. Scroll horizontally to see the effect.
        </p>
        <div className="overflow-x-auto">
          <AppTable<SalesData> data={salesData} columns={columns} />
        </div>
      </div>
    );
  },
};

export const WithStickyColumnsAndSorting: Story = {
  render: function WithStickyColumnsAndSortingRender() {
    const [sortValue, setSortValue] = React.useState<string>("");
    const [sortDirection, setSortDirection] =
      React.useState<SortDirection>("NONE");

    interface Employee {
      id: number;
      name: string;
      email: string;
      department: string;
      role: string;
      location: string;
      salary: number;
      startDate: string;
      status: "Active" | "Inactive";
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const employees: Employee[] = [
      {
        id: 1,
        name: "John Doe",
        email: "john.doe@company.com",
        department: "Engineering",
        role: "Senior Developer",
        location: "New York",
        salary: 120000,
        startDate: "2020-01-15",
        status: "Active",
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@company.com",
        department: "Product",
        role: "Product Manager",
        location: "San Francisco",
        salary: 135000,
        startDate: "2019-03-20",
        status: "Active",
      },
      {
        id: 3,
        name: "Bob Johnson",
        email: "bob.johnson@company.com",
        department: "Engineering",
        role: "Junior Developer",
        location: "Austin",
        salary: 80000,
        startDate: "2022-06-01",
        status: "Active",
      },
      {
        id: 4,
        name: "Alice Williams",
        email: "alice.williams@company.com",
        department: "Design",
        role: "UX Designer",
        location: "Seattle",
        salary: 95000,
        startDate: "2021-09-10",
        status: "Inactive",
      },
      {
        id: 5,
        name: "Charlie Brown",
        email: "charlie.brown@company.com",
        department: "Engineering",
        role: "QA Engineer",
        location: "Boston",
        salary: 85000,
        startDate: "2021-11-05",
        status: "Active",
      },
    ];

    const columns: AppColumn<Employee>[] = [
      {
        key: "id",
        header: "ID",
        accessor: "id",
        size: 80,
        fixed: "left",
        sortable: true,
      },
      {
        key: "name",
        header: "Name",
        accessor: "name",
        size: 180,
        fixed: "left",
        sortable: true,
      },
      {
        key: "email",
        header: "Email",
        accessor: "email",
        size: 240,
        sortable: true,
      },
      {
        key: "department",
        header: "Department",
        accessor: "department",
        size: 150,
        sortable: true,
      },
      {
        key: "role",
        header: "Role",
        accessor: "role",
        size: 180,
        sortable: true,
      },
      {
        key: "location",
        header: "Location",
        accessor: "location",
        size: 150,
        sortable: true,
      },
      {
        key: "salary",
        header: "Salary",
        accessor: (row) => `$${row.salary.toLocaleString()}`,
        size: 120,
        align: "right",
        sortable: true,
      },
      {
        key: "startDate",
        header: "Start Date",
        accessor: "startDate",
        size: 120,
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        size: 100,
        align: "center",
        fixed: "right",
        render: (row) => (
          <span
            className={`text-caption-s rounded-full px-3 py-1 font-medium ${
              row.status === "Active"
                ? "bg-positive-50 text-positive-700"
                : "bg-neutral-100 text-neutral-600"
            }`}
          >
            {row.status}
          </span>
        ),
      },
    ];

    const handleSort = (value: string, direction: SortDirection) => {
      setSortValue(value);
      setSortDirection(direction);
    };

    const sortedData = [...employees].sort((a, b) => {
      if (sortDirection === "NONE" || !sortValue) return 0;

      const aValue = a[sortValue as keyof Employee];
      const bValue = b[sortValue as keyof Employee];

      if (aValue != null && bValue != null) {
        if (aValue < bValue) return sortDirection === "ASC" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "ASC" ? 1 : -1;
      }
      return 0;
    });

    return (
      <div className="space-y-4">
        <h3 className="text-heading-5 font-bold text-neutral-950">
          Sticky Columns with Sorting
        </h3>
        <p className="text-body-s text-neutral-600">
          Combines sticky columns with sorting functionality. ID and Name are
          fixed on the left, Status is fixed on the right.
        </p>
        <div className="text-body-s text-neutral-600">
          Current sort: {sortValue || "None"} ({sortDirection})
        </div>
        <div className="overflow-x-auto">
          <AppTable<Employee>
            data={sortedData}
            columns={columns}
            sortValue={sortValue}
            sortDirection={sortDirection}
            onSortChange={handleSort}
          />
        </div>
      </div>
    );
  },
};

export const WithSubTables: Story = {
  render: function WithSubTablesRender() {
    interface OrderItem {
      id: number;
      name: string;
      quantity: number;
      price: number;
      total: number;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    interface Order {
      id: string;
      customer: string;
      date: string;
      status: "Pending" | "Processing" | "Shipped" | "Delivered";
      total: number;
      items: OrderItem[];
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const [expandedRows, setExpandedRows] = React.useState<Set<string>>(
      new Set(["ORD-001"]),
    );

    const orders: Order[] = [
      {
        id: "ORD-001",
        customer: "John Doe",
        date: "2024-01-15",
        status: "Delivered",
        total: 1299.99,
        items: [
          {
            id: 1,
            name: "Laptop Pro 15",
            quantity: 1,
            price: 999.99,
            total: 999.99,
          },
          {
            id: 2,
            name: "Wireless Mouse",
            quantity: 2,
            price: 29.99,
            total: 59.98,
          },
          {
            id: 3,
            name: "USB-C Cable",
            quantity: 4,
            price: 9.99,
            total: 39.96,
          },
        ],
      },
      {
        id: "ORD-002",
        customer: "Jane Smith",
        date: "2024-01-16",
        status: "Processing",
        total: 599.99,
        items: [
          {
            id: 4,
            name: "Monitor 27 4K",
            quantity: 1,
            price: 599.99,
            total: 599.99,
          },
        ],
      },
      {
        id: "ORD-003",
        customer: "Bob Johnson",
        date: "2024-01-17",
        status: "Shipped",
        total: 459.97,
        items: [
          {
            id: 5,
            name: "Mechanical Keyboard",
            quantity: 2,
            price: 129.99,
            total: 259.98,
          },
          {
            id: 6,
            name: "Monitor Stand",
            quantity: 1,
            price: 79.99,
            total: 79.99,
          },
          { id: 7, name: "Desk Pad", quantity: 1, price: 39.99, total: 39.99 },
        ],
      },
      {
        id: "ORD-004",
        customer: "Alice Williams",
        date: "2024-01-18",
        status: "Pending",
        total: 199.98,
        items: [
          { id: 8, name: "Webcam HD", quantity: 1, price: 89.99, total: 89.99 },
          { id: 9, name: "USB Hub", quantity: 2, price: 24.99, total: 49.98 },
          {
            id: 10,
            name: "Cable Management",
            quantity: 3,
            price: 19.99,
            total: 59.97,
          },
        ],
      },
    ];

    const itemColumns: AppColumn<OrderItem>[] = [
      {
        key: "name",
        header: "Item",
        accessor: "name",
      },
      {
        key: "quantity",
        header: "Qty",
        accessor: "quantity",
        align: "center",
      },
      {
        key: "price",
        header: "Price",
        accessor: (row) => `$${row.price.toFixed(2)}`,
        align: "right",
      },
      {
        key: "total",
        header: "Total",
        accessor: (row) => `$${row.total.toFixed(2)}`,
        align: "right",
      },
    ];

    const toggleRow = (orderId: string) => {
      const newExpandedRows = new Set(expandedRows);
      if (newExpandedRows.has(orderId)) {
        newExpandedRows.delete(orderId);
      } else {
        newExpandedRows.add(orderId);
      }
      setExpandedRows(newExpandedRows);
    };

    const ordersWithSubTables = orders.map((order) => ({
      ...order,
      isSubTableOpen: expandedRows.has(order.id),
      subTable: (
        <div className="bg-neutral-25 rounded-lg p-6">
          <h4 className="text-body-m mb-4 font-bold text-neutral-950">
            Order Items
          </h4>
          <AppTable<OrderItem> data={order.items} columns={itemColumns} />
        </div>
      ),
    }));

    const columns: AppColumn<Order>[] = [
      {
        key: "expand",
        header: "",
        size: 60,
        render: (row) => (
          <AppButton size="s" variant="ghost" onClick={() => toggleRow(row.id)}>
            {expandedRows.has(row.id) ? "▼" : "▶"}
          </AppButton>
        ),
      },
      {
        key: "id",
        header: "Order ID",
        accessor: "id",
        sortable: true,
      },
      {
        key: "customer",
        header: "Customer",
        accessor: "customer",
        sortable: true,
      },
      {
        key: "date",
        header: "Date",
        accessor: "date",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        align: "center",
        render: (row) => {
          const statusColors = {
            Pending: "bg-warning-50 text-wanring-700",
            Processing: "bg-info-50 text-info-700",
            Shipped: "bg-info-50 text-info-700",
            Delivered: "bg-positive-50 text-positive-700",
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
      {
        key: "total",
        header: "Total",
        accessor: (row) => `$${row.total.toFixed(2)}`,
        align: "right",
        sortable: true,
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-heading-5 font-bold text-neutral-950">
          Table with Sub-Tables
        </h3>
        <p className="text-body-s text-neutral-600">
          Click the expand button to show order items in a sub-table.
        </p>
        <AppTable<Order> data={ordersWithSubTables} columns={columns} />
      </div>
    );
  },
};

export const WithExpandableDetails: Story = {
  render: function WithExpandableDetailsRender() {
    interface Project {
      id: string;
      name: string;
      status: "Active" | "Completed" | "On Hold";
      budget: number;
      progress: number;
      tasks: Array<{ name: string; status: string; assignee: string }>;
      timeline: Array<{ milestone: string; date: string; completed: boolean }>;
      subTable?: React.ReactNode;
      isSubTableOpen?: boolean;
    }

    const [expandedRows, setExpandedRows] = React.useState<Set<string>>(
      new Set(),
    );

    const projects: Project[] = [
      {
        id: "PROJ-001",
        name: "Website Redesign",
        status: "Active",
        budget: 50000,
        progress: 75,
        tasks: [
          { name: "UI Design", status: "Completed", assignee: "Alice" },
          {
            name: "Frontend Development",
            status: "In Progress",
            assignee: "Bob",
          },
          {
            name: "Backend Integration",
            status: "Pending",
            assignee: "Charlie",
          },
        ],
        timeline: [
          { milestone: "Design Phase", date: "2024-01-15", completed: true },
          {
            milestone: "Development Phase",
            date: "2024-02-28",
            completed: false,
          },
          { milestone: "Testing Phase", date: "2024-03-15", completed: false },
        ],
      },
      {
        id: "PROJ-002",
        name: "Mobile App",
        status: "On Hold",
        budget: 75000,
        progress: 45,
        tasks: [
          { name: "Requirements", status: "Completed", assignee: "Diana" },
          { name: "Prototype", status: "In Review", assignee: "Eve" },
          { name: "Development", status: "Pending", assignee: "Frank" },
        ],
        timeline: [
          { milestone: "Planning", date: "2024-01-01", completed: true },
          { milestone: "Prototype", date: "2024-02-01", completed: false },
          { milestone: "Beta Release", date: "2024-04-01", completed: false },
        ],
      },
      {
        id: "PROJ-003",
        name: "Data Migration",
        status: "Completed",
        budget: 25000,
        progress: 100,
        tasks: [
          { name: "Data Analysis", status: "Completed", assignee: "Grace" },
          { name: "Migration Script", status: "Completed", assignee: "Henry" },
          { name: "Testing", status: "Completed", assignee: "Ivy" },
        ],
        timeline: [
          { milestone: "Analysis", date: "2023-12-01", completed: true },
          { milestone: "Migration", date: "2023-12-15", completed: true },
          { milestone: "Validation", date: "2024-01-01", completed: true },
        ],
      },
    ];

    const toggleRow = (projectId: string) => {
      const newExpandedRows = new Set(expandedRows);
      if (newExpandedRows.has(projectId)) {
        newExpandedRows.delete(projectId);
      } else {
        newExpandedRows.add(projectId);
      }
      setExpandedRows(newExpandedRows);
    };

    const projectsWithSubTables = projects.map((project) => ({
      ...project,
      isSubTableOpen: expandedRows.has(project.id),
      subTable: (
        <div className="bg-neutral-25 rounded-lg p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-body-m mb-3 font-bold text-neutral-950">
                Tasks
              </h4>
              <div className="space-y-2">
                {project.tasks.map((task, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded border bg-white p-3"
                  >
                    <div>
                      <div className="font-medium text-neutral-950">
                        {task.name}
                      </div>
                      <div className="text-caption-s text-neutral-500">
                        Assigned to {task.assignee}
                      </div>
                    </div>
                    <span
                      className={`text-caption-s rounded-full px-2 py-1 font-medium ${
                        task.status === "Completed"
                          ? "bg-positive-50 text-positive-700"
                          : task.status === "In Progress" ||
                              task.status === "In Review"
                            ? "bg-info-50 text-info-700"
                            : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-body-m mb-3 font-bold text-neutral-950">
                Timeline
              </h4>
              <div className="space-y-2">
                {project.timeline.map((milestone, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between rounded border bg-white p-3"
                  >
                    <div>
                      <div className="font-medium text-neutral-950">
                        {milestone.milestone}
                      </div>
                      <div className="text-caption-s text-neutral-500">
                        {milestone.date}
                      </div>
                    </div>
                    <span
                      className={`text-caption-s rounded-full px-2 py-1 font-medium ${
                        milestone.completed
                          ? "bg-positive-50 text-positive-700"
                          : "bg-neutral-100 text-neutral-600"
                      }`}
                    >
                      {milestone.completed ? "Completed" : "Pending"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    }));

    const columns: AppColumn<Project>[] = [
      {
        key: "expand",
        header: "",
        size: 60,
        render: (row) => (
          <AppButton size="s" variant="ghost" onClick={() => toggleRow(row.id)}>
            {expandedRows.has(row.id) ? "▼" : "▶"}
          </AppButton>
        ),
      },
      {
        key: "name",
        header: "Project",
        accessor: "name",
        sortable: true,
      },
      {
        key: "status",
        header: "Status",
        align: "center",
        render: (row) => {
          const statusColors = {
            Active: "bg-positive-50 text-positive-700",
            Completed: "bg-info-50 text-info-700",
            "On Hold": "bg-warning-50 text-wanring-700",
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
      {
        key: "budget",
        header: "Budget",
        accessor: (row) => `$${row.budget.toLocaleString()}`,
        align: "right",
        sortable: true,
      },
      {
        key: "progress",
        header: "Progress",
        align: "center",
        render: (row) => (
          <div className="flex items-center gap-2">
            <div className="h-2 w-12 overflow-hidden rounded-full bg-neutral-100">
              <div
                className="bg-positive-500 h-full transition-all"
                style={{ width: `${row.progress}%` }}
              />
            </div>
            <span className="text-caption-s text-neutral-600">
              {row.progress}%
            </span>
          </div>
        ),
      },
    ];

    return (
      <div className="space-y-4">
        <h3 className="text-heading-5 font-bold text-neutral-950">
          Expandable Project Details
        </h3>
        <p className="text-body-s text-neutral-600">
          Click the expand button to view detailed project information including
          tasks and timeline.
        </p>
        <AppTable<Project> data={projectsWithSubTables} columns={columns} />
      </div>
    );
  },
};
