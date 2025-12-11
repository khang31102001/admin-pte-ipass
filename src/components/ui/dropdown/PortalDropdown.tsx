import { cn } from "@/lib/utils";
import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";


interface DropdownProps {
  isOpen: boolean;
  onClose: () => void;
  anchorRef?: React.RefObject<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

export const PortalDropdown: React.FC<DropdownProps> = ({
  isOpen,
  onClose,
  className,
  children,
}) => {
  const [position, setPosition] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });
  const anchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && anchorRef?.current) {
      const rect = anchorRef.current.getBoundingClientRect();

      setPosition({
        top: rect.bottom + 8,     // cách button 8px
        left: rect.right - 160,   // dropdown rộng 160px, canh phải
      });
    }
  }, [isOpen, anchorRef]);

  useEffect(() => {
    if (!isOpen) return;
        const handler = (e: MouseEvent) => {
      if (anchorRef?.current?.contains(e.target as Node)) return; // nhấn vào button ⇒ không đóng
      onClose();
    };

    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [isOpen,anchorRef ,onClose]);

  if (!isOpen) return null;

  const content = (
    <div
     ref={anchorRef}
      className={cn(
        "fixed z-[99999] w-40 rounded-2xl border border-gray-200 bg-white p-2 shadow-lg dark:border-gray-700 dark:bg-gray-900",
        className
      )}
      style={{ top: position.top, left: position.left }}
    >
      {children}
    </div>
  );

  return createPortal(content, document.body);
};
