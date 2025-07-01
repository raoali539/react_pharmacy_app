import React, { useCallback, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, TextInput, StatusBar, Image, Alert } from 'react-native';
import theme from '../../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../utils/globalFunctions';
import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';

interface HeaderProps {
    rightChildren?: React.ReactElement;
    CenterChildren?: any;
    leftChildren?: React.ReactElement;
    containerStyle?: any;
    style?: any;
    backIcon?: boolean;
}



const VendorHeader: React.FC<HeaderProps> = ({
    containerStyle,
    style,
    backIcon = false,
}) => {
    const navigation = useNavigation();

    const centerChildren = useCallback(() => (
        <Image
            source={require('../../../assets/images/lo.jpeg')}
            style={{ width: 100, height: 100, borderRadius: 20,marginTop:10 }}
            resizeMode="contain"
        />
    ), []);

    const leftChildren = useCallback(() => (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            {backIcon && (
                <TouchableOpacity onPress={() => { 
                    navigation.goBack() }}>
                        
                    <Icon
                        name="arrow-back"
                        type="material"
                        color={'black'}
                        size={35}
                    />
                </TouchableOpacity>
            )}
            {
                !backIcon && (
                    <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                        <Icon
                            name="settings"
                            type="material"
                            color={'black'}
                            size={30}
                        />

                    </TouchableOpacity>
                )
            }

        </View>

    ), [navigation]);

    const rightChildren = useCallback(() => (
        <TouchableOpacity>
            <Icon
                name="notifications"
                type="material"
                color={'black'}
                size={30}
            />
        </TouchableOpacity>
    ), [navigation]);


    return (
        <View style={[styles.container, containerStyle, style]}>
            <View style={styles.left}>{leftChildren()}</View>
            <View style={styles.center}>{centerChildren()}</View>
            <View style={styles.right}>{rightChildren()}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        paddingHorizontal: wp(4),
        marginTop: StatusBar.currentHeight || 0,
        height: hp(8),
        ...theme.shadows.base,
        ...Platform.select({
            android: {
                boxSizing: 'border-box',
                shadowColor: '#000',
                shadowOffset: { width: 2, height: 1 },
                shadowOpacity: 0.8,
                shadowRadius: 2,
                elevation: 5

            },
        }),

    },
    left: {
        flex: 1,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    center: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    right: {
        flex: 1,
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    iconButton: {
        padding: wp(2),
        width: wp(14),
    },
    iconBackground: {
        backgroundColor: theme.surface,
        padding: wp(2),
        borderRadius: wp(3),
        ...theme.shadows.sm,
        ...Platform.select({
            android: {
                elevation: 2,
            },
        }),
    },
    title: {
        flex: 1,
        textAlign: 'center',
        marginHorizontal: wp(2),
        color: theme.text,
    },
    rightIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContainer: {
        flex: 1,
        marginHorizontal: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchInput: {
        flex: 1,
        backgroundColor: theme.surface,
        height: hp(5),
        borderRadius: theme.borderRadius.lg,
        paddingHorizontal: wp(4),
        color: theme.text,
        ...theme.shadows.sm,
        ...Platform.select({
            android: {
                paddingVertical: 0,
            },
        }),
    },
    closeButton: {
        marginLeft: wp(2),
        padding: wp(2),
    },
});

export default VendorHeader;



