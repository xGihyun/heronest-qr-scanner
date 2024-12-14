import { EventBriefDetail } from "./event";
import { SeatBriefDetail } from "./seat";
import { UserBriefDetail } from "./user";
import { VenueBriefDetail } from "./venue";

export enum TicketStatus {
	Reserved = "reserved",
	Used = "used",
	Canceled = "canceled",
}

export type Ticket = {
	ticket_id: string;
	ticket_number: string;
	reserved_at: string;
	status: TicketStatus;
	reservation: TicketReservation;
};

type TicketReservation = {
	venue: VenueBriefDetail;
	event: EventBriefDetail;
	user: UserBriefDetail;
	seat: SeatBriefDetail;
};

export type UpdateTicketRequest = {
	ticket_id: string;
	status: TicketStatus;
};
