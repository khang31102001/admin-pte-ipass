
import React from "react";

interface FormSectionProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  withTopBorder?: boolean;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  description,
  children,
  withTopBorder = false,
}) => (
  <section className={withTopBorder ? "border-t border-gray-200 pt-6" : ""}>
    <h2 className="text-lg font-semibold text-gray-900 mb-2">{title}</h2>
    {description && (
      <p className="text-sm text-gray-500 mb-4">{description}</p>
    )}
    <div className="space-y-4">{children}</div>
  </section>
);
