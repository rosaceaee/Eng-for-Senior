// interface TimeSlot {
//   morning: "morning";
//   day: "day";
//   night: "night";
// }
// 실수 박제 끝

// Test: 메인의 현실 시간에 따라 morning, day, night이 나오는지 테스트
export type TimeSlot = "morning" | "day" | "night";

export const getTimeSlot = (hour?: number): TimeSlot => {
  const h = hour ?? new Date().getHours();
  if (h >= 6 && h <= 10) return "morning";
  if (h >= 11 && h < 18) return "day";
  return "night";
};
