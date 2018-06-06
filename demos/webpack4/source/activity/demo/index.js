import _ from 'lodash'
import template from './html/index.ejs'

let dom = template({
    name:'ly'
})

console.log(dom)

let app = document.getElementById('app')

// console.log(header)
app.innerHTML = dom;