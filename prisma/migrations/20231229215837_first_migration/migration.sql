-- CreateTable
CREATE TABLE `proizvodi` (
    `ime_proizvoda` VARCHAR(200) NOT NULL,
    `slika_proizvoda` VARCHAR(200) NOT NULL,
    `cijena` DOUBLE NOT NULL,
    `boje` VARCHAR(100) NOT NULL,
    `velicine` VARCHAR(100) NOT NULL,
    `id` INTEGER NOT NULL AUTO_INCREMENT,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
