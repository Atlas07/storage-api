module.exports = {
  extends: "airbnb-base",
  rules: {
    "consistent-return": 1,
  },
  plugins: ["jest"],
  env: {
    "jest/globals": true,
  },
};
