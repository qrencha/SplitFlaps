// =========================================
// Common Functions
// =========================================
function ascii2decimal(character){
    return character.charCodeAt(0);
}

function string2asciiDecimal(str){
    let asciiArray = [];
    for (let i = 0; i < str.length; i++){
        asciiArray.push(str.charCodeAt(i));
    }
    return asciiArray;
}

function areArraysIdentical(array1, array2){
    if (array1.length !== array2.length){
        return false;
    }

    for (let i = 0; i < array1.length; i++){
        if(array1[i] !== array2[i]){
            return false;
        }
    }

    return true;
}


function loaded() {
    // console.log('sound loaded')
}

// Function used to check if a Split-Filps has stopped flipping
const isSFStopped = (currentSF) => currentSF.stopFlipping == true;

// Function used to check if all the Split-Filps in a row have stopped flipping
const isRowStopped = (currentRow) => currentRow.stopRow == true;

// I wanted to add a dely in the draw() function, so
// that the gif can save the SF panel once stopped for several seconds
// This did not do the expected effect, I need to investigate why
function timeDelay() {
    // noLoop();
    setTimeout(noLoop(), 3000)
    console.log("Function executed after 3 seconds");
}

function resetBooleans(){
    completeInputMessage = false;
    completeFullCycle = false;
    runningInputMessage = false; 
    runningFullCycle = false;
}