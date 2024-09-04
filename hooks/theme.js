import { Colors } from '@/constants/Colors';

export function themeColor(userTheme) {
    if (Colors[userTheme] != null) {
        return Colors[userTheme]
    }
}