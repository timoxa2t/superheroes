import React from 'react';
import styles from './PaginationButton.module.scss';
import classNames from 'classnames';

export interface ImageProps {
  src: string;
  alt: string;
}

type Props = {
  page?: number;
  image?: ImageProps;
  currentPage?: number;
  isDisabled?: boolean;
}

export const PaginationButton: React.FC<Props> = (props) => {
  const {page, image, currentPage, isDisabled} = props;

  if (page) {
    return (
      <div className={classNames(
        styles.paginationButton,
        { [styles.active]: page === currentPage }
      )}
      >
        {page}
      </div>
    );
  }

  if (image) {
    return (
      <div className={classNames(
        styles.disabledPaginationButton,
        { [styles.paginationButton]: !isDisabled}
      )}
      >
        <img
          src={image.src}
          alt={image.alt}
          className={styles.paginationImage}
        />
      </div>
    );
  }

  return null;
};
