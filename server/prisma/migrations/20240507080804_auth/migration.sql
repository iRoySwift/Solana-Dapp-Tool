/*
  Warnings:

  - You are about to drop the column `status` on the `log_login` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `auth_user` ADD COLUMN `status` ENUM('ONLINE', 'OFFLINE') NULL;

-- AlterTable
ALTER TABLE `log_login` DROP COLUMN `status`;
