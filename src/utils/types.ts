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
  count?: number;
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

export interface IOrder {
  ingredients: Array<string>;
  _id: string;
  status: keyof typeof orderStatus;
  name: string;
  number: number;
  createdAt: Date;
  updatedAt: Date;
  total?: number;
}

export interface IOrderFeed {
  success?: boolean;
  orders?: Array<IOrder>;
  total?: number;
  totalToday?: number;
}


export enum orderStatus {
  created = 'created',
  pending = 'pending',
  done = 'done'
}

export type TOrderStatus = {
  [key in keyof typeof orderStatus]: string;
}

export const orderStatusText: TOrderStatus = {
  created: 'Создан',
  pending: 'Готовится',
  done: 'Выполнен'
}

export type TOrderIngredients = {
  [_id: string] : TIngredient
}

