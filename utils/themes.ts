import themeData from '@/assets/data/themes.json';

export const lightenColor = (color: string, brightenBy: number): string => {
    // change light value in hsl by brightenBy
    const brightenColor = (match: string, capture: string) => {
        const lighterColor: string = (parseFloat(capture) + brightenBy).toString();
        return lighterColor + '%)';
    }
    return color.replace(/(\d+\.*\d*)%\)/m, brightenColor);
}

export const themeCSSVars = (themeName: keyof typeof themeData): string => {
    return `
        :root {
            --background: ${themeData[themeName].background};
            --background--800: ${lightenColor(themeData[themeName].background, 3)};
            --background--700: ${lightenColor(themeData[themeName].background, 10)};
            --background--600: ${lightenColor(themeData[themeName].background, 15)};
            --background--500: ${lightenColor(themeData[themeName].background, 20)};
            --background--400: ${lightenColor(themeData[themeName].background, 25)};
            --background--300: ${lightenColor(themeData[themeName].background, 30)};
            --background--200: ${lightenColor(themeData[themeName].background, 35)};
            --background--100: ${lightenColor(themeData[themeName].background, 40)};
            --foreground: ${themeData[themeName].foreground};
            --foreground--800: ${lightenColor(themeData[themeName].foreground, -5)};
            --foreground--700: ${lightenColor(themeData[themeName].foreground, -10)};
            --foreground--600: ${lightenColor(themeData[themeName].foreground, -15)};
            --foreground--500: ${lightenColor(themeData[themeName].foreground, -20)};
            --foreground--400: ${lightenColor(themeData[themeName].foreground, -25)};
            --foreground--300: ${lightenColor(themeData[themeName].foreground, -30)};
            --foreground--200: ${lightenColor(themeData[themeName].foreground, -35)};
            --foreground--100: ${lightenColor(themeData[themeName].foreground, -40)};
            --black: ${themeData[themeName].color[0]};
            --black-light: ${lightenColor(themeData[themeName].color[0], 5)};
            --red: ${themeData[themeName].color[1]};
            --red-light: ${lightenColor(themeData[themeName].color[1], 5)};
            --green: ${themeData[themeName].color[2]};
            --green-light: ${lightenColor(themeData[themeName].color[2], 5)};
            --yellow: ${themeData[themeName].color[3]};
            --yellow-light: ${lightenColor(themeData[themeName].color[3], 5)};
            --blue: ${themeData[themeName].color[4]};
            --blue-light: ${lightenColor(themeData[themeName].color[4], 5)};
            --magenta: ${themeData[themeName].color[5]};
            --magenta-light: ${lightenColor(themeData[themeName].color[5], 5)};
            --cyan: ${themeData[themeName].color[6]};
            --cyan-light: ${lightenColor(themeData[themeName].color[6], 5)};
            --white: ${themeData[themeName].color[7]};
            --white-light: ${lightenColor(themeData[themeName].color[7], 5)};
        }
    `
}

export const setThemeColors = (themeName: keyof typeof themeData): void => {
    let colorsScriptElement: HTMLScriptElement | null = document.querySelector(".colors");
    if (colorsScriptElement) {
        colorsScriptElement.innerHTML = themeCSSVars(themeName);
    }
}