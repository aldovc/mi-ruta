<?php 
	foreach($events as $event): 
?>
<div class="row" id="routeEvent<?php echo $event['number'] ?>">
	<div class="icon">
		<img src="<?php echo $event['icon'] ?>">
	</div>
	<div claas="routeDetailItem">
		<?php echo $event['detail']  ?>
	</div>
</div>
<?php endforeach;?>
