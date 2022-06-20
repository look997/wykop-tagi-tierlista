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
	Użycie listy z URLa - {location.origin}?url=https://example.com/lista.json
	<br>
	...gdzie https://example.com/lista.json to dowolny URL do pliku JSON z listą
	<br>
	<br>
	Sprawdź format pliku JSON listy,<br>
	kopiując listę do schowka - skrót <kbd>Ctrl</kbd>+<kbd>C</kbd> lub (o ile obsługuje) przycisk "Skopiuj listę do schowka",
	<br>po czym sklej do dowolnego edytor tekstu
</div>

<style>

div {
	border: 1px solid #aaa;
	border-radius: 4px;
	padding: 15px 15px;
}
</style>
