drop database if exists siestaNbrekkie;
create database siestaNbrekkie;
use siestaNbrekkie;

create table Listings (
	id int AUTO_INCREMENT,
	short_desc varchar(255),
	city varchar(255),
	country varchar(255),
	discount_rate double,
	discount_measure int,
	PRIMARY KEY (id)
);

create table MinMaxDays (
	id int AUTO_INCREMENT,
	sunday_min int NOT NULL,
	monday_min int NOT NULL,
	tuesday_min int NOT NULL,
	wednesday_min int NOT NULL,
	thursday_min int NOT NULL,
	friday_min int NOT NULL,
	saturday_min int NOT NULL,
	max_days int NOT NULL,
	listing_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (listing_id) references Listings(id)
);

create table UnavailableDates (
	id int AUTO_INCREMENT,
	ua_date date NOT NULL,
	listing_id int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (listing_id) references Listings(id)
);



