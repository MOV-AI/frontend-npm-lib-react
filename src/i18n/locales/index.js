import translationEN from "./en/translation.json";
import translationPT from "./pt/translation.json";

const AVAILABLE_TRANSLATIONS = {
  ENGLISH: {
     ABBR: "en",
     LANGUAGE: "English",
     DESCRIPTION: "UK English",
     TRANSLATION: translationEN,
     ACTIVE: true
  },
  PORTUGUESE: {
     ABBR: "pt",
     LANGUAGE: "Português",
     DESCRIPTION: "Português de Portugal",
     TRANSLATION: translationPT,
     ACTIVE: true
  }
}
export const Translations = Object.values(AVAILABLE_TRANSLATIONS).reduce((a, curr) => {
    const newLang = curr.ACTIVE ? {[curr.ABBR]: curr.TRANSLATION} : {};
    return {...a, ...newLang}
}, {});
