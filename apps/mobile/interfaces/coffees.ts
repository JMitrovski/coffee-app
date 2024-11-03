import { TTypeOfModification } from "@/types/types";
import { IModifications } from "./modifications";

export interface ICoffeeResponse<T extends TTypeOfModification> {
  status: string;
  result: number;
  data: ICoffee<T>[];
}

export interface ICoffeeDetailsResponse<T extends TTypeOfModification> {
  status: string;
  data: ICoffee<T>;
}

export interface ICoffee<T extends TTypeOfModification = boolean> {
  id: number;
  name: string;
  image: string;
  description: string;
  modifications: IModifications<T>[];
}
