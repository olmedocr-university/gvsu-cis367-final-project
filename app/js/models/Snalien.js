import * as THREE from 'three';
import { Vector3 } from 'three';
import Alien from './Alien';

/* I'm not sure about this, but I think that it's better if you import in the models just the modules that you use:
    Importing the way we it is shouldn't have any cost from what I remember, It's for readability to import the other way 
    but I wouldn't care either option we go with!

import {BoxBufferGeometry, MeshStandardMaterial, Mesh, Vector3, ConeBufferGeometry, CircleBufferGeometry, MeshBasicMaterial} from "three";
import Constants from "../Constants";

[...]

let fGeo = new BoxBufferGeometry(4, 8, 16);


 */


// These variable here might have some cost as opposed to being in the class

let max = 1.3;
let min = .7;
let scale = 1;
let scaleSpeed = .0003; // scale per millisecond
let growing = true;

export default class Snalien extends Alien {
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

        var hornGeo = new THREE.ConeBufferGeometry(1, 5, 16);
        var hornMat = new THREE.MeshStandardMaterial({color: 0xdaaaed});

        var leftH = new THREE.Mesh(hornGeo, hornMat);
        leftH.rotateOnAxis(new Vector3(0, 0, -1), 70);
        leftH.position.set(2, 2, 7);
        this.add(leftH);

        var rightH = new THREE.Mesh(hornGeo, hornMat);
        rightH.rotateOnAxis(new Vector3(0, 0, 1), 70);
        rightH.position.set(-2, 2, 7);
        this.add(rightH);

        var eyeGeo = new THREE.CircleBufferGeometry(2, 10);
        var eyeMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
        var eye = new THREE.Mesh(eyeGeo, eyeMat);
        eye.position.set(0, 2, 8.01);
        this.add(eye);

        var pupilGeo = new THREE.CircleBufferGeometry(.5, 10);
        var pupilMat = new THREE.MeshBasicMaterial({color: 0x000000});
        var pupil = new THREE.Mesh(pupilGeo, pupilMat);
        pupil.position.set(0, 2, 8.02);
        this.add(pupil);
    }

    animate(timeSpan) {
        if (growing)
            scale += scaleSpeed * timeSpan;// * timeSpan;
        else
            scale -= scaleSpeed * timeSpan;// * timeSpan;

        this.scale.z = scale;//set(THREE.Vector3(1, 1, scale));
        if(scale > max) {
            growing = !growing;
            scale = max;
        }
        if(scale < min) {
            scale = min;
            growing = !growing;
        }
    }
}