import React, { useCallback, memo } from "react";
import { IModifications } from "@/interfaces/modifications";
import { TTypeOfModification } from "@/types/types";
import BooleanModificator from "./BooleanModificator";
import NumberModificator from "./NumberModificator";
import {
  MODIFICATIONS_EVENTS,
  modificationsEmitter,
} from "@/services/modificationsEmitter";

interface IModificationsFactory {
  disabled?: boolean;
  item: IModifications<TTypeOfModification>;
}

function ModificationsFactory({
  item,
  disabled = false,
}: IModificationsFactory) {
  const _publishChanges = useCallback(
    (val: IModifications<TTypeOfModification>) => {
      modificationsEmitter.publish(MODIFICATIONS_EVENTS.CHANGED, val);
    },
    []
  );

  if (typeof item.value === "boolean") {
    return (
      <BooleanModificator
        onPress={(val: IModifications<TTypeOfModification>) =>
          _publishChanges(val)
        }
        key={item.id}
        item={item}
        isDisabled={disabled}
      />
    );
  }
  if (typeof item.value === "number") {
    return (
      <NumberModificator
        onPress={(val: IModifications<TTypeOfModification>) => {
          _publishChanges(val);
        }}
        key={item.id}
        item={item}
        isDisabled={disabled}
      />
    );
  }

  return null;
}

export default memo(ModificationsFactory);
