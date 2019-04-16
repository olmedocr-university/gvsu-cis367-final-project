export default class Constants {
    static lanes = {
        LEFT: -50,
        CENTER: 0,
        RIGHT: 50
    };

    static spaceshipPositionY = 80;

    static spaceRotationSpeed = 0.02;
    static spaceRadius = 70;
    static spaceHeight = 200;
    static spaceSegments = 20;

    static alienRotationSpeed = this.spaceRotationSpeed * 100;

    static lightPositionX = 40;
    static lightPositionY = 40;
    static lightPositionZ = -50;

    static cameraPositionY = 150;
    static cameraPositionZ = 10;

    static bulletLifespan = 1;
    static bulletRadius = 0.5;
    static bulletSegments = 8;
    static bulletSpeed = -1;

}