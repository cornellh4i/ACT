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
      <Pressable
        className="rounded-lg px-4 py-2"
        onPress={() => setModalVisible(true)}>
        <Image
          source={require('../assets/filter-icon.png')}
          style={{ width: 24, height: 21, tintColor: 'gray' }}
        />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <Pressable
          className="flex-1 justify-end"
          style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}
          onPress={() => setModalVisible(false)}>
          <Pressable
            className="flex w-full flex-col items-center"
            style={{
              height: 619,
              paddingTop: 32,
              paddingBottom: 32,
              paddingHorizontal: 24,
              borderTopLeftRadius: 40,
              borderTopRightRadius: 40,
              backgroundColor: '#F0F0F2',
            }}
            onPress={(e) => e.stopPropagation()}>
            <Pressable
              style={{ paddingVertical: 8, width: '100%', alignItems: 'center' }}
              onPress={() => setModalVisible(false)}>
              <View
                style={{
                  width: 81,
                  height: 5,
                  backgroundColor: '#BBBBBB',
                  borderRadius: 2.5,
                }}
              />
            </Pressable>

            <View className="items-left flex self-stretch" style={{ paddingVertical: 16 }}>
              <Text
                style={{
                  fontSize: 32,
                  fontWeight: '700',
                  lineHeight: 40,
                  color: '#000000',
                }}>
                Topics
              </Text>
            </View>

            <View className="w-full flex-1" style={{ gap: 8 }}>
              {topics.map((topic) => {
                const isChecked = selectedTopics.includes(topic.id);
                return (
                  <Pressable
                    key={topic.id}
                    className="flex-row items-center justify-between self-stretch"
                    style={{
                      padding: 12,
                      paddingHorizontal: 20,
                      borderRadius: 40,
                      backgroundColor: isChecked ? '#5A5A66' : '#FAFAFB',
                    }}
                    onPress={() => toggleTopic(topic.id)}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '500',
                        color: isChecked ? '#FFFFFF' : '#000000',
                      }}>
                      {topic.label}
                    </Text>
                    <Text
                      style={{
                        fontSize: 24,
                        fontWeight: '300',
                        color: isChecked ? '#FFFFFF' : '#000000',
                      }}>
                      {isChecked ? '−' : '+'}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

            <View
              style={{
                paddingVertical: 32,
                paddingHorizontal: 0,
                flexDirection: 'column',
                alignItems: 'flex-end',
                alignSelf: 'stretch',
              }}>
              <Pressable
                style={{
                  height: 34,
                  paddingVertical: 8,
                  paddingHorizontal: 12,
                  justifyContent: 'center',
                  alignItems: 'center',
                  gap: 10,
                  borderRadius: 49,
                  backgroundColor: '#98B5C3',
                }}
                onPress={() => console.log(selectedTopics)}>
                <Text
                  style={{
                    color: '#000000',
                    fontFamily: 'Jost',
                    fontSize: 16,
                    fontWeight: '700',
                    lineHeight: 20,
                    letterSpacing: -0.176,
                  }}>
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
