export interface Language {
  metadata: {
    name: string,
    full_name: string,
    description: string,
    langCode: string,
    translator: string,
    version: string
  };

  translations: {

    // Errors
    'errors.commands.genric': string,

    // Commands
    'commands.test.test': string,

    'commands.ping.title': string,
    'commands.ping.status': string,
    'commands.ping.statusTypes': string[],
    'commands.ping.ping': string,
    'commands.ping.servers': string,
    'commands.ping.latency': string
  };
};
