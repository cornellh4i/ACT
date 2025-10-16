import { useState } from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
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

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
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
            <View className="w-full items-center py-2">
              <View className="h-[5px] w-[81px] rounded-[2.5px] bg-[#BBBBBB]" />
            </View>

            <View className="flex self-stretch py-4">
              <Text className="font-jost-bold text-[32px] leading-[40px] text-black">Topics</Text>
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
                onPress={() => console.log(selectedTopics)}>
                <Text className="font-jost-bold text-base leading-5 text-black">Set Topics</Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default FiltersModal;
