export interface PreferencesDataTypes {
  appearanceMode: string,
  language: string,
  layoutDirection: string,
  baseCurrency: string,
  selectedCurrency: string
}

export interface BrandingDataTypes {
  colors: {
    lightPrimary: string,
    lightSecondary: string,
    lightAccent: string,
    darkPrimary: string,
    darkSecondary: string,
    darkAccent: string
  },
  logos: { light: string, dark: string }
}
export interface CurrencyDataTypes {
  code: string,
  name: string,
  country: string,
  countryCode: string,
  flag: string,
}

export interface UserInfoDataTypes {
  firstName:string,
  lastName:string,
  userImage:string,
  email:string,
  countryCode:string,
  phone:string,
  userType:string,
}

export interface AppSettingsDataTypes {
  version: string,
  branding: BrandingDataTypes,
  preferences: PreferencesDataTypes,
  currencies: CurrencyDataTypes,
  userInfo: UserInfoDataTypes
}