import { useState } from 'react';
import { Image, Modal, Pressable, Text, View } from 'react-native';

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

const FiltersModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const toggleTopic = (id: string) => {
    setSelectedTopics((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  return (
    <View className="items-center">
      <Pressable className="rounded-lg px-4 py-2" onPress={() => setModalVisible(true)}>
        <Image
          source={require('../assets/filter-icon.png')}
          className="tint-gray-500 h-[21px] w-6"
        />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          className="flex-1 justify-end bg-[rgba(0,0,0,0.3)]"
          onPress={() => setModalVisible(false)}>
          <Pressable
            className="flex h-[619px] w-full flex-col items-center rounded-t-[40px] bg-[#F0F0F2] px-6 pb-8 pt-8"
            onPress={(e) => e.stopPropagation()}>
            <Pressable className="w-full items-center py-2" onPress={() => setModalVisible(false)}>
              <View className="h-[5px] w-[81px] rounded-[2.5px] bg-[#BBBBBB]" />
            </Pressable>

            <View className="self-stretch py-4">
              <Text className="text-[32px] font-bold leading-10 text-black">Topics</Text>
            </View>

            <View className="w-full flex-1 space-y-2">
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
                      className={`text-base font-medium ${
                        isChecked ? 'text-white' : 'text-black'
                      }`}>
                      {topic.label}
                    </Text>
                    <Text
                      className={`text-2xl font-light ${isChecked ? 'text-white' : 'text-black'}`}>
                      {isChecked ? '−' : '+'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View className="flex-col items-end self-stretch py-8">
              <Pressable
                className="h-[34px] items-center justify-center rounded-full bg-[#98B5C3] px-3 py-2"
                onPress={() => console.log(selectedTopics)}>
                <Text className="text-base font-bold leading-5 tracking-[-0.176px] text-black">
                  Set Topics
                </Text>
              </Pressable>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default FiltersModal;