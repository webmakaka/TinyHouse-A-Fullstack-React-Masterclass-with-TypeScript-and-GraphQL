interface IBookingsIndexMonth {
  [key: string]: boolean;
}

interface IBookingsIndexYear {
  [key: string]: IBookingsIndexMonth;
}

export interface IBookingsIndex {
  [key: string]: IBookingsIndexYear;
}
