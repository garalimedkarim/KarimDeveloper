
#Install Ubuntu: 
	apt-get install mysql-server
#connect
	mysql -u root -p

#Grant all privilege on DB to user:
	GRANT ALL PRIVILEGES ON iheb_db_2.* TO 'iheb_db'@'localhost' WITH GRANT OPTION;