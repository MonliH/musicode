import * as React from "react";

type MusicProps = {
    currentPos: number
    text: string
};

export class MusicPlayerDisplay extends React.Component<MusicProps, {}> {
    render() {
        return <div>
            {this.props.text[this.props.currentPos]}
        </div>; 
    }
}
