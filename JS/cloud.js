
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve,milliseconds))
}

const doSomething = async() => {
    var msg = "WELCOME TO ITER ROBOTICS CLUB";
    var tmpMsg = " ";
    for (let index = 0; index < msg.length; index++) {
        tmpMsg += msg[index]; 
        document.getElementById("welcomeMessage").innerHTML = "<h1>"+tmpMsg+"</h1>";
        await sleep(150)
    } 
}

doSomething()
var val = 0;
var color = ["blue","red","darkgreen","yellow",
            "green","aquamarine","white","pink",
            "aqua","chartreuse","crimson","darkblue",
            "darkmagenta","deeppink","firebrick",
            "hotpink","indigo","lawngreen","lime"];
function changeColor() {
    document.body.style.setProperty('--colorOverall',color[val]);
    val++;
    if (val>color.length) {
        val = 0;
    }
}

function randColor() {
    val = Math.floor((Math.random() * color.length) + 1);
    changeColor();
}