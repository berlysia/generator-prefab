"use strict";
const path = require("path");
const assert = require("yeoman-assert");
const helpers = require("yeoman-test");

describe("generator-prefab:app", () => {
  beforeAll(() =>
    helpers.run(path.join(__dirname, "../generators/app")).withPrompts({
      packageName: "package-name",
      packageDescription: "package description",
    })
  );

  it("creates files", () => {
    const files = [
      ".github/workflows/CI.yml",
      ".babelrc",
      ".editorconfig",
      ".eslintignore",
      ".eslintrc",
      ".gitattributes",
      ".gitignore",
      ".prettierignore",
      ".prettierrc",
      "package.json",
      "jest.config.js",
    ];
    assert.file(files);
  });
});
