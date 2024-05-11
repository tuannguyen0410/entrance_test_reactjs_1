import { Story, Meta } from '@storybook/react';
import React from 'react';

import Checkbox from '.';

export default {
  title: 'Components/atoms/Checkbox',
  component: Checkbox,
  argTypes: {},
} as Meta;

export const border: Story = () => (
  <div style={{ padding: 30 }}>
    <Checkbox label="Text" />
  </div>
);

export const normal: Story = () => (
  <div style={{ padding: 30 }}>
    <Checkbox label="text" variant="normal" />
  </div>
);
