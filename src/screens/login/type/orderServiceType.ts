import * as Yup from 'yup';
export type ReservationRequest = {
  service: string;

  date: Date | undefined;
  availabilityTime: string; 

  workerGender: string;

  problemDetails: string;

  location?: Coords;
  paymentMethod: string;
  visaDetails?: VisaInfo;
};

export const initialValuesForReservation: ReservationRequest = {
  service: '',

  date: undefined,
  availabilityTime: '',
  workerGender: 'male',

  location: {latitude: 0, longitude: 0},
  problemDetails: '',
  paymentMethod: 'cash',
};

export const validationSchemaForReservation = Yup.object().shape({
  service: Yup.string().required('Please complete this field'),
  date: Yup.string().required('Please complete this field'),
  availabilityTime: Yup.string()
    .required('Please complete this field'),
  
  problemDetails: Yup.string().required('Please complete this field'),
});

interface VisaInfo {
  cvv?: number;
  cardNumber?: number;
  cardHolderName?: string;
}

interface Coords {
  longitude?: number;
  latitude?: number;
}
