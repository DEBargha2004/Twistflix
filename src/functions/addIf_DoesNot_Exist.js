import { existance_Checker } from './existance_Checker'
import _ from 'lodash'

export function addIf_DoesNot_Exist (arr, combined_list) {
  let newArray = []
  newArray = arr.concat(combined_list)
  newArray = _.uniqBy(newArray,'id')
  return newArray
}
