export const similarity = (a: string, b: string) => {
  const al = a.length;
  const bl = b.length;
  let i = 0;
  let j = 0;
  let k = 0;
  for (; j < bl; j++) {
    if (i >= al) {
      break;
    } else if (a[i] === b[j]) {
      if (i++ === 0)
        k = j;
    }
  }
  if (i < al) return 0;

  return 1 / (1 + j - i - k) - (k / bl);
}
export const fuzzy = (term: string, words: string[]) => words.map(word => {
  return {
    s: similarity(term, word),
    word,
  }
});

export const search = (term: string, words: string[]) => {
  const items = fuzzy(term, words)
    // .filter(item => item.similarity >= 0.5);
    .filter(item => item.s > 0.2);
  items.sort((a, b) => b.s - a.s);
  return items.map(item => item.word);
}