import axios from "axios";
import { Superhero } from "../types/Superhero";
import { SuperheroDetails } from "../types/SuperheroDetails";
import { Superpower } from "../types/Superpower";
import { SuperheroImage } from "../types/SuperheroImage";

const superheroes: Superhero[] = [
  {
    id: 1,
    nickname: 'batman',
    image: 'img/2ffad089-1d35-4536-83a7-5448f35813c1.14.20-PM-copy.webp'
  }
];

const superheroDetails: SuperheroDetails = {
  id: 1,
  nickname: 'batman',
  real_name: 'Bruse Wayne',
  image: 'img/2ffad089-1d35-4536-83a7-5448f35813c1.14.20-PM-copy.webp',
  catch_phrase: 'WHERE ARE THEY??',
  origin_description: 'robber killed his parents. and he is afraid of bats. then he became "Batman"',
  superpowers: ['money', 'karate'],
  images: [
    'img/e1576048-4720-4448-8cb3-a62a9a471d08.svg.png',
    'img/e1576048-4720-4448-8cb3-a62a9a471d08.svg.png',
    'img/e1576048-4720-4448-8cb3-a62a9a471d08.svg.png',
  ]
}

// export const BASE_URL = 'https://jellyfish-app-f5j44.ondigitalocean.app';
export const BASE_URL = 'http://localhost:3000';

async function get<T>(url: string, query: any = {}): Promise<T> {
  const params = new URLSearchParams(query);
  const result = await axios.get(`${BASE_URL}/${url}?${params.toString()}`);
  
  return result.data;
}

async function post<T>(url: string, body: any): Promise<T> {
  const result = await axios.post(`${BASE_URL}/${url}`, body);
  
  return result.data;
}

async function put<T>(url: string, body: any): Promise<T> {
  const result = await axios.put(`${BASE_URL}/${url}`, body);
  
  return result.data;
}

async function remove(url: string): Promise<number> {
  const result = await axios.delete(`${BASE_URL}/${url}`);
  
  return result.status;
}

interface SuperheroesResponse {
  superheroes: Superhero[],
  total: number,
}

export function getSuperheroes(
  limit: number,
  offset: number
): Promise<SuperheroesResponse> {
  try {
    return get(`superhero`, {
      limit,
      offset,
    })
  } catch {
    return Promise.resolve({
      superheroes,
      total: superheroes.length,
    });
  }
}

export function getSuperheroById(id: string): Promise<SuperheroDetails>{
  try {
    return get<SuperheroDetails>(`superhero/${id}`);
  } catch {
    return Promise.resolve(superheroDetails);
  }
}

export function postNewImage(
  id: number,
  image: FileList,
): Promise<SuperheroImage> {
  const form = new FormData();
  form.set('image', image[0]);
  return post<SuperheroImage>(`superhero/${id.toString()}/image`, form);
}

export function removeImage(
  id: number,
  url: string
): Promise<number> {
  return remove(`superhero/${id.toString()}/${url}`);
}

export async function createSuperhero(
  newSuperhero: Partial<SuperheroDetails>,
  image: File
): Promise<SuperheroDetails> {
  const form = new FormData();

  form.set('image', image);

  for (const key in newSuperhero) {
    const value = newSuperhero[key as keyof SuperheroDetails];
    if (value) {
      form.set(key, value.toString());
    }
  }

  return await post<SuperheroDetails>('superhero', form);
}


export async function updateSuperhero(
  id: number,
  superhero: Partial<SuperheroDetails>,
): Promise<SuperheroDetails> {
  return await put<SuperheroDetails>(`superhero/${id.toString()}`, superhero);
}

export function deleteHero(
  id: number,
): Promise<number> {
  return remove(`superhero/${id.toString()}`);
}

export async function addSuperpower(
  id: number,
  superpower: string,
): Promise<string> {
  const newSuperpower = await post<Superpower>(`superhero/${id.toString()}/superpower`, {
    name: superpower,
  });

  return newSuperpower.name;
}

export function removeSuperpower(
  id: number,
  name: string
): Promise<number> {
  return remove(`superhero/${id.toString()}/superpower/${name}`);
}
