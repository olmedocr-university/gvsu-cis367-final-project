import * as THREE from 'three';
import Alien from './models/Alien';

let sphere;

export default class App {
    constructor() {
        const c = document.getElementById('mycanvas');
        document.onkeydown = this.onKeyPressed;
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: c, antialias: true});
        this.scene = new THREE.Scene();
        // Use perspective camera:
        //   Field of view: 75 degrees
        //   Screen aspect ration 4:3
        //   Near plane at z=0.5, far plane at z=500
        this.camera = new THREE.PerspectiveCamera(75, 4 / 3, 0.5, 500);
        // Place the camera at (0,0,100)
        this.camera.position.z = 100;
        this.camera.position.y = 0;

        let axesHelper = new THREE.AxesHelper(50);
        this.scene.add(axesHelper);

        const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        lightOne.position.set(40, 40, 100);
        this.scene.add(lightOne);

        this.myAlien = new Alien();
        this.scene.add(this.myAlien);

        let sphereGeometry = new THREE.DodecahedronGeometry(10, 1);
        let sphereMaterial = new THREE.MeshStandardMaterial({color: 0xe5f2f2});
        sphereMaterial.flatShading = true;
        sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
        this.scene.add(sphere);

        this.initLaneSystem();

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());
    }

    render() {
        this.renderer.render(this.scene, this.camera);

        // setup the render function to "autoloop"
        requestAnimationFrame(() => this.render());
    }

    resizeHandler() {
        const canvas = document.getElementById("mycanvas");
        let w = window.innerWidth - 16;
        let h = 0.75 * w;  /* maintain 4:3 ratio */
        if (canvas.offsetTop + h > window.innerHeight) {
            h = window.innerHeight - canvas.offsetTop - 16;
            w = 4 / 3 * h;
        }
        canvas.width = w;
        canvas.height = h;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(w, h);
    }

    onKeyPressed(event) {
        if (event.code === "ArrowLeft") {
            // LEFT
            // move current lane to left if possible
            sphere.changeLane("left");
        } else if (event.code === "ArrowRight") {
            // LEFT
            // move current lane to left if possible
            sphere.changeLane("right");
        }
    }

    initLaneSystem(){
        const lanes = {
            LEFT: "left",
            CENTER: "center",
            RIGHT: "right"
        };

        THREE.Mesh.prototype.lane = lanes.CENTER;

        THREE.Mesh.prototype.changeLane = function (direction) {
            switch (this.lane) {
                case lanes.LEFT:
                    if (direction === "right") {
                        sphere.position.x = 0;
                        this.lane = lanes.CENTER;
                    }
                    break;
                case lanes.CENTER:
                    if (direction === "left") {
                        sphere.position.x = -10;
                        this.lane = lanes.LEFT;
                    } else if (direction === "right") {
                        sphere.position.x = 10;
                        this.lane = lanes.RIGHT;
                    }
                    break;
                case lanes.RIGHT:
                    if (direction === "left") {
                        sphere.position.x = 0;
                        this.lane = lanes.CENTER;
                    }
                    break;
                default:
                // do nothing (invalid movement)
            }
        };
    }
}