import { StyleSheet, Dimensions } from 'react-native'
import { theme } from 'galio-framework';


const { width, height } = Dimensions.get('screen');

const styles = StyleSheet.create({
    container: {
        backgroundColor: theme.COLORS.WHITE,
    },
    padded: {
        paddingHorizontal: theme.SIZES.BASE * 2,
        position: 'relative',
        bottom: theme.SIZES.BASE,
    },
    button: {
        width: width - theme.SIZES.BASE * 4,
        height: theme.SIZES.BASE * 3,
        shadowRadius: 0,
        shadowOpacity: 0,
    },
});

export default styles

export {
    width,
    height
}