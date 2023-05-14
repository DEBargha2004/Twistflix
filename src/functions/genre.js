import movieType from "./movieType"
function genre(id, setGenre_type, genres) {
    id.forEach(item => {
        setGenre_type(prev => (
            [...prev, ...movieType(item, genres)]
        ))
    })
}
export default genre;