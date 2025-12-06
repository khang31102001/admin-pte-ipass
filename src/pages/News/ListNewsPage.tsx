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
import { News } from "@/types/news";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";
import { DataTablePagination } from "@/components/ui/pagination/DataTablePagination";
import { RenderConfirmDelete } from "@/components/common/ConfirmDelete";
import ActionButtons from "@/components/common/ActionButtons";
import { useNewsQuery } from "@/hooks/news/useNewsQuery";
import { newsService } from "@/services/news/newsService";
import { useQueryClient } from "@tanstack/react-query";

type NewsColumnHandlers = {
  selectedIds: number[];
  allSelected: boolean;
  onToggleSelectAll: () => void;
  onToggleSelectOne: (newsId: number) => void;
  openMenuId: number | null;
  onToggleDropdown?: (newsId: number) => void;
  onView?: (news: News) => void;
  onEdit?: (news: News) => void;
  onDelete?: (news: News) => void;
};

function createNewsColumns({
  selectedIds,
  allSelected,
  onToggleSelectAll,
  onToggleDropdown,
  openMenuId,
  onToggleSelectOne,
  onView,
  onEdit,
  onDelete,
}: NewsColumnHandlers): TableColumn<News>[] {
  return [
    {
      key: "select",
      header: (
        <input
          type="checkbox"
          onChange={onToggleSelectAll}
          checked={allSelected}
        />
      ),
      render: (row) => (
        <input
          type="checkbox"
          checked={selectedIds.includes(row.newsId)}
          onChange={() => onToggleSelectOne(row.newsId)}
        />
      ),
    },
    { key: "newsId", header: "ID" },
    { key: "title", header: "Title" },
    { key: "categoryType", header: "Category type" },
    { key: "author", header: "Author" },
    { key: "status", header: "Status" },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => row.createdAt || "-",
    },
    {
      key: "actions",
      header: "Actions",
      render: (row) => {
        if (!row.newsId) return null;
        const isOpen = openMenuId === row.newsId;
        const closeDropdown = () => {
          onToggleDropdown?.(row.newsId);
        };

        return (
          <div className="relative flex justify-end pr-4">
            <button
              type="button"
              onClick={() => onToggleDropdown?.(row.newsId)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full border border-gray-200 bg-white text-gray-500 shadow-sm hover:bg-gray-50 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              <MoreVertical className="h-4 w-4" />
            </button>

            <Dropdown
              isOpen={isOpen}
              onClose={closeDropdown}
              className="!absolute !right-0 !top-10 !z-[999] !mt-0 flex w-40 flex-col rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900"
            >
              <ul className="flex flex-col gap-1">
                <li>
                  <DropdownItem
                    onItemClick={() => {
                      onView?.(row);
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
                      onEdit?.(row);
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
                      onDelete?.(row);
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
        );
      },
    },
  ];
}

const btnUI = {
  search: (search: string, setSearch: (v: string) => void) => (
    <SearchInput
      value={search}
      placeholder="Tìm kiếm tin tức..."
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
        Thêm tin tức
      </Button>
    ),
  },
};

export default function ListNewsPage() {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [newsId, setNewsId] = useState<number | null>(null);
  const queryClient = useQueryClient();
  const { data, isLoading } = useNewsQuery({
    page,
    pageSize,
    search,
  });
  const news = data?.items ?? [];
  const total = data?.total ?? 0;
  console.log("new:", news);

  const allIds = news.map((item) => item.newsId);
  const allSelected =
    allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

  const handleViewNews = (item: News) => {
    if (!item.slug) return;
    navigate(ROUTES.NEWS.DETAIL(item.slug));
  };
  const handleEditNews = (item: News) => {
    if (!item.slug) return;
    navigate(ROUTES.NEWS.UPDATE(item.slug));
  };

  const handleDeleteNews = async (item: News) => {
    if (!item.newsId) {
      setIsDeleteOpen(false);
      return;
    }

    setIsDeleteOpen(true);
    setNewsId(item.newsId);
  };

  const handleDeleteConfirmed = async () => {
    try {
      if (newsId !== null) {
        await newsService.deleteNews(newsId);
        await queryClient.invalidateQueries({ queryKey: ["news"] });
        setPage(1);
        setPageSize(15);
        setSearch("");
        setSelectedIds([]);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsDeleteOpen(false);
    }
  };

  const handleToggleSelectOne = (newsId: number) => {
    setSelectedIds((prev) =>
      prev.includes(newsId)
        ? prev.filter((id) => id !== newsId)
        : [...prev, newsId]
    );
  };

  const handleToggleSelectAll = () => {
    if (allSelected) {
      setSelectedIds([]);
    } else {
      setSelectedIds(allIds);
    }
  };

  const handleToggleDropdown = (newsId: number) => {
    setOpenMenuId((prev) => (prev === newsId ? null : newsId));
  };

  const handleCreateNews = () => {
    navigate(ROUTES.NEWS.CREATE);
  };

  const columns = createNewsColumns({
    selectedIds,
    allSelected,
    onToggleSelectAll: handleToggleSelectAll,
    onToggleSelectOne: handleToggleSelectOne,
    onToggleDropdown: handleToggleDropdown,
    openMenuId: openMenuId,
    onView: handleViewNews,
    onEdit: handleEditNews,
    onDelete: handleDeleteNews,
  });

  return (
    <>
      <PageMeta
        title="Danh sách tin tức | Admin Dashboard"
        description="Quản lý tin tức, tìm kiếm, lọc và cập nhật."
      />
      <PageBreadcrumb pageTitle="Danh sách tin tức" />
      <div className="space-y-6">
        <ComponentCard
          title="Danh sách tất cả tin tức"
          desc="Quản lý danh sách và trạng thái tin tức."
          filtersSlot={btnUI.search(search, setSearch)}
          actionsSlot={
            <ActionButtons saveLabel="Thêm tin tức" onSave={handleCreateNews} />
          }
        >
          {isLoading ? (
            <div className="py-10 text-center text-sm text-gray-500">
              Đang tải dữ liệu...
            </div>
          ) : (
            <>
              {news.length === 0 ? (
                <div className="py-10 text-center text-sm text-gray-500">
                  Hiện chưa có tin tức nào.
                </div>
              ) : (
                <>
                  <TableComponent<News> columns={columns} data={news} />
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
              <RenderConfirmDelete
                isOpen={isDeleteOpen}
                onClose={() => setIsDeleteOpen(false)}
                onConfirm={handleDeleteConfirmed}
              />
            </>
          )}
        </ComponentCard>
      </div>
    </>
  );
}
