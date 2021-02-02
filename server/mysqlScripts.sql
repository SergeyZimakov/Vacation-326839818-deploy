CREATE SCHEMA `vacationszimakov` ;

CREATE TABLE `vacationszimakov`.`users` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstName` VARCHAR(25) NOT NULL,
  `secondName` VARCHAR(25) NOT NULL,
  `userName` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role` VARCHAR(7) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `userName_UNIQUE` (`userName` ASC) VISIBLE);


CREATE TABLE `vacationszimakov`.`vacations` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `description` VARCHAR(100) NULL,
  `destination` VARCHAR(45) NULL,
  `image` VARCHAR(200) NULL,
  `price` DECIMAL(8,2) NULL,
  `FromDate` DATE NULL,
  `ToDate` DATE NULL,
  PRIMARY KEY (`id`));

  CREATE TABLE `vacationszimakov`.`folows` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `userId` INT NOT NULL,
  `vacationId` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `FK_FOLOWS_TO_USERS_idx` (`userId` ASC) VISIBLE,
  INDEX `FK_FOLOWS_TO_VACATION_idx` (`vacationId` ASC) VISIBLE,
  CONSTRAINT `FK_FOLOWS_TO_USERS`
    FOREIGN KEY (`userId`)
    REFERENCES `vacationszimakov`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `FK_FOLOWS_TO_VACATION`
    FOREIGN KEY (`vacationId`)
    REFERENCES `vacationszimakov`.`vacations` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

    ALTER TABLE `vacationszimakov`.`users` 
CHANGE COLUMN `password` `password` VARCHAR(200) NOT NULL ;

ALTER TABLE `vacationszimakov`.`folows` 
RENAME TO  `vacationszimakov`.`follows` ;

