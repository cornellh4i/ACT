import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@profiles';

export interface DeckProgress {
  viewedCardIds: number[];
  viewedCount: number;
  totalCount: number;
  completedAt?: string;
}

export interface Profile {
  id: number;
  name: string;
  avatar?: string;
  createdAt: string;
  lastActiveAt: string;
  progress: Record<string, DeckProgress>;
}

const getStoredProfiles = async (): Promise<Profile[]> => {
  try {
    const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
    if (!jsonValue) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([]));
      return [];
    }
    return JSON.parse(jsonValue) as Profile[];
  } catch (e) {
    console.error('Error reading profiles:', e);
    return [];
  }
};

const saveProfiles = async (profiles: Profile[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(profiles));
  } catch (e) {
    console.error('Error saving profiles:', e);
  }
};

export const getProfiles = async (): Promise<Profile[]> => {
  return await getStoredProfiles();
};

export const addProfile = async (profile: Omit<Profile, 'id' | 'createdAt' | 'lastActiveAt' | 'progress'>): Promise<Profile> => {
  const profiles = await getStoredProfiles();
  const newProfile: Profile = {
    ...profile,
    id: Date.now(), 
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    progress: {},
  };
  profiles.push(newProfile);
  await saveProfiles(profiles);
  return newProfile;
};

export const updateProfile = async (profileId: number, updates: Partial<Profile>): Promise<Profile | null> => {
  const profiles = await getStoredProfiles();
  const index = profiles.findIndex(p => p.id === profileId);
  if (index === -1) return null;

  const updatedProfile = { ...profiles[index], ...updates };
  profiles[index] = updatedProfile;

  await saveProfiles(profiles);
  return updatedProfile;
};

export const deleteProfile = async (profileId: number): Promise<void> => {
  const profiles = await getStoredProfiles();
  const updated = profiles.filter(p => p.id !== profileId);
  await saveProfiles(updated);
};

export const getProfileProgress = async (profileId: number): Promise<Record<string, DeckProgress> | null> => {
  const profiles = await getStoredProfiles();
  const profile = profiles.find(p => p.id === profileId);
  return profile ? profile.progress : null;
};

export const updateProgress = async (
  profileId: number,
  deckId: string,
  updatedProgress: Partial<DeckProgress>
): Promise<void> => {
  const profiles = await getStoredProfiles();
  const index = profiles.findIndex(p => p.id === profileId);
  if (index === -1) return;

  const profile = profiles[index];
  const existing = profile.progress[deckId] || { viewedCardIds: [], viewedCount: 0, totalCount: 0 };
  profile.progress[deckId] = {
    ...existing,
    ...updatedProgress,
  };

  profiles[index] = { ...profile, lastActiveAt: new Date().toISOString() };
  await saveProfiles(profiles);
};

export const clearAllProfiles = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};