import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'lib-image-steam-client',
	template: `<img [src]="imageUrlWithInstructions" />`,
	styles: []
})
export class ImageSteamClientComponent implements OnInit {

	@Input() imageUrl: string;
	@Input() instructions: ISInstructions = buildInstructionTemplate();
	@Output() urlOut = new EventEmitter<string>();
	imageUrlWithInstructions: string;

	constructor() { }

	ngOnInit() {
		this.imageUrlWithInstructions = this.buildUrl(this.imageUrl);
		this.urlOut.emit(this.imageUrlWithInstructions);
	}

	private buildUrl(imagePath) {
		if (!this.instructions) {
			return imagePath;
		}

		let out = '';
		Object.entries(this.instructions).forEach((operationEntry) => {
			if (this.isIdentity(operationEntry)) {
				out += `/${operationEntry[0]}`;
				return;
			}

			Object.entries(operationEntry[1]).forEach((argumentEntry, i) => {
				const key = argumentEntry[0];
				const value = argumentEntry[1];
				if (i === 0) {
					out += `/${operationEntry[0]}=`;
				}
				if (i > 0) {
					out += ',';
				}
				if (this.isDimension(value)) {
					const dim = value as ISDimension;
					let modifier = dim.modifier || '';
					modifier = modifier === '%' ? '%25' : modifier;

					out += `${key}:${dim.offset || ''}${dim.units}${modifier}`;
				} else {
					out += `${key}:${value}`;
				}
			});
		});

		if (out.length > 0) {
			out = '/:' + out;
		}

		return `${this.imageUrl}${out}`;
	}

	private isDimension = (obj: any): boolean => {
		if (typeof obj !== 'object') {
			return false;
		}
		return typeof obj.units === 'number';
	}

	private isIdentity = (operationEntry: any): boolean => {
		if (typeof operationEntry !== 'object') {
			return false;
		}

		const potentialIdent = operationEntry[1];
		if (!potentialIdent) {
			return false;
		}

		if (typeof potentialIdent !== 'object') {
			return false;
		}

		if (!potentialIdent.identity) {
			return false;
		}

		return potentialIdent.identity === true;
	}

	private setISDimension(key1: string, key2: string, param: any) {
		this.instructions[key1][key2] = this.instructions[key1][key2] || {};
		if (this.isDimension(param)) {
			this.instructions[key1][key2] = { ...param };
		} else {
			this.instructions[key1][key2] = { units: param };
		}
	}


	//////////////////
	// resize
	//////////////////
	@Input('resize.width')
	set resizeWidth(param: any) {
		this.setISDimension('rs', 'w', param);
	}

	@Input('resize.height')
	set resizeHeight(param: any) {
		this.setISDimension('rs', 'h', param);
	}

	@Input('resize.min')
	set resizeMin(param: boolean) {
		this.instructions.rs.m = param;
	}

	@Input('resize.ignoreAspect')
	set resizeIgnoreAspect(param: boolean) {
		this.instructions.rs.i = param;
	}

	@Input('resize.canGrow')
	set resizeCanGrow(param: boolean) {
		this.instructions.rs.cg = param;
	}

	@Input('resize.interpolator')
	set resizeInterpolator(param: 'bicubic' | 'nearest' | 'bilinear' | 'vsqbs' | 'lbb' | 'nohalo') {
		this.instructions.rs.int = param;
	}

	@Input('resize.background')
	set resizeBackground(param: string) {
		this.instructions.rs.bg = param;
	}

	@Input('resize.fit')
	set resizeFit(param: 'cover' | 'contain' | 'fill' | 'inside' | 'outside') {
		this.instructions.rs.ft = param;
	}

	@Input('resize.position')
	set resizePosition(param: 'centre' | 'top' | 'right top' | 'right' | 'right bottom' | 'bottom' | 'left bottom' | 'left' | 'left top') {
		this.instructions.rs.ps = param;
	}

	//////////////////
	// crop
	//////////////////
	@Input('crop.top')
	set cropTop(param: any) {
		this.setISDimension('cr', 't', param);
	}

	@Input('crop.left')
	set cropLeft(param: any) {
		this.setISDimension('cr', 'l', param);
	}

	@Input('crop.width')
	set cropWidth(param: any) {
		this.setISDimension('cr', 'w', param);
	}


	@Input('crop.height')
	set cropHeight(param: any) {
		this.setISDimension('cr', 'h', param);
	}


	@Input('crop.anchor')
	set cropAnchor(param: 'bl' | 'bc' | 'br' | 'cl' | 'cc' | 'cr' | 'tl' | 'tc' | 'tr') {
		this.instructions.cr.a = param;
	}


	@Input('crop.anchorX')
	set cropAnchorX(param: any) {
		this.setISDimension('cr', 'ax', param);
	}

	@Input('crop.anchorY')
	set cropAnchorY(param: any) {
		this.setISDimension('cr', 'ay', param);
	}


	//////////////////
	// gamma
	//////////////////
	@Input('gamma')
	set gamma(param: number) {
		this.instructions.gm.g = param;
	}

	//////////////////
	// Flatten
	//////////////////
	@Input('flatten')
	set flatten(param: any) {
		this.instructions.ft.identity = true;
	}

	//////////////////
	// Rotate
	//////////////////
	@Input('rotate')
	set rotate(param: 0 | 90 | 180 | 270) {
		this.instructions.rt.d = param;
	}

	//////////////////
	// Flip
	//////////////////
	@Input('flip.x')
	set flipX(param: any) {
		this.instructions.fl.x = true;
	}

	@Input('flip.y')
	set flipY(param: any) {
		this.instructions.fl.y = true;
	}

	//////////////////
	// Extend
	//////////////////
	@Input('extend.top')
	set extendTop(param: any) {
		this.setISDimension('exd', 't', param);
	}

	@Input('extend.left')
	set extendLeft(param: any) {
		this.setISDimension('exd', 'l', param);
	}

	@Input('extend.bottom')
	set extendBottom(param: any) {
		this.setISDimension('exd', 'b', param);
	}

	@Input('extend.right')
	set extendRight(param: any) {
		this.setISDimension('exd', 'r', param);
	}

	@Input('extend.background')
	set extendBackground(param: string) {
		this.instructions.exd.bg = param;
	}

	//////////////////
	// Quality
	//////////////////
	@Input('quality')
	set quality(param: number) {
		this.instructions.qt.q = param;
	}


	//////////////////
	// Compression
	//////////////////
	@Input('compression')
	set compression(param: number) {
		this.instructions.cp.c = param;
	}


	//////////////////
	// Progressive
	//////////////////
	@Input('progressive')
	set progressive(param: any) {
		this.instructions.pg.identity = true;
	}


	//////////////////
	// Format
	//////////////////
	@Input('format')
	set format(param: 'jpeg' | 'png' | 'webp') {
		this.instructions.fm.f = param;
	}


	//////////////////
	// Metadata
	//////////////////
	@Input('metadata')
	set metadata(param: boolean) {
		this.instructions.md.e = param;
	}

	//////////////////
	// Sharpen
	//////////////////
	@Input('sharpen.r')
	set sharpenR(param: number) {
		this.instructions['fx-sp'].r = param;
	}

	@Input('sharpen.flat')
	set sharpenFlat(param: number) {
		this.instructions['fx-sp'].f = param;
	}

	@Input('sharpen.jagged')
	set sharpenJagged(param: number) {
		this.instructions['fx-sp'].j = param;
	}


	//////////////////
	// Blur
	//////////////////
	@Input('blur')
	set blur(param: number) {
		this.instructions['fx-bl'].s = param;
	}


	//////////////////
	// Greyscale
	//////////////////
	@Input('greyscale')
	set greyscale(param: any) {
		this.instructions['fx-gs'].identity = true;
	}


	//////////////////
	// Normalize
	//////////////////
	@Input('normalize')
	set normalize(param: any) {
		this.instructions['fx-nm'].identity = true;
	}
}


export function buildInstructionTemplate(): ISInstructions {
	return {
		rs: {} as ISResize,
		cr: {} as ISCrop,
		gm: {} as ISGamma,
		ft: {} as ISIdentity,
		rt: {} as ISRotate,
		fl: {} as ISFlip,
		exd: {} as ISExtend,
		qt: {} as ISQuality,
		cp: {} as ISCompression,
		pg: {} as ISIdentity,
		fm: {} as ISFormat,
		md: {} as ISMetadata,
		'fx-sp': {} as ISSharpen,
		'fx-bl': {} as ISBlur,
		'fx-gs': {} as ISIdentity,
		'fx-nm': {} as ISIdentity,
	} as ISInstructions;
}

export interface ISDimension {
	units?: number;
	modifier?: '' | 'px' | '%25';
	offset?: '' | '-' | '+';
}

export interface ISIdentity {
	identity: true;
}

export interface ISResize {
	w?: ISDimension; // width
	h?: ISDimension; // height
	m?: boolean; // min
	i?: boolean; // ignoreAspect
	cg?: boolean; // canGrow
	int?: 'bicubic' | 'nearest' | 'bilinear' | 'vsqbs' | 'lbb' | 'nohalo'; // interpolator
	bg?: string; // background
	ft?: 'cover' | 'contain' | 'fill' | 'inside' | 'outside'; // fit
	ps?: 'centre' | 'top' | 'right top' | 'right' | 'right bottom' | 'bottom' | 'left bottom' | 'left' | 'left top'; // position
}

export interface ISCrop {
	t?: ISDimension; // top
	l?: ISDimension; // left
	w?: ISDimension; // width
	h?: ISDimension; // height
	a?: 'bl' | 'bc' | 'br' | 'cl' | 'cc' | 'cr' | 'tl' | 'tc' | 'tr'; // anchor
	ax?: ISDimension; // anchorX
	ay?: ISDimension; // anchorY
}

export interface ISGamma {
	g?: number; // gamma
}

export interface ISRotate {
	d?: 0 | 90 | 180 | 270; // degrees
}

export interface ISFlip {
	x?: boolean; // horizontal axis
	y?: boolean; // vertical axis
}


export interface ISExtend {
	t?: string; // top
	b?: string; // bottom
	l?: string; // left
	r?: string; // right
	bg?: string; // background
}

export interface ISQuality {
	q?: number; // quality
}

export interface ISCompression {
	c?: number; // compression
}

export interface ISFormat {
	f?: 'jpeg' | 'png' | 'webp'; // format
}

export interface ISMetadata {
	e?: boolean; // enabled
}

export interface ISSharpen {
	r?: number; // radius
	f?: number; // flat
	j?: number; // jagged
}

export interface ISBlur {
	s?: number; // sigma
}

export interface ISInstructions {
	rs?: ISResize;
	cr?: ISCrop;
	gm?: ISGamma;
	ft?: ISIdentity;
	rt?: ISRotate;
	fl?: ISFlip;
	exd?: ISExtend;
	qt?: ISQuality;
	cp?: ISCompression;
	pg?: ISIdentity,
	fm?: ISFormat,
	md?: ISMetadata;
	'fx-sp'?: ISSharpen;
	'fx-bl'?: ISBlur;
	'fx-gs'?: ISIdentity;
	'fx-nm'?: ISIdentity;
}

