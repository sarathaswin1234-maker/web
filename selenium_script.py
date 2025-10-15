from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as ec
import time
service = Service("C:/Users/sudharshan/Downloads/chromedriver-win64/chromedriver-win64/chromedriver.exe")
driver=webdriver.Chrome(service=service)

driver.get("file:///C:/Users/sudharshan/Documents/web_terminal_lab/selenium_test.html")

WebDriverWait(driver,5).until(ec.presence_of_element_located((By.ID,"username")))

driver.find_element(By.ID,"username").send_keys("sudharshan")
driver.find_element(By.ID,"password").send_keys("hello")
driver.find_element(By.ID,"email").send_keys("sudhar@gmail.com")

driver.find_element(By.ID,"registerBtn").click()

WebDriverWait(driver,5).until(ec.text_to_be_present_in_element((By.ID,"result"),"User Registered"))



time.sleep(5)
driver.quit()