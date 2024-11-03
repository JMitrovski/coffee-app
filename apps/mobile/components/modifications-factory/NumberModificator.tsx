import React, { useEffect, useState, memo } from "react";
import { TextInput } from "react-native-paper";
import { IBaseModificationsFactory } from "@/interfaces/modificationsFactory";
import { ThemedText } from "../ThemedText";
import { ThemedView } from "../ThemedView";
import { Transform } from "@/services";
import { IModifications } from "@/interfaces/modifications";
import { TTypeOfModification } from "@/types/types";
import DisabledView from "../DisabledView";
import { COLORS } from "@/constants/Colors";

function NumberModificator({
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
      <TextInput
        style={{
          backgroundColor: COLORS.secondaryBackground,
          width: 50,
          height: 30,
          borderRadius: 4,
        }}
        maxLength={3}
        onChangeText={(val) => setState((prev) => ({ ...prev, value: +val }))}
        value={state.value.toString()}
        placeholder={`${item.value.toString()}`}
        keyboardType="numeric"
      />
      {isDisabled ? <DisabledView /> : null}
    </ThemedView>
  );
}

export default memo(NumberModificator);
