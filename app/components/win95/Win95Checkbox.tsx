'use client';

import React, { useState } from 'react';

interface Win95CheckboxProps {
  label?: string;
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Windows 95/98 styled checkbox component
 *
 * Features the classic sunken checkbox with checkmark
 *
 * @param label - Label text displayed next to checkbox
 * @param checked - Controlled checked state
 * @param defaultChecked - Default checked state (uncontrolled)
 * @param onChange - Callback when checked state changes
 * @param disabled - Whether checkbox is disabled
 * @param name - Name attribute for form submission
 * @param id - ID attribute
 * @param className - Additional CSS classes
 */
export default function Win95Checkbox({
  label,
  checked: controlledChecked,
  defaultChecked = false,
  onChange,
  disabled = false,
  name,
  id,
  className = '',
  style,
}: Win95CheckboxProps) {
  const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);

  const isControlled = controlledChecked !== undefined;
  const isChecked = isControlled ? controlledChecked : uncontrolledChecked;

  const handleClick = () => {
    if (disabled) return;

    const newChecked = !isChecked;

    if (!isControlled) {
      setUncontrolledChecked(newChecked);
    }

    onChange?.(newChecked);
  };

  return (
    <div
      className={`win95-checkbox-container ${className}`}
      onClick={handleClick}
      style={{ opacity: disabled ? 0.5 : 1, ...style }}
    >
      <div className={`win95-checkbox ${isChecked ? 'win95-checkbox-checked' : ''}`} />
      {label && (
        <span className="win95-checkbox-label">{label}</span>
      )}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => {}} // Controlled by div click
        disabled={disabled}
        name={name}
        id={id}
        style={{ display: 'none' }}
      />
    </div>
  );
}
