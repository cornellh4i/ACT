import FiltersModalTest from '@/tests/FiltersModalTest';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back-icon.svg';

export default function ExploreDecksScreen() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/*Header*/}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3 border-b border-gray-200 bg-white">
  
        {/* Left button container */}
        <View className="w-12 items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <BackIcon width={14} height={24} fill="#000" />
          </TouchableOpacity>
        </View>

        {/* Center title */}
        <Text className="text-2xl font-semibold">Explore Decks</Text>

        {/* Right button container */}
        <View className="w-12 items-center">
          <FiltersModalTest />
        </View>

        {/* add in deck cover to explore decks screen directly and test */}
        {/* make sure it scrolls  */}
        {/* 3 different difficulties and 5 different categories; change the difficulty and category by component  */}

      </View>
    </SafeAreaView>
  );
}

// import FiltersModalTest from '@/tests/FiltersModalTest';
// import { router } from 'expo-router';
// import { Text, TouchableOpacity, View } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import BackIcon from '../assets/back-icon.svg';

// export default function ExploreDecksScreen() {
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/*Header*/}
//       <View className = "flex-row items-center justify-between px-4 pt-2 pb-3 border-b border-gray 200 bg-white">
//       <TouchableOpacity onPress={() => router.back()} className="ml-4 mt-2">
//         {/*Back Icon*/}
//         <BackIcon width={14} height={24} fill="#000" />
//       </TouchableOpacity>
//       {/* <View className="flex-1 items-center justify-center"> */}
//         <Text className="text-2xl font-semibold">Explore Decks</Text>
//       {/* </View> */}
//       <FiltersModalTest />
//       </View>
//     </SafeAreaView>
//   );
// }

