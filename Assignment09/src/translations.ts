export enum Translations {
    Dates_No_Style,
    Dates_No_Style_Time_LocaleString,
    Dates_Input_Label,
    Dates_WeekdayLong_MonthLong_DayNumeric,
    Dates_WeekdayLong_MonthLong_DayNumeric_LocaleString,
    Gender,
    Gender_Female,
    Gender_Male,
    Gender_Other,
    Guest_Count,
    Lang_Name,
    Language,
    Numbers_Currency_Label,
    Numbers_Currency_MinFrac_Label,
    Numbers_Input_Label,
    Numbers_KByte_Label,
    Numbers_No_Style,
    Numbers_Percentage_Label,
    Tab_Dates,
    Tab_Numbers,
    Tab_Texts,
    Texts_Amount,
    Texts_Amount_Interesting_Values,
    Texts_Amount_Label,
    Texts_Gender,
    Texts_Gender_Amount_Label,
    Texts_Gender_Amount,
    Texts_Gender_Label,
    Texts_Result
}

type TranslationSchema = {
    [Translations.Dates_No_Style]: string,
    [Translations.Dates_No_Style_Time_LocaleString]: string,
    [Translations.Dates_Input_Label]: string,
    [Translations.Dates_WeekdayLong_MonthLong_DayNumeric]: string,
    [Translations.Dates_WeekdayLong_MonthLong_DayNumeric_LocaleString]: string,
    [Translations.Gender]: string,
    [Translations.Gender_Female]: string,
    [Translations.Gender_Male]: string,
    [Translations.Gender_Other]: string,
    [Translations.Guest_Count]: string,
    [Translations.Lang_Name]: string,
    [Translations.Language]: string,
    [Translations.Numbers_Currency_Label]: string,
    [Translations.Numbers_Currency_MinFrac_Label]: string,
    [Translations.Numbers_Input_Label]: string,
    [Translations.Numbers_KByte_Label]: string,
    [Translations.Numbers_No_Style]: string,
    [Translations.Numbers_Percentage_Label]: string,
    [Translations.Tab_Dates]: string,
    [Translations.Tab_Numbers]: string,
    [Translations.Tab_Texts]: string,
    [Translations.Texts_Amount]: string,
    [Translations.Texts_Amount_Interesting_Values]: string,
    [Translations.Texts_Amount_Label]: string,
    [Translations.Texts_Gender]: string,
    [Translations.Texts_Gender_Amount]: string,
    [Translations.Texts_Gender_Amount_Label]: string,
    [Translations.Texts_Gender_Label]: string,
    [Translations.Texts_Result]: string,
}

const English: TranslationSchema = {
    [Translations.Dates_No_Style]: "Date without any custom formatting:",
    [Translations.Dates_No_Style_Time_LocaleString]: "Date::LocaleTimeString: without custom formatting:",
    [Translations.Dates_Input_Label]: "Date:",
    [Translations.Dates_WeekdayLong_MonthLong_DayNumeric]: "Date with long weekday and month names:",
    [Translations.Dates_WeekdayLong_MonthLong_DayNumeric_LocaleString]: "Date::LocaleString: with long weekday and month names:",
    [Translations.Gender]: "Gender",
    [Translations.Gender_Female]: "Female",
    [Translations.Gender_Male]: "Male",
    [Translations.Gender_Other]: "Other",
    [Translations.Guest_Count]: "Guest Count",
    [Translations.Language]: "Language",
    [Translations.Lang_Name]: "English",
    [Translations.Numbers_Currency_Label]: "Currency:",
    [Translations.Numbers_Currency_MinFrac_Label]: "Currency with 'minimumFractionDigits':",
    [Translations.Numbers_Input_Label]: "Number:",
    [Translations.Numbers_KByte_Label]: "KiloByte:",
    [Translations.Numbers_No_Style]: "FormattedNumber without Style",
    [Translations.Numbers_Percentage_Label]: "Percentage:",
    [Translations.Tab_Dates]: "Dates",
    [Translations.Tab_Numbers]: "Numbers",
    [Translations.Tab_Texts]: "Texts",
    [Translations.Texts_Amount]: "There {itemCount, plural, =0 {are no guests} =1 {is one guest} other {are # guests}} at the party. {itemCount, plural, =69 {Nice!} =420 {LMAO :D} other {}}",
    [Translations.Texts_Amount_Interesting_Values]: "Special Values: 0, 1, 69, 420",
    [Translations.Texts_Amount_Label]: "Amount only:",
    [Translations.Texts_Gender]: "{gender, plural," +
    " =" + Translations.Gender_Male + " {He}" +
    " =" + Translations.Gender_Female + " {She}" +
    " other {It}} goes to the party.",
    [Translations.Texts_Gender_Label]: "Gender only:",
    [Translations.Texts_Gender_Amount]: "{gender, plural," +
    " =" + Translations.Gender_Male + " {He}" +
    " =" + Translations.Gender_Female + " {She}" +
    " other {It}} {itemCount, plural, =0 {is the only one} =1 {is with one guest} other {is with # guests}} at the party.",
    [Translations.Texts_Gender_Amount_Label]: "Amount & Gender:",
    [Translations.Texts_Result]: "Results:",
}

const German: TranslationSchema = {
    [Translations.Dates_No_Style]: "Datum ohne Formatierung:",
    [Translations.Dates_No_Style_Time_LocaleString]: "Date::LocaleTimeString ohne Formatierung:",
    [Translations.Dates_Input_Label]: "Datum:",
    [Translations.Dates_WeekdayLong_MonthLong_DayNumeric]: "Datum mit ausgeschriebenen Wochentagen und Monaten:",
    [Translations.Dates_WeekdayLong_MonthLong_DayNumeric_LocaleString]: "Date::LocaleString: mit ausgeschriebenen Wochentagen und Monaten",
    [Translations.Gender]: "Geschlecht",
    [Translations.Gender_Female]: "Weiblich",
    [Translations.Gender_Male]: "Männlich",
    [Translations.Gender_Other]: "Divers",
    [Translations.Guest_Count]: "Anzahl an Gästen",
    [Translations.Language]: "Sprache",
    [Translations.Lang_Name]: "Deutsch",
    [Translations.Numbers_Currency_Label]: "Währung:",
    [Translations.Numbers_Currency_MinFrac_Label]: "Währung mit 'minimumFractionDigits':",
    [Translations.Numbers_Input_Label]: "Zahl:",
    [Translations.Numbers_KByte_Label]: "KiloByte:",
    [Translations.Numbers_No_Style]: "FormattedNumber ohne definierten Style",
    [Translations.Numbers_Percentage_Label]: "Anteil in %:",
    [Translations.Tab_Dates]: "Daten",
    [Translations.Tab_Numbers]: "Zahlen",
    [Translations.Tab_Texts]: "Texte",
    [Translations.Texts_Amount]: "Es {itemCount, plural, =0 {sind keine Gäste} =1 {ist ein Gast} =12 {ist ein duzend Gäste} other {sind # Gäste}} auf der Feier.",
    [Translations.Texts_Amount_Interesting_Values]: "Spezielle Werte: 0, 1, 12",
    [Translations.Texts_Amount_Label]: "Anzahl einzeln:",
    [Translations.Texts_Gender]: "{gender, plural," +
        " =" + Translations.Gender_Male + " {Er}" +
        " =" + Translations.Gender_Female + " {Sie}" +
        " other {Es}} geht auf die Feier.",
    [Translations.Texts_Gender_Label]: "Geschlecht einzeln:",
    [Translations.Texts_Gender_Amount]: "{gender, plural," +
    " =" + Translations.Gender_Male + " {Er}" +
    " =" + Translations.Gender_Female + " {Sie}" +
    " other {Es}} {itemCount, plural, =0 {ist alleine} =1 {ist mit einem Gast} other {ist mit # Gästen}} auf der Feier.",
    [Translations.Texts_Gender_Amount_Label]: "Anzahl & Geschlecht:",
    [Translations.Texts_Result]: "Ergebnisse:",
}

const messages = {
    en: English,
    de: German
}
const availableLanguages = Object.keys(messages)


export {TranslationSchema, English, German, messages, availableLanguages}
