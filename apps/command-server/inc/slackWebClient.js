import { WebClient } from '@slack/web-api'
import env from '../../../lib/load-env.js'

const botToken = env.SLACK_BOT_TOKEN
const webClient = new WebClient(botToken);

export default webClient