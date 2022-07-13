/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { Language } from 'src/types/Language';

export default class English implements Language {
  metadata = {
    name: 'English',
    full_name: 'English (en_US)',
    description: 'English - United States',
    langCode: 'en_US',
    translator: 'Aisuruneko',
    version: '1.0.0.0'
  };

  translations = {

    // Errors
    'errors.commands.genric': 'That command does not exist or is no longer available.',

    // Commands
    'commands.test.test': 'Hello, world!',

    'commands.ping.title': 'APPNAME Status',
    'commands.ping.status': 'Status',
    'commands.ping.statusTypes': [
      'READY',
      'CONNECTING',
      'RECONNECTING',
      'IDLE',
      'NEARLY',
      'DISCONNECTED',
      'WAITING FOR GUILDS',
      'IDENTIFYING',
      'RESUMING'
    ],
    'commands.ping.ping': 'Ping',
    'commands.ping.servers': 'Servers',
    'commands.ping.latency': 'Latency'
  };
};
