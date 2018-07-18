import app from '../src/index';

console.log(app)
const obsix = new app.create({
});
const { observe } = obsix
class Demo {
  @observe(({value}) => console.log('demo.state  changed to ' + value))
  state = 2
}
class Nemo {
  state = 2
}
const demo =  new Demo()
const nemo = new Nemo()
console.time('test')
for(let i = 0; i < 10000; i ++) {
  demo.state = i
}
console.timeEnd('test')
console.time('ntest')
for(let i = 0; i < 10000; i ++) {
  nemo.state = i
  console.log('demo.state  changed to ' + i)
}
console.timeEnd('ntest')
// ntest
