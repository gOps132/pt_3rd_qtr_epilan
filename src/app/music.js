window.onload = function () {
    var audio_button  = document.getElementById("audio_button");
    var audio_demo  = document.getElementById("demo");

    if (audio_button) {
            audio_button.addEventListener("click", function(){
            audio_demo.play();    
            const audio_context = new AudioContext();
            const audio_element = document.querySelector("audio");
            const track = audio_context.createMediaElementSource(audio_element);
                
            track.connect(audio_context.destination);     
        });
    }
};