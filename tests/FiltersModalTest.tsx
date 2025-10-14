import { useEffect, useState } from 'react';
import { View } from 'react-native';
//import FiltersModal, { visibilityCallback } from '../components/FiltersModal';
import FiltersModal, { visibilityCallback } from '../components/FiltersModal';

export default function FiltersModalTest() {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    visibilityCallback(setShowOverlay);
  }, []);

  return (
    <>
      <View className="flex-1 items-center justify-center bg-white">
        <FiltersModal />
      </View>

      {showOverlay && (
        <View className="absolute inset-0 bg-[rgba(0,0,0,0.3)]" pointerEvents="none" />
      )}
    </>
  );
}
