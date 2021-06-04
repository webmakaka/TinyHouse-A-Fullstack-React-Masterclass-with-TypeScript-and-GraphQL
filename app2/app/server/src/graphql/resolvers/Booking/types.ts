export interface ICreateBookingInput {
  id: string;
  source: string;
  checkIn: string;
  checkOut: string;
}

export interface ICreateBookingArgs {
  input: ICreateBookingInput;
}
