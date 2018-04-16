-- CREATE TABLE "leaderboard" ----------------------------------
CREATE TABLE `leaderboard` ( 
	`social_id` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`score` INT( 255 ) NOT NULL,
	`name` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
	`lastname` TEXT CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL )
CHARACTER SET = utf8
COLLATE = utf8_general_ci
ENGINE = INNODB;
-- -------------------------------------------------------------

-- CREATE INDEX "score_index" ----------------------------------
CREATE INDEX `score_index` USING BTREE ON `leaderboard`( `score` );
-- -------------------------------------------------------------

-- CREATE INDEX "social_id_index" ------------------------------
CREATE INDEX `social_id_index` USING BTREE ON `leaderboard`( `social_id`( 100 ) );
-- -------------------------------------------------------------
