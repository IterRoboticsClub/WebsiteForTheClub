
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

