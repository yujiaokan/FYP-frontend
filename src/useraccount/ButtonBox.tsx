import { Text, TouchableOpacity } from "react-native";
import React from "react";
import { Avatar } from "react-native-paper";

type ButtonBoxProps = {
  icon: any; 
  text: string;
  handler: (text: string) => void; 
  reverse?: boolean;
  loading?: boolean;
  compont:number;
};

const ButtonBox = ({
  icon,
  text,
  handler,
  reverse = false,
  loading = false,
  compont,
}: ButtonBoxProps) => {
  return (
    <TouchableOpacity
      activeOpacity={1}
      style={{
        height: 70,
        width: 70,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center', 
      }}
       onPress={() => handler(text)} 
       disabled={loading}
    >
      <Avatar.Icon
        size={50}
        color={"white"}
        style={{ backgroundColor: reverse ? "#c70049" : "#8EACCD" }}
        icon={icon}
      />
      {compont==1 ?<Text
        style={{
          color: "black",
          textAlign: "center",
        }}
      >
        {text}
      </Text>:null}
    </TouchableOpacity>
  );
};

export default ButtonBox;
