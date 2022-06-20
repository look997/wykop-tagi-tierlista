
<script>
	
	const tagExtr = (/** @type {string} */ tag)=>tag.slice(1).split("(")[0];
	const tagUrl = (/** @type {string} */ tag)=>`https://www.wykop.pl/tag/${tagExtr(tag)}/`;
	const open = (/** @type {string} */ tag)=>{
		window.open(`https://www.wykop.pl/tag/${tag.slice(1).split("(")[0]}/`, '_blank');
	}
	
	/** @type {TagsLevel} */ export let list;
	/** @type {string} */    export let tagListName;
	
	/** @type {string | null} */ let srcTag = null;
	/** @type {number | null} */ let srcTagNum = null;
	/** @type {number | null} */ let srcLevelNum  = null;
	
	/** @type {TagCallback2} */
	function mousemove (e) {
		if (srcTag) {
			//e.target.style.transform = `translate(${e.clientX - 70}px)`;
		}
	}
	/** @type {TagCallback2} */
	function tagActionReset (e) {
		srcTag = null;
		srcTagNum = null;
		srcLevelNum = null;
		//e.target.releasePointerCapture(e.pointerId);
	}
	
	let ctrl = false;
	let shift = false;
	let alt = false;
	
	/** @type {TagCallback} */
	function mousedown (e, tag, tagNum, levelNum) {
		if (e.altKey) {
			// open(tag);
			const target = /** @type {HTMLDivElement} */(e.target);
			target.click();
			e.preventDefault();
			return;
		} else
		if (e.button===1) {
			open(tag);
		}
		// console.log("tag,ii,i",tag,ii,i);
		//e.target.setPointerCapture(e.pointerId);
		srcTag = tag;
		srcTagNum = tagNum;
		srcLevelNum = levelNum;
	}
	
	/** @type {TagCallback} */
	function mouseup (e, tag, tagNum, levelNum) {
		if ( !(tag && srcTag) ) { tagActionReset(e); return; }
		if ( !(srcTagNum!==null && srcLevelNum!==null) ) { tagActionReset(e); return; }
		
		if (e.ctrlKey) { // tworzy nowy poziom i do niego dodaje tag
			list[srcLevelNum].tags.splice(srcTagNum, 1);
			list.splice(levelNum+1, 0, { tags: [srcTag], label: "" } );
			
			const iii = srcLevelNum>levelNum?srcLevelNum+1:srcLevelNum;
			if (list[iii].tags.length === 0) { // usuwanie pustego szczebla
				list.splice(iii, 1);
			}
		} else { // do istniejącego poziomu, z tego lub innego
			// console.log(tag, "===", srcTag, tag === srcTag)
			if ( tag === srcTag) { tagActionReset(e); return false; }
			// console.log("ee")
			if (!e.shiftKey) { // do końca istniejącego poziomu, z tego lub innego poziomu
				list[srcLevelNum].tags.splice(srcTagNum, 1);
				list[levelNum].tags.push(srcTag);
				
				if (list[srcLevelNum].tags.length === 0) { // usuwanie pustego szczebla
					list.splice(srcLevelNum, 1);
				}
			} else { // za tagiem, do istniejącego poziomu, z tego lub innego poziomu
				//list[i].tags.push(srcTag);
				
				if (levelNum === srcLevelNum) { // za tagiem, do istniejącego tego poziomu
					//nrTaguWPoziomie>ii?ii:
					console.log("początek");
					// list[srcLevelNum].tags.splice(srcTagNumInLevel, 1);
					list[levelNum].tags.splice(tagNum+1, 0, srcTag);
					const i = srcTagNum>tagNum?srcTagNum+1:srcTagNum;
					list[levelNum].tags.splice(i, 1);
					console.log("koniec");
				} else { // za tagiem, do istniejącego poziomu, z innego poziomu
					list[srcLevelNum].tags.splice(srcTagNum, 1);
					list[levelNum].tags.splice(tagNum+1, 0, srcTag);
				}
				
				if (list[srcLevelNum].tags.length === 0) { // usuwanie pustego szczebla
					list.splice(srcLevelNum, 1);
				}
			}
			
		}
		list = list;
		tagActionReset(e);
		localStorage.setItem(tagListName, JSON.stringify(list));
	}
</script>

<svelte:window
	on:keydown={e=>e.key==="Control"&&(ctrl = true)}
	on:keyup={e=>e.key==="Control"&&(ctrl = false)}
	on:keydown={e=>e.key==="Shift"&&(shift = true)}
	on:keyup={e=>e.key==="Shift"&&(shift = false)}
	on:keydown={e=>e.key==="Alt"&&(alt = true)}
	on:keyup={e=>e.key==="Alt"&&(alt = false)}
	on:pageshow={()=>alt = false}
	on:focus={()=>alt = false}
/>
	
<main style="display: flex;"
	class:ctrl
	class:shift
	class:alt
	class:srcTag={srcTag===null?false:true}
>
	
	<div class="sidebar" style="flex-shrink: 0; flex-grow: 0; max-width: 200px;">
	<div
		style="
			height: calc(100vh - 180px);
			position: sticky;
			top: 180px;
			overflow: auto;
		"
	>
		{#each list as level, levelNum}
			{#if level.label.trim().length>0}
			<div class="level" title="tagów na szczeblu: {level.tags.length}"
				on:mousedown={async e=>{
					const target = /** @type {HTMLDivElement} */(e.target);
					if (e.button===1&&target.classList.contains("level")) {
						const val = await prompt("Etykieta poziomu:", level.label);
						list[levelNum].label = val || level.label;
						
						list = list;
						localStorage.setItem(tagListName, JSON.stringify(list));
					} else
					if (e.button===0&&target.classList.contains("level")) {
						document.querySelectorAll("main > .list > div.level")[levelNum].scrollIntoView();
					}
				}}
				on:mouseup={async e=>{
					console.log(e);
					if ( !(srcTag) ) { tagActionReset(e); return; }
					if ( !(srcTagNum!==null && srcLevelNum!==null) ) { tagActionReset(e); return; }
					
					if (e.ctrlKey) {
						list[srcLevelNum].tags.splice(srcTagNum, 1);
						list.splice(levelNum+1, 0, { tags: [srcTag], label: "" } );
						
						const iii = srcLevelNum>levelNum?srcLevelNum+1:srcLevelNum;
						if (list[iii].tags.length === 0) { // usuwanie pustego szczebla
							list.splice(iii, 1);
						}
					} else {
						list[srcLevelNum].tags.splice(srcTagNum, 1);
						list[levelNum].tags.push(srcTag);
						
						if (list[srcLevelNum].tags.length === 0) { // usuwanie pustego szczebla
							list.splice(srcLevelNum, 1);
						}
					}
					list = list;
					tagActionReset(e);
					localStorage.setItem(tagListName, JSON.stringify(list));
				}}
			>
				{level.label}
			</div>
			{/if}
		{/each}
	</div>
	</div>
	
	<div class="list"
	>
	{#each list as level, levelNum}
		<div class="level" style="cursor: default;" on:mousedown={async e=>{
			const target = /** @type {HTMLDivElement} */(e.target);
			if (e.button===1&&target.classList.contains("level")) {
				const val = await prompt("Etykieta poziomu:", level.label);
				list[levelNum].label = val || level.label;
				
				list = list;
				localStorage.setItem(tagListName, JSON.stringify(list));
			}
		}}>
			
			{#each level.tags as tag, tagNum}
				<div class="tag" draggable=false
					on:mousemove={e=>mousemove(e)}
					on:mousedown={e=>mousedown(e, tag, tagNum, levelNum)}
					on:mouseup={e=>mouseup(e, tag, tagNum,  levelNum)}
				><a href="{tagUrl(tag)}" target="about:_blank">{tag}</a></div>
			{/each}
			{level.label}
		</div>
	{/each}
	</div>
</main>

<style>
	.list {
		display: flex;
		flex-direction: column;
	}
	.level {
		padding: 8px 10px;
		flex-wrap: wrap;
    display: flex;
    gap: 3px 3px;
		position: relative;
    transition: max-height 0.15s ease-out;
	}
	.level:hover {
		background-color: #fbf6f6;
	}
	.tag {
		padding: 3px 5px;
		background-color: #e6e6e6;
		border-radius: 5px;
		cursor: grabbing;
		user-select: none;
		position: relative;
	}
	.tag:hover {
		background-color: #ddd;
	}
	.tag:active {
		background-color: silver;
	}
	
	main:not(.ctrl):not(.shift).srcTag:active .tag:hover:not(:active) ~ .tag:last-of-type:after,
	main:not(.ctrl):not(.shift).srcTag:active .tag:hover:not(:active):last-of-type:after,
	main:not(.ctrl).shift.srcTag:active .tag:hover:not(:active):after {
		content: "";
		--h: 10px;
		--w: 4px;
		height: var(--h);
		width: var(--w);
		display: block;
		position: absolute;
		background: red;
		z-index: 1;
		left: calc(100% - var(--w) / 2 );
		top: calc(50% - var(--h) / 2 );
		border-radius: 10px;
	}
	main.ctrl.srcTag:active .level:hover:after {
		content: "";
		--h: 4px;
		--w: 20px;
		height: var(--h);
		width: var(--w);
		display: block;
		position: absolute;
		background: red;
		z-index: 1;
		left: calc( var(--w) / 2 );
		top: calc(100% - var(--h) / 2 );
		border-radius: 10px;
	}
	
	main:not(.alt) .tag > a {
		pointer-events: none;
	}
	
	main.alt .tag > a {
		pointer-events: auto;
	}
	
	main > .sidebar .level {
		cursor: default;
	}
	main.srcTag > .sidebar .level {
		cursor: grabbing;
	}
</style>
