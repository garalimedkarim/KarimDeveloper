
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