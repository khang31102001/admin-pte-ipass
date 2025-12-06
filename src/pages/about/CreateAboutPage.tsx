// src/pages/admin/AboutSettingsPage.tsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import PageMeta from "@/components/common/PageMeta";
import PageBreadcrumb from "@/components/common/PageBreadCrumb";
import ComponentCard from "@/components/common/ComponentCard";
import ActionButtons from "@/components/common/ActionButtons";

import AboutForm from "@/components/about/AboutForm";

import { About } from "@/types/about";
import { aboutService } from "@/services/about/aboutService";
import { useAboutInfoQuery } from "@/hooks/about/useAbout";


export default function CreateAboutPage() {
  const navigate = useNavigate();

  const { data: initialAboutData } = useAboutInfoQuery({ category: "ABOUT_ME" });
  const [aboutData, setAboutData] = useState<About>(initialAboutData);

  useEffect(() => {
    if (initialAboutData) {
      setAboutData(initialAboutData);
    }
  }, [initialAboutData]);
  // const [errors, setErrors] = useState<AboutErrors>({});
  
  
  const updateAboutData = (updates: Partial<About>) => {
    setAboutData((prev) => ({
      ...prev,
      ...updates,
    }));
  };



  const handleSave = async () => {
   

    try {

      if (aboutData.aboutId) {
        await aboutService.updateAbout(aboutData.aboutId, aboutData);
      }
      console.log("About saved successfully");
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
