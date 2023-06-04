import React, { ChangeEvent } from 'react';
import styles from './Card.module.scss';
import { BASE_URL } from '../../api/superheroes';
import { Link } from 'react-router-dom';
import { Superhero } from '../../types/Superhero';
import fallbackImage from '../../add_icon.svg';

type Props = {
  superhero: Superhero;
};

export const Card: React.FC<Props> = ({
  superhero,
}) => {
  const {
    id,
    nickname,
    image,
  } = superhero;

  const imgUrl = BASE_URL + '/' + image;
  const linkToHero = `/superhero/${id !== 0 ? id : 'new'}`;

  const handleImageError = (event: React.InvalidEvent<HTMLImageElement>) => {
    event.target.src = fallbackImage;
    event.target.classList.add(styles['card__image-fixed']);
  }

  return (
    <div className={styles.card}>
      <Link
        to={linkToHero}
        className={styles['card__image-container']}
      >
        <img
          src={imgUrl}
          alt={nickname}
          className={styles.card__image}
          onError={handleImageError}
        />
      </Link>

      <Link to={linkToHero} className={styles.card__nickname}>
        {nickname}
      </Link>
    </div>
  );
};
