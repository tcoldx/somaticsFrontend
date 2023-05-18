import { View, Text } from "react-native";
import { styles } from "./currentprogramlist.styles";
interface listProps {}

const CurrentProgramList = ({}: listProps) => {
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "row",
        gap: 20,
        width: "90%",
      }}
    >
      <View style={styles.container}>
        <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>
          No Data
        </Text>
      </View>
    </View>
  );
};

export default CurrentProgramList;
