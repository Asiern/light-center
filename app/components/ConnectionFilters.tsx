import { View, FlatList, StyleSheet } from "react-native";
import { Tag } from "./Tag";

interface IConnectionFilters {
  onChange: (filters: string[]) => void;
  filters: string[];
  selectedFilters: string[];
}

export function ConnectionFilters({
  onChange,
  selectedFilters,
  filters,
}: IConnectionFilters): JSX.Element {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        data={filters}
        renderItem={({ item }) => {
          return (
            <Tag title={item} onPress={onChange} filters={selectedFilters} />
          );
        }}
        ItemSeparatorComponent={() => {
          return <View style={{ marginHorizontal: 5 }} />;
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});
