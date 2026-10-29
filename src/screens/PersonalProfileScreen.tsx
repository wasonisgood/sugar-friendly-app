import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../context/AuthContext';

export default function PersonalProfileScreen() {
  const navigation = useNavigation();
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '0912-345-678',
    birthday: '1990-01-01',
    gender: '男性',
    occupation: '工程師',
    emergencyContact: '0987-654-321',
    emergencyContactName: '家人',
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    Alert.alert('成功', '個人資料已更新');
    setIsEditing(false);
  };

  const ProfileField = ({ label, value, onChangeText, keyboardType = 'default' }: any) => (
    <View style={styles.fieldContainer}>
      <Text style={styles.fieldLabel}>{label}</Text>
      {isEditing ? (
        <TextInput
          style={styles.fieldInput}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
        />
      ) : (
        <Text style={styles.fieldValue}>{value}</Text>
      )}
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
        <Text style={styles.headerTitle}>個人資料</Text>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => isEditing ? handleSave() : setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>
            {isEditing ? '保存' : '編輯'}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.avatarSection}>
          <View style={styles.avatarContainer}>
            <Ionicons name="person" size={60} color="#4CAF50" />
          </View>
          {isEditing && (
            <TouchableOpacity style={styles.changeAvatarButton}>
              <Text style={styles.changeAvatarText}>更換頭像</Text>
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>基本資料</Text>
          <ProfileField
            label="姓名"
            value={profile.name}
            onChangeText={(text: string) => setProfile({...profile, name: text})}
          />
          <ProfileField
            label="電子郵件"
            value={profile.email}
            onChangeText={(text: string) => setProfile({...profile, email: text})}
            keyboardType="email-address"
          />
          <ProfileField
            label="手機號碼"
            value={profile.phone}
            onChangeText={(text: string) => setProfile({...profile, phone: text})}
            keyboardType="phone-pad"
          />
          <ProfileField
            label="生日"
            value={profile.birthday}
            onChangeText={(text: string) => setProfile({...profile, birthday: text})}
          />
          <ProfileField
            label="性別"
            value={profile.gender}
            onChangeText={(text: string) => setProfile({...profile, gender: text})}
          />
          <ProfileField
            label="職業"
            value={profile.occupation}
            onChangeText={(text: string) => setProfile({...profile, occupation: text})}
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>緊急聯絡人</Text>
          <ProfileField
            label="聯絡人姓名"
            value={profile.emergencyContactName}
            onChangeText={(text: string) => setProfile({...profile, emergencyContactName: text})}
          />
          <ProfileField
            label="聯絡人電話"
            value={profile.emergencyContact}
            onChangeText={(text: string) => setProfile({...profile, emergencyContact: text})}
            keyboardType="phone-pad"
          />
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
  editButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  content: {
    flex: 1,
  },
  avatarSection: {
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 30,
    marginBottom: 20,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8f5e8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  changeAvatarButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#f0f0f0',
    borderRadius: 15,
  },
  changeAvatarText: {
    color: '#666',
    fontSize: 14,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 15,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  fieldValue: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  fieldInput: {
    fontSize: 16,
    color: '#333',
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
});