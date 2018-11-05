#---GIT---#

#Clone from github:
	git clone https://github.com/iamshaunjp/rest-api-playlist.git

#Remotes
	show all remote :
		git remote -v
	add remote
		git remote add pb https://github.com/paulboone/ticgit
	update remote url
		git remote set-url origin https://github.com/USERNAME/REPOSITORY.git
	remove remote:
		git remote rm origin

#push all branches
	git push origin --all	

#Clean all untracked files and directories
	git clean -df
	
#Detailler les nouveaux dossier :
	git status -u 

# git diff ignore space change
	git diff --ignore-space-change
