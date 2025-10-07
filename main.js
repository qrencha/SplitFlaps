let side;
let angle = 0;
let hSide;
let imgT = []
let imgB = []
let loadedBImage;   // Letter Bottom
let loadedTImage;   // Letter Top

let angleInc;   // angular Increment
let oneSplitflap;
let splitflapsStop = [];
let sfRows = [];
let sfSound;
let frames = 60 * 6; //frame count for the saved GIF

let message = [];
let message2 = [];

// let message = [72, 69, 76, 76, 79,32,87,79,82,76,68,33]; // HELLO WORLD!
// let message = [72,65,80,80,89,32,66,73,82,84,72,68,65,89,33]; // HAPPY BIRTHDAY!
// let message = [67,65,70,69,32,76,65,84,84,69,58,32,36,53,46,57,57]; // CAFE LATTE: $5.99
let numSF;
let NUMBEROFROWS = 3;
let NUMBEROFSFPERROW;
let ENDASCII = 90;
let completeInputMessage = false;    // completed displaying the input message
let completeFullCycle = false;  // completed displaying a full cycle
let fullcycle = false;
let runningInputMessage = '';    // running the input message
let runningFullCycle = 'undefined';  // full cycle states : 'undefined', 'running', 'finished'

function preload() {

    for (let img = 32; img < 91; img++) {
        // BLUE Images
        loadedTImage = loadImage('images/blue/blue_top' + img + '.png');
        loadedBImage = loadImage('images/blue/blue_bot' + img + '.png');
        // // BLACK Images
        // loadedTImage = loadImage('images/blak/t' + img + '.png');
        // loadedBImage = loadImage('images/blak/b' + img + '.png');
        imgT.push(loadedTImage);
        imgB.push(loadedBImage);
    }
    // sfSound = loadSound('sp.wav', loaded)

}

function loadMessage() {

    resetBooleans();

    for (let rowNum = 0; rowNum < NUMBEROFROWS; rowNum++) {
        // const string = document.getElementById('string'+(rowNum+1)).value.toUpperCase();
        var inputString = document.getElementById('string' + (rowNum + 1));
        const inputSize = inputString.getAttribute('maxlength');
        NUMBEROFSFPERROW = inputSize;
        inputString = inputString.value.toUpperCase();
        // console.log(inputSize)
        message[rowNum] = string2asciiDecimal(inputString);
        // console.log(message[rowNum]);
        numSF = message[rowNum].length;
        // console.log(numSF)
        sfRows[rowNum] = new SFRow(side, numSF, rowNum);
        sfRows[rowNum].initRow(message[rowNum]);
        runningInputMessage = 'undefined';



        // Check if the cycle is checked
        // const fullcycleCheckbox = document.querySelector("#seqtypefullcycle")
        // if (fullcycleCheckbox.checked) {
        //     fullcycle = true;
        //     runningFullCycle = "undefined"
        //     console.log('one cycle', fullcycleCheckbox.checked)
        //     // var sequence = new Sequence(0,0,1,'fullcycle');
        //     // sequences = sequences.concat(sequence);
        //     var stringE = "";
        //     for (let i = 0; i < NUMBEROFSFPERROW; i++) {
        //         stringE = stringE.concat('Z');
        //     }
        //     message2[rowNum] = string2asciiDecimal(stringE);
        // }

        // sfRows[rowNum].checkRow(); // only used to check 

    }

    // ===== Save as GIF with timestamp file name
    // let h = hour();
    // let m = minute();
    // let s = second();

    // let options = { units: "frames" }
    // saveGif('hb-'+h+m+s+'.gif',frames, options);

    loop();

}

function setup() {
    createCanvas(600, 300, WEBGL)
    side = width / 20;
    hSide = side / 2;
    frameRate(50);
    angleInc = PI / 12;
    noLoop();
    // console.log('runningFullCycle', runningFullCycle)

}

function draw() {
    // background('darkslategray');
    background('darkblue');

    ambientLight(120);
    // let locX = mouseX - width / 2;
    // let locY = mouseY - height / 2;
    let locX = 0;
    let locY = 0;
    let locZ = 500;
    pointLight(220, 220, 220, locX, locY, locZ)

    // normalMaterial();
    // ambientMaterial(200,230,0)
    // ambientMaterial('purple')
    // specularMaterial(250)
    // shininess(200)
    // ambientLight(200,200,100)


    // // ==== X, Y and Z axis ====
    // strokeWeight(4)
    // stroke('blue'); //x-axis
    // line(-width, 0, 0, width, 0, 0);
    // stroke('red') //y-axis
    // line(0, -height / 2, 0, 0, height / 2, 0);
    // stroke('green') //z-axis
    // line(0, 0, -2*height, 0, 0, 2*height);

    let rotX = map(mouseX, 0, width, 0, HALF_PI)
    let rotY = map(mouseY, 0, height, 0, HALF_PI)
    // let rotZ = map(mouseY, 0, height,0,HALF_PI)
    // rotateZ(rotX)
    // rotateY(rotY)
    // rotateZ(rotY)
    // translate(0, 0, -200);
    // noStroke();
    // fill('white')
    // plane(2000, 1000)
    // pop();


    if (isLooping() === true) {
        console.log(runningInputMessage)
        // if (fullcycle) {
        //     if (runningFullCycle == "undefined") {
        //         console.log('runningFullCycle', runningFullCycle)
        //         runningFullCycle = 'running';
        //         console.log('runningFullCycle', runningFullCycle)
        //         for (let r = 0; r < NUMBEROFROWS; r++) {
        //             sfRows[r].initRow(message2[r]);
        //         }
        //     }
        // }
        // if (runningFullCycle == ('stopped')) {
            if (runningInputMessage == 'undefined') {
                runningInputMessage = 'running';
            //     console.log('runningInputMessage', runningInputMessage)
            //     for (let r = 0; r < NUMBEROFROWS; r++) {
            //         sfRows[r].initRow(message[r]);
            //     }
            }
        // }

        // console.log('isLooping')
        for (let r = 0; r < NUMBEROFROWS; r++) {
            sfRows[r].showRow(r);
            if (sfRows[r].stopRow == true) {
                // if (runningFullCycle == 'running') {
                //     runningFullCycle = 'stopped';
                // }
                if (runningInputMessage == 'running') {
                    runningInputMessage = 'stopped';
                }
                // noLoop();
            }
        }
        if (sfRows.every(isRowStopped)) {
            // timeDelay();
            // if (completeFullCycle && completeInputMessage) {
            // if (completeInputMessage) {
                noLoop();
            // }
        }
    } else {
        // if ((runningFullCycle == 'undefined') && !runningInputMessage) {
        //     console.log('waiting for user input')
        // }
        console.log('no looping')

    }
    orbitControl();

    let cameraX = map(mouseX, 0, width, -2000, 0)
    let cameraY = map(mouseX, 0, width, -200, 0)
    // camera(cameraX, ((height/2)/tan(PI/6)), 0, 0, 0, 0,0,1,0)
    // camera(0, -3700, 300, 0, 0, 0)
    // camera(100-mouseX, 100-mouseY, 100, 0, 0, 0)

}

