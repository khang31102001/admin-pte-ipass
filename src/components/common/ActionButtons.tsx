import type React from "react";
import Button from "@/components/ui/button/Button";

export interface ActionButtonsProps {
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
        <Button size="sm" variant="outline" onClick={onCancel}>
          {cancelLabel}
        </Button>
      )}

      {onChange && (
        <Button size="sm" variant="primary" onClick={onChange}>
          {changeLabel}
        </Button>
      )}

      {onUpdate && (
        <Button size="sm" onClick={onUpdate}>
          {updateLabel}
        </Button>
      )}

      {onSave && (
        <Button size="sm" variant="primary" onClick={onSave}>
          {saveLabel}
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;
