import _ from "lodash"

export function combineSeries(prev,newCombined){
    let combined_Array = [].concat(...prev,...newCombined)
    combined_Array = _.uniqBy(combined_Array,'id')
    return combined_Array;
}