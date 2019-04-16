import * as THREE from 'three';
import { Vector3 } from 'three';
import Alien from './Alien';

import Constants from '../Constants'

export default class Spaceship extends Alien {
    currentLane = Constants.lanes.CENTER;
    constructor () { // number of spokes on the wheel
        super();    // invoke the super class constructor

        /*let spaceshipGeometry = new DodecahedronGeometry(10, 1);
        let spaceshipMaterial = new MeshStandardMaterial({color: 0xe5f2f2});
        let spaceship = new Mesh(spaceshipGeometry, spaceshipMaterial);

        this.add(spaceship)*/

        var bGeo = new THREE.CylinderBufferGeometry(5, 3, 12, 16, 1);
        var bMat = new THREE.MeshStandardMaterial({ color: 0xe5f2f2 });

        var body = new THREE.Mesh(bGeo, bMat);
        body.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        body.position.set(0, 0, 0);
        this.add(body);

        var wGeo = new THREE.BoxBufferGeometry(17, .2, 4);
        var wing = new THREE.Mesh(wGeo, bMat);
        wing.position.set(0, 0, 2);
        this.add(wing);

        var winGeo = new THREE.SphereBufferGeometry(1, 8, 6);
        var winMat = new THREE.MeshToonMaterial({ color: 0x82f8ff });

        var win = new THREE.Mesh(winGeo, winMat);
        win.position.set(0, 5, 0);
        this.add(win);

        var tGeo = new THREE.CylinderBufferGeometry(2, 1.7, 1, 16, 1);
        var tMat = new THREE.MeshStandardMaterial({ color: 0x000000 });

        var thruster = new THREE.Mesh(tGeo, tMat);
        thruster.position.set(0, 0, 6.5);
        thruster.rotateOnAxis(new THREE.Vector3(1, 0, 0), Math.PI / 2);
        this.add(thruster);
    }

    changeLane(direction) {
        switch (this.currentLane) {
            case Constants.lanes.LEFT:
                if (direction === "right") {
                    this.position.x = Constants.lanes.CENTER;
                    this.currentLane = Constants.lanes.CENTER;
                }
                break;
            case Constants.lanes.CENTER:
                if (direction === "left") {
                    this.position.x = Constants.lanes.LEFT;
                    this.currentLane = Constants.lanes.LEFT;
                } else if (direction === "right") {
                    this.position.x = Constants.lanes.RIGHT;
                    this.currentLane = Constants.lanes.RIGHT;
                }
                break;
            case Constants.lanes.RIGHT:
                if (direction === "left") {
                    this.position.x = Constants.lanes.CENTER;
                    this.currentLane = Constants.lanes.CENTER;
                }
                break;
            default:
            // do nothing (invalid movement)
        }
    }

    animate(timeSpan) {
        // nothing yet.
    }
}