import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";
import DisplayManager from "../Core/DisplayManager";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;

    direction = Constants.SKIER_DIRECTIONS.DOWN;
    speed = Constants.SKIER_STARTING_SPEED;
    isJumping = false;
    jumpDistance = 0;
    distance = 0;

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    setSpeed(speed) {
        this.speed = speed;        
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    updateDistance(x1, y1, x2, y2) {
        const delta = Math.sqrt(Math.pow(Math.abs(x1 - x2), 2) + Math.pow(Math.abs(y1 - y2), 2));
        this.distance = this.distance + Math.floor(delta);
    }

    move() {
        const prevX = this.x;
        const prevY = this.y;

        switch (this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT:
                this.moveSkierLeft();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT:
                this.moveSkierRight();
                break;
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.UP:
                this.moveSkierUp();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }

        if (this.isJumping) {
            this.updateJump();
        }

        this.updateDistance(this.x || 0, this.y || 0, prevX || 0, prevY || 0);
    }

    updateJump() {
        this.jumpDistance = this.jumpDistance + 1;
        const jumpPerc = Math.ceil(this.jumpDistance / Constants.SKIER_JUMP_MAX_DISTANCE * 100);
        
        if(jumpPerc > 1 && jumpPerc <= 20) {
            this.assetName = Constants.SKIER_JUMP + '_0';
        } else if (jumpPerc > 20 && jumpPerc <= 40) {
            this.assetName = Constants.SKIER_JUMP + '_1';
        } else if (jumpPerc > 40 && jumpPerc <= 60) {
            this.assetName = Constants.SKIER_JUMP + '_2';
        } else if (jumpPerc > 60 && jumpPerc <= 80) {
            this.assetName = Constants.SKIER_JUMP + '_3';
        } else if (jumpPerc > 80 && jumpPerc < 100) {
            this.assetName = Constants.SKIER_JUMP + '_4';
        } else {
            this.jumpDistance = 0;
            this.isJumping = false;
            this.updateAsset();
        }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }
    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    turnLeft() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT) {
            this.moveSkierLeft();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.LEFT);
        } else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        if (this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierRight();
        } else if (this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.setDirection(Constants.SKIER_DIRECTIONS.RIGHT);
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
        if (this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
        this.isJumping = true;
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());
            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );

            return intersectTwoRects(skierBounds, obstacleBounds);
        });

        if (collision) {
            if (collision.assetName === Constants.RAMP) {
                this.jump();
            } else if (!this.isJumping || (collision.assetName !== Constants.ROCK1 && collision.assetName !== Constants.ROCK2)) {
                this.isJumping = false;
                this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            }
        }

        return collision;
    };
}