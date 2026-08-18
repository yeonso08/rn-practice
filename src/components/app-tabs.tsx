import { Tabs, TabList, TabTrigger, TabSlot, TabTriggerSlotProps } from 'expo-router/ui';
import { Image, Pressable, StyleSheet, Text, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '@/constants/theme';

export default function AppTabs() {
  return (
    <SafeAreaView style={styles.slot} edges={['bottom']}>
      <Tabs>
        <TabSlot style={styles.slot} />
        <TabList style={styles.tabList}>
          <TabTrigger name="index" href="/" asChild>
            <TabButton label="Home" icon={require('@/assets/images/tabIcons/home.png')} />
          </TabTrigger>
          <TabTrigger name="explore" href="/explore" asChild>
            <TabButton label="Explore" icon={require('@/assets/images/tabIcons/explore.png')} />
          </TabTrigger>
          <TabTrigger name="scroll" href="/scroll" asChild>
            <TabButton label="Scroll" icon={require('@/assets/images/tabIcons/explore.png')} />
          </TabTrigger>
        </TabList>
      </Tabs>
    </SafeAreaView>
  );
}

type TabButtonProps = TabTriggerSlotProps & { label: string; icon: number };

function TabButton({ label, icon, isFocused, ...props }: TabButtonProps) {
  const scheme = useColorScheme();
  const colors = Colors[scheme === 'dark' ? 'dark' : 'light'];
  const color = isFocused ? colors.text : colors.textSecondary;

  return (
    <Pressable {...props} style={styles.tabButton}>
      <Image source={icon} style={[styles.icon, { tintColor: color }]} />
      <Text style={[styles.label, { color }]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  slot: {
    flex: 1,
  },
  tabList: {
    flexDirection: 'row',
    height: 56,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ccc',
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  icon: {
    width: 22,
    height: 22,
  },
  label: {
    fontSize: 11,
  },
});
