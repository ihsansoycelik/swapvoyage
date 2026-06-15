import { AnalyticsEventType } from "../types";

const IS_DEV = import.meta.env.DEV;

export function logAnalyticsEvent(type: AnalyticsEventType, payload?: unknown) {
  if (IS_DEV) {
    console.groupCollapsed(`📊 Analytics: ${type}`);
    console.log(payload);
    console.groupEnd();
  }
}
