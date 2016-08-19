// ==UserScript==
// @name        Moodle Course Searcher
// @namespace   https://damos.world
// @description Search for any course site on any page from textbook in Moodle header
// @include     https://moodle.cqu.edu.au/*
// @include     https://moodle-vet.cqu.edu.au/*
// @include     https://moodle-archive-2014.cqu.edu.au/*
// @version     0.1.4
// @grant       none
// ==/UserScript==

console.log('Running Moodle Course Search Header') ;

try
{
	//Here is the standard Moodle 2.7 Search form HTML from existing pages in Moodle
	var courseSearchHTML = '<div class="navbutton"> <form method="get" action="/course/search.php" id="headercoursesearchnavbar"><fieldset class="coursesearchbox invisiblefieldset"><label for="navsearchbox">Search courses: </label><input type="text" value="" name="search" size="20" id="navsearchbox"><input type="submit" value="Go"></fieldset></form></div>' ;
	
	//Stick it into the Moodle Header - Voila!!
	console.log('About to insert '+courseSearchHTML) ;
	document.querySelector("#page-header").insertAdjacentHTML("beforeend",courseSearchHTML) ;

	//////////////////////////////////////////////////////////////////////////
	//Code reused from
	//https://github.com/damoclark/mav-enterprise/blob/master/gmwww/balmi.user.js
	//Find the breadcrumbs div
	var breadcrumbs = document.getElementsByClassName('breadcrumb')[0] ;
	var home = breadcrumbs.getElementsByTagName('a')[0] ;
	var a = document.createElement('a') ;
	a.href = home.href ;
	//If there is only a 'my home' at the base of the breadcrumb, remove
	//the my bit from the url
	a.pathname = a.pathname.replace(/(?:my\/?)?$/,"") + 'course/search.php' ;
	
	//////////////////////////////////////////////////////////////////////////
	document.querySelector("form#headercoursesearchnavbar").setAttribute('action',a) ;
	
	//Hack for CQU Moodle sites that have a banner image in the header 
	var banner = document.querySelector("img#custombanner") ;
	if(banner)
		banner.style.zIndex = "-1" ;
}
catch(err)
{
	console.log('Error: '+err) ;
	console.log('On line: '+err.lineNumber) ;
	console.log('Stack:'+err.stack) ;
}
