Ubuntu Architecture:
	/var/www/html/
	/var/www/Symfony/

	/etc/apaache2/site-availables
	/etc/apaache2/site-enabled
	/etc/hosts


set Clavier Azerty temporairement
	>setxkbmap fr

Install vim:
	> sudo apt-get update
	> sudo apt-cache search vim
	> sudo apt-get install vim

Remove Software:
	> sudo apt-get remove vim

Ubuntu Software:
	Install GDebi Package Installer : it role is installing package.deb
	
Widget CPU/RAM: 
	> sudo apt-get install indicator-multiload

Enable minimize clic:
	> gsettings set org.compiz.unityshell:/org/compiz/profiles/unity/plugins/unityshell/ launcher-minimize-window true

Move the navbar to the bottom:
	> gsettings set com.canonical.Unity.Launcher launcher-position Bottom

GIMP :
	> sudo apt-get install gimp

ATOM:
	> sudo add-apt-repository ppa:webupd8team/atom
	> sudo apt update; sudo apt install atom

ClipIt:
	> sudo apt-get install clipit

Chromium:
	> sudo add-apt-repository ppa:canonical-chromium-builds/stage
	> sudo apt-get update
	> sudo apt-get install chromium-browser

Chrome: 
	> sudo apt-get install google-chrome-stable

Vivaldi:
	> sudo apt-get install vivaldi-stable

Git:
	> sudo apt-get install git

Heroku:
	> wget -qO- https://cli-assets.heroku.com/install-ubuntu.sh | sh

Compile targz file:
	1.open a console
	use the command cd to navigate to the correct folder. If there is a README file with installation instructions, use that instead.
	extract the files with one of the commands
	2.extract:
	If it's tar.gz use 
		tar xvzf PACKAGENAME.tar.gz
	if it's a tar.bz2 use 
		tar xvjf PACKAGENAME.tar.bz2
	3.
	./configure
	4.
	make
	5.
	sudo make install

Snaps:
	snap find robomongo
	sudo snap install robomongo
	snap list
	snap changes
	#check for updates:
		sudo snap refresh --list
		sudo snap refresh robomongo
	#previous version:
		sudo snap revert robomongo
	#remove 
		sudo snap remove robomongo

Aptitude
	aptitude search xvjf
	aptitude install xvjf

Cle 3G:
	lsusb
	sudo usb_modeswitch -v 12d1 -p 15ce -J
	mon tel : 51608033

Limit internet Speed
	// list your connexions:
	>route 
	// sudo wondershaper route downloadSpeed uploadSpeed
	//>sudo wondershaper eth0 1000 500
	>sudo wondershaper enp8s0 3000 500
	>sudo wondershaper clear eth0




