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
import { useNavigate } from "react-router";
import { ROUTES } from "@/config/routes";
import { DataTablePagination } from "@/components/ui/pagination/DataTablePagination";
import ActionButtons from "@/components/common/ActionButtons";
import { useNewsQuery } from "@/hooks/news/useNewsQuery";
import { newsService } from "@/services/news/newsService";
import { formatDate } from "@/lib/helper";
import { useConfirmDelete } from "@/hooks/common/useConfirmDelete";
import ActionDropdown from "@/components/common/ActionDropdown";
import ListSkeleton from "@/components/loading/ListSkeleton";
import EmptyState from "@/components/common/EmptyState";

type NewsColumnHandlers = {
  selectedIds: number[];
  onToggleSelectOne: (newsId: number) => void;
  onToggleDropdown?: () => void;
  onView?: (news: News) => void;
};

function createNewsColumns({
  selectedIds,
  onToggleDropdown,
  onToggleSelectOne,
}: NewsColumnHandlers): TableColumn<News>[] {
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
          checked={selectedIds.includes(row.newsId)}
          onChange={() => onToggleSelectOne(row.newsId)}
        />
      ),
    },
    { key: "newsId", header: "ID", cellClassName: "whitespace-nowrap w-[60px]" },
    {
      key: "title",
      header: "Title",
      cellClassName: "max-w-[320px] whitespace-nowrap truncate",
    },
    { key: "categoryType", header: "Category type" },
    { key: "author", header: "Author" },
    { key: "status", header: "Status" },
    {
      key: "createdAt",
      header: "Created",
      render: (row) => formatDate(row.createdAt) || "-",
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
  const [openMenu, setOpenMenu] = useState<boolean>(false);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(15);
  const [newsId, setNewsId] = useState<number | null>(null);
  const { confirmDelete } = useConfirmDelete();

  const { data, isLoading, refetch } = useNewsQuery({
    page,
    pageSize,
    search,
  });
  const news = data?.items ?? [];
  const total = data?.total ?? 0;

  // console.log("new:", news);

  // const allIds = news.map((item) => item.newsId);
  // const allSelected =
  //   allIds.length > 0 && allIds.every((id) => selectedIds.includes(id));

  const handleEditNews = () => {
    if (!newsId) return;
    const items = news.find((i) => i.newsId === newsId);
    if (!items.slug) return;
    navigate(ROUTES.NEWS.UPDATE(items.slug));
  };

  const handleDeleteNews = async () => {

    if (!selectedIds || selectedIds.length === 0) return;

    await confirmDelete(
      async () => {
        await newsService.deleteNews(selectedIds);
        await refetch();
        setPage(1);
        setPageSize(15);
        setSearch("");
        setSelectedIds([]);
      },
      {
        title: "Xóa tin tức đã chọn?",
        text: `Bạn chắc chắn muốn xóa tin tức này?`,
      }
    );
  };


  const handleToggleSelectOne = (newsId: number) => {
    setSelectedIds((prev) =>
      prev.includes(newsId)
        ? prev.filter((id) => id !== newsId)
        : [...prev, newsId]
    );
    setNewsId(newsId);
  };

  // const handleToggleSelectAll = () => {
  //   if (allSelected) {
  //     setSelectedIds([]);
  //   } else {
  //     setSelectedIds(allIds);
  //   }
  // };

  const handleToggleDropdown = () => {
    setOpenMenu((v) => (!v));
  };
  const closeMenu = () => setOpenMenu(null);

  const handleCreateNews = () => {
    navigate(ROUTES.NEWS.CREATE);
  };

  const columns = createNewsColumns({
    selectedIds,
    onToggleSelectOne: handleToggleSelectOne,
    onToggleDropdown: handleToggleDropdown,
  });

  const actions = [
    {
      key: "edit",
      label: <>✏️ Update</>,
      onClick: handleEditNews,
    },
    {
      key: "delete",
      label: <>🗑 Delete selected</>,
      onClick: handleDeleteNews,
      danger: true,
      disabled: selectedIds.length === 0,
    },

  ];

  if(isLoading){
     return <ListSkeleton rows={10} variant="table"/>
  }

  if(!isLoading && news.length === 0){
    return (
      <EmptyState
        title="Hiện tại chưa có tin tức nào"
        description="Vui lòng tạo tin tức mới để bắt đầu quản lý nội dung"
        action={<button className="rounded-lg bg-[#04016C] px-4 py-2 text-xs font-medium text-white">➕ Tạo Tin</button>}
      />
    );
  }



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
          <>

            <div className="relative">
              <TableComponent<News>
                columns={columns}
                data={news}
                onRowClick={(row) => {
                  const item = row as News;
                  if (!item.slug) return;
                  navigate(ROUTES.NEWS.UPDATE(item.slug));
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
        </ComponentCard>
      </div>
    </>
  );
}
