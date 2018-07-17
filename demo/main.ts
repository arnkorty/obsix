import app from '../src/index';

console.log(app)
const obsix = new app.create();
const { observe } = obsix

class Demo {
  @observe(({value}) => console.log('demo.state  changed to ' + value))
  state = 2
}

const demo =  new Demo()
demo.state = 234234
window.demo = demo
// 

