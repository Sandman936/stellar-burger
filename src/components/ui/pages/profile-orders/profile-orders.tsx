import { FC } from 'react';

import styles from './profile-orders.module.css';

import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      {orders.length ? (
        <OrdersList orders={orders} />
      ) : (
        <div className={styles.detailPageWrap}>
          <p
            className={`text text_type_digits-default ${styles.detailHeader} `}
          >
            История заказов отсутствует
          </p>
        </div>
      )}
    </div>
  </main>
);
