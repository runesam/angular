export interface Passenger {
  id: number,
  fullName: string,
  checkedIn: boolean,
  checkInDate: number | null,
  baggage: string,
}
