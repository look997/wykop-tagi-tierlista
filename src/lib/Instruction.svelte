<script>
	export let instr = false;
</script>
<div hidden={!instr}>
	Lista składa się z kolumny szczebli(eng. <i lang=en>tier</i>), początkowo w jednym szczeblu jest jeden tag.<br>
	<br>
	Początkowo lista zawiera "Popularne tagi (z ostatnich 30 dni)" z
	<a target="about:_blank" href="https://www.wykop.pl/tagi/">wykop.pl/tagi/</a>, z dnia 03-06-2022, ale można wkleić dowolną listę ze schowka, lub z URLa.
	<br>
	<br>
	Skróty<br>
	Chwyć i Upuść (Domyślnie) - przesuwa tag na koniec szczebla
	(czerwony znaczek pokazuje gdzie)<br>
	Chwyć i Shift+Upuść - przesuwa za wskazywany tag<br>
	Chwyć i Ctrl+Upuść - tworzy nowy szczebel i dodaje do niego tag<br>
	<br>
	Alt+Klik - otwiera stronę tagu w nowej karcie<br>
	Środkowy Przycisk myszy (na tagu) - otwiera stronę tagu w nowej karcie
	<br>
	<br>
	Środkowy Przycisk Myszy (na pustym polu szczebla, nie na tagu) - ustaw etykietę dla szczebla
	<br>
	<br>Zabranie ostatniego tagu z danego szczebla, usuwa ten szczebel
	- etykieta wtedy znika, razem z usuniętym szczeblem
	<br>
	<br>
	Wklejanie listy ze schowka - skrót <kbd>Ctrl</kbd>+<kbd>V</kbd> lub (o ile obsługuje) przycisk "Wklej listę ze schowka"
	<br>
	<br>
	zmiany Listy z URLa NIE SĄ zapisywane!<br>
	zmiany Listy ze schowka są zapisywane (ale nadpisują dotychczasową listę)
	<br>
	<br>
	Użycie listy z URLa - {location.origin}?url=https://raw.githubusercontent.com/look997/wykop-tagi-tierlista/main/static/example-list.json
	<br>
	...gdzie część adresu za znakiem `=`, to dowolny URL do pliku JSON z listą
	<br>
	<br>
	Sprawdź format pliku JSON listy,<br>
	kopiując listę do schowka - skrót <kbd>Ctrl</kbd>+<kbd>C</kbd> lub (o ile obsługuje) przycisk "Skopiuj listę do schowka",
	<br>po czym wklej do dowolnego edytor tekstu
	<br>
	<br>
	Zaawansowane<br>
	Żeby uzyskać aktualną listę popularności tagów, wejdź na https://www.wykop.pl/tagi/ i w devTools użyj komendy:<br>
	<code>document.querySelector("div.fix-tagline").textContent.replaceAll(/\s|\t|\n/g,"").replaceAll(")",")\n").split(/\n/).map(a=>({"{"}tags:[a],label:""}));</code>
	<br>
	i wklej na stronie tier listy.
</div>

<style>

div {
	border: 1px solid #aaa;
	border-radius: 4px;
	padding: 15px 15px;
}
</style>
