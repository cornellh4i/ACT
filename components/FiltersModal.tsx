import { useState, useEffect } from 'react';
import { Modal, Pressable, Text, View, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import FilterIcon from '../assets/filter-icon.svg';
import BackIcon from '../assets/back-icon.svg';

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

let onModalVisibilityChange: ((visible: boolean) => void) | null = null;

export const visibilityCallback = (callback: (visible: boolean) => void) => {
  onModalVisibilityChange = callback;
};

const difficulties = ['All Difficulties', 'Easy (8 or older)', 'Medium (11 or older)', 'Hard (13 or older)'];

const FiltersModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulties, setSelectedDifficulties] = useState<string[]>([]);
  const [filterStep, setFilterStep] = useState<'topics' | 'difficulty'>('topics');
  const [showShadow, setShowShadow] = useState(false);

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    if (visible) {
      setTimeout(() => setShowShadow(true), 350);
    } else {
      setShowShadow(false);
      setFilterStep('topics');
    }
    onModalVisibilityChange?.(visible);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => {
      let newSelection: string[];
      if (id === 'all') {
        if (prev.includes('all')) {
          newSelection = [];
        } else {
          newSelection = topics.map(topic => topic.id);
        }
      } else {
        newSelection = prev.includes(id) 
          ? prev.filter((t) => t !== id) 
          : [...prev, id];
        newSelection = newSelection.filter(t => t !== 'all');
        const individualTopics = topics.filter(topic => topic.id !== 'all');
        if (individualTopics.every(topic => newSelection.includes(topic.id))) {
          newSelection = topics.map(topic => topic.id);
        }
      }
      
      return newSelection;
    });
  };

  const toggleDifficulty = (level: string) => {
    setSelectedDifficulties((prev) => {
      let newSelection: string[];
      if (level === 'All Difficulties') {
        if (prev.includes('All Difficulties')) {
          newSelection = [];
        } else {
          newSelection = difficulties;
        }
      } else {
        newSelection = prev.includes(level) 
          ? prev.filter((d) => d !== level) 
          : [...prev, level];
        newSelection = newSelection.filter(d => d !== 'All Difficulties');
        
        // If all individual difficulties are selected, automatically select "All Difficulties"
        const individualDifficulties = difficulties.filter(diff => diff !== 'All Difficulties');
        if (individualDifficulties.every(diff => newSelection.includes(diff))) {
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
        <Pressable
          className={`flex-1 justify-end ${showShadow ? 'bg-black/50' : ''}`}
          onPress={() => toggleModal(false)}>
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
                    const isChecked = selectedTopics.includes(topic.id);
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
                    const isSelected = selectedDifficulties.includes(level);
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

                {/* Footer with Back and Apply */}
                <View className="flex-row items-center justify-between gap-2 self-stretch py-8">
                  <Pressable
                    className="flex-row items-center gap-1"
                    onPress={() => setFilterStep('topics')}>
                    <View className="px-0.5 items-center justify-center">
                      <BackIcon width={8} height={14} />
                    </View>
                    <Text className="font-jost-bold text-base leading-5 text-black">Back</Text>
                  </Pressable>
                  <Pressable
                    className="items-center justify-center rounded-full bg-[#AEC4D0] px-4 py-2"
                    onPress={() => {
                      toggleModal(false);
                      console.log('Selected Topics:', selectedTopics);
                      console.log('Selected Difficulties:', selectedDifficulties);
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