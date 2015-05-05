<?php

$postdata = file_get_contents("php://input");
$request = json_decode($postdata);

mail('strifinder@gmil.com', 'dDion contact', '
This man send contact data:
From: ' . $request['name'] . '
Email: ' . $request['email'] . '
Message: ' . $request['message'] . '
');