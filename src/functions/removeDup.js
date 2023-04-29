function removeDup(arr, current) {
    let unique = []
    current = JSON.stringify(current)
    console.log(current);
    for (let i = 0; i < arr.length; i++) {
        const stringed_obj = JSON.stringify(arr[i])
        if (!unique.includes(stringed_obj) && stringed_obj !== current) unique.push(stringed_obj)
    }

    unique = unique.map(item => (
        JSON.parse(item)
    ))
    //console.log(unique);
    return unique
}

export default removeDup;