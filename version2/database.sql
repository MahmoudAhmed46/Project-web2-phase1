drop database if exists EvetDetails;
create database if not exists EvetDetails;
use EvetDetails;
create table if not exists Event(
EventName varchar(100) not null,
EventType varchar(100) not null,
EventTarget varchar(250) not null,
EventTime varchar(150) not null
);
