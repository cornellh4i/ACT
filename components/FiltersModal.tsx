import { useState, useEffect } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useDecks } from './DecksContext';
import BackIcon from '../assets/back-icon.svg';
import FilterIcon from '../assets/filter-icon.svg';

type Topic = {
  id: string;
  label: string;
};

const topics: Topic[] = [
  { id: 'all', label: 'All Topics' },
  { id: 'inappropriate', label: 'Inappropriate Content' },
  { id: 'online', label: 'Online Interactions' },
  { id: 'screen', label: 'Screen Time' },
  { id: 'mental', label: 'Social Media and Mental Health' },
  { id: 'privacy', label: 'Platforms and Privacy' },
];

// Map topic IDs to category names from JSON
const topicIdToCategory: { [key: string]: string } = {
  'inappropriate': 'Inappropriate Content',
  'online': 'Online Interactions',
  'screen': 'Screentime',
  'mental': 'Social Media and Mental Health',
  'privacy': 'Platforms and Privacy',
};

// Map category names to topic IDs
const categoryToTopicId: { [key: string]: string } = {
  'Inappropriate Content': 'inappropriate',
  'Online Interactions': 'online',
  'Screentime': 'screen',
  'Social Media and Mental Health': 'mental',
  'Platforms and Privacy': 'privacy',
};

let onModalVisibilityChange: ((visible: boolean) => void) | null = null;

export const visibilityCallback = (callback: (visible: boolean) => void) => {
  onModalVisibilityChange = callback;
};

const difficulties = [
  'All Difficulties',
  'Easy (8 or older)',
  'Medium (11 or older)',
  'Hard (13 or older)',
];

const FiltersModal = () => {
  const { topics: contextTopics, difficulties: contextDifficulties, selectedTopics: contextSelectedTopics, selectedDifficulties: contextSelectedDifficulties, setSelections } = useDecks();
  
  const [modalVisible, setModalVisible] = useState(false);
  const [pendingTopics, setPendingTopics] = useState<string[]>([]);
  const [pendingDifficulties, setPendingDifficulties] = useState<string[]>([]);
  const [filterStep, setFilterStep] = useState<'topics' | 'difficulty'>('topics');

  // Initialize pending state from context when modal opens
  useEffect(() => {
    if (modalVisible) {
      // Convert context categories to topic IDs
      const topicIds = contextSelectedTopics
        .map(category => categoryToTopicId[category])
        .filter((id): id is string => id !== undefined);
      setPendingTopics(topicIds);
      
      // Map context difficulties to modal format
      const difficultyLabels = contextSelectedDifficulties.map(diff => {
        if (diff === 'Easy') return 'Easy (8 or older)';
        if (diff === 'Medium') return 'Medium (11 or older)';
        if (diff === 'Hard') return 'Hard (13 or older)';
        return diff;
      });
      setPendingDifficulties(difficultyLabels);
    }
  }, [modalVisible, contextSelectedTopics, contextSelectedDifficulties]);

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    if (!visible) {
      setFilterStep('topics');
    }
    onModalVisibilityChange?.(visible);
  };

  const toggleTopic = (id: string) => {
    setPendingTopics((prev) => {
      let newSelection: string[];
      if (id === 'all') {
        if (prev.includes('all')) {
          newSelection = [];
        } else {
          newSelection = topics.map((topic) => topic.id);
        }
      } else {
        newSelection = prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id];
        newSelection = newSelection.filter((t) => t !== 'all');
        const individualTopics = topics.filter((topic) => topic.id !== 'all');
        if (individualTopics.every((topic) => newSelection.includes(topic.id))) {
          newSelection = topics.map((topic) => topic.id);
        }
      }

      return newSelection;
    });
  };

  const toggleDifficulty = (level: string) => {
    setPendingDifficulties((prev) => {
      let newSelection: string[];
      if (level === 'All Difficulties') {
        if (prev.includes('All Difficulties')) {
          newSelection = [];
        } else {
          newSelection = difficulties;
        }
      } else {
        newSelection = prev.includes(level) ? prev.filter((d) => d !== level) : [...prev, level];
        newSelection = newSelection.filter((d) => d !== 'All Difficulties');

        const individualDifficulties = difficulties.filter((diff) => diff !== 'All Difficulties');
        if (individualDifficulties.every((diff) => newSelection.includes(diff))) {
          newSelection = difficulties;
        }
      }

      return newSelection;
    });
  };

  return (
    <View className="items-center">
      <Pressable
        className="overflow-hidden rounded-lg bg-[#F0F0F2] p-2"
        android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
        onPress={() => toggleModal(true)}>
        <View className="rounded-md bg-[#F0F0F2] p-1">
          <FilterIcon
            width={24}
            height={21}
            fill="#000"
            style={{ backgroundColor: 'transparent' }}
          />
        </View>
      </Pressable>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal(false)}>
        <Pressable className="flex-1 justify-end" onPress={() => toggleModal(false)}>
          <Pressable
            className="flex h-[75%] w-full flex-col items-center rounded-t-[40px] bg-white px-6 pb-8 pt-8"
            onPress={(e) => e.stopPropagation()}>
            {/* Top bar */}
            <View className="w-full items-center py-2">
              <View className="h-[5px] w-[81px] rounded-[2.5px] bg-[#BBBBBB]" />
            </View>
            {filterStep === 'topics' ? (
              <>
                <View className="flex self-stretch py-4">
                  <Text className="font-jost-bold text-[32px] leading-[40px] text-black">
                    Topics
                  </Text>
                </View>

                <View className="w-full flex-1 gap-4">
                  {topics.map((topic) => {
                    const isChecked = pendingTopics.includes(topic.id);
                    return (
                      <Pressable
                        key={topic.id}
                        className={`flex-row items-center justify-between self-stretch rounded-full px-5 py-3 ${
                          isChecked ? 'bg-[#5A5A66]' : 'bg-[#FAFAFB]'
                        }`}
                        onPress={() => toggleTopic(topic.id)}>
                        <Text
                          className={`font-jost-medium text-xl ${isChecked ? 'text-white' : 'text-black'}`}>
                          {topic.label}
                        </Text>
                        <Text
                          className={`font-jost-medium text-2xl ${isChecked ? 'text-white' : 'text-black'}`}>
                          {isChecked ? '−' : '+'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View className="flex-col items-end self-stretch py-8">
                  <Pressable
                    className="items-center justify-center rounded-full bg-[#98B5C3] px-4 py-2"
                    onPress={() => setFilterStep('difficulty')}>
                    <Text className="font-jost-bold text-base leading-5 text-black">
                      Set Topics
                    </Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View className="flex w-full self-stretch py-4">
                  <Text className="font-jost-bold text-[32px] leading-[40px] text-black">
                    Difficulty
                  </Text>
                </View>

                <View className="w-full flex-1 gap-4">
                  {difficulties.map((level) => {
                    const isSelected = pendingDifficulties.includes(level);
                    return (
                      <Pressable
                        key={level}
                        className={`flex-row items-center justify-between self-stretch rounded-full px-5 py-3 ${
                          isSelected ? 'bg-[#5A5A66]' : 'bg-[#FAFAFB]'
                        }`}
                        onPress={() => toggleDifficulty(level)}>
                        <Text
                          className={`font-jost-medium text-xl capitalize ${isSelected ? 'text-white' : 'text-black'}`}>
                          {level}
                        </Text>
                        <Text
                          className={`font-jost-medium text-2xl ${isSelected ? 'text-white' : 'text-black'}`}>
                          {isSelected ? '−' : '+'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>

                <View className="flex-row items-center justify-between gap-2 self-stretch py-8">
                  <Pressable
                    className="flex-row items-center gap-1"
                    onPress={() => setFilterStep('topics')}>
                    <View className="items-center justify-center px-0.5">
                      <BackIcon width={8} height={14} />
                    </View>
                    <Text className="font-jost-bold text-base leading-5 text-black">Back</Text>
                  </Pressable>
                  <Pressable
                    className="items-center justify-center rounded-full bg-[#AEC4D0] px-4 py-2"
                    onPress={() => {
                      // Convert pending topics to categories
                      const categories = pendingTopics
                        .filter(id => id !== 'all')
                        .map(id => topicIdToCategory[id])
                        .filter((cat): cat is string => cat !== undefined);
                      
                      // Convert pending difficulties to context format
                      const contextDifficulties = pendingDifficulties
                        .filter(diff => diff !== 'All Difficulties')
                        .map(diff => {
                          if (diff.includes('Easy')) return 'Easy';
                          if (diff.includes('Medium')) return 'Medium';
                          if (diff.includes('Hard')) return 'Hard';
                          return diff;
                        });
                      
                      // Commit selections to context
                      setSelections({
                        topics: categories,
                        difficulty: contextDifficulties,
                      });
                      
                      toggleModal(false);
                    }}>
                    <Text className="font-jost-bold text-base leading-5 text-black">
                      Set Difficulty
                    </Text>
                  </Pressable>
                </View>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default FiltersModal;


