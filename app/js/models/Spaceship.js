import {DodecahedronGeometry, MeshStandardMaterial, Mesh, Group} from 'three';
import Constants from '../Constants'

export default class Spaceship extends Group {
    currentLane = Constants.lanes.CENTER;
    constructor () { // number of spokes on the wheel
        super();    // invoke the super class constructor

        let spaceshipGeometry = new DodecahedronGeometry(10, 1);
        let spaceshipMaterial = new MeshStandardMaterial({color: 0xe5f2f2});
        let spaceship = new Mesh(spaceshipGeometry, spaceshipMaterial);

        this.add(spaceship)
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
}