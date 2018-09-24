
search packages:
	npm install -g npmsearch
	npm find <package>
	npmsearch <keywords> [options]

	options:
		--exact use exact keywords only (bool)
		--relevance relevance factor for sorting number > 0 default 0.25
		--downloads downloads factor for sorting number > 0 default 1.5
		--freshness freshness factor for sorting number > 0 default 0.25
		--halflife halflife of download count value in days `default 30
		--aging halflife of package freshness in days default 180
		--dataAge maximum data age in (days) or fetch from registry (default 1.5)
		--refresh force data update (bool

#Updating the CLI
	[sudo] npm uninstall -g angular-cli @angular/cli 
	npm cache clean 
	[sudo] npm install -g @angular/cli 

#Bower + Composer #Not Confirmed:
To automate installation of libraries with Bower, we can connect it with Composer. With this approach, each time we run composer install or composer update, Bower will also update our JavaScript libraries. We can achieve this by changing composer.json a bit and adding a scripts section, like this:

	"scripts": {
	"post-install-cmd": [
	"bower install"
	],
	"post-update-cmd": [
	"bower install"
	]
	}