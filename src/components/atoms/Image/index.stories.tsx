import { Story, Meta } from '@storybook/react';
import React from 'react';

import Image from '.';

export default {
  title: 'Components/atoms/Image',
  component: Image,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <div style={{ maxWidth: '600px', padding: '50px', background: '#ccc' }}><Image imgSrc="https://picsum.photos/200" alt="logo" ratio="16x9" /></div>
);
