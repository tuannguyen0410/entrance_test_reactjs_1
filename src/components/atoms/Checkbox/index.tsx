/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { forwardRef } from 'react';

import mapModifiers from 'utils/functions';

export interface CheckBoxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'> {
  link?: {
    title: string;
    onClick: () => void;
  }
  label?: string;
  variant?: 'normal' | 'italic';
}

const Checkbox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({
    link,
    label,
    variant,
    ...props
  }, ref) => (
    <div className={mapModifiers('a-checkbox', variant)}>
      <label className="a-checkbox_label">
        <input
          type="checkbox"
          ref={ref}
          hidden
          {...props}
        />
        {link && (
          <div className="a-checkbox_link" onClick={link.onClick}>
            {link.title}
          </div>
        )}
        <span className="a-checkbox_text">{label}</span>
        <span className="a-checkbox_checkMark" />
      </label>
    </div>
  ),
);

export default Checkbox;
