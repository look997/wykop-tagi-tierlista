<svelte:head><title>Tier Lista tagów z Wykopu</title></svelte:head>
<script>
	import List from "$lib/List.svelte";
	import Buttons from "$lib/Buttons.svelte";
	import { list as listDef, updateDate } from "$lib/lista.js";
	import { tagsCount } from "$lib/tagsCount.js";
	
	/** @type {string} */
	const ownTagsListName = "ownTagsList";
	/** @type {string} */
	let defTagListName = "tagsList";
	/** @type {string} */
	let urlTagListName = "urlList";
	
	/** @type {number} */
	let tagsNumber;
	/** @type {string} */
	let tagListName;
	
	const url = (new URLSearchParams(location.search)).get("url");
	
	/** @type {TagsLevel} */
	let list = [];
	(async ()=>{
		if (url) {
			tagListName = "urlList";
			const res = await (await fetch(url)).json();
			console.log("res",res);
			list = res;
			tagsNumber = tagsCount(list);
			// localStorage.setItem(tagListName, JSON.stringify(list));
		} else {
			const ownStorage = localStorage.getItem(ownTagsListName);
			if (ownStorage === null) {
				tagListName = defTagListName;
				const storage = localStorage.getItem(tagListName);
				list = storage? JSON.parse(storage) : JSON.parse(JSON.stringify(listDef));
				tagsNumber = tagsCount(list);
			} else {
				const storage = ownStorage;
				tagListName = ownTagsListName;
				list = JSON.parse(storage);
				tagsNumber = tagsCount(list);
			}
		}
	})();
</script>

<Buttons bind:list {listDef} bind:tagListName bind:tagsNumber {ownTagsListName}
	{defTagListName} />
	
<div class="info">
	<span
		title="{url?
			"zmiany Listy z URLa NIE SĄ zapisywane!"
			:
			"automatycznie zapisuje zmiany w liście"
		}"
	>{url?"zmiany Listy z URLa NIE SĄ zapisywane!":"zmiany zapisane w przeglądarce"}</span>
	<span title="łącząc tagi, zmniejsza się liczba szczebli">
		aktualnie szczebli: {list.length}</span>
	<!-- <span
		title="data pobrania statystyk tagów z wykop.pl/tagi"
	>aktualizacja źródła: {url?"z URLa":"03-06-2022"}</span> -->
</div>

{#if tagListName===urlTagListName}
<h1>Tier Lista
	<a target="about:_blank" href="{url}">{tagsNumber||""} tagów</a> z URLa</h1>
{:else if tagListName===ownTagsListName}
<h1>Tier Lista {tagsNumber||""} tagów z wklejonej listy</h1>
{:else}
<h1>Tier Lista
	<a target="about:_blank" href="https://www.wykop.pl/tagi/">{tagsNumber||""} tagów</a>
z wykop.pl</h1>
{/if}

<List bind:list {tagListName} />

<style>
	.info {
		padding: 5px 0 0 5px;
		color: rgb(133, 132, 132);
		display: inline-flex;
		gap: 15px;
	}
</style>
