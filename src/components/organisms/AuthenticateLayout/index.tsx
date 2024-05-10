import React from 'react';

import Image from 'components/atoms/Image';

interface AuthenticateLayoutProps {
  leftBgImage: string;
  children?: React.ReactNode;
}

const AuthenticateLayout: React.FC<AuthenticateLayoutProps> = ({
  leftBgImage,
  children
}) => (
  <div className="o-authenticateLayout">
    <div className="o-authenticateLayout_leftContainer">
      <div className="o-authenticateLayout_leftContainer-imgWrapper">
        <Image ratio="726x576" imgSrc={leftBgImage} alt="leftBgImage" />
      </div>
    </div>
    <div className="o-authenticateLayout_rightContainer">
      {children}
    </div>
  </div>
);

AuthenticateLayout.defaultProps = {
  children: undefined,
};

export default AuthenticateLayout;
