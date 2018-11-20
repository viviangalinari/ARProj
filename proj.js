ClearAll()
var TimeAway = 0;
    mapDirectory("/Users/Josh/Desktop/resources", "/sounds")

    // The narrations
    var mySound = makeSource("voice1", "/sounds/Voice.mp3")
    var mySound2 = makeSource("piano1", "/sounds/Piano.mp3")
    var mySound3 = makeSource("drums1", "/sounds/Drums.mp3")

    // The array of sounds to conveniently access them
    var Sounds[] = {mySound, mySound2, mySound3}

    // The booleans, determining what the user has/hasn't done
    var LeftSource = false;
    var ReturnedToSource = false;
    
    // Int to determine which code played last
    var LastSound = -1;

    // The position of the camera
    var CameraPos = getCurrentCamera().position;
    var up = getCurrentCamera().up
    var forward = getCurrentCamera().forward
    var left = vec(0,0,0).crossVectors(up, forward)

    // The first sources will be relative to the initial position
    mySound.source.setPosition(voiceBox.mesh.position.x, voiceBox.mesh.position.y, voiceBox.mesh.position.z);
    mySound2.source.setPosition(PianoBox.mesh.position.x, PianoBox.mesh.position.y, PianoBox.mesh.position.z);
            
    // The max distances of the sound
    mySound.source.setMaxDistance(1)
    mySound2.source.setMaxDistance(1)
    mySound3.source.setMaxDistance(1)
        
    // We play the first sound, and it will continue if the user doesn't
    // move around too much.
    mySound.play;
    LastSound = 0;

    _r = () => {

        // Sound 3 constantly follows the camera, in case it needs to be played
        // when the user goes away
        mySound3.source.setPosition(CameraPos.x, CameraPos.y, CameraPos.z);
        
        // But, if the user does decide to move around, trigger the other
        // script
        if (CameraPos.distanceTo(vec(mySound.source.x, mySound.source.y, mySound.source.z)) > 1) {
            
            // Time how long they've been gone, in case they aren't compliant
            TimeAway++;

            // Play new script
            mySound.pause;
            mySound2.play;

            // Indicate that the user left the source at some point 
            LeftSource = true;    
        }

        // If they did leave the source....
        if (LeftSource) {

            // And they enter back into it...
            if (CameraPos.distanceTo(vec(mySound.source.x, mySound.source.y, mySound.source.z)) < 1) {
                
                // Indicate that they came back 
                ReturnedToSource = true;

                // Continue the original sound
                mySound.play;

                // Indicate that they are no longer in the source
                LeftSource = false;
            }
        }
        
        // If they won't come back to the source after 30 seconds
        if (TimeAway/1000 > 30) {
            
            // Play the sound source that constantly follows them instead 
            mySound2.pause;
            mySound3.play;            
            LastSound = 2;
        }

        // Determine whether or not the sound is playing
        if (!Sounds[LastSound].isPlaying) {
            // Load model
            // here.......

            // Play cute sound
            mySound4.play;

   
        }
    }


