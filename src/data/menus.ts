export interface NutritionalInfo {
  calories: number;
  carbs: number; // grams
  sugar: number; // grams
  protein: number; // grams
  fat: number; // grams
  fiber: number; // grams
  sodium: number; // mg
}

export interface MenuItem {
  id: string;
  restaurantId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  image: string;
  sugarFriendlyScore: number;
  nutritionalInfo: NutritionalInfo;
  tags: string[];
  isRecommended: boolean;
  allergens: string[];
  preparationTime: number; // minutes
}

export const mockMenuItems: MenuItem[] = [
  // 健康蔬食餐廳 (Restaurant ID: 1)
  {
    id: 'm1',
    restaurantId: '1',
    name: '彩虹蔬菜沙拉',
    description: '新鮮時令蔬菜搭配橄欖油醋汁，豐富維生素',
    price: 180,
    category: '沙拉',
    image: 'https://example.com/menu1.jpg',
    sugarFriendlyScore: 10,
    nutritionalInfo: {
      calories: 120,
      carbs: 12,
      sugar: 8,
      protein: 4,
      fat: 8,
      fiber: 6,
      sodium: 200,
    },
    tags: ['低糖', '高纖', '維生素豐富'],
    isRecommended: true,
    allergens: [],
    preparationTime: 10,
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: '蒸蛋白豆腐',
    description: '嫩豆腐搭配蒸蛋白，低熱量高蛋白',
    price: 150,
    category: '主菜',
    image: 'https://example.com/menu2.jpg',
    sugarFriendlyScore: 9,
    nutritionalInfo: {
      calories: 95,
      carbs: 5,
      sugar: 2,
      protein: 12,
      fat: 4,
      fiber: 2,
      sodium: 300,
    },
    tags: ['高蛋白', '低糖', '低熱量'],
    isRecommended: true,
    allergens: ['大豆'],
    preparationTime: 15,
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: '糙米蔬菜飯',
    description: '糙米搭配季節蔬菜，營養均衡',
    price: 160,
    category: '主食',
    image: 'https://example.com/menu3.jpg',
    sugarFriendlyScore: 8,
    nutritionalInfo: {
      calories: 220,
      carbs: 42,
      sugar: 3,
      protein: 6,
      fat: 3,
      fiber: 5,
      sodium: 250,
    },
    tags: ['全穀物', '高纖', '營養均衡'],
    isRecommended: false,
    allergens: [],
    preparationTime: 20,
  },

  // 低糖咖啡廳 (Restaurant ID: 2)
  {
    id: 'm4',
    restaurantId: '2',
    name: '無糖拿鐵',
    description: '精選咖啡豆配無糖鮮奶，香濃不甜膩',
    price: 120,
    category: '飲品',
    image: 'https://example.com/menu4.jpg',
    sugarFriendlyScore: 9,
    nutritionalInfo: {
      calories: 85,
      carbs: 8,
      sugar: 8,
      protein: 6,
      fat: 3,
      fiber: 0,
      sodium: 100,
    },
    tags: ['無糖', '咖啡', '鮮奶'],
    isRecommended: true,
    allergens: ['乳製品'],
    preparationTime: 5,
  },
  {
    id: 'm5',
    restaurantId: '2',
    name: '雞胸肉三明治',
    description: '全麥麵包夾嫩雞胸肉與新鮮蔬菜',
    price: 160,
    category: '輕食',
    image: 'https://example.com/menu5.jpg',
    sugarFriendlyScore: 8,
    nutritionalInfo: {
      calories: 280,
      carbs: 28,
      sugar: 4,
      protein: 25,
      fat: 8,
      fiber: 6,
      sodium: 450,
    },
    tags: ['高蛋白', '全麥', '低糖'],
    isRecommended: true,
    allergens: ['麩質'],
    preparationTime: 10,
  },
  {
    id: 'm6',
    restaurantId: '2',
    name: '酪梨吐司',
    description: '全麥吐司配新鮮酪梨泥，健康好油脂',
    price: 140,
    category: '輕食',
    image: 'https://example.com/menu6.jpg',
    sugarFriendlyScore: 7,
    nutritionalInfo: {
      calories: 320,
      carbs: 30,
      sugar: 3,
      protein: 8,
      fat: 18,
      fiber: 12,
      sodium: 300,
    },
    tags: ['健康油脂', '全麥', '高纖'],
    isRecommended: false,
    allergens: ['麩質'],
    preparationTime: 8,
  },

  // 糖友便當店 (Restaurant ID: 3)
  {
    id: 'm7',
    restaurantId: '3',
    name: '蒸雞腿便當',
    description: '去皮蒸雞腿配三樣蔬菜與糙米飯',
    price: 85,
    category: '便當',
    image: 'https://example.com/menu7.jpg',
    sugarFriendlyScore: 9,
    nutritionalInfo: {
      calories: 450,
      carbs: 45,
      sugar: 6,
      protein: 35,
      fat: 12,
      fiber: 8,
      sodium: 600,
    },
    tags: ['高蛋白', '均衡營養', '蒸煮'],
    isRecommended: true,
    allergens: [],
    preparationTime: 15,
  },
  {
    id: 'm8',
    restaurantId: '3',
    name: '鯖魚便當',
    description: '烤鯖魚配季節蔬菜，富含omega-3',
    price: 90,
    category: '便當',
    image: 'https://example.com/menu8.jpg',
    sugarFriendlyScore: 8,
    nutritionalInfo: {
      calories: 480,
      carbs: 40,
      sugar: 5,
      protein: 30,
      fat: 18,
      fiber: 7,
      sodium: 550,
    },
    tags: ['omega-3', '烤魚', '營養豐富'],
    isRecommended: true,
    allergens: ['魚類'],
    preparationTime: 12,
  },
  {
    id: 'm9',
    restaurantId: '3',
    name: '素食便當',
    description: '豆腐排配綜合蔬菜，植物蛋白豐富',
    price: 75,
    category: '便當',
    image: 'https://example.com/menu9.jpg',
    sugarFriendlyScore: 8,
    nutritionalInfo: {
      calories: 380,
      carbs: 48,
      sugar: 8,
      protein: 18,
      fat: 10,
      fiber: 12,
      sodium: 480,
    },
    tags: ['素食', '植物蛋白', '高纖'],
    isRecommended: false,
    allergens: ['大豆'],
    preparationTime: 10,
  },

  // 養生火鍋店 (Restaurant ID: 4)
  {
    id: 'm10',
    restaurantId: '4',
    name: '昆布清湯鍋',
    description: '日式昆布熬煮清湯，無添加糖分',
    price: 300,
    category: '湯底',
    image: 'https://example.com/menu10.jpg',
    sugarFriendlyScore: 10,
    nutritionalInfo: {
      calories: 25,
      carbs: 3,
      sugar: 1,
      protein: 2,
      fat: 0,
      fiber: 0,
      sodium: 800,
    },
    tags: ['無糖', '清淡', '昆布'],
    isRecommended: true,
    allergens: [],
    preparationTime: 30,
  },
  {
    id: 'm11',
    restaurantId: '4',
    name: '有機蔬菜盤',
    description: '當季有機蔬菜拼盤，新鮮營養',
    price: 180,
    category: '蔬菜',
    image: 'https://example.com/menu11.jpg',
    sugarFriendlyScore: 10,
    nutritionalInfo: {
      calories: 80,
      carbs: 15,
      sugar: 10,
      protein: 4,
      fat: 1,
      fiber: 8,
      sodium: 50,
    },
    tags: ['有機', '當季', '高纖'],
    isRecommended: true,
    allergens: [],
    preparationTime: 5,
  },

  // 健康早餐店 (Restaurant ID: 5)
  {
    id: 'm12',
    restaurantId: '5',
    name: '全麥吐司夾蛋',
    description: '全麥吐司配水煮蛋，簡單營養',
    price: 45,
    category: '主食',
    image: 'https://example.com/menu12.jpg',
    sugarFriendlyScore: 8,
    nutritionalInfo: {
      calories: 280,
      carbs: 28,
      sugar: 3,
      protein: 15,
      fat: 12,
      fiber: 5,
      sodium: 400,
    },
    tags: ['全麥', '蛋白質', '簡單'],
    isRecommended: true,
    allergens: ['麩質', '蛋'],
    preparationTime: 8,
  },
  {
    id: 'm13',
    restaurantId: '5',
    name: '無糖豆漿',
    description: '現磨無糖豆漿，純天然',
    price: 25,
    category: '飲品',
    image: 'https://example.com/menu13.jpg',
    sugarFriendlyScore: 9,
    nutritionalInfo: {
      calories: 90,
      carbs: 8,
      sugar: 4,
      protein: 8,
      fat: 4,
      fiber: 2,
      sodium: 10,
    },
    tags: ['無糖', '蛋白質', '天然'],
    isRecommended: true,
    allergens: ['大豆'],
    preparationTime: 3,
  },

  // 輕食沙拉吧 (Restaurant ID: 6)
  {
    id: 'm14',
    restaurantId: '6',
    name: '凱薩雞肉沙拉',
    description: '烤雞胸肉配羅馬生菜，低糖凱薩醬',
    price: 220,
    category: '沙拉',
    image: 'https://example.com/menu14.jpg',
    sugarFriendlyScore: 8,
    nutritionalInfo: {
      calories: 350,
      carbs: 12,
      sugar: 4,
      protein: 28,
      fat: 22,
      fiber: 6,
      sodium: 650,
    },
    tags: ['高蛋白', '低糖醬', '烤雞'],
    isRecommended: true,
    allergens: ['蛋', '乳製品'],
    preparationTime: 12,
  },
  {
    id: 'm15',
    restaurantId: '6',
    name: '酪梨鮭魚沙拉',
    description: '煙燻鮭魚配酪梨，健康油脂豐富',
    price: 280,
    category: '沙拉',
    image: 'https://example.com/menu15.jpg',
    sugarFriendlyScore: 9,
    nutritionalInfo: {
      calories: 420,
      carbs: 8,
      sugar: 3,
      protein: 25,
      fat: 32,
      fiber: 10,
      sodium: 580,
    },
    tags: ['omega-3', '健康油脂', '煙燻鮭魚'],
    isRecommended: true,
    allergens: ['魚類'],
    preparationTime: 10,
  },
];

export const getMenuByRestaurantId = (restaurantId: string): MenuItem[] => {
  return mockMenuItems.filter(item => item.restaurantId === restaurantId);
};

export const getRecommendedMenuItems = (): MenuItem[] => {
  return mockMenuItems.filter(item => item.isRecommended);
};

export const getMenuItemsBySugarScore = (minScore: number): MenuItem[] => {
  return mockMenuItems.filter(item => item.sugarFriendlyScore >= minScore);
};