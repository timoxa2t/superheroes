import React, { ChangeEvent, FormEvent, useState } from 'react';
import styles from './Superhero.module.scss';
import { SuperheroDetails } from '../../types/SuperheroDetails';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Form } from 'react-bootstrap';
import { Superpowers } from '../Superpowers';
import { ImagesList } from '../ImagesList';

type Props = {
  superhero: SuperheroDetails;
  update: (changes: Partial<SuperheroDetails>) => void;
  handleDelete: () => void,
  create: (params: Partial<SuperheroDetails>, image: File) => void,
  isNew: boolean,
};

export const Superhero: React.FC<Props> = ({
  superhero,
  update,
  handleDelete,
  create,
  isNew,
}) => {
  const {
    id,
    nickname,
    real_name,
    catch_phrase,
    origin_description,
    superpowers,
    image,
    images,
  } = superhero;

  const [newNickname, setNewNickname] = useState(nickname);
  const [realName, setRealName] = useState(real_name);
  const [catchPhrase, setCatchPhrase] = useState(catch_phrase);
  const [originDescription, setOriginDescription] = useState(origin_description);
  const [isEditMode, setIsEditMode] = useState(isNew);
  const [selectedImage, setSelectedImage] = useState<File>();

  const realNameChanged = realName !== real_name
  const catchPhraseChanged = catchPhrase !== catch_phrase
  const originDescriptionChanged = originDescription !== origin_description;
  const isChanged = realNameChanged || catchPhraseChanged || originDescriptionChanged;

  

  const handleSelectedImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files !== null) {
      const file = event.target.files[0];

      setSelectedImage(file);
    }
  };

  const handleNicknameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewNickname(event.target.value)
  }

  const handleRealNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRealName(event.target.value)
  }

  const handleCatchPhraseChange = (event: ChangeEvent<HTMLInputElement>) => {
    setCatchPhrase(event.target.value)
  }
  
  const handleOriginDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
    setOriginDescription(event.target.value)
  }

  const toggleEditMode = () => {
    setIsEditMode(prevMode => {
      if (prevMode) {
        setNewNickname(nickname);
        setRealName(real_name);
        setCatchPhrase(catch_phrase);
        setOriginDescription(origin_description);
      }

      return !prevMode;
    });
  } 

  const handleUpdate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const changes: Partial<SuperheroDetails> = {}

    if (realNameChanged) {
      changes.real_name = realName;
    }

    if (catchPhraseChanged) {
      changes.catch_phrase = catchPhrase;
    }

    if (originDescriptionChanged) {
      changes.origin_description = originDescription;
    }

    update(changes)
  }

  const handleCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (selectedImage) {
      create({
        nickname: newNickname,
        real_name: realName,
        catch_phrase: catchPhrase,
        origin_description: originDescription,
      }, selectedImage);
    }
  }

  return (
    <div className={styles.superhero}>
      
      {!isNew && (
        <button
          className={styles.superhero__edit}
          onClick={toggleEditMode}
        ></button>
      )}      

      <Form onSubmit={isNew ? handleCreate : handleUpdate} className={styles.superhero__form}>

        {!isNew && (
          <ImagesList images={[image, ...images]} id={id} />
        )}


        <div className={styles.superhero__description}>
          <h2 className={styles.superhero__title}>
            {nickname}
          </h2> 

          <div className={styles['superhero__main-form']}>
            {isNew && (
              <>
                <Form.Group className="mb-3" controlId="image">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={handleSelectedImageChange}
                    className={styles['superhero__image-form']}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="nickname">
                  <Form.Label>Nickname</Form.Label>
                  <Form.Control
                    type="text"
                    value={newNickname}
                    maxLength={255}
                    onChange={handleNicknameChange}
                    disabled={!isEditMode}
                    required
                  />
                </Form.Group>
              </>
            )}

            <Form.Group className="mb-3" controlId="real_name">
              <Form.Label>Real name (dont tell enyone)</Form.Label>
              <Form.Control
                type="text"
                value={realName}
                maxLength={255}
                onChange={handleRealNameChange}
                disabled={!isEditMode}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="catch_phrase">
              <Form.Label>Catch phrase</Form.Label>
              <Form.Control
                type="text"
                maxLength={255}
                value={catchPhrase}
                onChange={handleCatchPhraseChange}
                disabled={!isEditMode}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="origin_description">
              <Form.Label>Origin story</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={originDescription}
                onChange={handleOriginDescriptionChange}
                disabled={!isEditMode}
                required
              />
            </Form.Group>

            {isEditMode && !isNew && isChanged && (
              <Button type='submit' className={styles.superhero__save__button}>
                Save
              </Button>
            )}

            {!isNew && (
              <Superpowers id={id} superpowers={superpowers}/>
            )}
            
            {isNew && (
              <Button
                variant='primary'
                type='submit'
              >
                Create
              </Button>
            )}

          </div>
        </div>

        {!isNew && (
            <Button
              variant='danger'
              onClick={handleDelete}
            >
              DELETE
            </Button>
          )
        }
      </Form>
    </div>
  );
};
