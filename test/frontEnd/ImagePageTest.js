var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

var driver = new webdriver.Builder().forBrowser('firefox').build();

driver.manage().window().maximize();

driver.manage().deleteAllCookies();

driver.get('http://localhost:3000')


driver.quit();
