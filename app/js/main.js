import * as THREE from 'three';
import TrackballControls from 'three-trackballcontrols';
import Alien from './models/Alien';

export default class App {
    constructor() {
        const c = document.getElementById('mycanvas');
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
        this.camera.position.y = 10;

        // const orbiter = new OrbitControls(this.camera);
        // orbiter.enableZoom = false;
        // orbiter.update();
        this.tracker = new TrackballControls(this.camera);
        this.tracker.rotateSpeed = 2.0;
        // Allow zoom and pan
        this.tracker.noZoom = false;
        this.tracker.noPan = false;

        let axesHelper = new THREE.AxesHelper(50);
        this.scene.add(axesHelper);

        const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        lightOne.position.set(40, 40, 100);
        this.scene.add(lightOne);

        this.myAlien = new Alien();
        this.scene.add(this.myAlien);

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.tracker.update();

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
        this.tracker.handleResize();
    }
}