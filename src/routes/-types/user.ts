export enum UserRole {
	Admin = "admin",
	Student = "student",
	Visitor = "visitor",
}

export enum UserSex {
	Male = "male",
	Female = "female",
}

export type User = {
	user_id: string;
	email: string;
	role: UserRole;
	first_name: string;
	middle_name: string | null;
	last_name: string;
	birth_date: Date;
	sex: UserSex;
	avatar_url: string | null;
};

export type UserBriefDetail = {
	user_id: string;
	first_name: string;
	middle_name: string | null;
	last_name: string;
    avatar_url: string | null;
};
