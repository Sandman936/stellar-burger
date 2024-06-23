import React, { FC } from 'react';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch } from '../../../services/store';
import { clearOrderData } from '../../../services/slices/orderSlice';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const currentTab = location.pathname;
  const dispatch = useDispatch();

  let isConstructorActive: boolean = false;
  let isFeedActive: boolean = false;
  let isProfileActive: boolean = false;

  if (currentTab === '/' || currentTab.includes('/ingredients')) {
    isConstructorActive = true;
    isFeedActive = false;
    isProfileActive = false;
    dispatch(clearOrderData());
  }

  if (currentTab.includes('/feed')) {
    isFeedActive = true;
    isConstructorActive = false;
    isProfileActive = false;
  }

  if (
    currentTab.includes('/profile') ||
    currentTab.includes('/login') ||
    currentTab.includes('/forgot-password') ||
    currentTab.includes('/register') ||
    currentTab.includes('/reset-password')
  ) {
    isProfileActive = true;
    isConstructorActive = false;
    isFeedActive = false;
  }

  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <Link
            to={'/'}
            className={clsx(
              styles.link,
              isConstructorActive && styles.link_active
            )}
          >
            <BurgerIcon type={isConstructorActive ? 'primary' : 'secondary'} />
            <p className={'text text_type_main-default ml-2 mr-10'}>
              Конструктор
            </p>
          </Link>
          <Link
            to={'/feed'}
            className={clsx(styles.link, isFeedActive && styles.link_active)}
          >
            <ListIcon type={isFeedActive ? 'primary' : 'secondary'} />
            <p className={'text text_type_main-default ml-2'}>Лента заказов</p>
          </Link>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <Link
          to={'/profile'}
          className={clsx(
            styles.link,
            styles.link_position_last,
            isProfileActive && styles.link_active
          )}
        >
          <ProfileIcon type={isProfileActive ? 'primary' : 'secondary'} />
          <p className='text text_type_main-default ml-2'>
            {userName || 'Личный кабинет'}
          </p>
        </Link>
      </nav>
    </header>
  );
};
