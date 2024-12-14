import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatUserName, getUserInitials } from "../-utils";
import {
	Table,
	TableBody,
	TableCell,
	TableRow,
} from "@/components/ui/table";
import { Ticket } from "../-types/ticket";

type Props = {
	ticket: Ticket;
};

export function ScannedUser(props: Props): JSX.Element {
	return (
		<Card>
			<CardHeader className="items-center">
				<Avatar className="size-40">
					<AvatarImage
						src={props.ticket.reservation.user.avatar_url || undefined}
					/>
					<AvatarFallback className="bg-primary text-primary-foreground text-6xl">
						{getUserInitials(props.ticket.reservation.user)}
					</AvatarFallback>
				</Avatar>
			</CardHeader>

			<CardContent>
				<Table>
					<TableBody>
						<TableRow>
							<TableCell className="font-inter-semibold w-40">Name</TableCell>
							<TableCell>
								{formatUserName(props.ticket.reservation.user)}
							</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-inter-semibold w-40">
								Ticket No.
							</TableCell>
							<TableCell>{props.ticket.ticket_number}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-inter-semibold w-40">Event</TableCell>
							<TableCell>{props.ticket.reservation.event.name}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-inter-semibold w-40">Venue</TableCell>
							<TableCell>{props.ticket.reservation.venue.name}</TableCell>
						</TableRow>

						<TableRow>
							<TableCell className="font-inter-semibold w-40">Seat</TableCell>
							<TableCell>{props.ticket.reservation.seat.seat_number}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
