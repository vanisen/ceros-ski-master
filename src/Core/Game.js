import * as Constants from "../Constants";
import { AssetManager } from "./AssetManager";
import { Canvas } from './Canvas';
import { Skier } from "../Entities/Skier";
import { ObstacleManager } from "../Entities/Obstacles/ObstacleManager";
import { Rect } from './Utils';
import { ScoreManager } from "./ScoreManager";
import { StateManager } from "./StateManager";
import { Rhino } from "../Entities/Rhino";
import DisplayManager from "./DisplayManager";

export class Game {
    gameWindow = null;

    constructor() {
        this.assetManager = new AssetManager();
        this.canvas = new Canvas(Constants.GAME_WIDTH, Constants.GAME_HEIGHT);
        this.skier = new Skier(0, 0);
        this.obstacleManager = new ObstacleManager();
        this.scoreManager = new ScoreManager();
        this.stateManager = new StateManager();
        this.displayManager = new DisplayManager();
        this.startTime = new Date();
        document.addEventListener('keydown', this.handleKeyDown.bind(this));
    }

    init() {
        this.obstacleManager.placeInitialObstacles();
    }

    async load() {
        await this.assetManager.loadAssets(Constants.ASSETS);
    }

    run() {
        this.canvas.clearCanvas();
        this.updateGameWindow();
        this.drawGameWindow();
        requestAnimationFrame(this.run.bind(this));
    }

    updateGameWindow() {
        if (this.stateManager.getState() === Constants.GAME_STATE.RESET) {
            this.reset();
        }

        if (this.stateManager.getState() !== Constants.GAME_STATE.PLAY) {
            return;
        }

        const difficulty = this.stateManager.getDifficulty(this.skier.distance);
        const speed = this.stateManager.getSkierSpeed(difficulty);
        this.skier.setSpeed(speed);
        this.skier.move();

        if (this.skier.distance > Constants.RHINO_TRIGGER) {
            if (!this.rhino) {
                const x = this.skier.getPosition().x + Constants.GAME_WIDTH;
                const y = this.skier.getPosition().y;
                this.rhino = new Rhino(x, y);
            }
            this.rhino.chase(this.skier, this.stateManager);
        }

        const previousGameWindow = this.gameWindow || { x: 0, y: 0 };
        this.calculateGameWindow();

        this.obstacleManager.placeNewObstacle(this.gameWindow, previousGameWindow, difficulty);
        const collision = this.skier.checkIfSkierHitObstacle(this.obstacleManager, this.assetManager);
        if (!collision) {
            this.scoreManager.add(this.skier.speed * difficulty * Constants.SCORE_RATE);
        }

        const nowDate = new Date();

        this.displayManager.updateHUD({
            difficulty,
            distance: this.skier.distance,
            score: this.scoreManager.get()
        });
    }

    drawGameWindow() {
        this.canvas.setDrawOffset(this.gameWindow.left, this.gameWindow.top);

        if (this.stateManager.getState() !== Constants.GAME_STATE.RHINO_EATING && this.stateManager.getState() !== Constants.GAME_STATE.OVER) {
            this.skier.draw(this.canvas, this.assetManager);
        }
        if (this.rhino) {
            this.rhino.draw(this.canvas, this.assetManager);
        }

        this.obstacleManager.drawObstacles(this.canvas, this.assetManager);
    }

    calculateGameWindow() {
        const skierPosition = this.skier.getPosition();
        const left = skierPosition.x - (Constants.GAME_WIDTH / 2);
        const top = skierPosition.y - (Constants.GAME_HEIGHT / 2);

        this.gameWindow = new Rect(left, top, left + Constants.GAME_WIDTH, top + Constants.GAME_HEIGHT);
    }

    handleKeyDown(event) {
        if (this.stateManager.getState() !== Constants.GAME_STATE.PLAY && event.which !== Constants.KEYS.ENTER) {
            return;
        }

        switch (event.which) {
            case Constants.KEYS.LEFT:
                this.skier.turnLeft();
                event.preventDefault();
                break;
            case Constants.KEYS.RIGHT:
                this.skier.turnRight();
                event.preventDefault();
                break;
            case Constants.KEYS.UP:
                this.skier.turnUp();
                event.preventDefault();
                break;
            case Constants.KEYS.DOWN:
                this.skier.turnDown();
                event.preventDefault();
                break;
            case Constants.KEYS.SPACE:
                this.skier.jump();
                event.preventDefault();
                break;
            case Constants.KEYS.ENTER:
                this.stateManager.nextState();
                event.preventDefault();
                break;
        }
    }

    reset() {
        this.skier.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        this.skier.distance = 0;
        this.rhino = null;
        this.stateManager.state = Constants.GAME_STATE.PLAY;
        this.scoreManager.reset();
    }
}