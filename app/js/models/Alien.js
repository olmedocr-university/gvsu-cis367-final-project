import * as THREE from 'three';
import { Vector3 } from 'three';

export class Alien extends THREE.Group {
    constructor (animate) { // number of spokes on the wheel
        //animating = animate;
        super();    // invoke the super class constructor
    }

    animate(timeSpan) {
        //animate in subclass
    }
}

let max = 1.3;
let min = .7;
let scale = 1;
let scaleSpeed = .000000000001; // scale per millisecond
let growing = true;

export default class Snalien extends THREE.Group {
    constructor () {
        super();
        var fGeo = new THREE.BoxBufferGeometry(4, 8, 16);
        var bodyMat = new THREE.MeshStandardMaterial({color: 0xc242f4});

        var front = new THREE.Mesh( fGeo, bodyMat );
        front.position.set(0, 0, 0);
        this.add(front);

        var tGeo = new THREE.BoxBufferGeometry(4, 4, 8);
        var tail = new THREE.Mesh( tGeo, bodyMat );
        tail.position.set(0, -2, -12);
        this.add(tail);

        var hornMat
    }

    animate(timeSpan) {
        /*if (growing)
            scale += scaleSpeed * timeSpan;
        else
            scale -= scaleSpeed * timeSpan

        this.scale.z = scale;//set(THREE.Vector3(1, 1, scale));
        console.log(scale);
        if(scale > max) {
            growing = !growing;
            console.log(growing);
        }
        if(scale < min)
            growing = !growing;*/ // Being weird
        this.rotateOnAxis(new Vector3(0, 0, 1), .5 / timeSpan);
    }
}