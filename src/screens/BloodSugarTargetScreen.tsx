import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

interface BloodSugarTarget {
  id: string;
  name: string;
  fastingMin: number;
  fastingMax: number;
  beforeMealMin: number;
  beforeMealMax: number;
  afterMealMin: number;
  afterMealMax: number;
  bedtimeMin: number;
  bedtimeMax: number;
  description: string;
}

const PREDEFINED_TARGETS: BloodSugarTarget[] = [
  {
    id: 'ada_standard',
    name: 'ADA 標準目標',
    fastingMin: 80,
    fastingMax: 130,
    beforeMealMin: 80,
    beforeMealMax: 130,
    afterMealMin: 80,
    afterMealMax: 180,
    bedtimeMin: 100,
    bedtimeMax: 140,
    description: '美國糖尿病協會建議的標準血糖目標範圍'
  },
  {
    id: 'strict_control',
    name: '嚴格控制目標',
    fastingMin: 70,
    fastingMax: 100,
    beforeMealMin: 70,
    beforeMealMax: 100,
    afterMealMin: 70,
    afterMealMax: 140,
    bedtimeMin: 80,
    bedtimeMax: 120,
    description: '適合年輕、無併發症的糖尿病患者'
  },
  {
    id: 'relaxed_control',
    name: '寬鬆控制目標',
    fastingMin: 90,
    fastingMax: 150,
    beforeMealMin: 90,
    beforeMealMax: 150,
    afterMealMin: 90,
    afterMealMax: 200,
    bedtimeMin: 110,
    bedtimeMax: 160,
    description: '適合年長者或有心血管疾病風險的患者'
  },
  {
    id: 'pregnancy',
    name: '妊娠糖尿病目標',
    fastingMin: 60,
    fastingMax: 95,
    beforeMealMin: 60,
    beforeMealMax: 95,
    afterMealMin: 60,
    afterMealMax: 120,
    bedtimeMin: 60,
    bedtimeMax: 120,
    description: '孕期血糖控制目標，需要更嚴格的管理'
  }
];

export default function BloodSugarTargetScreen() {
  const navigation = useNavigation();
  const [selectedTarget, setSelectedTarget] = useState<string>('ada_standard');
  const [customTarget, setCustomTarget] = useState<BloodSugarTarget>({
    id: 'custom',
    name: '個人化目標',
    fastingMin: 80,
    fastingMax: 130,
    beforeMealMin: 80,
    beforeMealMax: 130,
    afterMealMin: 80,
    afterMealMax: 180,
    bedtimeMin: 100,
    bedtimeMax: 140,
    description: '根據醫師建議設定的個人化目標'
  });
  const [showCustomForm, setShowCustomForm] = useState(false);

  const handleTargetSelect = (targetId: string) => {
    setSelectedTarget(targetId);
    if (targetId !== 'custom') {
      setShowCustomForm(false);
    } else {
      setShowCustomForm(true);
    }
  };

  const handleCustomValueChange = (field: string, value: string) => {
    const numValue = parseInt(value) || 0;
    setCustomTarget(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const saveTarget = () => {
    Alert.alert(
      '儲存血糖目標',
      '您的血糖目標已成功儲存！系統將根據這些目標來評估您的血糖記錄。',
      [{ text: '確定', onPress: () => navigation.goBack() }]
    );
  };

  const TargetCard = ({ target, isSelected }: { target: BloodSugarTarget; isSelected: boolean }) => (
    <TouchableOpacity
      style={[styles.targetCard, isSelected && styles.selectedCard]}
      onPress={() => handleTargetSelect(target.id)}
    >
      <View style={styles.cardHeader}>
        <Text style={[styles.targetName, isSelected && styles.selectedText]}>{target.name}</Text>
        {isSelected && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
      </View>
      <Text style={styles.targetDescription}>{target.description}</Text>

      <View style={styles.rangesContainer}>
        <View style={styles.rangeItem}>
          <Text style={styles.rangeLabel}>空腹</Text>
          <Text style={styles.rangeValue}>{target.fastingMin}-{target.fastingMax} mg/dL</Text>
        </View>
        <View style={styles.rangeItem}>
          <Text style={styles.rangeLabel}>餐前</Text>
          <Text style={styles.rangeValue}>{target.beforeMealMin}-{target.beforeMealMax} mg/dL</Text>
        </View>
        <View style={styles.rangeItem}>
          <Text style={styles.rangeLabel}>餐後</Text>
          <Text style={styles.rangeValue}>{target.afterMealMin}-{target.afterMealMax} mg/dL</Text>
        </View>
        <View style={styles.rangeItem}>
          <Text style={styles.rangeLabel}>睡前</Text>
          <Text style={styles.rangeValue}>{target.bedtimeMin}-{target.bedtimeMax} mg/dL</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const CustomTargetForm = () => (
    <View style={styles.customForm}>
      <Text style={styles.customFormTitle}>自訂血糖目標範圍</Text>
      <Text style={styles.customFormSubtitle}>
        請與您的醫師討論後設定個人化的血糖目標
      </Text>

      <View style={styles.inputGrid}>
        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>空腹血糖 (mg/dL)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.fastingMin.toString()}
              onChangeText={(value) => handleCustomValueChange('fastingMin', value)}
              keyboardType="numeric"
              placeholder="最低"
            />
            <Text style={styles.rangeSeparator}>-</Text>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.fastingMax.toString()}
              onChangeText={(value) => handleCustomValueChange('fastingMax', value)}
              keyboardType="numeric"
              placeholder="最高"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>餐前血糖 (mg/dL)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.beforeMealMin.toString()}
              onChangeText={(value) => handleCustomValueChange('beforeMealMin', value)}
              keyboardType="numeric"
              placeholder="最低"
            />
            <Text style={styles.rangeSeparator}>-</Text>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.beforeMealMax.toString()}
              onChangeText={(value) => handleCustomValueChange('beforeMealMax', value)}
              keyboardType="numeric"
              placeholder="最高"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>餐後血糖 (mg/dL)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.afterMealMin.toString()}
              onChangeText={(value) => handleCustomValueChange('afterMealMin', value)}
              keyboardType="numeric"
              placeholder="最低"
            />
            <Text style={styles.rangeSeparator}>-</Text>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.afterMealMax.toString()}
              onChangeText={(value) => handleCustomValueChange('afterMealMax', value)}
              keyboardType="numeric"
              placeholder="最高"
            />
          </View>
        </View>

        <View style={styles.inputRow}>
          <Text style={styles.inputLabel}>睡前血糖 (mg/dL)</Text>
          <View style={styles.rangeInputs}>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.bedtimeMin.toString()}
              onChangeText={(value) => handleCustomValueChange('bedtimeMin', value)}
              keyboardType="numeric"
              placeholder="最低"
            />
            <Text style={styles.rangeSeparator}>-</Text>
            <TextInput
              style={styles.rangeInput}
              value={customTarget.bedtimeMax.toString()}
              onChangeText={(value) => handleCustomValueChange('bedtimeMax', value)}
              keyboardType="numeric"
              placeholder="最高"
            />
          </View>
        </View>
      </View>

      <View style={styles.warningBox}>
        <Ionicons name="warning" size={20} color="#FF9800" />
        <Text style={styles.warningText}>
          請務必與您的醫師或糖尿病衛教師討論，確認這些目標適合您的健康狀況
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>血糖目標設定</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.intro}>
          <Ionicons name="target" size={50} color="#4CAF50" />
          <Text style={styles.introTitle}>設定您的血糖目標</Text>
          <Text style={styles.introDescription}>
            選擇適合的血糖目標範圍，幫助您更好地管理糖尿病。{'\n'}
            建議先諮詢醫師再進行設定。
          </Text>
        </View>

        <View style={styles.targetsSection}>
          <Text style={styles.sectionTitle}>預設目標範圍</Text>
          {PREDEFINED_TARGETS.map((target) => (
            <TargetCard
              key={target.id}
              target={target}
              isSelected={selectedTarget === target.id}
            />
          ))}

          <TouchableOpacity
            style={[styles.targetCard, selectedTarget === 'custom' && styles.selectedCard]}
            onPress={() => handleTargetSelect('custom')}
          >
            <View style={styles.cardHeader}>
              <Text style={[styles.targetName, selectedTarget === 'custom' && styles.selectedText]}>
                自訂目標
              </Text>
              {selectedTarget === 'custom' && <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />}
            </View>
            <Text style={styles.targetDescription}>根據醫師建議設定個人化的血糖目標</Text>
          </TouchableOpacity>

          {showCustomForm && <CustomTargetForm />}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>血糖測量時機說明</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Ionicons name="sunny" size={24} color="#FF9800" />
              <Text style={styles.infoLabel}>空腹血糖</Text>
              <Text style={styles.infoDesc}>起床後，尚未進食前測量</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="restaurant" size={24} color="#2196F3" />
              <Text style={styles.infoLabel}>餐前血糖</Text>
              <Text style={styles.infoDesc}>用餐前 15-30 分鐘測量</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="time" size={24} color="#9C27B0" />
              <Text style={styles.infoLabel}>餐後血糖</Text>
              <Text style={styles.infoDesc}>用餐後 2 小時測量</Text>
            </View>
            <View style={styles.infoItem}>
              <Ionicons name="moon" size={24} color="#607D8B" />
              <Text style={styles.infoLabel}>睡前血糖</Text>
              <Text style={styles.infoDesc}>就寢前測量</Text>
            </View>
          </View>
        </View>

        <TouchableOpacity style={styles.saveButton} onPress={saveTarget}>
          <Text style={styles.saveButtonText}>儲存血糖目標</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  placeholder: {
    width: 34,
  },
  content: {
    flex: 1,
  },
  intro: {
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 15,
    marginBottom: 10,
  },
  introDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  targetsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  targetCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  selectedCard: {
    borderColor: '#4CAF50',
    backgroundColor: '#f8fdf8',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedText: {
    color: '#4CAF50',
  },
  targetDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  rangesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  rangeItem: {
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  rangeLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  rangeValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  customForm: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 15,
    borderWidth: 2,
    borderColor: '#4CAF50',
  },
  customFormTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  customFormSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
    lineHeight: 20,
  },
  inputGrid: {
    gap: 16,
  },
  inputRow: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  rangeInputs: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rangeInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    textAlign: 'center',
    backgroundColor: '#f8f9fa',
  },
  rangeSeparator: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#666',
  },
  warningBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#fff8e1',
    borderRadius: 8,
    padding: 16,
    marginTop: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9800',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#F57C00',
    lineHeight: 20,
    marginLeft: 12,
  },
  infoSection: {
    margin: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 16,
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  infoItem: {
    flex: 1,
    minWidth: '45%',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 8,
    marginBottom: 4,
  },
  infoDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 16,
  },
  saveButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 12,
    padding: 18,
    margin: 20,
    alignItems: 'center',
    marginBottom: 40,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});