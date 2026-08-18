export type LogEntry = {
  id: string;
  time: string;
  message: string;
};

const LEVELS = ['INFO', 'WARN', 'ERROR', 'DEBUG'];
const SUBJECTS = [
  '카메라 프레임 수신',
  '조향각 센서 값 갱신',
  '네트워크 재연결',
  '캐시 정리',
  '사용자 인증',
  '설정 저장',
  '백그라운드 동기화',
];

// offset부터 count개만큼 로그를 생성. 무한 스크롤에서 이어붙일 때 offset을 늘려서 다시 호출.
export function generateLogs(count: number, offset = 0): LogEntry[] {
  return Array.from({ length: count }, (_, i) => {
    const index = offset + i;
    const level = LEVELS[index % LEVELS.length];
    const subject = SUBJECTS[index % SUBJECTS.length];
    const date = new Date(Date.now() - index * 60_000);

    return {
      id: `log-${index}`,
      time: date.toLocaleTimeString(),
      message: `[${level}] ${subject} #${index}`,
    };
  });
}
