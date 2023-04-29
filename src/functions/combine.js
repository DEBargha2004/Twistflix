const combine = (nested_list) => {
    let combined_list = []
    for (let i = 0; i < nested_list.length; i++) {
        console.log(nested_list);
        combined_list.push(...nested_list[i].movieList)
    }
    return combined_list;
}

export default combine;