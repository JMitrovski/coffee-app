import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import { StyleSheet } from "react-native";

import { ThemedText } from "../ThemedText";
import CustomButton from "../CustomButton";

describe("CustomButton Component", () => {
  it("renders correctly with title", () => {
    const { getByText } = render(<CustomButton title="Click Me" />);

    expect(getByText("Click Me")).toBeTruthy();
  });

  it("calls onPress when pressed", () => {
    const onPressMock = jest.fn();
    const { getByText } = render(
      <CustomButton title="Press Me" onPress={onPressMock} />
    );

    fireEvent.press(getByText("Press Me"));

    expect(onPressMock).toHaveBeenCalledTimes(1);
  });

  it("renders children correctly", () => {
    const { getByText } = render(
      <CustomButton title="With Child">
        <ThemedText>Child Text</ThemedText>
      </CustomButton>
    );

    expect(getByText("Child Text")).toBeTruthy();
  });

  it("applies custom styles passed through style prop", () => {
    const customStyle = { backgroundColor: "red" };
    const { getByTestId } = render(
      <CustomButton title="Styled Button" style={customStyle} />
    );

    const buttonSurface = getByTestId("button-surface");

    const combinedStyle = StyleSheet.flatten(buttonSurface.props.style);

    expect(combinedStyle).toMatchObject(customStyle);
  });
});
