import { StatusBar } from 'expo-status-bar';
import { Text, View, TouchableWithoutFeedback, Image } from 'react-native';
import { useState } from 'react';
import '../global.css';

export default function App() {

  //Var to handle if tapped
  const [isToggled, setIsToggled] = useState(false);

  //Var to handle if tapped
  const handleButtonPress = () => {
    setIsToggled(!isToggled);
  };

  return (
    //Button that uses the figma design to change from highlighted to unhighlighted
    //Should change image source string to variable + need to implement bar functionality
    //But thats an issue for later me.
    <View className="flex-1 items-center justify-center bg-white">
      <TouchableWithoutFeedback
        onPress={handleButtonPress}
      >
        <View className="flex-row items-center justify-center">
          <Image 
            source={
              isToggled 
                ? require('assets/OnlineInteractionsEasySelected.png')
                : require('assets/OnlineInteractionsEasy.png') 
            }
            className="w-32 h-32"
            resizeMode="contain"
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
