import * as THREE from 'three';
import Snalien from './models/Snalien';
import RollingAlien from './models/RollingAlien';
import UFO from './models/UFO';
import Alien from './models/Alien';
import Spaceship from "./models/Spaceship";
import Bullet from './models/Bullet'
import Space from './models/Space'
import Constants from './Constants';

let lastRenderTime = 0;
let score = 0;
let scoreLabel;
export default class App {
    constructor() {
        const canvas = document.getElementById('mycanvas');
        scoreLabel = document.getElementById('score');
        scoreLabel.textContent = score;

        document.onkeydown = this.handleKeyPressed.bind(this);
        // Enable antialias for smoother lines
        this.renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
        this.scene = new THREE.Scene();

        this.setupCamera();

        this.bulletTimer = new THREE.Clock(false);

        this.setupLight();

        // generate 10 aliens randomly
        this.myAliens = new Array(10); 
        for (var i = 0; i < 10; i++) {
        var min=0; 
        var max=3;  
        var random = Math.floor(Math.random() * (+max - +min)) + +min;
            if (random % 3 == 0)
                this.myAliens[i] = new UFO();
            else if (random % 3 == 1) {
                this.myAliens[i] = new Snalien();
            } else if ( random % 3 == 2) {
                this.myAliens[i] = new RollingAlien();
            }

            this.myAliens[i].position.y = 110;
            this.myAliens[i].position.x = 10 * i + -50; // placing aliens
            this.scene.add(this.myAliens[i]);
        }

        this.space = new Space();
        this.scene.add(this.space);

        this.spaceship = new Spaceship();
        this.spaceship.position.y = Constants.spaceshipPositionY;
        this.scene.add(this.spaceship);

        window.addEventListener('resize', () => this.resizeHandler());
        this.resizeHandler();
        requestAnimationFrame(() => this.render());
    }

    render() {
        const now = Date.now();
        const deltaTime = now - lastRenderTime; // in millisecond
        lastRenderTime = now;
        scoreLabel.textContent = "score : " + deltaTime; // score;

        for ( var i = 0; i < 10; i++) {
            this.myAliens[i].animate(deltaTime);
        }
        //this.myAlien.animate(deltaTime);

        this.renderer.render(this.scene, this.camera);
        this.space.rotation.x += Constants.spaceRotationSpeed;
        this.spaceship.rotation.x -= this.space.rotation.x;

        if (this.bulletTimer.running) {
            if (this.bulletTimer.getElapsedTime() < Constants.bulletLifespan) {
                this.bullet.translateZ(Constants.bulletSpeed);
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

        this.camera.position.z = Constants.cameraPositionZ;
        this.camera.position.y = Constants.cameraPositionY;
        this.camera.rotateX(THREE.Math.degToRad(-60));
    }

    setupLight() {
        const lightOne = new THREE.DirectionalLight(0xFFFFFF, 1.0);
        lightOne.position.set(Constants.lightPositionX, Constants.lightPositionY, Constants.lightPositionZ);
        this.scene.add(lightOne);
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
            this.spaceship.changeLane("left");
        } else if (event.code === "ArrowRight") {
            this.spaceship.changeLane("right");
        } else if (event.code === "Space" && !this.bulletTimer.running) {
            this.bullet = new Bullet(this.spaceship);
            this.scene.add(this.bullet);
            this.bulletTimer.start();
        }
    }


}