import { Colors } from '@/constants/Colors';
import '@/components/UserTheme'

export function themeColor(userTheme) {
    if (Colors[global.theme] != null) {
        return Colors[global.theme]
    }
    else {
        return Colors['galaxy']
    }
}