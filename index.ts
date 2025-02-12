/*
  TheCodingBot v6
  https://tcb.nekos.tech
*/

import { Shard, ShardingManager } from 'discord.js';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Version 6 of TheCodingBot
// Can you believe we've come this far?

const log = (msg: string) => { console.log(`[${new Date().getTime()}] ${msg}`); };

async function bot (debug: boolean) {
  try {
    // -- Requirements to even start.

    // if (debug) log('Discord package found.');

    dotenv.config();
    if (debug) log('Environment Variables loaded.');

    if (debug) log('Creating Shard Manager...');
    const manager = new ShardingManager(path.join(__dirname, '/src/bot.js'), {
      mode: 'process',
      execArgv: ['--trace-warnings'], // Find those warnings!
      shardArgs: [debug.toString()],
      totalShards: 'auto', // Automatically determine
      token: process.env.DISCORD_BOT_TOKEN // Bot token
      // delay: 4200 // Give a delay, kinda like a big network starting up their servers lol.
    });

    manager.on('shardCreate', async (shard: Shard) => {
      log(`Shard [${shard.id}]: Created!`);

      shard.on('reconnecting', () => {
        log(`Shard [${shard.id}]: Reconnecting...`);
      });
      shard.on('spawn', () => {
        log(`Shard [${shard.id}]: Spawned!`);
      });
      shard.on('ready', () => {
        log(`Shard [${shard.id}]: Ready!`);
      });
      shard.on('death', () => {
        log(`Shard [${shard.id}]: I am dead!`);
      });
      shard.on('error', (err) => {
        log(`Shard [${shard.id}]: Error!\n\t${err} `);
        shard.respawn();
      });
    });

    log('Spawning shards...');
    manager.spawn();
  } catch (Ex: unknown) {
    if (Ex instanceof Error) {
      if (Ex.message.includes('Cannot find module')) {
        if (Ex.message.includes('discord.js')) console.error("Could not load discord.js package. It's probably not installed.");
        else console.error("Could not load required item. It's probably missing, or invaild.");
      };
    }

    console.log(Ex);
    process.exit(-1);
  };
};

// ARGUMENTS ACCEPTED:
//  - true/false | SETS THE BOT TO DEBUG ON/OFF

// WARNING: Debug is really spammy. It's the equivalent
// of asking "GOOD LORD, WHAT IS HAPPENING IN THERE?"
const cmdArgs = process.argv.slice(2); // Get args
bot(cmdArgs[0] === 'true'); // Just tell the bot to either start with debug or nah :D
