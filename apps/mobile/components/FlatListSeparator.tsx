import { StyleSheet, View } from "react-native";
import React from "react";

function FlatListSeparator() {
  return <View style={styles.container} />;
}

export default FlatListSeparator;

const styles = StyleSheet.create({
  container: {
    height: 1,
    backgroundColor: "lightgray",
    margin: 16,
  },
});
