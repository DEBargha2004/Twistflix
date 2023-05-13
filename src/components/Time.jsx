function Time ({ runtime }) {
  if (runtime) {
    if (typeof runtime === 'object') {
      if (runtime.length) {
        runtime = runtime[0]
      } else {
        return '0m'
      }
    }
    if (runtime === runtime % 60) {
      return `${runtime}m`
    } else {
      return `${Math.floor(runtime / 60)}h${runtime % 60}m`
    }
  } else {
    return null
  }
}

export default Time
