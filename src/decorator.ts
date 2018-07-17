import {PREFIX, DEFAULT_ACTION} from './constant';
export const observeAttr = (event: any, cb: any, args: any) => {
  const [obj, attr, ...other] = args

  const newAttr = `${PREFIX}${attr}`
  const eventType = [obj, attr]
  if (cb) {
    event.on(eventType, cb)
  }
  const properties:any = {}

  properties[attr] = {
    get() {
      return this[newAttr]
    },
    set(val:any) {
      this[newAttr] = val
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
  }
  properties[`${PREFIX}${attr}`] = {
    value: obj[attr],
    writable: true
  }

  Object.defineProperties(obj, properties)

}

export const observeObject = (event, cb, args) => {

}
