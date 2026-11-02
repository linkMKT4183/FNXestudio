import { describe, expect, it } from "vitest";
import { INSTAGRAM_ACCOUNTS, buildInstagramLink } from "@/config/site";

describe("Instagram links", () => {
  it("has two accounts", () => {
    expect(Object.keys(INSTAGRAM_ACCOUNTS)).toEqual(["estudio", "salud"]);
  });
  it("returns no link while the handle is empty", () => {
    expect(buildInstagramLink("estudio", "")).toBeNull();
  });
  it("links to the real profiles", () => {
    expect(buildInstagramLink("estudio")).toBe("https://www.instagram.com/fnx.estudio/");
    expect(buildInstagramLink("salud")).toBe("https://www.instagram.com/fnx.salud/");
  });
  it("builds the profile link and strips the @", () => {
    expect(buildInstagramLink("salud", "@fnxsalud")).toBe("https://www.instagram.com/fnxsalud/");
  });
});
