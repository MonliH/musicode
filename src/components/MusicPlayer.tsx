import * as React from "react";
import { highlight, languages } from 'prismjs';

type MusicProps = {
    currentPos: number
    text: string
};

export class MusicPlayerDisplay extends React.Component<MusicProps, {}> {
    render() {
        return <pre 
            dangerouslySetInnerHTML={{
                __html: highlight(
                    this.props.text,
                    languages.javascript, 
                    "javascript"
                )
            }} 
            style={{
                borderRadius: 3,
                fontFamily: '"IBM Plex Mono", monospace',
                fontSize: 15,
                color: "#ccc",
                padding: 10,
                display: "table",
                margin: 0,
            }}></pre>;
    }
}
