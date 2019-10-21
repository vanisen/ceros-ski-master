import * as Constants from "../Constants";

export class ScoreManager {

    score = 0;
    overlay = null;

    get() {
        return Math.round(this.score, 0);
    }

    add(score) {
        this.score += score;
    }

    reset() {
        this.score = 0;
    }
}