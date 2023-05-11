import { existance_Checker } from './existance_Checker'
import _ from 'lodash'

export function addIf_DoesNot_Exist (arr, combined_list) {
  let newArray = []
  console.log(arr);
  newArray = arr.concat(combined_list)
  console.log(newArray);
  newArray = _.uniqBy(newArray,'id')
  console.log(newArray);
  return newArray
}
