// 공통 유틸리티 함수

// 이름을 받아서 가독성 좋은 HSL 색상 생성 (같은 이름 = 같은 색상)
export function nameToColor(name) {
  if (!name) return { bg: '#e8f0fe', fg: '#1a4d8f' };

  // 이름을 숫자로 해시
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  // Hue: 0~360 중 골고루 분포
  const hue = Math.abs(hash) % 360;

  // Saturation/Lightness 고정: 너무 진하거나 연하지 않게
  // 배경은 연하게(가독성), 텍스트는 진하게
  const bg = `hsl(${hue}, 65%, 82%)`;
  const fg = `hsl(${hue}, 70%, 28%)`;
  const border = `hsl(${hue}, 60%, 55%)`;

  return { bg, fg, border };
}

// 한국시간 기준 현재 시각
export function getKSTNow() {
  const now = new Date();
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);
  return new Date(utc + (9 * 3600000));
}

// 날짜 키 (YYYY-MM-DD)
export function dateKey(year, month, day) {
  return `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

// 월 키 (YYYY-MM)
export function monthKey(year, month) {
  return `${year}-${String(month + 1).padStart(2, '0')}`;
}

// HHMM 시간을 HH:MM 형식으로
export function formatTime(hhmm) {
  if (!hhmm) return '';
  const s = String(hhmm).padStart(4, '0');
  return s.substring(0, 2) + ':' + s.substring(2, 4);
}

// HH:MM 또는 HHMM에 분 더하기 → "HHMM"
export function addMinutes(hhmm, minutes) {
  const s = String(hhmm).replace(':', '').padStart(4, '0');
  let h = parseInt(s.substring(0, 2));
  let m = parseInt(s.substring(2, 4));
  m += minutes;
  while (m >= 60) { h++; m -= 60; }
  while (m < 0) { h--; m += 60; }
  while (h < 0) h += 24;
  while (h >= 24) h -= 24;
  return String(h).padStart(2, '0') + String(m).padStart(2, '0');
}

// 고전 인물/설화 캐릭터 가명 풀
const ALIAS_POOL = [
  '홍길동', '심청이', '임꺽정', '춘향이', '몽룡이', '흥부', '놀부',
  '콩쥐', '팥쥐', '장화', '홍련', '바리공주', '연오랑', '세오녀',
  '견우', '직녀', '나무꾼', '선녀', '도깨비', '두꺼비',
  '주몽', '온달', '평강공주', '서동', '선화공주', '계백',
  '김유신', '문무왕', '원효', '의상', '혜초', '최치원',
  '장보고', '왕건', '강감찬', '서희', '윤관', '최영',
  '정몽주', '이방원', '황희', '맹사성', '이순신', '권율',
  '곽재우', '김시민', '논개', '신사임당', '허난설헌', '황진이'
];

// 이름을 받아서 일관된 가명 반환 (같은 이름 → 항상 같은 가명)
export function nameToAlias(name) {
  if (!name) return '익명';
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return ALIAS_POOL[Math.abs(hash) % ALIAS_POOL.length];
}
