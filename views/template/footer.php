<footer class="py-lg-5 py-3">
    <div class="container-fluid px-lg-5 px-3">
        <div class="row footer-top-w3layouts">
            <div class="col-lg-3 footer-grid-w3ls">
                <div class="footer-title">
                    <h3>Sobre Nosotros</h3>
                </div>
                <div class="footer-text">
                    <p>Somos una empresa privada y contamos diferentes sucursales de tiendas y servicos, donde puese asomarse a conocer todos los productos disponibles que tenemos, contamos con muchas oferta específicas para cada cliente, somos una empresa que se enfatiza en que el cliente tiene la posibilidad de adquirir su diseño, tiene como objetivo la distribución, innovación y comercialización de prendas en general y brindar prendas de mejor calidad y diseños únicos y cómodos.</p>
                    <ul class="footer-social text-left mt-lg-4 mt-3">

                        <li class="mx-2">
                            <a href="#">
                                <span class="fab fa-facebook-f"></span>
                            </a>
                        </li>
                        <li class="mx-2">
                            <a href="#">
                                <span class="fab fa-twitter"></span>
                            </a>
                        </li>
                        <li class="mx-2">
                            <a href="#">
                                <span class="fab fa-google-plus-g"></span>
                            </a>
                        </li>
                        <li class="mx-2">
                            <a href="#">
                                <span class="fab fa-linkedin-in"></span>
                            </a>
                        </li>
                        <li class="mx-2">
                            <a href="#">
                                <span class="fas fa-rss"></span>
                            </a>
                        </li>
                        <li class="mx-2">
                            <a href="#">
                                <span class="fab fa-vk"></span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-lg-3 footer-grid-w3ls">
                <div class="footer-title">
                    <h3>Ponte en contacto con nosotros</h3>
                </div>
                <div class="contact-info">
                    <h4>Localizacion :</h4>
                    <p>Daniel Sanches Bustamante #286</p>
                    <div class="phone">
                        <h4>Contacto :</h4>
                        <p>Phone : +591 729943000</p>
                        <p>Email :
                            <a href="innovi21@gmail.com">innovi21@gmail.com</a>
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 footer-grid-w3ls">
                <div class="footer-title">
                    <h3>Enlaces rápidos</h3>
                </div>
                <ul class="links">
                    <li>
                        <a href="index.html">Inicio</a>
                    </li>
                    <li>
                        <a href="about.html">Sobre Nosotros</a>
                    </li>
                    <li>
                        <a href="404.html">Error</a>
                    </li>
                    <li>
                        <a href="shop.html">Shop</a>
                    </li>
                    <li>
                        <a href="contact.html">Contact Us</a>
                    </li>
                </ul>
            </div>
            <div class="col-lg-3 footer-grid-w3ls">
                <div class="footer-title">
                    <h3>Suscríbete a tus ofertas</h3>
                </div>
                <div class="footer-text">
                    <p>Al suscribirse a nuestra lista de correo, siempre recibirá las últimas noticias y actualizaciones de nosotros.</p>
                    <form action="#" method="post">
                        <input class="form-control" type="email" name="Email" placeholder="Ingrese su email..." required="">
                        <button class="btn1">
                            <i class="far fa-envelope" aria-hidden="true"></i>
                        </button>
                        <div class="clearfix"> </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="copyright-w3layouts mt-4">
            <p class="copy-right text-center ">&copy; 2021 Trabajo practico | Olivia Herrera Tapia
                <a href="https://www.usfx.bo/"> USFX </a>
            </p>
        </div>
    </div>
</footer>

	<!-- //footer -->
    <script type="text/javascript">
        const base_url = "<?= BASE_URL; ?>";
    </script>
	<!--jQuery-->
	<script src="<?= BASE_URL; ?>public/js/jquery-2.2.3.min.js"></script>
	<!--search jQuery-->
	<script src="<?= BASE_URL; ?>public/js/modernizr-2.6.2.min.js"></script>
	<script src="<?= BASE_URL; ?>public/js/classie-search.js"></script>
	<!--//search jQuery-->
	<!-- cart-js -->
	<!---<script src="<?= BASE_URL; ?>public/js/minicart.js"></script>-->
	
	<!-- Count-down -->
	<!--<script src="<?= BASE_URL; ?>public/js/simplyCountdown.js"></script>
	<link href="<?= BASE_URL; ?>public/css/simplyCountdown.css" rel='stylesheet' type='text/css' />
	<script>
		var d = new Date();
		simplyCountdown('simply-countdown-custom', {
			year: d.getFullYear(),
			month: d.getMonth() + 2,
			day: 25
		});
	</script>-->
	<!--// Count-down -->
	<script src="<?= BASE_URL; ?>public/js/owl.carousel.js"></script>
	<script>
		$(document).ready(function () {
			$('.owl-carousel').owlCarousel({
				loop: true,
				margin: 10,
				responsiveClass: true,
				responsive: {
					0: {
						items: 1,
						nav: true
					},
					600: {
						items: 2,
						nav: false
					},
					900: {
						items: 3,
						nav: false
					},
					1000: {
						items: 4,
						nav: true,
						loop: false,
						margin: 20
					}
				}
			})
		})
	</script>

	<!-- //end-smooth-scrolling -->
	<!-- dropdown nav -->
	<script>
		$(document).ready(function () {
			$(".dropdown").hover(
				function () {
					$('.dropdown-menu', this).stop(true, true).slideDown("fast");
					$(this).toggleClass('open');
				},
				function () {
					$('.dropdown-menu', this).stop(true, true).slideUp("fast");
					$(this).toggleClass('open');
				}
			);
		});
	</script>
	<!-- //dropdown nav -->
    <script src="<?= BASE_URL; ?>public/js/move-top.js"></script>
    <script src="<?= BASE_URL; ?>public/js/easing.js"></script>
    <script>
        jQuery(document).ready(function($) {
            $(".scroll").click(function(event) {
                event.preventDefault();
                $('html,body').animate({
                    scrollTop: $(this.hash).offset().top
                }, 900);
            });
        });
    </script>
    <script>
        $(document).ready(function() {
            /*
            						var defaults = {
            							  containerID: 'toTop', // fading element id
            							containerHoverID: 'toTopHover', // fading element hover id
            							scrollSpeed: 1200,
            							easingType: 'linear' 
            						 };
            						*/

            $().UItoTop({
                easingType: 'easeOutQuart'
            });

        });
    </script>
    
	<script src="<?= BASE_URL; ?>public/js/easy-responsive-tabs.js"></script>
    
    <script src="<?= BASE_URL; ?>public/js/sweetalert2.js"></script>
	<script src="<?= BASE_URL; ?>public/js/bootstrap.js"></script>
	<script src="<?= BASE_URL; ?>public/index.js"></script>
    <script src="<?= BASE_URL; ?>public<?= $this->data['js']?>"></script>
	<!-- js file -->