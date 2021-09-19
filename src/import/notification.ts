const countReducer = (subPrev: number, subCurr: any[]) => subPrev + subCurr.length
const valuesCountReducer = (prev: number, curr: { [key: string]: any[] }) =>
  prev + Object.values(curr).reduce(countReducer, 0)

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
 
export const notification = async (type: NotificationType) => {
  var browser = require("webextension-polyfill");
  const iconUrl = "icons/192x192.png"
  let options: browser.Notifications.CreateNotificationOptions

  switch (type) {
    case "IMPORT_SUCCESS":
      const dict: Dict = await browser.storage.local.get()
      const languageCount = Object.keys(dict).length
      const wordCount = Object.values(dict).reduce(valuesCountReducer, 0)
      options = {
        type: "list",
        iconUrl,
        title: "Updated",
        message: "Local dictionary updated.",
        items: [
          { title: "Translate From", message: `${languageCount} languages` },
          { title: "All together", message: `${wordCount} words` },
        ],
      }
      break

    case "IMPORT_FAIL":
      options = {
        type: "basic",
        iconUrl,
        title: "Update Failed",
        message: "Local dictionary is not updated, I didn't find any words (／ˍ・、)",
      }
      break

    case "FETCH_FAIL":
      options = {
        type: "basic",
        iconUrl,
        title: "Fetch Google Failed",
        message: "Local dictionary is not updated",
      }
      break
  }

  await browser.notifications.create(options)
}
