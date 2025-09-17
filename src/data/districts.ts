export interface District {
  id: string;
  name: string;
  area: string;
  description: string;
  latitude: number;
  longitude: number;
  restaurantCount: number;
  averageScore: number;
  popularCategories: string[];
  image: string;
  tags: string[];
}

export const mockDistricts: District[] = [
  {
    id: 'd1',
    name: '信義商圈',
    area: '信義區',
    description: '台北市最繁華的商業區，匯集各種美食與購物選擇',
    latitude: 25.0330,
    longitude: 121.5654,
    restaurantCount: 24,
    averageScore: 8.5,
    popularCategories: ['素食', '咖啡廳', '輕食'],
    image: 'https://example.com/district1.jpg',
    tags: ['商業區', '美食多樣', '交通便利'],
  },
  {
    id: 'd2',
    name: '東區商圈',
    area: '大安區',
    description: '時尚與美食的集散地，年輕人最愛的聚集地',
    latitude: 25.0266,
    longitude: 121.5516,
    restaurantCount: 18,
    averageScore: 8.2,
    popularCategories: ['咖啡廳', '輕食', '異國料理'],
    image: 'https://example.com/district2.jpg',
    tags: ['時尚', '年輕', '異國美食'],
  },
  {
    id: 'd3',
    name: '西門商圈',
    area: '萬華區',
    description: '台北西區最熱鬧的商圈，傳統與現代美食並存',
    latitude: 25.0440,
    longitude: 121.5070,
    restaurantCount: 32,
    averageScore: 7.8,
    popularCategories: ['早餐', '小吃', '茶飲'],
    image: 'https://example.com/district3.jpg',
    tags: ['傳統美食', '小吃', '平價'],
  },
  {
    id: 'd4',
    name: '士林夜市',
    area: '士林區',
    description: '台北最著名的夜市，各種傳統小吃與創新美食',
    latitude: 25.0875,
    longitude: 121.5244,
    restaurantCount: 45,
    averageScore: 7.5,
    popularCategories: ['夜市小吃', '輕食', '飲品'],
    image: 'https://example.com/district4.jpg',
    tags: ['夜市', '小吃', '觀光'],
  },
  {
    id: 'd5',
    name: '中山區',
    area: '中山區',
    description: '文青聚集地，特色餐廳與咖啡廳林立',
    latitude: 25.0618,
    longitude: 121.5200,
    restaurantCount: 21,
    averageScore: 8.1,
    popularCategories: ['火鍋', '咖啡廳', '精緻料理'],
    image: 'https://example.com/district5.jpg',
    tags: ['文青', '精緻', '咖啡文化'],
  },
  {
    id: 'd6',
    name: '松山區',
    area: '松山區',
    description: '住宅與商業並重，有許多在地人推薦的隱藏美食',
    latitude: 25.0518,
    longitude: 121.5510,
    restaurantCount: 16,
    averageScore: 8.3,
    popularCategories: ['便當', '家常菜', '湯品'],
    image: 'https://example.com/district6.jpg',
    tags: ['在地美食', '家常菜', '實惠'],
  },
];

export const getDistrictByName = (name: string): District | undefined => {
  return mockDistricts.find(district => district.name === name);
};

export const getDistrictsByArea = (area: string): District[] => {
  return mockDistricts.filter(district => district.area === area);
};

export const getPopularDistricts = (): District[] => {
  return mockDistricts
    .sort((a, b) => b.averageScore - a.averageScore)
    .slice(0, 3);
};