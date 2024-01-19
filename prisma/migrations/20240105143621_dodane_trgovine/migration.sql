/*
  Warnings:

  - Added the required column `kategorijaId` to the `proizvodi` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `proizvodi` ADD COLUMN `kategorijaId` INTEGER NOT NULL;

-- CreateTable
CREATE TABLE `kategorije_proizvoda` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `ime_kategorije` VARCHAR(100) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `trgovine` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `proizvodi` ADD CONSTRAINT `proizvodi_kategorijaId_fkey` FOREIGN KEY (`kategorijaId`) REFERENCES `kategorije_proizvoda`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
