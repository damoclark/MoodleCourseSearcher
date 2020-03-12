// ==UserScript==
// @name        Moodle Course Searcher
// @namespace   https://damos.world
// @description Search for any course site on any page in Moodle header
// @include     https://moodle.cqu.edu.au/*
// @include			https://bedifferent.cqu.edu.au/*
// @include     https://moodle-vet.cqu.edu.au/*
// @include     https://cpd.cqu.edu.au/*
// @include     https://moodle-archive-2014.cqu.edu.au/*
// @version     0.2.1
// @noframes
// @grant       none
// ==/UserScript==

console.log('Running Moodle Course Searcher') ;

(() => {
	try {
		// If there is a search box already, don't add one
		if(window.document.querySelector('#coursesearch, #coursesearchnavbar, #coursesearch2'))
			return ;

		//Here is the standard Moodle 3.7 Search form HTML from existing pages in Moodle
		let courseSearchHTML = `
<div class="ml-auto d-flex">
	<form style="margin-left: 2em; margin-right: 2em" target="_blank" action="/course/search.php" id="coursesearchnavbar" method="get" class="form-inline">
    <fieldset class="coursesearchbox invisiblefieldset">
			<label for="navsearchbox">Search units</label>
			<input id="navsearchbox" name="search" type="text" size="20" class="form-control">
			<button class="btn btn-secondary" type="submit">Go</button>
    </fieldset>
	</form>
</div>` ;

		//Stick it into the Moodle Header - Voila!!
		if(window.document.querySelector('div#page-navbar')) {
			document.querySelector('div#course-header').insertAdjacentHTML('beforeend',courseSearchHTML) ;
		}
		else {
			document.querySelector("#page-header").insertAdjacentHTML("beforeend", courseSearchHTML);
		}

	} catch (err) {
		console.log('Error: ' + err);
		console.log('On line: ' + err.lineNumber);
		console.log('Stack:' + err.stack);
	}
})() ;
