import React, { useEffect, useState } from 'react';
import styles from './SuperheroPage.module.scss';
import classNames from 'classnames';
import { createSuperhero, deleteHero, getSuperheroById, updateSuperhero } from '../../api/superheroes';
import { useNavigate, useParams } from 'react-router-dom';
import { SuperheroDetails } from '../../types/SuperheroDetails';
import { Superhero } from '../../components/Superhero';
import { Loader } from '../../components/Loader';

const defaultSuperhero: SuperheroDetails = {
  id: 0,
  nickname: '',
  real_name: '',
  catch_phrase: '',
  origin_description: '',
  image: '',
  images: [],
  superpowers: [],
}

export const SuperheroPage: React.FC = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [superhero, setSuperhero] = useState<SuperheroDetails>(defaultSuperhero);
  const [isNewHero, setIsNewHero] = useState(false);
  const navigate = useNavigate();


  useEffect(() => {
    if (!id) {
      return;
    }

    if (id === 'new') {
      setIsNewHero(true);
      setIsLoading(false);

      return
    }

    setIsLoading(true);

    getSuperheroById(id)
      .then(details => {
        setSuperhero(details);
      })
      .catch(() => {
        navigate('/');
      })
      .finally(() => setIsLoading(false));;

  }, [id, navigate]);

  const update = (changes: Partial<SuperheroDetails>) => {
    if (superhero) {
      setIsLoading(true)
      updateSuperhero(superhero.id, changes)
        .then(updated => {
          setSuperhero(updated);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } 
  }

  const create = (superhero: Partial<SuperheroDetails>, image: File) => {
    setIsLoading(true);

    createSuperhero(superhero, image)
      .then(result => {
        navigate(`/superhero/${result.id}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleDelete = () => {
    if (superhero) {
      deleteHero(superhero.id)
        .then(() => {
          navigate(-1);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }


  console.log(superhero)

  return (
    <div
      className={classNames(
        styles.container,
        styles.page__container,
      )}
    >
      {isLoading
        ? <Loader />
        : ( 
          <Superhero
            superhero={superhero}
            update={update}
            handleDelete={handleDelete}
            create={create}
            isNew={isNewHero}
          /> 
        )
      }
    </div>
  );
};
