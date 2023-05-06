import Moviecard from './Moviecard';
import Castcard from './Castcard'
import Videocard from './Videocard';

export function ItemCard({ type, Item }) {
    if (type === 'movie') {
        return <Moviecard Item={Item}  />
    } else if (type === 'cast') {
        return <Castcard Item={Item}  />
    } else if (type === 'related') {
        return <Videocard Item={Item}  />
    }
}
