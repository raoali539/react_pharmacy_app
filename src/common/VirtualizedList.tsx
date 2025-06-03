import React from 'react';
import { StyleSheet, FlatList, ViewStyle } from 'react-native';
import { widthPercentageToDP as wp } from '../utils/globalFunctions';

interface VirtualizedListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  itemHeight: number;
  contentContainerStyle?: ViewStyle;
  showsVerticalScrollIndicator?: boolean;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
  numColumns?: number;
}

const VirtualizedList = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  itemHeight,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  initialNumToRender = 10,
  maxToRenderPerBatch = 5,
  windowSize = 5,
  onEndReached,
  onEndReachedThreshold = 0.5,
  numColumns = 2,
}: VirtualizedListProps<T>) => {
  const getItemLayout = (_: any, index: number) => ({
    length: itemHeight,
    offset: itemHeight * index,
    index,
  });

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      showsVerticalScrollIndicator={showsVerticalScrollIndicator}
      contentContainerStyle={[styles.container, contentContainerStyle]}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      getItemLayout={getItemLayout}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={itemHeight}
      bounces={false}
      numColumns={numColumns}
      columnWrapperStyle={numColumns > 1 ? styles.row : undefined}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(4),
    paddingHorizontal: wp(4),
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default VirtualizedList;