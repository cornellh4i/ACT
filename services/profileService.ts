import { DeckData } from '@/app/Cards';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@profiles';

export type DeckProgress = {
  recent: Deck[];
  upNext: Deck[];
  completed: Deck[];
}

export interface Deck extends DeckData {
  viewedCardIds: number[];
  viewedCount: number;
  totalCount: number;
  lastOpenedAt?: string;
  completedAt?: string;
}

export interface Profile {
  id: number;
  name: string;
  avatar?: string;
  createdAt: string;
  lastActiveAt: string;
  progress: Record<string, Deck>;
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

const createProfileDeck = (deckData: DeckData): Deck => ({
  ...deckData,
  viewedCardIds: [],
  viewedCount: 0,
  totalCount: deckData.cards.length,
  lastOpenedAt: undefined,
  completedAt: undefined,
});

export const addProfile = async (
  profile: Omit<Profile, 'id' | 'createdAt' | 'lastActiveAt' | 'progress'>,
  allDecks: DeckData[] 
): Promise<Profile> => {
  const profiles = await getStoredProfiles();

  const profileDecks: Record<string, Deck> = {};
  (allDecks || []).forEach((deck) => {
    profileDecks[deck.id] = createProfileDeck(deck);
  });

  const newProfile: Profile = {
    ...profile,
    id: Date.now(),
    createdAt: new Date().toISOString(),
    lastActiveAt: new Date().toISOString(),
    progress: profileDecks,
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

export const getProfileProgress = async (profileId: number): Promise<Record<string, Deck> | null> => {
  const profiles = await getStoredProfiles();
  const profile = profiles.find(p => p.id === profileId);
  return profile ? profile.progress : null;
};

export const updateDeckProgress = async (
  profileId: number,
  deckId: string,
  updates: Partial<Deck>
): Promise<void> => {
  const profiles = await getStoredProfiles();
  const index = profiles.findIndex(p => p.id === profileId);
  if (index === -1) return;

  const profile = profiles[index];
  const existing = profile.progress[deckId] || { viewedCardIds: [], viewedCount: 0, totalCount: 0 };
  const updatedProgress = {
    ...existing,
    ...updates,
    lastOpenedAt: new Date().toISOString(),
  };

  if (updatedProgress.viewedCount >= updatedProgress.totalCount && !updatedProgress.completedAt) {
    updatedProgress.completedAt = new Date().toISOString();
  }

  profile.progress[deckId] = updatedProgress;

  profiles[index] = { ...profile, lastActiveAt: new Date().toISOString()};

  await saveProfiles(profiles);
};

export const clearAllProfiles = async (): Promise<void> => {
  await AsyncStorage.removeItem(STORAGE_KEY);
};

// TODO: Implement logic to get the current active profile
// should return the profile id of the profile that has the most recent lastActiveAt timestamp
export const getCurrentProfile = async (): Promise<number | null> => {
  const profiles = await getStoredProfiles();
  if (profiles.length === 0) return null;
  let mostRecent = profiles[0]
  let mostRecentIndex = 0
  for (let i =0; i< profiles.length; i++){
    if (profiles[i].lastActiveAt > profiles[mostRecentIndex].lastActiveAt) {
      mostRecentIndex = i
      mostRecent = profiles[i]
    }
  }
  return profiles[mostRecentIndex].id;
};

export const getCategorizedDecks = async (
  profileId: number,
  allDecks: Deck[]
): Promise<{
  recent: Deck[];
  upNext: Deck[];
  completed: Deck[];
} | null> => {
  const profiles = await getStoredProfiles();
  const profile = profiles.find(p => p.id === profileId);
  if (!profile) return null;

  const recent: Deck[] = [];
  const upNext: Deck[] = [];
  const completed: Deck[] = [];

  for (const deck of allDecks) {
  const progress = profile.progress[deck.id];

  if (!progress) {
    upNext.push(deck);
    continue;
  }

  if (progress.viewedCount >= progress.totalCount) {
    completed.push(deck);
  } else if (progress.viewedCount > 0) {
    recent.push({ ...deck, lastOpenedAt: progress.lastOpenedAt });
  } else {
    upNext.push(deck);
  }
}

  recent.sort((a, b) => {
    const aTime = a.lastOpenedAt ? new Date(a.lastOpenedAt).getTime() : 0;
    const bTime = b.lastOpenedAt ? new Date(b.lastOpenedAt).getTime() : 0;
    return bTime - aTime;
  });

  const deckProgress : DeckProgress = { recent, upNext, completed };
  return deckProgress;
};

export const seedTestProgressForProfile = async (
  profileId: number,
  allDecks: DeckData[]
): Promise<void> => {
  const profiles = await getStoredProfiles();
  const index = profiles.findIndex(p => p.id === profileId);
  if (index === -1) return;

  const profile = profiles[index];
  
  allDecks.forEach((deck, i) => {
    if (i === 0) {
      // First deck: completed
      profile.progress[deck.id] = {
        ...deck,
        viewedCardIds: deck.cards.map(c => c.id),
        viewedCount: deck.cards.length,
        totalCount: deck.cards.length,
        lastOpenedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        completedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
      };
    } else if (i === 1) {
      // Second deck: in progress (recent)
      profile.progress[deck.id] = {
        ...deck,
        viewedCardIds: deck.cards.slice(0, 2).map(c => c.id),
        viewedCount: 2,
        totalCount: deck.cards.length,
        lastOpenedAt: new Date(Date.now() - 3600000).toISOString(),
        completedAt: undefined,
      };
    } else if (i === 2) {
      // Third deck: also in progress (recent)
      profile.progress[deck.id] = {
        ...deck,
        viewedCardIds: deck.cards.slice(0, 1).map(c => c.id),
        viewedCount: 1,
        totalCount: deck.cards.length,
        lastOpenedAt: new Date(Date.now() - 7200000).toISOString(),
        completedAt: undefined,
      };
    }
    // Rest stay as upNext (no changes needed)
  });

  profiles[index] = profile;
  await saveProfiles(profiles);
};