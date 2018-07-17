import { DEFAULT_ACTION } from './constant'

// 简单事件管理器
export default class Event {
  listenMaps:any = new WeakMap();
  on (event: any, cb: Function) : void {
    const listens = this.listenMaps.get(event) || []
    listens.push(cb)
    this.listenMaps.set(event, listens) 
  }
  once (event:string, cb: Function) {
    const listens = this.listenMaps.get(event) || []
    listens.push({
      type: 'once',
      fn: cb
    })
    this.listenMaps.set(event, listens)  
  }
 
  emit (event: any, payload: any) {
    const listens = this.listenMaps.get(event)
    this.run(listens, payload)
    const defaults = this.listenMaps.get(DEFAULT_ACTION);
    this.run(defaults, payload)
  }

  private run(listens: any, payload: any) {
    if (listens) {
      for(let i = 0, l =  listens.length; i < l; i ++) {
        const cb = listens[i]
        if(!cb) {
          break;
        }
        if(cb.type === 'once') {
          l --
          listens.splice(i, 1)
          cb.fn.call(null, payload)
        } else {
          cb.call(null, payload)
        }
      }
    }
  }
}
