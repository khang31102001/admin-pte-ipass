import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent, { TableColumn } from "../../components/tables/BasicTables/TableComponent";
import { ITeacher } from "@/types/teacher";
import { useTeachersQuery } from "@/hooks/teacher/useTeachersQuery";
import { useState } from "react";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";
import ActionDropdown from "@/components/common/ActionDropdown";
import { DataTablePagination } from "@/components/ui/pagination/DataTablePagination";
import { useConfirmDelete } from "@/hooks/common/useConfirmDelete";
import { MoreVertical } from "lucide-react";
import { formatDate } from "@/lib/helper";
import ActionButtons from "@/components/common/ActionButtons";
import SearchInput from "@/components/form/input/SearchInput";

type TeachersColumnHandlers = {
  selectedIds: number[];
  onToggleSelectOne: (courseId: number) => void;
  onToggleDropdown?: () => void;

};

function createTeacherColumns({
  selectedIds,
  onToggleDropdown,
  onToggleSelectOne,

}: TeachersColumnHandlers): TableColumn<ITeacher>[] {

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
          checked={selectedIds.includes(row.teacherId)}
          onChange={() => onToggleSelectOne(row.teacherId)}
        />
      ),
    },
    {
      key: "teacherId",
      header: "ID",
    },

    {
      key: "name",
      header: "Name",
      cellClassName: "max-w-[200px] truncate",
    },

    {
      key: "slug",
      header: "URL",
      cellClassName: "max-w-[220px] truncate",
    },

    {
      key: "overallScore",
      header: "Overall",
      render: (row) => row.overallScore ?? "-",
    },

    {
      key: "skills",
      header: "Skills",
      render: (row) =>
        `L:${row.listeningScore} · S:${row.speakingScore} · R:${row.readingScore} · W:${row.writingScore}`,
    },

    {
      key: "createdAt",
      header: "Created At",
      render: (row) => formatDate(row.createdAt) ?? "-",
    },

    {
      key: "createdBy",
      header: "Created By",
      render: (row) => row.createdBy ?? "-",
    },

  ];
}



export default function ListTeacherPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [teacherId, setTeacherId] = useState<number | null>(null);
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const { confirmDelete } = useConfirmDelete();

  const { data, isLoading, refetch } = useTeachersQuery({
    page,
    pageSize,
    search,
  });
  console.log("teachers audit data:", data);
  const teachers = data?.items ?? [];
  const total = data?.total ?? 0;

  const handleEditTeacher = () => {
    if (!teacherId) return;
    const items = teachers.find((i) => i.teacherId === teacherId);
    if (!items.slug) return;
    navigate(ROUTES.TEACHER.UPDATE(items.slug));
  };

  const handleDeleteTeacher = async () => {
    if (!teacherId) return;

    await confirmDelete(
      async () => {
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

  }

  const handleToggleSelectOne = (teacherId: number) => {
    setSelectedIds((prev) =>
      prev.includes(teacherId)
        ? prev.filter((id) => id !== teacherId)
        : [...prev, teacherId]
    );

    setTeacherId(teacherId);
  };
  const closeMenu = () => setOpenMenu(false);
  const handleToggleDropdown = () => setOpenMenu((prev) => (!prev));



  const columns = createTeacherColumns({
    selectedIds,
    onToggleSelectOne: handleToggleSelectOne,
    onToggleDropdown: handleToggleDropdown,

  });


  const actions = [
    {
      key: "edit",
      label: <>✏️ Update</>,
      onClick: handleEditTeacher,
    },
    {
      key: "delete",
      label: <>🗑 Delete selected</>,
      onClick: handleDeleteTeacher,
      danger: true,
      disabled: selectedIds.length === 0,
    },
  ];

  return (
    <>
      <PageMeta
        title="Quản lý giáo viên | Admin Dashboard"
        description="Danh sách giáo viên và quản lý thông tin giảng dạy trong hệ thống."
      />

      <PageBreadcrumb pageTitle="Quản lý giáo viên" />

      <div className="space-y-6">
        <ComponentCard
          title="Danh sách giáo viên"
          desc="Module này sẽ sớm được phát triển. Hiện tại bạn có thể xem giao diện khung để chuẩn bị cho dữ liệu."
          filtersSlot={
             <SearchInput
              value={search}
              placeholder="Tìm khóa học..."
              onChange={(v) => setSearch(v)}
            />
          }
          actionsSlot={
            <ActionButtons
              saveLabel="Thêm viên"
              onSave={()=>navigate(ROUTES.TEACHER.CREATE)}
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
                {teachers.length > 0 ? (
                  <>
                    <TableComponent<ITeacher>
                      columns={columns}
                      data={teachers}
                      onRowClick={(row) => {
                        const item = row as ITeacher;
                        if (!item.slug) return;
                        navigate(ROUTES.TEACHER.UPDATE(item.slug));
                      }}
                    />

                    <ActionDropdown
                      isOpen={openMenu}
                      onClose={closeMenu}
                      actions={actions}
                      className="top-8 left-8"
                    />
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-300 bg-gray-50 py-16 text-center">
                    <p className="text-sm font-medium text-gray-600">
                      Hiện tại chưa có giáo viên nào
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      Vui lòng tạo giáo viên mới để bắt đầu quản lý nội dung
                    </p>
                  </div>
                )}
              </div>
              {teachers.length > 0 && (
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
              )}


            </>
          )}
        </ComponentCard>
      </div>
    </>
  );
}


