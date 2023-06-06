import React, { ChangeEvent, useMemo, useState } from 'react';
import styles from './ImagesList.module.scss';
import { Carousel } from 'react-responsive-carousel';
import { BASE_URL, postNewImage, removeImage } from '../../api/superheroes';
import { Form } from 'react-bootstrap';
import { Loader } from '../Loader';


type Props = {
  images: string[];
  id: number,
};

export const ImagesList: React.FC<Props> = ({
  images,
  id
}) => {

  const [allImages, setAllImages] = useState(images)
  const [isLoading, setIsLoading] = useState(false);

  const imageCards = useMemo(() => {

    const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
      if (event.target.files !== null) {
        setIsLoading(true);
        postNewImage(id, event.target.files)
          .then(newImage => {
            setAllImages(prevImages => [
              ...prevImages,
              newImage.url,
            ])
          })
          .finally(() => {
            setIsLoading(false);
          })
      }
    };

    const handleImageRemove = (url: string) => {
      setIsLoading(true);
      removeImage(id, url)
        .then(() => {
          setAllImages(prevImages => {
            return prevImages.filter(image => image!== url)
          })
        })
        .finally(() => {
          setIsLoading(false);
        })
    }

    return [
      ...allImages.map((img, index) => (
        <div key={img} className={styles['carousel__image-container']}>

          <img
            className={styles['carousel__image']}
            src={BASE_URL + '/' + img} 
            alt='hero'
          />
          
          {index && (
            <button
              type='button'
              className={styles['carousel__image-delete']}
              onClick={() => handleImageRemove(img)}
            />
          )}

          {isLoading && (<Loader />)}
        </div>
      )),
      <Form>
        <Form.Group className="mb-3" controlId="image">
          <Form.Control
            type="file"
            className={styles['carousel__image-form']}
            onChange={handleImageChange}
          />
        </Form.Group>

        {isLoading && (<Loader />)}
      </Form>,
    ]
  }, [id, allImages, isLoading])

  return (
    <Carousel className={styles.carousel__container}>
      {imageCards}
    </Carousel>
  );
};
