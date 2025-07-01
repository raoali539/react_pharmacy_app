import React, { useCallback, useMemo } from "react";
import { Platform, TouchableOpacity, View, StyleSheet } from "react-native";
import { BottomTabBarProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Icon } from "@rneui/base";
import { heightPercentageToDP } from "../../../utils/globalFunctions";
import VendorHome from "../../../components/vendorsScreen/home";
import theme from "../../../assets/theme";
import VendorReceivedOrder from "../../../components/vendorsScreen/orders";
import ChatList from "../../../components/vendorsScreen/chat/list";
import AddProductForm from "../../../components/products/AddProductForm";

const CustomTabBar: React.FC<BottomTabBarProps> = ({
    state,
    descriptors,
    navigation,
}) => {
    return (
        <View style={styles.tabBarContainer}>
            <View style={styles.tabBarContent}>
                {state.routes.map((route, index) => {
                    const { options } = descriptors[route.key];
                    const isFocused = state.index === index;

                    const onPress = useCallback(() => {
                        navigation.emit({
                            type: "tabPress",
                            target: route.key,
                            canPreventDefault: true,
                        });
                        navigation.navigate(route.name);
                    }, [navigation, route.key, route.name]);

                    const tabBarIcon = useMemo(() => {
                        return options.tabBarIcon
                            ? options.tabBarIcon({
                                color: isFocused ? '#fff' : 'gray',
                                focused: isFocused,
                                size: 30,
                            })
                            : null;
                    }, [options, isFocused]);

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={onPress}
                            activeOpacity={0.7}
                            style={[
                                styles.tabButton,
                                isFocused && styles.tabButtonActive
                            ]}
                        >
                            <View style={styles.iconContainer}>
                                {tabBarIcon}
                                {isFocused && <View style={styles.activeDot} />}
                            </View>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </View>
    );
};

function VendorBottomTab() {
    const Tab = createBottomTabNavigator();

    const tabBarStyle = useMemo(
        () => ({
            backgroundColor: '#fff',
            height: Platform.OS === "android"
                ? heightPercentageToDP(12)
                : heightPercentageToDP(13),
            borderTopWidth: 0,
            position: 'absolute' as const,
            left: 8,
            right: 8,
            bottom: Platform.OS === 'ios' ? 24 : 0,
            elevation: 0,
            borderRadius: 20,
            shadowColor: '#000',
            shadowOffset: {
                width: 0,
                height: 4,
            },
            shadowOpacity: 0.3,
            shadowRadius: 8,
        }),
        [],
    );

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#000',
                tabBarInactiveTintColor: "gray",
                tabBarStyle: tabBarStyle,
            }}
        >
            <Tab.Screen
                name="Home"
                component={VendorHome}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="home"
                            type="material"
                            color={focused ? '#fff' : 'gray'}
                            size={30}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Orders"
                component={VendorReceivedOrder}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="receipt"
                            type="material"
                            color={focused ? '#fff' : 'gray'}
                            size={30}
                        />
                    ),
                }}
            />

            <Tab.Screen
                name="Messages"
                component={ChatList}
                options={{
                    tabBarIcon: ({ focused, color, size }) => (
                        <Icon
                            name="chat"
                            type="material"
                            color={focused ? '#fff' : 'gray'}
                            size={30}
                        />
                    ),
                }}
            />

            {/* AddProduct as last tab (replaces Settings) */}
            <Tab.Screen
                name="AddProduct"
                component={AddProductForm}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ focused, size }) => (
                        <View style={{
                            backgroundColor: 'gray',
                            borderRadius: 20, // 50% of 40px diameter
                            width: 40,
                            height: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Icon
                                name="add"
                                type="material"
                                color={focused ? '#fff' : 'white'}
                                size={24}
                            />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBarContainer: {
        position: 'absolute',
        bottom: Platform.OS === 'ios' ? 24 : 8,
        left: 8,
        right: 8,
        backgroundColor: '#000',
        borderRadius: 20,
        height: Platform.OS === "android"
            ? heightPercentageToDP(8)
            : heightPercentageToDP(8),
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 8,
        overflow: 'visible',
    },
    tabBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        height: '100%',
        paddingHorizontal: 5,
        overflow: 'visible',
    },
    tabButton: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 8,
        position: 'relative',
    },
    tabButtonActive: {
        transform: [{ scale: 1.1 }],
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 4,
    },
    activeDot: {
        position: 'absolute',
        bottom: -8,
        width: 6,
        height: 6,
        borderRadius: 3,
        backgroundColor: '#000',
    },
});

export default VendorBottomTab;