
# Lesson 1
Summary:

1. $ is the same meaning as jQuery
2. use all the selectors and inside
$(document).ready(function(){
 otherwise those tags may not be found.
3. $(document).ready(function(){ //code}
    is the same as 
    $((function(){ //code})
    the second one is a shortcut for the first writing,
    basically same, while shorter and more common.


# Lesson 2
	## // BASIC SELECTORS
	
	$('p').css('border', '4px solid red');  //  it will select all the paragraphs, then turn the border into red color
	//you can also select the paragraph of class lead, you can use this
	$('p.lead').css('border', '4px solid red'); 
	//you can use parent child as well, because it's in body, we can change to this, it will also be selected.
	$('body p.lead').css('border', '4px solid red'); 
	//of course you can use id to select, 
	$('#lesson-1').css('border', '4px solid red'); 
	//finally we can use * to select everything in the body , and they will have a red body on them.
	$('*').css('border', '4px solid red');

	## // BASIc animations
	$('.box:first').hide(500).delay(300).show(800);// select the box, suppose we want to hide, then it's goitng to shrink up and fade out and that's hide you can also show the time that you put in here for example I put 800 milliseconds in how long it takses so now it's slower on the coming out. you can even put delay right in between them and say you know 300 and now it's going to go up stop and come back out.
	$('.box:first').slideUp(500).slideDown(300)
	$('.box:first').fadeOut(500).slideDown(300) // so these are all kind of methods athat have built-in animations now
	//let's focus on the actual animation methods and it's called animate actually inside of here you can put any see attribute
	$('.box:first').animate({height: '200px'}, 300) // for example height and let's say 200 pixels and then after this curly bracket, you upt the duration how long is that animation going to last I'm gonna hit save and this thing is going to grow 200 pixels in 300 milliseconds, and you can chain that too.
	 you have things flying around on the page and it's just so much fun.

	## //INDEX FILTERS
	$('p').css('border', '4px solid red');
	//we can filter it down with jQuery to just the first or like
	$('p:first').css('border', '4px solid red');
	$('p:last').css('border', '4px solid red');
	$('p:gt(2)').css('border', '4px solid red'); //start eigher greater that 2 or less than 2 or equal to 2
	$('p:le(2)').css('border', '4px solid red');
	$('p:eq(2)').css('border', '4px solid red');

	## //RELATIONSHIP FILTERS
	$('p').css('border', '4px solid red'); // relationship based on the relationship of the Dom element so for example let's take this h2 here and then we have one lets actually add another one.
	$('h2:has(span)').css('border', '4px solid red'); // inside of it a span and there's only one that has a child of a span
	$('.box:empty').css('border', '4px solid red'); //there's no child in it

	## //ATTRIBUTES FILTERS
	// html attributes are things that are inside of the tag like class or image source , we can filter for those things for example I have all my paragraphs selected and I can narrow that down to the ones that have a class of lead like we've already done before but it's a lot more power ful that just saying has class of lead we can do we could do things and
	$('.p[class="lead"]').css('border', '4px solid red');
	$('.p[name="shorty"]').css('border', '4px solid red');
	$('.p[name^="sho"]').css('border', '4px solid red'); //I think I named the second one shorty or some reason but what aobut if we don't know the full name but we know a short things.
	$('.p[href$=".co.uk"]').css('border', '4px solid red');//$ sign to say that this is the string matches the end
