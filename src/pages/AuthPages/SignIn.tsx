import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "./AuthPageLayout";
import SignInForm from "../../components/auth/SignInForm";

export default function SignIn() {

  return (
    <>
      <PageMeta
        title="Đăng nhập hệ thống | PTE iPass - Trung tâm luyện thi PTE"
        description="Trang đăng nhập dành cho hệ thống quản lý khóa học, giảng viên và học viên của PTE iPass."
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
