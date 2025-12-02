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

    // Nếu chưa có document (SSR) thì tránh lỗi
    if (typeof document === "undefined") return null;

    return ReactDOM.createPortal(
        <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black/40 px-4">
            <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl dark:bg-gray-900">
                {/* ALERT CONTENT */}
                <Alert
                    variant="warning"
                    title="Xác nhận xoá?"
                    message="Dữ liệu sau khi xoá sẽ không thể khôi phục. Bạn có chắc chắn muốn tiếp tục?"
                    showLink={false}
                />

                <div className="mt-6 flex justify-end gap-3">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={onClose}
                    >
                        Cancel
                    </Button>

                    <Button
                        variant="primary"
                        size="sm"
                        onClick={onConfirm}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>,
        document.body
    );
};
