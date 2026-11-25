CREATE TABLE IF NOT EXISTS `leagues` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`subtitle` text NOT NULL,
	`sort_order` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `leagues_sort_order_unique` ON `leagues` (`sort_order`);--> statement-breakpoint
CREATE TABLE IF NOT EXISTS `players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`puuid` text NOT NULL,
	`game_name` text NOT NULL,
	`tag_line` text NOT NULL,
	`platform` text NOT NULL,
	`league_id` text NOT NULL,
	`tier` text DEFAULT 'UNRANKED' NOT NULL,
	`division` text DEFAULT '' NOT NULL,
	`league_points` integer DEFAULT 0 NOT NULL,
	`wins` integer DEFAULT 0 NOT NULL,
	`losses` integer DEFAULT 0 NOT NULL,
	`profile_icon_id` integer,
	`hot_streak` integer DEFAULT false NOT NULL,
	`loss_streak` integer,
	`last_synced_at` text,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`league_id`) REFERENCES `leagues`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS `players_puuid_unique` ON `players` (`puuid`);