import * as THREE from 'three';
import { Vector3 } from 'three';
import Alien from './Alien';

let toRad = Math.PI/180;
export default class RollingAlien extends Alien {
    constructor () {
        super();
        var bodyGeo = new THREE.SphereBufferGeometry(7, 10);
        var bodyMat = new THREE.MeshStandardMaterial({color: 0x091a9b});

        var body = new THREE.Mesh( bodyGeo, bodyMat );
        body.position.set(0, 0, 0);
        this.add(body);

        var eyeGeo = new THREE.SphereBufferGeometry(1.5);
        var eyeMat = new THREE.MeshBasicMaterial({color: 0xFFFFFF});
        var pupilGeo = new THREE.SphereBufferGeometry(.5);
        var pupilMat = new THREE.MeshBasicMaterial({color: 0x00000});
        var i;
        var eyeNum = 8;
        for (i = 0; i < eyeNum; i++) {
            var eye = new THREE.Mesh(eyeGeo, eyeMat);
            var pupil = new THREE.Mesh(pupilGeo, pupilMat);

            eye.position.set(0, Math.cos((Math.PI / (eyeNum/2)) * i) * 6, Math.sin((Math.PI / (eyeNum/2)) * i) * 6);
            pupil.position.set(0, Math.cos((Math.PI / (eyeNum/2)) * i) * 7.35, Math.sin((Math.PI / (eyeNum/2)) * i) * 7.35);

            this.add(eye);
            this.add(pupil);
        }

        var hornGeo = new THREE.ConeBufferGeometry(1, 5, 16);
        var hornMat = new THREE.MeshStandardMaterial({color: 0xa3adff});

        var leftH = new THREE.Mesh(hornGeo, hornMat);
        leftH.rotateOnAxis(new Vector3(0, 0, -1), 60 * toRad);
        leftH.position.set(7, 0, 0);
        this.add(leftH);

        var leftH2 = new THREE.Mesh(hornGeo, hornMat);
        leftH2.rotateOnAxis(new Vector3(0, 0, -1), 120 * toRad);
        leftH2.position.set(7, 0, 0);
        this.add(leftH2);

        var rightH = new THREE.Mesh(hornGeo, hornMat);
        rightH.rotateOnAxis(new Vector3(0, 0, 1), 120 * toRad);
        rightH.position.set(-7, 0, 0);
        this.add(rightH);

        var rightH2 = new THREE.Mesh(hornGeo, hornMat);
        rightH2.rotateOnAxis(new Vector3(0, 0, 1), 60 * toRad);
        rightH2.position.set(-7, 0, 0);
        this.add(rightH2);
    }

    animate(timeSpan) {
        this.rotateOnAxis(new Vector3(1, 0, 0), .5/timeSpan);
    }
}