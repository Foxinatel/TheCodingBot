import { ClientEvents } from 'discord.js';
import { App } from './App';

export interface Event<event extends keyof ClientEvents = unknown> {
  name: string,
  description: string,
  author: string,
  execute: (app: App, ...args: ClientEvents[event]) => Promise<void>
}
