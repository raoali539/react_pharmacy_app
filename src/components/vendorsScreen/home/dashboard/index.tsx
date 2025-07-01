import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';

const MetricCard = ({ title, value, percentage, isPositive, backgroundColor, icon }: any) => {
  return (
    <View style={[styles.card, { backgroundColor, alignItems: 'center', justifyContent: 'center' }]}> 
      <View style={[styles.cardHeader, { justifyContent: 'center' }]}> 
        <Text style={styles.cardTitle}>{title}</Text>
      </View>
      <View style={[styles.cardContent, { justifyContent: 'center' }]}> 
        <Text style={styles.cardValue}>{value}</Text>
      </View>
    </View>
  );
};

const Dashboard = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dashboard}>
        <View style={styles.row}>
          <MetricCard
            title="Views"
            value="28"
            percentage="+11.02%"
            isPositive={true}
            backgroundColor="#4f8cff" // blue
            icon="👁️"
          />
          <MetricCard
            title="New Orders"
            value="316"
            percentage="+6.08%"
            isPositive={true}
            backgroundColor="#e96479" // pink
            icon="🛒"
          />
        </View>
        <View style={styles.row}>
          <MetricCard
            title="Out Of Stock"
            value="12"
            percentage="-2.00%"
            isPositive={false}
            backgroundColor="#ffb347" // orange
            icon="📦"
          />
          <MetricCard
            title="Sale"
            value="$695"
            percentage="+15.03%"
            isPositive={true}
            backgroundColor="#43cea2" // teal
            icon="💰"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    padding: 16,
  },
  dashboard: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  card: {
    flex: 1,
    marginHorizontal: 4,
    padding: 14,
    borderRadius: 28,
    minHeight: 80,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.20,
    shadowRadius: 12,
    elevation: 10,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.18)',
    opacity: 0.97,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
    opacity: 0.97,
    letterSpacing: 0.5,
  },
  trendIcon: {
    fontSize: 22,
    opacity: 0.9,
  },
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardValue: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0,0,0,0.18)',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
  },
  cardPercentage: {
    fontSize: 16,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.12)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default Dashboard;