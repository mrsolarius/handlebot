CREATE TABLE users
(
    "userID"           BIGINT unique      not null,
    "discordID"        char(18) unique    not null,
    "handle"           varchar(20) unique not null,
    "displayName"      varchar(30),
    "organizationSID"  varchar(10),
    "organizationRank" varchar(20),
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
    constraint PK_user primary key ("userID")
);

create table lang
(
    "langID" serial,
    "lang"   varchar(20),
    constraint pk_lang primary key ("langID")
);

create table organizations
(
    "organizationSID" varchar(10) not null,
    "name"            varchar(50),
    "logo"            varchar(256),
    "memberCount"     integer,
    "recruiting"      varchar(3),
    "archetype"       varchar(20),
    "commitment"      varchar(10),
    "roleplay"        varchar(3),
    "primaryFocus"    varchar(20),
    "primaryImage"    varchar(256),
    "secondaryFocus"  varchar(20),
    "secondaryImage"  varchar(256),
    "banner"          varchar(256),
    "headline"        varchar(300),
    "langID"          serial,
    constraint fk_lang_speak foreign key ("langID") references lang ("langID"),
    constraint PK_organisation primary key ("organizationSID")
);

create table speak
(
    "userID" BIGINT not null,
    "langID" serial not null,
    constraint pk_speak primary key ("userID", "langID"),
    constraint fk_user_speak foreign key ("userID") references users ("userID") ON DELETE CASCADE,
    constraint fk_lang_speak foreign key ("langID") references lang ("langID")
);