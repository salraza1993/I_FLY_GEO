
type PaxType = { type: string, total: number };
type JourneyType = { 
  destArrival_IATA_LocationCode: string,
  originDepature_IATA_LocationCode: string,
  date: string,
};

export type FlightSearchRequestType = { 
  supplierCode: string,
  passengers: PaxType[],
  originDestinationsCriteria: JourneyType[],
}