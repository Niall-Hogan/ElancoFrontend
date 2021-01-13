<?php

$targetPath = "/Images" . basename ($_FILES["imgPath"]["name"]);
move_uploaded_file($_FILES["imgPath"]["tmp_name"], $targetPath);