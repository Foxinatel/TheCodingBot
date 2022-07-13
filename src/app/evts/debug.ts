/*
    TheCodingBot v6
    https://tcb.nekos.tech
*/

import { Event } from 'src/types/Event';
import { App } from '../cfg/app';

export default class Debug implements Event<'debug'> {
  name = 'debug';
  description = 'Runs when the Gateway does something.';
  author = 'Aisuruneko';

  execute = async (app: App, data: string) => {
    if (/(Sending a heartbeat|Latency of)/i.test(data)) return;

    if (app.debugMode) {
      if (app.logger) {
        app.logger.debug('DISCORD', data);
      } else {
        console.log(data);
      }
    };
  };
};
