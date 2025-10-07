class SFRow {
    constructor(_side, _numSF, _nr) {
        this.numSF = _numSF;
        this.side = _side;
        this.hSide = side / 2;
        this.splitFlaps = []
        this.oneSplitFlap;
        this.startHX = (-this.side * ((NUMBEROFSFPERROW - 1) / 2)); //start Horizontal
        this.startVY = (-2 * this.side * ((NUMBEROFROWS - 1) / 2)); //start Vertical
        this.txt;
        this.nr = _nr;
        // console.log('row starts at',this.startHX) // just to check where the row starts
        this.stopRow = false;
    }

    initRow(_txt) {

        // If the row string does not use all the row characters
        // push blank character (32 ASCII) in the end part of the array
        // so as to fill the complete row with characters
        this.txt = _txt;
        this.stopRow = false;


        if (this.txt.length < NUMBEROFSFPERROW) {
            let diff = NUMBEROFSFPERROW - this.txt.length;
            for (let d = 0; d < diff; d++) {
                this.txt.push(32)
            }
            // console.log(this.txt)
        }

        // Create new SplitFlap objects and place them in a working array
        for (let sf = 0; sf < NUMBEROFSFPERROW; sf++) {
            this.oneSplitFlap = new SplitFlap(this.side, this.startHX + sf * this.side, this.startVY + this.nr * 2 * this.side, 0);
            this.splitFlaps.push(this.oneSplitFlap)
            // this.splitFlaps.unshift(this.oneSplitFlap)
            // console.log(this.splitFlaps[sf])
        }

    }

    showRow(row) {
        // console.log(this.txt)
        // plane(200) // reference plane
        for (let sf = 0; sf < this.splitFlaps.length; sf++) {
            push()
            this.splitFlaps[sf].showSF();
            // this.splitFlaps[sf].flapSF(angleInc, this.splitFlaps[sf].stopSF - 32); // In this line .stopSF is not defined
            this.splitFlaps[sf].flapSF(angleInc, this.txt[sf] - 32);
            // this.splitFlaps[sf].flapSF(angleInc, 16+sf); // this is just to check the order of the array
            pop();
            // console.log(this.splitFlaps[sf].stopSF)
        }
        //  console.log(row,'isStopped',this.splitFlaps.every(isSFStopped))
        if (this.splitFlaps.every(isSFStopped)) {
            this.stopRow = true;
            // console.log('stopped inside showRow');
        }
    }

    checkRow(row) {
        for (let sf = 0; sf < this.splitFlaps.length; sf++) {
            // console.log('splitFips array:', this.splitFlaps[sf])
        }
    }

}
