import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import useDidMount from 'hooks/useDidMount';
import {
  getAccessToken,
  setAccessToken,
} from 'services/common/storage';
import { getProfileAction } from 'store/auth';
import { useAppDispatch } from 'store/hooks';

const useInitialRender = () => {
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigator = useNavigate();
  const [isDone, setIsDone] = useState(false);

  const expiredAction = () => {
    if (!(location.pathname === '/login' || location.pathname === '/signup')) {
      navigator(location.pathname, {
        state: {
          from: `${location.pathname}${location.search}`
        }
      });
    } else {
      navigator('/login');
    }
    setAccessToken('');
    setIsDone(true);
  };

  useDidMount(async () => {
    try {
      const token = getAccessToken();
      if (token) {
        await dispatch(getProfileAction()).unwrap().then(() => {
          setIsDone(true);
        }).catch(() => {
          expiredAction();
        });
        setIsDone(true);
      } else {
        expiredAction();
      }
    } catch {
      expiredAction();
    }
  });
  return isDone;
};

export default useInitialRender;
