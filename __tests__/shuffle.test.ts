// 단순히 배열을 무작위로 정렬하는 방식으로 섞는 함수. (Fisher-Yates 알고리즘같은거라는데 더 찾아봐야할듯)
// 이 방법은 완벽한 무작위성을 보장하지 않으며, 특히 작은 배열에서는 특정 순서가 더 자주 나타날 수 있습니다.

// Test: 배열을 섞는 함수가 배열의 길이를 유지하는지, 원본 배열을 변경하지 않는지 테스트
// 배열을 섞고 섞어서 랜덤으로 배열을 반환하는 함수. 이 함수는 원본 배열을 변경하지 않고 새로운 배열을 반환.
const shuffle = <T>(arr: T[]): T[] => [...arr].sort(() => Math.random() - 0.5);

describe("shuffle", () => {
  it("배열 길이가 유지", () => {
    const arr = [1, 2, 3, 4, 5];
    expect(shuffle(arr).length).toBe(5);
  });
  it("원본 배열을 변경하지 않음", () => {
    const arr = [1, 2, 3];
    shuffle(arr);
    expect(arr).toEqual([1, 2, 3]);
  });
});
