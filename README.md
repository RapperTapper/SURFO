# SURFO

## Projekt-Beschreibung und Idee
Surfo zeigt dir die relevantesten Daten für deine Surfaktivitäten in den Schweizer Fliessgewässern. Dieses Projekt ist der Prototyp mit den Daten vom Standort an den Schwellen in Thun. Die Livedaten werden nicht nur angezeigt, sondern auch in einer Datenbank gesammelt. So kann im Chart etwas in die Vergangenheit geschaut werden.
Philosophie... etc... ergänzen??? -> ca. 500 Zeichen.

## Learnings
### Was hat funktioniert?
- Idee: Gross angedacht, frisch, mit etwas interaktivität, visuell ansprechend.
- Animationen: Die Schaltflächen hin und her, wie auch responsiveness
- Zusammenarbeit im Team: Klare Rollenverteilung, Skill- und Ressouren-Einsatz, beste Ergänzungen
- ChartJs: läuft, wir sind happy
### Was hat nicht funktioniert?
- Images: Hintergrundbild (Holzwand) auf der Info-Seite hat nie wirklich korrekt funktioniert. Egal was versucht wurde. irgendwann musste man sich geschlagen geben.
- HTML und CSS: Teilweise war es schwer die Fehler zu finden. Z.B. wenn Parent-Element eine Flexbox ist und somit die Breite von Elementen teils nicht so gezielt angesprochen werden können, wie sonst etc.
- Font-size: Diese liess uns schön in einen Fehler laufen. Aktuell haben wir nicht herausgefunden, wie man dies korrigieren könnte ohne viel Aufwand zu haben. Beim Coden wurde für den Desktop der Browser mit 150% grösse verwenden. Für Mobile sieht alles tipptopp aus - abgesehen von der Holzwand.
### Was waren Schwierigkeiten?
- Zusammenarbeit im selben Code mit den Vorgegebenen Tools zu Arbeiten.
- Github → individual pushes
- SFTP → Dateien direkt auf Server on save
- FileZilla → (image upload)
- etc. ergänzen

## Benutzte Ressourcen
- Visual Studio Code
- Github Copilot
- ChatGPT
- Ausbildungsserver -> aktuell nur noch die Datenbank
- Hostpoint -> Server / Hosting
- Crontool -> fake Cronejob, da noch nicht bei Hostpoint eingerichtet
### Validatoren
- HTML: [https://validator.w3.org/](https://validator.w3.org/)
- CSS: [https://jigsaw.w3.org/css-validator/](https://jigsaw.w3.org/css-validator/)
- JS: [https://www.site24x7.com/tools/javascript-validator.html](https://www.site24x7.com/tools/javascript-validator.html)

## Mitwirkende
Raphael Schnell, Julia Miller, Jan Vils

## Notizen zum Code
Bei der Präsentation hatten wir damals einen Surfer, der sich mit den Wellen nach oben und unten bewegte. Wir haben auch Stilgründen diese Animation nun wieder aus dem «load-live-daten.js» gelöscht. Der Code ist jedoch in einem neuen file «load-live-daten-mit-up-and-down-animation.js» vorhanden. Wenn dieses anstelle von «load-live-daten.js» verlinkt wird, bewegt er sich direkt nach dem Seitenload wieder kurz etwas hoch und runter. Feature könnte in Zukunft auch ausgelöst werden, wenn auf den Surfer geklickt wird.