import * as THREE from 'three';
import { Vector3 } from 'three';
import Alien from './Alien';


let max = 2;
let min = 0;
let zPos = 1;
let moveSpeed = .001; // scale per millisecond
let up = true;

export default class UFO extends Alien {
    constructor () {
        super();
        var bGeo = new THREE.TorusBufferGeometry(6, 2, 8, 16);
        var bMat = new THREE.MeshStandardMaterial({color: 0x828282});

        var bottom = new THREE.Mesh( bGeo, bMat );
        bottom.position.set(0, 0, 0);
        this.add(bottom);

        var bpGeo = new THREE.CylinderBufferGeometry(7, 7, 1, 16, 1);
        var bottomPlate = new THREE.Mesh( bpGeo, bMat );
        bottomPlate.rotateOnAxis(new THREE.Vector3(1, 0 , 0), Math.PI/2);
        bottomPlate.position.set(0, 0, -1);
        this.add(bottomPlate);

        var tGeo = new THREE.SphereBufferGeometry(5, 8, 6, 0, (2 * Math.PI), 0, Math.PI/2);
        var tMat = new THREE.MeshToonMaterial({color: 0x82f8ff});

        var top = new THREE.Mesh( tGeo, tMat );
        top.position.set(0, 0, 1);
        top.rotateOnAxis(new THREE.Vector3(1, 0 , 0), Math.PI/2);
        this.add(top);

        var lightGeo = new THREE.SphereBufferGeometry(.5);
        var greenLightMat = new THREE.MeshBasicMaterial({color: 0x00ff00});
        var redLightMat = new THREE.MeshBasicMaterial({color: 0xff0000});
        var i;
        var lightNum = 10;
        for (i = 0; i < lightNum; i++) {
            if(i % 2 == 0)
            var light = new THREE.Mesh(lightGeo, greenLightMat);
            else
            var light = new THREE.Mesh(lightGeo, redLightMat);

            light.position.set(Math.sin((Math.PI / (lightNum/2)) * i) * 7, Math.cos((Math.PI / (lightNum/2)) * i) * 7, 1.2);

            this.add(light);
        }

        this.rotateOnAxis(new THREE.Vector3(-1, 0 , 0), Math.PI/2);
    }
    
    animate(timeSpan) {
        this.rotateOnAxis(new Vector3(0, 0, 1), .0009 * timeSpan);

        if (up)
            zPos += moveSpeed * timeSpan;
        else
            zPos -= moveSpeed * timeSpan;

        this.position.z = zPos;//set(THREE.Vector3(1, 1, scale));
        if(zPos > max) {
            up = !up;
            zPos = max;
        }
        if(zPos < min) {
            zPos = min;
            up = !up;
        }
    }
}