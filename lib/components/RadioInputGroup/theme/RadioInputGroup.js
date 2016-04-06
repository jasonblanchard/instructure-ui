export default function ({ borders, colors, typography }) {
  return {
    borderStyle: borders.borderStyleDefault,
    borderRadius: borders.borderRadiusLarge,
    labelTextColor: colors.colorText,
    labelFontWeight: typography.fontWeightBold,
    toggleBgColor: colors.colorNeutral,
    toggleHandleBgColor: colors.colorBackground,
    toggleSuccessColor: colors.colorSuccessAccent,
    toggleDangerColor: colors.colorDangerAccent
  }
}