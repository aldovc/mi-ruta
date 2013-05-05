<?php 
	foreach($events as $event): 
?>
<div class="row">
<!-- <div id="routeEvent<?php echo $event['number'] ?>"> -->
	<div class="large-12 columns <?php echo $event['icon'] ?> routeDetailItem "  id="routeEvent_<?php echo $event['number'] ?>">
		<?php echo $event['detail']  ?>
	</div>
</div>
<?php endforeach;?>
