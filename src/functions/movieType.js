function movieType(id, genres) {
    let type = genres ? genres.map(item => {
        if (item.id === id) return item.name
    }) : []
    let newArray = []
    for (let i = 0; i < type.length; i++) {
        if (type[i] !== undefined) {
            newArray.push(type[i])
        }
    }
    return newArray
}

export default movieType;