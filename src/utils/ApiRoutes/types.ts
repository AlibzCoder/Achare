export interface Address {
  id?: number;
  address_id?: string;
  region: {
    id?: number;
    name?: string;
    city_object?: {
      city_id: number;
      city_name: string;
    };
    state_object?: {
      state_id: number;
      state_name: string;
    };
  };
  address?: string;
  last_name?: string;
  first_name?: string;
  gender?: string;
  lat?: number;
  lng?: number;
  coordinate_mobile?: string;
  coordinate_phone_number?: string;
}
