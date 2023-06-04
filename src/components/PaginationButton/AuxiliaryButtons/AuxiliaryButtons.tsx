import right from './../../Pagination/images/nextPage.svg';
import left from './../../Pagination/images/prevPage.svg';
import rightDisabled from './../../Pagination/images/nextPageDisabled.svg';
import leftDisabled from './../../Pagination/images/prevPageDisabled.svg';

type AuxiliaryButtons = {
  src: string;
  alt: string,
}

export const RightBtn = (description: string): AuxiliaryButtons => {
  return (
    {
      src: right,
      alt: description,
    }
  );
};

export const LeftBtn = (description: string): AuxiliaryButtons => {
  return (
    {
      src: left,
      alt: description,
    }
  );
};

export const RightDisBtn = (description: string): AuxiliaryButtons => {
  return (
    {
      src: rightDisabled,
      alt: description,
    }
  );
};

export const LeftDisBtn = (description: string): AuxiliaryButtons => {
  return (
    {
      src: leftDisabled,
      alt: description,
    }
  );
};
