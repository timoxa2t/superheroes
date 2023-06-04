import React, { ChangeEvent, useState } from 'react';
import styles from './Superpowers.module.scss';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Button, Form, ListGroup } from 'react-bootstrap';
import { addSuperpower } from '../../api/superheroes';
import { Loader } from '../Loader';

type Props = {
  id: number,
  superpowers: string[];
};

export const Superpowers: React.FC<Props> = ({
  id,
  superpowers,
}) => {

  const [isLoading, setIsLoading] = useState(false);
  const [newSuperpower, setNewSuperpower] = useState('');
  const [allSuperpowers, setAllSuperpowers] = useState(superpowers);

  
  const handleNewSuperpowerChange = (event: ChangeEvent<HTMLInputElement>) => {
    setNewSuperpower(event.target.value)
  }

  const handleSubmitSuperpower = () => {

    if (newSuperpower) {
      setIsLoading(true);

      addSuperpower(id, newSuperpower)
        .then(addedSuperpower => {
          setAllSuperpowers(prevSuperpowers => [
            ...prevSuperpowers,
            addedSuperpower,
          ])
        })
        .finally(() => {
          setIsLoading(false);
          setNewSuperpower('');
        })
    }
  }

  return (
    <Form className={styles.superpowers}>
      <Form.Group className="mb-3" controlId="superpower">
        <Form.Label>Superpowers</Form.Label>
        <ListGroup>
          {allSuperpowers.map(superpower => (
            <ListGroup.Item>{superpower}</ListGroup.Item>
          ))}

            <ListGroup.Item className={styles['superpowers__new']}>
              <Form.Control
                type="text"
                value={newSuperpower}
                placeholder="Type new superpower"
                onChange={handleNewSuperpowerChange}
              />

              <Button onClick={handleSubmitSuperpower}>add</Button>
            </ListGroup.Item>

            {isLoading && (
              <Loader />
            )}
            
        </ListGroup>
      </Form.Group>
    </Form>
  );
};
