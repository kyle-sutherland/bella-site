// Windows 95/98 style title bar color presets

export interface TitleBarColors {
  start: string;
  end: string;
}

export const TITLE_BAR_PRESETS: Record<string, TitleBarColors> = {
  blue: {
    start: '#000080',
    end: '#1084d0',
  },
  green: {
    start: '#006000',
    end: '#40c040',
  },
  purple: {
    start: '#800080',
    end: '#c040c0',
  },
  red: {
    start: '#800000',
    end: '#d04040',
  },
  teal: {
    start: '#008080',
    end: '#40c0c0',
  },
  orange: {
    start: '#804000',
    end: '#e08040',
  },
  pink: {
    start: '#800040',
    end: '#d04080',
  },
  gray: {
    start: '#404040',
    end: '#808080',
  },
};

// Default color scheme (classic Windows 95 blue)
const DEFAULT_COLORS: TitleBarColors = TITLE_BAR_PRESETS.blue;

interface Category {
  colorPreset?: string;
  titleBarColorStart?: string;
  titleBarColorEnd?: string;
}

/**
 * Get title bar gradient colors for a category
 * Priority: Custom colors > Preset > Default blue
 */
export function getTitleBarColors(category?: Category): TitleBarColors {
  if (!category) {
    return DEFAULT_COLORS;
  }

  // If both custom colors are provided, use them
  if (category.titleBarColorStart && category.titleBarColorEnd) {
    return {
      start: category.titleBarColorStart,
      end: category.titleBarColorEnd,
    };
  }

  // If a preset is specified, use it
  if (category.colorPreset && TITLE_BAR_PRESETS[category.colorPreset]) {
    return TITLE_BAR_PRESETS[category.colorPreset];
  }

  // Fall back to default
  return DEFAULT_COLORS;
}
