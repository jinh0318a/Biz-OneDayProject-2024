use cardb;

create table tbl_users(
	username varchar(20) primary key,
	realname varchar(20) not null,
    password varchar(255) not null,
    email varchar(30) not null
);

create table tbl_records(
r_no	INT	AUTO_INCREMENT	PRIMARY KEY,
r_div	VARCHAR(20)	NOT NULL	,
r_start	VARCHAR(30)	NOT NULL	,
r_end	VARCHAR(30)		,
r_dis	INT		,
r_cost	INT		,
r_place	VARCHAR(100),
r_username VARCHAR(20),

constraint fk_user foreign key (r_username) references tbl_users(username) on delete cascade
);	
