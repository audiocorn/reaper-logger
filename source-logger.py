# performs GET requests to Google Apps Script
import requests

import pytest
import time
import datetime
import json
from ast import literal_eval

# accesses the Web
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support import expected_conditions
from selenium.webdriver.support.wait import WebDriverWait
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.desired_capabilities import DesiredCapabilities

# various Selenium / ChromeDriver options
options = Options()

options.headless = True

options.add_argument("--no-sandbox")
options.add_argument("--disable-dev-shm-usage")

def unpack_code(line):
   '''unpacks a line formatted in the .js format into data that can be stored, 
   line format: Rehecpfwihamuy.addRecentReap("chaihanrui", 1721192491948, 121.412);
   returns a list of the form ['"chaihanrui"', '1721192491948','121.412']'''

   line = line.split('(')
   reap = line[1][:-2]
   data = reap.split(',')
   return data

def logify_reap(reap, previous_reap):
   '''takes reap information (unpacked by unpack_code), calculates multiplier and raw time,
   and sends the reap information to the Google Sheet via a GET request'''
   # print("logify_reap")

   # compute and format raw time
   rawtime = (int(reap[1]) - int(previous_reap[1])) / 1000
   raw_str = datetime.datetime.fromtimestamp(rawtime).strftime('%H:%M:%S.%f')

   # format time gained
   gainedtime = float(reap[2])
   gained_str = datetime.datetime.fromtimestamp(gainedtime).strftime('%H:%M:%S.%f')
   
   # format username
   user_str = literal_eval(reap[0])

   # format timestamp
   time_str = datetime.datetime.fromtimestamp(int(reap[1]) / 1000 - 3600).strftime('%b %d %Y %H:%M:%S.%f')

   # compute multiplier
   bonus_str = str(round(gainedtime / rawtime))

   # compile string to send to spreadsheet
   if bonus_str == '1':
      data = "time=" + time_str + "&user=" + user_str + "&raw=" + raw_str + "&actual=" + gained_str + "&bonus="
   else:
      data = "time=" + time_str + "&user=" + user_str + "&raw=" + raw_str + "&actual=" + gained_str + "&bonus=" + bonus_str

   # print("sending request!")
   # print(data)
   requests.get("https://script.google.com/macros/s/AKfycbxVhiQPkvCxkJFLZN7m6WQd92eXV4WGAIyw7iFRYEpoTBHyE7lBz_9plRtk3nQf_qQLIA/exec",
                params=data)

   # buffer time to avoid overloading the spreadsheet
   time.sleep(10)

# our Selenium data collector
class TestTest2():

  def setup_method(self, method):
    self.driver = webdriver.Chrome(options=options)
    self.vars = {}

  def teardown_method(self, method):
    self.driver.quit()

  def test_test2(self):

    # print("restart!")

    # loop in case of WiFi outage
    wifi = False

    # log.txt keeps the information of all previous reaps in case of outage
    filed = open("log.txt","r")
    log = []

    # retrieve previous reaps
    for line in filed:
       trimmed = line[:-1]
       trimmed = trimmed.replace("\'","'")
       print(trimmed)
       log.append(trimmed)
    
    filed.close()

    while not wifi:
        try:
            # AoPS login page -- NOTE: change 90 to current game number
            self.driver.get(
            "https://login.artofproblemsolving.com/login?application=online&redirect=https%3A%2F%2Fartofproblemsolving.com%2Fpost-signin%3FrequestedPage%3Dhttps%25253A%25252F%25252Fartofproblemsolving.com%25252Freaper%25252Freaper.php%25253Fid%25253D90%25252F"
            )

            # log in to website

            # username (replace YOUR_USERNAME)
            self.driver.find_element(By.ID, "login-id").send_keys("YOUR_USERNAME")
            # password (replace YOUR_PASSWORD)
            self.driver.find_element(By.ID, "password").send_keys("YOUR_PASSWORD")
            # sign in
            self.driver.find_element(By.ID, "password").send_keys(Keys.ENTER)

            # wait until Reaper page loads to make sure you're actually logged in before refreshing
            WebDriverWait(self.driver, 15).until(
                expected_conditions.presence_of_element_located(
                    (By.ID, "recent-reaps")))

            wifi = True
        except:
            print('wuhoh')
            # issue is, the second time around you don't go to the login page again. small bug here. 
            time.sleep(10)
            
            self.driver.quit()
            self.driver = webdriver.Chrome(options=options)
            continue
    
    # ten minute cycle
    for i in range(60):
        
        try:
            
            time_start = time.time()

            # navigate to js page (change id=90 to new game number)
            self.driver.get("https://artofproblemsolving.com/m/reaper/js/reaperjs.php?id=90")

            # print("hi1")

            lines = self.driver.page_source.split('\n')

            # retrieve recent reaps
            reaps = lines[-12:-2]
            newreaps = []

            # don't send reaps if current log is blank
            if log == []:
               # print("first time!")
               for reap in reaps:
                  reap = unpack_code(reap)
                  log.append(str(reap))
                  # print(reap)
                  # print("new one!")
            else:
               # print(log[-10:])
               for reap in reaps:
                  
                  
                  reap = unpack_code(reap)

                  # new reap
                  if str(reap) not in log:
                     
                     newreaps.append(reap)
                     # print(reap)
                     # print("new one!")

            # print(newreaps)
            # print("anything new above?")

            # send new reaps to spreadsheet
            for reap in newreaps:
               # print('lol please wrok')
               # print(literal_eval(log[log.index(str(reap)) - 1]))
               # print(log[-1])
               
               logify_reap(reap,literal_eval(log[-1]))

               # add reap to log
               log.append(str(reap))
               filed = open("log.txt","w")

               for line in log:
                  filed.write(line + '\n')

               filed.close()
               
            
            # wait 10 seconds and then reload

            time.sleep(10)
            
            # print("wahey")
            # print(time.time() - time_start)

        # wifi outage? wait 10 seconds and retry
        except:
           # print('ohno')
           time.sleep(10)
           break
    
    self.driver.close()

    # update log periodically
    filed = open("log.txt","w")

    for line in log:
        filed.write(line + '\n')

    filed.close()

# RUN CODE IN PERPETUITY (TERRIBLE PRACTICE) OR UNTIL YOUR COMPUTER GIVES UP
hi = ''
while True:
    test = TestTest2()
    test.setup_method(hi)
    test.test_test2()
    test.teardown_method(hi)
