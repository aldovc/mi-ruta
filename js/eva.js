$("document").ready(function() {
 
                $('.preguntaUno').click(function(){
 
                    $('html, body').animate({
                        scrollTop: $("#secondQuestion").offset().top
                    }, 2000);
 
                 });
 
                $('.preguntaDos').click(function(){
 
                    $('html, body').animate({
                        scrollTop: $("#thirdQuestion").offset().top
                    }, 2000);
 
                 });

				$('.preguntaTres').click(function(){

					$('html, body').animate({
						scrollTop: $("#fourthQuestion").offset().top
					}, 2000);

                });
				
				$('.preguntaCuatro').click(function(){

					$('html, body').animate({
						scrollTop: $("#fifthQuestion").offset().top
					}, 2000);

                });
				
				$('.preguntaCinco').click(function(){

					$('html, body').animate({
						scrollTop: $("#submitbtn").offset().top
					}, 2000);

                });
				
				$('#backtwo').click(function(){

					$('html, body').animate({
						scrollTop: $("#firstQuestion").offset().top
					}, 2000);

                });
				
				$('#backthree').click(function(){

					$('html, body').animate({
						scrollTop: $("#secondQuestion").offset().top
					}, 2000);

                });
				
				$('#backfour').click(function(){

					$('html, body').animate({
						scrollTop: $("#thirdQuestion").offset().top
					}, 2000);

                });
				
				$('#backfive').click(function(){

					$('html, body').animate({
						scrollTop: $("#fourthQuestion").offset().top
					}, 2000);

                });
 
});
