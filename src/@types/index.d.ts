/* src/@types/index.d.ts */

type Menu = {
  img?: string;
  name: string;
  price: number;
}

type Bag = {
  [name: string]:
    {
      name: string;
      price: number;
      count: number;
    }
}

type CompProps ={
  isTrans:boolean;
  setIsTrans:React.Dispatch<React.SetStateAction<boolean>>;
}