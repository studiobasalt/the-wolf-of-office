print("####################################")
print("#")
print("# The Wolf of Office")
print("# Made by Matthijs")
print("#")
print("####################################")

# init Bot
from inc.classes.WolfBot import WolfBot
wolfBot = WolfBot();

# Import bell command
from inc.commands.Bell import Bell
wolfBot.importCommand(Bell)
# Import relax command
from inc.commands.Relax import Relax
wolfBot.importCommand(Relax)
# Import relax command
from inc.commands.Steekaan import Steekaan
wolfBot.importCommand(Steekaan)

# Run bot
wolfBot.run()
