import AsyncStorage from '@react-native-async-storage/async-storage';

const ONBOARDING_SEEN_KEY = '@has_seen_onboarding';

export const hasSeenOnboarding = async (): Promise<boolean> => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_SEEN_KEY);
    return value === 'true';
  } catch (e) {
    console.error('Error reading onboarding state:', e);
    return false;
  }
};

export const markOnboardingSeen = async (): Promise<void> => {
  try {
    await AsyncStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
  } catch (e) {
    console.error('Error saving onboarding state:', e);
  }
};

export const resetOnboardingSeen = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(ONBOARDING_SEEN_KEY);
  } catch (e) {
    console.error('Error resetting onboarding state:', e);
  }
};
