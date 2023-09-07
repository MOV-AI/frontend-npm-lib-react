module.exports = {
  verbose: true,
  transformIgnorePatterns: [
	  "/node_modules/(?!(@babylonjs/core|@tty-pt/sub|@mov-ai/mov-fe-lib-core)/).*", // This regex will make sure @swc/jest also transforms @babylonjs/core
  ],
  testPathIgnorePatterns: [
	  '/node_modules/',
	  '/dist/'
  ],
  testEnvironment: "jest-environment-jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)?$": "@swc/jest",
  }
};
