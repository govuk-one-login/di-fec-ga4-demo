const testAddLanguageParam = require("./language-toggle");

describe("addLanguageParam function", () => {
  it("should add language parameter to URL", () => {
    const language = "en";
    const url = "http://example.com";

    const result = testAddLanguageParam(language, url);
    expect(result).toContain("lng=en");
  });

  it("should add language parameter to URL without any existing parameters", () => {
    const result = testAddLanguageParam("en", "http://example.com");
    expect(result).toContain("/?lng=en");
  });

  it("should add language parameter to URL with existing parameters", () => {
    const result = testAddLanguageParam(
      "en",
      "http://localhost:6001/path?param1=value1"
    );
    expect(result).toContain("/path?");
    expect(result).toContain("lng=en");
  });

  it("should not duplicate the language parameter in URL", () => {
    const result = testAddLanguageParam(
      "cy",
      "http://localhost:6001/path?param1=value1&lng=en"
    );
    expect(result).toContain("/path?");
    expect(result).toContain("param1=value1");
    expect(result).toContain("lng=cy");
    expect(result.split("lng=").length - 1).toEqual(1); // ensures 'lng' parameter appears only once
  });
});
