import { hideTooltip, overHandler, showTooltip } from "./tooltip"

/**
 * Get list of words from a text.
 */
export const splitToWords = (str: string): string[] => str?.split(/(\b\w+\b)/) ?? []

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
 

/**
 * The node is a human readable text.
 */
export const translatable = (node: Node) => {
  if (node.nodeValue && node.nodeValue.trim() !== "") {
    const parent = node.parentNode
    if (parent !== null && !(parent as HTMLElement).hasAttribute("data-webwords")) {
      return !["style", "noscript", "script"].includes(parent.nodeName.toLowerCase())
    }
  }
  return false
}

/**
 * @param word Text on the webpage
 */
export const spanFactory = (word: string, title: string): Node => {
  const span = document.createElement("span")
  span.setAttribute("data-webwords", title)
  span.onmouseover = overHandler
  span.onmouseout = hideTooltip
  span.innerText = word
  return span
}

/**
 * Replace a node with a _group node_ that contains parts.
 */
export const replaceWithParts = (node: Node, parts: Node[]) => {
  const group = document.createElement("span")
  parts!.forEach(part => void group.appendChild(part))
  group.normalize()
  node.parentNode?.replaceChild(group, node)
}

/**
 * Find and translate a word in a text
 */
export const findWord = (chunks: (string | Node)[], word: string, translated: string) => {
  const newChunks: (string | Node)[] = []
  let chunk: string | Node
  let splitted: string[]
  let spit: string
  let i: number

  for (chunk of chunks) {
    if (typeof chunk !== "string") {
      newChunks.push(chunk)
      continue
    }

    splitted = chunk.split(word)
    i = splitted.length

    for (spit of splitted) {
      if (spit !== "") {
        newChunks.push(spit)
      }
      if (--i > 0) {
        newChunks.push(spanFactory(word, translated))
      }
    }
  }

  return newChunks
}

/**
 * Find and translate words in a text
 */
export const findWords = (nodeValue: string, dict: LocalDict) => {
  let returns: (string | Node)[] = [nodeValue]

  dict.forEach((to, from) => {
    returns = findWord(returns, from, to)
  })

  return returns
}
