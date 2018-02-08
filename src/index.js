
import _ from 'lodash';
import './style.css';
import Timg from './timg.jpg'
import Data from './data.xml'

function component(){
    var element = document.createElement("div");
    element.innerHTML = _.join(["Hello", "webpack"], " ");
    element.classList.add('hello');

    //将图像添加到我们现有的 div。
    var myJpg = new Image();
    myJpg.src = Timg;

    element.appendChild(myJpg);

    console.log(Data)

    return element;
}

document.body.appendChild(component());