(function($)
{
	// USAGE: $('.typewriter').typewriter( { 'speed': 50, 'interval': 1000 } );

	String.prototype.replaceAll = function(target, replacement) {  return this.split(target).join(replacement); };

	window.typewriter = { 'addedstyle':  false };

	$.fn.typewriter = function(_options)
	{
		var options = $.extend
		(
			{
				'speed'       : 50,
				'interval'    : 1000,
				'blinkcursor' :
				{
					'show'        : false,
					'char'        : '|',
					'starttyping' : 0,
					'awaysblink': false, // true | last
				},
				'callback': null
			},
			_options
		);

		if (!window.typewriter.addedstyle)
		{
			window.typewriter.addedstyle = true;

			var css = '.typewriter_blinker::after { content: "' + options.blinkcursor.char + '"; animation: blinker 0.3s step-start infinite; } @keyframes blinker { 50% { opacity: 0; } }';
			var head = document.head || document.getElementsByTagName('head')[0];
			var style = document.createElement('style');
			style.type = 'text/css';
			if (style.styleSheet)
			{
				// This is required for IE8 and below.
				style.styleSheet.cssText = css;
			}
			else
			{
				style.appendChild(document.createTextNode(css));
			}
			head.appendChild(style);
		}

		var i         = 0;
		var txt       = '';
		var quant     = $(this).length;
		var index     = 0;
		var $elements = $(this);

		function typeWriter($element, p_last, p_callback)
		{
			// console.log('last: ', p_last);
			var first_wait = 0;
			if (i < txt.length)
			{
				if ( (i === 0) && (options.blinkcursor.show) )
				{
					first_wait = options.blinkcursor.starttyping;
					$element.addClass('typewriter_blinker');
				}

				setTimeout
				(
					function()
					{
						var char = txt.charAt(i);
						var current = $element.html();
						current = $element.html() + char;
						if (char == '~')
						{
							char = '<br/>';
							current = $element.html() + char;
						}

						$element.html(current);
						i++;
						var speed = $element.attr('data-speed') || options.speed;

						setTimeout
						(
							function()
							{
								typeWriter($element, p_last, p_callback)
							},
							speed
						);
					},
					first_wait
				);
			}
			else
			{
				if (options.blinkcursor.show)
				{
					if (options.blinkcursor.awaysblink == false)
					{
						$element.removeClass('typewriter_blinker');
					}
					else
					if ( (p_last == false) && (options.blinkcursor.awaysblink == 'last') )
					{
						$element.removeClass('typewriter_blinker');
					}
				}

				var current = $element.html();
				if (current.substr(-1) == options.suffix)
				{
					current = current.substr(0, current.length-1);
					$element.html(current);
				}
				p_callback();
			}
		}

		function animateText()
		{
			i = 0;
			txt = $elements.eq(index).attr('data-text');
			txt = txt.replaceAll('<br/>', '~');
			txt = txt.replaceAll('<br>', '~');
			txt = txt.replaceAll(' ~ ', '~');
			txt = txt.replaceAll('~ ', '~');
			txt = txt.replaceAll(' ~', '~');
			typeWriter
			(
				$elements.eq(index),
				(index == (quant-1)),
				function()
				{
					index++;
					if (index < quant)
					{
						setTimeout
						(
							function()
							{
								animateText();
							},
							options.interval
						);
					}
					else
					{
						if (options.callback)
						{
							options.callback();
						}
					}
				}
			);
		}

		animateText();
	};
}(jQuery));