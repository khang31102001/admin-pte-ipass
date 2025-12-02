import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, { TableColumn } from "../../components/tables/BasicTables/TableComponent";
import Button from "@/components/ui/button/Button";
import SearchInput from "@/components/form/input/SearchInput";
import { MoreVertical, Plus } from "lucide-react";
import { Course } from "@/types/courses";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";
import { DataTablePagination } from "@/components/ui/pagination/DataTablePagination";
import { useCoursesQuery } from "@/hooks/courses/useCoursesQuery";
import { RenderConfirmDelete } from "@/components/common/ConfirmDelete";
import ActionButtons from "@/components/common/ActionButtons";
import { courseService } from "@/services/course/courseService";

type CourseColumnHandlers = {
  selectedIds: number[];
  onToggleSelectAll: () => void;
  onToggleSelectOne: (courseId: number) => void;
  openMenuId: number | null;
  onToggleDropdown?: (courseId: number) => void;
  onView?: (course: Course) => void;
  onEdit?: (course: Course) => void;
  onDelete?: (course: Course) => void;
};

function createCourseColumns({
  selectedIds,
  onToggleSelectAll,
  onToggleDropdown,
  openMenuId,
  onToggleSelectOne,
  onView,
  onEdit,
  onDelete,

}: CourseColumnHandlers): TableColumn<Course>[] {
  return [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          onChange={onToggleSelectAll}
          checked={selectedIds.length > 0 && selectedIds.length === selectedIds.length}
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={row.course_id ? selectedIds.includes(row.course_id) : false}
          onChange={() => row.course_id && onToggleSelectOne(row.course_id)}
        />
      ),
    },
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
      render: (row) => {
        if (!row.course_id) return null;
        const isOpen = openMenuId === row.course_id;
        const closeDropdown = () => {
          onToggleDropdown(row.course_id!);
        };

        return (
          <div className="relative flex justify-end pr-4">

            <button
              type="button"
              onClick={() => onToggleDropdown(row.course_id!)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            {/* Dropdown */}
            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="!absolute !right-0 !top-10 !z-[999] !mt-0 flex w-40 flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <ul className="flex flex-col gap-1">
                <li>
                  <DropdownItem
                    onItemClick={() => {
                      onView(row);
                      closeDropdown();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
                  >
                    View
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    onItemClick={() => {
                      onEdit(row);
                      closeDropdown();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
                  >
                    Edit
                  </DropdownItem>
                </li>
                <li>
                  <DropdownItem
                    onItemClick={() => {
                      onDelete(row);
                      closeDropdown();
                    }}
                    className="block w-full rounded-lg px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  >
                    Delete
                  </DropdownItem>
                </li>
              </ul>
            </Dropdown>
          </div>
        )
      }
    },
  ];
}



const btnUI = {
  search: (search: string, setSearch: (v: string) => void) => (
    <SearchInput
      value={search}
      placeholder="Tìm khóa học..."
      onChange={(v) => setSearch(v)}
    />
  ),

  actions: {
    create: (onCreate: ()=> void) =>(
       <Button
       onClick={onCreate}
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
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [courseId, setCourseId] = useState<number | null>(null);
   const { data, isLoading} = useCoursesQuery({
    page,
    pageSize,
    search,
  });
  const courses = data?.items ?? [];
  const total = data?.total ?? 0;

  console.log(data)



  // ----- HANDLERS -----
  const handleViewCourse = (course: Course) => {
    if (!course.slug) return;
    navigate(ROUTES.COURSES.DETAIL(course.slug));
  };
  const handleEditCourse = (course: Course) => {
    if (!course.slug) return;
    navigate(ROUTES.COURSES.UPDATE_BY_SLUG(course.slug));
  };

  const handleDeleteCourse = async (course: Course) => {
    if (!course.course_id) {
      setIsDeleteOpen(false);
    };
    
    setIsDeleteOpen(true);
    setCourseId(course.course_id);
    // ví dụ: delete one or delete all

    // await userService.deleteCourse(course.course_id);
    // setCourses(prev => prev.filter(c => c.course_id !== course.course_id));
  };

  const handleDeleteConfirmed = async () =>{

    try{
      console.log("Deleting course with ID:", courseId);
      if (courseId !== null) {
        await courseService.deleteCourse(courseId);
        console.log("Course deleted successfully.");
        setPage(1);
        setPageSize(15);
        setSearch(null); 
      }
    }catch(error){
      console.log(error)
     
    }finally{
      setIsDeleteOpen(false)
    }

  }


  const handleToggleSelectOne = (courseId: number) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );
  };

  const handleToggleSelectAll = () => {
    if (selectedIds.length === courses.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(courses.map((c) => c.course_id!).filter(Boolean));
    }
  };

  const handleToggleDropdown = (courseId: number) => {
    setOpenMenuId((prev) => (prev === courseId ? null : courseId));
  };

    const handleCreateCourse = () => {
    navigate(ROUTES.COURSES.CREATE);
  }

  // Tạo columns bằng factory function, truyền handler & state vào
  const columns = createCourseColumns({
    selectedIds,
    onToggleSelectAll: handleToggleSelectAll,
    onToggleSelectOne: handleToggleSelectOne,
    onToggleDropdown: handleToggleDropdown,
    openMenuId: openMenuId,
    onView: handleViewCourse,
    onEdit: handleEditCourse,
    onDelete: handleDeleteCourse,
  });
  
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
          filtersSlot={btnUI.search(search, setSearch)}
          actionsSlot={
            <ActionButtons
                saveLabel="Thêm khóa học"
                onSave={handleCreateCourse}
            />
          }
        >

          {
            isLoading ? (
              <div className="py-10 text-center text-sm text-gray-500">
                Đang tải dữ liệu...
              </div>
            ) : (
              <>
                <TableComponent<Course> columns={columns} data={courses} />
                <DataTablePagination
                  page={page}
                  pageSize={pageSize}
                  total={total}
                  pageSizeOptions={[15, 30, 50, 100]}
                  onPageChange={setPage}
                  onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPage(1);
                  }}
                />
                <RenderConfirmDelete
                  isOpen={isDeleteOpen}
                  onClose={() => setIsDeleteOpen(false)}
                  onConfirm={handleDeleteConfirmed}
                />
              </>
            )
          }

        </ComponentCard>
      </div>
    </>
  );
}
