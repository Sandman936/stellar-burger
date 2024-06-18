import { FC } from 'react';
import { AppHeaderUI } from '@ui';
import { useSelector } from '../../services/store';
import { userSelectors } from '../../services/slices/userSlice';

export const AppHeader: FC = () => {
  const userData = useSelector(userSelectors.selectorUserData);
  return <AppHeaderUI userName={userData?.name} />;
};
