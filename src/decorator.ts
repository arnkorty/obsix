import {ENTRY_KEY, DEFAULT_ACTION} from './constant';
import Entry from './entry';

export const decoratorProperty = (event: any, cb: any, args: any) => {
  const [obj, attr, ...other] = args

  const originVal = obj[attr]

  if (!obj[ENTRY_KEY]) {
    obj[ENTRY_KEY] = new Entry()
  }
  obj[ENTRY_KEY][attr] = originVal
  
  const eventType = [obj, attr]
  if (cb) {
    event.on(eventType, cb)
  }
 
  Object.defineProperty(obj, attr, {
    get() {
      return this[ENTRY_KEY][attr]
    },
    set(val:any) {
      this[ENTRY_KEY][attr] = val
      const payload = {
        value: val,
        object: this,
        action: 'update'
      }
      if (cb) {
        event.emit(eventType, payload)
      }
      event.emit(DEFAULT_ACTION, payload)
    }
  })

}

export const decoratorObject = (event, cb, args) => {

}
