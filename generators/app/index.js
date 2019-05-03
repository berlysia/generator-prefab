"use strict";
const Generator = require("yeoman-generator");
const slugify = require("slugify");
const isScoped = require("is-scoped");

module.exports = class extends Generator {
  async prompting() {
    const prompts = [
      {
        name: "packageName",
        message: "",
        default: slugify(this.appname),
        filter: name => (isScoped(name) ? name : slugify(name)),
      },
      {
        name: "packageDescription",
      },
      {
        type: ["library", "browser", "node"],
        message: "library|browser|node",
        name: "target",
        default: "node",
      },
    ];

    this.props = await this.prompt(prompts);
  }

  writing() {
    const template = {
      packageName: this.props.packageName,
      packageDescription: this.props.packageDescription,
    };

    this.fs.copyTpl(this.templatePath("base/**"), this.destinationRoot(), template);
    this.fs.copyTpl(this.templatePath(`${this.props.target}/**`), this.destinationRoot(), template);

    const moves = {
      babelrc: ".babelrc",
      "circleci/config.yml": ".circleci/config.yml",
      editorconfig: ".editorconfig",
      eslintignore: ".eslintignore",
      eslintrc: ".eslintrc",
      gitattributes: ".gitattributes",
      gitignore: ".gitignore",
      prettierignore: ".prettierignore",
      prettierrc: ".prettierrc",
      "_package.json": "package.json",
    };

    for (const [from, to] of Object.entries(moves)) {
      if (this.fs.exists(this.destinationPath(from))) {
        this.fs.move(this.destinationPath(from), this.destinationPath(to));
      }
    }

    if (this.fs.exists(this.destinationPath(`_package.${this.props.target}.json`))) {
      this.fs.extendJSON(
        this.destinationPath("package.json"),
        this.fs.readJSON(this.destinationPath(`_package.${this.props.target}.json`))
      );
      this.fs.delete(this.destinationPath(`_package.${this.props.target}.json`));
    }

    this.spawnCommandSync("git", ["init"]);
  }

  install() {
    const devDeps = [
      "eslint",
      "prettier",
      "jest",
      "typescript",
      "ts-jest",
      "husky",
      "lint-staged",
      "npm-run-all",
      "@berlysia/eslint-config",
      "@berlysia/tsconfig",
      "@types/jest",
      "@types/node",
      "del-cli",
      "@babel/core",
      "@babel/preset-env",
      "@babel/preset-typescript",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-proposal-object-rest-spread",
    ];

    switch (this.props.target) {
      case "library":
        devDeps.push("@babel/cli");
        break;
      case "browser":
        devDeps.push("webpack", "webpack-cli", "webpack-dev-server", "babel-loader", "html-webpack-plugin");
        break;
      case "node":
        devDeps.push("webpack", "webpack-cli", "webpack-dev-server", "babel-loader");
        break;
    }

    this.yarnInstall(devDeps, { dev: true });
  }
};
