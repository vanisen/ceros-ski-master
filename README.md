# Ceros Ski Code Challenge

## **Comments**

Completed the Ceros Ski Code Challenge. Below is the summary of bugs fixed, features added and known issues:

1. Fixed the **bug** which caused the game crash when the left key is pressed after the skier collides with an obstable. The issue was due to missing handler for left move for the skier.
2. Fixed the **bug** due to whhich the game threw a javascript error sometimes and crashes on load. The issue was resolved by initializing the previousGame window object on page load.
3. Added **Jump** functionality for the skier:
   1. Added a new obstacle **ramp**.
   2. The skier jumps when he hits the **ramp** or **SPACE** key is pressed.
   3. Rocks can be jumped over.
   4. Trees can NOT be jumped over.
   5. Added a cool **jump animation** using the provided assets.
4. Added **Rhino**:
   1. The rhino appears after the skier has skied for 20KMs distance (this can be configurable).
   2. The rhino chase downs the skier using run animation assets.
   3. When rhino catches the skier, he eats him. The **eat animation** is done using the provided eat assets.
   4. After rhino eats the skier, the game is over and a message is displayed to user.
   5. The game can be **RESET** by pressing the **ENTER** key.
5. Added a **Score HUD** overlay which displays the Score, Distance, and Difficulty level. I created a ScoreManager class to update the score and DisplayManager class to update the HUD and overlays.
6. Added **PAUSE** and **RESUME** functionality. The game can be paused and resumed at any time by pressing **ENTER** key. I created a StateManager class to keep track of the current state and next state transitions.
7. Added **difficulty levels** which increases as the skier skies further, the level start from 1 to 5. I have used StateManager class to calculate the difficulty and speed of the Skier.
8. Wrote **unit test cases** for Skier, which covers the above bugs fixed. It also tests functionalities like skier movement, jump and crash. 

---

Welcome to the Ceros Code Challenge - Ski Edition!

For this challenge, we have included some base code for Ceros Ski, our version of the classic Windows game SkiFree. If
you've never heard of SkiFree, Google has plenty of examples. Better yet, you can play our version here: 
http://ceros-ski.herokuapp.com/  

Or deploy it locally by running:
```
npm install
npm run dev
```

There is no exact time limit on this challenge and we understand that everyone has varying levels of free time. We'd 
rather you take the time and produce a solution up to your ability than rush and turn in a suboptimal challenge. Please 
look through the requirements below and let us know when you will have something for us to look at. If anything is 
unclear, don't hesitate to reach out.

**Requirements**

* **Fix a bug:**

  There is a bug in the game. Well, at least one bug that we know of. Use the following bug report to debug the code
  and fix it.
  * Steps to Reproduce:
    1. Load the game
    2. Crash into an obstacle
    3. Press the left arrow key
  * Expected Result: The skier gets up and is facing to the left
  * Actual Result: Giant blizzard occurs causing the screen to turn completely white (or maybe the game just crashes!)

* **Write unit tests:**

  The base code has Jest, a unit testing framework, installed. Write some unit tests to ensure that the above mentioned
  bug does not come back.
  
* **Extend existing functionality:**  

  We want to see your ability to extend upon a part of the game that already exists. Add in the ability for the skier to 
  jump. The asset file for jumps is already included. All you gotta do is make the guy jump. We even included some jump 
  trick assets if you wanted to get really fancy!
  * Have the skier jump by either pressing a key or use the ramp asset to have the skier jump whenever he hits a ramp.
  * The skier should be able to jump over some obstacles while in the air. 
    * Rocks can be jumped over
    * Trees can NOT be jumped over
  * Anything else you'd like to add to the skier's jumping ability, go for it!
   
* **Build something new:** 

  Now it's time to add something completely new. In the original Ski Free game, if you skied for too long, 
  a yeti would chase you down and eat you. In Ceros Ski, we've provided assets for a Rhino to run after the skier, 
  catch him and eat him.
  * The Rhino should appear after a set amount of time or distance skied and chase the skier, using the running assets
    we've provided to animate the rhino.
  * If the rhino catches the skier, it's game over and the rhino should eat the skier. 

* **Documentation:**

  * Update this README file with your comments about your work; what was done, what wasn't, features added & known bugs.
  * Provide a way for us to view the completed code and run it, either locally or through a cloud provider
  
* **Be original:**  
  * This should go without saying but don’t copy someone else’s game implementation!

**Grading** 

Your challenge will be graded based upon the following:

* How well you've followed the instructions. Did you do everything we said you should do?
* The quality of your code. We have a high standard for code quality and we expect all code to be up to production 
  quality before it gets to code review. Is it clean, maintainable, unit-testable, and scalable?
* The design of your solution and your ability to solve complex problems through simple and easy to read solutions.
* The effectiveness of your unit tests. Your tests should properly cover the code and methods being tested.
* How well you document your solution. We want to know what you did and why you did it.

**Bonus**

*Note: You won’t be marked down for excluding any of this, it’s purely bonus.  If you’re really up against the clock, 
make sure you complete all of the listed requirements and to focus on writing clean, well organized, and well documented 
code before taking on any of the bonus.*

If you're having fun with this, feel free to add more to it. Here's some ideas or come up with your own. We love seeing 
how creative candidates get with this.
 
* Provide a way to reset the game once it's over  
* Provide a way to pause and resume the game  
* Add a score that increments as the skier skis further 
* Increase the difficulty the longer the skier skis (increase speed, increase obstacle frequency, etc.)
* Deploy the game to a server so that we can play it without having to install it locally
* Write more unit tests for your code

We are looking forward to see what you come up with!
