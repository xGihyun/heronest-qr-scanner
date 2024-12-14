import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Ticket } from "../-types/ticket";

type TicketContextType = {
	ticket: Ticket | null;
	setTicket: Dispatch<SetStateAction<Ticket | null>>;
};

export const TicketContext = createContext<TicketContextType>({
	ticket: null,
	setTicket: () => {},
});

export function TicketProvider() {
	const [ticket, setTicket] = useState<Ticket | null>(null);
}
