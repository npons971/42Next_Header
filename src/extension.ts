
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import { basename } from 'path'
import vscode = require('vscode')
import moment = require('moment')

import {
  ExtensionContext, TextEdit, TextEditorEdit, TextDocument, Position, Range
} from 'vscode'

import {
  extractHeader, getHeaderInfo, renderHeader,
  supportsLanguage, HeaderInfo, hasShebang, extractShebang
} from './header'

/**
 * Return current user from config or ENV by default
 */
const getCurrentUser = () =>
  vscode.workspace.getConfiguration()
    .get('42header.username') || process.env['USER'] || 'marvin'

/**
 * Return current user mail from config or default value
 */
const getCurrentUserMail = () =>
  vscode.workspace.getConfiguration()
    .get('42header.email') || `${getCurrentUser()}@student.42.fr`

/**
 * Update HeaderInfo with last update author and date, and update filename
 * Returns a fresh new HeaderInfo if none was passed
 */
const newHeaderInfo = (document: TextDocument, headerInfo?: HeaderInfo) => {
  const user = getCurrentUser()
  const mail = getCurrentUserMail()

  return Object.assign({},
    // This will be overwritten if headerInfo is not null
    {
      createdAt: moment(),
      createdBy: user
    },
    headerInfo,
    {
      filename: basename(document.fileName),
      author: `${user} <${mail}>`,
      updatedBy: user,
      updatedAt: moment()
    }
  )
}

/**
 * `insertHeader` Command Handler
 */
const insertHeaderHandler = () => {
  const { activeTextEditor } = vscode.window
  const { document } = activeTextEditor

  if (supportsLanguage(document.languageId))
    activeTextEditor.edit(editor => {
      const documentText = document.getText()
      const currentHeader = extractHeader(documentText)
      const currentShebang = extractShebang(documentText)
      const isPython = document.languageId === 'python'
      
      // Prepare shebang for Python files if not present
      const shebang = isPython && !currentShebang ? '#!/usr/bin/env python3\n\n' : (currentShebang || '')
      const header = renderHeader(
        document.languageId,
        newHeaderInfo(document, currentHeader ? getHeaderInfo(currentHeader) : undefined)
      )

      if (currentHeader) {
        // Calculate the number of lines to replace (shebang + blank line + header)
        const shebangLines = currentShebang ? (currentShebang.match(/\n/g) || []).length : 0
        const blankLineAfterShebang = currentShebang && documentText.substring(currentShebang.length, currentShebang.length + 1) === '\n' ? 1 : 0
        const totalLines = shebangLines + blankLineAfterShebang + 12
        
        editor.replace(
          new Range(0, 0, totalLines, 0),
          shebang + header
        )
      }
      else
        editor.insert(
          new Position(0, 0),
          shebang + header
        )
    })
  else
    vscode.window.showInformationMessage(
      `No header support for language ${document.languageId}`
    )
}

/**
 * Start watcher for document save to update current header
 */
const startUpdateOnSaveWatcher = (subscriptions: vscode.Disposable[]) =>
  vscode.workspace.onWillSaveTextDocument(event => {
    const document = event.document
    const documentText = document.getText()
    const currentHeader = extractHeader(documentText)
    const currentShebang = extractShebang(documentText)
    const isPython = document.languageId === 'python'

    event.waitUntil(
      Promise.resolve(
        supportsLanguage(document.languageId) && currentHeader ?
          [
            TextEdit.replace(
              new Range(0, 0, 
                (currentShebang ? (currentShebang.match(/\n/g) || []).length : 0) +
                (currentShebang && documentText.substring(currentShebang.length, currentShebang.length + 1) === '\n' ? 1 : 0) +
                12, 0),
              (currentShebang || (isPython ? '#!/usr/bin/env python3\n\n' : '')) +
              renderHeader(
                document.languageId,
                newHeaderInfo(document, getHeaderInfo(currentHeader))
              )
            )
          ]
          : [] // No TextEdit to apply
      )
    )
  },
    null, subscriptions
  )


export const activate = (context: vscode.ExtensionContext) => {
  const disposable = vscode.commands
    .registerTextEditorCommand('42header.insertHeader', insertHeaderHandler)

  context.subscriptions.push(disposable)
  startUpdateOnSaveWatcher(context.subscriptions)
}
