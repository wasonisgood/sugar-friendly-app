import AsyncStorage from '@react-native-async-storage/async-storage';
import { FoodAnalysisResult } from './foodAnalysisService';

export interface ScanHistoryItem {
  id: string;
  imageUri: string;
  analysisResult: FoodAnalysisResult;
  timestamp: Date;
  location?: string;
  notes?: string;
}

class ScanHistoryService {
  private readonly STORAGE_KEY = '@scan_history';
  private readonly MAX_HISTORY_ITEMS = 100;

  async saveScanResult(
    imageUri: string,
    analysisResult: FoodAnalysisResult,
    location?: string,
    notes?: string
  ): Promise<string> {
    try {
      const historyItem: ScanHistoryItem = {
        id: this.generateId(),
        imageUri,
        analysisResult,
        timestamp: new Date(),
        location,
        notes
      };

      const existingHistory = await this.getScanHistory();
      const updatedHistory = [historyItem, ...existingHistory];

      // Keep only the most recent items
      if (updatedHistory.length > this.MAX_HISTORY_ITEMS) {
        updatedHistory.splice(this.MAX_HISTORY_ITEMS);
      }

      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
      return historyItem.id;

    } catch (error) {
      console.error('Error saving scan result:', error);
      throw new Error('Failed to save scan result');
    }
  }

  async getScanHistory(): Promise<ScanHistoryItem[]> {
    try {
      const data = await AsyncStorage.getItem(this.STORAGE_KEY);
      if (!data) return [];

      const history = JSON.parse(data);
      // Convert timestamp strings back to Date objects
      return history.map((item: any) => ({
        ...item,
        timestamp: new Date(item.timestamp)
      }));

    } catch (error) {
      console.error('Error loading scan history:', error);
      return [];
    }
  }

  async deleteScanItem(id: string): Promise<void> {
    try {
      const history = await this.getScanHistory();
      const updatedHistory = history.filter(item => item.id !== id);
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch (error) {
      console.error('Error deleting scan item:', error);
      throw new Error('Failed to delete scan item');
    }
  }

  async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.STORAGE_KEY);
    } catch (error) {
      console.error('Error clearing scan history:', error);
      throw new Error('Failed to clear history');
    }
  }

  async getScansByDateRange(startDate: Date, endDate: Date): Promise<ScanHistoryItem[]> {
    const history = await this.getScanHistory();
    return history.filter(item => {
      const itemDate = new Date(item.timestamp);
      return itemDate >= startDate && itemDate <= endDate;
    });
  }

  async getScansByCategory(category: string): Promise<ScanHistoryItem[]> {
    const history = await this.getScanHistory();
    return history.filter(item =>
      item.analysisResult.category.toLowerCase() === category.toLowerCase()
    );
  }

  async getScansByScore(minScore: number, maxScore: number = 10): Promise<ScanHistoryItem[]> {
    const history = await this.getScanHistory();
    return history.filter(item => {
      const score = item.analysisResult.sugarFriendlyScore;
      return score >= minScore && score <= maxScore;
    });
  }

  async updateScanNotes(id: string, notes: string): Promise<void> {
    try {
      const history = await this.getScanHistory();
      const itemIndex = history.findIndex(item => item.id === id);

      if (itemIndex === -1) {
        throw new Error('Scan item not found');
      }

      history[itemIndex].notes = notes;
      await AsyncStorage.setItem(this.STORAGE_KEY, JSON.stringify(history));
    } catch (error) {
      console.error('Error updating scan notes:', error);
      throw new Error('Failed to update notes');
    }
  }

  async getStatistics(): Promise<{
    totalScans: number;
    averageScore: number;
    topCategories: { category: string; count: number }[];
    recentActivity: { date: string; count: number }[];
  }> {
    const history = await this.getScanHistory();

    if (history.length === 0) {
      return {
        totalScans: 0,
        averageScore: 0,
        topCategories: [],
        recentActivity: []
      };
    }

    // Calculate average score
    const totalScore = history.reduce((sum, item) => sum + item.analysisResult.sugarFriendlyScore, 0);
    const averageScore = totalScore / history.length;

    // Calculate top categories
    const categoryCount: { [key: string]: number } = {};
    history.forEach(item => {
      const category = item.analysisResult.category;
      categoryCount[category] = (categoryCount[category] || 0) + 1;
    });

    const topCategories = Object.entries(categoryCount)
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    // Calculate recent activity (last 7 days)
    const now = new Date();
    const recentActivity = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      const dateStr = date.toISOString().split('T')[0];

      const dayCount = history.filter(item => {
        const itemDate = new Date(item.timestamp).toISOString().split('T')[0];
        return itemDate === dateStr;
      }).length;

      recentActivity.push({ date: dateStr, count: dayCount });
    }

    return {
      totalScans: history.length,
      averageScore: Math.round(averageScore * 10) / 10,
      topCategories,
      recentActivity
    };
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

export const scanHistoryService = new ScanHistoryService();