import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type HealthCondition = {
  id: string;
  name: string;
  description: string;
  icon: string;
};

const healthConditions: HealthCondition[] = [
  {
    id: 'diabetes_type1',
    name: '第一型糟尿病',
    description: '胰島素依賴型糟尿病',
    icon: 'medical',
  },
  {
    id: 'diabetes_type2',
    name: '第二型糟尿病',
    description: '成人型糟尿病',
    icon: 'medical',
  },
  {
    id: 'prediabetes',
    name: '糟尿病前期',
    description: '血糖值偏高，需要控制',
    icon: 'warning',
  },
  {
    id: 'diet_control',
    name: '飲食控制',
    description: '需要控制糖分攝取',
    icon: 'restaurant',
  },
  {
    id: 'none',
    name: '無特殊需求',
    description: '單純想了解糖友善選擇',
    icon: 'checkmark-circle',
  },
];

export default function HealthProfileScreen() {
  const [selectedCondition, setSelectedCondition] = useState<string | null>(null);
  const [sugarLevel, setSugarLevel] = useState<string>('medium');

  const handleComplete = () => {
    // TODO: Save health profile and navigate to main app
    console.log('Health profile:', { selectedCondition, sugarLevel });
  };

  const renderHealthOption = (condition: HealthCondition) => {
    const isSelected = selectedCondition === condition.id;
    return (
      <TouchableOpacity
        key={condition.id}
        style={[styles.optionCard, isSelected && styles.selectedCard]}
        onPress={() => setSelectedCondition(condition.id)}
      >
        <View style={styles.optionHeader}>
          <Ionicons
            name={condition.icon as any}
            size={24}
            color={isSelected ? '#4CAF50' : '#666'}
          />
          <Text style={[styles.optionTitle, isSelected && styles.selectedText]}>
            {condition.name}
          </Text>
        </View>
        <Text style={[styles.optionDescription, isSelected && styles.selectedDescription]}>
          {condition.description}
        </Text>
        {isSelected && (
          <View style={styles.checkmark}>
            <Ionicons name="checkmark-circle" size={20} color="#4CAF50" />
          </View>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Ionicons name="fitness" size={60} color="#4CAF50" />
          <Text style={styles.title}>健康設定</Text>
          <Text style={styles.subtitle}>
            請選擇您的健康狀態，我們將為您提供更精準的建議
          </Text>
        </View>

        <View style={styles.content}>
          <Text style={styles.sectionTitle}>您的健康狀態</Text>
          {healthConditions.map(renderHealthOption)}

          {selectedCondition && selectedCondition !== 'none' && (
            <View style={styles.sugarLevelSection}>
              <Text style={styles.sectionTitle}>糖分控制程度</Text>
              
              <TouchableOpacity
                style={[styles.levelOption, sugarLevel === 'strict' && styles.selectedLevel]}
                onPress={() => setSugarLevel('strict')}
              >
                <Text style={[styles.levelText, sugarLevel === 'strict' && styles.selectedLevelText]}>
                  嚴格控制
                </Text>
                <Text style={styles.levelDescription}>極低糖分飲食</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.levelOption, sugarLevel === 'medium' && styles.selectedLevel]}
                onPress={() => setSugarLevel('medium')}
              >
                <Text style={[styles.levelText, sugarLevel === 'medium' && styles.selectedLevelText]}>
                  中等控制
                </Text>
                <Text style={styles.levelDescription}>適量糖分飲食</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.levelOption, sugarLevel === 'light' && styles.selectedLevel]}
                onPress={() => setSugarLevel('light')}
              >
                <Text style={[styles.levelText, sugarLevel === 'light' && styles.selectedLevelText]}>
                  輕度控制
                </Text>
                <Text style={styles.levelDescription}>減少糖分攝取</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[styles.completeButton, !selectedCondition && styles.disabledButton]}
            onPress={handleComplete}
            disabled={!selectedCondition}
          >
            <Text style={styles.completeButtonText}>完成設定</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 20,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 30,
    lineHeight: 20,
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    marginTop: 10,
  },
  optionCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    position: 'relative',
  },
  selectedCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 12,
  },
  selectedText: {
    color: '#4CAF50',
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  selectedDescription: {
    color: '#333',
  },
  checkmark: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  sugarLevelSection: {
    marginTop: 30,
  },
  levelOption: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedLevel: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fff8',
  },
  levelText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  selectedLevelText: {
    color: '#4CAF50',
  },
  levelDescription: {
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    padding: 20,
  },
  completeButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  completeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});