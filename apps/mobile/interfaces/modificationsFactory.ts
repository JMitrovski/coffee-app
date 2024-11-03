import { TTypeOfModification } from "@/types/types";
import { IModifications } from "./modifications";

export interface IBaseModificationsFactory {
  item: IModifications<TTypeOfModification>;
  isDisabled: boolean;
  onPress: (val: IModifications<TTypeOfModification>) => void;
}
