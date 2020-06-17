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

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export class Main extends React.Component<MainProps, MainState> {
    synth: Tone.AMSynth;

    constructor(props: MainProps) {
        super(props)
        
        this.synth = new Tone.AMSynth().toDestination();
        this.state = { code: start_code, inited: false, currentPos: 0 };
        this.generateMusic = this.generateMusic.bind(this);
        this.onStartAudioify = this.onStartAudioify.bind(this);
        this.onTextChange = this.onTextChange.bind(this);
    }

    async generateMusic() {
        let idx = 0;
        for (const char of this.state.code) {
            this.setState({currentPos: idx*4});
            const char_code = char.charCodeAt(0);
            if (char !== " ") {
                this.synth.triggerAttackRelease(char_code*2, "8n", idx);
            }
            idx += 0.25;
            await sleep(250);
        } 
    }

    async onStartAudioify(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
        
        if (!this.state.inited) {
            Tone.start();
            this.setState({inited: true})
        }
        await this.generateMusic();
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
