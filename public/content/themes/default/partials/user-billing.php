<h2 class="form-signin-heading"><i class="fa fa-credit-card"></i> Billing Information</h2>

<br /><br />
<div class="well">
<p><i class="fa fa-credit-card"></i> Past Invoices</p>
	<ul class="invoices">
	<?php foreach($invoices as $invoice): ?>
		<li><span class="date"><?= $invoice->dateString() ?></span><span class="amount"><?= $invoice->dollars() ?></span>
		<div class="clear"></div>
		</li>
	<?php endforeach; ?>
	</ul>
</div>

