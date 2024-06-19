

import { Seat } from "./seat";

export interface Booking {
  bookingId: number;
  userId: string;
  seats: Seat[];
  user: any; 
  matchId: number | null;  
  match: {
    title: string;
  };
  seatId: number;
  seatNumber: string;
  bookingDateTime: Date;
}


