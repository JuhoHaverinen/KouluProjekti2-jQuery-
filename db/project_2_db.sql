-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema Projekt_2
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema Projekt_2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `Projekt_2` DEFAULT CHARACTER SET utf8mb4 ;
-- -----------------------------------------------------
-- -----------------------------------------------------
USE `Projekt_2` ;


-- -----------------------------------------------------
-- Table `Projekt_2`.`posti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`posti` (
  `postinro` CHAR(5) NOT NULL,
  `toimipaikka` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`postinro`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`asiakas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`asiakas` (
  `asiakas_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `postinro` CHAR(5) NOT NULL,
  `etunimi` VARCHAR(20) NOT NULL,
  `sukunimi` VARCHAR(40) NOT NULL,
  `lahiosoite` VARCHAR(40) NOT NULL,
  `email` VARCHAR(50) NULL,
  `puhelinnro` VARCHAR(15) NULL,
  `sahkopostilasku` TINYINT NULL,
  `paperilasku` TINYINT NULL,
  PRIMARY KEY (`asiakas_id`),
  INDEX `fk_asiakas_posti_idx` (`postinro` ASC) VISIBLE,
  CONSTRAINT `fk_asiakas_posti`
    FOREIGN KEY (`postinro`)
    REFERENCES `Projekt_2`.`posti` (`postinro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`mokki`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`mokki` (
  `mokki_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `alue_id` INT UNSIGNED NOT NULL,
  `postinro` CHAR(5) NOT NULL,
  `mokkinimi` VARCHAR(45) NOT NULL,
  `katuosoite` VARCHAR(45) NOT NULL,
  `hinta` DOUBLE NULL,
  `kuvaus` VARCHAR(150) NULL,
  `henkilomaara` INT NULL,
  `varustelu` VARCHAR(100) NULL,
  PRIMARY KEY (`mokki_id`),
  INDEX `fk_mokki_alue1_idx` (`alue_id` ASC) VISIBLE,
  INDEX `fk_mokki_posti1_idx` (`postinro` ASC) VISIBLE,
  CONSTRAINT `fk_mokki_alue1`
    FOREIGN KEY (`alue_id`)
    REFERENCES `Projekt_2`.`alue` (`alue_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_mokki_posti1`
    FOREIGN KEY (`postinro`)
    REFERENCES `Projekt_2`.`posti` (`postinro`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`alue`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`alue` (
  `alue_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `nimi` VARCHAR(40) NOT NULL,
  PRIMARY KEY (`alue_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`palvelu`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`palvelu` (
  `palvelu_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `alue_id` INT UNSIGNED NOT NULL,
  `nimi` VARCHAR(40) NOT NULL,
  `tyyppi` INT NOT NULL,
  `kuvaus` VARCHAR(255) NULL,
  `hinta` DOUBLE NULL,
  `alv` DOUBLE NULL,
  PRIMARY KEY (`palvelu_id`),
  INDEX `fk_palvelu_alue1_idx` (`alue_id` ASC) VISIBLE,
  CONSTRAINT `fk_palvelu_alue1`
    FOREIGN KEY (`alue_id`)
    REFERENCES `Projekt_2`.`alue` (`alue_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`lasku`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`lasku` (
  `lasku_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `varaus_id` INT UNSIGNED NOT NULL,
  `summa` DOUBLE NOT NULL,
  `alv` DOUBLE NOT NULL,
  `erapaiva` DATETIME,
  `completed` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`lasku_id`),
  INDEX `fk_lasku_varaus1_idx` (`varaus_id` ASC) VISIBLE,
  CONSTRAINT `fk_lasku_varaus1`
    FOREIGN KEY (`varaus_id`)
    REFERENCES `Projekt_2`.`varaus` (`varaus_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`varauksen_palvelut`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`varauksen_palvelut` (
  `varaus_id` INT UNSIGNED NOT NULL,
  `palvelu_palvelu_id` INT UNSIGNED NOT NULL,
  `lkm` INT NOT NULL,
  INDEX `fk_varaus_has_palvelu_varaus1_idx` (`varaus_id` ASC) VISIBLE,
  PRIMARY KEY (`palvelu_palvelu_id`, `varaus_id`, `lkm`),
  INDEX `fk_varauksen_palvelut_palvelu1_idx` (`palvelu_palvelu_id` ASC) VISIBLE,
  CONSTRAINT `fk_varaus_has_palvelu_varaus1`
    FOREIGN KEY (`varaus_id`)
    REFERENCES `Projekt_2`.`varaus` (`varaus_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_varauksen_palvelut_palvelu1`
    FOREIGN KEY (`palvelu_palvelu_id`)
    REFERENCES `Projekt_2`.`palvelu` (`palvelu_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`varaus`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`varaus` (
  `varaus_id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `asiakas_asiakas_id` INT UNSIGNED NOT NULL,
  `mokki_mokki_id` INT UNSIGNED NOT NULL,
  `varattu_pvm` DATETIME NOT NULL,
  `vahvistus_pvm` DATETIME NOT NULL,
  `varattu_alkupvm` DATETIME NOT NULL,
  `varattu_loppupvm` DATETIME NOT NULL,
  PRIMARY KEY (`varaus_id`),
  INDEX `fk_varaus_asiakas1_idx` (`asiakas_asiakas_id` ASC) VISIBLE,
  INDEX `fk_varaus_mokki1_idx` (`mokki_mokki_id` ASC) VISIBLE,
  CONSTRAINT `fk_varaus_asiakas1`
    FOREIGN KEY (`asiakas_asiakas_id`)
    REFERENCES `Projekt_2`.`asiakas` (`asiakas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_varaus_mokki1`
    FOREIGN KEY (`mokki_mokki_id`)
    REFERENCES `Projekt_2`.`mokki` (`mokki_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `Projekt_2`.`authentication`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `Projekt_2`.`authentication` (
  `login` VARCHAR(45) NOT NULL,
  `asiakas_id` INT UNSIGNED NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `admin` TINYINT(1) NULL DEFAULT 0,
  PRIMARY KEY (`login`),
  INDEX `fk_authentication_asiakas1_idx` (`asiakas_id` ASC) VISIBLE,
  CONSTRAINT `fk_authentication_asiakas1`
    FOREIGN KEY (`asiakas_id`)
    REFERENCES `Projekt_2`.`asiakas` (`asiakas_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Placeholder table for view `projekt_2`.`laskuntiedot`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projekt_2`.`laskuntiedot` (`lasku_id` INT, `varaus_id` INT, `asiakas_id` INT, `asiakas` INT, `mokin paivahinta` INT, `yot` INT, `tilatut palvelut lkm` INT, `palvelun hinta` INT, `summa` INT, `alv` INT, `completed` INT);

-- -----------------------------------------------------
-- Placeholder table for view `projekt_2`.`lisapalvelut_raportti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projekt_2`.`lisapalvelut_raportti` (`varaus_id` INT, `alue` INT, `palvelu` INT, `alkamisaika` INT, `loppumisaika` INT, `varaajan nimi` INT);

-- -----------------------------------------------------
-- Placeholder table for view `projekt_2`.`majoittuminen_raportti`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `projekt_2`.`majoittuminen_raportti` (`varaus_id` INT, `alue` INT, `mokin_nimi` INT, `alkamisaika` INT, `loppumisaika` INT, `varaajan_nimi` INT);

-- -----------------------------------------------------
-- View `projekt_2`.`laskuntiedot`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projekt_2`.`laskuntiedot`;
USE `projekt_2`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `projekt_2`.`laskuntiedot` AS
    SELECT 
        `l`.`lasku_id` AS `lasku_id`,
        `l`.`varaus_id` AS `varaus_id`,
        `a`.`asiakas_id` AS `asiakas_id`,
        CONCAT(`a`.`etunimi`, ' ', `a`.`sukunimi`) AS `asiakas`,
        `m`.`hinta` AS `mokin paivahinta`,
        ((TO_DAYS(`v`.`varattu_loppupvm`) - TO_DAYS(`v`.`varattu_alkupvm`)) + 1) AS `yot`,
        `vp`.`lkm` AS `tilatut palvelut lkm`,
        `p`.`hinta` AS `palvelun hinta`,
        ROUND(((((TO_DAYS(`v`.`varattu_loppupvm`) - TO_DAYS(`v`.`varattu_alkupvm`)) + 1) * `m`.`hinta`) + (`p`.`hinta` * `vp`.`lkm`)),
                2) AS `summa`,
        ROUND((((((TO_DAYS(`v`.`varattu_loppupvm`) - TO_DAYS(`v`.`varattu_alkupvm`)) + 1) * `m`.`hinta`) + (`p`.`hinta` * `vp`.`lkm`)) - (((((TO_DAYS(`v`.`varattu_loppupvm`) - TO_DAYS(`v`.`varattu_alkupvm`)) + 1) * `m`.`hinta`) + (`p`.`hinta` * `vp`.`lkm`)) / 1.24)),
                2) AS `alv`,
        DATE_FORMAT((`v`.`varattu_alkupvm` + INTERVAL 10 DAY), '%Y-%m-%d') AS `erapaiva`,
        IF(`l`.`completed`, 'true', 'false') AS `completed`
    FROM
        (((((`projekt_2`.`lasku` `l`
        LEFT JOIN `projekt_2`.`varaus` `v` ON ((`v`.`varaus_id` = `l`.`varaus_id`)))
        LEFT JOIN `projekt_2`.`mokki` `m` ON ((`m`.`mokki_id` = `v`.`mokki_mokki_id`)))
        LEFT JOIN `projekt_2`.`varauksen_palvelut` `vp` ON ((`vp`.`varaus_id` = `v`.`varaus_id`)))
        LEFT JOIN `projekt_2`.`palvelu` `p` ON ((`p`.`palvelu_id` = `vp`.`palvelu_palvelu_id`)))
        LEFT JOIN `projekt_2`.`asiakas` `a` ON ((`a`.`asiakas_id` = `v`.`asiakas_asiakas_id`)));

-- -----------------------------------------------------
-- View `projekt_2`.`lisapalvelut_raportti`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projekt_2`.`lisapalvelut_raportti`;
USE `projekt_2`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `projekt_2`.`lisapalvelut_raportti` AS
    SELECT 
        `v`.`varaus_id` AS `varaus_id`,
        `al`.`nimi` AS `alue`,
        `p`.`nimi` AS `palvelu`,
        DATE_FORMAT(`v`.`varattu_alkupvm`, '%Y-%m-%d') AS `alkamisaika`,
        DATE_FORMAT(`v`.`varattu_loppupvm`, '%Y-%m-%d') AS `loppumisaika`,
        CONCAT(`a`.`etunimi`, ' ', `a`.`sukunimi`) AS `varaajan_nimi`
    FROM
        ((((`projekt_2`.`varaus` `v`
        JOIN `projekt_2`.`varauksen_palvelut` `vp` ON ((`vp`.`varaus_id` = `v`.`varaus_id`)))
        LEFT JOIN `projekt_2`.`palvelu` `p` ON ((`p`.`palvelu_id` = `vp`.`palvelu_palvelu_id`)))
        LEFT JOIN `projekt_2`.`alue` `al` ON ((`al`.`alue_id` = `p`.`alue_id`)))
        LEFT JOIN `projekt_2`.`asiakas` `a` ON ((`a`.`asiakas_id` = `v`.`asiakas_asiakas_id`)));

-- -----------------------------------------------------
-- View `projekt_2`.`majoittuminen_raportti`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `projekt_2`.`majoittuminen_raportti`;
USE `projekt_2`;
CREATE 
     OR REPLACE ALGORITHM = UNDEFINED 
    DEFINER = `root`@`localhost` 
    SQL SECURITY DEFINER
VIEW `projekt_2`.`majoittuminen_raportti` AS
    SELECT 
        `v`.`varaus_id` AS `varaus_id`,
        `al`.`nimi` AS `alue`,
        `m`.`mokkinimi` AS `mokin_nimi`,
        DATE_FORMAT(`v`.`varattu_alkupvm`, '%Y-%m-%d') AS `alkamisaika`,
        DATE_FORMAT(`v`.`varattu_loppupvm`, '%Y-%m-%d') AS `loppumisaika`,
        CONCAT(`a`.`etunimi`, ' ', `a`.`sukunimi`) AS `varaajan_nimi`
    FROM
        (((`projekt_2`.`varaus` `v`
        JOIN `projekt_2`.`mokki` `m` ON ((`m`.`mokki_id` = `v`.`mokki_mokki_id`)))
        JOIN `projekt_2`.`asiakas` `a` ON ((`a`.`asiakas_id` = `v`.`asiakas_asiakas_id`)))
        JOIN `projekt_2`.`alue` `al` ON ((`m`.`alue_id` = `al`.`alue_id`)));


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
