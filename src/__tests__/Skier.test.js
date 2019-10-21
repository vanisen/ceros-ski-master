import "babel-polyfill";
import * as Constants from "../Constants";
import { Skier } from "../Entities/Skier";
import { Obstacle } from "../Entities/Obstacles/Obstacle";

describe("Skier", () => {
  let skier;
  beforeEach(() => {
    skier = new Skier(0, 0);
    spyOn(skier, "moveSkierDown").and.callThrough();
    spyOn(skier, "moveSkierLeft").and.callThrough();
    spyOn(skier, "moveSkierLeftDown").and.callThrough();
    spyOn(skier, "moveSkierRight").and.callThrough();
    spyOn(skier, "moveSkierRightDown").and.callThrough();
    spyOn(skier, "moveSkierUp").and.callThrough();
  });

  describe("Movement functionality", () => {
    it("should move skier down", () => {
      const { x, y } = skier.getPosition();
      skier.direction = Constants.SKIER_DIRECTIONS.DOWN;
      skier.move();
      const { x: newX, y: newY } = skier.getPosition();

      expect(skier.moveSkierDown).toHaveBeenCalled();
      expect(newX - x).toBe(0);
      expect(newY - y).toBeGreaterThan(0);
    });
    it("should move skier up", () => {
      skier.direction = Constants.SKIER_DIRECTIONS.DOWN;
      skier.move();
      skier.move();
      const { x, y } = skier.getPosition();
      skier.direction = Constants.SKIER_DIRECTIONS.UP;
      skier.move();
      const { x: newX, y: newY } = skier.getPosition();
      expect(skier.moveSkierUp).toHaveBeenCalled();
      expect(newX - x).toBe(0);
      expect(newY - y).toBeLessThan(0);
    });

    it("should move skier left", () => {
      const { x, y } = skier.getPosition();
      skier.direction = Constants.SKIER_DIRECTIONS.LEFT;
      skier.move();
      const { x: newX, y: newY } = skier.getPosition();
      expect(skier.moveSkierLeft).toHaveBeenCalled();
      expect(newX - x).toBeLessThan(0);
      expect(newY - y).toBe(0);
    });

    it("should move skier right", () => {
      const { x, y } = skier.getPosition();
      skier.direction = Constants.SKIER_DIRECTIONS.RIGHT;
      skier.move();
      const { x: newX, y: newY } = skier.getPosition();
      expect(skier.moveSkierRight).toHaveBeenCalled();
      expect(newX - x).toBeGreaterThan(0);
      expect(newY - y).toBe(0);
    });
    it("should move skier left down", () => {
      const { x, y } = skier.getPosition();
      skier.direction = Constants.SKIER_DIRECTIONS.LEFT_DOWN;
      skier.move();
      const { x: newX, y: newY } = skier.getPosition();
      expect(skier.moveSkierLeftDown).toHaveBeenCalled();
      expect(newX - x).toBeLessThan(0);
      expect(newY - y).toBeGreaterThan(0);
    });
    it("should move skier right down", () => {
      const { x, y } = skier.getPosition();
      skier.direction = Constants.SKIER_DIRECTIONS.RIGHT_DOWN;
      skier.move();
      const { x: newX, y: newY } = skier.getPosition();
      expect(skier.moveSkierRightDown).toHaveBeenCalled();
      expect(newX - x).toBeGreaterThan(0);
      expect(newY - y).toBeGreaterThan(0);
    });
  });

  describe("Crash and Jump functionality", () => {
    let assetManager = {};
    let obstableManager = {};
    const obstacle = new Obstacle(100, 100);

    beforeEach(() => {
      assetManager.getAsset = jest
        .fn()
        .mockReturnValue({ width: 30, height: 30 });

      obstableManager.getObstacles = jest.fn().mockReturnValue([obstacle]);
    });

    it("should crash the skier", () => {
      obstacle.assetName = Constants.TREE;
      skier = new Skier(100, 90);
      skier.move();
      skier.checkIfSkierHitObstacle(obstableManager, assetManager);
      expect(skier.assetName).toBe(Constants.SKIER_CRASH);
    });

    it("should get up the skier and turn left", () => {
      obstacle.assetName = Constants.TREE;
      skier = new Skier(100, 90);
      skier.move();
      skier.checkIfSkierHitObstacle(obstableManager, assetManager);
      expect(skier.assetName).toBe(Constants.SKIER_CRASH);
      // Turn Left
      skier.turnLeft();
      expect(skier.assetName).toBe(Constants.SKIER_LEFT);
    });

    it("should make the skier jump when move over a ramp", () => {
      obstacle.assetName = Constants.RAMP;
      skier = new Skier(100, 90);
      skier.move();
      skier.checkIfSkierHitObstacle(obstableManager, assetManager);
      // started jump
      expect(skier.isJumping).toBe(true);
      // moving along jump
      skier.move();
      expect(skier.assetName).toBe(Constants.SKIER_JUMP + "_0");
    });


    it("should able to jump over rocks", () => {
      obstacle.assetName = Constants.ROCK2;
      skier = new Skier(100, 90);
      skier.move();
      // started jump
      skier.jump();
      skier.checkIfSkierHitObstacle(obstableManager, assetManager);
      // should be able to jump
      expect(skier.isJumping).toBe(true);
      // moving along jump
      skier.move();
      expect(skier.assetName).toBe(Constants.SKIER_JUMP + "_0");
    });


    it("should not be able to jump trees", () => {
      obstacle.assetName = Constants.TREE;
      skier = new Skier(100, 90);
      skier.move();
      // started jump
      skier.jump();
      skier.checkIfSkierHitObstacle(obstableManager, assetManager);
      // should not jump
      expect(skier.isJumping).toBe(false);
      // should crash
      expect(skier.assetName).toBe(Constants.SKIER_CRASH);
    });
  });
});
