/// <reference types="@sveltejs/kit" />

// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare namespace App {
	// interface Locals {}
	// interface Platform {}
	// interface Session {}
	// interface Stuff {}
}
declare namespace Lucia {
    interface UserData {
		username: string;
		email: string;
		rating: number;
		match: string;
		created_at?: string;
	}
}

declare module "cf-wrapper" {
	export default class Cf {
		username?: string;
		password?: string;
		static csrf: string;
		static ftaa: string;
		static bfaa: string;
		static isLoggedIn(): boolean;
		constructor(username?: string, password?: string);
		getCsrf(): Promise<void>;
		login(): Promise<void>;
		submit(contestId: string, problemId: string, language: string, source: string): Promise<string>;
		getContestList(gym: boolean): Promise<object[]>;
		getProblemsList(): Promise<object[]>;
		getContestProblems(contestId: string): Promise<object>;
		getProblemStatement(contestId: number, problemId: string): Promise<string>;
		checkSubmission(contestId: string, submissionId: string): Promise<string[]>;
	}	
}

interface Problem {
	contestId: number;
	index: string;
	name: string;
	type: string;
	points: number;
	rating: number;
	tags: string[];
}

interface Game {
	contestant_1: string;
	contestant_2: string;
	created_at: string;
	duration: number;
	id: string;
	problems: string[];
	scores: number[];
	start_time: string;
	who_solved: number[];
	elos: string[];
}

interface Submission {
	id: string;
	match: string;
	username: string;
	problem: string;
	language: string;
	code: string;
	status: string;
	runtime: string;
	memory: string;
	processed: boolean;
	created_at: string;
}