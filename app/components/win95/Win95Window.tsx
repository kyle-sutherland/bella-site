import React from 'react';

interface Win95WindowProps {
  title: string;
  children: React.ReactNode;
  active?: boolean;
  showMinimize?: boolean;
  showMaximize?: boolean;
  showClose?: boolean;
  onMinimize?: () => void;
  onMaximize?: () => void;
  onClose?: () => void;
  className?: string;
  style?: React.CSSProperties;
  icon?: React.ReactNode;
}

/**
 * Windows 95/98 styled window component with title bar
 *
 * Features classic window chrome including title bar with gradient,
 * window control buttons, and 3D borders
 *
 * @param title - Window title text
 * @param children - Window content
 * @param active - Whether window is active (affects title bar styling)
 * @param showMinimize - Show minimize button
 * @param showMaximize - Show maximize button
 * @param showClose - Show close button
 * @param onMinimize - Callback when minimize is clicked
 * @param onMaximize - Callback when maximize is clicked
 * @param onClose - Callback when close is clicked
 * @param className - Additional CSS classes
 * @param style - Inline styles
 * @param icon - Optional icon to display in title bar
 */
export default function Win95Window({
  title,
  children,
  active = true,
  showMinimize = true,
  showMaximize = true,
  showClose = true,
  onMinimize,
  onMaximize,
  onClose,
  className = '',
  style,
  icon,
}: Win95WindowProps) {
  const titleBarClass = active ? 'win95-title-bar' : 'win95-title-bar win95-title-bar-inactive';
  const combinedClassName = ['win95-window', className].filter(Boolean).join(' ');

  return (
    <div className={combinedClassName} style={style}>
      <div className={titleBarClass}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          {icon && <span style={{ display: 'flex', alignItems: 'center' }}>{icon}</span>}
          <span>{title}</span>
        </div>
        <div style={{ display: 'flex', gap: '2px' }}>
          {showMinimize && (
            <button
              className="win95-title-button"
              onClick={onMinimize}
              aria-label="Minimize"
            >
              _
            </button>
          )}
          {showMaximize && (
            <button
              className="win95-title-button"
              onClick={onMaximize}
              aria-label="Maximize"
            >
              □
            </button>
          )}
          {showClose && (
            <button
              className="win95-title-button"
              onClick={onClose}
              aria-label="Close"
            >
              ×
            </button>
          )}
        </div>
      </div>
      <div style={{ padding: '8px' }}>
        {children}
      </div>
    </div>
  );
}
