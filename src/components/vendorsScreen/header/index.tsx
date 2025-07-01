import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Platform, TextInput, StatusBar } from 'react-native';
import theme from '../../../assets/theme';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from '../../../utils/globalFunctions';

interface HeaderProps {
    rightChildren?: React.ReactElement;
    CenterChildren?: any;
    leftChildren?: React.ReactElement;
    containerStyle?: any;
    style?: any;
}

const VendorHeader: React.FC<HeaderProps> = ({
    rightChildren,
    CenterChildren,
    leftChildren,
    containerStyle,
    style,
}) => {
    return (
        <View style={[styles.container, containerStyle, style]}>
            <View style={styles.left}>{leftChildren}</View>
            <View style={styles.center}>{CenterChildren}</View>
            <View style={styles.right}>{rightChildren}</View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: theme.background,
        paddingHorizontal: wp(8),
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



