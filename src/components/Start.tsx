import * as React from "react";

type StartProps = {
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void 
}

export class StartButton extends React.Component<StartProps, {}> {
    constructor(props: StartProps) {
        super(props)
    }

    render() {
        return <button onClick={this.props.onClick}>Audioifiy It!</button> 
    }
}

