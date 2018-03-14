CREATE TABLE gtdb (
    id INT AUTO_INCREMENT,
    eventid INT,
    iyear   INT,
    imonth INT,
    iday INT,
    country_txt VARCHAR(255),
    region_txt VARCHAR(255),
    provstate VARCHAR(255),
    city VARCHAR(255),
    latitude DECIMAL(20,8),
    longitude DECIMAL(20,8),
    attacktype1 INT,
    attacktype2 INT,
    attacktype3 INT,
    targtype1 INT,
    targtype2 INT,
    targtype3 INT,
    gname VARCHAR(255),
    gname2 VARCHAR(255),
    gname3 VARCHAR(255),
    weaptype1 INT,
    weaptype2 INT,
    weaptype3 INT,
    weaptype4 INT,
    multiple enum('yes', 'no'),
    success enum('yes', 'no'),
    suicide enum('yes', 'no'),
    claimed enum('yes', 'no'),
    individual enum('yes', 'no'),
    nkil INT,
    nwound INT,
    nkillter INT,
    nwoundte INT,
    propvalue INT,
    PRIMARY KEY(id)
);


