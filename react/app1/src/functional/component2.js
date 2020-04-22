import React from "react";

const Component2 = props => (
    <div>
        Component {props.match.params.id}
        {console.log(props)}
    </div>
);

export default Component2