// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawGame() → what the game screen looks like
// 2) input handlers → what happens when the player clicks or presses keys
// 3) helper functions specific to this screen

// ------------------------------
// Button data
// ------------------------------
// This object stores all the information needed to draw
// and interact with the button on the game screen.
// Keeping this in one object makes it easier to move,
// resize, or restyle the button later.
const nextBtn = {
  x: 700, // x position (centre of the button)
  y: 380, // y position (centre of the button) - closer to text box
  w: 140, // width
  h: 60, // height
  label: "Next", // text shown on the button
};

const choiceBtn1 = {
  x: 235, // x position (centre of the button)
  y: 650, // y position (centre of the button)
  w: 300, // width
  h: 80, // height
  label: "Pet the kitten", // text shown on the button (two lines)
};

const choiceBtn2 = {
  x: 565, // x position (centre of the button)
  y: 650, // y position (centre of the button)
  w: 300, // width
  h: 80, // height
  label: "Walk past the kitten", // text shown on the button
};

// Additional choice buttons for next scene when you take the kitten home
const vetBtn = {
  x: 265,
  y: 650,
  w: 320,
  h: 80,
  label: "Take it to the campus vet",
};

const hideBtn = {
  x: 535,
  y: 650,
  w: 320,
  h: 80,
  label: "Hide it in your backpack",
};

// Track whether the kitten is now with the player and last action taken
let kittenWithPlayer = false;
let lastAction = "";
// Buttons for the 'ignore' path (scene 3)
const findBtn = {
  x: 265,
  y: 650,
  w: 320,
  h: 80,
  label: "Find the kitten and scoop it up",
};

const storeBtn = {
  x: 535,
  y: 650,
  w: 320,
  h: 80,
  label: "Go to the store to buy treats",
};

// Buttons for the 'claim vet' path (scene 5 - after vet visit)
const claimBtn = {
  x: 265,
  y: 650,
  w: 320,
  h: 80,
  label: "The kitty is mine!",
};

const foundBtn = {
  x: 535,
  y: 650,
  w: 320,
  h: 80,
  label: "No, I just found it",
};

// Buttons for the naming choice (scene NAME)
const cuteNameBtn = {
  x: 265,
  y: 650,
  w: 320,
  h: 80,
  label: "Something cute",
};

const funnyNameBtn = {
  x: 535,
  y: 650,
  w: 320,
  h: 80,
  label: "Something funny",
};

// Restart button for the ending scene
const restartBtn = {
  x: 400,
  y: 650,
  w: 240,
  h: 80,
  label: "Restart",
};

// Buttons for the backpack scene
const confessBtn = {
  x: 265,
  y: 650,
  w: 320,
  h: 80,
  label: "Confess",
};

const sneakBtn = {
  x: 535,
  y: 650,
  w: 320,
  h: 80,
  label: "Sneak out",
};

// ------------------------------
// Main draw function for this screen
// ------------------------------
// drawGame() is called from main.js *only*
// when currentScreen === "game"
function drawGame() {
  // Set background colour for the game screen - pastel pink like title page
  background(255, 220, 240);

  // ---- Draw heart meter in top right ----
  drawHeartMeter();

  // ---- Debug overlay (shows current screen and scene) ----
  drawDebugOverlay();

  // ---- Display scene-specific content ----
  if (gameScene === SCENES.INTRO) {
    drawScene1();
  } else if (gameScene === SCENES.KITTEN) {
    drawScene2();
  } else if (gameScene === SCENES.BACKPACK) {
    drawSceneBackpack();
  } else if (gameScene === SCENES.CONFESS) {
    drawSceneConfess();
  } else if (gameScene === SCENES.SNEAK) {
    drawSceneSneak();
  } else if (gameScene === SCENES.SNEAK2) {
    drawSceneSneak2();
  } else if (gameScene === SCENES.FIND) {
    drawSceneFind();
  } else if (gameScene === SCENES.FINDCUTE) {
    drawSceneFindCute();
  } else if (gameScene === SCENES.FINDFUNNY) {
    drawSceneFindFunny();
  } else if (gameScene === SCENES.TREATS) {
    drawSceneTreats();
  } else if (gameScene === SCENES.TREATS2) {
    drawSceneTreats2();
  } else if (gameScene === SCENES.IGNORE) {
    drawScene3();
  } else if (gameScene === SCENES.CLAIM) {
    drawSceneClaimVet();
  } else if (gameScene === SCENES.NAME) {
    drawSceneName();
  } else if (gameScene === SCENES.CUTENAME) {
    drawSceneCuteName();
  } else if (gameScene === SCENES.FUNNYNAME) {
    drawSceneFunnyName();
  } else if (gameScene === SCENES.ENDING) {
    drawSceneEnding();
  } else if (gameScene === SCENES.FLYER) {
    drawSceneFlyer();
  } else if (gameScene === SCENES.RESULT) {
    drawScene4();
  }
}

// Scene 1: Introduction and kitten choice
function drawScene1() {
  // ---- Story text box ----
  drawStoryBox(
    "A droplet of rain falls on your face...it's raining. You see a small kitten on the side of the road, it seems to be shivering. What do you do?",
  );
  // ---- Compute button positions to guarantee a visible gap ----
  const minGap = 32;
  const sideMargin = 60; // match text box margins
  const avail = width - sideMargin * 2;

  // Use configured widths but shrink if they don't fit
  let w1 = choiceBtn1.w;
  let w2 = choiceBtn2.w;
  if (w1 + w2 + minGap > avail) {
    const newW = Math.max(80, Math.floor((avail - minGap) / 2));
    w1 = newW;
    w2 = newW;
  }

  const gap = minGap;
  const groupWidth = w1 + w2 + gap;
  const startX = width / 2 - groupWidth / 2;

  choiceBtn1.w = w1;
  choiceBtn2.w = w2;
  choiceBtn1.x = startX + w1 / 2;
  choiceBtn2.x = startX + w1 + gap + w2 / 2;

  // ---- Draw choice buttons ----
  drawChoiceButton(choiceBtn1);
  drawChoiceButton(choiceBtn2);

  // ---- Cursor feedback ----
  const over = isHover(choiceBtn1) || isHover(choiceBtn2);
  cursor(over ? HAND : ARROW);
}

// Scene 2: After making a choice (or next beat)
function drawScene2() {
  if (kittenWithPlayer) {
    // The kitten came home with you — show new choices
    drawStoryBox(
      "The kitten purrs happily and follows you home. I think it likes you! The next morning...",
    );

    // Compute vet/hide button positions to guarantee gap
    const minGap2 = 32;
    const sideMargin2 = 60;
    const avail2 = width - sideMargin2 * 2;
    let wv = vetBtn.w;
    let wh = hideBtn.w;
    if (wv + wh + minGap2 > avail2) {
      const newW = Math.max(80, Math.floor((avail2 - minGap2) / 2));
      wv = newW;
      wh = newW;
    }
    const gap2 = minGap2;
    const groupW2 = wv + wh + gap2;
    const startX2 = width / 2 - groupW2 / 2;
    vetBtn.w = wv;
    hideBtn.w = wh;
    vetBtn.x = startX2 + wv / 2;
    hideBtn.x = startX2 + wv + gap2 + wh / 2;

    // Draw vet / hide choices
    drawChoiceButton(vetBtn);
    drawChoiceButton(hideBtn);

    const over = isHover(vetBtn) || isHover(hideBtn);
    cursor(over ? HAND : ARROW);
  } else {
    // You walked past — show the simple result and Next
    const sceneText = "You walk on, leaving the kitten behind.";
    drawStoryBox(sceneText);
    drawGameButton(nextBtn);
    cursor(isHover(nextBtn) ? HAND : ARROW);
  }
}

// Scene BACKPACK: After choosing to hide kitten in backpack
function drawSceneBackpack() {
  const text =
    "You hide the kitten in your backpack and hope nobody notices. Mid lecture, people are alerted by a strange purring sound...";
  drawStoryBox(text);

  // Compute confess/sneak button positions to guarantee gap
  const minGap2 = 32;
  const sideMargin2 = 60;
  const avail2 = width - sideMargin2 * 2;
  let wc = confessBtn.w;
  let ws = sneakBtn.w;
  if (wc + ws + minGap2 > avail2) {
    const newW = Math.max(80, Math.floor((avail2 - minGap2) / 2));
    wc = newW;
    ws = newW;
  }
  const gap2 = minGap2;
  const groupW2 = wc + ws + gap2;
  const startX2 = width / 2 - groupW2 / 2;
  confessBtn.w = wc;
  sneakBtn.w = ws;
  confessBtn.x = startX2 + wc / 2;
  sneakBtn.x = startX2 + wc + gap2 + ws / 2;

  drawChoiceButton(confessBtn);
  drawChoiceButton(sneakBtn);

  const over = isHover(confessBtn) || isHover(sneakBtn);
  cursor(over ? HAND : ARROW);
}

// Scene CONFESS: After confessing to the kitten
function drawSceneConfess() {
  const text =
    "You raise your hand and carefully take sleeping kitten out of your bag. The whole class starts laughing and taking pictures!";
  drawStoryBox(text);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// Scene SNEAK: After sneaking out
function drawSceneSneak() {
  const text =
    "You make a quiet and swift exit out the door. *THUD* You accidentally bump into security!";
  drawStoryBox(text);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// Scene SNEAK2: After bumping into security
function drawSceneSneak2() {
  const text =
    "You surrender to the security man's questioning and open your bag. Suddenly, the kitten jumps out and runs off! Well, maybe you'll see it again another day.";
  drawStoryBox(text);
  drawGameButton(restartBtn);
  cursor(isHover(restartBtn) ? HAND : ARROW);
}

// Scene FIND: After finding the kitten in the alley
function drawSceneFind() {
  const text =
    "Phew! The kitten is still there! You feel relieved and a bit guilty. Let's name this little kitten.";
  drawStoryBox(text);

  // Compute cute/funny button positions to guarantee gap
  const minGap2 = 32;
  const sideMargin2 = 60;
  const avail2 = width - sideMargin2 * 2;
  let wc = cuteNameBtn.w;
  let wf = funnyNameBtn.w;
  if (wc + wf + minGap2 > avail2) {
    const newW = Math.max(80, Math.floor((avail2 - minGap2) / 2));
    wc = newW;
    wf = newW;
  }
  const gap2 = minGap2;
  const groupW2 = wc + wf + gap2;
  const startX2 = width / 2 - groupW2 / 2;
  cuteNameBtn.w = wc;
  funnyNameBtn.w = wf;
  cuteNameBtn.x = startX2 + wc / 2;
  funnyNameBtn.x = startX2 + wc + gap2 + wf / 2;

  drawChoiceButton(cuteNameBtn);
  drawChoiceButton(funnyNameBtn);

  const over = isHover(cuteNameBtn) || isHover(funnyNameBtn);
  cursor(over ? HAND : ARROW);
}

// Scene FINDCUTE: After naming found kitten cute
function drawSceneFindCute() {
  const text =
    "Mochi! Although you didn't take the cat home, your new daily schedule now includes feeding the kitten everyday on your way to class";
  drawStoryBox(text);
  drawGameButton(restartBtn);
  cursor(isHover(restartBtn) ? HAND : ARROW);
}

// Scene FINDFUNNY: After naming found kitten funny
function drawSceneFindFunny() {
  const text =
    "Mr.Fluffyorangetunalover sleeps soundly in his cardboard box. I guess you'll have to visit him pretty often and feed this little guy.";
  drawStoryBox(text);
  drawGameButton(restartBtn);
  cursor(isHover(restartBtn) ? HAND : ARROW);
}

// Scene TREATS: After buying treats at the store
function drawSceneTreats() {
  const text =
    "You found some fish treats! You're about to feed the kitten when it suddenly jumps up and snatches the fish. Oh no! The kitten is running towards the park!";
  drawStoryBox(text);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// Scene TREATS2: Kitten at the park party
function drawSceneTreats2() {
  const text =
    "*huff* You look up and see a group of familiar faces sitting around a small fluffy blob. Looking closer, it's your friends! I guess the little kitten just wanted a big party!";
  drawStoryBox(text);
  drawGameButton(restartBtn);
  cursor(isHover(restartBtn) ? HAND : ARROW);
}

// Scene 3: After second choice
// Scene 3: Ignore path (walk past) — return later choices
function drawScene3() {
  const text =
    "You walk away and the kitten cries continue in the distance. Regret starts to hit during your lecture. After class, you sneak back to the alleyway...";
  drawStoryBox(text);

  // Compute find/store button positions to guarantee gap
  const minGap2 = 32;
  const sideMargin2 = 60;
  const avail2 = width - sideMargin2 * 2;
  let wf = findBtn.w;
  let ws = storeBtn.w;
  if (wf + ws + minGap2 > avail2) {
    const newW = Math.max(80, Math.floor((avail2 - minGap2) / 2));
    wf = newW;
    ws = newW;
  }
  const gap2 = minGap2;
  const groupW2 = wf + ws + gap2;
  const startX2 = width / 2 - groupW2 / 2;
  findBtn.w = wf;
  storeBtn.w = ws;
  findBtn.x = startX2 + wf / 2;
  storeBtn.x = startX2 + wf + gap2 + ws / 2;

  drawChoiceButton(findBtn);
  drawChoiceButton(storeBtn);

  const over = isHover(findBtn) || isHover(storeBtn);
  cursor(over ? HAND : ARROW);
}

// Scene CLAIM: After taking kitten to vet
function drawSceneClaimVet() {
  const text =
    "You take the kitten to the campus vet. It gets checked over and it's healthy! The vet asks if it's your kitten...";
  drawStoryBox(text);

  // Compute claim/found button positions to guarantee gap
  const minGap2 = 32;
  const sideMargin2 = 60;
  const avail2 = width - sideMargin2 * 2;
  let wc = claimBtn.w;
  let wf = foundBtn.w;
  if (wc + wf + minGap2 > avail2) {
    const newW = Math.max(80, Math.floor((avail2 - minGap2) / 2));
    wc = newW;
    wf = newW;
  }
  const gap2 = minGap2;
  const groupW2 = wc + wf + gap2;
  const startX2 = width / 2 - groupW2 / 2;
  claimBtn.w = wc;
  foundBtn.w = wf;
  claimBtn.x = startX2 + wc / 2;
  foundBtn.x = startX2 + wc + gap2 + wf / 2;

  drawChoiceButton(claimBtn);
  drawChoiceButton(foundBtn);

  const over = isHover(claimBtn) || isHover(foundBtn);
  cursor(over ? HAND : ARROW);
}

// Scene NAME: Naming the kitten
function drawSceneName() {
  const text = "What should we name our new kitten friend?";
  drawStoryBox(text);

  // Compute cute/funny button positions to guarantee gap
  const minGap2 = 32;
  const sideMargin2 = 60;
  const avail2 = width - sideMargin2 * 2;
  let wc = cuteNameBtn.w;
  let wf = funnyNameBtn.w;
  if (wc + wf + minGap2 > avail2) {
    const newW = Math.max(80, Math.floor((avail2 - minGap2) / 2));
    wc = newW;
    wf = newW;
  }
  const gap2 = minGap2;
  const groupW2 = wc + wf + gap2;
  const startX2 = width / 2 - groupW2 / 2;
  cuteNameBtn.w = wc;
  funnyNameBtn.w = wf;
  cuteNameBtn.x = startX2 + wc / 2;
  funnyNameBtn.x = startX2 + wc + gap2 + wf / 2;

  drawChoiceButton(cuteNameBtn);
  drawChoiceButton(funnyNameBtn);

  const over = isHover(cuteNameBtn) || isHover(funnyNameBtn);
  cursor(over ? HAND : ARROW);
}

// Scene FLYER: Posting a found flyer
function drawSceneFlyer() {
  const text =
    "Let's find this kitten a good home! Time to put my GBDA skills to use and make a nice flyer for this little guy";
  drawStoryBox(text);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// Scene CUTENAME: After choosing cute name
function drawSceneCuteName() {
  const text = "Welcoming our newest family member...Mochi!";
  drawStoryBox(text);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// Scene FUNNYNAME: After choosing funny name
function drawSceneFunnyName() {
  const text =
    "You gave it a hilarious name. Your friends can't stop laughing!";
  drawStoryBox(text);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// Scene ENDING: Final results based on hearts
function drawSceneEnding() {
  let endingText = "";

  if (lastAction === "confess") {
    endingText =
      "You're now famous across campus as the Kitten Whisperer! It was a fun time, but maybe this kitten can find a better home.";
  } else if (lastAction === "findcute") {
    endingText =
      "Mochi! Although you didn't take the cat home, your new daily schedule now includes feeding the kitten everyday on your way to class";
  } else if (lastAction === "findfunny") {
    endingText =
      "Mr.Fluffyorangetunalover sleeps soundly in his cardboard box. I guess you'll have to visit him pretty often and feed this little guy.";
  } else if (lastAction === "store") {
    endingText =
      "*huff* You look up and see a group of familiar faces sitting around a small fluffy blob. Looking closer, it's your friends! I guess the little kitten just wanted a big party!";
  } else if (lastAction === "found" || lastAction === "flyer") {
    endingText =
      "Your flyer went viral online and the kitten found a loving new home. Yay!";
  } else if (hearts >= 3) {
    endingText =
      "🏆 PERFECT ENDING! Mochi lives happily with you, cat parent forever!";
  } else if (hearts >= 2) {
    endingText = "😺 GOOD ENDING! Mochi is thriving and full of love!";
  } else if (hearts >= 1) {
    endingText =
      "🐱 OKAY ENDING! Mochi found a good home nearby. Happy memories!";
  } else {
    endingText =
      "😿 BITTERSWEET ENDING: The adventure was wild, but Mochi found joy.";
  }

  drawStoryBox(endingText);
  drawGameButton(restartBtn);
  cursor(isHover(restartBtn) ? HAND : ARROW);
}

// Scene 4: Result after vet/hide or find/store
function drawScene4() {
  let sceneText = "";
  if (lastAction === "vet") {
    sceneText =
      "You take the kitten to the campus vet. It gets checked over and seems healthy — you're a good friend.";
  } else if (lastAction === "hide") {
    sceneText =
      "You hide the kitten in your backpack. It's warm but squirmy — you hope no one notices.";
  } else if (lastAction === "find") {
    sceneText =
      "You find the kitten and scoop it up. It snuggles into your arms, purring.";
  } else if (lastAction === "store") {
    sceneText =
      "You go to the store and buy treats. The kitten seems to like them when you return.";
  }

  drawStoryBox(sceneText);
  drawGameButton(nextBtn);
  cursor(isHover(nextBtn) ? HAND : ARROW);
}

// ------------------------------
// Story text box display
// ------------------------------
// Displays the story text in a nice text box
function drawStoryBox(storyText) {
  const boxX = 60;
  const boxY = 100;
  const boxWidth = width - 120;
  const textPadding = 40;
  const maxTextWidth = boxWidth - 2 * textPadding;

  // Estimate box height based on text content
  let estimatedHeight = 150;
  if (storyText.length > 40) estimatedHeight = 200;
  if (storyText.length > 80) estimatedHeight = 250;

  // Draw text box background with darker pink
  fill(245, 200, 230); // darker pastel pink
  stroke(200, 150, 190); // slightly darker border
  strokeWeight(2);
  rectMode(CORNER);
  rect(boxX, boxY, boxWidth, estimatedHeight, 10);

  // Draw story text
  noStroke();
  fill(50);
  textSize(28);
  textAlign(LEFT, TOP);
  textWrap(WORD);
  text(
    storyText,
    boxX + textPadding,
    boxY + textPadding,
    maxTextWidth,
    estimatedHeight - 2 * textPadding,
  );
}

// ------------------------------
// Heart meter display
// ------------------------------
// Draws the heart meter in the top right corner of the screen
function drawHeartMeter() {
  const heartSize = 36; // emoji text size
  const startX = width - 150;
  const startY = 24;
  const spacing = 48;

  // Draw heart label with larger text
  fill(0);
  textSize(22);
  textAlign(LEFT, TOP);
  text("Hearts:", startX - 110, startY - 4);

  // Draw hearts using emoji characters
  textSize(heartSize);
  textAlign(CENTER, CENTER);

  for (let i = 0; i < 3; i++) {
    const x = startX + i * spacing;
    const y = startY + 8;

    let emoji = "🤍"; // default white heart

    if (hearts >= 0) {
      // filled hearts are red, others white
      emoji = i < hearts ? "❤️" : "🤍";
    } else {
      // negative hearts: black hearts for the magnitude, then white
      emoji = i < Math.abs(hearts) ? "🖤" : "🤍";
    }

    noStroke();
    text(emoji, x, y);
  }
}

// Helper function to draw a heart shape
function drawHeart(x, y, size) {
  push();
  translate(x, y);

  // Parameters
  const r = size * 0.28; // radius for the top lobes
  const bottomY = size * 0.4;

  // Draw filled body (caller sets fill color)
  noStroke();
  ellipse(-r, -r / 2, r * 2, r * 2);
  ellipse(r, -r / 2, r * 2, r * 2);
  beginShape();
  vertex(-size * 0.5, 0);
  vertex(0, bottomY);
  vertex(size * 0.5, 0);
  endShape(CLOSE);

  // Draw outline for heart
  stroke(150);
  strokeWeight(2);
  noFill();
  // Outline uses the same primitive shapes
  ellipse(-r, -r / 2, r * 2, r * 2);
  ellipse(r, -r / 2, r * 2, r * 2);
  beginShape();
  vertex(-size * 0.5, 0);
  vertex(0, bottomY);
  vertex(size * 0.5, 0);
  endShape(CLOSE);

  pop();
}

// ------------------------------
// Button drawing helper
// ------------------------------
// This function is responsible *only* for drawing the button.
// It does NOT handle clicks or game logic.
function drawGameButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check if the mouse is hovering over the button
  // isHover() is defined in main.js so it can be shared
  const hover = isHover({ x, y, w, h });

  noStroke();

  // Change button colour when hovered
  // This gives visual feedback to the player
  fill(
    hover
      ? color(180, 220, 255, 220) // lighter blue on hover
      : color(200, 220, 255, 190), // normal state
  );

  // Draw the button rectangle
  rect(x, y, w, h, 14); // last value = rounded corners

  // Draw the button text
  fill(0);
  textSize(28);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// Choice button drawing helper - cute and rounded
// ------------------------------
function drawChoiceButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  const hover = isHover({ x, y, w, h });

  noStroke();

  // Cute pastel colors for choice buttons
  if (hover) {
    fill(255, 150, 180, 230); // bright pastel pink on hover
  } else {
    fill(255, 180, 210, 200); // soft pastel pink
  }

  // Very rounded corners for cute effect
  rect(x, y, w, h, 30);

  // Draw the button text
  fill(100);
  textSize(22);
  textAlign(CENTER, CENTER);
  textWrap(WORD);
  text(label, x, y);
}

// ------------------------------
// Mouse input for this screen
// ------------------------------
// This function is called from main.js
// only when currentScreen === "game"
function gameMousePressed() {
  console.log(
    "gameMousePressed: currentScreen=",
    currentScreen,
    "gameScene=",
    gameScene,
  );
  if (gameScene === SCENES.INTRO) {
    // Scene 1: Choice buttons
    if (isHover(choiceBtn1)) {
      console.log("Clicked choiceBtn1 (Pet) in scene", gameScene);
      // Pet the kitten - gain a heart and kitten comes with you
      hearts = Math.min(hearts + 1, 3);
      kittenWithPlayer = true;
      gameScene = SCENES.KITTEN; // advance to kitten scene
    } else if (isHover(choiceBtn2)) {
      console.log("Clicked choiceBtn2 (Walk past) in scene", gameScene);
      // Walk past the kitten
      kittenWithPlayer = false;
      gameScene = SCENES.IGNORE; // advance to IGNORE scene
    }
  } else if (gameScene === SCENES.KITTEN) {
    // Scene 2: If kitten is with you, handle vet/hide choices
    if (kittenWithPlayer) {
      if (isHover(vetBtn)) {
        console.log("Clicked vetBtn in scene", gameScene);
        hearts = Math.min(hearts + 1, 3);
        lastAction = "vet";
        gameScene = SCENES.CLAIM;
      } else if (isHover(hideBtn)) {
        console.log("Clicked hideBtn in scene", gameScene);
        lastAction = "hide";
        gameScene = SCENES.BACKPACK;
      }
    } else {
      // If kitten not with you, Next proceeds
      if (isHover(nextBtn)) {
        triggerRandomOutcome();
      }
    }
  } else if (gameScene === SCENES.IGNORE) {
    // Scene 3: ignore path choices (find or store)
    if (isHover(findBtn)) {
      console.log("Clicked findBtn in scene", gameScene);
      hearts = Math.min(hearts + 1, 3);
      lastAction = "find";
      gameScene = SCENES.FIND;
    } else if (isHover(storeBtn)) {
      console.log("Clicked storeBtn in scene", gameScene);
      lastAction = "store";
      gameScene = SCENES.TREATS;
    }
  } else if (gameScene === SCENES.BACKPACK) {
    // Scene BACKPACK: Confess or sneak choice
    if (isHover(confessBtn)) {
      console.log("Clicked confessBtn in scene", gameScene);
      lastAction = "confess";
      gameScene = SCENES.CONFESS;
    } else if (isHover(sneakBtn)) {
      console.log("Clicked sneakBtn in scene", gameScene);
      lastAction = "sneak";
      gameScene = SCENES.SNEAK;
    }
  } else if (gameScene === SCENES.CONFESS) {
    // Scene CONFESS: Next proceeds to ending
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in CONFESS scene");
      gameScene = SCENES.ENDING;
    }
  } else if (gameScene === SCENES.SNEAK) {
    // Scene SNEAK: Next proceeds to the follow-up (SNEAK2)
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in SNEAK scene");
      gameScene = SCENES.SNEAK2;
    }
  } else if (gameScene === SCENES.SNEAK2) {
    // Scene SNEAK2: Restart button returns to start
    if (isHover(restartBtn)) {
      console.log("Clicked restartBtn in SNEAK2 scene");
      currentScreen = "start";
    }
  } else if (gameScene === SCENES.FIND) {
    // Scene FIND: Naming choice
    if (isHover(cuteNameBtn)) {
      console.log("Clicked cuteNameBtn in FIND scene");
      lastAction = "findcute";
      gameScene = SCENES.FINDCUTE;
    } else if (isHover(funnyNameBtn)) {
      console.log("Clicked funnyNameBtn in FIND scene");
      lastAction = "findfunny";
      gameScene = SCENES.FINDFUNNY;
    }
  } else if (gameScene === SCENES.FINDCUTE) {
    // Scene FINDCUTE: Restart button returns to start
    if (isHover(restartBtn)) {
      console.log("Clicked restartBtn in FINDCUTE scene");
      currentScreen = "start";
    }
  } else if (gameScene === SCENES.FINDFUNNY) {
    // Scene FINDFUNNY: Restart button returns to start
    if (isHover(restartBtn)) {
      console.log("Clicked restartBtn in FINDFUNNY scene");
      currentScreen = "start";
    }
  } else if (gameScene === SCENES.CLAIM) {
    // Scene CLAIM: Claim or found choice
    if (isHover(claimBtn)) {
      console.log("Clicked claimBtn in scene", gameScene);
      hearts = Math.min(hearts + 1, 3);
      lastAction = "claim";
      gameScene = SCENES.NAME;
    } else if (isHover(foundBtn)) {
      console.log("Clicked foundBtn in scene", gameScene);
      lastAction = "found";
      gameScene = SCENES.FLYER;
    }
  } else if (gameScene === SCENES.NAME) {
    // Scene NAME: Naming choice
    if (isHover(cuteNameBtn)) {
      console.log("Clicked cuteNameBtn in scene", gameScene);
      lastAction = "cute";
      gameScene = SCENES.CUTENAME;
    } else if (isHover(funnyNameBtn)) {
      console.log("Clicked funnyNameBtn in scene", gameScene);
      lastAction = "funny";
      gameScene = SCENES.FUNNYNAME;
    }
  } else if (gameScene === SCENES.CUTENAME) {
    // Scene CUTENAME: Next proceeds to ending
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in CUTENAME scene");
      gameScene = SCENES.ENDING;
    }
  } else if (gameScene === SCENES.FUNNYNAME) {
    // Scene FUNNYNAME: Next proceeds to ending
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in FUNNYNAME scene");
      gameScene = SCENES.ENDING;
    }
  } else if (gameScene === SCENES.TREATS) {
    // Scene TREATS: Next proceeds to TREATS2
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in TREATS scene");
      gameScene = SCENES.TREATS2;
    }
  } else if (gameScene === SCENES.TREATS2) {
    // Scene TREATS2: Restart button returns to start
    if (isHover(restartBtn)) {
      console.log("Clicked restartBtn in TREATS2 scene");
      currentScreen = "start";
    }
  } else if (gameScene === SCENES.FLYER) {
    // Scene FLYER: Next proceeds to viral result and ending
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in FLYER scene");
      lastAction = "flyer";
      gameScene = SCENES.ENDING;
    }
  } else if (gameScene === SCENES.ENDING) {
    // Scene ENDING: Restart button takes you back to start
    if (isHover(restartBtn)) {
      console.log("Clicked restartBtn in ENDING scene");
      currentScreen = "start";
    }
  } else if (gameScene === SCENES.NAME) {
    // Scene NAME: Next proceeds to result
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in NAME scene");
      gameScene = SCENES.RESULT;
    }
  } else if (gameScene === SCENES.FLYER) {
    // Scene FLYER: Next proceeds to result
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in FLYER scene");
      gameScene = SCENES.RESULT;
    }
  } else if (gameScene === SCENES.RESULT) {
    // Scene 4: Next button leads to win/lose
    if (isHover(nextBtn)) {
      console.log("Clicked nextBtn in scene", gameScene);
      triggerRandomOutcome();
    }
  }
}

// Small debug overlay to help trace state while testing
function drawDebugOverlay() {
  push();
  rectMode(CORNER);
  fill(255, 255, 255, 200);
  stroke(180);
  rect(10, 10, 220, 64, 8);
  noStroke();
  fill(30);
  textSize(12);
  textAlign(LEFT, TOP);
  const sceneName = getSceneName(gameScene);
  text(`screen: ${currentScreen}`, 18, 16);
  text(`scene: ${sceneName} (${gameScene})`, 18, 34);
  pop();
}

function getSceneName(val) {
  for (const k in SCENES) if (SCENES[k] === val) return k;
  return String(val);
}

// ------------------------------
// Keyboard input for this screen
// ------------------------------
// Allows keyboard-only interaction (accessibility + design)
function gameKeyPressed() {
  // LEFT arrow key triggers left choice button
  if (keyCode === LEFT) {
    // Scene 1: choice buttons
    if (gameScene === SCENES.INTRO) {
      console.log("LEFT arrow pressed - triggering choiceBtn1 (Pet)");
      hearts = Math.min(hearts + 1, 3);
      kittenWithPlayer = true;
      gameScene = SCENES.KITTEN;
    }
    // Scene 2: vet/hide buttons
    else if (gameScene === SCENES.KITTEN && kittenWithPlayer) {
      console.log("LEFT arrow pressed - triggering vetBtn (Vet)");
      hearts = Math.min(hearts + 1, 3);
      gameScene = SCENES.CLAIM;
    }
    // Scene 3: find/store buttons
    else if (gameScene === SCENES.IGNORE) {
      console.log("LEFT arrow pressed - triggering findBtn (Find)");
      gameScene = SCENES.FIND;
    }
    // Claim scene: claim/found buttons
    else if (gameScene === SCENES.CLAIM) {
      console.log("LEFT arrow pressed - triggering claimBtn (Claim)");
      hearts = Math.min(hearts + 1, 3);
      lastAction = "claim";
      gameScene = SCENES.NAME;
    }
    // Name scene: cute/funny buttons
    else if (gameScene === SCENES.NAME) {
      console.log("LEFT arrow pressed - triggering cuteNameBtn");
      lastAction = "cute";
      gameScene = SCENES.CUTENAME;
    }
    // Find scene: cute/funny buttons
    else if (gameScene === SCENES.FIND) {
      console.log("LEFT arrow pressed - triggering cuteNameBtn for find");
      lastAction = "findcute";
      gameScene = SCENES.FINDCUTE;
    }
    // Backpack scene: confess/sneak buttons
    else if (gameScene === SCENES.BACKPACK) {
      console.log("LEFT arrow pressed - triggering confessBtn");
      gameScene = SCENES.CONFESS;
    }
  }
  // RIGHT arrow key triggers right choice button
  else if (keyCode === RIGHT) {
    // Scene 1: choice buttons
    if (gameScene === SCENES.INTRO) {
      console.log("RIGHT arrow pressed - triggering choiceBtn2 (Walk past)");
      kittenWithPlayer = false;
      gameScene = SCENES.IGNORE;
    }
    // Scene 2: vet/hide buttons
    else if (gameScene === SCENES.KITTEN && kittenWithPlayer) {
      console.log("RIGHT arrow pressed - triggering hideBtn (Hide)");
      gameScene = SCENES.BACKPACK;
    }
    // Scene 3: find/store buttons
    else if (gameScene === SCENES.IGNORE) {
      console.log("RIGHT arrow pressed - triggering storeBtn (Store)");
      lastAction = "store";
      gameScene = SCENES.TREATS;
    }
    // Claim scene: claim/found buttons
    else if (gameScene === SCENES.CLAIM) {
      console.log("RIGHT arrow pressed - triggering foundBtn (Found)");
      lastAction = "found";
      gameScene = SCENES.FLYER;
    }
    // Name scene: cute/funny buttons
    else if (gameScene === SCENES.NAME) {
      console.log("RIGHT arrow pressed - triggering funnyNameBtn");
      lastAction = "funny";
      gameScene = SCENES.FUNNYNAME;
    }
    // Find scene: cute/funny buttons
    else if (gameScene === SCENES.FIND) {
      console.log("RIGHT arrow pressed - triggering funnyNameBtn for find");
      lastAction = "findfunny";
      gameScene = SCENES.FINDFUNNY;
    }
    // Backpack scene: confess/sneak buttons
    else if (gameScene === SCENES.BACKPACK) {
      console.log("RIGHT arrow pressed - triggering sneakBtn");
      gameScene = SCENES.SNEAK;
    }
  }
}

// ------------------------------
// Game logic: win or lose
// ------------------------------
// This function decides what happens next in the game.
// It does NOT draw anything.
function triggerRandomOutcome() {
  // random() returns a value between 0 and 1
  // Here we use a 50/50 chance:
  // - less than 0.5 → win
  // - 0.5 or greater → lose
  //
  // You can bias this later, for example:
  // random() < 0.7 → 70% chance to win
  if (random() < 0.5) {
    currentScreen = "win";
  } else {
    currentScreen = "lose";
  }
}
