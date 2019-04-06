import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSteamClientComponent } from './image-steam-client.component';

describe('ImageSteamClientComponent', () => {
	let component: ImageSteamClientComponent;
	let fixture: ComponentFixture<ImageSteamClientComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [ImageSteamClientComponent]
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(ImageSteamClientComponent);
		component = fixture.componentInstance;
	});


	//////////////////
	// resize
	//////////////////
	it('resize.width', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = 200;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:200');
	});

	it('resize.width dimension px', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = { units: 200, modifier: 'px' };

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:200px');
	});

	it('resize.width dimension %', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = { units: 200, modifier: '%' };

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:200%25');
	});

	it('resize.width dimension %25', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = { units: 200, modifier: '%25' };

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:200%25');
	});


	it('resize.width dimension offset -', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = { units: 200, offset: '-' };

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:-200');
	});

	it('resize.width dimension offset +', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = { units: 200, offset: '+' };

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:+200');
	});


	it('resize.height', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeHeight = 200;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);


		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=h:200');
	});

	it('resize.min', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeMin = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=m:true');
	});

	it('resize.ignoreAspect', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeIgnoreAspect = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=i:true');
	});

	it('resize.canGrow', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeCanGrow = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=cg:true');
	});

	it('resize.interpolator', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeInterpolator = 'bicubic';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=int:bicubic');
	});

	it('resize.fit', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeFit = 'cover';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=ft:cover');
	});

	it('resize.position', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizePosition = 'centre';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=ps:centre');
	});


	it('resize complicated one', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.resizeWidth = { units: 200, modifier: 'px', offset: '+' };
		component.resizeHeight = { units: 100, modifier: '%', offset: '-' };
		component.resizeMin = true;
		component.resizeCanGrow = true;
		component.resizeIgnoreAspect = true;
		component.resizeInterpolator = 'bicubic';
		component.resizeFit = 'cover';
		component.resizePosition = 'centre';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rs=w:+200px,h:-100%25,m:true,cg:true,i:true,int:bicubic,ft:cover,ps:centre');
	});




	//////////////////
	// crop
	// //////////////////
	it('crop.top', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropTop = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=t:10');
	});

	it('crop.left', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropLeft = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=l:10');
	});

	it('crop.width', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropWidth = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=w:10');
	});

	it('crop.height', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropHeight = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=h:10');
	});

	it('crop.anchor', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropAnchor = 'cc';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=a:cc');
	});


	it('crop.anchorX', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropAnchorX = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=ax:10');
	});

	it('crop.anchorY', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.cropAnchorY = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cr=ay:10');
	});


	//////////////////
	// gamma
	//////////////////
	it('gamma', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.gamma = 1.1;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/gm=g:1.1');
	});


	//////////////////
	// Flatten
	//////////////////
	it('flatten', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.flatten = 'true';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/ft');
	});

	//////////////////
	// Rotate
	//////////////////
	it('rotate', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.rotate = 90;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/rt=d:90');
	});


	//////////////////
	// Flip
	//////////////////
	it('flip x', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.flipX = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fl=x:true');
	});

	it('flip y', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.flipY = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fl=y:true');
	});


	//////////////////
	// Extend
	//////////////////
	it('extend t', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.extendTop = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/exd=t:10');
	});

	it('extend l', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.extendLeft = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/exd=l:10');
	});


	it('extend b', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.extendBottom = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/exd=b:10');
	});


	it('extend r', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.extendRight = 10;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/exd=r:10');
	});


	//////////////////
	// Quality
	//////////////////
	it('quality', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.quality = 90;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/qt=q:90');
	});


	//////////////////
	// Compression
	//////////////////
	it('compression', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.compression = 90;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/cp=c:90');
	});



	//////////////////
	// Progressive
	//////////////////
	it('compression', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.progressive = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/pg');
	});


	//////////////////
	// Format
	//////////////////
	it('format', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.format = 'jpeg';

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fm=f:jpeg');
	});


	//////////////////
	// Metadata
	//////////////////
	it('metadata', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.metadata = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/md=e:true');
	});


	//////////////////
	// Sharpen
	//////////////////
	it('sharpen.r', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.sharpenR = 1;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fx-sp=r:1');
	});

	it('sharpen.flat', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.sharpenFlat = 1;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fx-sp=f:1');
	});

	it('sharpen.jagged', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.sharpenJagged = 1;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fx-sp=j:1');
	});


	//////////////////
	// Blur
	//////////////////
	it('blur', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.blur = 1;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fx-bl=s:1');
	});


	//////////////////
	// Greyscale
	//////////////////
	it('greyscale', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.greyscale = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fx-gs');
	});

	//////////////////
	// Normalize
	//////////////////
	it('normalize', () => {
		component.imageUrl = 'https://example.com/img.jpg';
		component.normalize = true;

		let fullImagePath: string;
		component.urlOut.subscribe(e => fullImagePath = e);

		fixture.detectChanges();
		expect(fullImagePath).toEqual('https://example.com/img.jpg/:/fx-nm');
	});
});
