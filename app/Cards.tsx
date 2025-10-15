import { useEffect, useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import Card from '../components/Card';
import { getCardData } from '../services/dataService';

export default function CardsScreen() {
  const [easyCard, setEasyCard] = useState<Record<string, any> | null>(null);
  const [mediumCard, setMediumCard] = useState<Record<string, any> | null>(null);
  const [hardCard, setHardCard] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    // Load Easy card (id 0)
    const easy = getCardData(0);
    if (easy) setEasyCard(easy);

    // Load Medium card (id 5)
    const medium = getCardData(5);
    if (medium) setMediumCard(medium);

    // Load Hard card (id 10)
    const hard = getCardData(10);
    if (hard) setHardCard(hard);
  }, []);

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="items-center py-8 gap-8">
        <Text className="text-2xl font-semibold mb-4">Cards Screen</Text>

        {/* Easy Card - All States */}
        {easyCard && (
          <View className="gap-6 items-center">
            <Text className="text-xl font-bold text-green-700">Easy Card (ID: {easyCard.id})</Text>

            {/* Question State */}
            <View className="items-center gap-2">
              <Text className="text-sm font-semibold">Question State:</Text>
              <Card
                difficulty={easyCard.difficulty}
                question={easyCard.question}
                explanation={easyCard.explanation}
                parentTip={easyCard.parentTip}
                state="question"
              />
            </View>

            {/* Explanation State */}
            <View className="items-center gap-2">
              <Text className="text-sm font-semibold">Explanation State:</Text>
              <Card
                difficulty={easyCard.difficulty}
                question={easyCard.question}
                explanation={easyCard.explanation}
                parentTip={easyCard.parentTip}
                state="explanation"
              />
            </View>

            {/* Parent Tip State */}
            {easyCard.parentTip && (
              <View className="items-center gap-2">
                <Text className="text-sm font-semibold">Parent Tip State:</Text>
                <Card
                  difficulty={easyCard.difficulty}
                  question={easyCard.question}
                  explanation={easyCard.explanation}
                  parentTip={easyCard.parentTip}
                  state="parentTip"
                />
              </View>
            )}
          </View>
        )}

        {/* Medium Card*/}
        {mediumCard && (
          <View className="gap-6 items-center mt-8">
            <Text className="text-xl font-bold text-blue-700">Medium Card (ID: {mediumCard.id})</Text>

            {/* Question State */}
            <View className="items-center gap-2">
              <Text className="text-sm font-semibold">Question State:</Text>
              <Card
                difficulty={mediumCard.difficulty}
                question={mediumCard.question}
                explanation={mediumCard.explanation}
                parentTip={mediumCard.parentTip}
                state="question"
              />
            </View>

            {/* Explanation State */}
            <View className="items-center gap-2">
              <Text className="text-sm font-semibold">Explanation State:</Text>
              <Card
                difficulty={mediumCard.difficulty}
                question={mediumCard.question}
                explanation={mediumCard.explanation}
                parentTip={mediumCard.parentTip}
                state="explanation"
              />
            </View>

            {/* Parent Tip State  */}
            {mediumCard.parentTip && (
              <View className="items-center gap-2">
                <Text className="text-sm font-semibold">Parent Tip State:</Text>
                <Card
                  difficulty={mediumCard.difficulty}
                  question={mediumCard.question}
                  explanation={mediumCard.explanation}
                  parentTip={mediumCard.parentTip}
                  state="parentTip"
                />
              </View>
            )}
          </View>
        )}

        {/* Hard Card */}
        {hardCard && (
          <View className="gap-6 items-center mt-8 mb-8">
            <Text className="text-xl font-bold text-purple-700">Hard Card (ID: {hardCard.id})</Text>

            {/* Question State */}
            <View className="items-center gap-2">
              <Text className="text-sm font-semibold">Question State:</Text>
              <Card
                difficulty={hardCard.difficulty}
                question={hardCard.question}
                explanation={hardCard.explanation}
                parentTip={hardCard.parentTip}
                state="question"
              />
            </View>

            {/* Explanation State */}
            <View className="items-center gap-2">
              <Text className="text-sm font-semibold">Explanation State:</Text>
              <Card
                difficulty={hardCard.difficulty}
                question={hardCard.question}
                explanation={hardCard.explanation}
                parentTip={hardCard.parentTip}
                state="explanation"
              />
            </View>

            {/* Parent Tip State*/}
            {hardCard.parentTip && (
              <View className="items-center gap-2">
                <Text className="text-sm font-semibold">Parent Tip State:</Text>
                <Card
                  difficulty={hardCard.difficulty}
                  question={hardCard.question}
                  explanation={hardCard.explanation}
                  parentTip={hardCard.parentTip}
                  state="parentTip"
                />
              </View>
            )}
          </View>
        )}
      </View>
    </ScrollView>
  );
}
