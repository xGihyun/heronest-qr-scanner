import { createFileRoute } from "@tanstack/react-router";
import { QrReader } from "./-components/qrcode";
import { TicketContext } from "./-contexts/ticket";
import { useState } from "react";
import { Ticket } from "./-types/ticket";
import { ScannedUser } from "./-components/scanned-user";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const [ticket, setTicket] = useState<Ticket | null>(null);

	return (
		<TicketContext.Provider value={{ ticket, setTicket }}>
			<div className="relative w-full h-svh p-5 content-center">
				<h1 className="text-3xl font-inter-bold text-center mb-5">Heronest Scanner</h1>

				<div className="max-w-screen-sm mx-auto">
					{ticket !== null ? <ScannedUser ticket={ticket} /> : null}
				</div>

				<div className="max-w-sm mx-auto overflow-hidden left-0 bottom-0 absolute">
					<QrReader />
				</div>
			</div>
		</TicketContext.Provider>
	);
}
