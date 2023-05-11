import { existance_Checker } from './existance_Checker'

export function addIf_DoesNot_Exist (arr, combined_list) {
  let newArray = []
  arr.forEach(item => {
    if (!existance_Checker(combined_list, item)) {
      arr.push(item)
    }
  })
  return newArray
}
