import { Entity } from "./Entity";
import * as Constants from "../Constants";

export class Rhino extends Entity {

    assetName = Constants.RHINO_ASSET[Constants.RHINO_ACTIONS.RUN_LEFT_1];

    constructor(x, y) {
        super(x, y);
    }

    chase(skier, stateManager) {
        const { x, y } = skier.getPosition();
        const dx = Math.abs(this.x - x);
        const dy = Math.abs(this.y - y);
        const speed = skier.speed * Constants.RHINO_SPEED_MULTIPLIER;

        if (dx < speed) {
            this.x = x;
        } else if (this.x > x) {
            this.x -= speed;
        } else {
            this.x += speed;
        }

        if (dy < speed) {
            this.y = y;
        } else if (this.y > y) {
            this.y -= speed;
        } else {
            this.y += speed;
        }

        if (this.x === x && this.y === y) {
            this.eat(stateManager);
        }

        this.run(stateManager);
    }

    run(stateManager) {
        if (!this.runAnimation) {
            this.runAnimation = setInterval(() => {
                if (stateManager.getState() === Constants.GAME_STATE.PLAY) {
                    if (this.assetName === Constants.RHINO_ASSET[Constants.RHINO_ACTIONS.RUN_LEFT_1]) {
                        this.assetName = Constants.RHINO_ASSET[Constants.RHINO_ACTIONS.RUN_LEFT_2];
                    } else {
                        this.assetName = Constants.RHINO_ASSET[Constants.RHINO_ACTIONS.RUN_LEFT_1];
                    }
                }
            }, 100);
        }
    }

    eat(stateManager) {
        
        clearInterval(this.runAnimation);
        stateManager.state = Constants.GAME_STATE.RHINO_EATING;
        
        let step = Constants.RHINO_ACTIONS.LIFT;
        this.eatAnimation = setInterval(() => {
            step++;
            this.assetName = Constants.RHINO_ASSET[step];
            if (step === Constants.RHINO_ACTIONS.LIFT_EAT_4) {
                clearInterval(this.eatAnimation);
                stateManager.endGame();
            }
        }, 300);
    }

    reset() {
        clearInterval(this.runAnimation);
        clearInterval(this.eatAnimation);
        this.assetName = Constants.RHINO_ASSET[Constants.RHINO_ACTIONS.RUN_LEFT_1];
    }
}