import * as React from "react";
import { CodeEditor, start_code } from "./Editor";
import { StartButton } from "./Start";
import { MusicPlayerDisplay } from "./MusicPlayer";
import * as Tone from "tone";

type MainProps = {}
type MainState = {
    code: string,
    inited: boolean,
    currentPos: number
}

export class Main extends React.Component<MainProps, MainState> {
    synth: Tone.Sampler;
    constructor(props: MainProps) {
        super(props)
        
        this.state = { code: start_code, inited: false, currentPos: 0 };
        this.synth = new Tone.Sampler(
            {
                "A0" : "A0.[mp3|ogg]",
                "C1" : "C1.[mp3|ogg]",
                "D#1" : "Ds1.[mp3|ogg]",
                "F#1" : "Fs1.[mp3|ogg]",
                "A1" : "A1.[mp3|ogg]",
                "C2" : "C2.[mp3|ogg]",
                "D#2" : "Ds2.[mp3|ogg]",
                "F#2" : "Fs2.[mp3|ogg]",
                "A2" : "A2.[mp3|ogg]",
                "C3" : "C3.[mp3|ogg]",
                "D#3" : "Ds3.[mp3|ogg]",
                "F#3" : "Fs3.[mp3|ogg]",
                "A3" : "A3.[mp3|ogg]",
                "C4" : "C4.[mp3|ogg]",
                "D#4" : "Ds4.[mp3|ogg]",
                "F#4" : "Fs4.[mp3|ogg]",
                "A4" : "A4.[mp3|ogg]",
                "C5" : "C5.[mp3|ogg]",
                "D#5" : "Ds5.[mp3|ogg]",
                "F#5" : "Fs5.[mp3|ogg]",
                "A5" : "A5.[mp3|ogg]",
                "C6" : "C6.[mp3|ogg]",
                "D#6" : "Ds6.[mp3|ogg]",
                "F#6" : "Fs6.[mp3|ogg]",
                "A6" : "A6.[mp3|ogg]",
                "C7" : "C7.[mp3|ogg]",
                "D#7" : "Ds7.[mp3|ogg]",
                "F#7" : "Fs7.[mp3|ogg]",
                "A7" : "A7.[mp3|ogg]",
                "C8" : "C8.[mp3|ogg]"
            }, {
                "release" : 1,
                "baseUrl" : "./src/salamander/"
		    }
        ).toDestination();

        Tone.Transport.bpm.value = 400;

        this.generateMusic = this.generateMusic.bind(this);
        this.onStartAudioify = this.onStartAudioify.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
    }

    generateMusic(): Array<object> {
        let time = 0;
        let part = [];
        let word = "";
        for (const char of this.state.code) {
            word += char;
            if (word === "function" || word === "def" || word === "fn" || word === "func" || word === "fun") {
                part.push({"time": time, "note": ["A2", "E3", "B3", "C4", "D4", "G4"], "duration": "1n"})
                word = "";
            }
            
            if (word === "return" || word === "ret") {
                part.push({"time": time, "note": ["D2", "C3", "F#3", "A#3", "C4", "D4", "F4"], "duration": "1n"})
                word = "";
            }


            if (char == " ") {
                word = "";
            }

            if (word === "null" || word === "None" || word == "none") {
                part.push({"time": time, "note": ["G2", "D3", "A3", "B3", "E4", "F#4"], "duration": "1n"})
                word = "";
 
            }

            const char_code = char.charCodeAt(0);
            if (char !== " ") {
                const current = char_code*2;
                part.push({"time": time, "note": [current, current*4/3, current*7/4, current*2*5/4, current*2*3/2], "duration": "8n"});
            }
            time += 0.2;
        }

        return part;
    }

    handleNewNote(time: number, note: any) {
        this.setState({ currentPos: Math.floor(time*5) });

        this.synth.triggerAttackRelease(note.note, note.duration, time, note.velocity);
    }

    onStartAudioify(_: React.MouseEvent<HTMLButtonElement>) {
        if (!this.state.inited) {
            Tone.start();
            this.setState({inited: true})
        }
        
        const generated = this.generateMusic();

        let part = new Tone.Part(this.handleNewNote, generated);

        part.start();

        Tone.Transport.start();
    }

    onTextChange(code: string) {
        this.setState({code})
    }

    render() {
        return <div>
            <CodeEditor onTextChange={this.onTextChange} code={this.state.code}></CodeEditor>
            <StartButton onClick={this.onStartAudioify}></StartButton>
            <MusicPlayerDisplay currentPos={this.state.currentPos} text={this.state.code}></MusicPlayerDisplay>
        </div>
    }
}

