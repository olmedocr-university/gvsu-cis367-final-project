import * as THREE from 'three';
import { Vector3 } from 'three';


export default class Alien extends THREE.Group {
    rotationAngle = THREE.Math.degToRad(Math.random() * 360);
    constructor(angle = 180) { // number of spokes on the wheel
        //this.rotationAngle = angle;
        //animating = animate;
        super();    // invoke the super class constructor
    }

    animate(timeSpan) {
        //animate in subclass
    }
}