import React, { useEffect, useState } from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';

import avatar from 'assets/images/avatar.png';
import dbImg from 'assets/images/db_bg.png';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Typography from 'components/atoms/Typography';
import { signOutService } from 'services/auth';
import {
  getAccessToken, setAccessToken, setRefreshToken, getRefreshToken
} from 'services/common/storage';
import { logout } from 'store/auth';
import { useAppDispatch, useAppSelector } from 'store/hooks';
import mapModifiers from 'utils/functions';

const Home: React.FC = () => {
  const token = getAccessToken();
  const refreshToken = getRefreshToken() || '';
  const [isOpen, setIsOpen] = useState(false);
  const navigator = useNavigate();
  const dispatch = useAppDispatch();

  const { profileData } = useAppSelector((state) => state.auth);

  const { mutate: signOutMutate } = useMutation(
    ['signOutService'],
    async () => signOutService({ refreshToken }),
    {
      onSuccess: () => {
        setAccessToken('');
        setRefreshToken('');
        dispatch(logout());
        navigator('/login');
      },
    }
  );

  const handleSignOut = () => {
    signOutMutate();
  };

  useEffect(() => {
    if (!token) {
      navigator('/login');
    }
  }, [token, navigator]);
  return (
    <div className="p-home">
      <div className={mapModifiers('p-home_sidenav', isOpen ? 'open' : '')}>
        <div className="p-home_sidenav-close" onClick={() => setIsOpen(false)}>
          <Icon iconName="close" size="16" />
        </div>
        <div className="p-home_sidenav-item" onClick={handleSignOut}>
          <Icon iconName="logout" size="16" />
          <Typography.Text type="span" modifiers={['oldLavender7b', '400', '14x21']}>
            Logout
          </Typography.Text>
        </div>
      </div>
      <div className="p-home_header">
        <div className="p-home_hamburgerWrapper" onClick={() => setIsOpen(true)}>
          <div className="p-home_hamburger" />
          <div className="p-home_hamburger" />
          <div className="p-home_hamburger" />
        </div>
        <div className="p-home_info">
          <div className="p-home_info-text">
            <Typography.Text modifiers={['400', '14x21', 'oldLavender7b', 'right']}>
              {profileData?.firstName || 'firstName'}
              {' '}
              {profileData?.lastName || 'lastName'}
            </Typography.Text>
            <Typography.Text modifiers={['400', '12x18', 'gray', 'right']}>
              Available
            </Typography.Text>
          </div>
          <div className="p-home_info-avatar">
            <img src={avatar} alt="avatar" />
            <div className="p-home_info-avatarDropdown">
              <div className="p-home_info-avatarDropdown-item" onClick={handleSignOut}>
                <Typography.Text type="span" modifiers={['oldLavender7b', '400', '14x21']}>
                  Logout
                </Typography.Text>
                <Icon iconName="power" size="16" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-home_container">
        <Typography.Heading modifiers={['500', 'cadet', 'center']}>
          Welcome to Demo App
        </Typography.Heading>
        <div className="p-home_img">
          <Image imgSrc={dbImg} ratio="595x496" alt="dashboardImg" />
        </div>
      </div>

      <div className="p-home_footer">
        <Typography.Text modifiers={['400', '12x18', 'oldLavender7b']}>
          COPYRIGHT © 2020
        </Typography.Text>
      </div>
    </div>
  );
};

export default Home;
