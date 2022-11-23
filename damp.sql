DROP DATABASE IF EXISTS testwork;
CREATE DATABASE testwork CHARACTER SET utf8;
USE testwork;
SET SQL_SAFE_UPDATES = 0;

DROP TABLE IF EXISTS Users;
CREATE TABLE Users (
    user_id 		TINYINT  	AUTO_INCREMENT, 
    first_name  	VARCHAR(40) NOT NULL,
    PRIMARY KEY  (user_id)
) CHARACTER SET utf8;

DROP TABLE IF EXISTS Followings;
CREATE TABLE Followings (
	_id					TINYINT		NOT NULL AUTO_INCREMENT,
    user_id 			TINYINT		NOT NULL,
    user_id_followee 	TINYINT		NOT NULL,
    PRIMARY KEY  		(_id),
    FOREIGN KEY 		(user_id) 	REFERENCES Users(user_id),
    FOREIGN KEY 		(user_id_followee) 	REFERENCES Users(user_id)
) CHARACTER SET utf8;
