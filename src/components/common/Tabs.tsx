import React from "react";

export interface TabItem {
  id: number;
  value: string;
  label: string;
  icon?: React.ReactNode;
}
export interface TabsProps {
  items: TabItem[];
  defaultActiveId?: number;
  onChange?(id: number): void;
  children?: React.ReactNode;
  className?: string;
}

const Tabs: React.FC<TabsProps> = ({
  items,
  defaultActiveId,
  onChange,
  className = "",
  children
}) => {
 

  const handleTabClick = (id: number) => {
    onChange?.(id);
  };



  return (
    <div className={className}>
      {/* List Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 border-b border-border">
        {items.map((item) => {
          const isActive = item.id === defaultActiveId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => handleTabClick(item.id)}
              className={[
                "px-4 py-2 text-sm font-medium border-b-2 transition-colors",
                "hover:text-primary",
                isActive
                  ? "border-yellow-400 text-brand-700"
                  : "border-transparent text-black",
              ].join(" ")}
            >
              <div className="flex items-center gap-2">
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="mt-4">
       {children}
      </div>
    </div>
  );
};

export default Tabs;
