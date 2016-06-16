import Map from 'es6-map';

const stylesIndex = new Map();

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean, theme:string = ""): string => {
    let appendClassName,
        stylesIndexMap;

    stylesIndexMap = stylesIndex.get(styles);

    if (stylesIndexMap) {
        const styleNameIndex = stylesIndexMap.get(styleNames);

        if (styleNameIndex) {
            return styleNameIndex;
        }
    } else {
        stylesIndexMap = stylesIndex.set(styles, new Map());
    }

    appendClassName = '';

    for (const styleName in styleNames) {
        if (styleNames.hasOwnProperty(styleName)) {
            const baseClassName = styles[styleNames[styleName]];
            const themeClassName = styles[styleNames[`${theme}_${styleName}`]];

            if (themeClassName) {
                appendClassName += ' ' + themeClassName;
            }
            else if(baseClassName) {
                appendClassName += ' ' + baseClassName;
            } else if (errorWhenNotFound === true) {
                throw new Error('"' + styleNames[styleName] + '" CSS module is undefined.');
            }
        }
    }

    appendClassName = appendClassName.trim();

    stylesIndexMap.set(styleNames, appendClassName);

    return appendClassName;
};
