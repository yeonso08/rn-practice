import {View, Text, StyleSheet, Pressable, Platform, ScrollView} from 'react-native';
import {SafeAreaView} from "react-native-safe-area-context";
import { Image } from 'expo-image';
import { useFonts } from 'expo-font';
import { Inter_700Bold } from '@expo-google-fonts/inter';
import Form from "@/app/form";

export default function Explore() {
   const [fontsLoaded] = useFonts({ Inter_700Bold });

   if (!fontsLoaded) {
      return null;
   }

   return (
       <SafeAreaView style={styles.safeArea}>
          <ScrollView contentContainerStyle={styles.container}>
             <Text style={styles.title}>프로필 카드</Text>
             <View style={styles.card}>
                <Text style={styles.cardName}>테스트</Text>
                <Text style={styles.cardContent}>안녕하세요, 잘부탁드립니다.</Text>
                <Pressable style={({pressed}) => [styles.button, pressed && styles.buttonPressed]} onPress={(event) => {console.log("연락처")}}><Text>연락하기</Text></Pressable>
             </View>
             <View style={styles.hudBg}>
                <Text style={styles.hudLeft}>왼쪽</Text>
                <Text style={styles.hudRight}>오른쪽</Text>
                <Text style={styles.hudCenter}>중앙</Text>
                <Text style={styles.hudZIndex}>아래 중앙</Text>
             </View>
             <Image
                source={{uri: 'https://picsum.photos/seed/rn-practice/600/400'}}
                style={styles.remoteImage}
                contentFit="cover"
                transition={300}
             />
             <Image
                source={require('@/assets/images/react-logo.png')}
                style={styles.localImage}
                contentFit="contain"
             />
             <Form />
          </ScrollView>
       </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   safeArea: {
      flex: 1,
      backgroundColor: '#fff',
   },
   container: {
      padding: 18,
      gap: 16
   },
   title: {
      fontSize: 20,
      fontFamily: 'Inter_700Bold',
   },
   hudBg: {
      height: 200,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
   },
   hudRight: {
      position: 'absolute',
      padding: 16,
      right: 0,
      top: 0,
   },
   hudLeft: {
      position: 'absolute',
      padding: 16,
      left: 0,
      top: 0,
   },
   hudCenter: {
      position: 'absolute',
      padding: 16,
      alignSelf: 'center',
      bottom: 10,
   },
   hudZIndex: {
      position: 'absolute',
      padding: 16,
      alignSelf: 'center',
      bottom: 0,
      zIndex: 100,
   },
   card: {
      borderColor: Platform.select({ ios: 'blue', android: 'green' }),
      borderWidth: 1,
      padding: 16,
      width: '33%'
   },
   cardName: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   cardContent: {
      color: '#666',
   },
   button: {
      backgroundColor: 'red',
      padding: 16,
      borderRadius: 8,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
   },
   buttonPressed: {
      backgroundColor: 'blue',
   },
   remoteImage: {
      width: '100%',
      height: 180,
      borderRadius: 8,
   },
   localImage: {
      width: 100,
      height: 100,
   },
});
