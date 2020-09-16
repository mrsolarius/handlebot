--handle organisation part
create table lang
(
    "langISO" char(2),
    "lang"   varchar(20),
    constraint pk_lang primary key ("langISO")
);

create table organizations
(
    "organizationSID" varchar(10) not null,
    "name"            varchar(50),
    "logo"            varchar(256),
    "memberCount"     integer,
    "recruiting"      BOOLEAN,
    "archetype"       varchar(20),
    "commitment"      varchar(10),
    "roleplay"        BOOLEAN,
    "primaryFocus"    varchar(20),
    "primaryImage"    varchar(256),
    "secondaryFocus"  varchar(20),
    "secondaryImage"  varchar(256),
    "banner"          varchar(256),
    "headline"        varchar(500),
    "langID"          char(2),
    constraint fk_lang_speak foreign key ("langID") references lang ("langISO"),
    constraint PK_organisation primary key ("organizationSID")
);

CREATE TABLE users
(
    "userID"           BIGINT unique      not null,
    "discordID"        char(18) unique    not null,
    "handle"           varchar(20) unique not null,
    "displayName"      varchar(30),
    "organizationSID"  varchar(10),
    "organizationRank" varchar(30),
    "enlisted"         TIMESTAMP,
    "avatarURL"        varchar(256),
    "badge"            varchar(30),
    "badgeImage"       varchar(256),
    "bio"              varchar(1024),
    "pageTitle"        varchar(256),
    "pageLink"         varchar(256),
    "country"          varchar(50),
    "region"           varchar(50),
    "website"          varchar(256),
    constraint FK_Organization foreign key ("organizationSID") references organizations("organizationSID"),
    constraint PK_user primary key ("userID")
);

create table speak
(
    "userID" BIGINT not null,
    "langID" char(2) not null,
    constraint pk_speak primary key ("userID", "langID"),
    constraint fk_user_speak foreign key ("userID") references users ("userID") ON DELETE CASCADE,
    constraint fk_lang_speak foreign key ("langID") references lang ("langISO")
);

--ship part
create table manufacture
(
    "manufacturerCode" varchar(10) unique not null,
    "name" varchar(50),
    "description" varchar(1024),
    "knownFor" varchar(256),
    "logoURL" varchar(256),
    constraint pk_manufacture primary key ("manufacturerCode")
);

create table ship
(
    "slug" varchar(50) unique not null,
    "manufacturerCode" varchar(10) not null,
    "name" varchar(50),
    "type" varchar(30),
    "focus" varchar(50),
    "description" varchar(1024),
    "beam" real,
    "height" real,
    "length" real,
    "mass" integer,
    "size" varchar(20),
    "cargoCapacity" integer,
    "maxCrew" integer,
    "minCrew" integer,
    "afterBurnerSpeed" integer,
    "scmSpeed" integer,
    "pitchMax" real,
    "yawMax" real,
    "rollMax" real,
    "xAxisAcceleration" real,
    "yAxisAcceleration" real,
    "zAxisAcceleration" real,
    "price" money,
    "inGamePrice" money,
    "productionStatus" varchar(50),
    "componentJson" json,
    "lastModified" timestamp,
    "url" varchar(256),
    "fleetChartImage" varchar(256),
    "bannerImage" varchar(256),
    constraint pk_ship primary key (slug),
    constraint fk_ship_manufacturer FOREIGN KEY ("manufacturerCode") references manufacture("manufacturerCode")
);

--Star Map Schemas
CREATE TABLE affiliations (
    "codeAffiliation" VARCHAR(4) NOT NULL,
    "colorAffiliation" CHAR(7),
    "name" VARCHAR(45),
    PRIMARY KEY ("codeAffiliation")
);

CREATE TABLE stars (
    "starCode" VARCHAR(45) NOT NULL,
    "codeAffiliation" VARCHAR(4) NOT NULL,
    "description" TEXT,
    "aggregatedDanger" REAL,
    "aggregatedEconomy" REAL,
    "aggregatedPopulation"REAL,
    "aggregatedSize" REAL,
    "frostLine" REAL,
    "habitableZoneInner" REAL,
    "habitableZoneOuter" REAL,
    "infoUrl" VARCHAR(256),
    "positionX" REAL,
    "positionY" REAL,
    "positionZ" REAL,
    "imgURL" VARCHAR(256),
    "type" VARCHAR(45),
    "status" CHAR(1),
    constraint pk_stars primary key ("starCode"),
    constraint fk_affiliation foreign key ("codeAffiliation") references affiliations ("codeAffiliation")
);

CREATE TABLE types
(
    "typeCode" VARCHAR(45) NOT NULL,
    "nomType" VARCHAR(45),
    PRIMARY KEY ("typeCode")
);

CREATE TABLE subType(
    "subTypeID" INT NOT NULL,
    "typeCode" VARCHAR(45) NOT NULL,
    "nomSubType" VARCHAR(45),
    constraint pk_sub_type primary key ("subTypeID"),
    constraint fk_parent_type foreign key ("typeCode") references types ("typeCode")
);

CREATE TABLE starMapObjects
(
    "starCode" VARCHAR(45) NOT NULL,
    "typeCode" VARCHAR(45) NOT NULL,
    "objCode" VARCHAR(45) NOT NULL,
    "appearance" VARCHAR(45),
    "subType" int,
    "axialTilt" REAL,
    "name" VARCHAR(45),
    "description" VARCHAR(45),
    "designation" VARCHAR(45),
    "distance" REAL,
    "fairChanceAct" BOOLEAN,
    "habitable" BOOLEAN,
    "infoURL" VARCHAR(256),
    "lat" REAL,
    "long" REAL,
    "orbitPeriod" REAL,
    "sensorDanger" INT,
    "sensorEconomy" INT,
    "sensorPopulation" INT,
    "size" REAL,
    "imgURL" VARCHAR(256) NULL,
    constraint fk_star foreign key ("starCode") references stars ("starCode"),
    constraint fk_type foreign key ("typeCode") references types ("typeCode"),
    constraint pk_star_map_objects  primary key ("starCode","typeCode","objCode"),
    constraint fk_sub_type foreign key ("subType") references subType ("subTypeID")
);

CREATE TABLE ObjectChild(
    "parentStarCode" VARCHAR(45) NOT NULL,
    "parentTypeCode" VARCHAR(45) NOT NULL,
    "parentObjCode" VARCHAR(45) NOT NULL,
    "childStarCode" VARCHAR(45) NOT NULL,
    "childTypeCode" VARCHAR(45) NOT NULL,
    "childObjCode" VARCHAR(45) NOT NULL,
    constraint fk_star_map_object_parent foreign key ("parentStarCode","parentTypeCode","parentObjCode") references starMapObjects ("starCode","typeCode","objCode"),
    constraint fk_star_map_object_child foreign key ("childStarCode","childTypeCode","childObjCode") references starMapObjects ("starCode","typeCode","objCode"),
    constraint pk_object_child primary key ("parentStarCode","parentTypeCode","parentObjCode","childStarCode","childTypeCode","childObjCode")
);

CREATE TABLE jumpPointLinks(
   "entryStarCode" VARCHAR(45) NOT NULL,
   "entryTypeCode" VARCHAR(45) NOT NULL,
   "entryObjCode" VARCHAR(45) NOT NULL,
   "exitStarCode" VARCHAR(45) NOT NULL,
   "exitTypeCode" VARCHAR(45) NOT NULL,
   "exitObjCode" VARCHAR(45) NOT NULL,
   "name" varchar(12),
   "direction" char(1),
   "size" char(1),
   constraint fk_star_map_object_entry foreign key ("entryStarCode","entryTypeCode","entryObjCode") references starMapObjects ("starCode","typeCode","objCode"),
   constraint fk_star_map_object_exit foreign key ("exitStarCode","exitTypeCode","exitObjCode") references starMapObjects ("starCode","typeCode","objCode"),
   constraint pk_jump_point_links primary key ("entryStarCode","entryTypeCode","entryObjCode","exitStarCode","exitTypeCode","exitObjCode")
);

--Discord stat and utility
CREATE TABLE Server(
    "guildID" varchar(18),
    "prefix" varchar(3),
    "langID" char(2),
    "name" varchar(100),
    "memberCount" bigint,
    constraint pk_guildID primary key ("guildID"),
    constraint fk_lang_server foreign key ("langID") references lang ("langISO")
);

CREATE EXTENSION pg_trgm;
