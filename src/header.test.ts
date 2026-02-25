import { strict as assert } from 'assert'
import { parseShebangDirective } from './header'

describe('parseShebangDirective', () => {
  it('should return "off" for "shebang: off"', () => {
    assert.equal(parseShebangDirective('shebang: off'), 'off')
  })

  it('should return "on" for "shebang: on"', () => {
    assert.equal(parseShebangDirective('shebang: on'), 'on')
  })

  it('should be case insensitive', () => {
    assert.equal(parseShebangDirective('SHEBANG: ON'), 'on')
    assert.equal(parseShebangDirective('SHEBANG:OFF'), 'off')
    assert.equal(parseShebangDirective('Shebang: Off'), 'off')
    assert.equal(parseShebangDirective('ShEbAnG : oN'), 'on')
  })

  it('should tolerate extra spaces', () => {
    assert.equal(parseShebangDirective('  shebang : on  '), 'on')
    assert.equal(parseShebangDirective('shebang:off'), 'off')
    assert.equal(parseShebangDirective('  shebang  :  off  '), 'off')
  })

  it('should return the last occurrence when multiple exist', () => {
    assert.equal(parseShebangDirective('shebang: on\nshebang: off'), 'off')
    assert.equal(parseShebangDirective('shebang: off\nshebang: on'), 'on')
    assert.equal(parseShebangDirective('shebang: on\nsome line\nshebang: off\nanother line'), 'off')
  })

  it('should return null when no directive is present', () => {
    assert.equal(parseShebangDirective(''), null)
    assert.equal(parseShebangDirective('no directive here'), null)
    assert.equal(parseShebangDirective('shebang is great'), null)
  })

  it('should handle CRLF line endings', () => {
    assert.equal(parseShebangDirective('shebang: on\r\nshebang: off'), 'off')
    assert.equal(parseShebangDirective('line1\r\nshebang: on\r\nline3'), 'on')
  })

  it('should not match invalid values', () => {
    assert.equal(parseShebangDirective('shebang: yes'), null)
    assert.equal(parseShebangDirective('shebang: true'), null)
    assert.equal(parseShebangDirective('shebang: 1'), null)
  })
})
