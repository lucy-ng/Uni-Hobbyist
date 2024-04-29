import { AntDesign } from "@expo/vector-icons";
import { Tooltip, TooltipProps } from "@rneui/themed";
import React from "react";
import { useState } from "react";

/*
React Native Elements Community, 2024. Tooltip. [Online]
Available at: https://reactnativeelements.com/docs/components/tooltip
[Accessed 12 April 2024].
*/

const TooltipButton: React.FC<TooltipProps> = (props) => {
  const [open, setOpen] = useState(false);
  return (
    <Tooltip
      visible={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      {...props}
    >
      <AntDesign
        name="infocirlce"
        size={24}
        color="#8D86C9"
        style={{ marginLeft: 10 }}
      />
    </Tooltip>
  );
};

export default TooltipButton;
