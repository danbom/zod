import { expect, test } from "vitest";
import * as z from "zod/v4";

test("locales - ko", () => {
  z.config(z.locales.ko());

  const invalidType = z.number().safeParse("a");
  expect(invalidType.error!.issues[0].code).toBe("invalid_type");
  expect(invalidType.error!.issues[0].message).toBe("잘못된 입력: 예상 타입은 number, 받은 타입은 string입니다");

  const invalidType2 = z.string().safeParse(1);
  expect(invalidType2.error!.issues[0].code).toBe("invalid_type");
  expect(invalidType2.error!.issues[0].message).toBe("잘못된 입력: 예상 타입은 string, 받은 타입은 number입니다");
});

test("locales - ko - non-finite numbers are reported literally", () => {
  z.config(z.locales.ko());

  const nan = z.string().safeParse(Number.NaN);
  expect(nan.error!.issues[0].message).toBe("잘못된 입력: 예상 타입은 string, 받은 타입은 NaN입니다");

  const infinity = z.string().safeParse(Number.POSITIVE_INFINITY);
  expect(infinity.error!.issues[0].message).toBe("잘못된 입력: 예상 타입은 string, 받은 타입은 Infinity입니다");

  const negativeInfinity = z.number().safeParse(Number.NEGATIVE_INFINITY);
  expect(negativeInfinity.error!.issues[0].message).toBe(
    "잘못된 입력: 예상 타입은 number, 받은 타입은 -Infinity입니다"
  );
});
