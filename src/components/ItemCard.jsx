import Moviecard from './Moviecard'
import Castcard from './Castcard'
import Videocard from './Videocard'
import SeasonCard from './SeasonCard'

export function ItemCard ({ type, Item, content_type }) {
  if (type === 'long_horizontal') {
    return <Moviecard Item={Item} type={type} content_type={content_type} />
  } else if (type === 'long_vertical') {
    return <Castcard Item={Item} />
  } else if (type === 'scaled_both') {
    return <Videocard Item={Item} />
  } else if (type === 'season') {
    return <SeasonCard Item={Item} />
  }
}
