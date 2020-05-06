module.exports = {
  "src_folders" : ["nw_tests"],

  "webdriver" : {
    "start_process": true,
    "server_path": "node_modules/chromedriver/lib/chromedriver/chromedriver.exe",
    "port": 9515
  },

  "test_settings" : {
    "default" : {
      "desiredCapabilities": {
        "browserName": "chrome",
        "chromeOptions": {
          "args": [
            "--headless",
            "--no-sandbox",
            "--disable-gpu"
          ]
        }
      }
    }
  }
}
