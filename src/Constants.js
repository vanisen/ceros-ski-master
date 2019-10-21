export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP = 'skierJump';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RAMP = 'ramp';
export const RHINO_DEFAULT = 'rhinoDefult';
export const RHINO_RUN_LEFT_1 = 'rhinoRunLeft1';
export const RHINO_RUN_LEFT_2 = 'rhinoRunLeft2';
export const RHINO_LIFT = 'rhinoLift';
export const RHINO_LIFT_MOUTH_OPEN = 'rhinoLiftMouthOpen';
export const RHINO_LIFT_EAT_1 = 'rhinoLiftEat1';
export const RHINO_LIFT_EAT_2 = 'rhinoLiftEat2';
export const RHINO_LIFT_EAT_3 = 'rhinoLiftEat3';
export const RHINO_LIFT_EAT_4 = 'rhinoLiftEat4';

export const RHINO_TRIGGER = 20000;
export const RHINO_SPEED_MULTIPLIER = 1.1;

export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const SKIER_JUMP_MAX_DISTANCE = 40;

export const ASSETS = {
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP]: [
        'img/skier_jump_1.png',
        'img/skier_jump_2.png',
        'img/skier_jump_3.png',
        'img/skier_jump_4.png',
        'img/skier_jump_5.png'
    ],
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [RAMP]: 'img/jump_ramp.png',
    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_RUN_LEFT_1]: 'img/rhino_run_left.png',
    [RHINO_RUN_LEFT_2]: 'img/rhino_run_left_2.png',
    [RHINO_LIFT]: 'img/rhino_lift.png',
    [RHINO_LIFT_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT_EAT_1]: 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT_2]: 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT_3]: 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT_4]: 'img/rhino_lift_eat_4.png'
};

export const SKIER_DIRECTIONS = {
    CRASH: 0,
    LEFT: 1,
    LEFT_DOWN: 2,
    DOWN: 3,
    RIGHT_DOWN: 4,
    RIGHT: 5
};

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT
};

export const RHINO_ACTIONS = {
    DEFAULT: 0,
    RUN_LEFT_1: 1,
    RUN_LEFT_2: 2,
    LIFT: 3,
    LIFT_MOUTH_OPEN: 4,
    LIFT_EAT_1: 5,
    LIFT_EAT_2: 6,
    LIFT_EAT_3: 7,
    LIFT_EAT_4: 8,
}

export const RHINO_ASSET = {
    [RHINO_ACTIONS.DEFAULT]: RHINO_DEFAULT,
    [RHINO_ACTIONS.RUN_LEFT_1]: RHINO_RUN_LEFT_1,
    [RHINO_ACTIONS.RUN_LEFT_2]: RHINO_RUN_LEFT_2,
    [RHINO_ACTIONS.LIFT]: RHINO_LIFT,
    [RHINO_ACTIONS.LIFT_MOUTH_OPEN]: RHINO_LIFT_MOUTH_OPEN,
    [RHINO_ACTIONS.LIFT_EAT_1]: RHINO_LIFT_EAT_1,
    [RHINO_ACTIONS.LIFT_EAT_2]: RHINO_LIFT_EAT_2,
    [RHINO_ACTIONS.LIFT_EAT_3]: RHINO_LIFT_EAT_3,
    [RHINO_ACTIONS.LIFT_EAT_4]: RHINO_LIFT_EAT_4
}

export const KEYS = {
    ENTER: 13,
    SPACE: 32,
    LEFT: 37,
    RIGHT: 39,
    UP: 38,
    DOWN: 40,
};

export const GAME_STATE = {
    PLAY: 0,
    PAUSED: 1,
    OVER: 2,
    RHINO_EATING: 3,
    RESET: 4
}

export const DIFFICULTY_STEP_SIZE = 4000;
export const DIFFICULTY_MAX_LEVEL = 5;
export const DIFFICULTY_MULTIPLIER = 0.1;
export const SCORE_RATE = 0.012;

export const DISPLAYS = {
    HUD: {
        ID: 'hud-overlay'
    },
    PAUSE: {
        ID: 'pause-overlay',
        TITLE: 'GAME PAUSED',
        MESSAGE: 'Press Enter Key to Resume Game.'
    },
    OVER: {
        ID: 'over-overlay',
        TITLE: 'GAME OVER',
        MESSAGE: 'Press Enter Key to Start Again.'
    },
    SCORE: 'score-overlay'
}

export const OVERLAYS = {
    
}