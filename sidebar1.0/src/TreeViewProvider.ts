import { TreeItem, TreeItemCollapsibleState, TreeDataProvider, Uri, window, Event, ProviderResult } from 'vscode';
import { join } from 'path';
import * as path from 'path';
import * as vscode from 'vscode';
import { getVSCodeDownloadUrl } from 'vscode-test/out/util';

export class TreeItemNode extends TreeItem{

   
    
    constructor(
        public readonly label:string,
        public readonly collapsibleState:TreeItemCollapsibleState,
        public readonly command?: vscode.Command
        
    ){
        super(label,collapsibleState);
        
    }

    

    
    iconPath = {
       
		light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
		dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
	};

}


export class TreeViewProvider implements TreeDataProvider<TreeItemNode>{
    private _onDidChangeTreeData: vscode.EventEmitter<TreeItemNode | undefined | void> = new vscode.EventEmitter<TreeItemNode | undefined | void>();

    onDidChangeTreeData?: Event<void | TreeItemNode | null | undefined> | undefined=this._onDidChangeTreeData.event;


    save:string[];

    constructor(){
        this.save=['test']
    }

    refresh():void{
        this._onDidChangeTreeData.fire();
    }
    
    public add(input:string):void{
        this.save.push(input);
        this.refresh();
    }

    public delete(input:string):void{
        let i=this.save.indexOf(input);
        this.save.splice(i,1);
        this.refresh();
    }

    getTreeItem(element: TreeItemNode): TreeItem | Thenable<TreeItem> {
        return element;
    }

    getChildren(element?: TreeItemNode): ProviderResult<TreeItemNode[]> {
       
        return this.save.map(
            item=>new TreeItemNode(item as string,TreeItemCollapsibleState.None as TreeItemCollapsibleState)
        )
        // for(x in this.save){
        //     let tem=(i++).toString;
        //     res.push(new TreeItemNode(tem+'.'+x,TreeItemCollapsibleState.None))
        // }
    }

    
    
}