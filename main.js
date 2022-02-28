Peter_Pan = "";
Harry_Potter = "";
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
scoreleftWrist = 0;
scorerightWrist = 0;

function preload() {
    Harry_Potter = loadSound("music.mp3");
    Peter_Pan = loadSound("music2.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded() {
    console.log('PoseNet Is Insitialised');
}

function draw() {
    image(video, 0, 0, 600, 500);

    fill("#FF0000");
    stroke("#FF0000");

    song1_status = Peter_Pan.isPlaying();
    song2_status = Harry_Potter.isPlaying();

    if (scoreleftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        Harry_Potter.stop();
        if (song1_status == false) {
            Peter_Pan.play();
            document.getElementById("song_name").innerHTML = "Playing Peter Pan Song";
        }
    }

    if (scorerightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        Peter_Pan.stop();
        if (song2_status == false) {
            Harry_Potter.play();
            document.getElementById("song_name").innerHTML = "Playing Harry Potter Song";
        }
    }
}

function gotPoses(results) {
    if (results.length > 0) {
        console.log(results);
        scoreleftWrist = results[0].pose.keypoints[9].score;
        scorerightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = " + scorerightWrist + "scoreLeftWrist = " + scoreleftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = " + leftWristX + "leftWristY = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristX + "rightWristY = " + rightWristY);
    }
}