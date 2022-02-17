Peter_Pan = "";
Harry_Potter = "";

function preload() {
    Harry_Potter = loadSound("music.mp3");
    Peter_Pan = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();
}

function draw() {
    image(video, 0, 0, 600, 500);
}