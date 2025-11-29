import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, { TableColumn } from "../../components/tables/BasicTables/TableComponent";
import Button from "@/components/ui/button/Button";
import { userService } from "@/services/course/courseService";
import SearchInput from "@/components/form/input/SearchInput";
import { Plus } from "lucide-react";


interface Course {
  course_id: number;
  course_code: string;
  course_name: string;
  level: string;
  mode: string;
  language: string;
  price: string;
}

const columns: TableColumn<Course>[] = [
  { key: "course_id", header: "ID" },
  { key: "course_code", header: "Code" },
  { key: "course_name", header: "Name" },
  { key: "level", header: "Level" },
  { key: "mode", header: "Mode" },
  { key: "language", header: "Language" },
  { key: "price", header: "Price" },
  {
    key: "actions",
    header: "Actions",
    render: (row) => (
      <div className="flex gap-2">
        <Button
          size="sm"
          variant="outline"
          onClick={() => console.log("Edit", row.course_id)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="warning"
          onClick={() => console.log("Delete", row.course_id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];


 const courseUI = {
  search: (search: string, setSearch: (v: string) => void) => (
    <SearchInput
      value={search}
      placeholder="Tìm khóa học..."
      onChange={(v) => setSearch(v)}
    />
  ),

  actions: {
    create: (
      <Button
        size="sm"
        variant="primary"
        startIcon={<Plus className="h-4 w-4" />}
      >
        Thêm Khóa Học
      </Button>
    ),
  },
};

export default function ListCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await userService.getAllCourses();
        console.log("Courses fetched:", response);

        if (response?.items) {
          setCourses(response.items);
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);


 


  return (
    <>
      <PageMeta
        title="Danh sách khóa học | Admin Dashboard"
        description="Trang quản lý danh sách tất cả các khóa học trong hệ thống. Xem, tìm kiếm, lọc, chỉnh sửa và quản lý trạng thái khóa học."
      />
      <PageBreadcrumb pageTitle="Khóa học" />
      <div className="space-y-6">
        <ComponentCard 
        title="Danh sách tất cả các khóa học"
        desc="Quản lý danh sách và trạng thái các khóa học."
        filtersSlot={courseUI.search(search, setSearch)}
        actionsSlot={courseUI.actions.create}
        >
          <TableComponent columns={columns} data={courses} />
        </ComponentCard>
      </div>
    </>
  );
}
