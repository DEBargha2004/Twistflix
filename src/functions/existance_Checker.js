export function existance_Checker (arr, movie) {
  let result = arr.find(item => {
    return item.id === movie.id
  })
  return Boolean(result)
}
