<script>
	import { dialogs } from "svelte-dialogs";
	
	import Instruction from "$lib/Instruction.svelte";
	
	import { tagsCount } from "$lib/tagsCount.js";
	
	/** @type {number} */
	export let tagsNumber;
	
	export /** @type {string} */
	let ownTagsListName;
	export /** @type {string} */
	let defTagListName;
	
	export /** @type {string} */
	let tagListName;
	export /** @type {TagsLevel} */
	let list;
	export /** @type {TagsLevel} */
	let listDef;
	
	// let aa = "";
	/** @type {HTMLSpanElement} */
	let cEl;
	
	// /** @type {string} */
	// let url = "";
	
	let instr = false;
</script>

<pre bind:this={cEl} style="display: block; width: 10px; user-select: text; pointer-events: none; opacity: 0; height: 0.2px; overflow: hidden;"></pre>

<div style="display: flex; gap: 10px;">
	<button on:click={_=>instr=!instr}>Instrukcja</button>
	
	<button on:click={async e=>{
		if (await dialogs.confirm(`Usunąć BEZPOWROTNIE wszystkie zmiany,
		do wartości początkowych?`)) {
			list = JSON.parse(JSON.stringify(listDef));
			tagsNumber = tagsCount(list);
			tagListName = defTagListName;
			localStorage.setItem(tagListName, JSON.stringify(list, null, '\t'));
		}
		}}>Zresetuj listę</button>
		
	<button
		disabled={!navigator.clipboard.writeText}
		title={!navigator.clipboard.writeText?"nie obsługuje, użyj Ctrl+C":"Ctrl+C też działa"}
		on:click={async e=>{
		// if (await dialogs.confirm(`Skopiować listę do schowka?`)) {
		// 	navigator.clipboard.writeText(JSON.stringify(list, null, '\t'));
		// }
		
		cEl.textContent = JSON.stringify(list, null, '\t');
		const range = document.createRange();
		range.selectNode(cEl);
		let sel = window.getSelection();
		if (sel===null) { return; }
		sel.removeAllRanges();
		sel = window.getSelection();
		if (sel===null) { return; }
		sel.addRange(range);
		if (await dialogs.confirm(`Skopiować listę do schowka?`)) {
			
			/* Copy the text inside the text field */
			document.execCommand("copy");
			cEl.textContent = null;
			if (sel===null) { return; }
			sel.removeAllRanges();
			// e.preventDefault();
			// e.stopPropagation();
		}
	}}>Skopiuj listę do schowka</button>
	
	<button
		disabled={!navigator.clipboard.readText}
		title={!navigator.clipboard.readText?"nie obsługuje, użyj Ctrl+V":"Ctrl+V też działa"}
		on:click={async _=>{
			const clip = await navigator.clipboard.readText();
			// console.log("clip",clip);
			if (!clip) { return; }
			try {
				const json = JSON.parse(clip);
				if (Array.isArray(json) && await dialogs.confirm(`Wkleić listę ze schowka?
				Nadpisać BEZPOWROTNIE wszystkie zmiany?`)) {
					list = json;
					tagsNumber = tagsCount(list);
					tagListName = ownTagsListName;
					localStorage.setItem(tagListName, JSON.stringify(list, null, '\t'));
				}
			} catch (err) {}
	}}>Wklej listę ze schowka</button>
	
	<button
		title="Sortuj tagi na szczeblach, od najpopularniejszego"
		on:click={async _=>{
			const k = (/** @type {string} */ v)=>v.split("(")[1].split(")")[0].replace("k","000");
			list.forEach((level, i)=>{
				list[i].tags = [...list[i].tags].sort((a,b)=> Number(k(b)) - Number(k(a)) );
			});
			list = list;
			localStorage.setItem(tagListName, JSON.stringify(list, null, '\t'));
	}}>Sortuj</button>
	
	<!-- <button on:click={async _=>{
		const options = {
			"method": "POST",
			headers: {
				"content-type": "application/json",
				"Api-key": "Your Api key",
				// "Security-key": "Your security key",
				"Private": "true"
			},
			body: JSON.stringify(list)
		};
		
		const res = await (await fetch("https://json.extendsclass.com/bin", options)).json();
		console.log("res",res);
		url = `${location.origin}?url=${res.uri}`;
	}}>Utwórz link</button> {url} -->
	
</div>
<!-- <br> -->
<!-- {aa} -->

<Instruction {instr} />

<svelte:body
	on:copy={async e=>{
		const target = /** @type {HTMLElement} */(e.target);
		// console.log(e, target.dataset.testid);
		const sel = window.getSelection();
		if ( !e.clipboardData || (sel && sel.toString().length>0) ) { return; }
		const json = JSON.stringify(list, null, '\t');
		// console.log("data",data);
		// aa = "przed"
		if (
			target.dataset.testid==="dialog-content__footer"
			||
			confirm(`Skopiować listę do schowka?`)
		) { // musi bez await, bo api setData odrzuca
			// aa = "wew"
			e.clipboardData.setData("text/plain", json);
			e.preventDefault();
		}
	}}
/>
<svelte:window
	on:paste={async e=>{
		if (!e.clipboardData) { return; }
		// console.log("e.clipboardData",e.clipboardData);
		// const clip = await navigator.clipboard.readText();
		const clip = e.clipboardData.getData('Text');
		// console.log("clip",clip);
		// aa = "wew"+clip.toString()
		if (!clip) { return; }
		try {
			const json = JSON.parse(clip);
			e.stopPropagation();
			e.preventDefault();
			if (Array.isArray(json) && await dialogs.confirm(`Wkleić listę ze schowka?
			Nadpisać BEZPOWROTNIE wszystkie zmiany?`)) {
				list = json;
				tagsNumber = tagsCount(list);
				tagListName = ownTagsListName;
				localStorage.setItem(tagListName, JSON.stringify(list, null, '\t'));
			}
		} catch (err) {}
	}}
/>
