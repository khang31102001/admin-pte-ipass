// src/components/auth/SignInForm.tsx
import { EyeCloseIcon, EyeIcon } from "../../icons";
import Label from "../form/Label";
import Input from "../form/input/InputField";
import Checkbox from "../form/input/Checkbox";
import Button from "../ui/button/Button";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

export default function SignIn() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [showPassword, setShowPassword] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setLoading(true);
    try {
      await signIn({ username, password, remember });
      navigate("/", { replace: true });
    } catch (error: unknown) {
      // const msg = error?.response?.data?.message || "Đăng nhập thất bại.";
      console.log(error);
      setErr("Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col flex-1">

      <div className="flex flex-col justify-center flex-1 w-full max-w-md mx-auto">
        <div>
          <div className="mb-5 sm:mb-8">
            <h1 className="mb-2 font-semibold text-gray-800 text-title-sm dark:text-white/90 sm:text-title-md">
              Đăng nhập hệ thống
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Nhập tài khoản để truy cập hệ thống quản lý khóa học PTE.
            </p>
          </div>

          <div>
            {/* Social buttons giữ nguyên ... */}

            <div className="relative py-3 sm:py-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200 dark:border-gray-800"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="p-2 text-gray-400 bg-white dark:bg-gray-900 sm:px-5 sm:py-2">
                  Hoặc
                </span>
              </div>
            </div>

            <form onSubmit={onSubmit}>
              <div className="space-y-6">
                <div>
                  <Label>
                    Tên đăng nhập hoặc Email{" "}
                    <span className="text-error-500">*</span>
                  </Label>
                  <Input
                    placeholder="vd: admin@pteipass.com"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setUsername(e.target.value)
                    }
                  />
                </div>

                <div>
                  <Label>
                    Mật khẩu <span className="text-error-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Nhập mật khẩu"
                      value={password}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setPassword(e.target.value)
                      }
                    />
                    <span
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute z-30 -translate-y-1/2 cursor-pointer right-4 top-1/2"
                      aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                    >
                      {showPassword ? (
                        <EyeIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      ) : (
                        <EyeCloseIcon className="fill-gray-500 dark:fill-gray-400 size-5" />
                      )}
                    </span>
                  </div>
                </div>

                {err && (
                  <p className="text-sm text-red-500">
                    {err || "Đăng nhập không thành công. Vui lòng kiểm tra lại."}
                  </p>
                )}

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox checked={isChecked} onChange={setIsChecked} />
                    <span className="block font-normal text-gray-700 text-theme-sm dark:text-gray-400">
                      Ghi nhớ đăng nhập
                    </span>
                  </div>
                  {/* <Link
                    to="/reset-password"
                    className="text-sm text-brand-500 hover:text-brand-600 dark:text-brand-400"
                  >
                    Quên mật khẩu?
                  </Link> */}
                </div>

                <div>
                  <Button className="w-full" size="sm" disabled={loading}>
                    {loading ? "Đang đăng nhập..." : "Đăng nhập"}
                  </Button>
                </div>
              </div>
            </form>
            <div className="mt-5">
              <p className="text-sm font-normal text-center text-gray-700 dark:text-gray-400 sm:text-start">
                Bạn chưa có tài khoản? Vui lòng liên hệ quản trị viên hoặc bộ phận IT để được cấp tài khoản.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}
