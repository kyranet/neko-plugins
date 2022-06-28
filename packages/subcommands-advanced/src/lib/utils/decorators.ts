import { createClassDecorator, createProxy } from '@sapphire/decorators';
import type { Command, container, Piece } from '@sapphire/framework';

import type { SlashCommandSubcommandBuilder } from '@discordjs/builders';

import { analizeSubcommandGroupParsed, analizeSubCommandParsed } from './functions';

export const RegisterSubCommand = (
	parentCommandName: string,
	slashSubcommand:
		| SlashCommandSubcommandBuilder
		| ((subcommandGroup: SlashCommandSubcommandBuilder, Container: typeof container) => SlashCommandSubcommandBuilder)
) => {
	return createClassDecorator((target: typeof Piece) =>
		createProxy(target, {
			construct: (ctor, [context, baseOptions]: [Piece.Context, Piece.Options]) => {
				const ctr = new ctor(context, baseOptions) as unknown as Command;
				return analizeSubCommandParsed(ctr, parentCommandName, slashSubcommand);
			}
		})
	);
};

export const RegisterSubCommandGroup = (
	parentCommandName: string,
	groupName: string,
	slashSubcommand:
		| SlashCommandSubcommandBuilder
		| ((subcommandGroup: SlashCommandSubcommandBuilder, Container: typeof container) => SlashCommandSubcommandBuilder)
) => {
	return createClassDecorator((target: typeof Piece) =>
		createProxy(target, {
			construct: (ctor, [context, baseOptions]: [Piece.Context, Piece.Options]) => {
				const ctr = new ctor(context, baseOptions) as unknown as Command;
				return analizeSubcommandGroupParsed(ctr, parentCommandName, groupName, slashSubcommand);
			}
		})
	);
};