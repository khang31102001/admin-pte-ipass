import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, { TableColumn } from "../../components/tables/BasicTables/TableComponent";
import Button from "@/components/ui/button/Button";
import { userService } from "@/services/user/userService"; // đổi sang user service

// Định nghĩa User interface theo API response
interface User {
  user_id: number;
  username: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
}

const columns: TableColumn<User>[] = [
  { key: "user_id", header: "ID" },
  { key: "username", header: "Username" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
  { key: "created_at", header: "Created At" },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log("Edit", row.user_id)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="warning"
          onClick={() => console.log("Delete", row.user_id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];

export default function UsersTable() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await userService.getAllUsers();
        console.log("Users fetched:", response);
        if (response?.items) {
          setUsers(response.items);
        }
        else if (Array.isArray(response)) {
          setUsers(response);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <PageMeta
        title="Users Table | TailAdmin"
        description="Users list with dynamic table"
      />
      <PageBreadcrumb pageTitle="Users" />
      <div className="space-y-6">
        <ComponentCard title="User List">
          <TableComponent columns={columns} data={users} />
        </ComponentCard>
      </div>
    </>
  );
}
