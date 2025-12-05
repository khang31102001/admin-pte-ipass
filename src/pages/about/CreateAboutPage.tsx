// src/pages/admin/AboutSettingsPage.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import ActionButtons from "@/components/common/ActionButtons";

import AboutForm from "@/components/about/AboutForm";

import { About } from "@/types/about";
// import { aboutService } from "@/services/aboutService"; // nếu có API

// Mock data mẫu – bạn có thể load từ API
const initialAboutData: About = {
  aboutId: 1,
  image: "https://via.placeholder.com/800x400?text=PTE+iPASS+About",
  title: "About PTE iPASS",
  description:
    "PTE iPASS is a dedicated training centre focusing on PTE Academic, helping students achieve their target scores faster with clear strategies and real-exam simulations.",
  mission:
    "To empower students with practical PTE strategies, high-quality materials, and 1:1 support so that they can achieve their migration and study goals.",
  vision:
    "To become the most trusted and effective PTE preparation brand for Vietnamese and international students across Australia and Asia.",
  email: "support@pteipass.com",
  phone: "+61 4xx xxx xxx",
  hotline: "1800 PTE IPASS",
  website: "https://pteipass.com",
  address: "Level 3, PTE iPASS Building, Darwin City, NT, Australia",
  facebookUrl: "https://www.facebook.com/pteipass",
  zaloUrl: "",
  tiktokUrl: "https://www.tiktok.com/@pteipass",
  youtubeUrl: "https://www.youtube.com/@pteipass",
  category: "PTE English Center",
  mapUrl: "https://www.google.com/maps/embed?...",
};

// type AboutErrors = Partial<Record<keyof About, string>>;

export default function CreateAboutPage() {
  const navigate = useNavigate();

  const [aboutData, setAboutData] = useState<About>(initialAboutData);
  // const [errors, setErrors] = useState<AboutErrors>({});
  
  
  const updateAboutData = (updates: Partial<About>) => {
    setAboutData((prev) => ({
      ...prev,
      ...updates,
    }));
  };



  const handleSave = async () => {
   

    try {

      // TODO: Gọi API lưu dữ liệu
      // await aboutService.updateAbout(aboutData);
      console.log("SAVE ABOUT DATA:", aboutData);

      // Option: toast success ở đây nếu bạn có hệ thống toast
      // toast.success("Thông tin About đã được lưu thành công!");
    } catch (error) {
      console.error("Failed to save About:", error);
      // toast.error("Có lỗi xảy ra khi lưu dữ liệu.");
    } 
  };

  const handleCancel = () => {
    // Quay lại trang danh sách / dashboard
    navigate('/'); // sửa lại route đúng với hệ thống của bạn
  };

  return (
    <>
      <PageMeta
        title="Cài đặt trang Giới thiệu | Admin Dashboard"
        description="Quản lý nội dung trang About của PTE iPASS: thông tin chung, liên hệ, sứ mệnh, tầm nhìn và kênh mạng xã hội."
      />

      <PageBreadcrumb pageTitle="Cài đặt trang Giới thiệu" />

      <div className="space-y-6">
        <ComponentCard
          title="Thông tin trang Giới thiệu"
          desc="Cập nhật nội dung hiển thị trên trang About của PTE iPASS."
          actionsSlot={
            <ActionButtons
              onCancel={handleCancel}
              onSave={handleSave}
          
            />
          }
        >
          <AboutForm
            aboutData={aboutData}
            onSubmit={updateAboutData}
          />
        </ComponentCard>
      </div>
    </>
  );
}
