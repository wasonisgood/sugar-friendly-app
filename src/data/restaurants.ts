export interface Restaurant {
  id: string;
  name: string;
  address: string;
  phone: string;
  latitude: number;
  longitude: number;
  category: string;
  sugarFriendlyScore: number;
  image: string;
  description: string;
  openingHours: {
    [key: string]: string;
  };
  priceRange: number; // 1-4 scale
  tags: string[];
  district: string;
  averageRating: number;
  reviewCount: number;
}

export const mockRestaurants: Restaurant[] = [
  {
    id: '1',
    name: '健康蔬食餐廳',
    address: '台北市信義區信義路五段7號',
    phone: '02-2345-6789',
    latitude: 25.0330,
    longitude: 121.5654,
    category: '素食',
    sugarFriendlyScore: 9,
    image: 'https://example.com/restaurant1.jpg',
    description: '專注於低糖健康蔬食，提供多種糖友善選擇',
    openingHours: {
      monday: '11:00-21:00',
      tuesday: '11:00-21:00',
      wednesday: '11:00-21:00',
      thursday: '11:00-21:00',
      friday: '11:00-21:00',
      saturday: '11:00-21:00',
      sunday: '11:00-21:00',
    },
    priceRange: 2,
    tags: ['素食', '低糖', '有機', '健康'],
    district: '信義商圈',
    averageRating: 4.6,
    reviewCount: 128,
  },
  {
    id: '2',
    name: '低糖咖啡廳',
    address: '台北市大安區敦化南路二段216號',
    phone: '02-2876-5432',
    latitude: 25.0266,
    longitude: 121.5516,
    category: '咖啡廳',
    sugarFriendlyScore: 8,
    image: 'https://example.com/restaurant2.jpg',
    description: '提供無糖、低糖飲品及輕食，糖友的最佳選擇',
    openingHours: {
      monday: '08:00-22:00',
      tuesday: '08:00-22:00',
      wednesday: '08:00-22:00',
      thursday: '08:00-22:00',
      friday: '08:00-22:00',
      saturday: '09:00-22:00',
      sunday: '09:00-22:00',
    },
    priceRange: 2,
    tags: ['咖啡', '無糖', '輕食', '友善'],
    district: '東區商圈',
    averageRating: 4.4,
    reviewCount: 86,
  },
  {
    id: '3',
    name: '糖友便當店',
    address: '台北市松山區南京東路四段133號',
    phone: '02-2712-3456',
    latitude: 25.0518,
    longitude: 121.5510,
    category: '便當',
    sugarFriendlyScore: 9,
    image: 'https://example.com/restaurant3.jpg',
    description: '專為糖友設計的營養均衡便當，標示詳細營養資訊',
    openingHours: {
      monday: '11:00-14:00,17:00-20:00',
      tuesday: '11:00-14:00,17:00-20:00',
      wednesday: '11:00-14:00,17:00-20:00',
      thursday: '11:00-14:00,17:00-20:00',
      friday: '11:00-14:00,17:00-20:00',
      saturday: '11:00-14:00,17:00-20:00',
      sunday: '休息',
    },
    priceRange: 1,
    tags: ['便當', '營養', '低糖', '實惠'],
    district: '松山區',
    averageRating: 4.7,
    reviewCount: 203,
  },
  {
    id: '4',
    name: '養生火鍋店',
    address: '台北市中山區中山北路二段68號',
    phone: '02-2567-8901',
    latitude: 25.0618,
    longitude: 121.5200,
    category: '火鍋',
    sugarFriendlyScore: 7,
    image: 'https://example.com/restaurant4.jpg',
    description: '清湯底料，新鮮蔬菜，提供糖友善湯底選擇',
    openingHours: {
      monday: '17:00-23:00',
      tuesday: '17:00-23:00',
      wednesday: '17:00-23:00',
      thursday: '17:00-23:00',
      friday: '17:00-23:00',
      saturday: '12:00-23:00',
      sunday: '12:00-23:00',
    },
    priceRange: 3,
    tags: ['火鍋', '清湯', '蔬菜', '養生'],
    district: '中山區',
    averageRating: 4.2,
    reviewCount: 67,
  },
  {
    id: '5',
    name: '健康早餐店',
    address: '台北市萬華區武昌街二段77號',
    phone: '02-2389-4567',
    latitude: 25.0440,
    longitude: 121.5070,
    category: '早餐',
    sugarFriendlyScore: 8,
    image: 'https://example.com/restaurant5.jpg',
    description: '全麥麵包、無糖豆漿，健康早餐的首選',
    openingHours: {
      monday: '06:00-12:00',
      tuesday: '06:00-12:00',
      wednesday: '06:00-12:00',
      thursday: '06:00-12:00',
      friday: '06:00-12:00',
      saturday: '06:00-12:00',
      sunday: '07:00-12:00',
    },
    priceRange: 1,
    tags: ['早餐', '全麥', '無糖', '健康'],
    district: '西門商圈',
    averageRating: 4.3,
    reviewCount: 94,
  },
  {
    id: '6',
    name: '輕食沙拉吧',
    address: '台北市士林區文林路108號',
    phone: '02-2881-2345',
    latitude: 25.0875,
    longitude: 121.5244,
    category: '輕食',
    sugarFriendlyScore: 9,
    image: 'https://example.com/restaurant6.jpg',
    description: '新鮮沙拉、低卡輕食，完美的糖友選擇',
    openingHours: {
      monday: '11:00-21:00',
      tuesday: '11:00-21:00',
      wednesday: '11:00-21:00',
      thursday: '11:00-21:00',
      friday: '11:00-21:00',
      saturday: '10:00-21:00',
      sunday: '10:00-21:00',
    },
    priceRange: 2,
    tags: ['沙拉', '輕食', '新鮮', '低卡'],
    district: '士林夜市',
    averageRating: 4.5,
    reviewCount: 156,
  },
];