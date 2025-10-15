import FiltersModalTest from '@/tests/FiltersModalTest';
import { router } from 'expo-router';
import { Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import BackIcon from '../assets/back-icon.svg';
import DeckCard from 'components/DeckCover';

export default function ExploreDecksScreen() {
  const decks = [
    { category: 'online_interactions', difficulty: 'easy', progress: 0.4 },
    { category: 'inappropriate_content', difficulty: 'medium', progress: 0.8 },
    { category: 'social_media_and_mental_health', difficulty: 'hard', progress: 0.2 },
    { category: 'screen_time', difficulty: 'easy', progress: 0.5 },
    { category: 'platforms_and_privacy', difficulty: 'medium', progress: 0.1 },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-2 pb-3 border-b border-gray-200 bg-white">
        {/* Left button */}
        <View className="w-12 items-center">
          <TouchableOpacity onPress={() => router.back()} className="p-2">
            <BackIcon width={14} height={24} fill="#000" />
          </TouchableOpacity>
        </View>

        {/* Center title */}
        <Text className="text-2xl font-semibold">Explore Decks</Text>

        {/* Right button */}
        <View className="w-12 items-center">
          <FiltersModalTest />
        </View>
      </View>

      {/* Deck Grid */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: 40,
        }}
      >
        <View className="flex-row flex-wrap justify-between">
          {decks.map((deck, index) => (
            <View key={index} className="mb-4 w-[48%]">
              <DeckCard
                catagory={deck.category as any}
                difficulty={deck.difficulty as any}
                progress={deck.progress}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}


// import FiltersModalTest from '@/tests/FiltersModalTest';
// import { router } from 'expo-router';
// import { Text, TouchableOpacity, View, ScrollView} from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import BackIcon from '../assets/back-icon.svg';
// import DeckCard from 'components/DeckCover'; // make sure the export name matches

// export default function ExploreDecksScreen() {
//   // Example data — you can replace this with dynamic data later
//   const decks = [
//     { category: 'online_interactions', difficulty: 'easy', progress: 0.4 },
//     { category: 'inappropriate_content', difficulty: 'medium', progress: 0.8 },
//     { category: 'social_media_and_mental_health', difficulty: 'hard', progress: 0.2 },
//     { category: 'screen_time', difficulty: 'easy', progress: 0.5 },
//     { category: 'platforms_and_privacy', difficulty: 'medium', progress: 0.1 },
//   ];
//   return (
//     <SafeAreaView className="flex-1 bg-white">
//       {/*Header*/}
//       <View className="flex-row items-center justify-between px-4 pt-2 pb-3 border-b border-gray-200 bg-white">
  
//         {/* Left button container */}
//         <View className="w-12 items-center">
//           <TouchableOpacity onPress={() => router.back()} className="p-2">
//             <BackIcon width={14} height={24} fill="#000" />
//           </TouchableOpacity>
//         </View>

//         {/* Center title */}
//         <Text className="text-2xl font-semibold">Explore Decks</Text>

//         {/* Right button container */}
//         <View className="w-12 items-center">
//           <FiltersModalTest />
//         </View>



//         {/* add in deck cover to explore decks screen directly and test */}
//         {/* make sure it scrolls  */}
//         {/* 3 different difficulties and 5 different categories; change the difficulty and category by component  */}

//       {/* Deck Grid */}
//       <ScrollView contentContainerStyle={{ padding: 16 }}>
//         <View className="flex-row flex-wrap justify-between">
//           {decks.map((deck, index) => (
//             <View key={index} className="mb-4">
//               <DeckCard
//                 catagory={deck.category as any}
//                 difficulty={deck.difficulty as any}
//                 progress={deck.progress}
//               />
//             </View>
//           ))}
//         </View>
//       </ScrollView>

//       </View>
//     </SafeAreaView>
//   );
// }

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

