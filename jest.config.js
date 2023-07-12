module.exports = {
  preset: "ts-jest",
  verbose: true,
  transformIgnorePatterns: ["/node_modules/@babylon/core"],
  testEnvironment: "jsdom",
  moduleFileExtensions: ["ts", "tsx", "js", "json", "node"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/src/__mocks__/fileMock.js"
  },
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest"
  }
};
