import * as React from "react";
import Editor from "react-simple-code-editor";
import { highlight, languages } from 'prismjs';

import "../css/prism.css";
import "../css/editor.css";

type CodeState = {}

type CodeProps = {
    onTextChange: (code: string) => void
    code: string
}

export const start_code = `function add(a, b) {
  return a + b;
}`;

export class CodeEditor extends React.Component<CodeProps, CodeState> {
    constructor(props: CodeProps) {
        super(props);
    }

    render() {
        return (
            <Editor
                value={this.props.code}
                onValueChange={this.props.onTextChange}
                highlight={code => highlight(code, languages.js, "javascript")}
                padding={10}
                textareaId="editor"
                style={{
                    fontFamily: '"IBM Plex Mono", monospace',
                    fontSize: 13,
                }}
            />
        );
    }
}

