import { TTypeOfModification } from "@/types/types";

export interface IModificationsResponse<T extends TTypeOfModification> {
  status: string;
  result: number;
  data: IModifications<T>[];
}

export interface IModifications<T extends TTypeOfModification> {
  id: number;
  name: string;
  value: T;
}
