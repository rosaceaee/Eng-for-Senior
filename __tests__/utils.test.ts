import { getTimeSlot } from "@/app/utills/getTimeSlot";

describe("getTimeSlot", () => {
  it("6시는 morning", () => {
    expect(getTimeSlot(6)).toBe("morning");
  });
  it("12시는 day", () => {
    expect(getTimeSlot(12)).toBe("day");
  });
  it("20시는 night", () => {
    expect(getTimeSlot(20)).toBe("night");
  });
});
