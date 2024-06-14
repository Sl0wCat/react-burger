import { StringLiteral } from "typescript";

export type TIngredient = {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: 'bun' | 'sauce' | 'main';
  __v: number;
  _id: string;
  uId: string;
  index?: number;
}

export type TCartElement = {
  key: string;
  item: TIngredient;
}

export type TUser = {
    email: string;
    name: string;
    password?: string;
}

export type TResponseBody<T> = 
{ 
    success: false;
    message: string;
} | (
    {success: true} & T
);