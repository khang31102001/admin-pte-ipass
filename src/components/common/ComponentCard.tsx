interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  desc?: string;
  actionsSlot?: React.ReactNode;
  filtersSlot?: React.ReactNode;
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  actionsSlot,
  filtersSlot,
}) => {
  const hasRightSide = filtersSlot || actionsSlot;

  return (
    <div
      className={`
        rounded-2xl border border-gray-200 bg-white
        dark:border-gray-800 dark:bg-white/[0.03]
        ${className}
      `}
    >
      {/* Card Header */}
      <div
        className={`
          flex flex-col gap-3
          sm:flex-row sm:items-center sm:justify-between
          px-4 py-4 sm:px-6 sm:py-5
        `}
      >
        {/* Left: title + desc */}
        <div>
          <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>

        {/* Right: filters + actions */}
        {hasRightSide && (
          <div
            className={`
              flex flex-col gap-2
              sm:flex-row sm:items-center sm:gap-3
            `}
          >
            {filtersSlot && (
              <div className="w-full sm:w-auto">{filtersSlot}</div>
            )}
            {actionsSlot && (
              <div className="w-full sm:w-auto sm:flex sm:justify-end">
                {actionsSlot}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Card Body */}
      <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-4 sm:px-6 sm:py-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
