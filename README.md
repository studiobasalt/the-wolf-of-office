# The Wolf of Office V0.6

Telegram bot made for the 51basalt office

This software is made to run on an Raspberry Pi and is tested on OSX

## Commands
/help - Show all available commands <br>
/helpAdvanced - Show all advanced commands <br>
/bell - Ring the bell for a sale! <br>
/relax - McConaughey chest beat <br>
/steekaan - Steek aan dat ding! <br>
/bier - Only when its time for beer! <br>
/flipflap - This is almost the best song in the world! <br>
/solong - Solong gayboyssss
#### Comming soon
/wieIsDeLul - Wie o wie is de lul? <br>
/lunchtime - Time for lunch! <br>

## Advanced Commands
/update - Update server to latest version and reload commands <br>
/getchat - Get all the chat info in the terminal <br>
#### Comming soon
/dumpdb - Dump the database to terminal <br>
/startupMsg - Set a message on server startup <br>

## Fast install for linux
```bash
$ bash <(curl -Ls https://raw.githubusercontent.com/studiobasalt/the-wolf-of-office/main/install.sh)
```

## How to Install
1. (Advanced) Run install.sh
   (OSX) Open the folder ./resources/easyOSX and open install.app
2. Search for the BotFather on Telegram
3. Send /newbot to create a newbot
4. Follow the instructions of the BotFather
5. After creation send /mybots
6. Open your bot
7. Open "API Token"
8. Copy this token and past it into a new file named .token
9. Place .token in the same folder as .token-template
10. (Advanced) bash run.sh
    (OSX) Open the folder ./resources/easyOSX and open run.app
11. Enjoy

## How to add a new command
1. Copy the command_template.py file in the ./inc folder to ./inc/commands
2. Rename the file to your command
3. Setup the command
4. (optional) Place your sound files in de ./sounds folder
5. Update this README file

## Comming soon
- On Boot message
- Add of a database to remember settings

## Credits
[Studio Basalt](https://studiobasalt.com "Studio Basalt") <br>
[51Designs](https://www.51designs.nl/) <br>