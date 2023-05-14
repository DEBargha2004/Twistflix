import { ifIncludes } from "./ifIncludes";
import _ from "lodash";


export function similar(current,combined_list){
    let container = []
    combined_list?.forEach((item,index)=>{
        if(ifIncludes(current.genres,item)){
            container.push(item)
        }
    })
    container = _.uniqBy(container,'id')
    let currentIndex = _.findIndex(container,{id : current.id})
    if(currentIndex >= 0){
        container.splice(current,1)
    }
    return container
}