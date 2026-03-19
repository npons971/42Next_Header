import { strict as assert } from 'assert'
import moment = require('moment')
import { getHeaderInfo, renderHeader } from './header'

const makeDate = (s: string) => moment(s, 'YYYY/MM/DD HH:mm:ss')

const baseInfo = {
  filename: 'test.py',
  author: 'user <user@student.42.fr>',
  createdBy: 'user',
  createdAt: makeDate('2026/01/01 10:00:00'),
  updatedBy: 'user',
  updatedAt: makeDate('2026/01/01 12:00:00')
}

describe('shebang field in Python header', () => {
  it('should render shebang: 1 in Python header', () => {
    const header = renderHeader('python', { ...baseInfo, shebang: '1' })
    assert.ok(header.includes('shebang: 1'))
  })

  it('should render shebang: 0 in Python header', () => {
    const header = renderHeader('python', { ...baseInfo, shebang: '0' })
    assert.ok(header.includes('shebang: 0'))
  })

  it('should extract shebang value from Python header', () => {
    const header1 = renderHeader('python', { ...baseInfo, shebang: '1' })
    assert.equal(getHeaderInfo(header1).shebang, '1')

    const header0 = renderHeader('python', { ...baseInfo, shebang: '0' })
    assert.equal(getHeaderInfo(header0).shebang, '0')
  })

  it('should default shebang to 1 when not specified', () => {
    const header = renderHeader('python', baseInfo)
    assert.ok(header.includes('shebang: 1'))
    assert.equal(getHeaderInfo(header).shebang, '1')
  })

  it('should not have shebang field in C header', () => {
    const header = renderHeader('c', baseInfo)
    assert.ok(!header.includes('shebang:'))
    assert.equal(getHeaderInfo(header).shebang, undefined)
  })
})
