import React from 'react';

interface Win95PanelProps {
  children: React.ReactNode;
  variant?: 'raised' | 'sunken';
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Windows 95/98 styled panel/container component
 *
 * Features 3D border effects - either raised (default) or sunken
 *
 * @param children - Content to display inside the panel
 * @param variant - 'raised' for raised 3D effect (default), 'sunken' for inset effect
 * @param className - Additional CSS classes
 * @param style - Inline styles
 */
export default function Win95Panel({
  children,
  variant = 'raised',
  className = '',
  style,
}: Win95PanelProps) {
  const baseClass = variant === 'sunken' ? 'win95-panel-sunken' : 'win95-panel';
  const combinedClassName = [baseClass, className].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName} style={style}>
      {children}
    </div>
  );
}
