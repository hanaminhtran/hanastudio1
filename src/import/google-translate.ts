import { langCode } from "../utils/utils"
import { notification } from "./notification"
//import  browser  from "webextension-polyfill"


//var browser = require("webextension-polyfill");

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

const saveDict = async (dict: Dict) => {
  const dictEntries = Object.entries(dict)
  if (dictEntries.length > 0) {
    //browser.storage.local.clear()
    for (const [fromLang, toLangs] of dictEntries) {
      //await browser.storage.local.set({ [fromLang]: toLangs })
    }
    return true
  }
  return false
}


type DataRow = [string, string, string, string, string, number]
type DataChunk = {
  key: string
  isError: boolean
  hash: string
  data: any
  sideChannel: any
}

interface Window {
  AF_initDataChunkQueue?: DataChunk[]
}

export const addWord = (dict: Dict) => ([, fromLang, toLang, fromWord, toWord]: DataRow) => {
  fromLang = langCode(fromLang)
  toLang = langCode(toLang)
  fromWord = fromWord.toLowerCase()
  toWord = toWord.toLowerCase()

  if (dict[fromLang] === undefined) dict[fromLang] = {}
  if (dict[fromLang][toLang] === undefined) dict[fromLang][toLang] = []

  const words = dict[fromLang][toLang]
  if (words === undefined || words[fromWord] !== toWord) {
    dict[fromLang][toLang].push([fromWord, toWord])
  }

  return dict
}

export const parseTag = (text: string): DataRow[] | undefined => {
  let rows: DataRow[]
  try {
    rows = JSON.parse(
      text.split("data:", 2)[1]?.split("sideChannel:", 1)[0].trimEnd().slice(0, -1)
    )[0]
    if (!Array.isArray(rows) || rows.length === 0 || rows[0].length !== 6) {
      return undefined
    }
  } catch {
    return undefined
  }
  return rows
}

const scriptTags = (html: string) =>
  Array.from(new DOMParser().parseFromString(html, "text/html").querySelectorAll("script"))

/**
 * Google Translate API - Get Starred Words of logged user and sav3e to browser storage.
 */
export const starredIntoLocal = async () => {
 
      // const res = await fetch("http://localhost:3000/")
  //if (!res.ok) {
   // alert("fail to fetch");
  //  notification("FETCH_FAIL")
   // return
 try {
  await fetch('http://localhost:3001/hanastudio1')
  .then( resp => {
    alert(resp.json())
  }
    )
  .then((data)=> {

    alert(data)
      }).finally(() => {console.log("ok")})
  

    }
  
 catch (error) {
   alert(" loi roi"+error)
   
 }
  
   
  
  /* 
  const dict: Dict = {}
  const add = addWord(dict)

  // First success breaks and stop the iteration
  scriptTags(await res.text()).some(({ innerText }) => {
    const dataRows = parseTag(innerText)
    if (dataRows && dataRows.length > 0) {
      dataRows.forEach(add)
      return true
    }
  })

  const success = await saveDict(dict)

  notification(success ? "IMPORT_SUCCESS" : "IMPORT_FAIL") */
}
