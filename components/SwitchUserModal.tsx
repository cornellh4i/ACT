import { useState } from 'react';
import { Keyboard, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import CheckMark from '../assets/check.svg';
import Dots from '../assets/ellipsis-vertical.svg';
import Pen from '../assets/pen.svg';
import AddIcon from '../assets/Profile.svg';
import TrashCan from '../assets/trash-can.svg';
import UserIcon from '../assets/user.svg';
import XOut from '../assets/xmark.svg';

export type Children = {
  id: number;
  name: string;
  avatar?: string;
  createdAt: string;
  lastActiveAt: string;
  progress: Progress
};

export type Progress = {
    [deckID: string]: {
      viewCardIds: number[];
      viewedCount: number;
      totalCount: number;
      completedAt?: string;
  }
}

let onModalVisibilityChange: ((visible: boolean) => void) | null = null;

export const visibilityCallback = (callback: (visible: boolean) => void) => {
  onModalVisibilityChange = callback;
};

const SwitchUserModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [renameModalVisible, setRenameModalVisible] = useState(false);
  const [selectedChild, setSelectedChild] = useState<number>();
  const [renameText, setRenameText] = useState('');
  const [isShrunk, setIsShrunk] = useState(false);
  const [children, setChildren] = useState<Children[]>([
    {
      id: 1,
      name: "Ava Johnson",
      avatar: "https://randomuser.me/api/portraits/lego/3.jpg",
      createdAt: "2025-09-30T08:00:00Z",
      lastActiveAt: "2025-10-25T12:30:00Z",
      progress: {
        "math-basics": {
          viewCardIds: [1, 2, 3, 5],
          viewedCount: 4,
          totalCount: 10,
        },
        "animal-facts": {
          viewCardIds: [1, 2, 3, 4, 5, 6, 7],
          viewedCount: 7,
          totalCount: 10,
          completedAt: "2025-10-20T09:00:00Z",
        },
      },
    },
  ]);
  const [activeChildMenu, setActiveChildMenu] = useState<number | null>(null);
  const selectedChildData = children.find((c) => c.id === selectedChild);

  const toggleModal = (visible: boolean) => {
    setModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleDeleteModal = (visible: boolean) => {
    setDeleteModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleRenameModal = (visible: boolean) => {
    setRenameModalVisible(visible);
    onModalVisibilityChange?.(visible);
  };

  const toggleChild = (id: number) => {
    setSelectedChild((prev) => (prev === id ? id : id));
  };

  const toggleChildMenu = (id: number) => {
    setActiveChildMenu(activeChildMenu == id ? null : id);
  };

  const updateChildName = (id: number, newName: string) => {
    setChildren((prevChildren) =>
      prevChildren.map((child) => (child.id === id ? { ...child, name: newName } : child)),
    );
  };

  const deleteChildName = (id: number) => {
    setChildren(children.filter((child) => child.id !== id));
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
          className="z-0 flex-1 justify-end"
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
                const isChecked = selectedChild === child.id;
                return (
                  <View
                    className="mt-[8px] flex flex-row items-center justify-between gap-3"
                    key={child.id}>
                    <Pressable
                      key={child.id}
                      className={`w-[90%] flex-row items-center self-stretch rounded-full px-5 py-3`}
                      onPress={() => toggleChild(child.id)}>
                      <View className="left-[-8px] h-8 w-8 items-center justify-center rounded-2xl bg-[#D5D6D8] px-4 py-2">
                        <UserIcon width={15} height={12} fill="#000" />
                      </View>
                      <Text className={`ml-[8px] text-xl font-bold`}>{child.name}</Text>
                      <Text className={`absolute right-0 text-xl font-medium`}>
                        {isChecked ? <CheckMark width={20} height={20} fill="#000" /> : ''}
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => {
                        toggleChildMenu(child.id);
                      }}>
                      <Dots width={24} height={24} fill="#000" />
                    </Pressable>

                    {/* Overflow menu */}
                    {activeChildMenu === child.id && (
                      <View
                        className={`absolute -top-3.5 right-6 z-50 gap-1.5 self-stretch rounded-lg bg-white px-[15px] py-[10px] shadow-[0px_16px_16px_-8px_rgba(12,12,13,0.10)] shadow-[0px_4px_4px_-4px_rgba(12,12,13,0.05)] outline-1 outline-offset-[-1px] outline-zinc-100`}>
                        <Pressable
                          className="items-center justify-between self-stretch"
                          onPress={() => {
                            const selected = children.find((c) => c.id === child.id);
                            setSelectedChild(child.id);
                            setRenameText('');
                            toggleRenameModal(true);
                            setActiveChildMenu(null);
                            setModalVisible(false);
                          }}>
                          <View className="flex-row items-center justify-between self-stretch">
                            <Text className="h-6 w-32 justify-center text-base font-bold leading-tight text-black">
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
                          onPress={() => {
                            toggleDeleteModal(true);
                            setActiveChildMenu(null);
                            setModalVisible(false);
                            setSelectedChild(child.id);
                          }}>
                          <View className="flex-row items-center justify-between self-stretch">
                            <Text className="h-6 w-32 justify-center text-base font-bold leading-tight text-red-500">
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

      {/* Delete Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={deleteModalVisible}
        onRequestClose={() => toggleDeleteModal(false)}>
        <View className="flex-1 justify-end ">
          <View className="mt-6 h-[270px] w-full items-center rounded-t-[20px] bg-[#F0F0F2] px-[10%] py-4 pb-3 pt-8">
            <View className="w-full items-center justify-center py-3 pt-8">
              <Text className="bottom-[27px] w-full justify-center font-['Goldplay_Alt'] text-xl font-semibold leading-normal text-black">
                Are you sure you want to remove {selectedChildData?.name || 'this child'}?
              </Text>
            </View>
            <View className="bottom-[25px] mt-4 w-full items-center gap-2.5 py-3">
              <Pressable
                onPress={() => {
                  toggleDeleteModal(false);
                  toggleModal(true);
                }}
                className="h-15 inline-flex w-full items-center justify-center rounded-lg bg-slate-700 py-3">
                <Text className="justify-center text-base font-bold text-white">Cancel</Text>
              </Pressable>
              <Pressable
                className="h-15 inline-flex w-full items-center justify-center rounded-lg bg-gray-300 py-3"
                onPress={() => {
                  deleteChildName(selectedChildData?.id || 0);
                  toggleDeleteModal(false);
                  toggleModal(true);
                }}>
                <Text className="justify-center text-base font-bold text-black">Remove</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* Rename Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={renameModalVisible}
        onRequestClose={() => toggleRenameModal(false)}>
        <Pressable
          className="z-0 flex-1 justify-end"
          onPress={() => {
            toggleRenameModal(false);
            toggleModal(true);
          }}>
          <Pressable
            className={`z-10 ${isShrunk ? 'h-[20%]' : 'h-[55%]'} w-full rounded-t-[20px] bg-[#F0F0F2] px-6 py-4`}
            onPress={(e) => e.stopPropagation()}>
            {/* Header */}
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-2xl font-bold text-black">Rename user</Text>
              <Pressable
                onPress={() => {
                  if (selectedChild && renameText.trim() !== '') {
                    updateChildName(selectedChild, renameText.trim());
                  }
                  toggleRenameModal(false);
                  toggleModal(true);
                }}>
                <Text className="text-xl font-normal text-slate-700">Done</Text>
              </Pressable>
            </View>

            <View className="-mx-6 mb-4 h-[1px] bg-zinc-300" />

            <View className="w-full rounded-xl border border-zinc-300 bg-white px-4">
              <TextInput
                value={renameText}
                onChangeText={setRenameText}
                placeholder={selectedChildData?.name || 'Enter new name'}
                placeholderTextColor="#A1A1AA"
                className="justify-left py-[10px] text-lg font-normal leading-[20px] text-black"
                autoFocus
                onFocus={() => setIsShrunk(false)}
                onSubmitEditing={() => {
                  setIsShrunk(true);
                  Keyboard.dismiss();
                }}
                returnKeyType="done"
              />
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default SwitchUserModal;