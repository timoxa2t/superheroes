import React, { FC, useEffect, useState } from 'react';
import styles from './Pagination.module.scss';
import { PaginationButton } from '../PaginationButton';

import nextPageIcon from './images/nextPage.svg';
import nextPageIconDisabled from './images/nextPageDisabled.svg';

import prevPageIcon from './images/prevPage.svg';
import prevPageIconDisabled from './images/prevPageDisabled.svg';
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom';

interface Props {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void
}

//should to separete to helpers
function getNumbers(from: number, to: number): number[] {
  const numbers = [];

  for (let n = from; n <= to; n += 1) {
    numbers.push(n);
  }

  return numbers;
}

export const Pagination: FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });

  const [nextPage, setNextPage] = useState(nextPageIcon);
  const [prevPage, setPrevPage] = useState(prevPageIconDisabled);

  const pagesCount = Math.ceil(total / perPage);
  const prevPagesCount = 2; // Number of previous pages to show
  const nextPagesCount = 2; // Number of next pages to show
  const prevPagesVisible = getNumbers(
    Math.max(currentPage - prevPagesCount, 1), currentPage - 1
  );
  const nextPagesVisible = getNumbers(
    currentPage + 1, Math.min(currentPage + nextPagesCount, pagesCount)
  );
  let pages = getNumbers(1, pagesCount);

  if (windowWidth < 640) {
    pages = [...prevPagesVisible, currentPage, ...nextPagesVisible];
  }

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesCount;

  const navigate = useNavigate();
  const [searchParams, setSearchParams] =
    useSearchParams({ page: currentPage.toString() });

  const handleNext = () => {
    if (isLastPage) {
      return;
    }

    const nextPage = currentPage + 1;
    setSearchParams({ page: nextPage.toString() });
    navigate(`?${searchParams.toString()}`);
    onPageChange(nextPage);
  };

  const handlePrev = () => {
    if (isFirstPage) {
      return;
    }

    const prevPage = currentPage - 1;
    setSearchParams({ page: prevPage.toString() });
    navigate(`?${searchParams.toString()}`);
    onPageChange(prevPage);
  };

  useEffect(() => {
    if (currentPage !== 1) {
      setPrevPage(prevPageIcon);
    } else {
      setPrevPage(prevPageIconDisabled);
    }

    if (currentPage === pagesCount) {
      setNextPage(nextPageIconDisabled);
    } else {
      setNextPage(nextPageIcon);
    }
  }, [currentPage, pagesCount]);

  const prevPaginationPage = {
    src: prevPage,
    alt: 'Previous page in pagination',
  };

  const nextPaginationPage = {
    src: nextPage,
    alt: 'Next page in pagination',
  };

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination_item}>
        <NavLink
          to={`?page=${!isFirstPage? currentPage - 1: currentPage}`}
          onClick={handlePrev}
          className={styles.pagination_link}
        >
          <PaginationButton
            image={prevPaginationPage}
            currentPage={currentPage}
            isDisabled={isFirstPage}
          />
        </NavLink>
      </li>

      {pages.map((page => (
        <li
          className={styles.pagination_item}
          key={page}
        >
          <NavLink
            to={`?page=${page}`}
            className={styles.pagination_link}
            onClick={() => onPageChange(page)}
          >
            <PaginationButton
              page={page}
              currentPage={currentPage}
            />
          </NavLink>
        </li>
      )))}

      <li className={styles.pagination_item}>
        <NavLink
          to={`?page=${!isLastPage? currentPage + 1: currentPage}`}
          onClick={handleNext}
          className={styles.pagination_link}
        >
          <PaginationButton
            image={nextPaginationPage}
            currentPage={currentPage}
            isDisabled={isLastPage}
          />
        </NavLink>
      </li>
    </ul>
  );
};
