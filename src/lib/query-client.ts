import NetInfo from '@react-native-community/netinfo';
import { QueryClient, focusManager, onlineManager } from '@tanstack/react-query';
import { AppState, AppStateStatus, Platform } from 'react-native';

// 웹은 navigator.onLine을 자동으로 봐주지만, RN은 NetInfo로 직접 연결해야 함.
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state) => {
    setOnline(!!state.isConnected);
  });
});

// 웹은 window 'focus' 이벤트를 자동으로 보지만, RN은 AppState로 직접 연결해야 함.
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active');
  }
}
AppState.addEventListener('change', onAppStateChange);

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24시간 동안은 캐시를 메모리에 유지 (오프라인일 때 마지막 데이터 보여주는 용도)
    },
  },
});
