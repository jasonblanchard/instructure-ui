import colors from '../colors'
import { contrast } from '../../../util/color'

describe('modern.colors', function () {
  describe('brand', function () {
    it('should meet 3:1 contrast as a background color with `light` text', function () {
      expect(contrast(colors.brand, colors.light)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.brand, colors.lightest)).to.be.above(3)
    })
  })

  describe('success', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.success, colors.lightest)).to.be.above(3)
    })
  })

  describe('action', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.action, colors.lightest)).to.be.above(3)
    })
  })

  describe('danger', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.danger, colors.lightest)).to.be.above(3)
    })
  })

  describe('warning', function () {
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.warning, colors.lightest)).to.be.above(3)
    })
  })

  describe('darkest', function () {
    it('should meet 3:1 contrast as a background color with `light` text', function () {
      expect(contrast(colors.darkest, colors.light)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.darkest, colors.lightest)).to.be.above(3)
    })
  })

  describe('dark', function () {
    it('should meet 3:1 contrast as a background color with `light` text', function () {
      expect(contrast(colors.dark, colors.light)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.dark, colors.lightest)).to.be.above(3)
    })
  })

  describe('medium', function () {
    it('should meet 3:1 contrast as a background color with `light` text', function () {
      expect(contrast(colors.medium, colors.light)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `lightest` text', function () {
      expect(contrast(colors.medium, colors.lightest)).to.be.above(3)
    })
  })

  describe('light', function () {
    it('should meet 3:1 contrast as a background color with `darkest` text', function () {
      expect(contrast(colors.light, colors.darkest)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `dark` text', function () {
      expect(contrast(colors.light, colors.dark)).to.be.above(3)
    })
  })

  describe('lightest', function () {
    it('should meet 3:1 contrast as a background color with `darkest` text', function () {
      expect(contrast(colors.lightest, colors.darkest)).to.be.above(3)
    })
    it('should meet 3:1 contrast as a background color with `dark` text', function () {
      expect(contrast(colors.lightest, colors.dark)).to.be.above(3)
    })
  })
})