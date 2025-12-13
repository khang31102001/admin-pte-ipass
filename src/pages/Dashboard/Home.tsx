// import EcommerceMetrics from "../../components/ecommerce/EcommerceMetrics";
// import MonthlySalesChart from "../../components/ecommerce/MonthlySalesChart";
// import StatisticsChart from "../../components/ecommerce/StatisticsChart";
// import MonthlyTarget from "../../components/ecommerce/MonthlyTarget";
// import RecentOrders from "../../components/ecommerce/RecentOrders";
// import DemographicCard from "../../components/ecommerce/DemographicCard";
import PageMeta from "../../components/common/PageMeta";

export default function Home() {
  return (
    <>
      <PageMeta
        title="Admin Dashboard | IPTE"
        description="Trang tổng quan quản trị hệ thống IPTE. Các tính năng quản lý và báo cáo sẽ sớm được cập nhật trong các phiên bản tiếp theo."
      />

      <div className="space-y-3">
        <h2 className="text-2xl font-semibold text-slate-800">
          Dashboard quản trị IPTE
        </h2>

        <p className="text-sm text-slate-600">
          Chào mừng bạn đến với hệ thống quản trị IPTE.
          Các chức năng quản lý, thống kê và báo cáo đang trong quá trình phát triển và sẽ sớm được cập nhật trong thời gian tới.
        </p>

        <div className="mt-4 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-700">
          🚧 <b>Tính năng đang phát triển</b>
          <ul className="mt-2 list-disc list-inside text-slate-600 space-y-1">
            <li>Quản lý thông tin giáo viên và học viên</li>
            <li>Quản lý comment đánh giá</li>
            <li>Báo cáo hoạt động hệ thống</li>
          </ul>
        </div>
      </div>
      {/* <div className="grid grid-cols-12 gap-4 md:gap-6">
        <div className="col-span-12 space-y-6 xl:col-span-7">
          <EcommerceMetrics />
          <MonthlySalesChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <MonthlyTarget />
        </div>

        <div className="col-span-12">
          <StatisticsChart />
        </div>

        <div className="col-span-12 xl:col-span-5">
          <DemographicCard />
        </div>

        <div className="col-span-12 xl:col-span-7">
          <RecentOrders />
        </div>
      </div> */}
    </>
  );
}
