import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vtex-fix-context-json.fixContext",
    () => {
      const textEditor = vscode.window.activeTextEditor;
      const startLine = 0;
      const endLine = textEditor?.document?.lineCount;

      console.log("endLine =>", endLine);
      if (endLine) {
        let fileText = textEditor.document.getText(
          new vscode.Range(
            0,
            0,
            endLine - 1,
            textEditor.document.lineAt(endLine - 1).text.length
          )
        );

        console.log("fileText =>", fileText);
        let contextObj = JSON.parse(fileText);

        console.log("contextObj =>", contextObj);

        Object.getOwnPropertyNames(contextObj).forEach((name) => {
          contextObj[name] = name;
        });

        console.log("contextObj After =>", contextObj);

        return textEditor.edit((editBuilder) => {
          const range = new vscode.Range(
            0,
            0,
            endLine - 1,
            textEditor.document.lineAt(endLine - 1).text.length
          );
          editBuilder.replace(range, JSON.stringify(contextObj, null, "\t"));
        });
      }
    }
  );

  context.subscriptions.push(disposable);
}

// This method is called when your extension is deactivated
export function deactivate() {}
