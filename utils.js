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
