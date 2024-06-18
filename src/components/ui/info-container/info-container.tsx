import { FC } from 'react';
import { TInfoContainerProps } from './type';
import styles from './info-conatiner.module.css';

export const InfoContainer: FC<TInfoContainerProps> = ({ title, children }) => (
  <div className={styles.content}>
    <h3 className={`text text_type_main-large`}>{title}</h3>
    {children}
  </div>
);
