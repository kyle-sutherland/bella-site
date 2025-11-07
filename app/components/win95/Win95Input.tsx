import React from 'react';

/**
 * Windows 95/98 styled text input component
 *
 * Features sunken 3D border effect typical of Win95 text inputs
 *
 * @param ...props - Standard input HTML attributes
 */
export default function Win95Input({
  className = '',
  type = 'text',
  ...props
}: React.InputHTMLAttributes<HTMLInputElement>) {
  const combinedClassName = ['win95-input', className].filter(Boolean).join(' ');

  return (
    <input
      type={type}
      className={combinedClassName}
      {...props}
    />
  );
}
