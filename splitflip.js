class SplitFlap {
    constructor(side, transX, transY, transZ) {
        this.side = side;
        this.halfSide = this.side / 2;
        this.angle = 0;
        this.transX = transX;
        this.transY = transY;
        this.transZ = transZ;
        this.sfCounter = 0;
        this.stopSF;
        this.stopFlapping = false;
    }

    showSF() {

        // >>>>>>>>>>>>>> SF housing <<<<<<<<<<<<<
        // translate(this.transX, this.transY, this.transZ);
        fill(10)
        stroke('darkblue')
        // box(this.side, this.side, 2 * this.side)
        strokeWeight(3)
        // translate(0, -this.halfSide - 2, 0) //!!!!!!!!!!!!!!!!!!
        translate(this.transX, this.transY, 0) //!!!!!!!!!!!!!!!!!!
        line(-this.halfSide, 0, 0, this.halfSide, 0, 0);
        noStroke();
    }

    flapSF(angleInc, stopSF) {

        this.stopSF = stopSF;
        // console.log('stopSF',stopSF)
        if (this.sfCounter == this.stopSF) {
            this.stopFlapping = true;
            // console.log('TRUE', this.sfCounter)
            this.sfCounter = this.stopSF;
        }

        // >>>>>>>>>>>>>> BOTTOM SPLIT <<<<<<<<<<<<<<
        push();
        // rotateX(HALF_PI); //!!!!!!!!!!!!!!!!!!
        translate(0, this.halfSide, 0);
        // console.log(this,this.sfCounter)
        texture(imgB[this.sfCounter]);
        plane(this.side, this.side)
        pop();

        // >>>>>>>>>>>>>> FLAP SPLIT <<<<<<<<<<<<<<
        push();
        if (this.stopFlapping == false) {
            this.angle = this.angle + angleInc;

            // rotateX(HALF_PI - this.angle); //!!!!!!!!!!!!!!!!!!
            rotateX(-this.angle);
            translate(0, -this.halfSide, 0);

            // if (this.angle < HALF_PI + QUARTER_PI / 5) { //!!!!!!!!!!!!!!!!!!
            if (this.angle < QUARTER_PI / 5) {
                texture(imgT[this.sfCounter]);
            } else {
                rotateZ(PI)
                rotateY(PI)
                // if (this.sfCounter > imgB.length - 1) {
                //     this.sfCounter = 0;
                // }
                texture(imgB[this.sfCounter + 1]);
            }
            plane(this.side, this.side)

            if (this.angle >= PI) {
                this.angle = 0;
                if (this.sfCounter > imgB.length - 1) {
                    // this.sfCounter = 0;
                } else {
                    if (this.stopFlapping == false) {
                        this.sfCounter++
                        // sfSound.play()
                    }

                }
            }
        }
        pop();


        // >>>>>>>>>>>>>> TOP SPLIT <<<<<<<<<<<<<<
        push();
        // rotateX(HALF_PI);
        translate(0, -this.halfSide, 0);
        if (this.sfCounter > imgB.length - 1) {
            // this.sfCounter = 0;
            // texture(imgT[this.sfCounter]);

        } else {
            if (this.stopFlapping == false) {
                if (this.angle > angleInc) {
                    if (this.sfCounter >= imgB.length - 1) {
                        // this.sfCounter = 0;
                        // texture(imgT[this.sfCounter]);
                    } else {
                        texture(imgT[this.sfCounter + 1]);
                    }
                }
            } else {
                texture(imgT[this.sfCounter]);

            }

        }

        plane(this.side, this.side)
        pop();

    }

}