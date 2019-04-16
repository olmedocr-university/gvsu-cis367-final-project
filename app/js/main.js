import * as THREE from 'three';
import Alien from './models/Alien';
import Spaceship from "./models/Spaceship";
import Bullet from './models/Bullet'

let lastRenderTime = 0;
export default class App {
    constructor() {
        const canvas = document.getElementById('mycanvas');
        document.onkeydown = this.handleKeyPressed.bind(this);
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        this.scene = new THREE.Scene();

        this.setupCamera();

        this.bulletTimer = new THREE.Clock(false);

        const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        lightOne.position.set(40, 40, -50);
        this.scene.add(lightOne);

        this.myAlien = new Alien();
        this.scene.add(this.myAlien);

        let spaceGeometry = new THREE.CylinderGeometry(70, 70, 200, 20);
        let spaceMaterial = new THREE.MeshPhongMaterial({color: 0xe5f2f2});
        this.space = new THREE.Mesh(spaceGeometry, spaceMaterial);
        this.space.rotateZ(THREE.Math.degToRad(90));
        this.scene.add(this.space);

        this.lanes = {
            LEFT: "left",
            CENTER: "center",
            RIGHT: "right"
        };

        this.lane = this.lanes.CENTER;
        this.spaceship = new Spaceship();
        this.spaceship.position.y = 80;
        this.scene.add(this.spaceship);

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.space.rotation.x += 0.02;
        this.spaceship.rotation.x -= 0.02;

        if (this.bulletTimer.running) {
            if (this.bulletTimer.getElapsedTime() < 1) {
                this.bullet.translateZ(-1);
            } else {
                this.bulletTimer.stop();
                this.scene.remove(this.bullet);
            }
        }

        // setup the render function to "autoloop"
        requestAnimationFrame(() => this.render());
    }

    setupCamera() {
        this.camera = new THREE.PerspectiveCamera(70, 4 / 3, 0.1, 500);
        // Place the camera at (0,0,100)
        this.camera.position.z = 10;
        this.camera.position.y = 150;
        this.camera.rotateX(THREE.Math.degToRad(-60));
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

    handleKeyPressed(event) {
        if (event.code === "ArrowLeft") {
            this.changeLane("left");
        } else if (event.code === "ArrowRight") {
            this.changeLane("right");
        } else if (event.code === "Space" && !this.bulletTimer.running) {
            this.bullet = new THREE.Mesh(new THREE.SphereGeometry(0.5, 8, 4), new THREE.MeshBasicMaterial({
                color: "aqua"
            }));
            this.bullet.position.copy(this.spaceship.getWorldPosition(new THREE.Vector3()));
            this.scene.add(this.bullet);
            console.log("Fire!");
            this.bulletTimer.start();
        }
    }

    changeLane(direction) {
        switch (this.lane) {
            case this.lanes.LEFT:
                if (direction === "right") {
                    this.spaceship.position.x = 0;
                    this.lane = this.lanes.CENTER;
                }
                break;
            case this.lanes.CENTER:
                if (direction === "left") {
                    this.spaceship.position.x = -1 / 4 * 200;
                    this.lane = this.lanes.LEFT;
                } else if (direction === "right") {
                    this.spaceship.position.x = 1 / 4 * 200;
                    this.lane = this.lanes.RIGHT;
                }
                break;
            case this.lanes.RIGHT:
                if (direction === "left") {
                    this.spaceship.position.x = 0;
                    this.lane = this.lanes.CENTER;
                }
                break;
            default:
            // do nothing (invalid movement)
        }
    }
}