import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE, MusicalNote } from "./musical-score";


let count: number = 0;         

// Take a list of musical notes and play it's tune in the browser, following it's pitch and rhythm.
const playMusic = (): void => {
    const notes: MusicalNote[] = notesToPlayInOrder;
    // TODO Play these notes one after the other at the pitch and rhythm given in each note

    if (count < notes.length) {             
        const note = notes[count];
        const totalBeats: number = note.beats * BEATS_PER_MINUTE;   // calculating total beats for each note
        let audioId: string = note.pitch + note.octave;             // creating audio id to fetch audio 

        if(note.accidental) audioId += note.accidental;             // adding accidental if it exist
        // Getting html audio element from index.html
        const music: HTMLAudioElement = document.getElementById(audioId) as HTMLAudioElement;
        music.play();        
        
        // disables the button while the music is playing 
        (<HTMLInputElement> document.getElementById("start-playing")).disabled = true;  

        // setTimeout plays the music for totalBeats amount of time(ms) 
        setTimeout((): void => {
            music.pause();     
            playMusic();       
        }, totalBeats);

        count++;          
        
      } else {
        // enables the button back  
        (<HTMLInputElement> document.getElementById("start-playing")).disabled = false;
        count = 0;
        return;
      }
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);

