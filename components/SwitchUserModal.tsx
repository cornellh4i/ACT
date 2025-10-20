import { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, View } from 'react-native';
import CheckMark from '../assets/check.svg';
import Dots from '../assets/ellipsis-vertical.svg';
import Pen from '../assets/pen.svg';
import AddIcon from '../assets/Profile.svg';
import TrashCan from '../assets/trash-can.svg';
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
    { name: 'Child 4' },
  ]);
  const [activeChildMenu, setActiveChildMenu] = useState<string | null>(null);

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleChild = (name: string) => {
    setSelectedChild((prev) => (prev === name ? name : name));
  };

  const toggleChildMenu = (name: string) => {
    setActiveChildMenu(activeChildMenu == name ? null : name);
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
        <Pressable
          className="flex-1 justify-end z-0"
          onPress={() => {
            setActiveChildMenu(null);
            toggleModal(false);
          }}>
          <Pressable
            className="z-10 flex max-h-[75%] w-full flex-col items-center rounded-t-[40px] bg-[#F0F0F2] px-6 pb-8 pt-8"
            onPress={(e) => {
              e.stopPropagation();
              setActiveChildMenu(null);
            }}>
            {/* Modal Heading */}
            <View className="relative w-full items-center justify-center py-3">
              <Text className="font-goldplay-semibold text-2xl leading-normal text-black">
                Switch User
              </Text>
              <Pressable
                className="absolute right-0 h-8 w-8 items-center justify-center"
                onPress={() => {
                  setActiveChildMenu(null);
                  toggleModal(false);
                }}>
                <XOut width={24} height={24} fill="#000" />
              </Pressable>
            </View>

            {/* Children List */}
            <ScrollView className="w-full gap-3 pb-3 pt-1">
              {children.map((child) => {
                const isChecked = selectedChild === child.name;
                return (
                  <View
                    className="mt-[8px] flex flex-row items-center justify-between gap-3"
                    key={child.name}>
                    <Pressable
                      key={child.name}
                      className={`w-[90%] flex-row items-center self-stretch rounded-full px-5 py-3`}
                      onPress={() => toggleChild(child.name)}>
                      <View className="left-[-8px] h-8 w-8 items-center justify-center rounded-2xl bg-[#D5D6D8] px-4 py-2">
                        <UserIcon width={15} height={12} fill="#000" />
                      </View>
                      <Text className={`ml-[8px] text-xl font-bold`}>{child.name}</Text>
                      <Text className={`absolute right-0 text-xl font-medium`}>
                        {isChecked ? <CheckMark width={20} height={20} fill="#000" /> : ''}
                      </Text>
                    </Pressable>

                    <Pressable onPress={() => toggleChildMenu(child.name)}>
                      <Dots width={24} height={24} fill="#000" />
                    </Pressable>

                    {/* Overflow menu */}
                    {activeChildMenu === child.name && (
                      <View className={`absolute z-50 self-stretch rounded-lg bg-white shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] shadow-[0px_16px_16px_-8px_rgba(12,12,13,0.10)] outline-1 outline-offset-[-1px] outline-zinc-100 gap-1.5 px-[15px] py-[10px] right-6 -top-3.5`}>
                        <Pressable
                          className="items-center justify-between self-stretch"
                          onPress={() => console.log('Rename', child.name)}>
                          <View className="self-stretch flex-row justify-between items-center">
                            <Text className="w-32 h-6 justify-center text-base font-bold leading-tight text-black">
                              Rename
                            </Text>
                            <View className="h-4 w-4 items-center justify-center overflow-hidden">
                              <Pen width={16} height={16} fill="#000" />
                            </View>
                          </View>
                        </Pressable>

                        <View className="h-0 w-full self-stretch border-t border-zinc-300/75" />

                        <Pressable
                          className="items-center justify-between self-stretch"
                          onPress={() => console.log('Delete', child.name)}>
                          <View className="self-stretch flex-row justify-between items-center">
                            <Text className="w-32 h-6 justify-center text-red-500 text-base font-bold leading-tight">
                              Delete
                            </Text>
                            <View className="h-4 w-3.5 items-center justify-center overflow-hidden">
                              <TrashCan width={14} height={16} fill="#EF4444" />
                            </View>
                          </View>
                        </Pressable>
                      </View>
                    )}

                  </View>
                );
              })}
            </ScrollView>

            {/* Add child button */}
            <Pressable
              className="mb-[12px] mt-[12px] inline-flex flex-row items-center justify-start gap-3 self-stretch p-2"
              onPress={() => console.log('Add Child Pressed')}>
              <View className="bg-Icon-Default-Default left-[3px] top-[-9px] h-3 w-3">
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
