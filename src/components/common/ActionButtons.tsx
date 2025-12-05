import type React from "react";
import Button from "@/components/ui/button/Button";
import { Loader } from "lucide-react";

export interface ActionButtonsProps {

  isSaving?: boolean;
  // callback đều optional – có thì mới hiện nút
  onSave?: () => void;
  onCancel?: () => void;
  onUpdate?: () => void;
  onChange?: () => void;

  // optional: custom label cho mỗi nút
  saveLabel?: string;
  cancelLabel?: string;
  updateLabel?: string;
  changeLabel?: string;

  className?: string; // custom class cho wrapper
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  isSaving = false,
  onSave,
  onCancel,
  onUpdate,
  onChange,
  saveLabel = "Lưu",
  cancelLabel = "Hủy",
  updateLabel = "Cập nhật",
  changeLabel = "Thay đổi",
  className = "",
}) => {
  // nếu không có nút nào thì khỏi render luôn cho sạch DOM
  if (!onSave && !onCancel && !onUpdate && !onChange) return null;

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {onCancel && (
        <Button  size="sm" variant="outline" className="font-semibold" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}

      {onChange && (
        <Button disabled={isSaving} size="sm" variant="primary" className="font-semibold" onClick={onChange}>
          {changeLabel}
        </Button>
      )}

      {onUpdate && (
        <Button disabled={isSaving} size="sm" onClick={onUpdate}>
          {updateLabel}
        </Button>
      )}

      {onSave && (
        <Button disabled={isSaving} size="sm" variant="primary" className="font-semibold" onClick={onSave}>
          {isSaving && <Loader />}
          {saveLabel}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
