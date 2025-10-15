import { useState, useEffect } from 'react';
import { Modal, Pressable, Text, View, ScrollView } from 'react-native';
import UserIcon from '../assets/user.svg';
import AddIcon from '../assets/Profile.svg';
import XOut from '../assets/xmark.svg';
import Dots from '../assest/ellipsis-vertical.svg';

type Children = {
  name: string;
};

let onModalVisibilityChange: ((visible: boolean) => void) | null = null;

export const visibilityCallback = (callback: (visible: boolean) => void) => {
  onModalVisibilityChange = callback;
};

const SwitchUserModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string[]>([]);
  const [newChild, setNewChild] = useState('');
  const [children, setChildren] = useState<Children[]>([
    { name: 'Child 1' },
    { name: 'Child 2' },
    { name: 'Child 3' },
  ]);

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleChild = (id: string) => {
    setSelectedChild((prev) => (prev.includes(id) ? prev.filter((t) => t !== id) : [...prev, id]));
  };

  return (
    <View className="items-center">
      <Pressable className="left-[-8px] h-8 w-8 items-center justify-center rounded-2xl bg-[#D5D6D8] px-4 py-2 " onPress={() => toggleModal(true)}>
          <UserIcon width={15} height={12} fill="#000" />
      </Pressable>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => toggleModal(false)}>
        <Pressable className="flex-1 justify-end" onPress={() => toggleModal(false)}>
          <Pressable
            className="flex max-h-[75%] w-full flex-col items-center rounded-t-[40px] bg-[#F0F0F2] px-6 pb-8 pt-8"
            onPress={(e) => e.stopPropagation()}>
            <View className="w-full items-center py-2">
              <View className="h-[5px] w-[81px] rounded-[2.5px] bg-[#BBBBBB]" />
            </View>

            <View className="flex-row justify-between items-center self-stretch py-4">
              <Text className="text-[32px] font-bold leading-[40px] text-black">Switch User</Text>
              <Pressable>
                <XOut width={24} height={24} fill="#000" onPress={() => toggleModal(false)} />
              </Pressable>
            </View>

            <ScrollView className="w-full flex-grow gap-4">
              {children.map((child) => {
                const isChecked = selectedChild.includes(child.name);
                return (
                  <Pressable
                    key={child.name}
                    className={`flex-row items-center justify-between self-stretch rounded-full px-5 py-3 bg-[#FAFAFB]`}
                    onPress={() => toggleChild(child.name)}>
                    <Text
                      className={`text-xl font-medium`}>
                      {child.name}
                    </Text>
                    <Text
                      className={`text-2xl font-medium`}>
                      {isChecked ? '✓' : ''}
                    </Text>
                    <Pressable onPress={() => console.log("Pressed")}/>
                  </Pressable>
                );
              })}
            </ScrollView>

            {/* Change to add child button */}
            <Pressable
              className="mt-4 flex-row items-center self-stretch rounded-full bg-[#FAFAFB] px-5 py-3"
              onPress={() => console.log('Add Child Pressed')}>
              <AddIcon width={32} height={32} fill="#000" />
              <Text className="ml-4 text-base font-bold text-black">Add Child</Text>
            </Pressable>

            {/* <View className="flex-col items-end self-stretch py-8">
              <Pressable
                className="items-center justify-center rounded-full bg-[#98B5C3] px-4 py-2"
                onPress={() => console.log(selectedChild)}>
                <Text className="text-base font-bold leading-5 text-black">Set Topics</Text>
              </Pressable>
            </View> */}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SwitchUserModal;