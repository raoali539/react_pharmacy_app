import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Circle, G } from 'react-native-svg';

const { width } = Dimensions.get('window');

const ProjectStatusChart = () => {
  const data = [
    { label: 'Completed', percentage: 67.6, color: '#2d3748' },
    { label: 'In Progress', percentage: 26.4, color: '#48bb78' },
    { label: 'Behind', percentage: 6, color: '#805ad5' },
  ];

  const chartSize = 160; // smaller chart
  const radius = 65;
  const strokeWidth = 24;
  const center = chartSize / 2;
  const circumference = 2 * Math.PI * radius;

  let cumulativePercentage = 0;
  const segments = data.map((item) => {
    const dashLength = (item.percentage / 100) * circumference;
    const dashOffset = -cumulativePercentage * circumference / 100;
    cumulativePercentage += item.percentage;
    return {
      ...item,
      strokeDasharray: `${dashLength} ${circumference}`,
      strokeDashoffset: dashOffset,
    };
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Project Status</Text>

      <View style={styles.chartContainer}>
        <Svg width={chartSize} height={chartSize}>
          <G rotation="-90" origin={`${center}, ${center}`}>
            {segments.map((segment, index) => (
              <Circle
                key={index}
                cx={center}
                cy={center}
                r={radius}
                stroke={segment.color}
                strokeWidth={strokeWidth}
                strokeDasharray={segment.strokeDasharray}
                strokeDashoffset={segment.strokeDashoffset}
                fill="transparent"
                strokeLinecap="butt"
              />
            ))}
          </G>
        </Svg>

        <View style={styles.legend}>
          {data.map((item, index) => (
            <View key={index} style={styles.legendItem}>
              <View style={styles.legendRow}>
                <View style={[styles.legendDot, { backgroundColor: item.color }]} />
                <Text style={styles.legendLabel}>{item.label}</Text>
              </View>
              <Text style={styles.legendPercentage}>{item.percentage}%</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: '#805ad5',
    marginBottom: 28,
    textAlign: 'left',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  legend: {
    marginLeft: 20,
    width: width * 0.4,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 10,
  },
  legendLabel: {
    fontSize: 15,
    color: '#2d3748',
    fontWeight: '500',
    flex: 1,
  },
  legendPercentage: {
    fontSize: 15,
    color: '#2d3748',
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default ProjectStatusChart;
