import React, { InputHTMLAttributes } from 'react';

import Typography from '../Typography';

import mapModifiers from 'utils/functions';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  link?: {
    title: string;
    onClick: () => void;
  }
  children?: React.ReactNode;
  label?: string;
  error?: string;
  labelHtml?: React.ReactNode;
  bordered?: boolean;
  search?: boolean;
  prefix?: string;
}

const Input: React.FC<InputProps> = ({
  id, label, error, labelHtml, bordered, required, search, prefix, link, ...props
}) => (
  <div className={mapModifiers('a-input', bordered && 'bordered', search && 'search')}>
    <div className="a-input_labelWrapper">
      {(labelHtml || label) && (
        <label htmlFor={id} className="a-input_label">
          <Typography.Text modifiers={['12x18', '400']} type="span">{labelHtml || label}</Typography.Text>
          {required && <Typography.Text modifiers={['12x18', '400', 'carminePink']} type="span"> *</Typography.Text>}
        </label>
      )}
      {link && (
        <div className="a-input_labelWrapper_link" onClick={link.onClick}>
          {link.title}
        </div>
      )}
    </div>
    <div className={mapModifiers('a-input_ele', prefix && 'prefix')}>
      {prefix && <Typography.Text modifiers={['500']}>{prefix}</Typography.Text>}
      <input id={id} {...props} />
    </div>
    {
      error && (
        <div className="a-input_error">
          {error}
        </div>
      )
    }
  </div>
);

Input.defaultProps = {
  children: undefined,
};

export default Input;
