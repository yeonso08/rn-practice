import {View, Text, StyleSheet, Pressable} from 'react-native';

export default function Explore() {
   return (
       <View style={styles.container}>
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
       </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      padding: 18,
      backgroundColor: '#fff',
      gap: 16
   },
   title: {
      fontSize: 20,
      fontWeight: 'bold',
   },
   hudBg: {
      flex: 1,
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
      borderColor: 'red',
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
   },
   buttonPressed: {
      backgroundColor: 'blue',
   }
});
