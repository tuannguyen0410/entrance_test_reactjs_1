import React from 'react';

import Icon, { IconName } from 'components/atoms/Icon';
import Link from 'components/atoms/Link';
import mapModifiers from 'utils/functions';

export type SocialItem = {
  icon: IconName;
  href: string;
  type: 'facebook' | 'github' | 'twitter' | 'mail';
};

interface SocialBtnGroupProps {
  socialList: SocialItem[];
}

const SocialBtnGroup: React.FC<SocialBtnGroupProps> = ({ socialList }) => (
  <div className="o-socialBtnGroup">
    {socialList.map((item, idx) => (
      <Link useExternal href={item.type !== 'mail' ? item.href : `mailto:${item.href}`} key={`socialItem-${String(idx)}`}>
        <div className={mapModifiers('o-socialBtnGroup_item', item.type)}>
          <Icon iconName={item.icon as IconName} size="14" />
        </div>
      </Link>
    ))}
  </div>
);

SocialBtnGroup.defaultProps = {
  socialList: [],
};

export default SocialBtnGroup;
