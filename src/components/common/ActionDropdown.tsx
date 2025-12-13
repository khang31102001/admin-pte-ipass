
import React, { ReactNode } from "react";
import { Dropdown } from "@/components/ui/dropdown/Dropdown";
import { DropdownItem } from "@/components/ui/dropdown/DropdownItem";

export interface ActionItem {
  key: string;
  label: ReactNode;
  onClick: () => void;
  danger?: boolean;
  disabled?: boolean;
}
interface ActionDropdownProps {
  isOpen: boolean;
  onClose: () => void;
  actions: ActionItem[];
  className?: string;
}

const ActionDropdown: React.FC<ActionDropdownProps> = ({
  isOpen,
  onClose,
  actions,
  className = "",
}) => {
  if (!isOpen) return null;

  return (
    <Dropdown
      isOpen={isOpen}
      onClose={onClose}
      className={`w-44 p-2 z-[99999] ${className}`}
    >
      <ul className="flex flex-col gap-1">
        {actions.map((action) => (
          <li key={action.key}>
            <DropdownItem
              tag="button"
              onClick={() => {
                if (action.disabled) return;
                action.onClick();
                onClose();
              }}
              className={[
                "block w-full rounded-lg px-3 py-2 text-left text-sm transition",
                action.danger
                  ? "text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/40"
                  : "text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5",
                action.disabled ? "opacity-50 cursor-not-allowed" : "",
              ].join(" ")}
            >
              {action.label}
            </DropdownItem>
          </li>
        ))}
      </ul>
    </Dropdown>
  );
};

export default ActionDropdown;
