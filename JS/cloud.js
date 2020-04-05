function printMsg(){
    var msg = "WELCOME TO ITER ROBOTICS CLUB" ;
    var tempMsg = " ";
    for (let index = 0; index < msg.length;index++) {
        tempMsg += msg[index];
        document.getElementById("welcomeMessage").innerHTML = tempMsg;
        setTimeout(delay(),1000);
    }
}

function delay() {
    for (let index = 0; index < 9999; index++) {
        var element = index;
        
    }
}
