// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { link } from 'fs';
import * as fs from 'fs';
import * as vscode from 'vscode';
import { TreeViewProvider,TreeItemNode } from './TreeViewProvider';
import { createWebView } from './WebView';
import { encode } from 'querystring';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	



	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "new" is now active!');
	const provider=new TreeViewProvider();
	provider.add("asdfas")
	
	
	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	

	vscode.window.registerTreeDataProvider('treeView-item',provider);
	vscode.commands.registerCommand('nodeDependencies.refreshEntry', () => provider.getChildren());
	vscode.commands.registerCommand('extension.openPackageOnNpm', moduleName => vscode.commands.executeCommand('vscode.open', vscode.Uri.parse(`https://www.npmjs.com/package/${moduleName}`)));
	vscode.commands.registerCommand('nodeDependencies.addEntry', () => vscode.window.showInformationMessage(`Successfully called add entry.`));
	vscode.commands.registerCommand('nodeDependencies.editEntry', (node: TreeItemNode) => vscode.window.showInformationMessage(`Successfully called edit entry on ${node.label}.`));
	// vscode.commands.registerCommand('nodeDependencies.deleteEntry', (node: Dependency) =>node.label="dfg");
	vscode.commands.registerCommand('nodeDependencies.deleteEntry', (node: TreeItemNode) => provider.delete(node.label));
	
	context.subscriptions.push(vscode.commands.registerCommand('itemClick', (label) => {
		vscode.window.showInformationMessage(label);
		const webView = createWebView(context, vscode.ViewColumn.Active, label);
		context.subscriptions.push(webView);
	}));

	
}

// this method is called when your extension is deactivated
export function deactivate() {}
