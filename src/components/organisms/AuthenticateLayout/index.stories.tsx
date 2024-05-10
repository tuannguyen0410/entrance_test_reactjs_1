import { Story, Meta } from '@storybook/react';
import React from 'react';

import AuthenticateLayout from '.';

export default {
  title: 'Components/organisms/AuthenticateLayout',
  component: AuthenticateLayout,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <AuthenticateLayout leftBgImage="" />
);
