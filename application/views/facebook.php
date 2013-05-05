<div class="row">
<div class="large-12 columns">
<?php if(isset($this->session->userdata['id'])): ?>
<h4>Hola <?php echo $this->session->userdata['first_name']; ?></h4>
<?php else: ?>
<h3><a href="<?php echo $this->session->userdata['url']?>">Con&eacute;ctate usando Facebook</a></h3>
<?php endif;?>
</div>
</div>
