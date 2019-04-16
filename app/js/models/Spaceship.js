import {DodecahedronGeometry, MeshStandardMaterial, Mesh, Group} from 'three';

export default class Spaceship extends Group {
    constructor () { // number of spokes on the wheel
        super();    // invoke the super class constructor

        let shipGeometry = new DodecahedronGeometry(10, 1);
        let shipMaterial = new MeshStandardMaterial({color: 0xe5f2f2});
        shipMaterial.flatShading = true;
        let spaceship = new Mesh(shipGeometry, shipMaterial);
        this.add(spaceship)
    }
}