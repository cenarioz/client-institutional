export interface IImage {
  path: string;
}

interface IAddress {
  state: string;
  city: string;
}

interface IAmenity {
  name: string;
}

interface ICategory {
  name: string;
}

interface IFeature {
  name: string;
}

interface IRule {
  name: string
}

export interface IDetails extends string{
  [key: string]: any;
  id: string;
  size: string;
  height: string;
  width: string;
  length: string;
  parking_spots: string;
  elevator: boolean;
  freight_elevator: boolean;
  stairs: boolean;
  street_level: boolean;
  wheelchair: boolean;
  air_conditioning: boolean;
  wifi: boolean;
  max_attendees: number;
  price_pp_hourly_0: number;
  price_pp_hourly_1: number;
  price_pp_hourly_2: number;
  price_pp_hourly_3: number;
  price_pp_hourly_4: number;
  price_pp_hourly_5: number;
  event: boolean;
  meeting: boolean;
  production: boolean;
}

export interface IPlace {
  id: number;
  images: [IImage];
  title: string;
  rating: number;
  address: IAddress;
  value: number;
  value_type: string;
  description: string;
  details: IDetails;
  categories: [ICategory];
  host: IHost;
  rules: IRule[]
  features: IFeature[]
  amenities: IAmenity[]
  opening_hours: IOpeningHour[]
  bookings: IBooking[]
  minimum: number
}

export interface IOpeningHour {
  opening_time: Date
  closing_time: Date
  active: boolean
  day_of_week: string
}

export interface IBooking {
  start_date: string,
  end_date: string,
}

export interface IDataPlace {
  place: IPlace;
}
export interface IDataPlaces {
  places: [IPlace];
}

export interface IUser {
  name: string;
  photo: string;
}

export interface IHost {
  response_rating: number;
  time_rating: number;
  user: IUser;
}
