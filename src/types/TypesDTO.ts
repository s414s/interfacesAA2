export interface User {
    id: number,
    name: string,
    surname: string,
    isAdmin: boolean,
}

export interface Booking {
    id: number;
    from: Date; // Assuming 'from' and 'until' are represented as strings in ISO 8601 format (e.g., "YYYY-MM-DD")
    until: Date;
    guestNames: string[];
    hotelName: string;
}

export interface Hotel {
    id: number;
    name: string;
    city: string;
    numberOfRooms: number;
    rooms: Room[];
}

export interface Login {
    username: string;
    password: string;
}

export interface Room {
    id: number;
    storey: number;
    type: string;
    capacity: number;
}

export interface SignUp {
    name: string;
    surname: string;
    password: string;
}