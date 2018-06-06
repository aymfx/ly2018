import _ from 'lodash';
import './style.css';
import tu from './a.jpg'
function component(){
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'ly'], ' ');
    var img = document.createElement('img');
    img.src = tu;
    element.appendChild(img);
    return element;
}
document.body.appendChild(component());