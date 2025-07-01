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
}

const VirtualizedList = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  itemHeight,
  contentContainerStyle,
  showsVerticalScrollIndicator = false,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 5,
  onEndReached,
  onEndReachedThreshold = 0.5,
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
      numColumns={2}
    />
  );
};

interface VirtualizedHorizontalListProps<T> {
  data: T[];
  renderItem: ({ item, index }: { item: T; index: number }) => React.ReactElement;
  keyExtractor: (item: T) => string;
  itemWidth: number;
  contentContainerStyle?: ViewStyle;
  showsHorizontalScrollIndicator?: boolean;
  initialNumToRender?: number;
  maxToRenderPerBatch?: number;
  windowSize?: number;
  onEndReached?: () => void;
  onEndReachedThreshold?: number;
}

const VirtualizedHorizontalList = <T extends any>({
  data,
  renderItem,
  keyExtractor,
  itemWidth,
  contentContainerStyle,
  showsHorizontalScrollIndicator = false,
  initialNumToRender = 10,
  maxToRenderPerBatch = 10,
  windowSize = 8,
  onEndReached,
  onEndReachedThreshold = 0.5,
}: VirtualizedHorizontalListProps<T>) => {
  const getItemLayout = (_: any, index: number) => ({
    length: itemWidth,
    offset: itemWidth * index,
    index,
  });

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      horizontal
      showsHorizontalScrollIndicator={showsHorizontalScrollIndicator}
      contentContainerStyle={[horizontalStyles.container, contentContainerStyle]}
      initialNumToRender={initialNumToRender}
      maxToRenderPerBatch={maxToRenderPerBatch}
      windowSize={windowSize}
      getItemLayout={getItemLayout}
      onEndReached={onEndReached}
      onEndReachedThreshold={onEndReachedThreshold}
      removeClippedSubviews={true}
      snapToAlignment="start"
      decelerationRate="fast"
      snapToInterval={itemWidth}
      bounces={false}
      
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: wp(4),
  },
});

const horizontalStyles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(4),
  },
});

export { VirtualizedList, VirtualizedHorizontalList };




