import { langCode } from "./utils"

/**
 * Local dictionary for content parse.
 */
 declare type LocalDict = Map<string, string>

 /**
  * From one language to its all other starred word's language translates.
  */
 declare type Dict = {
   [fromLang: string]: {
     [toLang: string]: [string, string][]
   }
 }
 
 /**
  * Word list in two languages. `{ Acne: "Pattanás", ... }`
  * TODO: Map instead of object, insert in right order
  */
 declare type Words = {
   [word: string]: string
 }
 
 /**
  * Google's POST request data for star new word.
  */
 declare type AddRequestData = {
   formData: {
     q: string[]
     utrans: string[]
   }
 }
 
 declare type WordsFound = {
   type: "WORDS_FOUND"
   count: number
 }
 
 type LanguageDetected = {
   type: "TAB_LANGUAGE"
   language: string
 }
 
 type ProcessingMessage = {
   type: "TAB_PROCESSING"
 }
 
 type FetchDictionary = {
   type: "FETCH_DICTIONARY"
 }
 
 /**
  *
  */
 declare type AppMessage = WordsFound | LanguageDetected | ProcessingMessage | FetchDictionary
 
 declare type NotificationType = "IMPORT_SUCCESS" | "IMPORT_FAIL" | "FETCH_FAIL"
 

const long2short = (a: string, b: string) => b.length - a.length
const addWord = (dict: LocalDict) => (words: Words) => (word: string) =>
  void dict.set(word, words[word])

export const localDict = async (language: string) => {
  const localDict: LocalDict = new Map<string, string>()
  let dict: Dict
  try {
    //dict = await browser.storage.local.get(langCode(language))
  } catch {
    return
  }
  const storedLang = dict[language]

  if (storedLang) {
    //TODO: Handle words with multiple language translations.
    const wordList: Words = Object.fromEntries(Object.values(storedLang).flat())
    const toDict = addWord(localDict)(wordList)
    Object.keys(wordList).sort(long2short).forEach(toDict)
  }

  return localDict
}
