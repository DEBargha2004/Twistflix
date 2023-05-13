import { addIf_DoesNot_Exist } from './addIf_DoesNot_Exist'
import { apiKey } from '../assets/apiKey'
import _ from 'lodash'

export async function callCast_Videos ({
  movieItem,
  setCast,
  setRelatedVideos,
  setLocalTrailer,
  setMovies_In_Series,
  combined_list,
  setCombined_list,
  collection,
  setCollection,
  setSimilarMovies,
  setMoreInfo
}) {
  let response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}/credits?api_key=${apiKey}`
  )
  response = await response.json()
  setCast([...response.cast, ...response.crew])
  response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}/videos?api_key=${apiKey}&language=en-US`
  )
  response = await response.json()
  setRelatedVideos(response.results)
  setLocalTrailer(response.results.find(item => item.type === 'Trailer'))
  response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}?api_key=${apiKey}&language=en-US`
  )
  response = await response.json()
  setMoreInfo(response)
  console.log(response)
  let collection_id = response.belongs_to_collection?.id
  if (collection_id) {
    if (!collection[collection_id]) {
      response = await fetch(
        `https://api.themoviedb.org/3/collection/${collection_id}?api_key=${apiKey}&language=en-US`
      )
      response = await response.json()
      setMovies_In_Series(response.parts)
      setCollection(prev => ({ ...prev, [collection_id]: response.parts }))
      setCombined_list(addIf_DoesNot_Exist(response.parts, combined_list))
    } else {
      setMovies_In_Series(collection[collection_id])
      setCombined_list(
        addIf_DoesNot_Exist(collection[collection_id], combined_list)
      )
    }
  }
  console.log('this is reached')
  response = await fetch(
    `https://api.themoviedb.org/3/movie/${movieItem.id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
  )
  response = await response.json()
  setCombined_list(prev => {
    return _.uniqBy([...prev, ...response.results], 'id')
  })
  console.log(response.results)
  setSimilarMovies([...response.results])
}
