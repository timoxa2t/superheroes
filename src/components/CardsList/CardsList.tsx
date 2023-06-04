import React from 'react';
import styles from './CardsList.module.scss';
import { Card } from '../Card';
import { Superhero } from '../../types/Superhero';

interface Props {
  superheroes: Superhero[],
}

export const CardsList: React.FC<Props> = ({
  superheroes
}) => {

  return (
    <ul className={styles.superheroes__list}>
      {superheroes.map((superhero) => (
        <li
          className={styles.superheroes__item}
          key={superhero.id}
        >
          <Card
            superhero={superhero}
          />
        </li>
      ))}
    </ul>
  );
};
