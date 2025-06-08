/**
 * Color palette for the Bible Journaling App
 * Based on warm, calming tones that provide a peaceful writing experience
 */

// Base Colors
const colors = {
  // Primary Colors
  ivory: '#FFF9F0',
  lightBeige: '#F5EBDC',
  cream: '#FEFCF7',
  
  // Accent Colors
  warmYellow: '#FFE285',
  softOrange: '#FFBD8C',
  lightMint: '#CDE4DA',
  paleBlue: '#BFD7EA',
  lightLavender: '#E7E6F4',
  deepNavy: '#2A3A4B',
  
  // Grayscale
  gray100: '#F8F9FA',
  gray200: '#E9ECEF',
  gray300: '#DEE2E6',
  gray400: '#CED4DA',
  gray500: '#ADB5BD',
  gray600: '#6C757D',
  gray700: '#495057',
  gray800: '#343A40',
  gray900: '#212529',
};

export const Colors = {
  light: {
    // Backgrounds
    background: colors.ivory,
    card: colors.cream,
    
    // Text
    text: colors.deepNavy,
    textSecondary: colors.gray600,
    
    // UI Elements
    tint: colors.warmYellow,
    border: colors.lightBeige,
    
    // Tab Bar
    tabIconDefault: colors.gray400,
    tabIconSelected: colors.warmYellow,
    
    // Buttons
    buttonPrimary: colors.warmYellow,
    buttonSecondary: colors.paleBlue,
    buttonText: colors.deepNavy,
    
    // Status
    success: colors.lightMint,
    warning: colors.softOrange,
    error: '#FF6B6B',
  },
  dark: {
    // Backgrounds
    background: colors.gray900,
    card: colors.gray800,
    
    // Text
    text: colors.gray100,
    textSecondary: colors.gray400,
    
    // UI Elements
    tint: colors.warmYellow,
    border: colors.gray700,
    
    // Tab Bar
    tabIconDefault: colors.gray500,
    tabIconSelected: colors.warmYellow,
    
    // Buttons
    buttonPrimary: colors.warmYellow,
    buttonSecondary: colors.paleBlue,
    buttonText: colors.deepNavy,
    
    // Status
    success: colors.lightMint,
    warning: colors.softOrange,
    error: '#FF6B6B',
  },
};
