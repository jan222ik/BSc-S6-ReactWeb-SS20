export enum Translations {
    Gender,
    Gender_Female,
    Gender_Male,
    Gender_Other,
    Item_Count,
    Lang_Name,
    Language,
    Tab_Dates,
    Tab_Numbers,
    Tab_Texts,
    Texts_Amount,
    Texts_Amount_Interesting_Values,
    Texts_Amount_Label,
    Texts_Gender,
    Texts_Gender_Label,
    Texts_Gender_Amount,
    Texts_Gender_Amount_Label,
    Texts_Result
}

type TranslationSchema = {
    [Translations.Gender]: string,
    [Translations.Gender_Female]: string,
    [Translations.Gender_Male]: string,
    [Translations.Gender_Other]: string,
    [Translations.Item_Count]: string,
    [Translations.Lang_Name]: string,
    [Translations.Language]: string,
    [Translations.Tab_Numbers]: string,
    [Translations.Tab_Dates]: string,
    [Translations.Tab_Texts]: string,
    [Translations.Texts_Amount]: string,
    [Translations.Texts_Amount_Interesting_Values]: string,
    [Translations.Texts_Amount_Label]: string,
    [Translations.Texts_Gender]: string,
    [Translations.Texts_Gender_Label]: string,
    [Translations.Texts_Gender_Amount]: string,
    [Translations.Texts_Gender_Amount_Label]: string,
    [Translations.Texts_Result]: string,
}

const English: TranslationSchema = {
    [Translations.Gender]: "Gender",
    [Translations.Gender_Female]: "Female",
    [Translations.Gender_Male]: "Male",
    [Translations.Gender_Other]: "Other",
    [Translations.Item_Count]: "Item Count",
    [Translations.Language]: "Language",
    [Translations.Lang_Name]: "English",
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
    [Translations.Gender]: "Geschlecht",
    [Translations.Gender_Female]: "Weiblich",
    [Translations.Gender_Male]: "Männlich",
    [Translations.Gender_Other]: "Divers",
    [Translations.Item_Count]: "Anzahl an Gegenständen",
    [Translations.Language]: "Sprache",
    [Translations.Lang_Name]: "Deutsch",
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

export {TranslationSchema, English, German}
