// NOTE: Do NOT add setup() or draw() in this file
// setup() and draw() live in main.js
// This file only defines:
// 1) drawStart() → what the start/menu screen looks like
// 2) input handlers → what happens on click / key press on this screen
// 3) a helper function to draw menu buttons

// ------------------------------------------------------------
// Start screen visuals
// ------------------------------------------------------------
// drawStart() is called from main.js only when:
// currentScreen === "start"
function drawStart() {
  // Background colour for the start screen - pastel pink
  background(255, 220, 240); // soft pastel pink background

  // ---- Draw paw prints in background ----
  drawPawPrints();

  // ---- Title text ----
  fill(200, 100, 150); // soft pink text
  textSize(64);
  textAlign(CENTER, CENTER);
  text("Kitten Adoption Quest", width / 2, height / 3);

  // ---- Description text ----
  fill(180, 80, 130); // slightly darker pink for description
  textSize(24);
  textAlign(CENTER, CENTER);
  text("A funny story with cat chaos!", width / 2, height / 3 + 60);

  // ---- Buttons (data only) ----
  // These objects store the position/size/label for each button.
  // Using objects makes it easy to pass them into drawButton()
  // and also reuse the same information for hover checks.
  const startBtn = {
    x: width / 2,
    y: height / 3 + 150,
    w: 240,
    h: 80,
    label: "Start Adventure",
  };

  const instrBtn = {
    x: width / 2,
    y: height / 3 + 260,
    w: 240,
    h: 80,
    label: "Instructions",
  };

  // Draw both buttons
  drawButton(startBtn);
  drawButton(instrBtn);

  // ---- Cursor feedback ----
  // If the mouse is over either button, show a hand cursor
  // so the player knows it is clickable.
  const over = isHover(startBtn) || isHover(instrBtn);
  cursor(over ? HAND : ARROW);
}

// ------------------------------------------------------------
// Mouse input for the start screen
// ------------------------------------------------------------
// Called from main.js only when currentScreen === "start"
function startMousePressed() {
  // For input checks, we only need x,y,w,h (label is optional)
  const startBtn = { x: width / 2, y: height / 3 + 150, w: 240, h: 80 };
  const instrBtn = { x: width / 2, y: height / 3 + 260, w: 240, h: 80 };

  // If START is clicked, go to the game screen
  if (isHover(startBtn)) {
    currentScreen = "game";
  }
  // If INSTRUCTIONS is clicked, go to the instructions screen
  else if (isHover(instrBtn)) {
    currentScreen = "instr";
  }
}

// ------------------------------------------------------------
// Keyboard input for the start screen
// ------------------------------------------------------------
// Provides keyboard shortcuts:
// - ENTER starts the game
// - I opens instructions
function startKeyPressed() {
  if (keyCode === ENTER) {
    currentScreen = "game";
  }

  if (key === "i" || key === "I") {
    currentScreen = "instr";
  }
}

// ------------------------------------------------------------
// Helper: drawButton()
// ------------------------------------------------------------
// This function draws a button and changes its appearance on hover.
// It does NOT decide what happens when you click the button.
// That logic lives in startMousePressed() above.
//
// Keeping drawing separate from input/logic makes code easier to read.
function drawButton({ x, y, w, h, label }) {
  rectMode(CENTER);

  // Check if the mouse is over the button rectangle
  const hover = isHover({ x, y, w, h });

  noStroke();

  // ---- Visual feedback (hover vs not hover) ----
  // This is a common UI idea:
  // - normal state is calmer
  // - hover state is brighter + more “active”
  //
  // We also add a shadow using drawingContext (p5 lets you access the
  // underlying canvas context for effects like shadows).
  if (hover) {
    fill(255, 150, 200, 220); // bright pastel pink on hover

    // Shadow settings (only when hovered)
    drawingContext.shadowBlur = 20;
    drawingContext.shadowColor = color(255, 100, 180);
  } else {
    fill(255, 200, 230, 210); // soft pastel pink base

    // Softer shadow when not hovered
    drawingContext.shadowBlur = 8;
    drawingContext.shadowColor = color(220, 180, 210);
  }

  // Draw the rounded rectangle button
  rect(x, y, w, h, 14);

  // Important: reset shadow so it does not affect other drawings
  drawingContext.shadowBlur = 0;

  // Draw the label text on top of the button
  fill(150, 80, 120); // dark pastel purple text
  textSize(24);
  textAlign(CENTER, CENTER);
  text(label, x, y);
}

// ------------------------------------------------------------
// Helper: drawPawPrints()
// ------------------------------------------------------------
// Draws cute kitten paw prints in a walking pattern across the screen
function drawPawPrints() {
  // Set paw print color - slightly darker than background
  fill(255, 180, 220, 100); // semi-transparent pastel pink

  noStroke();

  // Create a walking line of paw prints with a zigzag pattern
  const numPaws = 8;
  const startX = 20;
  const endX = width - 40;
  const startY = height - 80;
  const endY = 60;

  // Draw paw prints along the path with a walking zigzag
  for (let i = 0; i < numPaws; i++) {
    const progress = i / (numPaws - 1); // 0 to 1
    const x = startX + (endX - startX) * progress;
    const y = startY + (endY - startY) * progress;

    // Add zigzag pattern to simulate walking
    const zigzag = Math.sin(progress * Math.PI * 3) * 30; // sine wave for left-right motion
    const xWithWiggle = x + zigzag;

    const size = 28;

    drawPaw(xWithWiggle, y, size);
  }
}

// Helper function to draw a single paw print
function drawPaw(x, y, size) {
  // Main pad (larger circle in center)
  circle(x, y, size);

  // Toe pads (4 smaller circles around the main pad)
  const offset = size * 0.6;
  circle(x - offset, y - offset * 1.2, size * 0.5); // top left
  circle(x + offset, y - offset * 1.2, size * 0.5); // top right
  circle(x - offset * 1.2, y + offset * 0.3, size * 0.5); // bottom left
  circle(x + offset * 1.2, y + offset * 0.3, size * 0.5); // bottom right
}
