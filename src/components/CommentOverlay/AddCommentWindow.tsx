import { EventHandler, SyntheticEvent } from "react";
import { ScrollView, TextInput } from "react95";
import FloatingWindow from "../General/FloatingWindow";

export default (props: {
  closeButtonCallback?: EventHandler<SyntheticEvent>;
}) => {
  return (
    <FloatingWindow {...props} windowTitle="Write a comment...">
      <h2 className="font-lg font-bold">Comment on the article!</h2>
      <TextInput multiline={true} fullWidth={true} />
    </FloatingWindow>
  );
};
