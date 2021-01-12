import inc.banner

# Config of server
config = {
    'debug': False,
    'gitResetOnUpdate': True,
}

# init Bot
from inc.classes.WolfBot import WolfBot
wolfBot = WolfBot(config);

# Run bot
wolfBot.run()
