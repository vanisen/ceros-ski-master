import * as Constants from '../Constants';
import DisplayManager from './DisplayManager';

export class StateManager {

    state = Constants.GAME_STATE.PLAY;
    overlays = {
        pause: null,
        gameOver: null
    };

    getState() {
        return this.state;
    }

    endGame() {
        this.state = Constants.GAME_STATE.OVER;
        DisplayManager.get().toggleGameOverDisplay(true);
    }

    resetGame() {
        this.state = Constants.GAME_STATE.RESET;
        DisplayManager.get().toggleGameOverDisplay(false);
    }

    pauseGame() {
        this.state = Constants.GAME_STATE.PAUSED;
        DisplayManager.get().togglePauseDisplay(true);
    }

    resumeGame() {
        if (Constants.GAME_STATE.PAUSED === this.state) {
            DisplayManager.get().togglePauseDisplay(false);
        }
        this.state = Constants.GAME_STATE.PLAY;
    }

    nextState() {
        switch (this.state) {
            case Constants.GAME_STATE.PLAY:
                this.pauseGame();
                break;
            case Constants.GAME_STATE.PAUSED:
                this.resumeGame();
                break;
            case Constants.GAME_STATE.OVER:
                this.resetGame();
                break;
        }
    }

    getDifficulty(distance) {
        return Math.min(Constants.DIFFICULTY_MAX_LEVEL, Math.ceil(distance / Constants.DIFFICULTY_STEP_SIZE));
    }
    
    getSkierSpeed(difficulty) {
        return Constants.SKIER_STARTING_SPEED * (1 + (difficulty-1) * Constants.DIFFICULTY_MULTIPLIER);
    }
}