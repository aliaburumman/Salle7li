import * as Yup from 'yup';
export type ReservationRequest = {
  service: string;

  date: Date | undefined;
  startTime: Date | undefined;
  endTime: Date | undefined;

  workerGender: string;

  problemDetails: string;

  location?: Coords;
  paymentMethod: string;
  visaDetails?: VisaInfo;
};

export const initialValuesForReservation: ReservationRequest = {
  service: '',

  date: undefined,
  startTime: undefined,
  endTime: undefined,

  workerGender: 'any',

  location: {latitude: 0, longitude: 0},
  problemDetails: '',
  paymentMethod: 'cash',
};

export const validationSchemaForReservation = Yup.object().shape({
  service: Yup.string().required('Please complete this field'),
  date: Yup.string().required('Please complete this field'),
  startTime: Yup.string()
    .required('Please complete this field')
    .test(
      'is-after-now',
      'Start time must be after current time',
      function (startTime) {
        const selectedDate = new Date(this.parent.date);
        const currentTime = new Date();
        const selectedTime = new Date(startTime);
        if (selectedDate > currentTime) {
          return true;
        } else {
          return selectedTime > currentTime;
        }
      },
    ),
  endTime: Yup.string()
    .required('Please complete this field')
    .test(
      'is-before-end',
      'End time must be before 10:00 PM',
      function (endTime) {
        const endTimeLimit = new Date();
        endTimeLimit.setHours(22, 0, 0);
        const selectedTime = new Date(endTime);
        return selectedTime <= endTimeLimit;
      },
    )
    .test(
      'is-at-least-one-hour-difference',
      'End time must be at least one hour after start time',
      function (endTime) {
        const {startTime} = this.parent;
        if (startTime && endTime) {
          const start = new Date(startTime);
          const end = new Date(endTime);
          const differenceInHours =
            Math.abs(end.getTime() - start.getTime()) / 36e5;
          return differenceInHours >= 1;
        }
        return true;
      },
    )
    .test(
      'is-after-startTime',
      'End time must be after start time',
      function (endTime) {
        const {startTime} = this.parent;
        if (startTime && endTime) {
          return new Date(endTime) > new Date(startTime);
        }
        return true;
      },
    ),
  problemDetails: Yup.string().required('Please complete this field'),
});

interface VisaInfo {
  cvv?: number;
  cardNumber?: number;
  cardHolderName?: string;
}

interface Coords {
  longitude: number;
  latitude: number;
}
