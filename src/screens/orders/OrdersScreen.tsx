import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  Platform,
} from 'react-native';
import { Icon } from '@rneui/base';
import { useNavigation } from '@react-navigation/native';
import theme from '../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../utils/globalFunctions';
import Header from '../../common/Header';
import { commonStyles } from '../../assets/commonStyles';

interface Order {
  id: string;
  statusDate: string;
  status: 'delivered' | 'processing' | 'cancelled';
  storeName: string;
  orderDate: string;
  total: number;
  packageCount?: number;
}

const OrdersScreen = () => {
  const navigation = useNavigation();
  const [orders] = useState<Order[]>([
    {
      id: '1',
      statusDate: 'Jun 5, 2025',
      status: 'delivered',
      storeName: 'Fodory',
      orderDate: 'May 24, 2025',
      total: 119.34,
      packageCount: 1,
    },
    {
      id: '2',
      statusDate: 'May 13, 2025',
      status: 'cancelled',
      storeName: 'DIRTEA',
      orderDate: 'May 8, 2025',
      total: 0.00,
    }
  ]);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'delivered':
        return theme.success;
      case 'processing':
        return theme.warning;
      case 'cancelled':
        return theme.error;
      default:
        return theme.text;
    }
  };

  const renderOrderButtons = (item: Order) => {
    if (item.status === 'delivered') {
      return (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.button, styles.reviewButton]}>
            <Text style={styles.buttonText}>Write review</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.trackButton]}>
            <Text style={styles.buttonText}>
              Track Shipment • {item.packageCount} package
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.buyButton]}>
            <Text style={styles.buttonText}>Buy again</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.reportButton]}>
            <Text style={styles.buttonText}>Report damaged / Missing items</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, styles.helpButton]}>
            <Text style={styles.buttonText}>Get help</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (item.status === 'cancelled') {
      return (
        <View style={styles.voiceContainer}>
          <TouchableOpacity style={styles.playButton}>
            <Icon 
              name="play" 
              type="material" 
              size={16} 
              color={theme.text} 
            />
          </TouchableOpacity>
          
          {/* <Text style={styles.timeText}>01:08</Text> */}
          
          {/* <View style={styles.progressBar}> */}
            {/* <View style={styles.progressFill} /> */}
          {/* </View> */}
{/*          
          <TouchableOpacity style={styles.replyButton}>
            <Text style={styles.replyText}>Reply</Text>
          </TouchableOpacity> */}
        </View>
      );
    }
    return null;
  };

  const renderOrder = ({ item, index }: { item: Order; index: number }) => (
    <View style={styles.orderCard}>
      <View style={styles.statusRow}>
        <Text style={[styles.statusText, { color: getStatusColor(item.status) }]}>
          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
        </Text>
        <Text style={styles.statusDate}>{item.statusDate}</Text>
      </View>

      <View style={styles.storeRow}>
        <Text style={styles.storeName}>{item.storeName}</Text>
       
      </View>
      <View style={styles.storeRow}>
        <Text style={styles.orderDate}>{item.orderDate}</Text>
        <Text style={styles.totalAmount}>• ${item.total.toFixed(2)}</Text>
      </View>


      {renderOrderButtons(item)}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={theme.background} />
      <Header
        title="My orders"
        leftIconType="feather"
        containerStyle={commonStyles.headerContainer}
        showSearch={false}
      />
      
      <View style={styles.searchContainer}>
        <TouchableOpacity style={styles.searchBox}>
          <Icon 
            name="search" 
            type="feather" 
            size={20} 
            color={theme.textLight} 
          />
          <Text style={styles.searchText}>Search All Orders</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>All filters</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={orders}
        renderItem={renderOrder}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.background,
  },
  listContainer: {
    padding: wp(4),
    paddingBottom: hp(2),
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp(4),
    paddingVertical: hp(1),
    backgroundColor: theme.background,
  },
  searchBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.surface,
    borderRadius: wp(2),
    paddingHorizontal: wp(4),
    paddingVertical: hp(1.5),
    marginRight: wp(2),
  },
  searchText: {
    marginLeft: wp(2),
    color: theme.textLight,
    fontSize: wp(3.8),
  },
  filterButton: {
    padding: wp(3),
  },
  filterText: {
    color: theme.primary,
    fontWeight: '500',
    fontSize: wp(3.8),
  },
  orderCard: {
    backgroundColor: theme.surface,
    borderRadius: wp(2),
    marginBottom: hp(2),
    padding: wp(4),
    ...Platform.select({
      ios: {
        shadowColor: theme.text,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.08,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1),
  },
  statusText: {
    fontWeight: '600',
    fontSize: wp(3.8),
    marginRight: wp(1.5),
  },
  statusDate: {
    color: theme.textLight,
    fontSize: wp(3.8),
  },
  storeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(2),
  },
  storeName: {
    fontWeight: '600',
    fontSize: wp(4),
    color: theme.text,
    marginRight: wp(1.5),
  },
  orderDate: {
    color: theme.textLight,
    fontSize: wp(3.8),
    marginRight: wp(1.5),
  },
  totalAmount: {
    fontWeight: '600',
    fontSize: wp(4),
    color: theme.text,
  },
  buttonContainer: {
    marginTop: hp(1),
  },
  button: {
    paddingVertical: hp(1.2),
    paddingHorizontal: wp(3),
    borderRadius: wp(1),
    marginBottom: hp(1),
    width: '100%',
  },
  buttonText: {
    fontSize: wp(3.6),
  },
  reviewButton: {
    backgroundColor: `${theme.primary}20`,
  },
  trackButton: {
    backgroundColor: `${theme.primary}10`,
  },
  buyButton: {
    backgroundColor: `${theme.primary}10`,
  },
  reportButton: {
    backgroundColor: `${theme.error}10`,
  },
  helpButton: {
    backgroundColor: `${theme.text}08`,
  },
  voiceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: hp(1),
  },
  playButton: {
    width: wp(8),
    height: wp(8),
    borderRadius: wp(4),
    backgroundColor: theme.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
  },
  timeText: {
    fontSize: wp(3.5),
    color: theme.textLight,
    marginHorizontal: wp(1),
  },
  progressBar: {
    width: wp(40),
    height: hp(0.4),
    backgroundColor: theme.border,
    borderRadius: wp(0.5),
    marginHorizontal: wp(2),
  },
  progressFill: {
    width: '25%',
    height: '100%',
    backgroundColor: theme.primary,
    borderRadius: wp(0.5),
  },
  speedText: {
    fontSize: wp(3.5),
    color: theme.textLight,
    marginHorizontal: wp(2),
  },
  replyButton: {
    marginLeft: 'auto',
    padding: wp(2),
  },
  replyText: {
    color: theme.primary,
    fontWeight: '500',
    fontSize: wp(3.8),
  },
});

export default OrdersScreen;