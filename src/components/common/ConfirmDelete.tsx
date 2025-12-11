import React from "react";
import ReactDOM from "react-dom";
import Button from "@/components/ui/button/Button";
import Alert from "@/components/ui/alert/Alert";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const RenderConfirmDelete: React.FC<ConfirmDeleteProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  if (typeof document === "undefined") return null;

  const modal = (
    <div
      className="
        fixed inset-0 z-[9999] 
        flex items-center justify-center 
        bg-black/40 backdrop-blur-sm 
        px-4
      "
      onClick={onClose} // click ra ngoài để đóng
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // chặn bubbling
        className="
          w-full max-w-md 
          rounded-2xl border border-gray-100 
          bg-white/95 shadow-2xl 
          dark:bg-slate-900 dark:border-slate-700
          p-5 sm:p-6
          transform transition-all duration-200 
          scale-100 opacity-100
        "
      >
        {/* Header nhỏ phía trên */}
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">
            Xoá danh mục
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="
              inline-flex items-center justify-center 
              h-8 w-8 rounded-full 
              text-gray-400 hover:text-gray-600 
              hover:bg-gray-100 
              dark:hover:bg-slate-800 dark:hover:text-gray-200
              transition-colors
            "
          >
            ✕
          </button>
        </div>

        {/* Nội dung cảnh báo */}
        <Alert
          variant="warning"
          title="Bạn có chắc chắn muốn xoá?"
          message="Dữ liệu sau khi xoá sẽ không thể khôi phục. Hành động này không thể hoàn tác, hãy kiểm tra kỹ trước khi thực hiện."
          showLink={false}
        />

        {/* Nút action */}
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            className="
              sm:min-w-[90px] 
              justify-center
            "
          >
            Cancel
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={onConfirm}
            className="
              sm:min-w-[110px] 
              justify-center
              bg-red-600 hover:bg-red-700 
              text-white
            "
          >
            Xác nhận xoá
          </Button>
        </div>
      </div>
    </div>
  );

  return ReactDOM.createPortal(modal, document.body);
};
export default RenderConfirmDelete; 