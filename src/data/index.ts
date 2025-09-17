// Export all mock data
export { mockRestaurants } from './restaurants';
export { mockMenuItems, getMenuByRestaurantId, getRecommendedMenuItems, getMenuItemsBySugarScore } from './menus';
export { mockDistricts, getDistrictByName, getDistrictsByArea, getPopularDistricts } from './districts';

// Export types
export type { Restaurant } from './restaurants';
export type { MenuItem, NutritionalInfo } from './menus';
export type { District } from './districts';