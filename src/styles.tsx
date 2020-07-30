import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
    input: {
        paddingVertical: 0,
        flex: 1,
        zIndex: 1,
        color: '#000000',
        left: -3,
    },
    noBorder: {
      borderBottomWidth: 0,
    },
    grayText: {
      color: '#7F7F7F'
    },
    img: {
        width: 20,
        height: 20,
        alignSelf: 'center',
    },
    containerInput: {
        flexDirection: 'row',
        paddingTop: 5,
        paddingBottom: 5,
    },
    toggleButton: {
        marginRight: 15,
        zIndex: 4,
        alignSelf: 'center',
        justifyContent: 'flex-end',
    },
});
