import React from 'react';

interface Win95ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'normal' | 'default';
  children: React.ReactNode;
}

/**
 * Windows 95/98 styled button component
 *
 * @param variant - 'normal' for standard button, 'default' for default button (thicker border)
 * @param children - Button content
 * @param ...props - Standard button HTML attributes
 */
export default function Win95Button({
  variant = 'normal',
  children,
  className = '',
  ...props
}: Win95ButtonProps) {
  const baseClass = 'win95-button';
  const variantClass = variant === 'default' ? 'win95-button-default' : '';
  const combinedClassName = [baseClass, variantClass, className].filter(Boolean).join(' ');

  return (
    <button className={combinedClassName} {...props}>
      {children}
    </button>
  );
}
