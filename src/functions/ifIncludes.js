export function ifIncludes(ids, compare) {
    const { genre_ids: comapre_ids } = compare
    for (let i = 0; i < ids.length; i++) {
      if (comapre_ids.includes(ids[i])) return true
    }
  }
