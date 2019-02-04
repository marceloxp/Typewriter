function animateWords()
{
	$('.typewriter').typewriter
	(
		{
			'speed'       : 80,
			'interval'    : 250,
			'blinkcursor' :
			{
				'char'        : '|',
				'show'        : true,
				'starttyping' : 1000,
				'awaysblink'  : true,
			},
			'callback': function(){ console.log('CALLBACK'); }
		}
	);
}

$(document).ready(function() {
	animateWords();
});