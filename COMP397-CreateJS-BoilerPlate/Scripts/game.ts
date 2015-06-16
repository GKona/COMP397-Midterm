/// <reference path="typings/stats/stats.d.ts" />
/// <reference path="typings/easeljs/easeljs.d.ts" />
/// <reference path="typings/tweenjs/tweenjs.d.ts" />
/// <reference path="typings/soundjs/soundjs.d.ts" />
/// <reference path="typings/preloadjs/preloadjs.d.ts" />

// Author: Geri Kona -- >
// App: Die Roller -- >
// Date: Jun 16, 2015 -- >
// Description: A two die roller -- >

// Game Framework Variables
var canvas = document.getElementById("canvas");
var stage: createjs.Stage;
var stats: Stats;

var assets: createjs.LoadQueue;
var manifest = [
    { id: "pinkButton", src: "assets/images/rollButton.png" },
    { id: "die1", src: "assets/images/die1.jpg" },
    { id: "die2", src: "assets/images/die2.jpg" },
    { id: "die3", src: "assets/images/die3.jpg" },
    { id: "die4", src: "assets/images/die4.jpg" },
    { id: "die5", src: "assets/images/die5.jpg" },
    { id: "die6", src: "assets/images/die6.jpg" },
    { id: "clicked", src: "assets/audio/clicked.wav" }
];

// Game Variables
var title: createjs.Text; // create a reference
var dieNumb1: createjs.Text; // create a reference
var dieNumb2: createjs.Text; // create a reference
var die1: createjs.Bitmap;
var die2: createjs.Bitmap;
var pinkButton: createjs.Bitmap;


// Preloader Function
function preload() {
    assets = new createjs.LoadQueue();
    assets.installPlugin(createjs.Sound);
    // event listener triggers when assets are completely loaded
    assets.on("complete", init, this); 
    assets.loadManifest(manifest);
    //Setup statistics object
    setupStats();
}

// Callback function that initializes game objects
function init() {
    stage = new createjs.Stage(canvas); // reference to the stage
    stage.enableMouseOver(20);
    createjs.Ticker.setFPS(60); // framerate 60 fps for the game
    // event listener triggers 60 times every second
    createjs.Ticker.on("tick", gameLoop); 
    // calling main game function
    main();
}

// function to setup stat counting
function setupStats() {
    stats = new Stats();
    stats.setMode(0); // set to fps

    // align bottom-right
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.left = '330px';
    stats.domElement.style.top = '10px';

    document.body.appendChild(stats.domElement);
}


// Callback function that creates our Main Game Loop - refreshed 60 fps
function gameLoop() {
    stats.begin(); // Begin measuring

    stage.update();

    stats.end(); // end measuring
}

// Callback function that allows me to respond to button click events
function pinkButtonClicked(event: createjs.MouseEvent) {
    createjs.Sound.play("clicked");
    // clears canvas and reprints new values
    stage.removeChild(die1);
    stage.removeChild(die2);
    stage.removeChild(dieNumb1);
    stage.removeChild(dieNumb2);
    stage.removeChild(pinkButton);
    main();
}

// Callback functions that change the alpha transparency of the button

// Mouseover event
function pinkButtonOver() {
    pinkButton.alpha = 0.8;
}

// Mouseout event
function pinkButtonOut() {
    pinkButton.alpha = 1.0;
}

// Our Main Game Function
function main() {
    console.log("Game is Running");

    // assigns random number to die 1
    var number1 = Math.floor(Math.random() * (6 - 1)) + 1;
    console.log(number1);

    // assigns random number to die 2
    var number2 = Math.floor(Math.random() * (6 - 1)) + 1;
    console.log(number2);

    // displays title text
    title = new createjs.Text("Die Roller!", "40px Consolas", "#000000");
    title.regX = title.getMeasuredWidth() * 0.5;
    title.regY = title.getMeasuredHeight() * 0.5;
    title.x = 160;
    title.y = 50;
    stage.addChild(title);

    // displays die number 1 text
    dieNumb1 = new createjs.Text(number1.toString(), "40px Consolas", "#000000");
    dieNumb1.regX = dieNumb1.getMeasuredWidth() * 0.5;
    dieNumb1.regY = dieNumb1.getMeasuredHeight() * 0.5;
    dieNumb1.x = 90;
    dieNumb1.y = 270;
    stage.addChild(dieNumb1);

    // displays die number 2 text
    dieNumb2 = new createjs.Text(number2.toString(), "40px Consolas", "#000000");
    dieNumb2.regX = dieNumb2.getMeasuredWidth() * 0.5;
    dieNumb2.regY = dieNumb2.getMeasuredHeight() * 0.5;
    dieNumb2.x = 230;
    dieNumb2.y = 270;
    stage.addChild(dieNumb2);

    // displays roll button
    pinkButton = new createjs.Bitmap(assets.getResult("pinkButton"));
    pinkButton.regX = pinkButton.getBounds().width * 0.5;
    pinkButton.regY = pinkButton.getBounds().height * 0.5;
    pinkButton.x = 160;
    pinkButton.y = 360;
    stage.addChild(pinkButton);

    // die one image assignment
    if (number1 == 1) {
        die1 = new createjs.Bitmap(assets.getResult("die1"));
    }
    else if (number1 == 2) {
        die1 = new createjs.Bitmap(assets.getResult("die2"));
    }
    else if (number1 == 3) {
        die1 = new createjs.Bitmap(assets.getResult("die3"));
    }
    else if (number1 == 4) {
        die1 = new createjs.Bitmap(assets.getResult("die4"));
    }
    else if (number1 == 5) {
        die1 = new createjs.Bitmap(assets.getResult("die5"));
    }
    else if (number1 == 6) {
        die1 = new createjs.Bitmap(assets.getResult("die6"));
    }
    die1.regX = die1.getBounds().width * 0.5;
    die1.regY = die1.getBounds().height * 0.5;
    die1.x = 90;
    die1.y = 180;
    stage.addChild(die1);

    // die two image assignment
    if (number2 == 1) {
        die2 = new createjs.Bitmap(assets.getResult("die1"));
    }
    else if (number2 == 2) {
        die2 = new createjs.Bitmap(assets.getResult("die2"));
    }
    else if (number2 == 3) {
        die2 = new createjs.Bitmap(assets.getResult("die3"));
    }
    else if (number2 == 4) {
        die2 = new createjs.Bitmap(assets.getResult("die4"));
    }
    else if (number2 == 5) {
        die2 = new createjs.Bitmap(assets.getResult("die5"));
    }
    else if (number2 == 6) {
        die2 = new createjs.Bitmap(assets.getResult("die6"));
    }
    die2.regX = die2.getBounds().width * 0.5;
    die2.regY = die2.getBounds().height * 0.5;
    die2.x = 230;
    die2.y = 180;
    stage.addChild(die2);

    pinkButton.on("click", pinkButtonClicked);
    pinkButton.on("mouseover", pinkButtonOver);
    pinkButton.on("mouseout", pinkButtonOut);
}