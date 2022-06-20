/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}

declare type TagsLevel = {tags:string[],label:string}[];
declare function TagCallback (
	e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; },
	tag: string,
	tagNum: number,
	levelNum: number
);
declare function TagCallback2 (
	e: MouseEvent & { currentTarget: EventTarget & HTMLDivElement; }
);
