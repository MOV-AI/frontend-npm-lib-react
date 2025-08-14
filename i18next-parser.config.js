module.exports = {
  // Defines the input files to parse
  input: [
    "src/**/*.{js,jsx,ts,tsx,vue}",
    // Add more paths or exclude paths if needed
    // '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],

  // Defines the output path and structure
  // $LOCALE$ will be replaced by each language code from the 'locales' array below (e.g., 'en', 'pt')
  // $NAMESPACE$ will be replaced by the namespace (e.g., 'translation' if it's your default)
  output: "src/i18n/locales/$LOCALE/$NAMESPACE.json",

  // Specifies the languages you want to support and generate files for
  locales: ["en", "pt"], // Your specified locales

  // Default namespace to use if a key doesn't have a namespace
  defaultNamespace: "translation",

  // Optional: Separator for namespaces in your keys (e.g., 'namespace:key')
  // namespaceSeparator: ':', // Default is ':' or false if you don't use namespace separators this way

  // Optional: Separator for nested keys (e.g., 'parent.child.key')
  // keySeparator: '.', // Default is '.' or false if you don't use key separators

  // Optional: How to format the output JSON
  indentation: 2, // Number of spaces for indentation

  // IMPORTANT for "don't break previous files":
  // Keeps keys in translation files even if they are no longer found in the source code.
  keepRemoved: true,

  keySeparator: false,
  // Creates new locale files if they don't exist (e.g., for 'pt' if only 'en' existed).
  // Also creates new namespace files if they don't exist.
  createOldCatalogs: true, // Default is true, which is good.

  // Defines the default value for newly added keys.
  // You can customize this. Using the key itself or an empty string is common.
  defaultValue: function (locale, namespace, key, value) {
    // If 'value' is an empty string (often the case for new keys from some parsers),
    // use the key itself as the default. Otherwise, use the provided value.
    return value || key;
  },

  // Optional: Sort keys in the output JSON files alphabetically
  // sort: true, // or provide a custom comparison function
  // sort: function(a, b) {
  //   return a.localeCompare(b);
  // }

  // Optional: Use line ending from OS, or specify yourself (e.g. "\r\n") for consistency
  // lineEnding: 'auto', // or '\n', '\r\n'

  // For more advanced configurations, refer to the i18next-parser documentation:
  // https://github.com/i18next/i18next-parser
};
