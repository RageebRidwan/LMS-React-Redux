export interface IBook {
  _id?: string;
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
}

export type Genre =
  | "FICTION"
  | "NON_FICTION"
  | "SCIENCE"
  | "HISTORY"
  | "BIOGRAPHY"
  | "FANTASY"
  | "Not selected";

export type BookForm = {
  title: string;
  author: string;
  genre: Genre;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
};
export type ApiResponse<T> = {
  data: T;
};
