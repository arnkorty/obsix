import Event from './event';
import { DEFAULT_ACTION } from './constant'
import { observeAttr, observeObject } from './decorator'

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

  // observeObject(){

  // }

  // observeAttr(cb, args){

  //   return observeAttr(this.event, cb, args)
  // }

  observe = (cb: any = null) => {
    const event = this.event
    console.log('event', event)
    return function(target, propertyKey, descriptor) {
      if(propertyKey) {
        console.log(propertyKey)
        return observeAttr(event, cb, [target, propertyKey])
      } else {
        return observeObject(event, cb, [target])
      }
    }
  }
}
