type TranslationSchema = {
    Tab_Numbers: string,
    Tab_Dates: string,
    Tab_Texts: string,
    Lang_Name: string,
    Language: string
}

const English: TranslationSchema = {
    Language: "Language",
    Lang_Name: "English",
    Tab_Dates: "Dates",
    Tab_Numbers: "Numbers",
    Tab_Texts: "Texts"
}

const German: TranslationSchema = {
    Language: "Sprache",
    Lang_Name: "Deutsch",
    Tab_Dates: "Daten",
    Tab_Numbers: "Zahlen",
    Tab_Texts: "Texte"
}

export {TranslationSchema, English, German}
