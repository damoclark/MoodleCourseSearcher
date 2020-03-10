// ==UserScript==
// @name        Moodle Course Searcher
// @namespace   https://damos.world
// @description Search for any course site on any page from textbook in Moodle header
// @include     https://moodle.cqu.edu.au/*
// @include			https://bedifferent.cqu.edu.au/*
// @include     https://moodle-vet.cqu.edu.au/*
// @include     https://moodle-archive-2014.cqu.edu.au/*
// @version     0.2.0
// @grant       none
// ==/UserScript==

console.log('Running Moodle Course Search Header') ;

(() => {
	try {
		// If there is a search box already, don't add one
		if(window.document.querySelector('#coursesearch, #coursesearchnavbar'))
			return ;
		//Here is the standard Moodle 3.7 Search form HTML from existing pages in Moodle
		let courseSearchHTML = `<form style="margin-left: 2em;" action="/course/search.php" id="coursesearch" method="get" class="form-inline">
			<fieldset class="coursesearchbox invisiblefieldset">
					<label for="coursesearchbox">Search units</label>
					<input id="coursesearchbox" name="search" type="text" size="30" value="" class="form-control">
					<button class="btn btn-secondary" type="submit">Go</button>
							<a class="btn btn-link p-0" role="button" data-container="body" data-toggle="popover" data-placement="right" data-content="<div class=&quot;no-overflow&quot;><p>You can search for multiple words at once and can refine your search as follows:</p>
	
	<ul><li>word - find any match of this word within the text</li>
	<li>+word - only exact matching words will be found</li>
	<li>-word - don't include results containing this word.</li>
	</ul></div> " data-html="true" tabindex="0" data-trigger="focus">
								<i class="icon fa fa-question-circle text-info fa-fw " title="Help with Search units" aria-label="Help with Search units"></i>
							</a>
			</fieldset>
	</form>`;

		//Stick it into the Moodle Header - Voila!!
		console.debug('About to insert ' + courseSearchHTML);
		document.querySelector("#page-header").insertAdjacentHTML("beforeend", courseSearchHTML);

		//////////////////////////////////////////////////////////////////////////
		//Code reused from
		//https://github.com/damoclark/mav-enterprise/blob/master/gmwww/balmi.user.js
		//Find the breadcrumbs div
		var breadcrumbs = document.getElementsByClassName('breadcrumb')[0];
		var home = breadcrumbs.getElementsByTagName('a')[0];
		var a = document.createElement('a');
		a.href = home.href;
		//If there is only a 'my home' at the base of the breadcrumb, remove
		//the my bit from the url
		a.pathname = a.pathname.replace(/(?:my\/?)?$/, "") + 'course/search.php';

		//////////////////////////////////////////////////////////////////////////
		document.querySelector("form#headercoursesearchnavbar").setAttribute('action', a);

		//Hack for CQU Moodle sites that have a banner image in the header
		var banner = document.querySelector("img#custombanner");
		if (banner)
			banner.style.zIndex = "-1";
	} catch (err) {
		console.log('Error: ' + err);
		console.log('On line: ' + err.lineNumber);
		console.log('Stack:' + err.stack);
	}
})() ;
