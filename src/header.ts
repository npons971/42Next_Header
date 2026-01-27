
      /*#######.
     ########",#:
   #########',##".
  ##'##'## .##',##.
   ## ## ## # ##",#.
    ## ## ## ## ##'
     ## ## ## :##
      ## ## ##*/

import moment = require('moment')
import { languageDemiliters } from './delimiters'

export type HeaderInfo = {
  filename: string,
  author: string,
  createdBy: string,
  createdAt: moment.Moment,
  updatedBy: string,
  updatedAt: moment.Moment
}

/**
 * Template where each field name is prefixed by $ and is padded with _
 */
const genericTemplate = `
********************************************************************************
*                                                                              *
*                                                         :::      ::::::::    *
*    $FILENAME__________________________________        :+:      :+:    :+:    *
*                                                     +:+ +:+         +:+      *
*    By: $AUTHOR________________________________    +#+  +:+       +#+         *
*                                                 +#+#+#+#+#+   +#+            *
*    Created: $CREATEDAT_________ by $CREATEDBY_       #+#    #+#              *
*    Updated: $UPDATEDAT_________ by $UPDATEDBY_      ###   ########.fr        *
*                                                                              *
********************************************************************************

`.substring(1)

/**
 * Template spécial pour Python (compatible flake8 - max 79 caractères)
 */
const pythonTemplate = `
# ########################################################################### #
# #                                                                           #
# #                                                       :::      ::::::::   #
# #   $FILENAME_________________________________        :+:      :+:    :+:   #
# #                                                   +:+ +:+         +:+     #
# #   By: $AUTHOR_________________________________    +#+  +:+       +#+      #
# #                                               +#+#+#+#+#+   +#+           #
# #   Created: $CREATEDAT_________ by $CREATEDBY_       #+#    #+#            #
# #   Updated: $UPDATEDAT_________ by $UPDATEDBY_       ###   ########.fr     #
# #                                                                           #
# ########################################################################### #

`.substring(1)

/**
 * Get specific header template for languageId
 */
const getTemplate = (languageId: string) => {
  // Utiliser le template spécial pour Python
  if (languageId === 'python') {
    return pythonTemplate
  }
  
  const [left, right] = languageDemiliters[languageId]
  const width = left.length

  // Replace all delimiters with ones for current language
  return genericTemplate
    .replace(new RegExp(`^(.{${width}})(.*)(.{${width}})$`, 'gm'),
    left + '$2' + right)
}

/**
 * Fit value to correct field width, padded with spaces
 */
const pad = (value: string, width: number) =>
  value.concat(' '.repeat(width)).substr(0, width)

/**
 * Stringify Date to correct format for header
 */
const formatDate = (date: moment.Moment) =>
  date.format('YYYY/MM/DD HH:mm:ss')

/**
 * Get Date object from date string formatted for header
 */
const parseDate = (date: string) =>
  moment(date, 'YYYY/MM/DD HH:mm:ss')

/**
 * Check if language is supported
 */
export const supportsLanguage = (languageId: string) =>
  languageId in languageDemiliters

/**
 * Returns current header text if present at top of document
 */
export const extractHeader = (text: string): string | null => {
  // Try standard 80-char header first
  let headerRegex = `^(.{80}(\r\n|\n)){10}`
  let match = text.match(headerRegex)
  
  // If not found, try Python 79-char header
  if (!match) {
    headerRegex = `^(.{79}(\r\n|\n)){10}`
    match = text.match(headerRegex)
  }

  return match ? match[0].split('\r\n').join('\n') : null
}

/**
 * Regex to match field in template
 * Returns [ global match, offset, field ]
 */
const fieldRegex = (name: string) =>
  new RegExp(`^((?:.*\\\n)*.*)(\\\$${name}_*)`, '')

/**
 * Get value for given field name from header string
 */
const getFieldValue = (header: string, name: string) => {
  // Detect if it's a Python header (starts with #)
  const template = header.trim().startsWith('# #####') ? pythonTemplate : genericTemplate
  const [_, offset, field] = template.match(fieldRegex(name))

  return header.substr(offset.length, field.length)
}

/**
 * Set field value in header string
 */
const setFieldValue = (header: string, name: string, value: string) => {
  // Detect if it's a Python header (starts with #)
  const template = header.trim().startsWith('# #####') ? pythonTemplate : genericTemplate
  const [_, offset, field] = template.match(fieldRegex(name))

  return header.substr(0, offset.length)
    .concat(pad(value, field.length))
    .concat(header.substr(offset.length + field.length))
}

/**
 * Extract header info from header string
 */
export const getHeaderInfo = (header: string): HeaderInfo => ({
  filename: getFieldValue(header, 'FILENAME'),
  author: getFieldValue(header, 'AUTHOR'),
  createdBy: getFieldValue(header, 'CREATEDBY'),
  createdAt: parseDate(getFieldValue(header, 'CREATEDAT')),
  updatedBy: getFieldValue(header, 'UPDATEDBY'),
  updatedAt: parseDate(getFieldValue(header, 'UPDATEDAT'))
})

/**
 * Renders a language template with header info
 */
export const renderHeader = (languageId: string, info: HeaderInfo) => [
  { name: 'FILENAME', value: info.filename },
  { name: 'AUTHOR', value: info.author },
  { name: 'CREATEDAT', value: formatDate(info.createdAt) },
  { name: 'CREATEDBY', value: info.createdBy },
  { name: 'UPDATEDAT', value: formatDate(info.updatedAt) },
  { name: 'UPDATEDBY', value: info.updatedBy }
].reduce((header, field) =>
  setFieldValue(header, field.name, field.value),
  getTemplate(languageId))
