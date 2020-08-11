CREATE TABLE users
(
    userID BIGINT unique not null,
    discord_ID char(18) unique not null,
    handle varchar(20) unique not null,
    displayName varchar(30),
    organisationSID varchar(10),
    organisationRank varchar(20),
    enlisted TIMESTAMP,
    avatarURL varchar(256),
    badge varchar(30),
    badgeImage varchar(256),
    bio varchar(1024),
    page_link varchar(256),
    page_title varchar(256),
    country varchar(50),
    region varchar(50),
    website varchar(256),
    constraint PK_user primary key (userID)
);

create table organisations
(
    organisationSID varchar(10)not null,
    title varchar(50),
    logo varchar(256),
    member_count integer,
    recruiting varchar(3),
    archetype varchar(20),
    commitment varchar(10),
    roleplay varchar(3),
    primary_focus varchar(20),
    primary_image varchar(256),
    secondary_focus varchar(20),
    secondary_image varchar(256),
    banner varchar (256),
    headline varchar (300),
    constraint PK_organisation primary key (organisationSID)
);

create table lang(
	langID serial,
	lang varchar(20),
	constraint pk_lang primary key(langID)
);

create table speak(
	userID BIGINT not null,
	langID serial not null,
	constraint pk_speak primary key (userID, langID),
	constraint fk_user_speak foreign key(userID) references users(userID) ON DELETE CASCADE,
	constraint fk_lang_speak foreign key(langID) references lang(langID)
);

create table organisationSpeak(
	organisationSID varchar(10)not null,
	langID serial not null,
	constraint pk_organisationSpeak primary key (organisationSID, langID),
	constraint fk_organisation_organisationSpeak foreign key(organisationSID) references organisations(organisationSID),
	constraint fk_lang_organisationSpeak foreign key(langID) references lang(langID)
);