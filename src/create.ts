import Event from './event';
import { DEFAULT_ACTION } from './constant'
import { decoratorProperty, decoratorObject } from './decorator'

export default class Create {
  event = new Event()
  subscribes : any
  constructor({subscribes=[]} = {}) {
    // this.event  = new Event()
    this.subscribes = subscribes
    this.subscribes.forEach(subscribe => {
      this.event.on(DEFAULT_ACTION, subscribe)
    });
  }

  observe = (cb: any = null) => {
    const event = this.event
    return function(target, propertyKey?:string, descriptor?:PropertyDescriptor) {
      if(propertyKey) {
        return decoratorProperty(event, cb, [target, propertyKey])
      } else {
        return decoratorObject(event, cb, [target])
      }
    }
  }
}
