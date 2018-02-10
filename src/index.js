
import _ from 'lodash';
// import './style.css';
// import Timg from './timg.jpg'
// import Data from './data.xml'
import printMe from './print.js';
import './style.css';

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

// document.body.appendChild(component());
//当怕print.js改变导致页面重新渲染时，重新获取渲染的元素
let element = component();
document.body.appendChild(element);



if(module.hot){
    module.hot.accept('./print.js', function(){
        console.log('Accept the updated printMe module!');
        // printMe();
        document.body.removeChild(element);
        element = component();
        //重新渲染页面后，component更新click事件
        document.body.appendChild(element);
    })
}