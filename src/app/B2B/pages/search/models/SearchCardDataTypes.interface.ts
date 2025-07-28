export type TimelineDataType = {
  segmentId: string;
  arrival: ArrivalDepartureTypes;
  dep: ArrivalDepartureTypes;
  duration: string;
  operatingCarrierInfo: OperatingCarrierInfo;
  marketingCarrierInfo: null;
  secureFlightInd: false;
  segmentTypeCode: null;
};

export type ArrivalDepartureTypes = {
  AircraftScheduledDateTime: string;
  IATALocationCode: string;
  StationName: string;
  TerminalName: string;
};

export type OperatingCarrierInfo = {
  CarrierDesigCode: string;
  CarrierDesigName: string;
  CarrierName: string;
  CarrierCode: string;
  OperatingCarrierFlightNumberText: string;
};
