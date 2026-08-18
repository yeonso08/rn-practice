import {FlatList, Text, View, StyleSheet} from 'react-native';
import { generateLogs, LogEntry } from '@/lib/mock-logs';
import { useState } from 'react';
import {SafeAreaView} from "react-native-safe-area-context";
import {Link} from "expo-router";

export default function Scroll() {
    const [logs, setLogs] = useState<LogEntry[]>(generateLogs(200));
    const [refreshing, setRefreshing] = useState(false);

    const renderItem = ({ item }: { item: LogEntry }) => (
        <Link href={`/log/${item.id}`} style={styles.row}>
            <Text style={styles.time}>{item.time}</Text>
            <Text>{item.message}</Text>
        </Link>
    );

    const onRefresh = () => {
        setRefreshing(true);
        setLogs(generateLogs(200));
        setRefreshing(false);
    };

    const onEndReached = () => {
        const more = generateLogs(50, logs.length);
        setLogs((prev) => [...prev, ...more]);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                data={logs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                refreshing={refreshing}
                onRefresh={onRefresh}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    row: {
        padding: 12,
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#ccc',
    },
    time: {
        fontSize: 12,
        color: '#888',
    },
});
