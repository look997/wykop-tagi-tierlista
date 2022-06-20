/** @param {TagsLevel} list */
export const tagsCount = list => {
	let tagsNumber = 0;
	for (const level of list) {
		tagsNumber = tagsNumber+level.tags.length;
	}
	return tagsNumber;
}
