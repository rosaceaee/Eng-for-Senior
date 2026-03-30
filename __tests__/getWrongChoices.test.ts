import { getWrongList } from "@/app/utills/getWrongList";

// describe("wrongList", () => {
//     it("", () => {
//         expect(wrongList).toBeInstanceOf(Array);
//       });
// });

const testData = [
  { id: 1, korean: "테스트1", english: "test1", blocks: ["test1"] },
  { id: 2, korean: "테스트2", english: "test2", blocks: ["test2"] },
  { id: 3, korean: "테스트3", english: "test3", blocks: ["test3"] },
];

const testProgress = {
  1: { done: true, cleared: false, lastPlayed: "" }, // 오답
  2: { done: true, cleared: true, lastPlayed: "" }, // 정답
  3: { done: false, cleared: false, lastPlayed: "" }, // 미완료
};

describe("getWrongList", () => {
  it("배열을 반환", () => {
    const result = getWrongList(testData, testProgress);
    expect(result).toBeInstanceOf(Array);
  });

  it("done이고 cleared가 false인 항목만 반환한다", () => {
    const result = getWrongList(testData, testProgress);
    expect(result).toHaveLength(1);
    expect(result[0].id).toBe(1);
  });

  it("미완료 항목은 포함하지 않는다", () => {
    const result = getWrongList(testData, testProgress);
    const ids = result.map((item) => item.id);
    expect(ids).not.toContain(3);
  });
});
