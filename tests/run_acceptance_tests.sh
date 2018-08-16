#!/bin/sh

./_support/Drivers/chromedriver --url-base=/wd/hub &
java -jar ./_support/Drivers/selenium-server-standalone-3.14.0.jar &
#../vendor/bin/codecept run acceptance