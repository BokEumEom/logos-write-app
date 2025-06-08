import { useState } from 'react';
import { StyleSheet, View, ScrollView, Switch, TouchableOpacity, Alert } from 'react-native';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Colors } from '@/constants/Colors';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Feather, MaterialIcons, Ionicons } from '@expo/vector-icons';

type SettingItemProps = {
  icon: React.ReactNode;
  title: string;
  description?: string;
  onPress?: () => void;
  rightComponent?: React.ReactNode;
  isLast?: boolean;
};

const SettingItem = ({
  icon,
  title,
  description,
  onPress,
  rightComponent,
  isLast = false,
}: SettingItemProps) => {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <>
      <TouchableOpacity
        style={[styles.settingItem, !isLast && styles.settingItemWithBorder]}
        onPress={onPress}
        activeOpacity={0.7}
      >
        <View style={[styles.iconContainer, { backgroundColor: colors.tint + '20' }]}>
          {icon}
        </View>
        <View style={styles.settingTextContainer}>
          <ThemedText style={styles.settingTitle}>{title}</ThemedText>
          {description && (
            <ThemedText style={[styles.settingDescription, { color: colors.textSecondary }]}>
              {description}
            </ThemedText>
          )}
        </View>
        {rightComponent || (
          <Feather name="chevron-right" size={20} color={colors.textSecondary} />
        )}
      </TouchableOpacity>
      {!isLast && <View style={[styles.divider, { backgroundColor: colors.border }]} />}
    </>
  );
};

export default function SettingsScreen() {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(colorScheme === 'dark');
  const [appVersion] = useState('1.0.0');

  const handleToggleNotifications = () => {
    setNotificationsEnabled(!notificationsEnabled);
    // TODO: Update notification settings in storage/backend
  };

  const handleToggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    // TODO: Update theme in app state
  };

  const handleBackup = () => {
    Alert.alert('백업', '데이터를 백업하시겠습니까?');
    // TODO: Implement backup functionality
  };

  const handleRestore = () => {
    Alert.alert('복원', '백업된 데이터를 복원하시겠습니까?');
    // TODO: Implement restore functionality
  };

  const openPrivacyPolicy = () => {
    // TODO: Open privacy policy URL
  };

  const openTermsOfService = () => {
    // TODO: Open terms of service URL
  };

  const contactSupport = () => {
    // TODO: Open email client or support form
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <ThemedText style={styles.headerTitle}>설정</ThemedText>
        </View>

        <ThemedView style={[styles.section, { backgroundColor: colors.card }]}>
          <SettingItem
            icon={
              <MaterialIcons 
                name="notifications" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="알림 설정"
            description="매일 말씀 필사 알림 받기"
            rightComponent={
              <Switch
                value={notificationsEnabled}
                onValueChange={handleToggleNotifications}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            icon={
              <Ionicons 
                name={darkMode ? "moon" : "moon-outline"} 
                size={20} 
                color={colors.tint} 
              />
            }
            title="다크 모드"
            rightComponent={
              <Switch
                value={darkMode}
                onValueChange={handleToggleDarkMode}
                trackColor={{ false: colors.border, true: colors.tint }}
                thumbColor="#fff"
              />
            }
          />
          <SettingItem
            icon={
              <Feather 
                name="globe" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="언어"
            description="한국어"
            onPress={() => {}}
          />
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: colors.card, marginTop: 16 }]}>
          <SettingItem
            icon={
              <Feather 
                name="upload-cloud" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="데이터 백업"
            description="구글 드라이브에 데이터 백업"
            onPress={handleBackup}
          />
          <SettingItem
            icon={
              <Feather 
                name="download" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="데이터 복원"
            description="구글 드라이브에서 데이터 복원"
            onPress={handleRestore}
            isLast
          />
        </ThemedView>

        <ThemedView style={[styles.section, { backgroundColor: colors.card, marginTop: 16 }]}>
          <SettingItem
            icon={
              <Feather 
                name="shield" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="개인정보 처리방침"
            onPress={openPrivacyPolicy}
          />
          <SettingItem
            icon={
              <Feather 
                name="file-text" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="이용약관"
            onPress={openTermsOfService}
          />
          <SettingItem
            icon={
              <Feather 
                name="mail" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="문의하기"
            description="버그 제보 및 문의"
            onPress={contactSupport}
          />
          <SettingItem
            icon={
              <Feather 
                name="info" 
                size={20} 
                color={colors.tint} 
              />
            }
            title="앱 정보"
            description={`버전 ${appVersion}`}
            isLast
          />
        </ThemedView>

        <View style={styles.footer}>
          <ThemedText style={[styles.footerText, { color: colors.textSecondary }]}>
            로고스 라이팅 © 2025
          </ThemedText>
          <ThemedText style={[styles.footerText, { color: colors.textSecondary, marginTop: 4 }]}>
            말씀으로 하루를 시작하세요
          </ThemedText>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 40,
  },
  header: {
    paddingVertical: 24,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
  },
  section: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  settingItemWithBorder: {
    borderBottomWidth: 1,
  },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  settingTextContainer: {
    flex: 1,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 13,
    opacity: 0.8,
  },
  divider: {
    height: 1,
    marginLeft: 64,
  },
  footer: {
    marginTop: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    opacity: 0.7,
  },
});
