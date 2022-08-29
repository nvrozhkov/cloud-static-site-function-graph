CREATE TABLE `pets`.`pets` (
	`id` INT(11) UNSIGNED NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(100) NULL,
	`color` VARCHAR(32) NULL,
	`age` INT(3) UNSIGNED NULL,
	PRIMARY KEY (`id`)
)	ENGINE = InnoDB
	DEFAULT CHARACTER SET = utf8mb4
	COLLATE = utf8mb4_general_ci;