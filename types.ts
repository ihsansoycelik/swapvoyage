
export interface PlacePrompt {
  question: string;
  answer: string;
}

export interface Place {
  id: string;
  name: string;
  location: string; // e.g., "Muğla, Turkey"
  district?: string; // e.g., "Fethiye"
  shortDescription: string;
  images: string[]; // Array of keywords for generation or URLs
  prompts: PlacePrompt[];
  tags: string[]; // e.g., "Ancient Ruin", "Bay", "History"
  coordinates?: {
    lat: number;
    lng: number;
  };
  // New Admin Fields
  entryFee?: string;
  visitDuration?: string;
  bestSeason?: string;
  status?: 'draft' | 'published';
  // Set client-side when user marks a place visited
  visitedAt?: number;
}

export interface FilterState {
  location: string | null;
  categories: string[];
}

export type ViewMode = 'DISCOVER' | 'WISHLIST' | 'PROFILE' | 'ADMIN' | 'HISTORY';

// Basic Analytics Types
export type AnalyticsEventType = 
  | 'app_open' 
  | 'card_swipe' 
  | 'card_undo'
  | 'route_generated'
  | 'filter_applied';

export interface AnalyticsEvent {
  type: AnalyticsEventType;
  payload?: any;
  timestamp: number;
}

export interface DailyItinerary {
  day: number;
  places: Place[];
}
