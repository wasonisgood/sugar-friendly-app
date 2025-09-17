export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
  Registration: undefined;
  HealthProfile: undefined;
  DistrictDetail: { districtId: string; districtName: string };
  RestaurantDetail: { restaurantId: string; restaurantName: string };
  MerchantDashboard: undefined;
  MenuManagement: undefined;
  PhotoUpload: undefined;
  WebMain: undefined;
  PersonalProfile: undefined;
  HealthSettings: undefined;
  Favorites: undefined;
  RecentBrowsing: undefined;
  NotificationSettings: undefined;
  HelpCenter: undefined;
  OrderManagement: undefined;
  ReviewReply: undefined;
  RevenueAnalytics: undefined;
  MerchantHelp: undefined;
  AdvancedScanner: undefined;
  ScanHistory: undefined;
};

export type MainTabParamList = {
  Map: undefined;
  Districts: undefined;
  Profile: undefined;
  Scanner: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  HealthProfile: undefined;
};

export type RestaurantStackParamList = {
  Dashboard: undefined;
  MenuManagement: undefined;
  PhotoUpload: undefined;
};

export type District = {
  id: string;
  name: string;
  restaurantCount: number;
  averageScore: number;
  area: string;
  description?: string;
  restaurants?: Restaurant[];
};

export type Restaurant = {
  id: string;
  name: string;
  category: string;
  rating: number;
  address: string;
  phone?: string;
  image?: string;
  description?: string;
  openHours?: string;
  specialties?: string[];
  sugarFriendlyScore: number;
  menuItems?: MenuItem[];
};

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  sugarContent: 'low' | 'medium' | 'high';
  image?: string;
  ingredients?: string[];
  nutritionInfo?: {
    calories: number;
    carbs: number;
    sugar: number;
    fiber: number;
  };
};