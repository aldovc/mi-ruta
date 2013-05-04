
<!DOCTYPE html>
<!--[if IE 8]>    <html class="no-js lt-ie9" lang="en"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js" lang="en"> <!--<![endif]-->
<head>
  <meta charset="utf-8" />

  <!-- Set the viewport width to device width for mobile -->
  <meta name="viewport" content="width=device-width" />

  <title>Mi Ruta GDL</title>

  <link rel="stylesheet" href="css/vendor/foundation/foundation.min.css">
  <link href='http://fonts.googleapis.com/css?family=Noto+Sans:400,700' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
<!-- Navigation -->
  <nav class="top-bar">
    <ul class="title-area">
      <!-- Title Area -->
      <li class="name">
        <h1>
          <a href="#" class="logo">
           Mi Ruta GDL 
          </a>
        </h1>
      </li>
    </ul>
  </nav>
<div class="row"> 
  <?php $this->load->view($view); ?>
</div>

  <!-- End Top Bar -->
  <footer class="row">
        <div class="large-12 columns"><hr>
            <div class="row">
              <div class="large-6 columns">
                  <p>Mi Ruta GDL - quierobits <?php echo date('Y');?></p>
              </div>
            </div>
        </div>
      </footer>
  <script src="http://maps.google.com/maps/api/js?sensor=true"></script>
  <script src="http://ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min.js"></script>
  <script src="js/app.js"></script>
  <script src="js/test.js"></script>
</body>
</html>

