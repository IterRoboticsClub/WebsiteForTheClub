
const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve,milliseconds))
}

const doSomething = async() => {
    var msg = "WELCOME TO ITER ROBOTICS CLUB";
    var tmpMsg = " ";
    for (let index = 0; index < msg.length; index++) {
        tmpMsg += msg[index]; 
        document.getElementById("welcomeMessage").innerHTML = tmpMsg;
        await sleep(150)
    } 
}

doSomething()

