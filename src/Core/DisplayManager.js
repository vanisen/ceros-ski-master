import * as Constants from "../Constants";

class DisplayManager {

    stats = {
        time: 0,
        score: 0,
        speed: 0,
        distance: 0
    }

    static instance = null;

    constructor() {
        DisplayManager.instance = this;
        this.initOverlays();
    }

    static get() {
        return DisplayManager.instance;
    }

    initOverlays() {
        const { HUD, PAUSE, OVER } = Constants.DISPLAYS;
        // Score HUD
        this.hud = document.createElement('div');
        this.hud.id = HUD.ID;
        document.body.appendChild(this.hud);
        // Pause Display
        this.pause = document.createElement('div');
        this.pause.id = PAUSE.ID;
        this.pause.className = 'overlay';
        this.pause.innerHTML = `<h2>${PAUSE.TITLE}</h2><p><span>${PAUSE.MESSAGE}</span></p>`;
        document.body.appendChild(this.pause);
        // Game Over Display
        this.gameOver = document.createElement('div');
        this.gameOver.id = OVER.ID;
        this.gameOver.className = 'overlay';
        this.gameOver.innerHTML = `<h2>${OVER.TITLE}</h2><p><span>${OVER.MESSAGE}</span></p>`;
        document.body.appendChild(this.gameOver);
    }

    updateHUD(stats) {
        this.stats = {
            ...this.stats,
            ...stats
        }
        this.hud.innerHTML = `
            <p>Score: ${this.stats.score}</p>
            <p>Distance: ${(this.stats.distance / 1000).toFixed(2)} KM</p>
            <p>Level: ${this.stats.difficulty}</p>
        `;
    }

    togglePauseDisplay(show) {
        this.pause.style.display = show ? 'block' : 'none';
    }

    toggleGameOverDisplay(show) {
        this.gameOver.style.display = show ? 'block' : 'none';
    }

}

export default DisplayManager;