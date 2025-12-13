import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import TableComponent from "../../components/tables/BasicTables/TableComponent";

export default function ListTeacherPage() {
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
        >
          <div className="rounded-xl border border-dashed border-gray-300 bg-gray-50 p-4 text-sm text-gray-600 dark:border-white/10 dark:bg-white/5 dark:text-gray-300">
            🚧 Module <b>Quản lý giáo viên</b> sẽ sớm được phát triển (Coming soon).
            <div className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              Bạn có thể dùng trang này để tích hợp API, filter, phân trang, và thao tác CRUD trong các sprint tiếp theo.
            </div>
          </div>

          <div className="mt-4">
            <TableComponent columns={[]} data={[]} />
          </div>
        </ComponentCard>
      </div>
    </>
  );
}
