export function ifIncludes(ids, compare) {
    const { genre_ids,genres } = compare
    for (let i = 0; i < ids.length; i++) {
      if ((genre_ids || genres).includes(ids[i])) return true
    }
  }
