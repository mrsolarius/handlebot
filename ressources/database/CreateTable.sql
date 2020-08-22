create table lang
(
    "langID" serial,
    "lang"   varchar(20),
    "langISO" char(2)
    constraint pk_lang primary key ("langID")
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
    "langID"          serial,
    constraint fk_lang_speak foreign key ("langID") references lang ("langID"),
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
    "langID" serial not null,
    constraint pk_speak primary key ("userID", "langID"),
    constraint fk_user_speak foreign key ("userID") references users ("userID") ON DELETE CASCADE,
    constraint fk_lang_speak foreign key ("langID") references lang ("langID")
);

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

CREATE TABLE Server(
    "guildID" varchar(18),
    "prefix" varchar(5),
    "name" varchar(100),
    "memberCount" bigint,
    constraint pk_guildID primary key ("guildID")
);

CREATE EXTENSION pg_trgm;
