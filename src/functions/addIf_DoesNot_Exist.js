import { existance_Checker } from './existance_Checker'

export function addIf_DoesNot_Exist (arr, combined_list, setCombined_list) {
  arr.forEach(item => {
    if (!existance_Checker(combined_list, item)) {
      setCombined_list(prev => [...prev, item])
    }
  })
}
