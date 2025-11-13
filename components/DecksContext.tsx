import React, { createContext, useContext, useState, useMemo, ReactNode } from 'react';
import { getAllDecks, getFilteredDecks } from '../services/dataService';

interface DecksContextType {
  selectedTopics: string[];
  selectedDifficulties: string[];
  filteredDecks: any[];
  
  topics: string[];
  difficulties: string[];
  
  setSelections: (selections: { topics?: string[]; difficulty?: string[] }) => void;
  toggleTopic: (topic: string) => void;
  setDifficulty: (difficulty: string) => void;
  clearFilters: () => void;
  
  setSelectedTopics: (topics: string[]) => void;
  setSelectedDifficulties: (difficulties: string[]) => void;
}

const DecksContext = createContext<DecksContextType | undefined>(undefined);

interface DecksProviderProps {
  children: ReactNode;
}

export const DecksProvider: React.FC<DecksProviderProps> = ({ children }) => {
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);

  const allDecks = useMemo(() => getAllDecks(), []);

  const topics = useMemo(() => {
    const categories = allDecks.map((deck) => deck.category);
    return Array.from(new Set(categories));
  }, [allDecks]);

  const difficulties = useMemo(() => {
    const difficultyLevels = allDecks.map((deck) => deck.difficulty);
    return Array.from(new Set(difficultyLevels));
  }, [allDecks]);

  const filteredDecks = useMemo(() => {
    return getFilteredDecks(selectedTopics, selectedDifficulties);
  }, [selectedTopics, selectedDifficulties]);

  const setSelections = (selections: { topics?: string[]; difficulty?: string[] }) => {
    if (selections.topics !== undefined) {
      setSelectedTopics(selections.topics);
    }
    if (selections.difficulty !== undefined) {
      setSelectedDifficulties(selections.difficulty);
    }
  };

  const toggleTopic = (topic: string) => {
    setSelectedTopics((prev) => {
      if (prev.includes(topic)) {
        return prev.filter((t) => t !== topic);
      } else {
        return [...prev, topic];
      }
    });
  };

  const setDifficulty = (difficulty: string) => {
    setSelectedDifficulties((prev) => {
      if (prev.includes(difficulty)) {
        return prev.filter((d) => d !== difficulty);
      } else {
        return [...prev, difficulty];
      }
    });
  };

  const clearFilters = () => {
    setSelectedTopics([]);
    setSelectedDifficulties([]);
  };

  const value: DecksContextType = {
    selectedTopics,
    selectedDifficulties,
    filteredDecks,
    topics,
    difficulties,
    setSelections,
    toggleTopic,
    setDifficulty,
    clearFilters,
    setSelectedTopics,
    setSelectedDifficulties,
  };

  return <DecksContext.Provider value={value}>{children}</DecksContext.Provider>;
};

export const useDecks = (): DecksContextType => {
  const context = useContext(DecksContext);
  if (context === undefined) {
    throw new Error('useDecks must be used within a DecksProvider');
  }
  return context;
};
