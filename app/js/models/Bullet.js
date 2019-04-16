import {SphereGeometry, Mesh, Group, Vector3, MeshBasicMaterial} from "three";
import Constants from "../Constants";

export default class Bullet extends Group {
    constructor (shooter) {
        super();

        let bulletGeometry = new SphereGeometry(Constants.bulletRadius, Constants.bulletSegments, Constants.bulletSegments);
        let bulletMaterial = new MeshBasicMaterial( {color: "aqua"} );
        let bullet = new Mesh(bulletGeometry, bulletMaterial);

        bullet.position.copy(shooter.getWorldPosition(new Vector3()));

        this.add(bullet);
    }
}