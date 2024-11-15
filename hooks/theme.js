import { Colors } from '@/constants/Colors';
global.theme = 'galaxy'

export function themeColor() {
    if (Colors[global.theme] != null) {
        return Colors[global.theme]
    }
    else {
        return Colors['galaxy']
    }
}