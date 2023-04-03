import { Command } from '@oclif/core';

async function read(stream: NodeJS.ReadStream) {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) chunks.push(chunk as Uint8Array);
  return Buffer.concat(chunks).toString('utf8');
}

abstract class StdinReceivingCommand extends Command {
  static stdin: string;

  async init() {
    StdinReceivingCommand.stdin = await read(process.stdin);
  }
}

export { StdinReceivingCommand };
