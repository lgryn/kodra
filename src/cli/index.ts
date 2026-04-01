#!/usr/bin/env node
import 'dotenv/config';
import { Command } from 'commander';
import { registerExplainCommand } from '@cli/commands/explain.command';

const program = new Command();

program.name('kodra').description('AI dev CLI tool').version('0.1.0');

registerExplainCommand(program);

program.parse();
