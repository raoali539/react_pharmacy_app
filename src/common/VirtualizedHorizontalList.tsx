
import React from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  ViewStyle,
  ListRenderItem,
} from 'react-native';
import { widthPercentageToDP as wp } from '../utils/globalFunctions';

interface VirtualizedHorizontalListProps<T> {
  data: T[];
  renderItem: ListRenderItem<T>;
  keyExtractor: (item: T) => string;
  itemWidth?: number;
  spacing?: number;
  style?: ViewStyle;
  contentContainerStyle?: ViewStyle;
  showsHorizontalScrollIndicator?: boolean;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
}

 const VirtualizedHorizontalList = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  itemWidth = wp(44),
  spacing = wp(4),
  style,
  contentContainerStyle,
  showsHorizontalScrollIndicator = false,
  initialNumToRender = 4,
  maxToRenderPerBatch = 4,
  windowSize = 4,
}: VirtualizedHorizontalListProps<T>) => {
  return (
    <FlatList
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      style={[styles.list, style]}
      contentContainerStyle={[
        styles.contentContainer,
        { paddingHorizontal: spacing },
        contentContainerStyle,
      ]}
      ItemSeparatorComponent={() => <View style={{ width: spacing }} />}
      getItemLayout={(_, index) => ({
        length: itemWidth,
        offset: (itemWidth + spacing) * index,
        index,
      })}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      removeClippedSubviews={true}
    />
  );
};

export default VirtualizedHorizontalList;

const styles = StyleSheet.create({
  list: {
    flexGrow: 0,
  },
  contentContainer: {
    flexGrow: 1,
    
  },
});




