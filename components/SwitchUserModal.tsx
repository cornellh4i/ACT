import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import CheckMark from '../assets/check.svg';
import Dots from '../assets/ellipsis-vertical.svg';
import AddIcon from '../assets/Profile.svg';
import UserIcon from '../assets/user.svg';
import XOut from '../assets/xmark.svg';

type Children = {
  name: string;
};

let onModalVisibilityChange: ((visible: boolean) => void) | null = null;

export const visibilityCallback = (callback: (visible: boolean) => void) => {
  onModalVisibilityChange = callback;
};

const SwitchUserModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState<string>();
  const [children, setChildren] = useState<Children[]>([
    { name: 'Child 1' },
    { name: 'Child 2' },
    { name: 'Child 3' },
  ]);

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleChild = (name: string) => {
    setSelectedChild((prev) => (prev === name ? name : name));
  };

  return (
    <View className="items-center">
      <Pressable
        className="left-[-8px] h-8 w-8 items-center justify-center rounded-2xl bg-[#D5D6D8] px-4 py-2 "
        onPress={() => toggleModal(true)}>
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

            {/* Modal Heading */}
            <View className="relative w-full items-center justify-center py-3">
              <Text className="text-2xl font-semibold leading-normal text-black">Switch User</Text>
              <Pressable
                className="absolute right-0 h-8 w-8 items-center justify-center"
                onPress={() => toggleModal(false)}>
                <XOut width={24} height={24} fill="#000" onPress={() => toggleModal(false)} />
              </Pressable>
            </View>

            {/* Children List */}
            <ScrollView className="w-full gap-3">
              {children.map((child) => {
                const isChecked = selectedChild === child.name;
                return (
                  <View
                    className="flex flex-row items-center justify-between gap-3 mt-[8px]"
                    key={child.name}>
                    <Pressable
                      key={child.name}
                      className={`w-[90%] flex-row items-center self-stretch rounded-full px-5 py-3`}
                      onPress={() => toggleChild(child.name)}>
                      <View className='left-[-8px] h-8 w-8 items-center justify-center rounded-2xl bg-[#D5D6D8] px-4 py-2'>
                        <UserIcon width={15} height={12} fill="#000" />
                      </View>
                      <Text className={`ml-[8px] text-xl font-bold`}>
                        {child.name}
                      </Text>
                      <Text className={`absolute right-0 text-xl font-medium`}>
                        {isChecked ? <CheckMark width={20} height={20} fill="#000" /> : ''}
                      </Text>
                    </Pressable>

                    <Pressable onPress={() => console.log('Pressed')}>
                      <Dots width={24} height={24} fill="#000" />
                    </Pressable>
                  </View>
                );
              })}
            </ScrollView>

            {/* Add child button */}
            <Pressable
              className="self-stretch p-2 inline-flex justify-start items-center gap-3 flex-row mt-[12px] mb-[12px]"
              onPress={() => console.log('Add Child Pressed')}>
              <View className='w-3 h-3 top-[-9px] left-[3px] bg-Icon-Default-Default'>
              <AddIcon width={28} height={28} fill="#000" />
              </View>
              <Text className="ml-[26px] text-xl font-bold">Add Child</Text>
            </Pressable>
            
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SwitchUserModal;