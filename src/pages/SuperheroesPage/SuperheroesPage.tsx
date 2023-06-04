import React, { useEffect, useState } from 'react';
import styles from './SuperheroesPage.module.scss';
import { CardsList } from '../../components/CardsList';
import classNames from 'classnames';
import { Superhero } from '../../types/Superhero';
import { Spinner } from 'react-bootstrap';
import { getSuperheroes } from '../../api/superheroes';
import { Pagination } from '../../components/Pagination';
import { useSearchParams } from 'react-router-dom';

const DEFAULT_PAGE = 1;

const newSuperhero: Superhero = {
  id: 0,
  image: '',
  nickname: 'Add new superhero',
}

export const SuperheroesPage: React.FC = () => {
  const [searchParams] = useSearchParams({ page: DEFAULT_PAGE.toString() });
  const [totalSuperheroes, setTotalSuperheroes] = useState(0);
  const [superheroes, setSuperheroes] = useState<Superhero[]>([newSuperhero]);
  const [itemsPerPage] = useState(5);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get('page')));  

  useEffect(() => {
    setIsLoading(true);

    const newOffset = totalSuperheroes === 0
      ? 0
      : ((currentPage - 1) * itemsPerPage) % totalSuperheroes;

    getSuperheroes(itemsPerPage, newOffset)
      .then(({
        superheroes,
        total
      }) => {
        setTotalSuperheroes(total);
        if (currentPage === 1) {
          setSuperheroes([newSuperhero, ...superheroes]);
        } else {
          setSuperheroes(superheroes);
        }


      }).finally(() => setIsLoading(false));;

  }, [currentPage, itemsPerPage, totalSuperheroes]);


  const selectPage = (page: number) => {
    setCurrentPage(page);
  };


  return (
    <div
      className={classNames(
        styles.container,
        styles.page__container,
      )}
    >
      {isLoading
        ? <Spinner className='text-light' />
        : (
          <>
            <CardsList superheroes={superheroes} />

            <Pagination
              total={totalSuperheroes}
              perPage={itemsPerPage}
              currentPage={currentPage}
              onPageChange={selectPage}
            />
          </>
        )
      }
    </div>
  );
};
