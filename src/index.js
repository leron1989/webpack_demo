
import _ from 'lodash';
// import './style.css';
// import Timg from './timg.jpg'
// import Data from './data.xml'
import printMe from './print.js';

function component(){
    var element = document.createElement("div");
    var btn = document.createElement('button');

    element.innerHTML = _.join(["Hello", "webpack"], " ");
    // element.classList.add('hello');

    // //将图像添加到我们现有的 div。
    // var myJpg = new Image();
    // myJpg.src = Timg;

    // element.appendChild(myJpg);

    // console.log(Data)

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;

    element.appendChild(btn);

    return element;
}

document.body.appendChild(component());