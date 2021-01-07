import inc.banner

# Config of server
config = {
    'debug': False,
    'loadCommands': [ # Add .py files from the inc/commands folder
        'Help',
        'Bell',
        'Relax',
        'Steekaan',
        'Kill',
        'Update',
        'HelpAdvanced',
    ]
}

# init Bot
from inc.classes.WolfBot import WolfBot
wolfBot = WolfBot(config);

# Run bot
wolfBot.run()
