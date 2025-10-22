import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
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

let onModalVisibilityChange: ((visible: boolean) => void) | null = null;

export const visibilityCallback = (callback: (visible: boolean) => void) => {
  onModalVisibilityChange = callback;
};

const FiltersModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(null);
  const [filterStep, setFilterStep] = useState<'topics' | 'difficulty'>('topics');

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    if (!visible) {
      setFilterStep('topics'); // reset to first screen when closing
    }
    onModalVisibilityChange?.(visible);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) =>
      prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]
    );
  };

  return (
    <View className="items-center">
      {/* Filter icon button */}
      <Pressable
        className="rounded-lg p-2 bg-[#F0F0F2] overflow-hidden"
        android_ripple={{ color: 'rgba(0,0,0,0.06)' }}
        onPress={() => toggleModal(true)}>
        <View className="rounded-md bg-[#F0F0F2] p-1">
          <FilterIcon width={24} height={21} fill="#000" style={{ backgroundColor: 'transparent' }} />
        </View>
      </Pressable>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal(false)}>
        <Pressable
          className="flex-1 justify-end bg-black/50"
          onPress={() => toggleModal(false)}>
          <Pressable
            className="flex h-[619px] w-full flex-col items-center rounded-t-[40px] bg-white px-6 pb-8 pt-8"
            onPress={(e) => e.stopPropagation()}>

            {/* Top bar */}
            <View className="w-full items-center py-2">
              <View className="h-[5px] w-[81px] rounded-[2.5px] bg-[#BBBBBB]" />
            </View>

            {/* Conditional rendering based on filterStep */}
            {filterStep === 'topics' ? (
              <>
                <View className="flex self-stretch py-4">
                  <Text className="text-[32px] font-jost-bold leading-[40px] text-black">Topics</Text>
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
                        <Text className={`text-xl font-jost-medium ${isChecked ? 'text-white' : 'text-black'}`}>
                          {topic.label}
                        </Text>
                        <Text className={`text-2xl font-jost-medium ${isChecked ? 'text-white' : 'text-black'}`}>
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
                    <Text className="text-base font-jost-bold leading-5 text-black">Set Topics</Text>
                  </Pressable>
                </View>
              </>
            ) : (
              <>
                <View className="flex self-stretch py-4 w-full">
                  <Text className="text-[32px] font-jost-bold leading-[40px] text-black">Difficulty</Text>
                </View>

                <View className="w-full flex-1 gap-4">
                  {['All Difficulties', 'Easy (8 or older)', 'Medium (11 or older)', 'Hard (13 or older)'].map((level) => {
                    const isSelected = selectedDifficulty === level;
                    return (
                      <Pressable
                        key={level}
                        className={`flex-row items-center justify-between self-stretch rounded-full px-5 py-3 ${
                          isSelected ? 'bg-[#5A5A66]' : 'bg-[#FAFAFB]'
                        }`}
                        onPress={() =>
                          setSelectedDifficulty((prev) => (prev === level ? null : level))
                        }>
                        <Text className={`capitalize text-xl font-jost-medium ${isSelected ? 'text-white' : 'text-black'}`}>
                          {level}
                        </Text>
                        <Text className={`text-2xl font-jost-medium ${isSelected ? 'text-white' : 'text-black'}`}>
                          {isSelected ? '−' : '+'}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>


                {/* Footer with Back and Apply */}
                <View className="flex-row justify-between items-center self-stretch py-8 gap-2">
                  <Pressable
                    className="flex-1 items-center justify-center rounded-full bg-[#D9D9D9] px-4 py-2"
                    onPress={() => setFilterStep('topics')}>
                    <Text className="text-base font-jost-bold leading-5 text-black">Back</Text>
                  </Pressable>
                  <Pressable
                    className="flex-1 items-center justify-center rounded-full bg-[#98B5C3] px-4 py-2"
                    onPress={() => {
                      toggleModal(false);
                      console.log('Selected Topics:', selectedTopics);
                      console.log('Selected Difficulty:', selectedDifficulty);
                      // Add filtering logic here
                    }}>
                    <Text className="text-base font-jost-bold leading-5 text-black">Set Difficulty</Text>
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


