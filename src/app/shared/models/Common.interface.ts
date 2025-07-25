export interface CurrencyDropdown {
  code: string,
  name: string,
  country: string,
  countryCode: string,
  flag: string
}

export interface BookingCardInterface {
  title: string,
  total: number,
  currency: string,
  path: string,
  iconName: string,
}

export type StringOfArray = string[];
export type StringOfObject = { [key: string]: string | number | boolean | StringOfArray | StringOfObject };
