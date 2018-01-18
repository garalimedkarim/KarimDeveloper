#grep exclude some directories:
	> grep "/users" -r --exclude-dir=node_modules ./*
	> grep "/users" -r --exclude-dir={node_modules,routes} ./*
	

# How to see every process except those running as root
	#To negates the selection pass the -N or --deselect option to the ps command:
	> ps -U root -u root -N

#Exact search:
	> apt-cache search '^git$' 
	# symbol explanation: ^:starts $:ends

#Find file "bashrc" which is starting with "."
	> find ~/ f -name "\.*" | grep "bashrc"	
