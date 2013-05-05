<?php 
	foreach($events as $event): 
?>
<div class="row" id="routeEvent<?php echo $event['number'] ?>">
<!-- <div id="routeEvent<?php echo $event['number'] ?>"> -->
	<div class="large-12 columns <?php echo $event['icon'] ?> routeDetailItem ">
		<?php echo $event['detail']  ?>
	</div>
</div>
<?php endforeach;?>
