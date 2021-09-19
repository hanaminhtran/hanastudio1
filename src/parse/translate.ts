import { localDict } from "../utils/local-dict"
import { findWords, splitToWords, spanFactory, translatable, replaceWithParts } from "./utils"

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
 


const translatePage = async (dict: LocalDict) => {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT)
  let node = walker.nextNode()
  if (!node) return

  let words: string[]
  let found: boolean
  let nodeSlices: Node[]
  let value: string

  do {
    found = false
    if (translatable(node)) {
      value = node.nodeValue!
      words = splitToWords(value)
      if (words.length > 1) {
        nodeSlices = words.map(chunk => {
          const from = chunk.toLowerCase()
          if (dict.has(from)) {
            found = true
            // console.log("Word Match", [chunk, dict.get(from)])
            return spanFactory(chunk, dict.get(from)!)
          }
          return document.createTextNode(chunk)
        })
      } else {
        nodeSlices = findWords(value, dict).map(item => {
          if (typeof item === "string") {
            return document.createTextNode(item)
          }
          found = true
          // console.log("Text Search", [value, item.textContent])
          return item
        })
      }
    }

    const next = walker.nextNode()
    if (found) {
      replaceWithParts(node, nodeSlices!)
    }
    node = next
  } while (node)

}

export default async (language: string) => {
  const dict = await localDict(language)
  if (dict && dict.size > 0) {
    await translatePage(dict)
  } else {
    console.info("No dict")
  }
}
