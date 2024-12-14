import { User, UserBriefDetail } from "../-types/user";

export function formatUserName(
	user: User | UserBriefDetail,
	variant: "fl" | "lf" = "fl",
): string {
	if (variant === "lf") {
		return `${user.last_name}, ${user.first_name}`;
	}

	return `${user.first_name} ${user.last_name}`;
}

export function getUserInitials(user: User | UserBriefDetail): string {
	const initials = `${user.first_name[0]}${user.last_name[0]}`;

	return initials;
}
