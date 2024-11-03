/* eslint-disable */
import * as Router from 'expo-router';

export * from 'expo-router';

declare module 'expo-router' {
  export namespace ExpoRouter {
    export interface __routes<T extends string = string> extends Record<string, unknown> {
      StaticRoutes: `/` | `/(app)` | `/(app)/` | `/(app)/(tabs)` | `/(app)/(tabs)/` | `/(app)/(tabs)/cart` | `/(app)/cart` | `/(tabs)` | `/(tabs)/` | `/(tabs)/cart` | `/_sitemap` | `/cart`;
      DynamicRoutes: `/(app)/coffee-details/${Router.SingleRoutePart<T>}` | `/coffee-details/${Router.SingleRoutePart<T>}`;
      DynamicRouteTemplate: `/(app)/coffee-details/[id]` | `/coffee-details/[id]`;
    }
  }
}
