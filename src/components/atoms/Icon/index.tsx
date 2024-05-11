import React from 'react';

import mapModifiers from 'utils/functions';

export const iconList = {
  search: 'search',
  fb: 'fb',
  twt: 'twt',
  mail: 'mail',
  git: 'git',
  power: 'power',
  logout: 'logout',
  close: 'close'
};

export type IconName = keyof typeof iconList;

export type IconSize = '6' | '8' | '12' | '14' | '16' | '20' | '24' | '32' | '40';
interface IconProps {
  iconName: IconName;
  size?: IconSize;
}
const Icon: React.FC<IconProps> = ({ iconName, size }) => (
  <i className={mapModifiers('a-icon', iconName, size)} />);

Icon.defaultProps = {
  size: '40',
};

export default Icon;
