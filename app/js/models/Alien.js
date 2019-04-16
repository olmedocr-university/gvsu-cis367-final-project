import * as THREE from 'three';
import { Vector3 } from 'three';


export default class Alien extends THREE.Group {
    constructor (animate) { // number of spokes on the wheel
        //animating = animate;
        super();    // invoke the super class constructor
    }

    animate(timeSpan) {
        //animate in subclass
    }
}