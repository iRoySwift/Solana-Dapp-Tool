/*
  Warnings:

  - You are about to drop the column `user` on the `log_login` table. All the data in the column will be lost.
  - Added the required column `username` to the `log_login` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `log_login_user_key` ON `log_login`;

-- AlterTable
ALTER TABLE `log_login` DROP COLUMN `user`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `user_username_key`(`username`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
