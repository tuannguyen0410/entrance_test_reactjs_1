import { Story, Meta } from '@storybook/react';
import React from 'react';

import SocialBtnGroup from '.';

export default {
  title: 'Components/organisms/SocialBtnGroup',
  component: SocialBtnGroup,
  argTypes: {},
} as Meta;

export const normal: Story = () => (
  <SocialBtnGroup socialList={[]} />
);
