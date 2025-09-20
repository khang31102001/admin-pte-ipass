import { useEffect, useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, { TableColumn } from "../../components/tables/BasicTables/TableComponent";
import Button from "@/components/ui/button/Button";
import { userService } from "@/services/course/courseService";

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

export default function CoursesTable() {
  const [courses, setCourses] = useState<Course[]>([]);

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
        title="Courses Table | TailAdmin"
        description="Courses list with dynamic table"
      />
      <PageBreadcrumb pageTitle="Course" />
      <div className="space-y-6">
        <ComponentCard title="Course List">
          <TableComponent columns={columns} data={courses} />
        </ComponentCard>
      </div>
    </>
  );
}
