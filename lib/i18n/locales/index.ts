import { Language, TranslationDictionary } from "../types";
import { id } from "./id";
import { en } from "./en";

export const TRANSLATIONS: Record<Language, TranslationDictionary> = {
  id,
  en,
};

export { id, en };
