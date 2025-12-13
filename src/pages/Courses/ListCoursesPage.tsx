import { useState } from "react";
import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, {
  TableColumn,
} from "../../components/tables/BasicTables/TableComponent";
import Button from "@/components/ui/button/Button";
import SearchInput from "@/components/form/input/SearchInput";
import { MoreVertical, Plus } from "lucide-react";
import { Course } from "@/types/courses";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";
import { DataTablePagination } from "@/components/ui/pagination/DataTablePagination";
import { useCoursesQuery } from "@/hooks/courses/useCoursesQuery";
import ActionButtons from "@/components/common/ActionButtons";
import { courseService } from "@/services/course/courseService";
import ActionDropdown from "@/components/common/ActionDropdown";
import { useConfirmDelete } from "@/hooks/common/useConfirmDelete";
import { formatDate } from "@/lib/helper";

type CourseColumnHandlers = {
  selectedIds: number[];
  onToggleSelectOne: (courseId: number) => void;
  onToggleDropdown?: () => void;

};

function createCourseColumns({
  selectedIds,
  onToggleDropdown,
  onToggleSelectOne,

}: CourseColumnHandlers): TableColumn<Course>[] {
  return [
    {
      key: "select",
      header: (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleDropdown?.();
          }}
          className="rounded p-1 hover:bg-white/10"
        >
          <MoreVertical className="h-4 w-4 text-white" />
        </button>
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.courseId)}
          onChange={() => onToggleSelectOne(row.courseId)}
        />
      ),
    },
    { key: "courseId", header: "ID" },
    { key: "courseName", header: "Name", cellClassName: "max-w-[220px] truncate" },
    { key: "slug", header: "url" , cellClassName: "max-w-[220px] truncate"},
    { key: "level", header: "Level" },
    { 
      key: "createdAt", 
      header: "create at", 
      render: (row) => formatDate(row.createdAt) ?? "-",
    },
    { 
      key: "createBy", 
      header: "Author" ,
      render:(row)=> formatDate(row.createdBy)
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
    create: (onCreate: () => void) => (
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
  const [openMenu, setOpenMenu] = useState<boolean | null>(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [courseId, setCourseId] = useState<number | null>(null);
  const {confirmDelete} = useConfirmDelete();
  const { data, isLoading, refetch } = useCoursesQuery({
    page,
    pageSize,
    search,
  });
  const courses = data?.items ?? [];
  const total = data?.total ?? 0;

  // ----- HANDLERS -----
  // const handleViewCourse = (course: Course) => {
  //   if (!course.slug) return;
  //   navigate(ROUTES.COURSES.DETAIL(course.slug));
  // };
  const handleEditCourse = () => {
    if(!courseId) return;
    const items = courses.find((i)=> i.courseId === courseId);
    if (!items.slug) return;
    navigate(ROUTES.COURSES.UPDATE(items.slug));
  };

  const handleDeleteCourse = async () => {
    if (!courseId) return;

   await confirmDelete(
      async () => {
        await courseService.deleteCourse(courseId);
        await refetch();
        setPage(1);
        setPageSize(15);
        setSearch("");
        setSelectedIds([]);
      },
      {
        title: "Xóa khóa học đã chọn?",
        text: `Bạn chắc chắn muốn xóa  khoa học này?`,
      }
    );
  };
    
  


  const handleToggleSelectOne = (courseId: number) => {
    setSelectedIds((prev) =>
      prev.includes(courseId)
        ? prev.filter((id) => id !== courseId)
        : [...prev, courseId]
    );

    setCourseId(courseId);
  };

  // const handleToggleSelectAll = () => {
  //   if (selectedIds.length === courses.length) {
  //     setSelectedIds([]);
  //   } else {
  //     setSelectedIds(courses.map((c) => c.courseId!).filter(Boolean));
  //   }
  // };

  const handleToggleDropdown = () => {
    setOpenMenu((prev) => (!prev));
  };
  const closeMenu = () => setOpenMenu(null);
  const handleCreateCourse = () => {
    navigate(ROUTES.COURSES.CREATE);
  };

  // Tạo columns bằng factory function, truyền handler & state vào
  const columns = createCourseColumns({
    selectedIds,
    onToggleSelectOne: handleToggleSelectOne,
    onToggleDropdown: handleToggleDropdown,

  });

   const actions = [
    {
      key: "edit",
      label: <>✏️ Update</>,
      onClick: handleEditCourse,
    },
    {
      key: "delete",
      label: <>🗑 Delete selected</>,
      onClick: handleDeleteCourse,
      danger: true,
      disabled: selectedIds.length === 0,
    },
  ];


  return (
    <>
      <PageMeta
        title="Danh sách khóa học | Admin Dashboard"
        description="Trang quản lý danh sách tất cả các khóa học trong hệ thống. Xem, tìm kiếm, lọc, chỉnh sửa và quản lý trạng thái khóa học."
      />
      <PageBreadcrumb pageTitle="Danh sách khóa học" />
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
          {isLoading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              <div className="relative">
                  <TableComponent<Course>
                  columns={columns}
                  data={courses}
                  onRowClick={(row) => {
                    const item = row as Course;
                    if (!item.slug) return;
                    navigate(ROUTES.COURSES.UPDATE(item.slug));
                  }}
                />
                <ActionDropdown
                  isOpen={openMenu}
                  onClose={closeMenu}
                  actions={actions}
                  className="top-8 left-8"
                />
              </div>
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
            
            </>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
