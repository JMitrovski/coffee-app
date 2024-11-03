import { Tabs } from "expo-router";
import React from "react";

import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import { COLORS } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import { useCartContext } from "@/hooks/useCartContext";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { cartItems } = useCartContext();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: COLORS.blue,
        headerTintColor: COLORS.blue,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "COFFEES",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cafe" : "cafe-outline"}
              color={color}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          tabBarBadge: cartItems.length,
          tabBarBadgeStyle: {
            opacity: cartItems.length ? 1 : 0,
          },
          title: "CART",
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon
              name={focused ? "cart" : "cart-outline"}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
