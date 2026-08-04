CREATE TABLE `Users`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `email` VARCHAR(255) NOT NULL,
    `passwordHash` VARCHAR(255) NOT NULL,
    `branch` VARCHAR(255) NOT NULL,
    `year` INT NOT NULL,
    `profilePic` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
ALTER TABLE
    `Users` ADD UNIQUE `users_email_unique`(`email`);
CREATE TABLE `Events`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `title` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `clubId` BIGINT UNSIGNED NULL,
    `eventDate` DATETIME NOT NULL,
    `location` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Clubs`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `description` TEXT NOT NULL,
    `logo` VARCHAR(255) NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `Chatrooms`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(255) NOT NULL,
    `type` ENUM('SYSTEM', 'USER') NOT NULL,
    `block` BIGINT NULL,
    `floor` BIGINT NULL
);
CREATE TABLE `Messages`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `roomId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL,
    `message` TEXT NOT NULL,
    `createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE `RoomMembers`(
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    `roomId` BIGINT UNSIGNED NOT NULL,
    `userId` BIGINT UNSIGNED NOT NULL
);
ALTER TABLE
    `RoomMembers` ADD UNIQUE `roommembers_roomid_userid_unique`(`roomId`, `userId`);
ALTER TABLE
    `Messages` ADD CONSTRAINT `messages_roomid_foreign` FOREIGN KEY(`roomId`) REFERENCES `Chatrooms`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `RoomMembers` ADD CONSTRAINT `roommembers_roomid_foreign` FOREIGN KEY(`roomId`) REFERENCES `Chatrooms`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `RoomMembers` ADD CONSTRAINT `roommembers_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`) ON DELETE CASCADE;
ALTER TABLE
    `Messages` ADD CONSTRAINT `messages_userid_foreign` FOREIGN KEY(`userId`) REFERENCES `Users`(`id`);
ALTER TABLE
    `Events` ADD CONSTRAINT `events_clubid_foreign` FOREIGN KEY(`clubId`) REFERENCES `Clubs`(`id`);

CREATE INDEX idx_messages_room
ON Messages(roomId);

CREATE INDEX idx_messages_user
ON Messages(userId);

CREATE INDEX idx_events_date
ON Events(eventDate);
