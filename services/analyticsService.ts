import { AnalyticsEventType } from "../types";

const IS_DEV = typeof process !== 'undefined' && process.env.NODE_ENV === 'development';

class AnalyticsService {
  private static instance: AnalyticsService;
  private sessionStart: number;

  private constructor() {
    this.sessionStart = Date.now();
    this.logEvent('app_open', { sessionStart: this.sessionStart });
  }

  public static getInstance(): AnalyticsService {
    if (!AnalyticsService.instance) {
      AnalyticsService.instance = new AnalyticsService();
    }
    return AnalyticsService.instance;
  }

  public logEvent(type: AnalyticsEventType, payload?: any) {
    const event = {
      type,
      payload,
      timestamp: Date.now(),
      timeSinceStart: (Date.now() - this.sessionStart) / 1000
    };

    // In a real app, this would send data to Firebase/Mixpanel/Segment
    if (IS_DEV) {
      console.groupCollapsed(`📊 Analytics: ${type}`);
      console.log(event);
      console.groupEnd();
    } else {
      // Production logger (mock)
      // console.log(`[Tracking] ${type}`, payload);
    }
  }
}

export const analytics = AnalyticsService.getInstance();