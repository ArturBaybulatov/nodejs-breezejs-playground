import _ from 'lodash-fp'
import {inspect as $inspect} from 'util'

export function inspect(obj, depth = 10) {
  if (!Array.isArray(obj)) {
    obj = _.zipObject(_.pairs(obj).sort((a, b) => {
        a = a[0].toLowerCase()
        b = b[0].toLowerCase()
        
        return (a > b) ? 1 : ((a < b) ? -1 : 0)
      }),
    undefined)
  }
  
  return $inspect(obj, {depth})
}
