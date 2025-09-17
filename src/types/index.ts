// Re-export all types
export type { Restaurant } from '../data/restaurants';
export type { MenuItem, NutritionalInfo } from '../data/menus';
export type { District } from '../data/districts';
export type {
  RootStackParamList,
  MainTabParamList,
  AuthStackParamList,
  RestaurantStackParamList
} from './navigation';

// Import types for local use
import type { NutritionalInfo } from '../data/menus';

// User related types
export interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface HealthProfile {
  userId: string;
  healthCondition: 'diabetes_type1' | 'diabetes_type2' | 'prediabetes' | 'diet_control' | 'none';
  sugarLevel: 'strict' | 'medium' | 'light';
  allergens: string[];
  dietaryRestrictions: string[];
  emergencyContact?: {
    name: string;
    phone: string;
    relationship: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

// Review and Rating types
export interface Review {
  id: string;
  userId: string;
  restaurantId: string;
  menuItemId?: string;
  rating: number; // 1-5
  sugarFriendlyRating: number; // 1-10
  comment: string;
  images?: string[];
  helpful: number;
  createdAt: Date;
  user: {
    name: string;
    avatar?: string;
  };
}

// Search and Filter types
export interface SearchFilters {
  category?: string;
  priceRange?: [number, number];
  sugarFriendlyScore?: number;
  distance?: number; // in km
  openNow?: boolean;
  hasReviews?: boolean;
  tags?: string[];
}

export interface LocationCoordinates {
  latitude: number;
  longitude: number;
}

// Food Analysis types (for scanner feature)
export interface FoodAnalysis {
  id: string;
  userId: string;
  imageUri: string;
  analysisResult: {
    confidence: number;
    sugarFriendlyScore: number;
    estimatedNutrition: NutritionalInfo;
    recommendations: string[];
    warnings?: string[];
  };
  createdAt: Date;
}

// Restaurant Owner types
export interface RestaurantOwner {
  id: string;
  email: string;
  name: string;
  phone: string;
  restaurantIds: string[];
  verified: boolean;
  createdAt: Date;
}

// API Response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

// Pagination types
export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  hasMore: boolean;
}

// Favorites types
export interface Favorite {
  id: string;
  userId: string;
  restaurantId: string;
  createdAt: Date;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'new_restaurant' | 'review_reply' | 'health_tip' | 'promotion';
  title: string;
  message: string;
  read: boolean;
  createdAt: Date;
  data?: any;
}

// App Settings types
export interface AppSettings {
  userId: string;
  notifications: {
    newRestaurants: boolean;
    reviewReplies: boolean;
    healthTips: boolean;
    promotions: boolean;
  };
  privacy: {
    shareHealthProfile: boolean;
    shareReviews: boolean;
    shareLocation: boolean;
  };
  display: {
    theme: 'light' | 'dark' | 'system';
    language: 'zh-TW' | 'en';
  };
}