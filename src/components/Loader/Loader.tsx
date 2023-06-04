import React from 'react';
import styles from './Loader.module.scss';
import { Spinner } from 'react-bootstrap';

type Props = {
};

export const Loader: React.FC<Props> = () => {
  return (
    <div className={styles.loader}>
      <Spinner className={styles.loader__spinner}/>
    </div>
  );
};
