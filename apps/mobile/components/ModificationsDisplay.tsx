import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import {
  MODIFICATIONS_EVENTS,
  modificationsEmitter,
} from "@/services/modificationsEmitter";
import { Transform } from "@/services";
import { ThemedView } from "./ThemedView";

function ModificationsDisplay() {
  const [text, setText] = useState("");
  useEffect(() => {
    const unsub = modificationsEmitter.subscribe(
      MODIFICATIONS_EVENTS.REFRESH,
      (val) => {
        setText(Transform.stringifyModifiers(val));
      }
    );

    return () => {
      unsub();
    };
  }, []);

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="defaultSemiBold" style={{ fontSize: 24 }}>
        Modifiers:
      </ThemedText>

      <ThemedText style={{ fontSize: 14 }}>{text}</ThemedText>
    </ThemedView>
  );
}

export default React.memo(ModificationsDisplay);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 8,
  },
});
