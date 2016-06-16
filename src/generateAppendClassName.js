import Map from 'es6-map';

const stylesIndex = [];

export default (styles, styleNames: Array<string>, errorWhenNotFound: boolean, theme:string = ""): string => {
    let appendClassName,
        stylesIndexMap;
    if(!stylesIndex[theme]){
        stylesIndex[theme] = new Map();
    }

    stylesIndexMap = stylesIndex[theme].get(styles);

    if (stylesIndexMap) {
        const styleNameIndex = stylesIndexMap.get(styleNames);

        if (styleNameIndex) {
            return styleNameIndex;
        }
    } else {
        stylesIndexMap = stylesIndex[theme].set(styles, new Map());
    }

    appendClassName = '';

    for (const styleName in styleNames) {
        if (styleNames.hasOwnProperty(styleName)) {
            const baseClassName = styles[styleNames[styleName]];
            const themeClassName = styles[`${theme}_${styleNames[styleName]}`];

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
