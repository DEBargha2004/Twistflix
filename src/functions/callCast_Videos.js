import { addIf_DoesNot_Exist } from './addIf_DoesNot_Exist'
import { apiKey } from '../assets/apiKey'

export async function callCast_Videos ({
  movieItem,
  setCast,
  setRelatedVideos,
  setLocalTrailer,
  setMovies_In_Series,
  combined_list,
  setCombined_list,
  collection,
  setCollection
}) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}/credits?api_key=${apiKey}`
  )
  response = await response.json()
  setCast(response.cast)
  response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}/videos?api_key=${apiKey}&language=en-US`
  )
  response = await response.json()
  setRelatedVideos(response.results)
  setLocalTrailer(response.results.find(item => item.type === 'Trailer'))
  response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}?api_key=cbcd1ac0703914747341f9a905931ef9&language=en-US`
  )
  response = await response.json()
  let collection_id = response.belongs_to_collection.id
  if (!collection[collection_id]) {
    response = await fetch(
      `https://api.themoviedb.org/3/collection/${collection_id}?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setMovies_In_Series(response.parts)
    setCollection(prev => ({ ...prev, [collection_id]: response.parts }))
    addIf_DoesNot_Exist(response.parts, combined_list, setCombined_list)
  } else {
    setMovies_In_Series(collection[collection_id])
    addIf_DoesNot_Exist(
      collection[collection_id],
      combined_list,
      setCombined_list
    )
  }
}