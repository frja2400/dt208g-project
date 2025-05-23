# Projekt – Uppsala Tekniska Universitet

Detta är en webbapplikation utvecklad med Angular och TypeScript där användaren kan söka, filtrera och lägga till kurser i ett personligt ramschema. Applikationen är resultatet av mitt slutprojekt för kursen Programmering i TypeScript.

## Grundläggande funktionalitet

Projektet uppfyller samtliga grundkrav:

- **Lista kurser** från en lokal JSON-fil i tabellformat.
- **Filtrering och sökning** baserat på kurskod eller kursnamn.
- **Filtrera på ämnen** genom att välja från en dropdown-meny.
- **Lägg till kurser** i ett personligt ramschema.
- **Sortera på kolumnerna** kurskod, kursnamn, poäng och ämne.
- **Radera enskilda kurser** från ramschemat.
- **Spara valda kurser** i `localStorage` för att bevara data mellan sidladdningar.
- **Antal kurser och sammanlagda poäng** skrivs ut på skärmen.
- **Responsiv design** där tabeller kan scrollas horisontellt på mindre skärmar och navigeringsmenyn anpassas till mobilvy.

## Funktioner för överbetyg

Utöver grundkraven har följande funktionalitet implementerats för att förbättra användarupplevelsen och ge applikationen ett mer professionellt och responsivt gränssnitt:

- **Angular Material**: Implementerat för modern design och responsiva komponenter som tabeller, formulärfält, knappar och select-menyer.
- **MatTableDataSource**: Används för inbyggd sortering, filtrering och paginering av kurslistan.
- **Paginering**: Användaren kan enkelt bläddra mellan kurser om det finns många.
- **Filter-knapp**: En knapp för att rensa både söktext och ämnesval.
- **Radera alla-funktion**: Möjlighet att ta bort samtliga kurser från ramschemat med bekräftelseruta.
- **Dynamiska knappar**: Lägg till-knappen uppdateras automatiskt beroende på om kursen redan är tillagd.
- **Startsida**: En startsida som förklarar syftet med webbplatsen och välkomnar användaren med en headerbild, introduktion och informationsrutor.

## Teknologier

- Angular
- Angular Material
- TypeScript
- HTML/CSS
- LocalStorage
- Git & GitHub

## Projektstruktur

Applikationen består av tre huvudsidor:
- **Startsida**
- **Kurslista**
- **Ramschema**

Varje sida är uppdelad i komponenter, med routing och gemensam navigering.
