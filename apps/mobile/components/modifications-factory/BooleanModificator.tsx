import React, { useEffect, useState, memo } from "react";
import { Switch } from "react-native-paper";
import { IBaseModificationsFactory } from "@/interfaces/modificationsFactory";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { COLORS } from "@/constants/Colors";
import { Transform } from "@/services";
import { IModifications } from "@/interfaces/modifications";
import { TTypeOfModification } from "@/types/types";
import DisabledView from "../DisabledView";

function BooleanModificator({
  item,
  isDisabled,
  onPress,
}: IBaseModificationsFactory) {
  const [state, setState] = useState<IModifications<TTypeOfModification>>(item);

  useEffect(() => {
    onPress(state);
  }, [state.value]);

  return (
    <ThemedView
      style={{
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      <ThemedText type="defaultSemiBold">
        {Transform.mapModificationsNames(item.name)}
      </ThemedText>
      <Switch
        trackColor={{
          false: COLORS.secondaryBackground,
          true: COLORS.lightBlue,
        }}
        thumbColor={state.value ? COLORS.blue : COLORS.secondaryBackground}
        ios_backgroundColor={COLORS.secondaryBackground}
        onValueChange={(value) => {
          setState((prev) => ({ ...prev, value: !prev.value as boolean }));
        }}
        value={state.value as boolean}
      />
      {isDisabled ? <DisabledView /> : null}
    </ThemedView>
  );
}

export default memo(BooleanModificator);
