import { useContext, useEffect, useRef } from "react";
import QrScanner from "qr-scanner";
import { Ticket, TicketStatus, UpdateTicketRequest } from "../-types/ticket";
import { ApiResponse, ApiResponseStatus } from "@/lib/api/types";
import { TicketContext } from "../-contexts/ticket";
import { toast } from "sonner";

export function QrReader(): JSX.Element {
	const ticketContext = useContext(TicketContext);
	const videoRef = useRef<HTMLVideoElement | null>(null);

	useEffect(() => {
		if (videoRef.current === null) {
			console.warn("Video element not found.");
			return;
		}

		const qrScanner = new QrScanner(
			videoRef.current,
			async (result) => {
				let toastId = toast.loading("Scanning...");
				console.log(result.data);

				if (result.data.length !== 6) {
					console.error("Invalid ticket number:", result.data);
					toast.error("Invalid ticket number.", { id: toastId });
					return;
				}

				const ticket = await getTicketByNumber(result.data);

				if (ticket.status !== ApiResponseStatus.Success) {
					console.error("Failed to get ticket:", ticket);
					toast.error(ticket.message, { id: toastId });
					return;
				}

				ticketContext.setTicket(ticket.data);

				if (ticket.data.status === TicketStatus.Used) {
					toast.warning("This ticket is already used.", { id: toastId });
					return;
				}

				const updateResponse = await updateTicket({
					ticket_id: ticket.data.ticket_id,
					status: TicketStatus.Used,
				});

                console.log(updateResponse)

				toast.success(ticket.message, { id: toastId });
			},
			{
				highlightScanRegion: true,
				highlightCodeOutline: true,
				returnDetailedScanResult: true,
				maxScansPerSecond: 1,
			},
		);

		qrScanner.setInversionMode("both");
		qrScanner.start().catch((error) => console.error(error));

		return () => {
			qrScanner.destroy();
		};
	}, []);

	return <video ref={videoRef} className="w-full h-full object-cover"></video>;
}

async function getTicketByNumber(
	ticketNumber: string,
): Promise<ApiResponse<Ticket>> {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/api/tickets/${ticketNumber}`,
		{
			method: "GET",
		},
	);

	const result: ApiResponse<Ticket> = await response.json();

	return result;
}

async function updateTicket(ticket: UpdateTicketRequest): Promise<ApiResponse> {
	const response = await fetch(
		`${import.meta.env.VITE_BACKEND_URL}/api/tickets/${ticket.ticket_id}`,
		{
			method: "PATCH",
			body: JSON.stringify(ticket),
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	const result: ApiResponse = await response.json();

	return result;
}
