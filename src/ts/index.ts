import { notesToPlayInOrder } from "./music-to-play";
import { BEATS_PER_MINUTE, MusicalNote } from "./musical-score";


let i: number = 0;

const playMusic = () => {

    const notes: MusicalNote[] = notesToPlayInOrder;
    
    // TODO Play these notes one after the other at the pitch and rhythm given in each note
    if (i < notes.length) {

        // Calculating beats
        let totalBeats: number = (notes[i].beats * BEATS_PER_MINUTE);
        let audioId: string = (notes[i].pitch + notes[i].octave);

        if(notes[i].accidental){
            audioId = audioId + notes[i].accidental;
        }

        // Getting html audio element from index.html
        let music: HTMLAudioElement = document.getElementById(audioId) as HTMLAudioElement;

        // console.log(music);
        music.play()
    

        setTimeout((): void => {
            music.pause();

        }, totalBeats);

        music.onpause = playMusic;
    
      }
    
      i++;
}

document.getElementById('start-playing')?.addEventListener('click', playMusic);
