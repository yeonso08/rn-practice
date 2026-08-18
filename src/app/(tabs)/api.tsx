import { useCallback } from 'react';
import { ActivityIndicator, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useQuery } from '@tanstack/react-query';
import { useFocusEffect } from 'expo-router';

type Todo = {
  id: number;
  title: string;
  completed: boolean;
};

function fetchTodos(): Promise<Todo[]> {
  return fetch('https://jsonplaceholder.typicode.com/todos?_limit=20').then((res) => {
    if (!res.ok) {
      throw new Error(`요청 실패: ${res.status}`);
    }
    return res.json();
  });
}

export default function Api() {
  const { data, isPending, isError, error, refetch, isRefetching } = useQuery({
    queryKey: ['todos'],
    queryFn: fetchTodos,
  });

  // 이 탭으로 다시 돌아올 때마다 최신 데이터로 갱신
  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  if (isPending) {
    return (
      <SafeAreaView style={styles.center}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  // 에러가 나도 이전에 성공했던 data는 그대로 남아있음(캐시) → 오프라인일 때 마지막 데이터 보여주는 용도
  return (
    <SafeAreaView style={styles.container}>
      {isError && (
        <View style={styles.errorBanner}>
          <Text style={styles.errorText}>
            {data ? '갱신 실패, 마지막으로 받은 데이터를 보여줍니다' : (error as Error).message}
          </Text>
          <Pressable style={styles.retryButton} onPress={() => refetch()}>
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>
        </View>
      )}
      <FlatList
        data={data ?? []}
        keyExtractor={(item) => String(item.id)}
        refreshing={isRefetching}
        onRefresh={() => refetch()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={item.completed ? styles.doneText : styles.text}>{item.title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  errorBanner: {
    backgroundColor: '#fee2e2',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  errorText: {
    flex: 1,
    color: '#991b1b',
  },
  retryButton: {
    backgroundColor: '#991b1b',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  retryText: {
    color: '#fff',
  },
  row: {
    padding: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 14,
  },
  doneText: {
    fontSize: 14,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});
