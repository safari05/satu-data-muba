export const FUNCToSnakeCase = (text) => {
  var cleanedText = text.replace(/[^a-zA-Z0-9]/g, " ");
  cleanedText = cleanedText.charAt(0).toLowerCase() + cleanedText.slice(1);
  cleanedText = cleanedText.replace(/\s+/g, "_");
  return cleanedText;
};
