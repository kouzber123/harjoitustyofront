import React, { useEffect } from "react";
import { Dimmer, Loader } from "semantic-ui-react";

//this handles the loading "sleep" visualities
function LoadingComponent({ inverted = false, content }) {
  return (
    <Dimmer active={true} inverted={inverted}>
      <Loader content={content} />
    </Dimmer>
  );
}

export default LoadingComponent;
