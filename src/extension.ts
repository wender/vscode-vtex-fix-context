import * as vscode from "vscode";
export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "vtex-fix-context-json.fixContext",
    () => {
      const textEditor = vscode.window.activeTextEditor;
      const startLine = 0;
      const endLine = textEditor?.document?.lineCount;

      let lines: string[] = [];
      if (endLine) {
        for (let i = startLine; i <= endLine - 1; i++) {
          lines.push(String(textEditor?.document?.lineAt(i).text));
        }

        lines = lines.map((current, i) => {
          return current;
        });

        let fileText = textEditor.document.getText(
          new vscode.Range(
            0,
            0,
            endLine - 1,
            textEditor.document.lineAt(endLine - 1).text.length - 1
          )
        );

        let contextObj = JSON.parse(fileText);

        Object.getOwnPropertyNames(contextObj).forEach((name) => {
          contextObj[name] = name;
        });

        return textEditor.edit((editBuilder) => {
          const range = new vscode.Range(
            0,
            0,
            endLine - 1,
            textEditor.document.lineAt(endLine - 1).text.length - 1
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
