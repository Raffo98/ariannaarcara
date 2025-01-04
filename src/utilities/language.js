import { createI18n } from "vue-i18n";
import contentIt from "@/assets/content/content_IT.json";
import contentEn from "@/assets/content/content_EN.json";

/**
 * An object containing the languages and their translations,
 * you can import the json for each translation and associate it
 * to its relative initials (we will mostly use english and italian,
 * but you can find the correct initials here
 *  https://meta.wikimedia.org/wiki/Template:List_of_language_names_ordered_by_code
 */
const messages = {
  en: contentEn,
  it: contentIt,
};

/**
 * i18n will automatically generate an array with all the available languages
 * by reading the "messages" object
 */
const i18n = createI18n({
  legacy: false,
  locale: "it", // set locale
  fallbackLocale: "it",
  messages, // set locale messages
});

export default i18n;
