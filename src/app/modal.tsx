import {View, Text, StyleSheet} from "react-native";

export default function Modal() {
    return (
        <View style={styles.container}>
            <Text>모달로 열린 화면입니다</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
