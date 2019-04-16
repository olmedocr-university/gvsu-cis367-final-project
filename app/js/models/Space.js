import {MeshPhongMaterial, Mesh, Group, Math, CylinderGeometry} from "three";
import Constants from "../Constants";

export default class Space extends Group {
    constructor() {
        super();

        let spaceGeometry = new CylinderGeometry(Constants.spaceRadius, Constants.spaceRadius, Constants.spaceHeight, Constants.spaceSegments);
        let spaceMaterial = new MeshPhongMaterial({color: 0xe5f2f2});
        let space = new Mesh(spaceGeometry, spaceMaterial);

        space.rotateZ(Math.degToRad(90));

        this.add(space);
    }
}