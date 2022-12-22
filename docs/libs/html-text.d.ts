import type { IDestroyOptions } from '@pixi/display';
import type { IRenderer } from '@pixi/core';
import { ISize } from '@pixi/core';
import type { ITextStyle } from '@pixi/text';
import { Rectangle } from '@pixi/core';
import type { Renderer } from '@pixi/core';
import { Sprite } from '@pixi/sprite';
import { TextStyle } from '@pixi/text';
import { TextStyleFontStyle } from '@pixi/text';
import { TextStyleFontWeight } from '@pixi/text';
import { TextStyleLineJoin } from '@pixi/text';
import type { TextStyleTextBaseline } from '@pixi/text';

/**
 * Text display object that support multi-style HTML text.
 * @class
 * @extends PIXI.Sprite
 * @see {@link https://pixijs.download/dev/docs/PIXI.Sprite.html PIXI.Sprite}
 * @see {@link https://pixijs.download/dev/docs/PIXI.TextStyle.html PIXI.TextStyle}
 */
export declare class HTMLText extends Sprite {
    /**
     * Default opens when destroying.
     * @type {PIXI.IDestroyOptions}
     * @property {boolean} texture=true - Whether to destroy the texture.
     * @property {boolean} children=false - Whether to destroy the children.
     * @property {boolean} baseTexture=true - Whether to destroy the base texture.
     */
    static defaultDestroyOptions: IDestroyOptions;
    /** Default maxWidth, set at construction */
    static defaultMaxWidth: number;
    /** Default maxHeight, set at construction */
    static defaultMaxHeight: number;
    /** Default resolution, make sure autoResolution or defaultAutoResolution is `false`. */
    static defaultResolution: number | undefined;
    /** Default autoResolution for all HTMLText objects */
    static defaultAutoResolution: boolean;
    /** The maximum width in rendered pixels that the content can be, any larger will be hidden */
    maxWidth: number;
    /** The maximum height in rendered pixels that the content can be, any larger will be hidden */
    maxHeight: number;
    private _domElement;
    private _styleElement;
    private _svgRoot;
    private _foreignObject;
    private _image;
    private _resolution;
    private _text;
    private _style;
    private _autoResolution;
    private _loading;
    private _shadow;
    private _shadowRoot;
    private localStyleID;
    private dirty;
    /** The HTMLTextStyle object is owned by this instance */
    private ownsStyle;
    /**
     * @param {string} [text] - Text contents
     * @param {HTMLTextStyle|PIXI.TextStyle|PIXI.ITextStyle} [style] - Style setting to use.
     *        Strongly recommend using an HTMLTextStyle object. Providing a PIXI.TextStyle
     *        will convert the TextStyle to an HTMLTextStyle and will no longer be linked.
     */
    constructor(text?: string, style?: HTMLTextStyle | TextStyle | Partial<ITextStyle>);
    /**
     * Calculate the size of the output text without actually drawing it.
     * This includes the `padding` in the `style` object.
     * This can be used as a fast-pass to do things like text-fitting.
     * @param {object} [overrides] - Overrides for the text, style, and resolution.
     * @param {string} [overrides.text] - The text to measure, if not specified, the current text is used.
     * @param {HTMLTextStyle} [overrides.style] - The style to measure, if not specified, the current style is used.
     * @param {number} [overrides.resolution] - The resolution to measure, if not specified, the current resolution is used.
     * @return {PIXI.ISize} Width and height of the measured text.
     */
    measureText(overrides?: {
        text?: string;
        style?: HTMLTextStyle;
        resolution?: number;
    }): ISize;
    /**
     * Manually refresh the text.
     * @public
     * @param {boolean} respectDirty - Whether to abort updating the
     *        text if the Text isn't dirty and the function is called.
     */
    updateText(respectDirty?: boolean): Promise<void>;
    /** The raw image element that is rendered under-the-hood. */
    get source(): HTMLImageElement;
    /**
     * @deprecated since 3.2.0
     * @see HTMLText#image
     */
    get canvas(): HTMLImageElement;
    /**
     * Update the texture resource.
     * @private
     */
    updateTexture(): void;
    /**
     * Renders the object using the WebGL renderer
     *
     * @param {PIXI.Renderer} renderer - The renderer
     * @private
     */
    _render(renderer: Renderer): void;
    /**
     * Renders the object using the Canvas Renderer.
     *
     * @private
     * @param {PIXI.CanvasRenderer} renderer - The renderer
     */
    _renderCanvas(renderer: IRenderer): void;
    /**
     * Get the local bounds.
     *
     * @param {PIXI.Rectangle} rect - Input rectangle.
     * @return {PIXI.Rectangle} Local bounds
     */
    getLocalBounds(rect: Rectangle): Rectangle;
    _calculateBounds(): void;
    /**
     * Handle dirty style changes
     * @private
     */
    _onStyleChange(): void;
    /**
     * Destroy this Text object. Don't use after calling.
     * @param {boolean|object} options - Same as Sprite destroy options.
     */
    destroy(options?: boolean | IDestroyOptions | undefined): void;
    /**
     * Get the width in pixels.
     * @member {number}
     */
    get width(): number;
    set width(value: number);
    /**
     * Get the height in pixels.
     * @member {number}
     */
    get height(): number;
    set height(value: number);
    /** The base style to render with text. */
    get style(): HTMLTextStyle;
    set style(style: HTMLTextStyle | TextStyle | Partial<ITextStyle>);
    /**
     * Contents of text. This can be HTML text and include tags.
     * @example
     * const text = new HTMLText('This is a <em>styled</em> text!');
     * @member {string}
     */
    get text(): string | null;
    set text(text: string | null);
    /**
     * The resolution / device pixel ratio of the canvas.
     * This is set to automatically match the renderer resolution by default, but can be overridden by setting manually.
     * @member {number}
     * @default 1
     */
    get resolution(): number;
    set resolution(value: number);
    /**
     * Sanitise text - replace `<br>` with `<br/>`, `&nbsp;` with `&#160;`
     * @see https://www.sitepoint.com/community/t/xhtml-1-0-transitional-xml-parsing-error-entity-nbsp-not-defined/3392/3
     */
    private sanitiseText;
}

/**
 * Used internally to restrict text style usage and convert easily to CSS.
 * @class
 * @extends PIXI.TextStyle
 * @see {@link https://pixijs.download/dev/docs/PIXI.TextStyle.html PIXI.TextStyle}
 * @param {PIXI.ITextStyle|IHTMLTextStyle} [style] - Style to copy.
 */
export declare class HTMLTextStyle extends TextStyle {
    /** The collection of installed fonts */
    static availableFonts: Record<string, IHTMLFont>;
    /**
     * List of default options, these are largely the same as TextStyle,
     * with the exception of whiteSpace, which is set to 'normal' by default.
     */
    static readonly defaultOptions: IHTMLTextStyle;
    /** For using custom fonts */
    private _fonts;
    /** List of internal style rules */
    private _overrides;
    /** Global rules or stylesheet, useful for creating rules for rendering */
    private _stylesheet;
    /** Track font changes internally */
    private fontsDirty;
    /**
     * Convert a TextStyle to HTMLTextStyle
     * @example
     * import {TextStyle } from 'pixi.js';
     * import {HTMLTextStyle} from '@pixi/text-html';
     * const style = new TextStyle();
     * const htmlStyle = HTMLTextStyle.from(style);
     */
    static from(originalStyle: TextStyle | Partial<IHTMLTextStyle>): HTMLTextStyle;
    /** Clear the current font */
    cleanFonts(): void;
    /** Because of how HTMLText renders, fonts need to be imported */
    loadFont(url: string, options?: Partial<Pick<IHTMLFont, 'weight' | 'style' | 'family'>>): Promise<void>;
    /**
     * Add a style override, this can be any CSS property
     * it will override any built-in style. This is the
     * property and the value as a string (e.g., `color: red`).
     * This will override any other internal style.
     * @param {string} value - CSS style(s) to add.
     * @example
     * style.addOverride('background-color: red');
     */
    addOverride(...value: string[]): void;
    /**
     * Remove any overrides that match the value.
     * @param {string} value - CSS style to remove.
     * @example
     * style.removeOverride('background-color: red');
     */
    removeOverride(...value: string[]): void;
    /**
     * Internally converts all of the style properties into CSS equivalents.
     * @return The CSS style string, for setting `style` property of root HTMLElement.
     */
    toCSS(scale: number): string;
    /** Get the font CSS styles from the loaded font, If available. */
    toGlobalCSS(): string;
    /** Internal stylesheet contents, useful for creating rules for rendering */
    get stylesheet(): string;
    set stylesheet(value: string);
    /** Convert numerical colors into hex-strings */
    private normalizeColor;
    /** Convert the internal drop-shadow settings to CSS text-shadow */
    private dropShadowToCSS;
    /** Resets all properties to the defaults specified in TextStyle.prototype._default */
    reset(): void;
    /**
     * Called after the image is loaded but before drawing to the canvas.
     * Mostly used to handle Safari's font loading bug.
     * @ignore
     */
    onBeforeDraw(): Promise<void>;
    /**
     * Proving that Safari is the new IE
     * @ignore
     */
    private get isSafari();
    /** @ignore fillGradientStops is not supported by HTMLText */
    set fillGradientStops(_value: number[]);
    get fillGradientStops(): number[];
    /** @ignore fillGradientType is not supported by HTMLText */
    set fillGradientType(_value: number);
    get fillGradientType(): number;
    /** @ignore miterLimit is not supported by HTMLText */
    set miterLimit(_value: number);
    get miterLimit(): number;
    /** @ignore trim is not supported by HTMLText */
    set trim(_value: boolean);
    get trim(): boolean;
    /** @ignore textBaseline is not supported by HTMLText */
    set textBaseline(_value: TextStyleTextBaseline);
    get textBaseline(): TextStyleTextBaseline;
    /** @ignore leading is not supported by HTMLText */
    set leading(_value: number);
    get leading(): number;
    /** @ignore lineJoin is not supported by HTMLText */
    set lineJoin(_value: TextStyleLineJoin);
    get lineJoin(): TextStyleLineJoin;
}

export declare type HTMLTextStyleWhiteSpace = 'normal' | 'pre' | 'pre-line' | 'nowrap' | 'pre-wrap';

/**
 * Font information for HTMLText
 */
declare interface IHTMLFont {
    /** User-supplied URL request */
    originalUrl: string;
    /** Base64 string for font */
    dataSrc: string;
    /** FontFace installed in the document */
    fontFace: FontFace | null;
    /** Blob-based URL for font */
    src: string;
    /** Family name of font */
    family: string;
    /** Weight of the font */
    weight: TextStyleFontWeight;
    /** Style of the font */
    style: TextStyleFontStyle;
    /** Reference counter */
    refs: number;
}

/**
 * Modifed versions from ITextStyle.
 * @extends ITextStyle
 */
export declare interface IHTMLTextStyle extends Omit<ITextStyle, ITextStyleIgnore> {
    /**
     * White-space with expanded options
     * @type {'normal'|'pre'|'pre-line'|'nowrap'|'pre-wrap'}
     */
    whiteSpace: HTMLTextStyleWhiteSpace;
}

declare type ITextStyleIgnore = 'whiteSpace' | 'fillGradientStops' | 'fillGradientType' | 'miterLimit' | 'textBaseline' | 'trim' | 'leading' | 'lineJoin';

export { }
