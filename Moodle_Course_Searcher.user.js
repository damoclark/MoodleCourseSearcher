// ==UserScript==
// @name        Moodle Course Searcher
// @namespace   https://damos.world
// @description Search for any course site on any page from textbook in Moodle header
// @include     https://moodle.cqu.edu.au/*
// @include     https://moodle-vet.cqu.edu.au/*
// @include     https://moodle-archive-2014.cqu.edu.au/*
// @version     0.1.1
// @grant       none
// ==/UserScript==

console.log('Running Moodle Course Search Header') ;

try
{
	//Here is the standard Moodle 2.7 Search form HTML from existing pages in Moodle
	var courseSearchHTML = '<div class="navbutton"> <form method="get" action="https://moodle.cqu.edu.au/course/search.php" id="coursesearchnavbar"><fieldset class="coursesearchbox invisiblefieldset"><label for="navsearchbox">Search courses: </label><input type="text" value="" name="search" size="20" id="navsearchbox"><input type="submit" value="Go"></fieldset></form></div>' ;
	
	//Stick it into the Moodle Header - Voila!!
	console.log('About to insert '+courseSearchHTML) ;
	document.querySelector("#page-header").insertAdjacentHTML("beforeend",courseSearchHTML) ;
	//Hack for CQU Moodle sites that have a banner image in the header 
	document.querySelector("img#custombanner").style.zIndex = "-1" ;
}
catch(err)
{
	console.log('Error: '+err) ;
	console.log('On line: '+err.lineNumber) ;
	console.log('Stack:'+err.stack) ;
}
