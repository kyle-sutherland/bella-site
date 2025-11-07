import React from 'react';

interface Win95SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  children: React.ReactNode;
}

/**
 * Windows 95/98 styled select/dropdown component
 *
 * Features sunken 3D border effect typical of Win95 dropdowns
 *
 * @param children - Option elements
 * @param ...props - Standard select HTML attributes
 */
export default function Win95Select({
  className = '',
  children,
  ...props
}: Win95SelectProps) {
  const combinedClassName = ['win95-select', className].filter(Boolean).join(' ');

  return (
    <select className={combinedClassName} {...props}>
      {children}
    </select>
  );
}
