import {View, Text, StyleSheet, Pressable} from "react-native";
import {useLocalSearchParams, Link} from "expo-router";
import {generateLogs} from "@/lib/mock-logs";

export default function LogDetail() {
    const {id} = useLocalSearchParams<{ id: string }>();
    const index = Number(id.replace('log-', ''));
    const [log] = generateLogs(1, index);

    return (
        <View style={styles.container}>
            <Text style={styles.time}>{log.time}</Text>
            <Text style={styles.message}>{log.message}</Text>
            <Link href="/modal" asChild>
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>모달 열기</Text>
                </Pressable>
            </Link>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 18,
        gap: 12,
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
    message: {
        fontSize: 16,
    },
    button: {
        marginTop: 16,
        backgroundColor: 'red',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
    },
});
