
/***********************************/
/*http://www.layabox.com  2017/12/12*/
/***********************************/
var Laya=window.Laya=(function(window,document){
	var Laya={
		__internals:[],
		__packages:{},
		__classmap:{'Object':Object,'Function':Function,'Array':Array,'String':String},
		__sysClass:{'object':'Object','array':'Array','string':'String','dictionary':'Dictionary'},
		__propun:{writable: true,enumerable: false,configurable: true},
		__presubstr:String.prototype.substr,
		__substr:function(ofs,sz){return arguments.length==1?Laya.__presubstr.call(this,ofs):Laya.__presubstr.call(this,ofs,sz>0?sz:(this.length+sz));},
		__init:function(_classs){_classs.forEach(function(o){o.__init$ && o.__init$();});},
		__isClass:function(o){return o && (o.__isclass || o==Object || o==String || o==Array);},
		__newvec:function(sz,value){
			var d=[];
			d.length=sz;
			for(var i=0;i<sz;i++) d[i]=value;
			return d;
		},
		__extend:function(d,b){
			for (var p in b){
				if (!b.hasOwnProperty(p)) continue;
				var gs=Object.getOwnPropertyDescriptor(b, p);
				var g = gs.get, s = gs.set; 
				if ( g || s ) {
					if ( g && s)
						Object.defineProperty(d,p,gs);
					else{
						g && Object.defineProperty(d, p, g);
						s && Object.defineProperty(d, p, s);
					}
				}
				else d[p] = b[p];
			}
			function __() { Laya.un(this,'constructor',d); }__.prototype=b.prototype;d.prototype=new __();Laya.un(d.prototype,'__imps',Laya.__copy({},b.prototype.__imps));
		},
		__copy:function(dec,src){
			if(!src) return null;
			dec=dec||{};
			for(var i in src) dec[i]=src[i];
			return dec;
		},
		__package:function(name,o){
			if(Laya.__packages[name]) return;
			Laya.__packages[name]=true;
			var p=window,strs=name.split('.');
			if(strs.length>1){
				for(var i=0,sz=strs.length-1;i<sz;i++){
					var c=p[strs[i]];
					p=c?c:(p[strs[i]]={});
				}
			}
			p[strs[strs.length-1]] || (p[strs[strs.length-1]]=o||{});
		},
		__hasOwnProperty:function(name,o){
			o=o ||this;
		    function classHas(name,o){
				if(Object.hasOwnProperty.call(o.prototype,name)) return true;
				var s=o.prototype.__super;
				return s==null?null:classHas(name,s);
			}
			return (Object.hasOwnProperty.call(o,name)) || classHas(name,o.__class);
		},
		__typeof:function(o,value){
			if(!o || !value) return false;
			if(value===String) return (typeof o==='string');
			if(value===Number) return (typeof o==='number');
			if(value.__interface__) value=value.__interface__;
			else if(typeof value!='string')  return (o instanceof value);
			return (o.__imps && o.__imps[value]) || (o.__class==value);
		},
		__as:function(value,type){
			return (this.__typeof(value,type))?value:null;
		},
        __int:function(value){
            return value?parseInt(value):0;
        },
		interface:function(name,_super){
			Laya.__package(name,{});
			var ins=Laya.__internals;
			var a=ins[name]=ins[name] || {self:name};
			if(_super)
			{
				var supers=_super.split(',');
				a.extend=[];
				for(var i=0;i<supers.length;i++){
					var nm=supers[i];
					ins[nm]=ins[nm] || {self:nm};
					a.extend.push(ins[nm]);
				}
			}
			var o=window,words=name.split('.');
			for(var i=0;i<words.length-1;i++) o=o[words[i]];
			o[words[words.length-1]]={__interface__:name};
		},
		class:function(o,fullName,_super,miniName){
			_super && Laya.__extend(o,_super);
			if(fullName){
				Laya.__package(fullName,o);
				Laya.__classmap[fullName]=o;
				if(fullName.indexOf('.')>0){
					if(fullName.indexOf('laya.')==0){
						var paths=fullName.split('.');
						miniName=miniName || paths[paths.length-1];
						if(Laya[miniName]) console.log("Warning!,this class["+miniName+"] already exist:",Laya[miniName]);
						Laya[miniName]=o;
					}
				}
				else {
					if(fullName=="Main")
						window.Main=o;
					else{
						if(Laya[fullName]){
							console.log("Error!,this class["+fullName+"] already exist:",Laya[fullName]);
						}
						Laya[fullName]=o;
					}
				}
			}
			var un=Laya.un,p=o.prototype;
			un(p,'hasOwnProperty',Laya.__hasOwnProperty);
			un(p,'__class',o);
			un(p,'__super',_super);
			un(p,'__className',fullName);
			un(o,'__super',_super);
			un(o,'__className',fullName);
			un(o,'__isclass',true);
			un(o,'super',function(o){this.__super.call(o);});
		},
		imps:function(dec,src){
			if(!src) return null;
			var d=dec.__imps|| Laya.un(dec,'__imps',{});
			function __(name){
				var c,exs;
				if(! (c=Laya.__internals[name]) ) return;
				d[name]=true;
				if(!(exs=c.extend)) return;
				for(var i=0;i<exs.length;i++){
					__(exs[i].self);
				}
			}
			for(var i in src) __(i);
		},
        superSet:function(clas,o,prop,value){
            var fun = clas.prototype["_$set_"+prop];
            fun && fun.call(o,value);
        },
        superGet:function(clas,o,prop){
            var fun = clas.prototype["_$get_"+prop];
           	return fun?fun.call(o):null;
        },
		getset:function(isStatic,o,name,getfn,setfn){
			if(!isStatic){
				getfn && Laya.un(o,'_$get_'+name,getfn);
				setfn && Laya.un(o,'_$set_'+name,setfn);
			}
			else{
				getfn && (o['_$GET_'+name]=getfn);
				setfn && (o['_$SET_'+name]=setfn);
			}
			if(getfn && setfn) 
				Object.defineProperty(o,name,{get:getfn,set:setfn,enumerable:false,configurable:true});
			else{
				getfn && Object.defineProperty(o,name,{get:getfn,enumerable:false,configurable:true});
				setfn && Object.defineProperty(o,name,{set:setfn,enumerable:false,configurable:true});
			}
		},
		static:function(_class,def){
				for(var i=0,sz=def.length;i<sz;i+=2){
					if(def[i]=='length') 
						_class.length=def[i+1].call(_class);
					else{
						function tmp(){
							var name=def[i];
							var getfn=def[i+1];
							Object.defineProperty(_class,name,{
								get:function(){delete this[name];return this[name]=getfn.call(this);},
								set:function(v){delete this[name];this[name]=v;},enumerable: true,configurable: true});
						}
						tmp();
					}
				}
		},		
		un:function(obj,name,value){
			value || (value=obj[name]);
			Laya.__propun.value=value;
			Object.defineProperty(obj, name, Laya.__propun);
			return value;
		},
		uns:function(obj,names){
			names.forEach(function(o){Laya.un(obj,o)});
		}
	};

    window.console=window.console || ({log:function(){}});
	window.trace=window.console.log;
	Error.prototype.throwError=function(){throw arguments;};
	//String.prototype.substr=Laya.__substr;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});

	return Laya;
})(window,document);

(function(window,document,Laya){
	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec;
Laya.interface('fairygui.IUISource');
Laya.interface('laya.runtime.IMarket');
Laya.interface('laya.filters.IFilter');
Laya.interface('laya.display.ILayout');
Laya.interface('laya.resource.IDispose');
Laya.interface('laya.runtime.IConchNode');
Laya.interface('fairygui.gears.IColorGear');
Laya.interface('laya.filters.IFilterAction');
Laya.interface('laya.runtime.ICPlatformClass');
Laya.interface('fairygui.gears.IAnimationGear');
/**
*@private
*/
//class laya.utils.RunDriver
var RunDriver=(function(){
	function RunDriver(){}
	__class(RunDriver,'laya.utils.RunDriver');
	RunDriver.FILTER_ACTIONS=[];
	RunDriver.pixelRatio=-1;
	RunDriver._charSizeTestDiv=null;
	RunDriver.now=function(){
		return Date.now();
	}

	RunDriver.getWindow=function(){
		return window;
	}

	RunDriver.getPixelRatio=function(){
		if (RunDriver.pixelRatio < 0){
			var ctx=Browser.context;
			var backingStore=ctx.backingStorePixelRatio || ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;
			RunDriver.pixelRatio=(Browser.window.devicePixelRatio || 1)/ backingStore;
			if (RunDriver.pixelRatio < 1)RunDriver.pixelRatio=1;
		}
		return RunDriver.pixelRatio;
	}

	RunDriver.getIncludeStr=function(name){
		return null;
	}

	RunDriver.createShaderCondition=function(conditionScript){
		var fn="(function() {return "+conditionScript+";})";
		return Laya._runScript(fn);
	}

	RunDriver.fontMap=[];
	RunDriver.measureText=function(txt,font){
		var isChinese=RunDriver.hanzi.test(txt);
		if (isChinese && RunDriver.fontMap[font]){
			return RunDriver.fontMap[font];
		};
		var ctx=Browser.context;
		ctx.font=font;
		var r=ctx.measureText(txt);
		if (isChinese)RunDriver.fontMap[font]=r;
		return r;
	}

	RunDriver.getWebGLContext=function(canvas){
	};

	RunDriver.beginFlush=function(){
	};

	RunDriver.endFinish=function(){
	};

	RunDriver.addToAtlas=null;
	RunDriver.flashFlushImage=function(atlasWebGLCanvas){
	};

	RunDriver.drawToCanvas=function(sprite,_renderType,canvasWidth,canvasHeight,offsetX,offsetY){
		var canvas=HTMLCanvas.create("2D");
		var context=new RenderContext(canvasWidth,canvasHeight,canvas);
		RenderSprite.renders[_renderType]._fun(sprite,context,offsetX,offsetY);
		return canvas;
	}

	RunDriver.createParticleTemplate2D=null;
	RunDriver.createGLTextur=null;
	RunDriver.createWebGLContext2D=null;
	RunDriver.changeWebGLSize=function(w,h){
	};

	RunDriver.createRenderSprite=function(type,next){
		return new RenderSprite(type,next);
	}

	RunDriver.createFilterAction=function(type){
		return new ColorFilterAction();
	}

	RunDriver.createGraphics=function(){
		return new Graphics();
	}

	RunDriver.clear=function(value){
		Render._context.ctx.clear();
	}

	RunDriver.cancelLoadByUrl=function(url){
	};

	RunDriver.clearAtlas=function(value){
	};

	RunDriver.isAtlas=function(bitmap){
		return false;
	}

	RunDriver.addTextureToAtlas=function(value){
	};

	RunDriver.getTexturePixels=function(value,x,y,width,height){
		return null;
	}

	RunDriver.skinAniSprite=function(){
		return null;
	}

	RunDriver.update3DLoop=function(){
	};

	__static(RunDriver,
	['hanzi',function(){return this.hanzi=new RegExp("^[\u4E00-\u9FA5]$");}
	]);
	return RunDriver;
})()


/**
*<code>Laya</code> 是全局对象的引用入口集。
*Laya类引用了一些常用的全局对象，比如Laya.stage：舞台，Laya.timer：时间管理器，Laya.loader：加载管理器，使用时注意大小写。
*/
//class Laya
var ___Laya=(function(){
	//function Laya(){}
	/**
	*表示是否捕获全局错误并弹出提示。默认为false。
	*适用于移动设备等不方便调试的时候，设置为true后，如有未知错误，可以弹窗抛出详细错误堆栈。
	*/
	__getset(1,Laya,'alertGlobalError',null,function(value){
		var erralert=0;
		if (value){
			Browser.window.onerror=function (msg,url,line,column,detail){
				if (erralert++< 5 && detail)
					alert("出错啦，请把此信息截图给研发商\n"+msg+"\n"+detail.stack || detail);
			}
			}else {
			Browser.window.onerror=null;
		}
	});

	Laya.init=function(width,height,__plugins){
		var plugins=[];for(var i=2,sz=arguments.length;i<sz;i++)plugins.push(arguments[i]);
		if (Laya._isinit)return;
		ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice=Laya._arrayBufferSlice);
		Laya._isinit=true;
		Browser.__init__();
		Context.__init__();
		Graphics.__init__();
		Laya.timer=new Timer();
		Laya.scaleTimer=new Timer();
		Laya.loader=new LoaderManager();
		WeakObject.__init__();
		for (var i=0,n=plugins.length;i < n;i++){
			if (plugins[i].enable)plugins[i].enable();
		}
		Font.__init__();
		Style.__init__();
		ResourceManager.__init__();
		CacheManager.beginCheck();
		Laya._currentStage=Laya.stage=new Stage();
		Laya.stage.conchModel && Laya.stage.conchModel.setRootNode();
		Laya._getUrlPath();
		Laya.render=new Render(0,0);
		Laya.stage.size(width,height);
		RenderSprite.__init__();
		KeyBoardManager.__init__();
		MouseManager.instance.__init__(Laya.stage,Render.canvas);
		Input.__init__();
		SoundManager.autoStopMusic=true;
		LocalStorage.__init__();
		return Render.canvas;
	}

	Laya._getUrlPath=function(){
		var location=Browser.window.location;
		var pathName=location.pathname;
		pathName=pathName.charAt(2)==':' ? pathName.substring(1):pathName;
		URL.rootPath=URL.basePath=URL.getPath(location.protocol=="file:" ? pathName :location.protocol+"//"+location.host+location.pathname);
	}

	Laya._arrayBufferSlice=function(start,end){
		var arr=this;
		var arrU8List=new Uint8Array(arr,start,end-start);
		var newU8List=new Uint8Array(arrU8List.length);
		newU8List.set(arrU8List);
		return newU8List.buffer;
	}

	Laya._runScript=function(script){
		return Browser.window[Laya._evcode](script);
	}

	Laya.stage=null;
	Laya.timer=null;
	Laya.scaleTimer=null;
	Laya.loader=null;
	Laya.version="1.7.22";
	Laya.render=null;
	Laya._currentStage=null;
	Laya._isinit=false;
	Laya.MiniAdpter={init:function(){if (window.navigator && window.navigator.userAgent && window.navigator.userAgent.indexOf("MiniGame")>-1)console.error("请先引用小游戏适配库laya.wxmini.js,详细教程：https://ldc.layabox.com/doc/?nav=zh-ts-5-0-0")}};
	__static(Laya,
	['conchMarket',function(){return this.conchMarket=window.conch?conchMarket:null;},'PlatformClass',function(){return this.PlatformClass=window.PlatformClass;},'_evcode',function(){return this._evcode="e"+String.fromCharCode(100+10+8)+"a"+"l";}
	]);
	return Laya;
})()


//class FairyguiLib
var FairyguiLib=(function(){
	function FairyguiLib(){}
	__class(FairyguiLib,'FairyguiLib');
	var __proto=FairyguiLib.prototype;
	//激活资源版本控制
	__proto.beginLoad=function(){}
	//加载引擎需要的资源
	__proto.onLoaded=function(){}
	return FairyguiLib;
})()


/**
*@private
*<code>ColorFilterAction</code> 是一个颜色滤镜应用类。
*/
//class laya.filters.ColorFilterAction
var ColorFilterAction=(function(){
	function ColorFilterAction(){
		this.data=null;
	}

	__class(ColorFilterAction,'laya.filters.ColorFilterAction');
	var __proto=ColorFilterAction.prototype;
	Laya.imps(__proto,{"laya.filters.IFilterAction":true})
	/**
	*给指定的对象应用颜色滤镜。
	*@param srcCanvas 需要应用画布对象。
	*@return 应用了滤镜后的画布对象。
	*/
	__proto.apply=function(srcCanvas){
		var ctx=srcCanvas.ctx.ctx;
		var canvas=srcCanvas.ctx.ctx.canvas;
		if (canvas.width==0 || canvas.height==0)return canvas;
		var imgdata=ctx.getImageData(0,0,canvas.width,canvas.height);
		var data=imgdata.data;
		var nData;
		for (var i=0,n=data.length;i < n;i+=4){
			nData=this.getColor(data[i],data[i+1],data[i+2],data[i+3]);
			if (data[i+3]==0)continue ;
			data[i]=nData[0];
			data[i+1]=nData[1];
			data[i+2]=nData[2];
			data[i+3]=nData[3];
		}
		ctx.putImageData(imgdata,0,0);
		return srcCanvas;
	}

	__proto.getColor=function(red,green,blue,alpha){
		var rst=[];
		if (this.data._mat && this.data._alpha){
			var mat=this.data._mat;
			var tempAlpha=this.data._alpha;
			rst[0]=mat[0] *red+mat[1] *green+mat[2] *blue+mat[3] *alpha+tempAlpha[0];
			rst[1]=mat[4] *red+mat[5] *green+mat[6] *blue+mat[7] *alpha+tempAlpha[1];
			rst[2]=mat[8] *red+mat[9] *green+mat[10] *blue+mat[11] *alpha+tempAlpha[2];
			rst[3]=mat[12] *red+mat[13] *green+mat[14] *blue+mat[15] *alpha+tempAlpha[3];
		}
		return rst;
	}

	return ColorFilterAction;
})()


/**
*<code>Filter</code> 是滤镜基类。
*/
//class laya.filters.Filter
var Filter=(function(){
	function Filter(){
		/**@private */
		this._action=null;
	}

	__class(Filter,'laya.filters.Filter');
	var __proto=Filter.prototype;
	Laya.imps(__proto,{"laya.filters.IFilter":true})
	/**@private */
	__proto.callNative=function(sp){}
	/**@private 滤镜动作。*/
	__getset(0,__proto,'action',function(){return this._action });
	/**@private 滤镜类型。*/
	__getset(0,__proto,'type',function(){return-1});
	Filter.BLUR=0x10;
	Filter.COLOR=0x20;
	Filter.GLOW=0x08;
	Filter._filterStart=null;
	Filter._filterEnd=null;
	Filter._EndTarget=null;
	Filter._recycleScope=null;
	Filter._filter=null;
	Filter._useSrc=null;
	Filter._endSrc=null;
	Filter._useOut=null;
	Filter._endOut=null;
	return Filter;
})()


/**
*<code>EventDispatcher</code> 类是可调度事件的所有类的基类。
*/
//class laya.events.EventDispatcher
var EventDispatcher=(function(){
	var EventHandler;
	function EventDispatcher(){
		/**@private */
		this._events=null;
	}

	__class(EventDispatcher,'laya.events.EventDispatcher');
	var __proto=EventDispatcher.prototype;
	/**
	*检查 EventDispatcher 对象是否为特定事件类型注册了任何侦听器。
	*@param type 事件的类型。
	*@return 如果指定类型的侦听器已注册，则值为 true；否则，值为 false。
	*/
	__proto.hasListener=function(type){
		var listener=this._events && this._events[type];
		return !!listener;
	}

	/**
	*派发事件。
	*@param type 事件类型。
	*@param data （可选）回调数据。<b>注意：</b>如果是需要传递多个参数 p1,p2,p3,...可以使用数组结构如：[p1,p2,p3,...] ；如果需要回调单个参数 p ，且 p 是一个数组，则需要使用结构如：[p]，其他的单个参数 p ，可以直接传入参数 p。
	*@return 此事件类型是否有侦听者，如果有侦听者则值为 true，否则值为 false。
	*/
	__proto.event=function(type,data){
		if (!this._events || !this._events[type])return false;
		var listeners=this._events[type];
		if (listeners.run){
			if (listeners.once)delete this._events[type];
			data !=null ? listeners.runWith(data):listeners.run();
			}else {
			for (var i=0,n=listeners.length;i < n;i++){
				var listener=listeners[i];
				if (listener){
					(data !=null)? listener.runWith(data):listener.run();
				}
				if (!listener || listener.once){
					listeners.splice(i,1);
					i--;
					n--;
				}
			}
			if (listeners.length===0 && this._events)delete this._events[type];
		}
		return true;
	}

	/**
	*使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知。
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.on=function(type,caller,listener,args){
		return this._createListener(type,caller,listener,args,false);
	}

	/**
	*使用 EventDispatcher 对象注册指定类型的事件侦听器对象，以使侦听器能够接收事件通知，此侦听事件响应一次后自动移除。
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.once=function(type,caller,listener,args){
		return this._createListener(type,caller,listener,args,true);
	}

	/**@private */
	__proto._createListener=function(type,caller,listener,args,once,offBefore){
		(offBefore===void 0)&& (offBefore=true);
		offBefore && this.off(type,caller,listener,once);
		var handler=EventHandler.create(caller || this,listener,args,once);
		this._events || (this._events={});
		var events=this._events;
		if (!events[type])events[type]=handler;
		else {
			if (!events[type].run)events[type].push(handler);
			else events[type]=[events[type],handler];
		}
		return this;
	}

	/**
	*从 EventDispatcher 对象中删除侦听器。
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param onceOnly （可选）如果值为 true ,则只移除通过 once 方法添加的侦听器。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.off=function(type,caller,listener,onceOnly){
		(onceOnly===void 0)&& (onceOnly=false);
		if (!this._events || !this._events[type])return this;
		var listeners=this._events[type];
		if (listener !=null){
			if (listeners.run){
				if ((!caller || listeners.caller===caller)&& listeners.method===listener && (!onceOnly || listeners.once)){
					delete this._events[type];
					listeners.recover();
				}
				}else {
				var count=0;
				for (var i=0,n=listeners.length;i < n;i++){
					var item=listeners[i];
					if (!item){
						count++;
						continue ;
					}
					if (item && (!caller || item.caller===caller)&& item.method===listener && (!onceOnly || item.once)){
						count++;
						listeners[i]=null;
						item.recover();
					}
				}
				if (count===n)delete this._events[type];
			}
		}
		return this;
	}

	/**
	*从 EventDispatcher 对象中删除指定事件类型的所有侦听器。
	*@param type （可选）事件类型，如果值为 null，则移除本对象所有类型的侦听器。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.offAll=function(type){
		var events=this._events;
		if (!events)return this;
		if (type){
			this._recoverHandlers(events[type]);
			delete events[type];
			}else {
			for (var name in events){
				this._recoverHandlers(events[name]);
			}
			this._events=null;
		}
		return this;
	}

	__proto._recoverHandlers=function(arr){
		if (!arr)return;
		if (arr.run){
			arr.recover();
			}else {
			for (var i=arr.length-1;i >-1;i--){
				if (arr[i]){
					arr[i].recover();
					arr[i]=null;
				}
			}
		}
	}

	/**
	*检测指定事件类型是否是鼠标事件。
	*@param type 事件的类型。
	*@return 如果是鼠标事件，则值为 true;否则，值为 false。
	*/
	__proto.isMouseEvent=function(type){
		return EventDispatcher.MOUSE_EVENTS[type];
	}

	EventDispatcher.MOUSE_EVENTS={"rightmousedown":true,"rightmouseup":true,"rightclick":true,"mousedown":true,"mouseup":true,"mousemove":true,"mouseover":true,"mouseout":true,"click":true,"doubleclick":true};
	EventDispatcher.__init$=function(){
		Object.defineProperty(laya.events.EventDispatcher.prototype,"_events",{enumerable:false,writable:true});
		/**@private */
		//class EventHandler extends laya.utils.Handler
		EventHandler=(function(_super){
			function EventHandler(caller,method,args,once){
				EventHandler.__super.call(this,caller,method,args,once);
			}
			__class(EventHandler,'',_super);
			var __proto=EventHandler.prototype;
			__proto.recover=function(){
				if (this._id > 0){
					this._id=0;
					EventHandler._pool.push(this.clear());
				}
			}
			EventHandler.create=function(caller,method,args,once){
				(once===void 0)&& (once=true);
				if (EventHandler._pool.length)return EventHandler._pool.pop().setTo(caller,method,args,once);
				return new EventHandler(caller,method,args,once);
			}
			EventHandler._pool=[];
			return EventHandler;
		})(Handler)
	}

	return EventDispatcher;
})()


/**
*<p><code>Handler</code> 是事件处理器类。</p>
*<p>推荐使用 Handler.create()方法从对象池创建，减少对象创建消耗。创建的 Handler 对象不再使用后，可以使用 Handler.recover()将其回收到对象池，回收后不要再使用此对象，否则会导致不可预料的错误。</p>
*<p><b>注意：</b>由于鼠标事件也用本对象池，不正确的回收及调用，可能会影响鼠标事件的执行。</p>
*/
//class laya.utils.Handler
var Handler=(function(){
	function Handler(caller,method,args,once){
		/**执行域(this)。*/
		//this.caller=null;
		/**处理方法。*/
		//this.method=null;
		/**参数。*/
		//this.args=null;
		/**表示是否只执行一次。如果为true，回调后执行recover()进行回收，回收后会被再利用，默认为false 。*/
		this.once=false;
		/**@private */
		this._id=0;
		(once===void 0)&& (once=false);
		this.setTo(caller,method,args,once);
	}

	__class(Handler,'laya.utils.Handler');
	var __proto=Handler.prototype;
	/**
	*设置此对象的指定属性值。
	*@param caller 执行域(this)。
	*@param method 回调方法。
	*@param args 携带的参数。
	*@param once 是否只执行一次，如果为true，执行后执行recover()进行回收。
	*@return 返回 handler 本身。
	*/
	__proto.setTo=function(caller,method,args,once){
		this._id=Handler._gid++;
		this.caller=caller;
		this.method=method;
		this.args=args;
		this.once=once;
		return this;
	}

	/**
	*执行处理器。
	*/
	__proto.run=function(){
		if (this.method==null)return null;
		var id=this._id;
		var result=this.method.apply(this.caller,this.args);
		this._id===id && this.once && this.recover();
		return result;
	}

	/**
	*执行处理器，携带额外数据。
	*@param data 附加的回调数据，可以是单数据或者Array(作为多参)。
	*/
	__proto.runWith=function(data){
		if (this.method==null)return null;
		var id=this._id;
		if (data==null)
			var result=this.method.apply(this.caller,this.args);
		else if (!this.args && !data.unshift)result=this.method.call(this.caller,data);
		else if (this.args)result=this.method.apply(this.caller,this.args.concat(data));
		else result=this.method.apply(this.caller,data);
		this._id===id && this.once && this.recover();
		return result;
	}

	/**
	*清理对象引用。
	*/
	__proto.clear=function(){
		this.caller=null;
		this.method=null;
		this.args=null;
		return this;
	}

	/**
	*清理并回收到 Handler 对象池内。
	*/
	__proto.recover=function(){
		if (this._id > 0){
			this._id=0;
			Handler._pool.push(this.clear());
		}
	}

	Handler.create=function(caller,method,args,once){
		(once===void 0)&& (once=true);
		if (Handler._pool.length)return Handler._pool.pop().setTo(caller,method,args,once);
		return new Handler(caller,method,args,once);
	}

	Handler._pool=[];
	Handler._gid=1;
	return Handler;
})()


/**
*<code>Graphics</code> 类用于创建绘图显示对象。Graphics可以同时绘制多个位图或者矢量图，还可以结合save，restore，transform，scale，rotate，translate，alpha等指令对绘图效果进行变化。
*Graphics以命令流方式存储，可以通过cmds属性访问所有命令流。Graphics是比Sprite更轻量级的对象，合理使用能提高应用性能(比如把大量的节点绘图改为一个节点的Graphics命令集合，能减少大量节点创建消耗)。
*@see laya.display.Sprite#graphics
*/
//class laya.display.Graphics
var Graphics=(function(){
	function Graphics(){
		/**@private */
		//this._sp=null;
		/**@private */
		this._one=null;
		/**@private */
		this._cmds=null;
		/**@private */
		//this._vectorgraphArray=null;
		/**@private */
		//this._graphicBounds=null;
		this._render=this._renderEmpty;
		if (Render.isConchNode){
			var _this_=this;
			_this_._nativeObj=new (window)._conchGraphics();
			_this_.id=_this_._nativeObj.conchID;
		}
	}

	__class(Graphics,'laya.display.Graphics');
	var __proto=Graphics.prototype;
	/**
	*<p>销毁此对象。</p>
	*/
	__proto.destroy=function(){
		this.clear();
		if (this._graphicBounds)this._graphicBounds.destroy();
		this._graphicBounds=null;
		this._vectorgraphArray=null;
		this._sp && (this._sp._renderType=0);
		this._sp=null;
	}

	/**
	*<p>清空绘制命令。</p>
	*@param recoverCmds 是否回收绘图指令
	*/
	__proto.clear=function(recoverCmds){
		(recoverCmds===void 0)&& (recoverCmds=false);
		var i=0,len=0;
		if (recoverCmds){
			var tCmd=this._one;
			if (this._cmds){
				len=this._cmds.length;
				for (i=0;i < len;i++){
					tCmd=this._cmds[i];
					if (tCmd && (tCmd.callee===Render._context._drawTexture || tCmd.callee===Render._context._drawTextureWithTransform)){
						tCmd[0]=null;
						Graphics._cache.push(tCmd);
					}
				}
				this._cmds.length=0;
				}else if (tCmd){
				if (tCmd && (tCmd.callee===Render._context._drawTexture || tCmd.callee===Render._context._drawTextureWithTransform)){
					tCmd[0]=null;
					Graphics._cache.push(tCmd);
				}
			}
			}else {
			this._cmds=null;
		}
		this._one=null;
		this._render=this._renderEmpty;
		this._sp && (this._sp._renderType &=~0x01 & ~0x200);
		this._repaint();
		if (this._vectorgraphArray){
			for (i=0,len=this._vectorgraphArray.length;i < len;i++){
				VectorGraphManager.getInstance().deleteShape(this._vectorgraphArray[i]);
			}
			this._vectorgraphArray.length=0;
		}
	}

	/**@private */
	__proto._clearBoundsCache=function(){
		if (this._graphicBounds)this._graphicBounds.reset();
	}

	/**@private */
	__proto._initGraphicBounds=function(){
		if (!this._graphicBounds){
			this._graphicBounds=new GraphicsBounds();
			this._graphicBounds._graphics=this;
		}
	}

	/**
	*@private
	*重绘此对象。
	*/
	__proto._repaint=function(){
		this._clearBoundsCache();
		this._sp && this._sp.repaint();
	}

	/**@private */
	__proto._isOnlyOne=function(){
		return !this._cmds || this._cmds.length===0;
	}

	/**
	*获取位置及宽高信息矩阵(比较耗CPU，频繁使用会造成卡顿，尽量少用)。
	*@param realSize （可选）使用图片的真实大小，默认为false
	*@return 位置与宽高组成的 一个 Rectangle 对象。
	*/
	__proto.getBounds=function(realSize){
		(realSize===void 0)&& (realSize=false);
		this._initGraphicBounds();
		return this._graphicBounds.getBounds(realSize);
	}

	/**
	*@private
	*@param realSize （可选）使用图片的真实大小，默认为false
	*获取端点列表。
	*/
	__proto.getBoundPoints=function(realSize){
		(realSize===void 0)&& (realSize=false);
		this._initGraphicBounds();
		return this._graphicBounds.getBoundPoints(realSize);
	}

	__proto._addCmd=function(a){
		this._cmds=this._cmds || [];
		a.callee=a.shift();
		this._cmds.push(a);
	}

	__proto.setFilters=function(fs){
		this._saveToCmd(Render._context._setFilters,fs);
	}

	/**
	*绘制纹理。
	*@param tex 纹理。
	*@param x （可选）X轴偏移量。
	*@param y （可选）Y轴偏移量。
	*@param width （可选）宽度。
	*@param height （可选）高度。
	*@param m （可选）矩阵信息。
	*@param alpha （可选）透明度。
	*/
	__proto.drawTexture=function(tex,x,y,width,height,m,alpha){
		(x===void 0)&& (x=0);
		(y===void 0)&& (y=0);
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		(alpha===void 0)&& (alpha=1);
		if (!tex || alpha < 0.01)return null;
		if (!width)width=tex.sourceWidth;
		if (!height)height=tex.sourceHeight;
		alpha=alpha < 0 ? 0 :(alpha > 1 ? 1 :alpha);
		var offset=(!Render.isWebGL && (Browser.onFirefox || Browser.onEdge||Browser.onIE||Browser.onSafari))? 0.5 :0;
		var wRate=width / tex.sourceWidth;
		var hRate=height / tex.sourceHeight;
		width=tex.width *wRate;
		height=tex.height *hRate;
		if (tex.loaded && (width <=0 || height <=0))return null;
		x+=tex.offsetX *wRate;
		y+=tex.offsetY *hRate;
		this._sp && (this._sp._renderType |=0x200);
		var args;
		x-=offset;
		y-=offset;
		width+=2 *offset;
		height+=2 *offset;
		if (Graphics._cache.length){
			args=Graphics._cache.pop();
			args[0]=tex;
			args[1]=x;
			args[2]=y;
			args[3]=width;
			args[4]=height;
			args[5]=m;
			args[6]=alpha;
			}else {
			args=[tex,x,y,width,height,m,alpha];
		}
		args.callee=(m || alpha !=1)? Render._context._drawTextureWithTransform :Render._context._drawTexture;
		if (this._one==null && !m && alpha==1){
			this._one=args;
			this._render=this._renderOneImg;
			}else {
			this._saveToCmd(args.callee,args);
		}
		if (!tex.loaded){
			tex.once("loaded",this,this._textureLoaded,[tex,args]);
		}
		this._repaint();
		return args;
	}

	/**
	*@private 清理贴图并替换为最新的
	*@param tex
	*/
	__proto.cleanByTexture=function(tex,x,y,width,height){
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		if (!tex)return this.clear();
		if (this._one && this._render===this._renderOneImg){
			if (!width)width=tex.sourceWidth;
			if (!height)height=tex.sourceHeight;
			var wRate=width / tex.sourceWidth;
			var hRate=height / tex.sourceHeight;
			width=tex.width *wRate;
			height=tex.height *hRate;
			x+=tex.offsetX *wRate;
			y+=tex.offsetY *hRate;
			this._one[0]=tex;
			this._one[1]=x;
			this._one[2]=y;
			this._one[3]=width;
			this._one[4]=height;
			this._repaint();
			}else {
			this.clear();
			tex && this.drawTexture(tex,x,y,width,height);
		}
	}

	/**
	*批量绘制同样纹理。
	*@param tex 纹理。
	*@param pos 绘制坐标。
	*/
	__proto.drawTextures=function(tex,pos){
		if (!tex)return;
		this._saveToCmd(Render._context._drawTextures,[tex,pos]);
	}

	/**
	*用texture填充。
	*@param tex 纹理。
	*@param x X轴偏移量。
	*@param y Y轴偏移量。
	*@param width （可选）宽度。
	*@param height （可选）高度。
	*@param type （可选）填充类型 repeat|repeat-x|repeat-y|no-repeat
	*@param offset （可选）贴图纹理偏移
	*/
	__proto.fillTexture=function(tex,x,y,width,height,type,offset){
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		(type===void 0)&& (type="repeat");
		if (!tex)return;
		var args=[tex,x,y,width,height,type,offset || Point.EMPTY,{}];
		if (!tex.loaded){
			tex.once("loaded",this,this._textureLoaded,[tex,args]);
		}
		this._saveToCmd(Render._context._fillTexture,args);
	}

	__proto._textureLoaded=function(tex,param){
		param[3]=param[3] || tex.width;
		param[4]=param[4] || tex.height;
		this._repaint();
	}

	/**
	*填充一个圆形。这是一个临时函数，以后会删除，建议用户自己实现。
	*@param x
	*@param y
	*@param tex
	*@param cx 圆心位置。
	*@param cy
	*@param radius
	*@param segNum 分段数，越大越平滑。
	*/
	__proto.fillCircle=function(x,y,tex,cx,cy,radius,segNum){
		tex.bitmap.enableMerageInAtlas=false;
		var verts=new Float32Array((segNum+1)*2);
		var uvs=new Float32Array((segNum+1)*2);
		var indices=new Uint16Array(segNum*3);
		var dang=2 *Math.PI / segNum;
		var cang=0;
		verts[0]=cx;
		verts[1]=cy;
		uvs[0]=cx / tex.width;
		uvs[1]=cy / tex.height;
		var idx=2;
		for (var i=0;i < segNum;i++){
			var px=radius *Math.cos(cang)+cx;
			var py=radius *Math.sin(cang)+cy;
			verts[idx]=px;
			verts[idx+1]=py;
			uvs[idx]=px / tex.width;
			uvs[idx+1]=py / tex.height;
			cang+=dang;
			idx+=2;
		}
		idx=0;
		for (i=0;i < segNum;i++){
			indices[idx++]=0;
			indices[idx++]=i+1;
			indices[idx++]=(i+2 >=segNum+1)?1:(i+2);
		}
		this.drawTriangles(tex,x,y,verts,uvs,indices);
	}

	/**
	*绘制一组三角形
	*@param texture 纹理。
	*@param x X轴偏移量。
	*@param y Y轴偏移量。
	*@param vertices 顶点数组。
	*@param indices 顶点索引。
	*@param uvData UV数据。
	*@param matrix 缩放矩阵。
	*@param alpha alpha
	*@param color 颜色变换
	*@param blendMode blend模式
	*/
	__proto.drawTriangles=function(texture,x,y,vertices,uvs,indices,matrix,alpha,color,blendMode){
		(alpha===void 0)&& (alpha=1);
		this._saveToCmd(Render._context.drawTriangles,[texture,x,y,vertices,uvs,indices,matrix,alpha,color,blendMode]);
	}

	/**
	*@private
	*保存到命令流。
	*/
	__proto._saveToCmd=function(fun,args){
		this._sp && (this._sp._renderType |=0x200);
		if (this._one==null){
			this._one=args;
			this._render=this._renderOne;
			}else {
			this._sp && (this._sp._renderType &=~0x01);
			this._render=this._renderAll;
			(this._cmds || (this._cmds=[])).length===0 && this._cmds.push(this._one);
			this._cmds.push(args);
		}
		args.callee=fun;
		this._repaint();
		return args;
	}

	/**
	*设置剪裁区域，超出剪裁区域的坐标不显示。
	*@param x X 轴偏移量。
	*@param y Y 轴偏移量。
	*@param width 宽度。
	*@param height 高度。
	*/
	__proto.clipRect=function(x,y,width,height){
		this._saveToCmd(Render._context._clipRect,[x,y,width,height]);
	}

	/**
	*在画布上绘制文本。
	*@param text 在画布上输出的文本。
	*@param x 开始绘制文本的 x 坐标位置（相对于画布）。
	*@param y 开始绘制文本的 y 坐标位置（相对于画布）。
	*@param font 定义字号和字体，比如"20px Arial"。
	*@param color 定义文本颜色，比如"#ff0000"。
	*@param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
	*/
	__proto.fillText=function(text,x,y,font,color,textAlign,underLine){
		(underLine===void 0)&& (underLine=0);
		this._saveToCmd(Render._context._fillText,[text,x,y,font || Font.defaultFont,color,textAlign]);
	}

	/**
	*在画布上绘制“被填充且镶边的”文本。
	*@param text 在画布上输出的文本。
	*@param x 开始绘制文本的 x 坐标位置（相对于画布）。
	*@param y 开始绘制文本的 y 坐标位置（相对于画布）。
	*@param font 定义字体和字号，比如"20px Arial"。
	*@param fillColor 定义文本颜色，比如"#ff0000"。
	*@param borderColor 定义镶边文本颜色。
	*@param lineWidth 镶边线条宽度。
	*@param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
	*/
	__proto.fillBorderText=function(text,x,y,font,fillColor,borderColor,lineWidth,textAlign){
		this._saveToCmd(Render._context._fillBorderText,[text,x,y,font || Font.defaultFont,fillColor,borderColor,lineWidth,textAlign]);
	}

	/**
	*在画布上绘制文本（没有填色）。文本的默认颜色是黑色。
	*@param text 在画布上输出的文本。
	*@param x 开始绘制文本的 x 坐标位置（相对于画布）。
	*@param y 开始绘制文本的 y 坐标位置（相对于画布）。
	*@param font 定义字体和字号，比如"20px Arial"。
	*@param color 定义文本颜色，比如"#ff0000"。
	*@param lineWidth 线条宽度。
	*@param textAlign 文本对齐方式，可选值："left"，"center"，"right"。
	*/
	__proto.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
		this._saveToCmd(Render._context._strokeText,[text,x,y,font || Font.defaultFont,color,lineWidth,textAlign]);
	}

	/**
	*设置透明度。
	*@param value 透明度。
	*/
	__proto.alpha=function(value){
		value=value < 0 ? 0 :(value > 1 ? 1 :value);
		this._saveToCmd(Render._context._alpha,[value]);
	}

	/**
	*设置当前透明度。
	*@param value 透明度。
	*/
	__proto.setAlpha=function(value){
		value=value < 0 ? 0 :(value > 1 ? 1 :value);
		this._saveToCmd(Render._context._setAlpha,[value]);
	}

	/**
	*替换绘图的当前转换矩阵。
	*@param mat 矩阵。
	*@param pivotX （可选）水平方向轴心点坐标。
	*@param pivotY （可选）垂直方向轴心点坐标。
	*/
	__proto.transform=function(matrix,pivotX,pivotY){
		(pivotX===void 0)&& (pivotX=0);
		(pivotY===void 0)&& (pivotY=0);
		this._saveToCmd(Render._context._transform,[matrix,pivotX,pivotY]);
	}

	/**
	*旋转当前绘图。(推荐使用transform，性能更高)
	*@param angle 旋转角度，以弧度计。
	*@param pivotX （可选）水平方向轴心点坐标。
	*@param pivotY （可选）垂直方向轴心点坐标。
	*/
	__proto.rotate=function(angle,pivotX,pivotY){
		(pivotX===void 0)&& (pivotX=0);
		(pivotY===void 0)&& (pivotY=0);
		this._saveToCmd(Render._context._rotate,[angle,pivotX,pivotY]);
	}

	/**
	*缩放当前绘图至更大或更小。(推荐使用transform，性能更高)
	*@param scaleX 水平方向缩放值。
	*@param scaleY 垂直方向缩放值。
	*@param pivotX （可选）水平方向轴心点坐标。
	*@param pivotY （可选）垂直方向轴心点坐标。
	*/
	__proto.scale=function(scaleX,scaleY,pivotX,pivotY){
		(pivotX===void 0)&& (pivotX=0);
		(pivotY===void 0)&& (pivotY=0);
		this._saveToCmd(Render._context._scale,[scaleX,scaleY,pivotX,pivotY]);
	}

	/**
	*重新映射画布上的 (0,0)位置。
	*@param x 添加到水平坐标（x）上的值。
	*@param y 添加到垂直坐标（y）上的值。
	*/
	__proto.translate=function(x,y){
		this._saveToCmd(Render._context._translate,[x,y]);
	}

	/**
	*保存当前环境的状态。
	*/
	__proto.save=function(){
		this._saveToCmd(Render._context._save,[]);
	}

	/**
	*返回之前保存过的路径状态和属性。
	*/
	__proto.restore=function(){
		this._saveToCmd(Render._context._restore,[]);
	}

	/**
	*@private
	*替换文本内容。
	*@param text 文本内容。
	*@return 替换成功则值为true，否则值为flase。
	*/
	__proto.replaceText=function(text){
		this._repaint();
		var cmds=this._cmds;
		if (!cmds){
			if (this._one && this._isTextCmd(this._one.callee)){
				if (this._one[0].toUpperCase)this._one[0]=text;
				else this._one[0].setText(text);
				return true;
			}
			}else {
			for (var i=cmds.length-1;i >-1;i--){
				if (this._isTextCmd(cmds[i].callee)){
					if (cmds[i][0].toUpperCase)cmds[i][0]=text;
					else cmds[i][0].setText(text);
					return true;
				}
			}
		}
		return false;
	}

	/**@private */
	__proto._isTextCmd=function(fun){
		return fun===Render._context._fillText || fun===Render._context._fillBorderText || fun===Render._context._strokeText;
	}

	/**
	*@private
	*替换文本颜色。
	*@param color 颜色。
	*/
	__proto.replaceTextColor=function(color){
		this._repaint();
		var cmds=this._cmds;
		if (!cmds){
			if (this._one && this._isTextCmd(this._one.callee)){
				this._one[4]=color;
				if (!this._one[0].toUpperCase)this._one[0].changed=true;
			}
			}else {
			for (var i=cmds.length-1;i >-1;i--){
				if (this._isTextCmd(cmds[i].callee)){
					cmds[i][4]=color;
					if (!cmds[i][0].toUpperCase)cmds[i][0].changed=true;
				}
			}
		}
	}

	/**
	*加载并显示一个图片。
	*@param url 图片地址。
	*@param x （可选）显示图片的x位置。
	*@param y （可选）显示图片的y位置。
	*@param width （可选）显示图片的宽度，设置为0表示使用图片默认宽度。
	*@param height （可选）显示图片的高度，设置为0表示使用图片默认高度。
	*@param complete （可选）加载完成回调。
	*/
	__proto.loadImage=function(url,x,y,width,height,complete){
		var _$this=this;
		(x===void 0)&& (x=0);
		(y===void 0)&& (y=0);
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		var tex=Loader.getRes(url);
		if (tex)onloaded(tex);
		else Laya.loader.load(url,Handler.create(null,onloaded),null,"image");
		function onloaded (tex){
			if (tex){
				_$this.drawTexture(tex,x,y,width,height);
				if (complete !=null)complete.call(_$this._sp,tex);
			}
		}
	}

	/**
	*@private
	*/
	__proto._renderEmpty=function(sprite,context,x,y){}
	/**
	*@private
	*/
	__proto._renderAll=function(sprite,context,x,y){
		var cmds=this._cmds,cmd;
		for (var i=0,n=cmds.length;i < n;i++){
			(cmd=cmds[i]).callee.call(context,x,y,cmd);
		}
	}

	/**
	*@private
	*/
	__proto._renderOne=function(sprite,context,x,y){
		this._one.callee.call(context,x,y,this._one);
	}

	/**
	*@private
	*/
	__proto._renderOneImg=function(sprite,context,x,y){
		this._one.callee.call(context,x,y,this._one);
		if (sprite._renderType!==2305){
			sprite._renderType |=0x01;
		}
	}

	/**
	*绘制一条线。
	*@param fromX X轴开始位置。
	*@param fromY Y轴开始位置。
	*@param toX X轴结束位置。
	*@param toY Y轴结束位置。
	*@param lineColor 颜色。
	*@param lineWidth （可选）线条宽度。
	*/
	__proto.drawLine=function(fromX,fromY,toX,toY,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var tId=0;
		if (Render.isWebGL){
			tId=VectorGraphManager.getInstance().getId();
			if (this._vectorgraphArray==null)this._vectorgraphArray=[];
			this._vectorgraphArray.push(tId);
		};
		var offset=lineWidth % 2===0 ? 0 :0.5;
		var arr=[fromX+offset,fromY+offset,toX+offset,toY+offset,lineColor,lineWidth,tId];
		this._saveToCmd(Render._context._drawLine,arr);
	}

	/**
	*绘制一系列线段。
	*@param x 开始绘制的X轴位置。
	*@param y 开始绘制的Y轴位置。
	*@param points 线段的点集合。格式:[x1,y1,x2,y2,x3,y3...]。
	*@param lineColor 线段颜色，或者填充绘图的渐变对象。
	*@param lineWidth （可选）线段宽度。
	*/
	__proto.drawLines=function(x,y,points,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var tId=0;
		if (!points || points.length < 4)return;
		if (Render.isWebGL){
			tId=VectorGraphManager.getInstance().getId();
			if (this._vectorgraphArray==null)this._vectorgraphArray=[];
			this._vectorgraphArray.push(tId);
		};
		var offset=lineWidth % 2===0 ? 0 :0.5;
		var arr=[x+offset,y+offset,points,lineColor,lineWidth,tId];
		this._saveToCmd(Render._context._drawLines,arr);
	}

	/**
	*绘制一系列曲线。
	*@param x 开始绘制的 X 轴位置。
	*@param y 开始绘制的 Y 轴位置。
	*@param points 线段的点集合，格式[startx,starty,ctrx,ctry,startx,starty...]。
	*@param lineColor 线段颜色，或者填充绘图的渐变对象。
	*@param lineWidth （可选）线段宽度。
	*/
	__proto.drawCurves=function(x,y,points,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var arr=[x,y,points,lineColor,lineWidth];
		this._saveToCmd(Render._context._drawCurves,arr);
	}

	/**
	*绘制矩形。
	*@param x 开始绘制的 X 轴位置。
	*@param y 开始绘制的 Y 轴位置。
	*@param width 矩形宽度。
	*@param height 矩形高度。
	*@param fillColor 填充颜色，或者填充绘图的渐变对象。
	*@param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
	*@param lineWidth （可选）边框宽度。
	*/
	__proto.drawRect=function(x,y,width,height,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var offset=lineColor ? lineWidth / 2 :0;
		var lineOffset=lineColor ? lineWidth :0;
		var arr=[x+offset,y+offset,width-lineOffset,height-lineOffset,fillColor,lineColor,lineWidth];
		this._saveToCmd(Render._context._drawRect,arr);
	}

	/**
	*绘制圆形。
	*@param x 圆点X 轴位置。
	*@param y 圆点Y 轴位置。
	*@param radius 半径。
	*@param fillColor 填充颜色，或者填充绘图的渐变对象。
	*@param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
	*@param lineWidth （可选）边框宽度。
	*/
	__proto.drawCircle=function(x,y,radius,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var offset=lineColor ? lineWidth / 2 :0;
		var tId=0;
		if (Render.isWebGL){
			tId=VectorGraphManager.getInstance().getId();
			if (this._vectorgraphArray==null)this._vectorgraphArray=[];
			this._vectorgraphArray.push(tId);
		};
		var arr=[x,y,radius-offset,fillColor,lineColor,lineWidth,tId];
		this._saveToCmd(Render._context._drawCircle,arr);
	}

	/**
	*绘制扇形。
	*@param x 开始绘制的 X 轴位置。
	*@param y 开始绘制的 Y 轴位置。
	*@param radius 扇形半径。
	*@param startAngle 开始角度。
	*@param endAngle 结束角度。
	*@param fillColor 填充颜色，或者填充绘图的渐变对象。
	*@param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
	*@param lineWidth （可选）边框宽度。
	*/
	__proto.drawPie=function(x,y,radius,startAngle,endAngle,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var offset=lineColor ? lineWidth / 2 :0;
		var lineOffset=lineColor ? lineWidth :0;
		var tId=0;
		if (Render.isWebGL){
			tId=VectorGraphManager.getInstance().getId();
			if (this._vectorgraphArray==null)this._vectorgraphArray=[];
			this._vectorgraphArray.push(tId);
		};
		var arr=[x+offset,y+offset,radius-lineOffset,startAngle,endAngle,fillColor,lineColor,lineWidth,tId];
		arr[3]=Utils.toRadian(startAngle);
		arr[4]=Utils.toRadian(endAngle);
		this._saveToCmd(Render._context._drawPie,arr);
	}

	/**
	*绘制多边形。
	*@param x 开始绘制的 X 轴位置。
	*@param y 开始绘制的 Y 轴位置。
	*@param points 多边形的点集合。
	*@param fillColor 填充颜色，或者填充绘图的渐变对象。
	*@param lineColor （可选）边框颜色，或者填充绘图的渐变对象。
	*@param lineWidth （可选）边框宽度。
	*/
	__proto.drawPoly=function(x,y,points,fillColor,lineColor,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var tId=0;
		var tIsConvexPolygon=false;
		if (Render.isWebGL){
			tId=VectorGraphManager.getInstance().getId();
			if (this._vectorgraphArray==null)this._vectorgraphArray=[];
			this._vectorgraphArray.push(tId);
			if (points.length > 6){
				tIsConvexPolygon=false;
				}else {
				tIsConvexPolygon=true;
			}
		};
		var offset=lineColor ? (lineWidth % 2===0 ? 0 :0.5):0;
		var arr=[x+offset,y+offset,points,fillColor,lineColor,lineWidth,tId,tIsConvexPolygon];
		this._saveToCmd(Render._context._drawPoly,arr);
	}

	/**
	*绘制路径。
	*@param x 开始绘制的 X 轴位置。
	*@param y 开始绘制的 Y 轴位置。
	*@param paths 路径集合，路径支持以下格式：[["moveTo",x,y],["lineTo",x,y,x,y,x,y],["arcTo",x1,y1,x2,y2,r],["closePath"]]。
	*@param brush （可选）刷子定义，支持以下设置{fillStyle}。
	*@param pen （可选）画笔定义，支持以下设置{strokeStyle,lineWidth,lineJoin,lineCap,miterLimit}。
	*/
	__proto.drawPath=function(x,y,paths,brush,pen){
		var arr=[x,y,paths,brush,pen];
		this._saveToCmd(Render._context._drawPath,arr);
	}

	/**
	*@private
	*命令流。存储了所有绘制命令。
	*/
	__getset(0,__proto,'cmds',function(){
		return this._cmds;
		},function(value){
		this._sp && (this._sp._renderType |=0x200);
		this._cmds=value;
		this._render=this._renderAll;
		this._repaint();
	});

	Graphics.__init__=function(){
		if (Render.isConchNode){
			var from=laya.display.Graphics.prototype;
			var to=Browser.window.ConchGraphics.prototype;
			var list=["clear","destroy","alpha","rotate","transform","scale","translate","save","restore","clipRect","blendMode","fillText","fillBorderText","_fands","drawRect","drawCircle","drawPie","drawPoly","drawPath","drawImageM","drawLine","drawLines","_drawPs","drawCurves","replaceText","replaceTextColor","_fillImage","fillTexture","setSkinMesh","drawParticle","drawImageS"];
			for (var i=0,len=list.length;i <=len;i++){
				var temp=list[i];
				from[temp]=to[temp];
			}
			from._saveToCmd=null;
			if (to.drawImageS){
				from.drawTextures=function (tex,pos){
					if (!tex)return;
					if (!(tex.loaded && tex.bitmap && tex.source)){
						return;
					};
					var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
					this.drawImageS(tex.bitmap.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,tex.offsetX,tex.offsetY,tex.width,tex.height,pos);
				}
			}
			from.drawTexture=function (tex,x,y,width,height,m,alpha){
				(x===void 0)&& (x=0);
				(y===void 0)&& (y=0);
				(width===void 0)&& (width=0);
				(height===void 0)&& (height=0);
				(alpha===void 0)&& (alpha=1);
				if (!tex)return;
				if (!tex.loaded){
					tex.once("loaded",this,function(){
						this.drawTexture(tex,x,y,width,height,m);
					});
					return;
				}
				if (!(tex.loaded && tex.bitmap && tex.source)){
					return;
				}
				if (!width)width=tex.sourceWidth;
				if (!height)height=tex.sourceHeight;
				alpha=alpha < 0 ? 0 :(alpha > 1 ? 1 :alpha);
				width=width-tex.sourceWidth+tex.width;
				height=height-tex.sourceHeight+tex.height;
				if (width <=0 || height <=0)return;
				x+=tex.offsetX;
				y+=tex.offsetY;
				var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
				if (uv[4] < uv[0] && uv[5] < uv[1]){
					this.drawImageM(tex.bitmap.source,uv[4] *w,uv[5] *h,(uv[0]-uv[4])*w,(uv[1]-uv[5])*h,x,y,width,height,m,alpha);
				}
				else {
					this.drawImageM(tex.bitmap.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x,y,width,height,m,alpha);
				}
				this._repaint();
			}
			from.fillTexture=function (tex,x,y,width,height,type,offset){
				(width===void 0)&& (width=0);
				(height===void 0)&& (height=0);
				(type===void 0)&& (type="repeat");
				if (!tex)return;
				if (tex.loaded){
					var ctxi=Render._context.ctx;
					var w=tex.bitmap.width,h=tex.bitmap.height,uv=tex.uv;
					var pat;
					if (tex.uv !=Texture.DEF_UV){
						pat=ctxi.createPattern(tex.bitmap.source,type,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h);
						}else {
						pat=ctxi.createPattern(tex.bitmap.source,type);
					};
					var sX=0,sY=0;
					if (offset){
						x+=offset.x % tex.width;
						y+=offset.y % tex.height;
						sX-=offset.x % tex.width;
						sY-=offset.y % tex.height;
					}
					this._fillImage(pat,x,y,sX,sY,width,height);
				}
			}
		}
	}

	Graphics._cache=[];
	return Graphics;
})()


/**
*<code>Event</code> 是事件类型的集合。一般当发生事件时，<code>Event</code> 对象将作为参数传递给事件侦听器。
*/
//class laya.events.Event
var Event=(function(){
	function Event(){
		/**事件类型。*/
		//this.type=null;
		/**原生浏览器事件。*/
		//this.nativeEvent=null;
		/**事件目标触发对象。*/
		//this.target=null;
		/**事件当前冒泡对象。*/
		//this.currentTarget=null;
		/**@private */
		//this._stoped=false;
		/**分配给触摸点的唯一标识号（作为 int）。*/
		//this.touchId=0;
		/**键盘值*/
		//this.keyCode=0;
		/**滚轮滑动增量*/
		//this.delta=0;
	}

	__class(Event,'laya.events.Event');
	var __proto=Event.prototype;
	/**
	*设置事件数据。
	*@param type 事件类型。
	*@param currentTarget 事件目标触发对象。
	*@param target 事件当前冒泡对象。
	*@return 返回当前 Event 对象。
	*/
	__proto.setTo=function(type,currentTarget,target){
		this.type=type;
		this.currentTarget=currentTarget;
		this.target=target;
		return this;
	}

	/**
	*阻止对事件流中当前节点的后续节点中的所有事件侦听器进行处理。此方法不会影响当前节点 (currentTarget)中的任何事件侦听器。
	*/
	__proto.stopPropagation=function(){
		this._stoped=true;
	}

	/**鼠标在 Stage 上的 Y 轴坐标*/
	__getset(0,__proto,'stageY',function(){
		return Laya.stage.mouseY;
	});

	/**鼠标在 Stage 上的 X 轴坐标*/
	__getset(0,__proto,'stageX',function(){
		return Laya.stage.mouseX;
	});

	/**
	*表示键在键盘上的位置。这对于区分在键盘上多次出现的键非常有用。<br>
	*例如，您可以根据此属性的值来区分左 Shift 键和右 Shift 键：左 Shift 键的值为 KeyLocation.LEFT，右 Shift 键的值为 KeyLocation.RIGHT。另一个示例是区分标准键盘 (KeyLocation.STANDARD)与数字键盘 (KeyLocation.NUM_PAD)上按下的数字键。
	*/
	__getset(0,__proto,'keyLocation',function(){
		return this.nativeEvent.keyLocation;
	});

	/**
	*包含按下或释放的键的字符代码值。字符代码值为英文键盘值。
	*/
	__getset(0,__proto,'charCode',function(){
		return this.nativeEvent.charCode;
	});

	/**
	*表示 Shift 键是处于活动状态 (true)还是非活动状态 (false)。
	*/
	__getset(0,__proto,'shiftKey',function(){
		return this.nativeEvent.shiftKey;
	});

	/**
	*表示 Ctrl 键是处于活动状态 (true)还是非活动状态 (false)。
	*/
	__getset(0,__proto,'ctrlKey',function(){
		return this.nativeEvent.ctrlKey;
	});

	/**
	*表示 Alt 键是处于活动状态 (true)还是非活动状态 (false)。
	*/
	__getset(0,__proto,'altKey',function(){
		return this.nativeEvent.altKey;
	});

	/**
	*触摸点列表。
	*/
	__getset(0,__proto,'touches',function(){
		var arr=this.nativeEvent.touches;
		if (arr){
			var stage=Laya.stage;
			for (var i=0,n=arr.length;i < n;i++){
				var e=arr[i];
				var point=Point.TEMP;
				point.setTo(e.clientX,e.clientY);
				stage._canvasTransform.invertTransformPoint(point);
				stage.transform.invertTransformPoint(point);
				e.stageX=point.x;
				e.stageY=point.y;
			}
		}
		return arr;
	});

	Event.EMPTY=new Event();
	Event.MOUSE_DOWN="mousedown";
	Event.MOUSE_UP="mouseup";
	Event.CLICK="click";
	Event.RIGHT_MOUSE_DOWN="rightmousedown";
	Event.RIGHT_MOUSE_UP="rightmouseup";
	Event.RIGHT_CLICK="rightclick";
	Event.MOUSE_MOVE="mousemove";
	Event.MOUSE_OVER="mouseover";
	Event.MOUSE_OUT="mouseout";
	Event.MOUSE_WHEEL="mousewheel";
	Event.ROLL_OVER="mouseover";
	Event.ROLL_OUT="mouseout";
	Event.DOUBLE_CLICK="doubleclick";
	Event.CHANGE="change";
	Event.CHANGED="changed";
	Event.RESIZE="resize";
	Event.ADDED="added";
	Event.REMOVED="removed";
	Event.DISPLAY="display";
	Event.UNDISPLAY="undisplay";
	Event.ERROR="error";
	Event.COMPLETE="complete";
	Event.LOADED="loaded";
	Event.PROGRESS="progress";
	Event.INPUT="input";
	Event.RENDER="render";
	Event.OPEN="open";
	Event.MESSAGE="message";
	Event.CLOSE="close";
	Event.KEY_DOWN="keydown";
	Event.KEY_PRESS="keypress";
	Event.KEY_UP="keyup";
	Event.FRAME="enterframe";
	Event.DRAG_START="dragstart";
	Event.DRAG_MOVE="dragmove";
	Event.DRAG_END="dragend";
	Event.ENTER="enter";
	Event.SELECT="select";
	Event.BLUR="blur";
	Event.FOCUS="focus";
	Event.VISIBILITY_CHANGE="visibilitychange";
	Event.FOCUS_CHANGE="focuschange";
	Event.PLAYED="played";
	Event.PAUSED="paused";
	Event.STOPPED="stopped";
	Event.START="start";
	Event.END="end";
	Event.ENABLE_CHANGED="enablechanged";
	Event.ACTIVE_IN_HIERARCHY_CHANGED="activeinhierarchychanged";
	Event.COMPONENT_ADDED="componentadded";
	Event.COMPONENT_REMOVED="componentremoved";
	Event.LAYER_CHANGED="layerchanged";
	Event.HIERARCHY_LOADED="hierarchyloaded";
	Event.RECOVERED="recovered";
	Event.RELEASED="released";
	Event.LINK="link";
	Event.LABEL="label";
	Event.FULL_SCREEN_CHANGE="fullscreenchange";
	Event.DEVICE_LOST="devicelost";
	Event.MESH_CHANGED="meshchanged";
	Event.MATERIAL_CHANGED="materialchanged";
	Event.WORLDMATRIX_NEEDCHANGE="worldmatrixneedchanged";
	Event.ANIMATION_CHANGED="animationchanged";
	Event.TRIGGER_ENTER="triggerenter";
	Event.TRIGGER_STAY="triggerstay";
	Event.TRIGGER_EXIT="triggerexit";
	Event.TRAIL_FILTER_CHANGE="trailfilterchange";
	Event.DOMINO_FILTER_CHANGE="dominofilterchange";
	return Event;
})()


/**
*<p> <code>URL</code> 类用于定义地址信息。</p>
*/
//class laya.net.URL
var URL=(function(){
	function URL(url){
		/**@private */
		this._url=null;
		/**@private */
		this._path=null;
		this._url=URL.formatURL(url);
		this._path=URL.getPath(url);
	}

	__class(URL,'laya.net.URL');
	var __proto=URL.prototype;
	/**地址的路径。*/
	__getset(0,__proto,'path',function(){
		return this._path;
	});

	/**格式化后的地址。*/
	__getset(0,__proto,'url',function(){
		return this._url;
	});

	URL.formatURL=function(url,base){
		if (!url)return "null path";
		if (url.indexOf(":")> 0)return url;
		if (URL.customFormat !=null)url=URL.customFormat(url,base);
		var char1=url.charAt(0);
		if (char1==="."){
			return URL.formatRelativePath((base || URL.basePath)+url);
			}else if (char1==='~'){
			return URL.rootPath+url.substring(1);
			}else if (char1==="d"){
			if (url.indexOf("data:image")===0)return url;
			}else if (char1==="/"){
			return url;
		}
		return (base || URL.basePath)+url;
	}

	URL.formatRelativePath=function(value){
		var parts=value.split("/");
		for (var i=0,len=parts.length;i < len;i++){
			if (parts[i]=='..'){
				parts.splice(i-1,2);
				i-=2;
			}
		}
		return parts.join('/');
	}

	URL.isAbsolute=function(url){
		return url.indexOf(":")> 0 || url.charAt(0)=='/';
	}

	URL.getPath=function(url){
		var ofs=url.lastIndexOf('/');
		return ofs > 0 ? url.substr(0,ofs+1):"";
	}

	URL.getFileName=function(url){
		var ofs=url.lastIndexOf('/');
		return ofs > 0 ? url.substr(ofs+1):url;
	}

	URL.version={};
	URL.basePath="";
	URL.rootPath="";
	URL.customFormat=function(url){
		var newUrl=URL.version[url];
		if (!Render.isConchApp && newUrl)url+="?v="+newUrl;
		return url;
	}

	return URL;
})()


/**
*<p> <code>LocalStorage</code> 类用于没有时间限制的数据存储。</p>
*/
//class laya.net.LocalStorage
var LocalStorage=(function(){
	var Storage;
	function LocalStorage(){}
	__class(LocalStorage,'laya.net.LocalStorage');
	LocalStorage.__init__=function(){
		if (!LocalStorage._baseClass){
			LocalStorage._baseClass=Storage;
			Storage.init();
		}
		LocalStorage.items=LocalStorage._baseClass.items;
		LocalStorage.support=LocalStorage._baseClass.support;
	}

	LocalStorage.setItem=function(key,value){
		LocalStorage._baseClass.setItem(key,value);
	}

	LocalStorage.getItem=function(key){
		return LocalStorage._baseClass.getItem(key);
	}

	LocalStorage.setJSON=function(key,value){
		LocalStorage._baseClass.setJSON(key,value);
	}

	LocalStorage.getJSON=function(key){
		return LocalStorage._baseClass.getJSON(key);
	}

	LocalStorage.removeItem=function(key){
		LocalStorage._baseClass.removeItem(key);
	}

	LocalStorage.clear=function(){
		LocalStorage._baseClass.clear();
	}

	LocalStorage._baseClass=null;
	LocalStorage.items=null;
	LocalStorage.support=false;
	LocalStorage.__init$=function(){
		//class Storage
		Storage=(function(){
			function Storage(){}
			__class(Storage,'');
			Storage.init=function(){
				try{Storage.support=true;Storage.items=window.localStorage;Storage.setItem('laya','1');Storage.removeItem('laya');}catch(e){Storage.support=false;}if(!Storage.support)console.log('LocalStorage is not supprot or browser is private mode.');
			}
			Storage.setItem=function(key,value){
				try {
					Storage.support && Storage.items.setItem(key,value);
					}catch (e){
					console.warn("set localStorage failed",e);
				}
			}
			Storage.getItem=function(key){
				return Storage.support ? Storage.items.getItem(key):null;
			}
			Storage.setJSON=function(key,value){
				try {
					Storage.support && Storage.items.setItem(key,JSON.stringify(value));
					}catch (e){
					console.warn("set localStorage failed",e);
				}
			}
			Storage.getJSON=function(key){
				return JSON.parse(Storage.support ? Storage.items.getItem(key):null);
			}
			Storage.removeItem=function(key){
				Storage.support && Storage.items.removeItem(key);
			}
			Storage.clear=function(){
				Storage.support && Storage.items.clear();
			}
			Storage.items=null;
			Storage.support=false;
			return Storage;
		})()
	}

	return LocalStorage;
})()


/**
*@private
*/
//class laya.net.TTFLoader
var TTFLoader=(function(){
	function TTFLoader(){
		this.fontName=null;
		this.complete=null;
		this.err=null;
		this._fontTxt=null;
		this._url=null;
		this._div=null;
		this._txtWidth=NaN;
		this._http=null;
	}

	__class(TTFLoader,'laya.net.TTFLoader');
	var __proto=TTFLoader.prototype;
	__proto.load=function(fontPath){
		this._url=fontPath;
		var tArr=fontPath.split(".ttf")[0].split("/");
		this.fontName=tArr[tArr.length-1];
		if (Browser.window.conch){
			this._loadConch();
		}else
		if (Browser.window.FontFace){
			this._loadWithFontFace()
		}
		else {
			this._loadWithCSS();
		}
	}

	__proto._loadConch=function(){
		this._http=new HttpRequest();
		this._http.on("error",this,this._onErr);
		this._http.on("complete",this,this._onHttpLoaded);
		this._http.send(this._url,null,"get","arraybuffer");
	}

	__proto._onHttpLoaded=function(data){
		Browser.window.conch.setFontFaceFromBuffer(this.fontName,data);
		this._clearHttp();
		this._complete();
	}

	__proto._clearHttp=function(){
		if (this._http){
			this._http.off("error",this,this._onErr);
			this._http.off("complete",this,this._onHttpLoaded);
			this._http=null;
		}
	}

	__proto._onErr=function(){
		this._clearHttp();
		if (this.err){
			this.err.runWith("fail:"+this._url);
			this.err=null;
		}
	}

	__proto._complete=function(){
		Laya.timer.clear(this,this._complete);
		Laya.timer.clear(this,this._checkComplete);
		if (this._div && this._div.parentNode){
			this._div.parentNode.removeChild(this._div);
			this._div=null;
		}
		if (this.complete){
			this.complete.runWith(this);
			this.complete=null;
		}
	}

	__proto._checkComplete=function(){
		if (RunDriver.measureText("LayaTTFFont",this._fontTxt).width !=this._txtWidth){
			this._complete();
		}
	}

	__proto._loadWithFontFace=function(){
		var fontFace=new Browser.window.FontFace(this.fontName,"url('"+this._url+"')");
		Browser.window.document.fonts.add(fontFace);
		var self=this;
		fontFace.loaded.then((function(){
			self._complete()
		}));
		fontFace.load();
	}

	__proto._createDiv=function(){
		this._div=Browser.createElement("div");
		this._div.innerHTML="laya";
		var _style=this._div.style;
		_style.fontFamily=this.fontName;
		_style.position="absolute";
		_style.left="-100px";
		_style.top="-100px";
		Browser.document.body.appendChild(this._div);
	}

	__proto._loadWithCSS=function(){
		var _$this=this;
		var fontStyle=Browser.createElement("style");
		fontStyle.type="text/css";
		Browser.document.body.appendChild(fontStyle);
		fontStyle.textContent="@font-face { font-family:'"+this.fontName+"'; src:url('"+this._url+"');}";
		this._fontTxt="40px "+this.fontName;
		this._txtWidth=RunDriver.measureText("LayaTTFFont",this._fontTxt).width;
		var self=this;
		fontStyle.onload=function (){
			Laya.timer.once(10000,self,_$this._complete);
		};
		Laya.timer.loop(20,this,this._checkComplete);
		this._createDiv();
	}

	TTFLoader._testString="LayaTTFFont";
	return TTFLoader;
})()


/**
*@private
*精灵渲染器
*/
//class laya.renders.RenderSprite
var RenderSprite=(function(){
	function RenderSprite(type,next){
		/**@private */
		//this._next=null;
		/**@private */
		//this._fun=null;
		this._next=next || RenderSprite.NORENDER;
		switch (type){
			case 0:
				this._fun=this._no;
				return;
			case 0x01:
				this._fun=this._image;
				return;
			case 0x02:
				this._fun=this._alpha;
				return;
			case 0x04:
				this._fun=this._transform;
				return;
			case 0x08:
				this._fun=this._blend;
				return;
			case 0x10:
				this._fun=this._canvas;
				return;
			case 0x40:
				this._fun=this._mask;
				return;
			case 0x80:
				this._fun=this._clip;
				return;
			case 0x100:
				this._fun=this._style;
				return;
			case 0x200:
				this._fun=this._graphics;
				return;
			case 0x800:
				this._fun=this._childs;
				return;
			case 0x400:
				this._fun=this._custom;
				return;
			case 0x01 | 0x200:
				this._fun=this._image2;
				return;
			case 0x01 | 0x04 | 0x200:
				this._fun=this._image2;
				return;
			case 0x20:
				this._fun=Filter._filter;
				return;
			case 0x11111:
				this._fun=RenderSprite._initRenderFun;
				return;
			}
		this.onCreate(type);
	}

	__class(RenderSprite,'laya.renders.RenderSprite');
	var __proto=RenderSprite.prototype;
	__proto.onCreate=function(type){}
	__proto._style=function(sprite,context,x,y){
		sprite._style.render(sprite,context,x,y);
		var next=this._next;
		next._fun.call(next,sprite,context,x,y);
	}

	__proto._no=function(sprite,context,x,y){}
	__proto._custom=function(sprite,context,x,y){
		sprite.customRender(context,x,y);
		var tf=sprite._style._tf;
		this._next._fun.call(this._next,sprite,context,x-tf.translateX,y-tf.translateY);
	}

	__proto._clip=function(sprite,context,x,y){
		var next=this._next;
		if (next==RenderSprite.NORENDER)return;
		var r=sprite._style.scrollRect;
		context.ctx.save();
		context.ctx.clipRect(x,y,r.width,r.height);
		next._fun.call(next,sprite,context,x-r.x,y-r.y);
		context.ctx.restore();
	}

	__proto._blend=function(sprite,context,x,y){
		var style=sprite._style;
		if (style.blendMode){
			context.ctx.globalCompositeOperation=style.blendMode;
		};
		var next=this._next;
		next._fun.call(next,sprite,context,x,y);
		context.ctx.globalCompositeOperation="source-over";
	}

	__proto._mask=function(sprite,context,x,y){
		var next=this._next;
		next._fun.call(next,sprite,context,x,y);
		var mask=sprite.mask;
		if (mask){
			context.ctx.globalCompositeOperation="destination-in";
			if (mask.numChildren > 0 || !mask.graphics._isOnlyOne()){
				mask.cacheAsBitmap=true;
			}
			mask.render(context,x-sprite.pivotX,y-sprite.pivotY);
		}
		context.ctx.globalCompositeOperation="source-over";
	}

	__proto._graphics=function(sprite,context,x,y){
		var tf=sprite._style._tf;
		sprite._graphics && sprite._graphics._render(sprite,context,x-tf.translateX,y-tf.translateY);
		var next=this._next;
		next._fun.call(next,sprite,context,x,y);
	}

	__proto._image=function(sprite,context,x,y){
		var style=sprite._style;
		context.ctx.drawTexture2(x,y,style._tf.translateX,style._tf.translateY,sprite.transform,style.alpha,style.blendMode,sprite._graphics._one);
	}

	__proto._image2=function(sprite,context,x,y){
		var tf=sprite._style._tf;
		context.ctx.drawTexture2(x,y,tf.translateX,tf.translateY,sprite.transform,1,null,sprite._graphics._one);
	}

	__proto._alpha=function(sprite,context,x,y){
		var style=sprite._style;
		var alpha;
		if ((alpha=style.alpha)> 0.01 || sprite._needRepaint()){
			var temp=context.ctx.globalAlpha;
			context.ctx.globalAlpha *=alpha;
			var next=this._next;
			next._fun.call(next,sprite,context,x,y);
			context.ctx.globalAlpha=temp;
		}
	}

	__proto._transform=function(sprite,context,x,y){
		var transform=sprite.transform,_next=this._next;
		if (transform && _next !=RenderSprite.NORENDER){
			context.save();
			context.transform(transform.a,transform.b,transform.c,transform.d,transform.tx+x,transform.ty+y);
			_next._fun.call(_next,sprite,context,0,0);
			context.restore();
		}else
		_next._fun.call(_next,sprite,context,x,y);
	}

	__proto._childs=function(sprite,context,x,y){
		var style=sprite._style;
		var tf=style._tf;
		x=x-tf.translateX+style.paddingLeft;
		y=y-tf.translateY+style.paddingTop;
		if (style._calculation){
			var words=sprite._getWords();
			if (words){
				var tStyle=style;
				if (tStyle){
					if (tStyle.stroke){
						context.fillBorderWords(words,x,y,tStyle.font,tStyle.color,tStyle.strokeColor,tStyle.stroke);
						}else{
						context.fillWords(words,x,y,tStyle.font,tStyle.color,(tStyle.textDecoration!="none"&&tStyle.underLine)?1:0);
					}
				}
			}
		};
		var childs=sprite._childs,n=childs.length,ele;
		if (sprite.viewport || (sprite.optimizeScrollRect && sprite._style.scrollRect)){
			var rect=sprite.viewport || sprite._style.scrollRect;
			var left=rect.x;
			var top=rect.y;
			var right=rect.right;
			var bottom=rect.bottom;
			var _x=NaN,_y=NaN;
			for (i=0;i < n;++i){
				if ((ele=childs [i]).visible && ((_x=ele._x)< right && (_x+ele.width)> left && (_y=ele._y)< bottom && (_y+ele.height)> top)){
					ele.render(context,x,y);
				}
			}
			}else {
			for (var i=0;i < n;++i)
			(ele=(childs [i]))._style.visible && ele.render(context,x,y);
		}
	}

	//}
	__proto._canvas=function(sprite,context,x,y){
		var _cacheCanvas=sprite._$P.cacheCanvas;
		if (!_cacheCanvas){
			this._next._fun.call(this._next,sprite,context,x,y);
			return;
		}
		_cacheCanvas.type==='bitmap' ? (Stat.canvasBitmap++):(Stat.canvasNormal++);
		var tx=_cacheCanvas.ctx;
		if (sprite._needRepaint()|| !tx){
			this._canvas_repaint(sprite,context,x,y);
		}
		else{
			var tRec=_cacheCanvas._cacheRec;
			context.drawCanvas(tx.canvas,x+tRec.x,y+tRec.y,tRec.width,tRec.height);
		}
	}

	__proto._canvas_repaint=function(sprite,context,x,y){
		var _cacheCanvas=sprite._$P.cacheCanvas;
		var _next=this._next;
		if (!_cacheCanvas){
			_next._fun.call(_next,sprite,tx,x,y);
			return;
		};
		var tx=_cacheCanvas.ctx;
		var _repaint=sprite._needRepaint()|| (!tx);
		var canvas;
		var left;
		var top;
		var tRec;
		var tCacheType=_cacheCanvas.type;
		tCacheType==='bitmap' ? (Stat.canvasBitmap++):(Stat.canvasNormal++);
		if (_repaint){
			if (!_cacheCanvas._cacheRec)
				_cacheCanvas._cacheRec=new Rectangle();
			var w,h;
			if (!Render.isWebGL || tCacheType==="bitmap"){
				tRec=sprite.getSelfBounds();
				tRec.x=tRec.x-sprite.pivotX;
				tRec.y=tRec.y-sprite.pivotY;
				tRec.x=tRec.x-16;
				tRec.y=tRec.y-16;
				tRec.width=tRec.width+32;
				tRec.height=tRec.height+32;
				tRec.x=Math.floor(tRec.x+x)-x;
				tRec.y=Math.floor(tRec.y+y)-y;
				tRec.width=Math.floor(tRec.width);
				tRec.height=Math.floor(tRec.height);
				_cacheCanvas._cacheRec.copyFrom(tRec);
				}else{
				_cacheCanvas._cacheRec.setTo(-sprite.pivotX,-sprite.pivotY,1,1);
			}
			tRec=_cacheCanvas._cacheRec;
			var scaleX=Render.isWebGL ? 1 :Browser.pixelRatio *Laya.stage.clientScaleX;
			var scaleY=Render.isWebGL ? 1 :Browser.pixelRatio *Laya.stage.clientScaleY;
			if (!Render.isWebGL){
				var chainScaleX=1;
				var chainScaleY=1;
				var tar;
				tar=sprite;
				while (tar && tar !=Laya.stage){
					chainScaleX *=tar.scaleX;
					chainScaleY *=tar.scaleY;
					tar=tar.parent;
				}
				if (Render.isWebGL){
					if (chainScaleX < 1)scaleX *=chainScaleX;
					if (chainScaleY < 1)scaleY *=chainScaleY;
					}else {
					if (chainScaleX > 1)scaleX *=chainScaleX;
					if (chainScaleY > 1)scaleY *=chainScaleY;
				}
			}
			if (sprite.scrollRect){
				var scrollRect=sprite.scrollRect;
				tRec.x-=scrollRect.x;
				tRec.y-=scrollRect.y;
			}
			w=tRec.width *scaleX;
			h=tRec.height *scaleY;
			left=tRec.x;
			top=tRec.y;
			if (Render.isWebGL && tCacheType==='bitmap' && (w > 2048 || h > 2048)){
				console.warn("cache bitmap size larger than 2048,cache ignored");
				if (_cacheCanvas.ctx){
					Pool.recover("RenderContext",_cacheCanvas.ctx);
					_cacheCanvas.ctx.canvas.size(0,0);
					_cacheCanvas.ctx=null;
				}
				_next._fun.call(_next,sprite,context,x,y);
				return;
			}
			if (!tx){
				tx=_cacheCanvas.ctx=Pool.getItem("RenderContext")|| new RenderContext(w,h,HTMLCanvas.create("AUTO"));
			}
			tx.ctx.sprite=sprite;
			canvas=tx.canvas;
			canvas.clear();
			(canvas.width !=w || canvas.height !=h)&& canvas.size(w,h);
			if (tCacheType==='bitmap')canvas.context.asBitmap=true;
			else if(tCacheType==='normal')canvas.context.asBitmap=false;
			var t;
			if (scaleX !=1 || scaleY !=1){
				var ctx=(tx).ctx;
				ctx.save();
				ctx.scale(scaleX,scaleY);
				if (!Render.isConchWebGL && Render.isConchApp){
					t=sprite._$P.cf;
					t && ctx.setFilterMatrix && ctx.setFilterMatrix(t._mat,t._alpha);
				}
				_next._fun.call(_next,sprite,tx,-left,-top);
				ctx.restore();
				if (!Render.isConchApp || Render.isConchWebGL)sprite._applyFilters();
				}else {
				ctx=(tx).ctx;
				if (!Render.isConchWebGL && Render.isConchApp){
					t=sprite._$P.cf;
					t && ctx.setFilterMatrix && ctx.setFilterMatrix(t._mat,t._alpha);
				}
				_next._fun.call(_next,sprite,tx,-left,-top);
				if (!Render.isConchApp || Render.isConchWebGL)sprite._applyFilters();
			}
			if (sprite._$P.staticCache)_cacheCanvas.reCache=false;
			Stat.canvasReCache++;
			}else {
			tRec=_cacheCanvas._cacheRec;
			left=tRec.x;
			top=tRec.y;
			canvas=tx.canvas;
		}
		context.drawCanvas(canvas,x+left,y+top,tRec.width,tRec.height);
	}

	RenderSprite.__init__=function(){
		var i=0,len=0;
		var initRender;
		initRender=RunDriver.createRenderSprite(0x11111,null);
		len=RenderSprite.renders.length=0x800 *2;
		for (i=0;i < len;i++)
		RenderSprite.renders[i]=initRender;
		RenderSprite.renders[0]=RunDriver.createRenderSprite(0,null);
		function _initSame (value,o){
			var n=0;
			for (var i=0;i < value.length;i++){
				n |=value[i];
				RenderSprite.renders[n]=o;
			}
		}
		_initSame([0x01,0x200,0x04,0x02],new RenderSprite(0x01,null));
		RenderSprite.renders[0x01 | 0x200]=RunDriver.createRenderSprite(0x01 | 0x200,null);
		RenderSprite.renders[0x01 | 0x04 | 0x200]=new RenderSprite(0x01 | 0x04 | 0x200,null);
	}

	RenderSprite._initRenderFun=function(sprite,context,x,y){
		var type=sprite._renderType;
		var r=RenderSprite.renders[type]=RenderSprite._getTypeRender(type);
		r._fun(sprite,context,x,y);
	}

	RenderSprite._getTypeRender=function(type){
		var rst=null;
		var tType=0x800;
		while (tType > 1){
			if (tType & type)
				rst=RunDriver.createRenderSprite(tType,rst);
			tType=tType >> 1;
		}
		return rst;
	}

	RenderSprite.IMAGE=0x01;
	RenderSprite.ALPHA=0x02;
	RenderSprite.TRANSFORM=0x04;
	RenderSprite.BLEND=0x08;
	RenderSprite.CANVAS=0x10;
	RenderSprite.FILTERS=0x20;
	RenderSprite.MASK=0x40;
	RenderSprite.CLIP=0x80;
	RenderSprite.STYLE=0x100;
	RenderSprite.GRAPHICS=0x200;
	RenderSprite.CUSTOM=0x400;
	RenderSprite.CHILDS=0x800;
	RenderSprite.INIT=0x11111;
	RenderSprite.renders=[];
	RenderSprite.NORENDER=new RenderSprite(0,null);
	return RenderSprite;
})()


/**
*@private
*<code>Render</code> 是渲染管理类。它是一个单例，可以使用 Laya.render 访问。
*/
//class laya.renders.Render
var Render=(function(){
	function Render(width,height){
		/**@private */
		this._timeId=0;
		var style=Render._mainCanvas.source.style;
		style.position='absolute';
		style.top=style.left="0px";
		style.background="#000000";
		Render._mainCanvas.source.id="layaCanvas";
		var isWebGl=laya.renders.Render.isWebGL;
		Render._mainCanvas.source.width=width;
		Render._mainCanvas.source.height=height;
		isWebGl && Render.WebGL.init(Render._mainCanvas,width,height);
		Browser.container.appendChild(Render._mainCanvas.source);
		Render._context=new RenderContext(width,height,isWebGl ? null :Render._mainCanvas);
		Render._context.ctx.setIsMainContext();
		Browser.window.requestAnimationFrame(loop);
		function loop (stamp){
			Laya.stage._loop();
			Browser.window.requestAnimationFrame(loop);
		}
		Laya.stage.on("visibilitychange",this,this._onVisibilitychange);
	}

	__class(Render,'laya.renders.Render');
	var __proto=Render.prototype;
	/**@private */
	__proto._onVisibilitychange=function(){
		if (!Laya.stage.isVisibility){
			this._timeId=Browser.window.setInterval(this._enterFrame,1000);
			}else if (this._timeId !=0){
			Browser.window.clearInterval(this._timeId);
		}
	}

	/**@private */
	__proto._enterFrame=function(e){
		Laya.stage._loop();
	}

	/**渲染使用的原生画布引用。 */
	__getset(1,Render,'canvas',function(){
		return Render._mainCanvas.source;
	});

	/**目前使用的渲染器。*/
	__getset(1,Render,'context',function(){
		return Render._context;
	});

	Render._context=null;
	Render._mainCanvas=null;
	Render.WebGL=null;
	Render.isConchNode=false;
	Render.isConchApp=false;
	Render.isConchWebGL=false;
	Render.isWebGL=false;
	Render.is3DMode=false;
	Render.optimizeTextureMemory=function(url,texture){
		return true;
	}

	Render.__init$=function(){
		window.ConchRenderType=window.ConchRenderType||1;
		window.ConchRenderType|=(!window.conch?0:0x04);;{
			Render.isConchNode=(window.ConchRenderType & 5)==5;
			Render.isConchApp=(window.ConchRenderType & 0x04)==0x04;
			Render.isConchWebGL=window.ConchRenderType==6;
		};;
	}

	return Render;
})()


/**
*@private
*渲染环境
*/
//class laya.renders.RenderContext
var RenderContext=(function(){
	function RenderContext(width,height,canvas){
		/**全局x坐标 */
		this.x=0;
		/**全局y坐标 */
		this.y=0;
		/**当前使用的画布 */
		//this.canvas=null;
		/**当前使用的画布上下文 */
		//this.ctx=null;
		this._drawTexture=function(x,y,args){
			if (args[0].loaded)this.ctx.drawTexture(args[0],args[1],args[2],args[3],args[4],x,y);
		}
		this._fillTexture=function(x,y,args){
			if (args[0].loaded)this.ctx.fillTexture(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5],args[6],args[7]);
		}
		this._drawTextureWithTransform=function(x,y,args){
			if (args[0].loaded)this.ctx.drawTextureWithTransform(args[0],args[1],args[2],args[3],args[4],args[5],x,y,args[6]);
		}
		this._fillQuadrangle=function(x,y,args){
			this.ctx.fillQuadrangle(args[0],args[1],args[2],args[3],args[4]);
		}
		this._drawRect=function(x,y,args){
			var ctx=this.ctx;
			if (args[4] !=null){
				ctx.fillStyle=args[4];
				ctx.fillRect(x+args[0],y+args[1],args[2],args[3],null);
			}
			if (args[5] !=null){
				ctx.strokeStyle=args[5];
				ctx.lineWidth=args[6];
				ctx.strokeRect(x+args[0],y+args[1],args[2],args[3],args[6]);
			}
		}
		//矢量方法
		this._drawPie=function(x,y,args){
			var ctx=this.ctx;
			Render.isWebGL && ctx.setPathId(args[8]);
			ctx.beginPath();
			if (Render.isWebGL){
				ctx.movePath(args[0]+x,args[1]+y);
				ctx.moveTo(0,0);
				}else {
				ctx.moveTo(x+args[0],y+args[1]);
			}
			ctx.arc(x+args[0],y+args[1],args[2],args[3],args[4]);
			ctx.closePath();
			this._fillAndStroke(args[5],args[6],args[7],true);
		}
		this._clipRect=function(x,y,args){
			this.ctx.clipRect(x+args[0],y+args[1],args[2],args[3]);
		}
		this._fillRect=function(x,y,args){
			this.ctx.fillRect(x+args[0],y+args[1],args[2],args[3],args[4]);
		}
		this._drawCircle=function(x,y,args){
			var ctx=this.ctx;
			Render.isWebGL && ctx.setPathId(args[6]);
			Stat.drawCall++;
			ctx.beginPath();
			Render.isWebGL && ctx.movePath(args[0]+x,args[1]+y);
			ctx.arc(args[0]+x,args[1]+y,args[2],0,RenderContext.PI2);
			ctx.closePath();
			this._fillAndStroke(args[3],args[4],args[5],true);
		}
		this._fillCircle=function(x,y,args){
			Stat.drawCall++;
			var ctx=this.ctx;
			ctx.beginPath();
			ctx.fillStyle=args[3];
			ctx.arc(args[0]+x,args[1]+y,args[2],0,RenderContext.PI2);
			ctx.fill();
		}
		this._setShader=function(x,y,args){
			this.ctx.setShader(args[0]);
		}
		this._drawLine=function(x,y,args){
			var ctx=this.ctx;
			Render.isWebGL && ctx.setPathId(args[6]);
			ctx.beginPath();
			ctx.strokeStyle=args[4];
			ctx.lineWidth=args[5];
			if (Render.isWebGL){
				ctx.movePath(x,y);
				ctx.moveTo(args[0],args[1]);
				ctx.lineTo(args[2],args[3]);
				}else {
				ctx.moveTo(x+args[0],y+args[1]);
				ctx.lineTo(x+args[2],y+args[3]);
			}
			ctx.stroke();
		}
		this._drawLines=function(x,y,args){
			var ctx=this.ctx;
			Render.isWebGL && ctx.setPathId(args[5]);
			ctx.beginPath();
			x+=args[0],y+=args[1];
			Render.isWebGL && ctx.movePath(x,y);
			ctx.strokeStyle=args[3];
			ctx.lineWidth=args[4];
			var points=args[2];
			var i=2,n=points.length;
			if (Render.isWebGL){
				ctx.moveTo(points[0],points[1]);
				while (i < n){
					ctx.lineTo(points[i++],points[i++]);
				}
				}else {
				ctx.moveTo(x+points[0],y+points[1]);
				while (i < n){
					ctx.lineTo(x+points[i++],y+points[i++]);
				}
			}
			ctx.stroke();
		}
		this._drawLinesWebGL=function(x,y,args){
			this.ctx.drawLines(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4]);
		}
		//x:Number,y:Number,points:Array,lineColor:String,lineWidth:Number=1
		this._drawCurves=function(x,y,args){
			this.ctx.drawCurves(x,y,args);
		}
		this._draw=function(x,y,args){
			args[0].call(null,this,x,y);
		}
		this._transformByMatrix=function(x,y,args){
			this.ctx.transformByMatrix(args[0]);
		}
		this._setTransform=function(x,y,args){
			this.ctx.setTransform(args[0],args[1],args[2],args[3],args[4],args[5]);
		}
		this._setTransformByMatrix=function(x,y,args){
			this.ctx.setTransformByMatrix(args[0]);
		}
		this._save=function(x,y,args){
			this.ctx.save();
		}
		this._restore=function(x,y,args){
			this.ctx.restore();
		}
		this._translate=function(x,y,args){
			this.ctx.translate(args[0],args[1]);
		}
		this._transform=function(x,y,args){
			this.ctx.translate(args[1]+x,args[2]+y);
			var mat=args[0];
			this.ctx.transform(mat.a,mat.b,mat.c,mat.d,mat.tx,mat.ty);
			this.ctx.translate(-x-args[1],-y-args[2]);
		}
		this._rotate=function(x,y,args){
			this.ctx.translate(args[1]+x,args[2]+y);
			this.ctx.rotate(args[0]);
			this.ctx.translate(-x-args[1],-y-args[2]);
		}
		this._scale=function(x,y,args){
			this.ctx.translate(args[2]+x,args[3]+y);
			this.ctx.scale(args[0],args[1]);
			this.ctx.translate(-x-args[2],-y-args[3]);
		}
		this._alpha=function(x,y,args){
			this.ctx.globalAlpha *=args[0];
		}
		this._setAlpha=function(x,y,args){
			this.ctx.globalAlpha=args[0];
		}
		this._fillText=function(x,y,args){
			this.ctx.fillText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5]);
		}
		this._strokeText=function(x,y,args){
			this.ctx.strokeText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5],args[6]);
		}
		this._fillBorderText=function(x,y,args){
			this.ctx.fillBorderText(args[0],args[1]+x,args[2]+y,args[3],args[4],args[5],args[6],args[7]);
		}
		this._blendMode=function(x,y,args){
			this.ctx.globalCompositeOperation=args[0];
		}
		this._beginClip=function(x,y,args){
			this.ctx.beginClip && this.ctx.beginClip(x+args[0],y+args[1],args[2],args[3]);
		}
		this._setIBVB=function(x,y,args){
			this.ctx.setIBVB(args[0]+x,args[1]+y,args[2],args[3],args[4],args[5],args[6],args[7]);
		}
		this._fillTrangles=function(x,y,args){
			this.ctx.fillTrangles(args[0],args[1]+x,args[2]+y,args[3],args[4]);
		}
		//x:Number,y:Number,paths:Array,brush:Object=null,pen:Object=null
		this._drawPath=function(x,y,args){
			var ctx=this.ctx;
			Render.isWebGL && ctx.setPathId(-1);
			ctx.beginPath();
			x+=args[0],y+=args[1];
			Render.isWebGL && ctx.movePath(x,y);
			var paths=args[2];
			for (var i=0,n=paths.length;i < n;i++){
				var path=paths[i];
				switch (path[0]){
					case "moveTo":
						Render.isWebGL ? ctx.moveTo(path[1],path[2]):ctx.moveTo(x+path[1],y+path[2]);
						break ;
					case "lineTo":
						Render.isWebGL ? ctx.lineTo(path[1],path[2]):ctx.lineTo(x+path[1],y+path[2]);
						break ;
					case "arcTo":
						Render.isWebGL ? ctx.arcTo(path[1],path[2],path[3],path[4],path[5]):ctx.arcTo(x+path[1],y+path[2],x+path[3],y+path[4],path[5]);
						break ;
					case "closePath":
						ctx.closePath();
						break ;
					}
			};
			var brush=args[3];
			if (brush !=null){
				ctx.fillStyle=brush.fillStyle;
				ctx.fill();
			};
			var pen=args[4];
			if (pen !=null){
				ctx.strokeStyle=pen.strokeStyle;
				ctx.lineWidth=pen.lineWidth || 1;
				ctx.lineJoin=pen.lineJoin;
				ctx.lineCap=pen.lineCap;
				ctx.miterLimit=pen.miterLimit;
				ctx.stroke();
			}
		}
		// polygon(x:Number,y:Number,r:Number,edges:Number,color:uint,borderWidth:int=2,borderColor:uint=0)
		this.drawPoly=function(x,y,args){
			this.ctx.drawPoly(x+this.x+args[0],y+this.y+args[1],args[2],args[3],args[4],args[5],args[6]);
		}
		//x:Number,y:Number,points:Array,fillColor:String,lineColor:String=null,lineWidth:Number=1
		this._drawPoly=function(x,y,args){
			var ctx=this.ctx;
			var points=args[2];
			var i=2,n=points.length;
			if (Render.isWebGL){
				ctx.setPathId(args[6]);
				ctx.beginPath();
				x+=args[0],y+=args[1];
				ctx.movePath(x,y);
				ctx.moveTo(points[0],points[1]);
				while (i < n){
					ctx.lineTo(points[i++],points[i++]);
				}
				}else {
				ctx.beginPath();
				x+=args[0],y+=args[1];
				ctx.moveTo(x+points[0],y+points[1]);
				while (i < n){
					ctx.lineTo(x+points[i++],y+points[i++]);
				}
			}
			ctx.closePath();
			this._fillAndStroke(args[3],args[4],args[5],args[7]);
		}
		this._drawSkin=function(x,y,args){
			var tSprite=args[0];
			if (tSprite){
				var ctx=this.ctx;
				tSprite.render(ctx,x,y);
			}
		}
		this._drawParticle=function(x,y,args){
			this.ctx.drawParticle(x+this.x,y+this.y,args[0]);
		}
		this._setFilters=function(x,y,args){
			this.ctx.setFilters(args);
		}
		if (canvas){
			this.ctx=canvas.getContext('2d');
			}else {
			canvas=HTMLCanvas.create("3D");
			this.ctx=RunDriver.createWebGLContext2D(canvas);
			canvas._setContext(this.ctx);
		}
		canvas.size(width,height);
		this.canvas=canvas;
	}

	__class(RenderContext,'laya.renders.RenderContext');
	var __proto=RenderContext.prototype;
	/**销毁当前渲染环境*/
	__proto.destroy=function(){
		if (this.canvas){
			this.canvas.destroy();
			this.canvas=null;
			this.ctx=null;
		}
		if (this.ctx){
			this.ctx.destroy();
			this.ctx=null;
		}
	}

	__proto.drawTexture=function(tex,x,y,width,height){
		if (tex.loaded)this.ctx.drawTexture(tex,x,y,width,height,this.x,this.y);
	}

	__proto._drawTextures=function(x,y,args){
		if (args[0].loaded)this.ctx.drawTextures(args[0],args[1],x+this.x,y+this.y);
	}

	__proto.drawTextureWithTransform=function(tex,x,y,width,height,m,alpha){
		if (tex.loaded)this.ctx.drawTextureWithTransform(tex,x,y,width,height,m,this.x,this.y,alpha);
	}

	__proto.fillQuadrangle=function(tex,x,y,point4,m){
		this.ctx.fillQuadrangle(tex,x,y,point4,m);
	}

	__proto.drawCanvas=function(canvas,x,y,width,height){
		this.ctx.drawCanvas(canvas,x+this.x,y+this.y,width,height);
	}

	__proto.drawRect=function(x,y,width,height,color,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var ctx=this.ctx;
		ctx.strokeStyle=color;
		ctx.lineWidth=lineWidth;
		ctx.strokeRect(x+this.x,y+this.y,width,height,lineWidth);
	}

	__proto._fillAndStroke=function(fillColor,strokeColor,lineWidth,isConvexPolygon){
		(isConvexPolygon===void 0)&& (isConvexPolygon=false);
		var ctx=this.ctx;
		if (fillColor !=null){
			ctx.fillStyle=fillColor;
			if (Render.isWebGL){
				ctx.fill(isConvexPolygon);
				}else {
				ctx.fill();
			}
		}
		if (strokeColor !=null && lineWidth > 0){
			ctx.strokeStyle=strokeColor;
			ctx.lineWidth=lineWidth;
			ctx.stroke();
		}
	}

	//ctx.translate(-x-args[0],-y-args[1]);
	__proto.clipRect=function(x,y,width,height){
		this.ctx.clipRect(x+this.x,y+this.y,width,height);
	}

	__proto.fillRect=function(x,y,width,height,fillStyle){
		this.ctx.fillRect(x+this.x,y+this.y,width,height,fillStyle);
	}

	__proto.drawCircle=function(x,y,radius,color,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		Stat.drawCall++;
		var ctx=this.ctx;
		ctx.beginPath();
		ctx.strokeStyle=color;
		ctx.lineWidth=lineWidth;
		ctx.arc(x+this.x,y+this.y,radius,0,RenderContext.PI2);
		ctx.stroke();
	}

	/**
	*绘制三角形
	*@param x
	*@param y
	*@param tex
	*@param args [x,y,texture,vertices,indices,uvs,matrix]
	*/
	__proto.drawTriangles=function(x,y,args){
		if (Render.isWebGL){
			this.ctx.drawTriangles(args[0],x+args[1],y+args[2],args[3],args[4],args[5],args[6],args[7],args[8],args[9]);
			}else {
			var indices=args[5];
			var i=0,len=indices.length;
			var ctx=this.ctx;
			for (i=0;i < len;i+=3){
				var index0=indices[i] *2;
				var index1=indices[i+1] *2;
				var index2=indices[i+2] *2;
				ctx.drawTriangle(args[0],args[3],args[4],index0,index1,index2,args[6],true);
			}
		}
	}

	__proto.fillCircle=function(x,y,radius,color){
		Stat.drawCall++;
		var ctx=this.ctx;
		ctx.beginPath();
		ctx.fillStyle=color;
		ctx.arc(x+this.x,y+this.y,radius,0,RenderContext.PI2);
		ctx.fill();
	}

	__proto.setShader=function(shader){
		this.ctx.setShader(shader);
	}

	__proto.drawLine=function(fromX,fromY,toX,toY,color,lineWidth){
		(lineWidth===void 0)&& (lineWidth=1);
		var ctx=this.ctx;
		ctx.beginPath();
		ctx.strokeStyle=color;
		ctx.lineWidth=lineWidth;
		ctx.moveTo(this.x+fromX,this.y+fromY);
		ctx.lineTo(this.x+toX,this.y+toY);
		ctx.stroke();
	}

	__proto.clear=function(){
		this.ctx.clear();
	}

	__proto.transformByMatrix=function(value){
		this.ctx.transformByMatrix(value);
	}

	__proto.setTransform=function(a,b,c,d,tx,ty){
		this.ctx.setTransform(a,b,c,d,tx,ty);
	}

	__proto.setTransformByMatrix=function(value){
		this.ctx.setTransformByMatrix(value);
	}

	__proto.save=function(){
		this.ctx.save();
	}

	__proto.restore=function(){
		this.ctx.restore();
	}

	__proto.translate=function(x,y){
		this.ctx.translate(x,y);
	}

	__proto.transform=function(a,b,c,d,tx,ty){
		this.ctx.transform(a,b,c,d,tx,ty);
	}

	__proto.rotate=function(angle){
		this.ctx.rotate(angle);
	}

	__proto.scale=function(scaleX,scaleY){
		this.ctx.scale(scaleX,scaleY);
	}

	__proto.alpha=function(value){
		this.ctx.globalAlpha *=value;
	}

	__proto.setAlpha=function(value){
		this.ctx.globalAlpha=value;
	}

	__proto.fillWords=function(words,x,y,font,color,underLine){
		(underLine===void 0)&& (underLine=0);
		this.ctx.fillWords(words,x,y,font,color,underLine);
	}

	/***@private */
	__proto.fillBorderWords=function(words,x,y,font,fillColor,borderColor,lineWidth){
		this.ctx.fillBorderWords(words,x,y,font,fillColor,borderColor,lineWidth);
	}

	__proto.fillText=function(text,x,y,font,color,textAlign){
		this.ctx.fillText(text,x+this.x,y+this.y,font,color,textAlign);
	}

	__proto.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
		this.ctx.strokeText(text,x+this.x,y+this.y,font,color,lineWidth,textAlign);
	}

	__proto.blendMode=function(type){
		this.ctx.globalCompositeOperation=type;
	}

	__proto.flush=function(){
		this.ctx.flush && this.ctx.flush();
	}

	__proto.addRenderObject=function(o){
		this.ctx.addRenderObject(o);
	}

	__proto.beginClip=function(x,y,w,h){
		this.ctx.beginClip && this.ctx.beginClip(x,y,w,h);
	}

	__proto.endClip=function(){
		this.ctx.endClip && this.ctx.endClip();
	}

	__proto.fillTrangles=function(x,y,args){
		this.ctx.fillTrangles(args[0],args[1],args[2],args[3],args.length > 4 ? args[4] :null);
	}

	RenderContext.PI2=2 *Math.PI;
	return RenderContext;
})()


/**
*@private
*Context扩展类
*/
//class laya.resource.Context
var Context=(function(){
	function Context(){
		/***@private */
		//this._canvas=null;
		this._repaint=false;
	}

	__class(Context,'laya.resource.Context');
	var __proto=Context.prototype;
	__proto.replaceReset=function(){
		var i=0,len=0;
		len=Context.replaceKeys.length;
		var key;
		for (i=0;i < len;i++){
			key=Context.replaceKeys[i];
			this[Context.newKeys[i]]=this[key];
		}
	}

	__proto.replaceResotre=function(){
		this.__restore();
		this.__reset();
	}

	__proto.setIsMainContext=function(){}
	__proto.drawTextures=function(tex,pos,tx,ty){
		Stat.drawCall+=pos.length / 2;
		var w=tex.width;
		var h=tex.height;
		for (var i=0,sz=pos.length;i < sz;i+=2){
			this.drawTexture(tex,pos[i],pos[i+1],w,h,tx,ty);
		}
	}

	/***@private */
	__proto.drawCanvas=function(canvas,x,y,width,height){
		Stat.drawCall++;
		this.drawImage(canvas.source,x,y,width,height);
	}

	/***@private */
	__proto.fillRect=function(x,y,width,height,style){
		Stat.drawCall++;
		style && (this.fillStyle=style);
		this.__fillRect(x,y,width,height);
	}

	/***@private */
	__proto.fillText=function(text,x,y,font,color,textAlign){
		Stat.drawCall++;
		if (arguments.length > 3 && font !=null){
			this.font=font;
			this.fillStyle=color;
			this.textAlign=textAlign;
			this.textBaseline="top";
		}
		this.__fillText(text,x,y);
	}

	/***@private */
	__proto.fillBorderText=function(text,x,y,font,fillColor,borderColor,lineWidth,textAlign){
		Stat.drawCall++;
		this.font=font;
		this.fillStyle=fillColor;
		this.textBaseline="top";
		this.strokeStyle=borderColor;
		this.lineWidth=lineWidth;
		this.textAlign=textAlign;
		this.__strokeText(text,x,y);
		this.__fillText(text,x,y);
	}

	/***@private */
	__proto.strokeText=function(text,x,y,font,color,lineWidth,textAlign){
		Stat.drawCall++;
		if (arguments.length > 3 && font !=null){
			this.font=font;
			this.strokeStyle=color;
			this.lineWidth=lineWidth;
			this.textAlign=textAlign;
			this.textBaseline="top";
		}
		this.__strokeText(text,x,y);
	}

	/***@private */
	__proto.transformByMatrix=function(value){
		this.transform(value.a,value.b,value.c,value.d,value.tx,value.ty);
	}

	/***@private */
	__proto.setTransformByMatrix=function(value){
		this.setTransform(value.a,value.b,value.c,value.d,value.tx,value.ty);
	}

	/***@private */
	__proto.clipRect=function(x,y,width,height){
		Stat.drawCall++;
		this.beginPath();
		this.rect(x,y,width,height);
		this.clip();
	}

	/***@private */
	__proto.drawTexture=function(tex,x,y,width,height,tx,ty){
		Stat.drawCall++;
		var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
		this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x+tx,y+ty,width,height);
	}

	/***@private */
	__proto.drawTextureWithTransform=function(tex,x,y,width,height,m,tx,ty,alpha){
		Stat.drawCall++;
		var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
		this.save();
		alpha !=1 && (this.globalAlpha *=alpha);
		if (m){
			this.transform(m.a,m.b,m.c,m.d,m.tx+tx,m.ty+ty);
			this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x ,y,width,height);
			}else {
			this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,x+tx ,y+ty,width,height);
		}
		this.restore();
	}

	/***@private */
	__proto.drawTexture2=function(x,y,pivotX,pivotY,m,alpha,blendMode,args2){
		var tex=args2[0];
		if (!(tex.loaded && tex.bitmap && tex.source)){
			return;
		}
		Stat.drawCall++;
		var alphaChanged=alpha!==1;
		if (alphaChanged){
			var temp=this.globalAlpha;
			this.globalAlpha *=alpha;
		};
		var uv=tex.uv,w=tex.bitmap.width,h=tex.bitmap.height;
		if (m){
			this.save();
			this.transform(m.a,m.b,m.c,m.d,m.tx+x,m.ty+y);
			this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,args2[1]-pivotX ,args2[2]-pivotY,args2[3],args2[4]);
			this.restore();
			}else {
			this.drawImage(tex.source,uv[0] *w,uv[1] *h,(uv[2]-uv[0])*w,(uv[5]-uv[3])*h,args2[1]-pivotX+x ,args2[2]-pivotY+y,args2[3],args2[4]);
		}
		if (alphaChanged)this.globalAlpha=temp;
	}

	__proto.fillTexture=function(texture,x,y,width,height,type,offset,other){
		if (!other.pat){
			if (texture.uv !=Texture.DEF_UV){
				var canvas=new HTMLCanvas("2D");
				canvas.getContext('2d');
				canvas.size(texture.width,texture.height);
				canvas.context.drawTexture(texture,0,0,texture.width,texture.height,0,0);
				texture=new Texture(canvas);
			}
			other.pat=this.createPattern(texture.bitmap.source,type);
		};
		var oX=x,oY=y;
		var sX=0,sY=0;
		if (offset){
			oX+=offset.x % texture.width;
			oY+=offset.y % texture.height;
			sX-=offset.x % texture.width;
			sY-=offset.y % texture.height;
		}
		this.translate(oX,oY);
		this.fillRect(sX,sY,width,height,other.pat);
		this.translate(-oX,-oY);
	}

	__proto.drawTriangle=function(texture,vertices,uvs,index0,index1,index2,matrix,canvasPadding){
		var source=texture.bitmap;
		var textureSource=source.source;
		var textureWidth=texture.width;
		var textureHeight=texture.height;
		var sourceWidth=source.width;
		var sourceHeight=source.height;
		var u0=uvs[index0] *sourceWidth;
		var u1=uvs[index1] *sourceWidth;
		var u2=uvs[index2] *sourceWidth;
		var v0=uvs[index0+1] *sourceHeight;
		var v1=uvs[index1+1] *sourceHeight;
		var v2=uvs[index2+1] *sourceHeight;
		var x0=vertices[index0];
		var x1=vertices[index1];
		var x2=vertices[index2];
		var y0=vertices[index0+1];
		var y1=vertices[index1+1];
		var y2=vertices[index2+1];
		if (canvasPadding){
			var paddingX=1;
			var paddingY=1;
			var centerX=(x0+x1+x2)/ 3;
			var centerY=(y0+y1+y2)/ 3;
			var normX=x0-centerX;
			var normY=y0-centerY;
			var dist=Math.sqrt((normX *normX)+(normY *normY));
			x0=centerX+((normX / dist)*(dist+paddingX));
			y0=centerY+((normY / dist)*(dist+paddingY));
			normX=x1-centerX;
			normY=y1-centerY;
			dist=Math.sqrt((normX *normX)+(normY *normY));
			x1=centerX+((normX / dist)*(dist+paddingX));
			y1=centerY+((normY / dist)*(dist+paddingY));
			normX=x2-centerX;
			normY=y2-centerY;
			dist=Math.sqrt((normX *normX)+(normY *normY));
			x2=centerX+((normX / dist)*(dist+paddingX));
			y2=centerY+((normY / dist)*(dist+paddingY));
		}
		this.save();
		if (matrix)
			this.transform(matrix.a,matrix.b,matrix.c,matrix.d,matrix.tx,matrix.ty);
		this.beginPath();
		this.moveTo(x0,y0);
		this.lineTo(x1,y1);
		this.lineTo(x2,y2);
		this.closePath();
		this.clip();
		var delta=(u0 *v1)+(v0 *u2)+(u1 *v2)-(v1 *u2)-(v0 *u1)-(u0 *v2);
		var dDelta=1 / delta;
		var deltaA=(x0 *v1)+(v0 *x2)+(x1 *v2)-(v1 *x2)-(v0 *x1)-(x0 *v2);
		var deltaB=(u0 *x1)+(x0 *u2)+(u1 *x2)-(x1 *u2)-(x0 *u1)-(u0 *x2);
		var deltaC=(u0 *v1 *x2)+(v0 *x1 *u2)+(x0 *u1 *v2)-(x0 *v1 *u2)-(v0 *u1 *x2)-(u0 *x1 *v2);
		var deltaD=(y0 *v1)+(v0 *y2)+(y1 *v2)-(v1 *y2)-(v0 *y1)-(y0 *v2);
		var deltaE=(u0 *y1)+(y0 *u2)+(u1 *y2)-(y1 *u2)-(y0 *u1)-(u0 *y2);
		var deltaF=(u0 *v1 *y2)+(v0 *y1 *u2)+(y0 *u1 *v2)-(y0 *v1 *u2)-(v0 *u1 *y2)-(u0 *y1 *v2);
		this.transform(deltaA *dDelta,deltaD *dDelta,deltaB *dDelta,deltaE *dDelta,deltaC *dDelta,deltaF *dDelta);
		this.drawImage(textureSource,texture.uv[0] *sourceWidth,texture.uv[1] *sourceHeight,textureWidth,textureHeight,texture.uv[0] *sourceWidth,texture.uv[1] *sourceHeight,textureWidth,textureHeight);
		this.restore();
	}

	/***@private */
	__proto.flush=function(){
		return 0;
	}

	/***@private */
	__proto.fillWords=function(words,x,y,font,color,underLine){
		font && (this.font=font);
		color && (this.fillStyle=color);
		var _this=this;
		this.textBaseline="top";
		this.textAlign='left';
		for (var i=0,n=words.length;i < n;i++){
			var a=words[i];
			this.__fillText(a.char,a.x+x,a.y+y);
			if (underLine===1){
				var tHeight=a.height;
				var dX=a.style.letterSpacing*0.5;
				if (!dX)dX=0;
				this.beginPath();
				this.strokeStyle=color;
				this.lineWidth=1;
				this.moveTo(x+a.x-dX+0.5,y+a.y+tHeight+0.5);
				this.lineTo(x+a.x+a.width+dX+0.5,y+a.y+tHeight+0.5);
				this.stroke();
			}
		}
	}

	/***@private */
	__proto.fillBorderWords=function(words,x,y,font,color,borderColor,lineWidth){
		font && (this.font=font);
		color && (this.fillStyle=color);
		this.textBaseline="top";
		this.lineWidth=lineWidth;
		this.textAlign='left';
		this.strokeStyle=borderColor;
		for (var i=0,n=words.length;i < n;i++){
			var a=words[i];
			this.__strokeText(a.char,a.x+x,a.y+y);
			this.__fillText(a.char,a.x+x,a.y+y);
		}
	}

	/***@private */
	__proto.destroy=function(){
		this.canvas.width=this.canvas.height=0;
	}

	/***@private */
	__proto.clear=function(){
		this.clearRect(0,0,this._canvas.width,this._canvas.height);
		this._repaint=false;
	}

	__proto.drawCurves=function(x,y,args){
		this.beginPath();
		this.strokeStyle=args[3];
		this.lineWidth=args[4];
		var points=args[2];
		x+=args[0],y+=args[1];
		this.moveTo(x+points[0],y+points[1]);
		var i=2,n=points.length;
		while (i < n){
			this.quadraticCurveTo(x+points[i++],y+points[i++],x+points[i++],y+points[i++]);
		}
		this.stroke();
	}

	Context.__init__=function(to){
		var from=laya.resource.Context.prototype;
		to=to || CanvasRenderingContext2D.prototype;
		if (to.inited)return;
		to.inited=true;
		to.__fillText=to.fillText;
		to.__fillRect=to.fillRect;
		to.__strokeText=to.strokeText;
		var funs=['drawTextures',"drawTriangle",'fillWords','fillBorderWords','setIsMainContext','fillRect','strokeText','fillTexture','fillText','transformByMatrix','setTransformByMatrix','clipRect','drawTexture','drawTexture2','drawTextureWithTransform','flush','clear','destroy','drawCanvas','fillBorderText','drawCurves'];
		funs.forEach(function(i){
			to[i]=from[i];
		});
	}

	Context.replaceCanvasGetSet=function(tar,key){
		var oldO=Object.getOwnPropertyDescriptor(tar,key);
		if (!oldO||!oldO.configurable)return false;
		var newO={};
		var tkey;
		for (tkey in oldO){
			if (tkey !="set"){
				newO[tkey]=oldO[tkey];
			}
		};
		var preFun=oldO["set"];
		newO["set"]=function (v){
			var _self=this;
			preFun.call(_self,v);
			var _ct=_self.getContext("2d");
			if (_ct && "__reset" in _ct){
				_ct.__reset();
			}
		}
		Object.defineProperty(tar,key,newO);
		return true;
	}

	Context.replaceGetSet=function(tar,key){
		var oldO=Object.getOwnPropertyDescriptor(tar,key);
		if (!oldO||!oldO.configurable)return false;
		var newO={};
		var tkey;
		for (tkey in oldO){
			if (tkey !="set"){
				newO[tkey]=oldO[tkey];
			}
		};
		var preFun=oldO["set"];
		var dataKey="___"+key+"__";
		Context.newKeys.push(dataKey);
		newO["set"]=function (v){
			var _self=this;
			if (v !=_self[dataKey]){
				_self[dataKey]=v;
				preFun.call(_self,v);
			}
		}
		Object.defineProperty(tar,key,newO);
		return true;
	}

	Context._default=new Context();
	Context.newKeys=[];
	__static(Context,
	['replaceKeys',function(){return this.replaceKeys=["font","fillStyle","textBaseline"];}
	]);
	return Context;
})()


/**
*<p> <code>Stat</code> 是一个性能统计面板，可以实时更新相关的性能参数。</p>
*<p>参与统计的性能参数如下（所有参数都是每大约1秒进行更新）：<br/>
*FPS(Canvas)/FPS(WebGL)：Canvas 模式或者 WebGL 模式下的帧频，也就是每秒显示的帧数，值越高、越稳定，感觉越流畅；<br/>
*Sprite：统计所有渲染节点（包括容器）数量，它的大小会影响引擎进行节点遍历、数据组织和渲染的效率。其值越小，游戏运行效率越高；<br/>
*DrawCall：此值是决定性能的重要指标，其值越小，游戏运行效率越高。Canvas模式下表示每大约1秒的图像绘制次数；WebGL模式下表示每大约1秒的渲染提交批次，每次准备数据并通知GPU渲染绘制的过程称为1次DrawCall，在每次DrawCall中除了在通知GPU的渲染上比较耗时之外，切换材质与shader也是非常耗时的操作；<br/>
*CurMem：Canvas模式下，表示内存占用大小，值越小越好，过高会导致游戏闪退；WebGL模式下，表示内存与显存的占用，值越小越好；<br/>
*Shader：是 WebGL 模式独有的性能指标，表示每大约1秒 Shader 提交次数，值越小越好；<br/>
*Canvas：由三个数值组成，只有设置 CacheAs 后才会有值，默认为0/0/0。从左到右数值的意义分别为：每帧重绘的画布数量 / 缓存类型为"normal"类型的画布数量 / 缓存类型为"bitmap"类型的画布数量。</p>
*/
//class laya.utils.Stat
var Stat=(function(){
	function Stat(){}
	__class(Stat,'laya.utils.Stat');
	/**
	*点击性能统计显示区域的处理函数。
	*/
	__getset(1,Stat,'onclick',null,function(fn){
		if (Stat._sp){
			Stat._sp.on("click",Stat._sp,fn);
		}
		if (Stat._canvas){
			Stat._canvas.source.onclick=fn;
			Stat._canvas.source.style.pointerEvents='';
		}
	});

	Stat.show=function(x,y){
		(x===void 0)&& (x=0);
		(y===void 0)&& (y=0);
		if (Render.isConchApp && !Render.isConchWebGL){
			Browser.window.conch.showFPS && Browser.window.conch.showFPS(x,y);
			return;
		}
		if (!Render.isConchWebGL && !Browser.onMiniGame &&! Browser.onLimixiu)Stat._useCanvas=true;
		Stat._show=true;
		Stat._fpsData.length=60;
		Stat._view[0]={title:"FPS(Canvas)",value:"_fpsStr",color:"yellow",units:"int"};
		Stat._view[1]={title:"Sprite",value:"_spriteStr",color:"white",units:"int"};
		Stat._view[2]={title:"DrawCall",value:"drawCall",color:"white",units:"int"};
		Stat._view[3]={title:"CurMem",value:"currentMemorySize",color:"yellow",units:"M"};
		if (Render.isWebGL){
			Stat._view[4]={title:"Shader",value:"shaderCall",color:"white",units:"int"};
			if (!Render.is3DMode){
				Stat._view[0].title="FPS(WebGL)";
				Stat._view[5]={title:"Canvas",value:"_canvasStr",color:"white",units:"int"};
				}else {
				Stat._view[0].title="FPS(3D)";
				Stat._view[5]={title:"TriFaces",value:"trianglesFaces",color:"white",units:"int"};
				Stat._view[6]={title:"treeNodeColl",value:"treeNodeCollision",color:"white",units:"int"};
				Stat._view[7]={title:"treeSpriteColl",value:"treeSpriteCollision",color:"white",units:"int"};
			}
			}else {
			Stat._view[4]={title:"Canvas",value:"_canvasStr",color:"white",units:"int"};
		}
		if (Stat._useCanvas){
			Stat.createUIPre(x,y);
		}else
		Stat.createUI(x,y);
		Stat.enable();
	}

	Stat.createUIPre=function(x,y){
		var pixel=Browser.pixelRatio;
		Stat._width=pixel *130;
		Stat._vx=pixel *75;
		Stat._height=pixel *(Stat._view.length *12+3 *pixel)+4;
		Stat._fontSize=12 *pixel;
		for (var i=0;i < Stat._view.length;i++){
			Stat._view[i].x=4;
			Stat._view[i].y=i *Stat._fontSize+2 *pixel;
		}
		if (!Stat._canvas){
			Stat._canvas=new HTMLCanvas('2D');
			Stat._canvas.size(Stat._width,Stat._height);
			Stat._ctx=Stat._canvas.getContext('2d');
			Stat._ctx.textBaseline="top";
			Stat._ctx.font=Stat._fontSize+"px Sans-serif";
			Stat._canvas.source.style.cssText="pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;direction:ltr;left:"+x+"px;top:"+y+"px;width:"+(Stat._width / pixel)+"px;height:"+(Stat._height / pixel)+"px;";
		}
		Stat._first=true;
		Stat.loop();
		Stat._first=false;
		Browser.container.appendChild(Stat._canvas.source);
	}

	Stat.createUI=function(x,y){
		var stat=Stat._sp;
		var pixel=Browser.pixelRatio;
		if (!stat){
			stat=new Sprite();
			Stat._leftText=new Text();
			Stat._leftText.pos(5,5);
			Stat._leftText.color="#ffffff";
			stat.addChild(Stat._leftText);
			Stat._txt=new Text();
			Stat._txt.pos(80*pixel,5);
			Stat._txt.color="#ffffff";
			stat.addChild(Stat._txt);
			Stat._sp=stat;
		}
		stat.pos(x,y);
		var text="";
		for (var i=0;i < Stat._view.length;i++){
			var one=Stat._view[i];
			text+=one.title+"\n";
		}
		Stat._leftText.text=text;
		var width=pixel *138;
		var height=pixel *(Stat._view.length *12+3 *pixel)+4;
		Stat._txt.fontSize=Stat._fontSize *pixel;
		Stat._leftText.fontSize=Stat._fontSize *pixel;
		stat.size(width,height);
		stat.graphics.clear();
		stat.graphics.setAlpha(0.5);
		stat.graphics.drawRect(0,0,width,height,"#999999");
		stat.graphics.setAlpha(1);
		Stat.loop();
	}

	Stat.enable=function(){
		Laya.timer.frameLoop(1,Stat,Stat.loop);
	}

	Stat.hide=function(){
		Stat._show=false;
		Laya.timer.clear(Stat,Stat.loop);
		if (Stat._canvas){
			Browser.removeElement(Stat._canvas.source);
		}
	}

	Stat.clear=function(){
		Stat.trianglesFaces=Stat.drawCall=Stat.shaderCall=Stat.spriteCount=Stat.spriteRenderUseCacheCount=Stat.treeNodeCollision=Stat.treeSpriteCollision=Stat.canvasNormal=Stat.canvasBitmap=Stat.canvasReCache=0;
	}

	Stat.loop=function(){
		Stat._count++;
		var timer=Browser.now();
		if (timer-Stat._timer < 1000)return;
		var count=Stat._count;
		Stat.FPS=Math.round((count *1000)/ (timer-Stat._timer));
		if (Stat._show){
			Stat.trianglesFaces=Math.round(Stat.trianglesFaces / count);
			if (!Stat._useCanvas){
				Stat.drawCall=Math.round(Stat.drawCall / count)-2;
				Stat.shaderCall=Math.round(Stat.shaderCall / count)-4;
				Stat.spriteCount=Math.round(Stat.spriteCount / count)-4;
				}else{
				Stat.drawCall=Math.round(Stat.drawCall / count)-2;
				Stat.shaderCall=Math.round(Stat.shaderCall / count);
				Stat.spriteCount=Math.round(Stat.spriteCount / count)-1;
			}
			Stat.spriteRenderUseCacheCount=Math.round(Stat.spriteRenderUseCacheCount / count);
			Stat.canvasNormal=Math.round(Stat.canvasNormal / count);
			Stat.canvasBitmap=Math.round(Stat.canvasBitmap / count);
			Stat.canvasReCache=Math.ceil(Stat.canvasReCache / count);
			Stat.treeNodeCollision=Math.round(Stat.treeNodeCollision / count);
			Stat.treeSpriteCollision=Math.round(Stat.treeSpriteCollision / count);
			var delay=Stat.FPS > 0 ? Math.floor(1000 / Stat.FPS).toString():" ";
			Stat._fpsStr=Stat.FPS+(Stat.renderSlow ? " slow" :"")+" "+delay;
			Stat._spriteStr=Stat.spriteCount+(Stat.spriteRenderUseCacheCount ? ("/"+Stat.spriteRenderUseCacheCount):'');
			Stat._canvasStr=Stat.canvasReCache+"/"+Stat.canvasNormal+"/"+Stat.canvasBitmap;
			Stat.currentMemorySize=ResourceManager.systemResourceManager.memorySize;
			if (Stat._useCanvas){
				Stat.renderInfoPre();
			}else
			Stat.renderInfo();
			Stat.clear();
		}
		Stat._count=0;
		Stat._timer=timer;
	}

	Stat.renderInfoPre=function(){
		if (Stat._canvas){
			var ctx=Stat._ctx;
			ctx.clearRect(Stat._first ? 0 :Stat._vx,0,Stat._width,Stat._height);
			for (var i=0;i < Stat._view.length;i++){
				var one=Stat._view[i];
				if (Stat._first){
					ctx.fillStyle="white";
					ctx.fillText(one.title,one.x,one.y,null,null,null);
				}
				ctx.fillStyle=one.color;
				var value=Stat[one.value];
				(one.units=="M")&& (value=Math.floor(value / (1024 *1024)*100)/ 100+" M");
				ctx.fillText(value+"",one.x+Stat._vx,one.y,null,null,null);
			}
		}
	}

	Stat.renderInfo=function(){
		var text="";
		for (var i=0;i < Stat._view.length;i++){
			var one=Stat._view[i];
			var value=Stat[one.value];
			(one.units=="M")&& (value=Math.floor(value / (1024 *1024)*100)/ 100+" M");
			(one.units=="K")&& (value=Math.floor(value / (1024)*100)/ 100+" K");
			text+=value+"\n";
		}
		Stat._txt.text=text;
	}

	Stat.FPS=0;
	Stat.loopCount=0;
	Stat.shaderCall=0;
	Stat.drawCall=0;
	Stat.trianglesFaces=0;
	Stat.spriteCount=0;
	Stat.spriteRenderUseCacheCount=0;
	Stat.treeNodeCollision=0;
	Stat.treeSpriteCollision=0;
	Stat.canvasNormal=0;
	Stat.canvasBitmap=0;
	Stat.canvasReCache=0;
	Stat.renderSlow=false;
	Stat.currentMemorySize=0;
	Stat._fpsStr=null;
	Stat._canvasStr=null;
	Stat._spriteStr=null;
	Stat._fpsData=[];
	Stat._timer=0;
	Stat._count=0;
	Stat._view=[];
	Stat._fontSize=12;
	Stat._txt=null;
	Stat._leftText=null;
	Stat._sp=null;
	Stat._show=false;
	Stat._useCanvas=false;
	Stat._canvas=null;
	Stat._ctx=null;
	Stat._first=false;
	Stat._vx=NaN;
	Stat._width=0;
	Stat._height=100;
	return Stat;
})()


/**
*@private
*<code>Dragging</code> 类是触摸滑动控件。
*/
//class laya.utils.Dragging
var Dragging=(function(){
	function Dragging(){
		/**被拖动的对象。*/
		//this.target=null;
		/**缓动衰减系数。*/
		this.ratio=0.92;
		/**单帧最大偏移量。*/
		this.maxOffset=60;
		/**滑动范围。*/
		//this.area=null;
		/**表示拖动是否有惯性。*/
		//this.hasInertia=false;
		/**橡皮筋最大值。*/
		//this.elasticDistance=NaN;
		/**橡皮筋回弹时间，单位为毫秒。*/
		//this.elasticBackTime=NaN;
		/**事件携带数据。*/
		//this.data=null;
		this._dragging=false;
		this._clickOnly=true;
		//this._elasticRateX=NaN;
		//this._elasticRateY=NaN;
		//this._lastX=NaN;
		//this._lastY=NaN;
		//this._offsetX=NaN;
		//this._offsetY=NaN;
		//this._offsets=null;
		//this._disableMouseEvent=false;
		//this._tween=null;
		//this._parent=null;
	}

	__class(Dragging,'laya.utils.Dragging');
	var __proto=Dragging.prototype;
	/**
	*开始拖拽。
	*@param target 待拖拽的 <code>Sprite</code> 对象。
	*@param area 滑动范围。
	*@param hasInertia 拖动是否有惯性。
	*@param elasticDistance 橡皮筋最大值。
	*@param elasticBackTime 橡皮筋回弹时间，单位为毫秒。
	*@param data 事件携带数据。
	*@param disableMouseEvent 鼠标事件是否有效。
	*@param ratio 惯性阻尼系数
	*/
	__proto.start=function(target,area,hasInertia,elasticDistance,elasticBackTime,data,disableMouseEvent,ratio){
		(ratio===void 0)&& (ratio=0.92);
		this.clearTimer();
		this.target=target;
		this.area=area;
		this.hasInertia=hasInertia;
		this.elasticDistance=area ? elasticDistance :0;
		this.elasticBackTime=elasticBackTime;
		this.data=data;
		this._disableMouseEvent=disableMouseEvent;
		this.ratio=ratio;
		this._parent=target.parent;
		this._clickOnly=true;
		this._dragging=true;
		this._elasticRateX=this._elasticRateY=1;
		this._lastX=this._parent.mouseX;
		this._lastY=this._parent.mouseY;
		Laya.stage.on("mouseup",this,this.onStageMouseUp);
		Laya.stage.on("mouseout",this,this.onStageMouseUp);
		Laya.timer.frameLoop(1,this,this.loop);
	}

	/**
	*清除计时器。
	*/
	__proto.clearTimer=function(){
		Laya.timer.clear(this,this.loop);
		Laya.timer.clear(this,this.tweenMove);
		if (this._tween){
			this._tween.recover();
			this._tween=null;
		}
	}

	/**
	*停止拖拽。
	*/
	__proto.stop=function(){
		if (this._dragging){
			MouseManager.instance.disableMouseEvent=false;
			Laya.stage.off("mouseup",this,this.onStageMouseUp);
			Laya.stage.off("mouseout",this,this.onStageMouseUp);
			this._dragging=false;
			this.target && this.area && this.backToArea();
			this.clear();
		}
	}

	/**
	*拖拽的循环处理函数。
	*/
	__proto.loop=function(){
		var point=this._parent.getMousePoint();
		var mouseX=point.x;
		var mouseY=point.y;
		var offsetX=mouseX-this._lastX;
		var offsetY=mouseY-this._lastY;
		if (this._clickOnly){
			if (Math.abs(offsetX *Laya.stage._canvasTransform.getScaleX())> 1 || Math.abs(offsetY *Laya.stage._canvasTransform.getScaleY())> 1){
				this._clickOnly=false;
				this._offsets || (this._offsets=[]);
				this._offsets.length=0;
				this.target.event("dragstart",this.data);
				MouseManager.instance.disableMouseEvent=this._disableMouseEvent;
				this.target._set$P("$_MOUSEDOWN",false);
			}else return;
			}else {
			this._offsets.push(offsetX,offsetY);
		}
		if (offsetX===0 && offsetY===0)return;
		this._lastX=mouseX;
		this._lastY=mouseY;
		this.target.x+=offsetX *this._elasticRateX;
		this.target.y+=offsetY *this._elasticRateY;
		this.area && this.checkArea();
		this.target.event("dragmove",this.data);
	}

	/**
	*拖拽区域检测。
	*/
	__proto.checkArea=function(){
		if (this.elasticDistance <=0){
			this.backToArea();
			}else {
			if (this.target.x < this.area.x){
				var offsetX=this.area.x-this.target.x;
				}else if (this.target.x > this.area.x+this.area.width){
				offsetX=this.target.x-this.area.x-this.area.width;
				}else {
				offsetX=0;
			}
			this._elasticRateX=Math.max(0,1-(offsetX / this.elasticDistance));
			if (this.target.y < this.area.y){
				var offsetY=this.area.y-this.target.y;
				}else if (this.target.y > this.area.y+this.area.height){
				offsetY=this.target.y-this.area.y-this.area.height;
				}else {
				offsetY=0;
			}
			this._elasticRateY=Math.max(0,1-(offsetY / this.elasticDistance));
		}
	}

	/**
	*移动至设定的拖拽区域。
	*/
	__proto.backToArea=function(){
		this.target.x=Math.min(Math.max(this.target.x,this.area.x),this.area.x+this.area.width);
		this.target.y=Math.min(Math.max(this.target.y,this.area.y),this.area.y+this.area.height);
	}

	/**
	*舞台的抬起事件侦听函数。
	*@param e Event 对象。
	*/
	__proto.onStageMouseUp=function(e){
		MouseManager.instance.disableMouseEvent=false;
		Laya.stage.off("mouseup",this,this.onStageMouseUp);
		Laya.stage.off("mouseout",this,this.onStageMouseUp);
		Laya.timer.clear(this,this.loop);
		if (this._clickOnly || !this.target)return;
		if (this.hasInertia){
			if (this._offsets.length < 1){
				this._offsets.push(this._parent.mouseX-this._lastX,this._parent.mouseY-this._lastY);
			}
			this._offsetX=this._offsetY=0;
			var len=this._offsets.length;
			var n=Math.min(len,6);
			var m=this._offsets.length-n;
			for (var i=len-1;i > m;i--){
				this._offsetY+=this._offsets[i--];
				this._offsetX+=this._offsets[i];
			}
			this._offsetX=this._offsetX / n *2;
			this._offsetY=this._offsetY / n *2;
			if (Math.abs(this._offsetX)> this.maxOffset)this._offsetX=this._offsetX > 0 ? this.maxOffset :-this.maxOffset;
			if (Math.abs(this._offsetY)> this.maxOffset)this._offsetY=this._offsetY > 0 ? this.maxOffset :-this.maxOffset;
			Laya.timer.frameLoop(1,this,this.tweenMove);
			}else if (this.elasticDistance > 0){
			this.checkElastic();
			}else {
			this.clear();
		}
	}

	/**
	*橡皮筋效果检测。
	*/
	__proto.checkElastic=function(){
		var tx=NaN;
		var ty=NaN;
		if (this.target.x < this.area.x)tx=this.area.x;
		else if (this.target.x > this.area.x+this.area.width)tx=this.area.x+this.area.width;
		if (this.target.y < this.area.y)ty=this.area.y;
		else if (this.target.y > this.area.y+this.area.height)ty=this.area.y+this.area.height;
		if (!isNaN(tx)|| !isNaN(ty)){
			var obj={};
			if (!isNaN(tx))obj.x=tx;
			if (!isNaN(ty))obj.y=ty;
			this._tween=Tween.to(this.target,obj,this.elasticBackTime,Ease.sineOut,Handler.create(this,this.clear),0,false,false);
			}else {
			this.clear();
		}
	}

	/**
	*移动。
	*/
	__proto.tweenMove=function(){
		this._offsetX *=this.ratio *this._elasticRateX;
		this._offsetY *=this.ratio *this._elasticRateY;
		this.target.x+=this._offsetX;
		this.target.y+=this._offsetY;
		this.area && this.checkArea();
		this.target.event("dragmove",this.data);
		if ((Math.abs(this._offsetX)< 1 && Math.abs(this._offsetY)< 1)|| this._elasticRateX < 0.5 || this._elasticRateY < 0.5){
			Laya.timer.clear(this,this.tweenMove);
			if (this.elasticDistance > 0)this.checkElastic();
			else this.clear();
		}
	}

	/**
	*结束拖拽。
	*/
	__proto.clear=function(){
		if (this.target){
			this.clearTimer();
			var sp=this.target;
			this.target=null;
			this._parent=null;
			sp.event("dragend",this.data);
		}
	}

	return Dragging;
})()


/**
*@private
*/
//class laya.utils.WordText
var WordText=(function(){
	function WordText(){
		this.id=NaN;
		this.save=[];
		this.toUpperCase=null;
		this.changed=false;
		this._text=null;
	}

	__class(WordText,'laya.utils.WordText');
	var __proto=WordText.prototype;
	__proto.setText=function(txt){
		this.changed=true;
		this._text=txt;
	}

	__proto.toString=function(){
		return this._text;
	}

	__proto.charCodeAt=function(i){
		return this._text ? this._text.charCodeAt(i):NaN;
	}

	__proto.charAt=function(i){
		return this._text ? this._text.charAt(i):null;
	}

	__getset(0,__proto,'length',function(){
		return this._text ? this._text.length :0;
	});

	return WordText;
})()


/**
*<code>Tween</code> 是一个缓动类。使用此类能够实现对目标对象属性的渐变。
*/
//class laya.utils.Tween
var Tween=(function(){
	function Tween(){
		/**@private */
		//this._complete=null;
		/**@private */
		//this._target=null;
		/**@private */
		//this._ease=null;
		/**@private */
		//this._props=null;
		/**@private */
		//this._duration=0;
		/**@private */
		//this._delay=0;
		/**@private */
		//this._startTimer=0;
		/**@private */
		//this._usedTimer=0;
		/**@private */
		//this._usedPool=false;
		/**@private */
		//this._delayParam=null;
		/**@private 唯一标识，TimeLintLite用到*/
		this.gid=0;
		/**更新回调，缓动数值发生变化时，回调变化的值*/
		//this.update=null;
	}

	__class(Tween,'laya.utils.Tween');
	var __proto=Tween.prototype;
	/**
	*缓动对象的props属性到目标值。
	*@param target 目标对象(即将更改属性值的对象)。
	*@param props 变化的属性列表，比如{x:100,y:20,ease:Ease.backOut,complete:Handler.create(this,onComplete),update:new Handler(this,onComplete)}。
	*@param duration 花费的时间，单位毫秒。
	*@param ease 缓动类型，默认为匀速运动。
	*@param complete 结束回调函数。
	*@param delay 延迟执行时间。
	*@param coverBefore 是否覆盖之前的缓动。
	*@return 返回Tween对象。
	*/
	__proto.to=function(target,props,duration,ease,complete,delay,coverBefore){
		(delay===void 0)&& (delay=0);
		(coverBefore===void 0)&& (coverBefore=false);
		return this._create(target,props,duration,ease,complete,delay,coverBefore,true,false,true);
	}

	/**
	*从props属性，缓动到当前状态。
	*@param target 目标对象(即将更改属性值的对象)。
	*@param props 变化的属性列表，比如{x:100,y:20,ease:Ease.backOut,complete:Handler.create(this,onComplete),update:new Handler(this,onComplete)}。
	*@param duration 花费的时间，单位毫秒。
	*@param ease 缓动类型，默认为匀速运动。
	*@param complete 结束回调函数。
	*@param delay 延迟执行时间。
	*@param coverBefore 是否覆盖之前的缓动。
	*@return 返回Tween对象。
	*/
	__proto.from=function(target,props,duration,ease,complete,delay,coverBefore){
		(delay===void 0)&& (delay=0);
		(coverBefore===void 0)&& (coverBefore=false);
		return this._create(target,props,duration,ease,complete,delay,coverBefore,false,false,true);
	}

	/**@private */
	__proto._create=function(target,props,duration,ease,complete,delay,coverBefore,isTo,usePool,runNow){
		if (!target)throw new Error("Tween:target is null");
		this._target=target;
		this._duration=duration;
		this._ease=ease || props.ease || Tween.easeNone;
		this._complete=complete || props.complete;
		this._delay=delay;
		this._props=[];
		this._usedTimer=0;
		this._startTimer=Browser.now();
		this._usedPool=usePool;
		this._delayParam=null;
		this.update=props.update;
		var gid=(target.$_GID || (target.$_GID=Utils.getGID()));
		if (!Tween.tweenMap[gid]){
			Tween.tweenMap[gid]=[this];
			}else {
			if (coverBefore)Tween.clearTween(target);
			Tween.tweenMap[gid].push(this);
		}
		if (runNow){
			if (delay <=0)this.firstStart(target,props,isTo);
			else{
				this._delayParam=[target,props,isTo];
				Laya.scaleTimer.once(delay,this,this.firstStart,this._delayParam);
			}
			}else {
			this._initProps(target,props,isTo);
		}
		return this;
	}

	__proto.firstStart=function(target,props,isTo){
		this._delayParam=null;
		if (target.destroyed){
			this.clear();
			return;
		}
		this._initProps(target,props,isTo);
		this._beginLoop();
	}

	__proto._initProps=function(target,props,isTo){
		for (var p in props){
			if ((typeof (target[p])=='number')){
				var start=isTo ? target[p] :props[p];
				var end=isTo ? props[p] :target[p];
				this._props.push([p,start,end-start]);
				if (!isTo)target[p]=start;
			}
		}
	}

	__proto._beginLoop=function(){
		Laya.scaleTimer.frameLoop(1,this,this._doEase);
	}

	/**执行缓动**/
	__proto._doEase=function(){
		this._updateEase(Browser.now());
	}

	/**@private */
	__proto._updateEase=function(time){
		var target=this._target;
		if (!target)return;
		if (target.destroyed)return Tween.clearTween(target);
		var usedTimer=this._usedTimer=time-this._startTimer-this._delay;
		if (usedTimer < 0)return;
		if (usedTimer >=this._duration)return this.complete();
		var ratio=usedTimer > 0 ? this._ease(usedTimer,0,1,this._duration):0;
		var props=this._props;
		for (var i=0,n=props.length;i < n;i++){
			var prop=props[i];
			target[prop[0]]=prop[1]+(ratio *prop[2]);
		}
		if (this.update)this.update.run();
	}

	/**
	*立即结束缓动并到终点。
	*/
	__proto.complete=function(){
		if (!this._target)return;
		Laya.scaleTimer.runTimer(this,this.firstStart);
		var target=this._target;
		var props=this._props;
		var handler=this._complete;
		for (var i=0,n=props.length;i < n;i++){
			var prop=props[i];
			target[prop[0]]=prop[1]+prop[2];
		}
		if (this.update)this.update.run();
		this.clear();
		handler && handler.run();
	}

	/**
	*暂停缓动，可以通过resume或restart重新开始。
	*/
	__proto.pause=function(){
		Laya.scaleTimer.clear(this,this._beginLoop);
		Laya.scaleTimer.clear(this,this._doEase);
		Laya.scaleTimer.clear(this,this.firstStart);
		var time=Browser.now();
		var dTime=NaN;
		dTime=time-this._startTimer-this._delay;
		if (dTime < 0){
			this._usedTimer=dTime;
		}
	}

	/**
	*设置开始时间。
	*@param startTime 开始时间。
	*/
	__proto.setStartTime=function(startTime){
		this._startTimer=startTime;
	}

	/**
	*停止并清理当前缓动。
	*/
	__proto.clear=function(){
		if (this._target){
			this._remove();
			this._clear();
		}
	}

	/**
	*@private
	*/
	__proto._clear=function(){
		this.pause();
		Laya.scaleTimer.clear(this,this.firstStart);
		this._complete=null;
		this._target=null;
		this._ease=null;
		this._props=null;
		this._delayParam=null;
		if (this._usedPool){
			this.update=null;
			Pool.recover("tween",this);
		}
	}

	/**回收到对象池。*/
	__proto.recover=function(){
		this._usedPool=true;
		this._clear();
	}

	__proto._remove=function(){
		var tweens=Tween.tweenMap[this._target.$_GID];
		if (tweens){
			for (var i=0,n=tweens.length;i < n;i++){
				if (tweens[i]===this){
					tweens.splice(i,1);
					break ;
				}
			}
		}
	}

	/**
	*重新开始暂停的缓动。
	*/
	__proto.restart=function(){
		this.pause();
		this._usedTimer=0;
		this._startTimer=Browser.now();
		if (this._delayParam){
			Laya.scaleTimer.once(this._delay,this,this.firstStart,this._delayParam);
			return;
		};
		var props=this._props;
		for (var i=0,n=props.length;i < n;i++){
			var prop=props[i];
			this._target[prop[0]]=prop[1];
		}
		Laya.scaleTimer.once(this._delay,this,this._beginLoop);
	}

	/**
	*恢复暂停的缓动。
	*/
	__proto.resume=function(){
		if (this._usedTimer >=this._duration)return;
		this._startTimer=Browser.now()-this._usedTimer-this._delay;
		if (this._delayParam){
			if (this._usedTimer < 0){
				Laya.scaleTimer.once(-this._usedTimer,this,this.firstStart,this._delayParam);
				}else{
				this.firstStart.apply(this,this._delayParam);
			}
			}else{
			this._beginLoop();
		}
	}

	/**设置当前执行比例**/
	__getset(0,__proto,'progress',null,function(v){
		var uTime=v *this._duration;
		this._startTimer=Browser.now()-this._delay-uTime;
	});

	Tween.to=function(target,props,duration,ease,complete,delay,coverBefore,autoRecover){
		(delay===void 0)&& (delay=0);
		(coverBefore===void 0)&& (coverBefore=false);
		(autoRecover===void 0)&& (autoRecover=true);
		return Pool.getItemByClass("tween",Tween)._create(target,props,duration,ease,complete,delay,coverBefore,true,autoRecover,true);
	}

	Tween.from=function(target,props,duration,ease,complete,delay,coverBefore,autoRecover){
		(delay===void 0)&& (delay=0);
		(coverBefore===void 0)&& (coverBefore=false);
		(autoRecover===void 0)&& (autoRecover=true);
		return Pool.getItemByClass("tween",Tween)._create(target,props,duration,ease,complete,delay,coverBefore,false,autoRecover,true);
	}

	Tween.clearAll=function(target){
		if (!target || !target.$_GID)return;
		var tweens=Tween.tweenMap[target.$_GID];
		if (tweens){
			for (var i=0,n=tweens.length;i < n;i++){
				tweens[i]._clear();
			}
			tweens.length=0;
		}
	}

	Tween.clear=function(tween){
		tween.clear();
	}

	Tween.clearTween=function(target){
		Tween.clearAll(target);
	}

	Tween.easeNone=function(t,b,c,d){
		return c *t / d+b;
	}

	Tween.tweenMap={};
	return Tween;
})()


SoundManager;
/**
*<code>Browser</code> 是浏览器代理类。封装浏览器及原生 js 提供的一些功能。
*/
//class laya.utils.Browser
var Browser=(function(){
	function Browser(){}
	__class(Browser,'laya.utils.Browser');
	/**画布容器，用来盛放画布的容器。方便对画布进行控制*/
	__getset(1,Browser,'container',function(){
		Browser.__init__();
		if (!Browser._container){
			Browser._container=Browser.createElement("div");
			Browser._container.id="layaContainer";
			Browser.document.body.appendChild(Browser._container);
		}
		return Browser._container;
		},function(value){
		Browser._container=value;
	});

	/**设备像素比。*/
	__getset(1,Browser,'pixelRatio',function(){
		Browser.__init__();
		if (Browser.userAgent.indexOf("Mozilla/6.0(Linux; Android 6.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)")>-1)return 2;
		return RunDriver.getPixelRatio();
	});

	/**浏览器原生 document 对象的引用。*/
	__getset(1,Browser,'document',function(){
		Browser.__init__();
		return Browser._document;
	});

	/**
	*浏览器窗口可视高度。
	*通过分析浏览器信息获得。浏览器多个属性值优先级为：window.innerHeight(包含滚动条高度)> document.body.clientHeight(不包含滚动条高度)> document.documentElement.clientHeight(不包含滚动条高度)，如果前者为0或为空，则选择后者。
	*/
	__getset(1,Browser,'clientHeight',function(){
		Browser.__init__();
		return Browser.window.innerHeight || Browser.document.body.clientHeight || Browser.document.documentElement.clientHeight;
	});

	/**浏览器原生 window 对象的引用。*/
	__getset(1,Browser,'window',function(){
		Browser.__init__();
		return Browser._window;
	});

	/**浏览器窗口物理高度，其值等于clientHeight *pixelRatio，并且浏览器发生反转之后，宽高会互换。*/
	__getset(1,Browser,'height',function(){
		Browser.__init__();
		return ((Laya.stage && Laya.stage.canvasRotation)? Browser.clientWidth :Browser.clientHeight)*Browser.pixelRatio;
	});

	/**浏览器窗口物理宽度，其值等于clientWidth *pixelRatio，并且浏览器发生反转之后，宽高会互换。*/
	__getset(1,Browser,'width',function(){
		Browser.__init__();
		return ((Laya.stage && Laya.stage.canvasRotation)? Browser.clientHeight :Browser.clientWidth)*Browser.pixelRatio;
	});

	/**
	*浏览器窗口可视宽度。
	*通过分析浏览器信息获得。浏览器多个属性值优先级为：window.innerWidth(包含滚动条宽度)> document.body.clientWidth(不包含滚动条宽度)，如果前者为0或为空，则选择后者。
	*/
	__getset(1,Browser,'clientWidth',function(){
		Browser.__init__();
		return Browser.window.innerWidth || Browser.document.body.clientWidth;
	});

	Browser.__init__=function(){
		SoundManager;
		if (Browser._window)return;
		Browser._window=RunDriver.getWindow();
		Browser._document=Browser.window.document;
		Browser._window.addEventListener('message',function(e){
			laya.utils.Browser._onMessage(e);
		},false);
		Browser.document.__createElement=Browser.document.createElement;
		window.requestAnimationFrame=window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function (c){return window.setTimeout(c,1000 / 60);};;
		var $BS=window.document.body.style;$BS['-webkit-user-select']='none';$BS['-webkit-tap-highlight-color']='rgba(200,200,200,0)';;
		Browser.userAgent=/*[SAFE]*/ Browser.window.navigator.userAgent;
		Browser.u=/*[SAFE]*/ Browser.userAgent;
		Browser.onIOS=/*[SAFE]*/ !!Browser.u.match(/\(i[^;]+;(U;)? CPU.+Mac OS X/);
		Browser.onMobile=/*[SAFE]*/ Browser.u.indexOf("Mobile")>-1;
		Browser.onIPhone=/*[SAFE]*/ Browser.u.indexOf("iPhone")>-1;
		Browser.onMac=/*[SAFE]*/ Browser.u.indexOf("Mac OS X")>-1;
		Browser.onIPad=/*[SAFE]*/ Browser.u.indexOf("iPad")>-1;
		Browser.onAndroid=/*[SAFE]*/ Browser.u.indexOf('Android')>-1 || Browser.u.indexOf('Adr')>-1;
		Browser.onWP=/*[SAFE]*/ Browser.u.indexOf("Windows Phone")>-1;
		Browser.onQQBrowser=/*[SAFE]*/ Browser.u.indexOf("QQBrowser")>-1;
		Browser.onMQQBrowser=/*[SAFE]*/ Browser.u.indexOf("MQQBrowser")>-1 || (Browser.u.indexOf("Mobile")>-1 && Browser.u.indexOf("QQ")>-1);
		Browser.onIE=/*[SAFE]*/ !!Browser.window.ActiveXObject || "ActiveXObject" in Browser.window;
		Browser.onWeiXin=/*[SAFE]*/ Browser.u.indexOf('MicroMessenger')>-1;
		Browser.onPC=/*[SAFE]*/ !Browser.onMobile;
		Browser.onSafari=/*[SAFE]*/ Browser.u.indexOf("Safari")>-1;
		Browser.onFirefox=/*[SAFE]*/ Browser.u.indexOf('Firefox')>-1;
		Browser.onEdge=/*[SAFE]*/ Browser.u.indexOf('Edge')>-1;
		Browser.onMiniGame=/*[SAFE]*/ Browser.u.indexOf('MiniGame')>-1;
		Browser.onLimixiu=/*[SAFE]*/ Browser.u.indexOf('limixiu')>-1;
		Browser.httpProtocol=/*[SAFE]*/ Browser.window.location.protocol=="http:";
		if (Browser.onMiniGame && Browser.window.focus==null){
			console.error("请先初始化小游戏适配库，详细教程https://ldc.layabox.com/doc/?nav=zh-ts-5-0-0");
		}
		Browser.webAudioEnabled=/*[SAFE]*/ Browser.window["AudioContext"] || Browser.window["webkitAudioContext"] || Browser.window["mozAudioContext"] ? true :false;
		Browser.soundType=/*[SAFE]*/ Browser.webAudioEnabled ? "WEBAUDIOSOUND" :"AUDIOSOUND";
		Sound=Browser.webAudioEnabled?WebAudioSound:AudioSound;;
		if (Browser.webAudioEnabled)WebAudioSound.initWebAudio();;
		AudioSound._initMusicAudio();
		Browser.enableTouch=(('ontouchstart' in window)|| window.DocumentTouch && document instanceof DocumentTouch);
		window.focus();
		SoundManager._soundClass=Sound;;
		SoundManager._musicClass=AudioSound;
		Render._mainCanvas=Render._mainCanvas || HTMLCanvas.create('2D');
		if (Browser.canvas)return;
		Browser.canvas=HTMLCanvas.create('2D');
		Browser.context=Browser.canvas.getContext('2d');
	}

	Browser._onMessage=function(e){
		if (!e.data)return;
		if (e.data.name=="size"){
			Browser.window.innerWidth=e.data.width;
			Browser.window.innerHeight=e.data.height;
			Browser.window.__innerHeight=e.data.clientHeight;
			if (!Browser.document.createEvent){
				console.warn("no document.createEvent");
				return;
			};
			var evt=Browser.document.createEvent("HTMLEvents");
			evt.initEvent("resize",false,false);
			Browser.window.dispatchEvent(evt);
			return;
		}
	}

	Browser.createElement=function(type){
		Browser.__init__();
		return Browser.document.__createElement(type);
	}

	Browser.getElementById=function(type){
		Browser.__init__();
		return Browser.document.getElementById(type);
	}

	Browser.removeElement=function(ele){
		if (ele && ele.parentNode)ele.parentNode.removeChild(ele);
	}

	Browser.now=function(){
		return RunDriver.now();
	}

	Browser._window=null;
	Browser._document=null;
	Browser._container=null;
	Browser.userAgent=null;
	Browser.u=null;
	Browser.onIOS=false;
	Browser.onMac=false;
	Browser.onMobile=false;
	Browser.onIPhone=false;
	Browser.onIPad=false;
	Browser.onAndroid=false;
	Browser.onWP=false;
	Browser.onQQBrowser=false;
	Browser.onMQQBrowser=false;
	Browser.onSafari=false;
	Browser.onFirefox=false;
	Browser.onEdge=false;
	Browser.onIE=false;
	Browser.onWeiXin=false;
	Browser.onMiniGame=false;
	Browser.onLimixiu=false;
	Browser.onPC=false;
	Browser.httpProtocol=false;
	Browser.webAudioEnabled=false;
	Browser.soundType=null;
	Browser.enableTouch=false;
	Browser.canvas=null;
	Browser.context=null;
	Browser.__init$=function(){
		AudioSound;
		WebAudioSound;
	}

	return Browser;
})()


/**
*<code>Utils</code> 是工具类。
*/
//class laya.utils.Utils
var Utils=(function(){
	function Utils(){}
	__class(Utils,'laya.utils.Utils');
	Utils.toRadian=function(angle){
		return angle *Utils._pi2;
	}

	Utils.toAngle=function(radian){
		return radian *Utils._pi;
	}

	Utils.toHexColor=function(color){
		if (color < 0 || isNaN(color))return null;
		var str=color.toString(16);
		while (str.length < 6)str="0"+str;
		return "#"+str;
	}

	Utils.getGID=function(){
		return Utils._gid++;
	}

	Utils.concatArray=function(source,array){
		if (!array)return source;
		if (!source)return array;
		var i=0,len=array.length;
		for (i=0;i < len;i++){
			source.push(array[i]);
		}
		return source;
	}

	Utils.clearArray=function(array){
		if (!array)return array;
		array.length=0;
		return array;
	}

	Utils.copyArray=function(source,array){
		source || (source=[]);
		if (!array)return source;
		source.length=array.length;
		var i=0,len=array.length;
		for (i=0;i < len;i++){
			source[i]=array[i];
		}
		return source;
	}

	Utils.getGlobalRecByPoints=function(sprite,x0,y0,x1,y1){
		var newLTPoint;
		newLTPoint=new Point(x0,y0);
		newLTPoint=sprite.localToGlobal(newLTPoint);
		var newRBPoint;
		newRBPoint=new Point(x1,y1);
		newRBPoint=sprite.localToGlobal(newRBPoint);
		return Rectangle._getWrapRec([newLTPoint.x,newLTPoint.y,newRBPoint.x,newRBPoint.y]);
	}

	Utils.getGlobalPosAndScale=function(sprite){
		return Utils.getGlobalRecByPoints(sprite,0,0,1,1);
	}

	Utils.bind=function(fun,scope){
		var rst=fun;
		rst=fun.bind(scope);;
		return rst;
	}

	Utils.measureText=function(txt,font){
		return RunDriver.measureText(txt,font);
	}

	Utils.updateOrder=function(array){
		if (!array || array.length < 2)return false;
		var i=1,j=0,len=array.length,key=NaN,c;
		while (i < len){
			j=i;
			c=array[j];
			key=array[j]._zOrder;
			while (--j >-1){
				if (array[j]._zOrder > key)array[j+1]=array[j];
				else break ;
			}
			array[j+1]=c;
			i++;
		};
		var model=c.parent.conchModel;
		if (model){
			if (model.updateZOrder !=null){
				model.updateZOrder();
				}else {
				for (i=0;i < len;i++){
					model.removeChild(array[i].conchModel);
				}
				for (i=0;i < len;i++){
					model.addChildAt(array[i].conchModel,i);
				}
			}
		}
		return true;
	}

	Utils.transPointList=function(points,x,y){
		var i=0,len=points.length;
		for (i=0;i < len;i+=2){
			points[i]+=x;
			points[i+1]+=y;
		}
	}

	Utils.parseInt=function(str,radix){
		(radix===void 0)&& (radix=0);
		var result=Browser.window.parseInt(str,radix);
		if (isNaN(result))return 0;
		return result;
	}

	Utils.getFileExtension=function(path){
		Utils._extReg.lastIndex=path.lastIndexOf(".");
		var result=Utils._extReg.exec(path);
		if (result && result.length > 1){
			return result[1].toLowerCase();
		}
		return null;
	}

	Utils.getTransformRelativeToWindow=function(coordinateSpace,x,y){
		var stage=Laya.stage;
		var globalTransform=laya.utils.Utils.getGlobalPosAndScale(coordinateSpace);
		var canvasMatrix=stage._canvasTransform.clone();
		var canvasLeft=canvasMatrix.tx;
		var canvasTop=canvasMatrix.ty;
		canvasMatrix.rotate(-Math.PI / 180 *Laya.stage.canvasDegree);
		canvasMatrix.scale(Laya.stage.clientScaleX,Laya.stage.clientScaleY);
		var perpendicular=(Laya.stage.canvasDegree % 180 !=0);
		var tx=NaN,ty=NaN;
		if (perpendicular){
			tx=y+globalTransform.y;
			ty=x+globalTransform.x;
			tx *=canvasMatrix.d;
			ty *=canvasMatrix.a;
			if (Laya.stage.canvasDegree==90){
				tx=canvasLeft-tx;
				ty+=canvasTop;
			}
			else {
				tx+=canvasLeft;
				ty=canvasTop-ty;
			}
		}
		else {
			tx=x+globalTransform.x;
			ty=y+globalTransform.y;
			tx *=canvasMatrix.a;
			ty *=canvasMatrix.d;
			tx+=canvasLeft;
			ty+=canvasTop;
		};
		var domScaleX=NaN,domScaleY=NaN;
		if (perpendicular){
			domScaleX=canvasMatrix.d *globalTransform.height;
			domScaleY=canvasMatrix.a *globalTransform.width;
			}else {
			domScaleX=canvasMatrix.a *globalTransform.width;
			domScaleY=canvasMatrix.d *globalTransform.height;
		}
		return {x:tx,y:ty,scaleX:domScaleX,scaleY:domScaleY};
	}

	Utils.fitDOMElementInArea=function(dom,coordinateSpace,x,y,width,height){
		if (!dom._fitLayaAirInitialized){
			dom._fitLayaAirInitialized=true;
			dom.style.transformOrigin=dom.style.webKittransformOrigin="left top";
			dom.style.position="absolute"
		};
		var transform=Utils.getTransformRelativeToWindow(coordinateSpace,x,y);
		dom.style.transform=dom.style.webkitTransform="scale("+transform.scaleX+","+transform.scaleY+") rotate("+(Laya.stage.canvasDegree)+"deg)";
		dom.style.width=width+'px';
		dom.style.height=height+'px';
		dom.style.left=transform.x+'px';
		dom.style.top=transform.y+'px';
	}

	Utils.isOkTextureList=function(textureList){
		if (!textureList)return false;
		var i=0,len=textureList.length;
		var tTexture;
		for (i=0;i < len;i++){
			tTexture=textureList[i];
			if (!tTexture||!tTexture.source)return false;
		}
		return true;
	}

	Utils.isOKCmdList=function(cmds){
		if (!cmds)return false;
		var i=0,len=cmds.length;
		var context=Render._context;
		var cmd;
		var tex;
		for (i=0;i < len;i++){
			cmd=cmds[i];
			switch(cmd.callee){
				case context._drawTexture:
				case context._fillTexture:
				case context._drawTextureWithTransform:
					tex=cmd[0];
					if (!tex || !tex.source)return false;
				}
		}
		return true;
	}

	Utils._gid=1;
	Utils._pi=180 / Math.PI;
	Utils._pi2=Math.PI / 180;
	Utils._extReg=/\.(\w+)\??/g;
	Utils.parseXMLFromString=function(value){
		var rst;
		value=value.replace(/>\s+</g,'><');
		rst=(new DOMParser()).parseFromString(value,'text/xml');
		if (rst.firstChild.textContent.indexOf("This page contains the following errors")>-1){
			throw new Error(rst.firstChild.firstChild.textContent);
		}
		return rst;
	}

	return Utils;
})()


/**
*@private
*对象缓存统一管理类
*/
//class laya.utils.CacheManager
var CacheManager=(function(){
	function CacheManager(){}
	__class(CacheManager,'laya.utils.CacheManager');
	CacheManager.regCacheByFunction=function(disposeFunction,getCacheListFunction){
		CacheManager.unRegCacheByFunction(disposeFunction,getCacheListFunction);
		var cache;
		cache={tryDispose:disposeFunction,getCacheList:getCacheListFunction};
		CacheManager._cacheList.push(cache);
	}

	CacheManager.unRegCacheByFunction=function(disposeFunction,getCacheListFunction){
		var i=0,len=0;
		len=CacheManager._cacheList.length;
		for (i=0;i < len;i++){
			if (CacheManager._cacheList[i].tryDispose==disposeFunction && CacheManager._cacheList[i].getCacheList==getCacheListFunction){
				CacheManager._cacheList.splice(i,1);
				return;
			}
		}
	}

	CacheManager.forceDispose=function(){
		var i=0,len=CacheManager._cacheList.length;
		for (i=0;i < len;i++){
			CacheManager._cacheList[i].tryDispose(true);
		}
	}

	CacheManager.beginCheck=function(waitTime){
		(waitTime===void 0)&& (waitTime=15000);
		Laya.timer.loop(waitTime,null,CacheManager._checkLoop);
	}

	CacheManager.stopCheck=function(){
		Laya.timer.clear(null,CacheManager._checkLoop);
	}

	CacheManager._checkLoop=function(){
		var cacheList=CacheManager._cacheList;
		if (cacheList.length < 1)return;
		var tTime=Browser.now();
		var count=0;
		var len=0;
		len=count=cacheList.length;
		while (count > 0){
			CacheManager._index++;
			CacheManager._index=CacheManager._index % len;
			cacheList[CacheManager._index].tryDispose(false);
			if (Browser.now()-tTime > CacheManager.loopTimeLimit)break ;
			count--;
		}
	}

	CacheManager.loopTimeLimit=2;
	CacheManager._cacheList=[];
	CacheManager._index=0;
	return CacheManager;
})()


/**
*<code>Ease</code> 类定义了缓动函数，以便实现 <code>Tween</code> 动画的缓动效果。
*/
//class laya.utils.Ease
var Ease=(function(){
	function Ease(){}
	__class(Ease,'laya.utils.Ease');
	Ease.linearNone=function(t,b,c,d){
		return c *t / d+b;
	}

	Ease.linearIn=function(t,b,c,d){
		return c *t / d+b;
	}

	Ease.linearInOut=function(t,b,c,d){
		return c *t / d+b;
	}

	Ease.linearOut=function(t,b,c,d){
		return c *t / d+b;
	}

	Ease.bounceIn=function(t,b,c,d){
		return c-Ease.bounceOut(d-t,0,c,d)+b;
	}

	Ease.bounceInOut=function(t,b,c,d){
		if (t < d *0.5)return Ease.bounceIn(t *2,0,c,d)*.5+b;
		else return Ease.bounceOut(t *2-d,0,c,d)*.5+c *.5+b;
	}

	Ease.bounceOut=function(t,b,c,d){
		if ((t /=d)< (1 / 2.75))return c *(7.5625 *t *t)+b;
		else if (t < (2 / 2.75))return c *(7.5625 *(t-=(1.5 / 2.75))*t+.75)+b;
		else if (t < (2.5 / 2.75))return c *(7.5625 *(t-=(2.25 / 2.75))*t+.9375)+b;
		else return c *(7.5625 *(t-=(2.625 / 2.75))*t+.984375)+b;
	}

	Ease.backIn=function(t,b,c,d,s){
		(s===void 0)&& (s=1.70158);
		return c *(t /=d)*t *((s+1)*t-s)+b;
	}

	Ease.backInOut=function(t,b,c,d,s){
		(s===void 0)&& (s=1.70158);
		if ((t /=d *0.5)< 1)return c *0.5 *(t *t *(((s *=(1.525))+1)*t-s))+b;
		return c / 2 *((t-=2)*t *(((s *=(1.525))+1)*t+s)+2)+b;
	}

	Ease.backOut=function(t,b,c,d,s){
		(s===void 0)&& (s=1.70158);
		return c *((t=t / d-1)*t *((s+1)*t+s)+1)+b;
	}

	Ease.elasticIn=function(t,b,c,d,a,p){
		(a===void 0)&& (a=0);
		(p===void 0)&& (p=0);
		var s;
		if (t==0)return b;
		if ((t /=d)==1)return b+c;
		if (!p)p=d *.3;
		if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
			a=c;
			s=p / 4;
		}else s=p / Ease.PI2 *Math.asin(c / a);
		return-(a *Math.pow(2,10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p))+b;
	}

	Ease.elasticInOut=function(t,b,c,d,a,p){
		(a===void 0)&& (a=0);
		(p===void 0)&& (p=0);
		var s;
		if (t==0)return b;
		if ((t /=d *0.5)==2)return b+c;
		if (!p)p=d *(.3 *1.5);
		if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
			a=c;
			s=p / 4;
		}else s=p / Ease.PI2 *Math.asin(c / a);
		if (t < 1)return-.5 *(a *Math.pow(2,10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p))+b;
		return a *Math.pow(2,-10 *(t-=1))*Math.sin((t *d-s)*Ease.PI2 / p)*.5+c+b;
	}

	Ease.elasticOut=function(t,b,c,d,a,p){
		(a===void 0)&& (a=0);
		(p===void 0)&& (p=0);
		var s;
		if (t==0)return b;
		if ((t /=d)==1)return b+c;
		if (!p)p=d *.3;
		if (!a || (c > 0 && a < c)|| (c < 0 && a <-c)){
			a=c;
			s=p / 4;
		}else s=p / Ease.PI2 *Math.asin(c / a);
		return (a *Math.pow(2,-10 *t)*Math.sin((t *d-s)*Ease.PI2 / p)+c+b);
	}

	Ease.strongIn=function(t,b,c,d){
		return c *(t /=d)*t *t *t *t+b;
	}

	Ease.strongInOut=function(t,b,c,d){
		if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t *t+b;
		return c *0.5 *((t-=2)*t *t *t *t+2)+b;
	}

	Ease.strongOut=function(t,b,c,d){
		return c *((t=t / d-1)*t *t *t *t+1)+b;
	}

	Ease.sineInOut=function(t,b,c,d){
		return-c *0.5 *(Math.cos(Math.PI *t / d)-1)+b;
	}

	Ease.sineIn=function(t,b,c,d){
		return-c *Math.cos(t / d *Ease.HALF_PI)+c+b;
	}

	Ease.sineOut=function(t,b,c,d){
		return c *Math.sin(t / d *Ease.HALF_PI)+b;
	}

	Ease.quintIn=function(t,b,c,d){
		return c *(t /=d)*t *t *t *t+b;
	}

	Ease.quintInOut=function(t,b,c,d){
		if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t *t+b;
		return c *0.5 *((t-=2)*t *t *t *t+2)+b;
	}

	Ease.quintOut=function(t,b,c,d){
		return c *((t=t / d-1)*t *t *t *t+1)+b;
	}

	Ease.quartIn=function(t,b,c,d){
		return c *(t /=d)*t *t *t+b;
	}

	Ease.quartInOut=function(t,b,c,d){
		if ((t /=d *0.5)< 1)return c *0.5 *t *t *t *t+b;
		return-c *0.5 *((t-=2)*t *t *t-2)+b;
	}

	Ease.quartOut=function(t,b,c,d){
		return-c *((t=t / d-1)*t *t *t-1)+b;
	}

	Ease.cubicIn=function(t,b,c,d){
		return c *(t /=d)*t *t+b;
	}

	Ease.cubicInOut=function(t,b,c,d){
		if ((t /=d *0.5)< 1)return c *0.5 *t *t *t+b;
		return c *0.5 *((t-=2)*t *t+2)+b;
	}

	Ease.cubicOut=function(t,b,c,d){
		return c *((t=t / d-1)*t *t+1)+b;
	}

	Ease.quadIn=function(t,b,c,d){
		return c *(t /=d)*t+b;
	}

	Ease.quadInOut=function(t,b,c,d){
		if ((t /=d *0.5)< 1)return c *0.5 *t *t+b;
		return-c *0.5 *((--t)*(t-2)-1)+b;
	}

	Ease.quadOut=function(t,b,c,d){
		return-c *(t /=d)*(t-2)+b;
	}

	Ease.expoIn=function(t,b,c,d){
		return (t==0)? b :c *Math.pow(2,10 *(t / d-1))+b-c *0.001;
	}

	Ease.expoInOut=function(t,b,c,d){
		if (t==0)return b;
		if (t==d)return b+c;
		if ((t /=d *0.5)< 1)return c *0.5 *Math.pow(2,10 *(t-1))+b;
		return c *0.5 *(-Math.pow(2,-10 *--t)+2)+b;
	}

	Ease.expoOut=function(t,b,c,d){
		return (t==d)? b+c :c *(-Math.pow(2,-10 *t / d)+1)+b;
	}

	Ease.circIn=function(t,b,c,d){
		return-c *(Math.sqrt(1-(t /=d)*t)-1)+b;
	}

	Ease.circInOut=function(t,b,c,d){
		if ((t /=d *0.5)< 1)return-c *0.5 *(Math.sqrt(1-t *t)-1)+b;
		return c *0.5 *(Math.sqrt(1-(t-=2)*t)+1)+b;
	}

	Ease.circOut=function(t,b,c,d){
		return c *Math.sqrt(1-(t=t / d-1)*t)+b;
	}

	Ease.HALF_PI=Math.PI *0.5;
	Ease.PI2=Math.PI *2;
	return Ease;
})()


/**
*<p> <code>Byte</code> 类提供用于优化读取、写入以及处理二进制数据的方法和属性。</p>
*<p><b>注意：</b> <code>Byte</code> 类适用于需要在字节层访问数据的高级开发人员。</p>
*/
//class laya.utils.Byte
var Byte=(function(){
	function Byte(data){
		/**
		*@private
		*是否为小端数据。
		*/
		this._xd_=true;
		this._allocated_=8;
		/**
		*@private
		*原始数据。
		*/
		//this._d_=null;
		/**
		*@private
		*DataView
		*/
		//this._u8d_=null;
		/**@private */
		this._pos_=0;
		/**@private */
		this._length=0;
		if (data){
			this._u8d_=new Uint8Array(data);
			this._d_=new DataView(this._u8d_.buffer);
			this._length=this._d_.byteLength;
			}else {
			this.___resizeBuffer(this._allocated_);
		}
	}

	__class(Byte,'laya.utils.Byte');
	var __proto=Byte.prototype;
	/**@private */
	__proto.___resizeBuffer=function(len){
		try {
			var newByteView=new Uint8Array(len);
			if (this._u8d_ !=null){
				if (this._u8d_.length <=len)newByteView.set(this._u8d_);
				else newByteView.set(this._u8d_.subarray(0,len));
			}
			this._u8d_=newByteView;
			this._d_=new DataView(newByteView.buffer);
			}catch (err){
			throw "___resizeBuffer err:"+len;
		}
	}

	/**
	*<p>常用于解析固定格式的字节流。</p>
	*<p>先从字节流的当前字节偏移位置处读取一个 <code>Uint16</code> 值，然后以此值为长度，读取此长度的字符串。</p>
	*@return 读取的字符串。
	*/
	__proto.getString=function(){
		return this.rUTF(this.getUint16());
	}

	/**
	*从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Float32Array</code> 对象并返回此对象。
	*@param start 开始位置。
	*@param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
	*@return 读取的 Float32Array 对象。
	*/
	__proto.getFloat32Array=function(start,len){
		var end=start+len;
		end=(end > this._length)? this._length :end;
		var v=new Float32Array(this._d_.buffer.slice(start,end));
		this._pos_=end;
		return v;
	}

	/**
	*从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Uint8Array</code> 对象并返回此对象。
	*@param start 开始位置。
	*@param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
	*@return 读取的 Uint8Array 对象。
	*/
	__proto.getUint8Array=function(start,len){
		var end=start+len;
		end=(end > this._length)? this._length :end;
		var v=new Uint8Array(this._d_.buffer.slice(start,end));
		this._pos_=end;
		return v;
	}

	/**
	*从字节流中 <code>start</code> 参数指定的位置开始，读取 <code>len</code> 参数指定的字节数的数据，用于创建一个 <code>Int16Array</code> 对象并返回此对象。
	*@param start 开始读取的字节偏移量位置。
	*@param len 需要读取的字节长度。如果要读取的长度超过可读取范围，则只返回可读范围内的值。
	*@return 读取的 Uint8Array 对象。
	*/
	__proto.getInt16Array=function(start,len){
		var end=start+len;
		end=(end > this._length)? this._length :end;
		var v=new Int16Array(this._d_.buffer.slice(start,end));
		this._pos_=end;
		return v;
	}

	/**
	*从字节流的当前字节偏移位置处读取一个 IEEE 754 单精度（32 位）浮点数。
	*@return 单精度（32 位）浮点数。
	*/
	__proto.getFloat32=function(){
		if (this._pos_+4 > this._length)throw "getFloat32 error - Out of bounds";
		var v=this._d_.getFloat32(this._pos_,this._xd_);
		this._pos_+=4;
		return v;
	}

	/**
	*从字节流的当前字节偏移量位置处读取一个 IEEE 754 双精度（64 位）浮点数。
	*@return 双精度（64 位）浮点数。
	*/
	__proto.getFloat64=function(){
		if (this._pos_+8 > this._length)throw "getFloat64 error - Out of bounds";
		var v=this._d_.getFloat64(this._pos_,this._xd_);
		this._pos_+=8;
		return v;
	}

	/**
	*在字节流的当前字节偏移量位置处写入一个 IEEE 754 单精度（32 位）浮点数。
	*@param value 单精度（32 位）浮点数。
	*/
	__proto.writeFloat32=function(value){
		this.ensureWrite(this._pos_+4);
		this._d_.setFloat32(this._pos_,value,this._xd_);
		this._pos_+=4;
	}

	/**
	*在字节流的当前字节偏移量位置处写入一个 IEEE 754 双精度（64 位）浮点数。
	*@param value 双精度（64 位）浮点数。
	*/
	__proto.writeFloat64=function(value){
		this.ensureWrite(this._pos_+8);
		this._d_.setFloat64(this._pos_,value,this._xd_);
		this._pos_+=8;
	}

	/**
	*从字节流的当前字节偏移量位置处读取一个 Int32 值。
	*@return Int32 值。
	*/
	__proto.getInt32=function(){
		if (this._pos_+4 > this._length)throw "getInt32 error - Out of bounds";
		var float=this._d_.getInt32(this._pos_,this._xd_);
		this._pos_+=4;
		return float;
	}

	/**
	*从字节流的当前字节偏移量位置处读取一个 Uint32 值。
	*@return Uint32 值。
	*/
	__proto.getUint32=function(){
		if (this._pos_+4 > this._length)throw "getUint32 error - Out of bounds";
		var v=this._d_.getUint32(this._pos_,this._xd_);
		this._pos_+=4;
		return v;
	}

	/**
	*在字节流的当前字节偏移量位置处写入指定的 Int32 值。
	*@param value 需要写入的 Int32 值。
	*/
	__proto.writeInt32=function(value){
		this.ensureWrite(this._pos_+4);
		this._d_.setInt32(this._pos_,value,this._xd_);
		this._pos_+=4;
	}

	/**
	*在字节流的当前字节偏移量位置处写入 Uint32 值。
	*@param value 需要写入的 Uint32 值。
	*/
	__proto.writeUint32=function(value){
		this.ensureWrite(this._pos_+4);
		this._d_.setUint32(this._pos_,value,this._xd_);
		this._pos_+=4;
	}

	/**
	*从字节流的当前字节偏移量位置处读取一个 Int16 值。
	*@return Int16 值。
	*/
	__proto.getInt16=function(){
		if (this._pos_+2 > this._length)throw "getInt16 error - Out of bounds";
		var us=this._d_.getInt16(this._pos_,this._xd_);
		this._pos_+=2;
		return us;
	}

	/**
	*从字节流的当前字节偏移量位置处读取一个 Uint16 值。
	*@return Uint16 值。
	*/
	__proto.getUint16=function(){
		if (this._pos_+2 > this._length)throw "getUint16 error - Out of bounds";
		var us=this._d_.getUint16(this._pos_,this._xd_);
		this._pos_+=2;
		return us;
	}

	/**
	*在字节流的当前字节偏移量位置处写入指定的 Uint16 值。
	*@param value 需要写入的Uint16 值。
	*/
	__proto.writeUint16=function(value){
		this.ensureWrite(this._pos_+2);
		this._d_.setUint16(this._pos_,value,this._xd_);
		this._pos_+=2;
	}

	/**
	*在字节流的当前字节偏移量位置处写入指定的 Int16 值。
	*@param value 需要写入的 Int16 值。
	*/
	__proto.writeInt16=function(value){
		this.ensureWrite(this._pos_+2);
		this._d_.setInt16(this._pos_,value,this._xd_);
		this._pos_+=2;
	}

	/**
	*从字节流的当前字节偏移量位置处读取一个 Uint8 值。
	*@return Uint8 值。
	*/
	__proto.getUint8=function(){
		if (this._pos_+1 > this._length)throw "getUint8 error - Out of bounds";
		return this._d_.getUint8(this._pos_++);
	}

	/**
	*在字节流的当前字节偏移量位置处写入指定的 Uint8 值。
	*@param value 需要写入的 Uint8 值。
	*/
	__proto.writeUint8=function(value){
		this.ensureWrite(this._pos_+1);
		this._d_.setUint8(this._pos_,value);
		this._pos_++;
	}

	/**
	*@private
	*从字节流的指定字节偏移量位置处读取一个 Uint8 值。
	*@param pos 字节读取位置。
	*@return Uint8 值。
	*/
	__proto._getUInt8=function(pos){
		return this._d_.getUint8(pos);
	}

	/**
	*@private
	*从字节流的指定字节偏移量位置处读取一个 Uint16 值。
	*@param pos 字节读取位置。
	*@return Uint16 值。
	*/
	__proto._getUint16=function(pos){
		return this._d_.getUint16(pos,this._xd_);
	}

	/**
	*@private
	*使用 getFloat32()读取6个值，用于创建并返回一个 Matrix 对象。
	*@return Matrix 对象。
	*/
	__proto._getMatrix=function(){
		var rst=new Matrix(this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32());
		return rst;
	}

	/**
	*@private
	*读取指定长度的 UTF 型字符串。
	*@param len 需要读取的长度。
	*@return 读取的字符串。
	*/
	__proto.rUTF=function(len){
		var v="",max=this._pos_+len,c=0,c2=0,c3=0,f=String.fromCharCode;
		var u=this._u8d_,i=0;
		while (this._pos_ < max){
			c=u[this._pos_++];
			if (c < 0x80){
				if (c !=0){
					v+=f(c);
				}
				}else if (c < 0xE0){
				v+=f(((c & 0x3F)<< 6)| (u[this._pos_++] & 0x7F));
				}else if (c < 0xF0){
				c2=u[this._pos_++];
				v+=f(((c & 0x1F)<< 12)| ((c2 & 0x7F)<< 6)| (u[this._pos_++] & 0x7F));
				}else {
				c2=u[this._pos_++];
				c3=u[this._pos_++];
				v+=f(((c & 0x0F)<< 18)| ((c2 & 0x7F)<< 12)| ((c3 << 6)& 0x7F)| (u[this._pos_++] & 0x7F));
			}
			i++;
		}
		return v;
	}

	/**
	*@private
	*读取 <code>len</code> 参数指定的长度的字符串。
	*@param len 要读取的字符串的长度。
	*@return 指定长度的字符串。
	*/
	__proto.getCustomString=function(len){
		var v="",ulen=0,c=0,c2=0,f=String.fromCharCode;
		var u=this._u8d_,i=0;
		while (len > 0){
			c=u[this._pos_];
			if (c < 0x80){
				v+=f(c);
				this._pos_++;
				len--;
				}else {
				ulen=c-0x80;
				this._pos_++;
				len-=ulen;
				while (ulen > 0){
					c=u[this._pos_++];
					c2=u[this._pos_++];
					v+=f((c2 << 8)| c);
					ulen--;
				}
			}
		}
		return v;
	}

	/**
	*清除字节数组的内容，并将 length 和 pos 属性重置为 0。调用此方法将释放 Byte 实例占用的内存。
	*/
	__proto.clear=function(){
		this._pos_=0;
		this.length=0;
	}

	/**
	*@private
	*获取此对象的 ArrayBuffer 引用。
	*@return
	*/
	__proto.__getBuffer=function(){
		return this._d_.buffer;
	}

	/**
	*<p>将 UTF-8 字符串写入字节流。类似于 writeUTF()方法，但 writeUTFBytes()不使用 16 位长度的字为字符串添加前缀。</p>
	*<p>对应的读取方法为： getUTFBytes 。</p>
	*@param value 要写入的字符串。
	*/
	__proto.writeUTFBytes=function(value){
		value=value+"";
		for (var i=0,sz=value.length;i < sz;i++){
			var c=value.charCodeAt(i);
			if (c <=0x7F){
				this.writeByte(c);
				}else if (c <=0x7FF){
				this.ensureWrite(this._pos_+2);
				this._u8d_.set([0xC0 | (c >> 6),0x80 | (c & 0x3F)],this._pos_);
				this._pos_+=2;
				}else if (c <=0xFFFF){
				this.ensureWrite(this._pos_+3);
				this._u8d_.set([0xE0 | (c >> 12),0x80 | ((c >> 6)& 0x3F),0x80 | (c & 0x3F)],this._pos_);
				this._pos_+=3;
				}else {
				this.ensureWrite(this._pos_+4);
				this._u8d_.set([0xF0 | (c >> 18),0x80 | ((c >> 12)& 0x3F),0x80 | ((c >> 6)& 0x3F),0x80 | (c & 0x3F)],this._pos_);
				this._pos_+=4;
			}
		}
	}

	/**
	*<p>将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节。</p>
	*<p>对应的读取方法为： getUTFString 。</p>
	*@param value 要写入的字符串值。
	*/
	__proto.writeUTFString=function(value){
		var tPos=this.pos;
		this.writeUint16(1);
		this.writeUTFBytes(value);
		var dPos=this.pos-tPos-2;
		if (dPos >=65536){
			throw "writeUTFString byte len more than 65536";
		}
		this._d_.setUint16(tPos,dPos,this._xd_);
	}

	/**
	*@private
	*读取 UTF-8 字符串。
	*@return 读取的字符串。
	*/
	__proto.readUTFString=function(){
		return this.readUTFBytes(this.getUint16());
	}

	/**
	*<p>从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是一个无符号的短整型（以此字节表示要读取的长度）。</p>
	*<p>对应的写入方法为： writeUTFString 。</p>
	*@return 读取的字符串。
	*/
	__proto.getUTFString=function(){
		return this.readUTFString();
	}

	/**
	*@private
	*读字符串，必须是 writeUTFBytes 方法写入的字符串。
	*@param len 要读的buffer长度，默认将读取缓冲区全部数据。
	*@return 读取的字符串。
	*/
	__proto.readUTFBytes=function(len){
		(len===void 0)&& (len=-1);
		if (len==0)return "";
		var lastBytes=this.bytesAvailable;
		if (len > lastBytes)throw "readUTFBytes error - Out of bounds";
		len=len > 0 ? len :lastBytes;
		return this.rUTF(len);
	}

	/**
	*<p>从字节流中读取一个由 length 参数指定的长度的 UTF-8 字节序列，并返回一个字符串。</p>
	*<p>一般读取的是由 writeUTFBytes 方法写入的字符串。</p>
	*@param len 要读的buffer长度，默认将读取缓冲区全部数据。
	*@return 读取的字符串。
	*/
	__proto.getUTFBytes=function(len){
		(len===void 0)&& (len=-1);
		return this.readUTFBytes(len);
	}

	/**
	*<p>在字节流中写入一个字节。</p>
	*<p>使用参数的低 8 位。忽略高 24 位。</p>
	*@param value
	*/
	__proto.writeByte=function(value){
		this.ensureWrite(this._pos_+1);
		this._d_.setInt8(this._pos_,value);
		this._pos_+=1;
	}

	/**
	*@private
	*从字节流中读取带符号的字节。
	*/
	__proto.readByte=function(){
		if (this._pos_+1 > this._length)throw "readByte error - Out of bounds";
		return this._d_.getInt8(this._pos_++);
	}

	/**
	*<p>从字节流中读取带符号的字节。</p>
	*<p>返回值的范围是从-128 到 127。</p>
	*@return 介于-128 和 127 之间的整数。
	*/
	__proto.getByte=function(){
		return this.readByte();
	}

	/**
	*<p>保证该字节流的可用长度不小于 <code>lengthToEnsure</code> 参数指定的值。</p>
	*@param lengthToEnsure 指定的长度。
	*/
	__proto.ensureWrite=function(lengthToEnsure){
		if (this._length < lengthToEnsure)this._length=lengthToEnsure;
		if (this._allocated_ < lengthToEnsure)this.length=lengthToEnsure;
	}

	/**
	*<p>将指定 arraybuffer 对象中的以 offset 为起始偏移量， length 为长度的字节序列写入字节流。</p>
	*<p>如果省略 length 参数，则使用默认长度 0，该方法将从 offset 开始写入整个缓冲区；如果还省略了 offset 参数，则写入整个缓冲区。</p>
	*<p>如果 offset 或 length 小于0，本函数将抛出异常。</p>
	*$NEXTBIG 由于没有判断length和arraybuffer的合法性，当开发者填写了错误的length值时，会导致写入多余的空白数据甚至内存溢出，为了避免影响开发者正在使用此方法的功能，下个重大版本会修复这些问题。
	*@param arraybuffer 需要写入的 Arraybuffer 对象。
	*@param offset Arraybuffer 对象的索引的偏移量（以字节为单位）
	*@param length 从 Arraybuffer 对象写入到 Byte 对象的长度（以字节为单位）
	*/
	__proto.writeArrayBuffer=function(arraybuffer,offset,length){
		(offset===void 0)&& (offset=0);
		(length===void 0)&& (length=0);
		if (offset < 0 || length < 0)throw "writeArrayBuffer error - Out of bounds";
		if (length==0)length=arraybuffer.byteLength-offset;
		this.ensureWrite(this._pos_+length);
		var uint8array=new Uint8Array(arraybuffer);
		this._u8d_.set(uint8array.subarray(offset,offset+length),this._pos_);
		this._pos_+=length;
	}

	/**
	*读取ArrayBuffer数据
	*@param length
	*@return
	*/
	__proto.readArrayBuffer=function(length){
		var rst;
		rst=this._u8d_.buffer.slice(this._pos_,this._pos_+length);
		this._pos_=this._pos_+length
		return rst;
	}

	/**
	*移动或返回 Byte 对象的读写指针的当前位置（以字节为单位）。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
	*/
	__getset(0,__proto,'pos',function(){
		return this._pos_;
		},function(value){
		this._pos_=value;
	});

	/**
	*可从字节流的当前位置到末尾读取的数据的字节数。
	*/
	__getset(0,__proto,'bytesAvailable',function(){
		return this._length-this._pos_;
	});

	/**
	*<p> <code>Byte</code> 对象的长度（以字节为单位）。</p>
	*<p>如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧；如果将长度设置为小于当前长度的值，将会截断该字节数组。</p>
	*<p>如果要设置的长度大于当前已分配的内存空间的字节长度，则重新分配内存空间，大小为以下两者较大者：要设置的长度、当前已分配的长度的2倍，并将原有数据拷贝到新的内存空间中；如果要设置的长度小于当前已分配的内存空间的字节长度，也会重新分配内存空间，大小为要设置的长度，并将原有数据从头截断为要设置的长度存入新的内存空间中。</p>
	*/
	__getset(0,__proto,'length',function(){
		return this._length;
		},function(value){
		if (this._allocated_ < value)
			this.___resizeBuffer(this._allocated_=Math.floor(Math.max(value,this._allocated_ *2)));
		else if (this._allocated_ > value)
		this.___resizeBuffer(this._allocated_=value);
		this._length=value;
	});

	/**
	*<p> <code>Byte</code> 实例的字节序。取值为：<code>BIG_ENDIAN</code> 或 <code>BIG_ENDIAN</code> 。</p>
	*<p>主机字节序，是 CPU 存放数据的两种不同顺序，包括小端字节序和大端字节序。通过 <code>getSystemEndian</code> 可以获取当前系统的字节序。</p>
	*<p> <code>BIG_ENDIAN</code> ：大端字节序，地址低位存储值的高位，地址高位存储值的低位。有时也称之为网络字节序。<br/>
	*<code>LITTLE_ENDIAN</code> ：小端字节序，地址低位存储值的低位，地址高位存储值的高位。</p>
	*/
	__getset(0,__proto,'endian',function(){
		return this._xd_ ? "littleEndian" :"bigEndian";
		},function(endianStr){
		this._xd_=(endianStr=="littleEndian");
	});

	/**
	*获取此对象的 ArrayBuffer 数据，数据只包含有效数据部分。
	*/
	__getset(0,__proto,'buffer',function(){
		var rstBuffer=this._d_.buffer;
		if (rstBuffer.byteLength==this.length)return rstBuffer;
		return rstBuffer.slice(0,this.length);
	});

	Byte.getSystemEndian=function(){
		if (!Byte._sysEndian){
			var buffer=new ArrayBuffer(2);
			new DataView(buffer).setInt16(0,256,true);
			Byte._sysEndian=(new Int16Array(buffer))[0]===256 ? "littleEndian" :"bigEndian";
		}
		return Byte._sysEndian;
	}

	Byte.BIG_ENDIAN="bigEndian";
	Byte.LITTLE_ENDIAN="littleEndian";
	Byte._sysEndian=null;
	return Byte;
})()


/**
*@private
*<code>HTMLChar</code> 是一个 HTML 字符类。
*/
//class laya.utils.HTMLChar
var HTMLChar=(function(){
	function HTMLChar(char,w,h,style){
		//this._sprite=null;
		//this._x=NaN;
		//this._y=NaN;
		//this._w=NaN;
		//this._h=NaN;
		/**表示是否是正常单词(英文|.|数字)。*/
		//this.isWord=false;
		/**字符。*/
		//this.char=null;
		/**字符数量。*/
		//this.charNum=NaN;
		/**CSS 样式。*/
		//this.style=null;
		this.char=char;
		this.charNum=char.charCodeAt(0);
		this._x=this._y=0;
		this.width=w;
		this.height=h;
		this.style=style;
		this.isWord=!HTMLChar._isWordRegExp.test(char);
	}

	__class(HTMLChar,'laya.utils.HTMLChar');
	var __proto=HTMLChar.prototype;
	Laya.imps(__proto,{"laya.display.ILayout":true})
	/**
	*设置与此对象绑定的显示对象 <code>Sprite</code> 。
	*@param sprite 显示对象 <code>Sprite</code> 。
	*/
	__proto.setSprite=function(sprite){
		this._sprite=sprite;
	}

	/**
	*获取与此对象绑定的显示对象 <code>Sprite</code>。
	*@return
	*/
	__proto.getSprite=function(){
		return this._sprite;
	}

	/**@private */
	__proto._isChar=function(){
		return true;
	}

	/**@private */
	__proto._getCSSStyle=function(){
		return this.style;
	}

	/**
	*高度。
	*/
	__getset(0,__proto,'height',function(){
		return this._h;
		},function(value){
		this._h=value;
	});

	/**
	*宽度。
	*/
	__getset(0,__proto,'width',function(){
		return this._w;
		},function(value){
		this._w=value;
	});

	/**
	*此对象存储的 Y 轴坐标值。
	*当设置此值时，如果此对象有绑定的 Sprite 对象，则改变 Sprite 对象的属性 y 的值。
	*/
	__getset(0,__proto,'y',function(){
		return this._y;
		},function(value){
		if (this._sprite){
			this._sprite.y=value;
		}
		this._y=value;
	});

	/**
	*此对象存储的 X 轴坐标值。
	*当设置此值时，如果此对象有绑定的 Sprite 对象，则改变 Sprite 对象的属性 x 的值。
	*/
	__getset(0,__proto,'x',function(){
		return this._x;
		},function(value){
		if (this._sprite){
			this._sprite.x=value;
		}
		this._x=value;
	});

	HTMLChar._isWordRegExp=new RegExp("[\\w\.]","");
	return HTMLChar;
})()


/**
*封装弱引用WeakMap
*如果支持WeakMap，则使用WeakMap，如果不支持，则用Object代替
*注意：如果采用Object，为了防止内存泄漏，则采用定时清理缓存策略
*/
//class laya.utils.WeakObject
var WeakObject=(function(){
	function WeakObject(){
		/**@private */
		this._obj=null;
		this._obj=WeakObject.supportWeakMap ? new Browser.window.WeakMap():{};
		if (!WeakObject.supportWeakMap)WeakObject._maps.push(this);
	}

	__class(WeakObject,'laya.utils.WeakObject');
	var __proto=WeakObject.prototype;
	/**
	*设置缓存
	*@param key kye对象，可被回收
	*@param value object对象，可被回收
	*/
	__proto.set=function(key,value){
		if (key==null)return;
		if (WeakObject.supportWeakMap){
			var objKey=key;
			if ((typeof key=='string')|| (typeof key=='number')){
				objKey=WeakObject._keys[key];
				if (!objKey)objKey=WeakObject._keys[key]={k:key};
			}
			this._obj.set(objKey,value);
			}else {
			if ((typeof key=='string')|| (typeof key=='number')){
				this._obj[key]=value;
				}else {
				key.$_GID || (key.$_GID=Utils.getGID());
				this._obj[key.$_GID]=value;
			}
		}
	}

	/**
	*获取缓存
	*@param key kye对象，可被回收
	*/
	__proto.get=function(key){
		if (key==null)return null;
		if (WeakObject.supportWeakMap){
			var objKey=((typeof key=='string')|| (typeof key=='number'))? WeakObject._keys[key] :key;
			if (!objKey)return null;
			return this._obj.get(objKey);
			}else {
			if ((typeof key=='string')|| (typeof key=='number'))return this._obj[key];
			return this._obj[key.$_GID];
		}
	}

	/**
	*删除缓存
	*/
	__proto.del=function(key){
		if (key==null)return;
		if (WeakObject.supportWeakMap){
			var objKey=((typeof key=='string')|| (typeof key=='number'))? WeakObject._keys[key] :key;
			if (!objKey)return;
			this._obj.delete(objKey);
			}else {
			if ((typeof key=='string')|| (typeof key=='number'))delete this._obj[key];
			else delete this._obj[this._obj.$_GID];
		}
	}

	/**
	*是否有缓存
	*/
	__proto.has=function(key){
		if (key==null)return false;
		if (WeakObject.supportWeakMap){
			var objKey=((typeof key=='string')|| (typeof key=='number'))? WeakObject._keys[key] :key;
			return this._obj.has(objKey);
			}else {
			if ((typeof key=='string')|| (typeof key=='number'))return this._obj[key] !=null;
			return this._obj[this._obj.$_GID] !=null;
		}
	}

	WeakObject.__init__=function(){
		WeakObject.supportWeakMap=Browser.window.WeakMap !=null;
		if (!WeakObject.supportWeakMap)Laya.timer.loop(WeakObject.delInterval,null,WeakObject.clearCache);
	}

	WeakObject.clearCache=function(){
		for (var i=0,n=WeakObject._maps.length;i < n;i++){
			var obj=WeakObject._maps[i];
			obj._obj={};
		}
	}

	WeakObject.supportWeakMap=false;
	WeakObject.delInterval=5 *60 *1000;
	WeakObject._keys={};
	WeakObject._maps=[];
	__static(WeakObject,
	['I',function(){return this.I=new WeakObject();}
	]);
	return WeakObject;
})()


/**
*<p> <code>Pool</code> 是对象池类，用于对象的存贮、重复使用。</p>
*<p>合理使用对象池，可以有效减少对象创建的开销，避免频繁的垃圾回收，从而优化游戏流畅度。</p>
*/
//class laya.utils.Pool
var Pool=(function(){
	function Pool(){}
	__class(Pool,'laya.utils.Pool');
	Pool.getPoolBySign=function(sign){
		return Pool._poolDic[sign] || (Pool._poolDic[sign]=[]);
	}

	Pool.clearBySign=function(sign){
		if (Pool._poolDic[sign])Pool._poolDic[sign].length=0;
	}

	Pool.recover=function(sign,item){
		if (item["__InPool"])return;
		item["__InPool"]=true;
		Pool.getPoolBySign(sign).push(item);
	}

	Pool.getItemByClass=function(sign,cls){
		var pool=Pool.getPoolBySign(sign);
		var rst=pool.length ? pool.pop():new cls();
		rst["__InPool"]=false;
		return rst;
	}

	Pool.getItemByCreateFun=function(sign,createFun,caller){
		var pool=Pool.getPoolBySign(sign);
		var rst=pool.length ? pool.pop():createFun.call(caller);
		rst["__InPool"]=false;
		return rst;
	}

	Pool.getItem=function(sign){
		var pool=Pool.getPoolBySign(sign);
		var rst=pool.length ? pool.pop():null;
		if (rst){
			rst["__InPool"]=false;
		}
		return rst;
	}

	Pool._poolDic={};
	Pool.InPoolSign="__InPool";
	return Pool;
})()


/**
*<code>ClassUtils</code> 是一个类工具类。
*/
//class laya.utils.ClassUtils
var ClassUtils=(function(){
	function ClassUtils(){}
	__class(ClassUtils,'laya.utils.ClassUtils');
	ClassUtils.regClass=function(className,classDef){
		ClassUtils._classMap[className]=classDef;
	}

	ClassUtils.getRegClass=function(className){
		return ClassUtils._classMap[className];
	}

	ClassUtils.getInstance=function(className){
		var compClass=ClassUtils.getClass(className);
		if (compClass)
			return new compClass();
		else
		console.warn("[error] Undefined class:",className);
		return null;
	}

	ClassUtils.createByJson=function(json,node,root,customHandler,instanceHandler){
		if ((typeof json=='string'))
			json=JSON.parse(json);
		var props=json.props;
		if (!node){
			node=instanceHandler ? instanceHandler.runWith(json):ClassUtils.getInstance(props.runtime || json.type);
			if (!node)
				return null;
		};
		var child=json.child;
		if (child){
			for (var i=0,n=child.length;i < n;i++){
				var data=child[i];
				if ((data.props.name==="render" || data.props.renderType==="render")&& node["_$set_itemRender"])
					node.itemRender=data;
				else {
					if (data.type=="Graphic"){
						ClassUtils.addGraphicsToSprite(data,node);
						}else if (ClassUtils.isDrawType(data.type)){
						ClassUtils.addGraphicToSprite(data,node,true);
						}else {
						var tChild=ClassUtils.createByJson(data,null,root,customHandler,instanceHandler)
						if (data.type=="Script"){
							if (tChild.hasOwnProperty("owner")){
								tChild["owner"]=node;
								}else if (tChild.hasOwnProperty("target")){
								tChild["target"]=node;
							}
							}else if (data.props.renderType=="mask"){
							node.mask=tChild;
							}else {
							node.addChild(tChild);
						}
					}
				}
			}
		}
		if (props){
			for (var prop in props){
				var value=props[prop];
				if (prop==="var" && root){
					root[value]=node;
					}else if ((value instanceof Array)&& (typeof (node[prop])=='function')){
					node[prop].apply(node,value);
					}else {
					node[prop]=value;
				}
			}
		}
		if (customHandler && json.customProps){
			customHandler.runWith([node,json]);
		}
		if (node["created"])
			node.created();
		return node;
	}

	ClassUtils.addGraphicsToSprite=function(graphicO,sprite){
		var graphics;
		graphics=graphicO.child;
		if (!graphics || graphics.length < 1)
			return;
		var g;
		g=ClassUtils._getGraphicsFromSprite(graphicO,sprite);
		var ox=0;
		var oy=0;
		if (graphicO.props){
			ox=ClassUtils._getObjVar(graphicO.props,"x",0);
			oy=ClassUtils._getObjVar(graphicO.props,"y",0);
		}
		if (ox !=0 && oy !=0){
			g.translate(ox,oy);
		};
		var i=0,len=0;
		len=graphics.length;
		for (i=0;i < len;i++){
			ClassUtils._addGraphicToGraphics(graphics[i],g);
		}
		if (ox !=0 && oy !=0){
			g.translate(-ox,-oy);
		}
	}

	ClassUtils.addGraphicToSprite=function(graphicO,sprite,isChild){
		(isChild===void 0)&& (isChild=false);
		var g;
		g=isChild ? ClassUtils._getGraphicsFromSprite(graphicO,sprite):sprite.graphics;
		ClassUtils._addGraphicToGraphics(graphicO,g);
	}

	ClassUtils._getGraphicsFromSprite=function(dataO,sprite){
		var g;
		if (!dataO || !dataO.props)
			return sprite.graphics;
		var propsName;
		propsName=dataO.props.renderType;
		switch (propsName){
			case "hit":
			case "unHit":;
				var hitArea;
				if (!sprite.hitArea){
					sprite.hitArea=new HitArea();
				}
				hitArea=sprite.hitArea;
				if (!hitArea[propsName]){
					hitArea[propsName]=new Graphics();
				}
				g=hitArea[propsName];
				break ;
			default :
			}
		if (!g)
			g=sprite.graphics;
		return g;
	}

	ClassUtils._getTransformData=function(propsO){
		var m;
		if (propsO.hasOwnProperty("pivotX")|| propsO.hasOwnProperty("pivotY")){
			m=m || new Matrix();
			m.translate(-ClassUtils._getObjVar(propsO,"pivotX",0),-ClassUtils._getObjVar(propsO,"pivotY",0));
		};
		var sx=ClassUtils._getObjVar(propsO,"scaleX",1),sy=ClassUtils._getObjVar(propsO,"scaleY",1);
		var rotate=ClassUtils._getObjVar(propsO,"rotation",0);
		var skewX=ClassUtils._getObjVar(propsO,"skewX",0);
		var skewY=ClassUtils._getObjVar(propsO,"skewY",0);
		if (sx !=1 || sy !=1 || rotate !=0){
			m=m || new Matrix();
			m.scale(sx,sy);
			m.rotate(rotate *0.0174532922222222);
		}
		return m;
	}

	ClassUtils._addGraphicToGraphics=function(graphicO,graphic){
		var propsO;
		propsO=graphicO.props;
		if (!propsO)
			return;
		var drawConfig;
		drawConfig=ClassUtils.DrawTypeDic[graphicO.type];
		if (!drawConfig)
			return;
		var g;
		g=graphic;
		var m;
		var params=ClassUtils._getParams(propsO,drawConfig[1],drawConfig[2],drawConfig[3]);
		m=ClassUtils._tM;
		if (m || ClassUtils._alpha !=1){
			g.save();
			if (m)
				g.transform(m);
			if (ClassUtils._alpha !=1)
				g.alpha(ClassUtils._alpha);
		}
		g[drawConfig[0]].apply(g,params);
		if (m || ClassUtils._alpha !=1){
			g.restore();
		}
	}

	ClassUtils._adptLineData=function(params){
		params[2]=parseFloat(params[0])+parseFloat(params[2]);
		params[3]=parseFloat(params[1])+parseFloat(params[3]);
		return params;
	}

	ClassUtils._adptTextureData=function(params){
		params[0]=Loader.getRes(params[0]);
		return params;
	}

	ClassUtils._adptLinesData=function(params){
		params[2]=ClassUtils._getPointListByStr(params[2]);
		return params;
	}

	ClassUtils.isDrawType=function(type){
		if (type=="Image")
			return false;
		return ClassUtils.DrawTypeDic.hasOwnProperty(type);
	}

	ClassUtils._getParams=function(obj,params,xPos,adptFun){
		(xPos===void 0)&& (xPos=0);
		var rst;
		rst=ClassUtils._temParam;
		rst.length=params.length;
		var i=0,len=0;
		len=params.length;
		for (i=0;i < len;i++){
			rst[i]=ClassUtils._getObjVar(obj,params[i][0],params[i][1]);
		}
		ClassUtils._alpha=ClassUtils._getObjVar(obj,"alpha",1);
		var m;
		m=ClassUtils._getTransformData(obj);
		if (m){
			if (!xPos)xPos=0;
			m.translate(rst[xPos],rst[xPos+1]);
			rst[xPos]=rst[xPos+1]=0;
			ClassUtils._tM=m;
			}else {
			ClassUtils._tM=null;
		}
		if (adptFun && ClassUtils[adptFun]){
			rst=ClassUtils[adptFun](rst);
		}
		return rst;
	}

	ClassUtils._getPointListByStr=function(str){
		var pointArr;
		pointArr=str.split(",");
		var i=0,len=0;
		len=pointArr.length;
		for (i=0;i < len;i++){
			pointArr[i]=parseFloat(pointArr[i]);
		}
		return pointArr;
	}

	ClassUtils._getObjVar=function(obj,key,noValue){
		if (obj.hasOwnProperty(key)){
			return obj[key];
		}
		return noValue;
	}

	ClassUtils._temParam=[];
	ClassUtils._classMap={'Sprite':'laya.display.Sprite','Text':'laya.display.Text','Animation':'laya.display.Animation','Skeleton':'laya.ani.bone.Skeleton','Particle2D':'laya.particle.Particle2D','div':'laya.html.dom.HTMLDivElement','p':'laya.html.dom.HTMLElement','img':'laya.html.dom.HTMLImageElement','span':'laya.html.dom.HTMLElement','br':'laya.html.dom.HTMLBrElement','style':'laya.html.dom.HTMLStyleElement','font':'laya.html.dom.HTMLElement','a':'laya.html.dom.HTMLElement','#text':'laya.html.dom.HTMLElement'};
	ClassUtils.getClass=function(className){
		var classObject=ClassUtils._classMap[className] || className;
		if ((typeof classObject=='string'))
			return Laya["__classmap"][classObject];
		return classObject;
	}

	ClassUtils._tM=null;
	ClassUtils._alpha=NaN;
	__static(ClassUtils,
	['DrawTypeDic',function(){return this.DrawTypeDic={"Rect":["drawRect",[["x",0],["y",0],["width",0],["height",0],["fillColor",null],["lineColor",null],["lineWidth",1]]],"Circle":["drawCircle",[["x",0],["y",0],["radius",0],["fillColor",null],["lineColor",null],["lineWidth",1]]],"Pie":["drawPie",[["x",0],["y",0],["radius",0],["startAngle",0],["endAngle",0],["fillColor",null],["lineColor",null],["lineWidth",1]]],"Image":["drawTexture",[["x",0],["y",0],["width",0],["height",0]]],"Texture":["drawTexture",[["skin",null],["x",0],["y",0],["width",0],["height",0]],1,"_adptTextureData"],"FillTexture":["fillTexture",[["skin",null],["x",0],["y",0],["width",0],["height",0],["repeat",null]],1,"_adptTextureData"],"FillText":["fillText",[["text",""],["x",0],["y",0],["font",null],["color",null],["textAlign",null]],1],"Line":["drawLine",[["x",0],["y",0],["toX",0],["toY",0],["lineColor",null],["lineWidth",0]],0,"_adptLineData"],"Lines":["drawLines",[["x",0],["y",0],["points",""],["lineColor",null],["lineWidth",0]],0,"_adptLinesData"],"Curves":["drawCurves",[["x",0],["y",0],["points",""],["lineColor",null],["lineWidth",0]],0,"_adptLinesData"],"Poly":["drawPoly",[["x",0],["y",0],["points",""],["fillColor",null],["lineColor",null],["lineWidth",1]],0,"_adptLinesData"]};}
	]);
	return ClassUtils;
})()


/**
*@private
*<code>Color</code> 是一个颜色值处理类。
*/
//class laya.utils.Color
var Color=(function(){
	function Color(str){
		/**@private */
		this._color=[];
		/**字符串型颜色值。*/
		//this.strColor=null;
		/**uint 型颜色值。*/
		//this.numColor=0;
		//this._drawStyle=null;
		if ((typeof str=='string')){
			this.strColor=str;
			if (str===null)str="#000000";
			str.charAt(0)=='#' && (str=str.substr(1));
			var len=str.length;
			if (len==3 || len==4){
				var temp="";
				for (var i=0;i < len;i++){
					temp+=(str[i]+str[i]);
				}
				str=temp;
			};
			var color=this.numColor=parseInt(str,16);
			var flag=(str.length==8);
			if (flag){
				this._color=[parseInt(str.substr(0,2),16)/ 255,((0x00FF0000 & color)>> 16)/ 255,((0x0000FF00 & color)>> 8)/ 255,(0x000000FF & color)/ 255];
				return;
			}
			}else {
			color=this.numColor=str;
			this.strColor=Utils.toHexColor(color);
		}
		this._color=[((0xFF0000 & color)>> 16)/ 255,((0xFF00 & color)>> 8)/ 255,(0xFF & color)/ 255,1];
		(this._color).__id=++Color._COLODID;
	}

	__class(Color,'laya.utils.Color');
	Color._initDefault=function(){
		Color._DEFAULT={};
		for (var i in Color._COLOR_MAP)Color._SAVE[i]=Color._DEFAULT[i]=new Color(Color._COLOR_MAP[i]);
		return Color._DEFAULT;
	}

	Color._initSaveMap=function(){
		Color._SAVE_SIZE=0;
		Color._SAVE={};
		for (var i in Color._DEFAULT)Color._SAVE[i]=Color._DEFAULT[i];
	}

	Color.create=function(str){
		var color=Color._SAVE[str+""];
		if (color !=null)return color;
		(Color._SAVE_SIZE < 1000)|| Color._initSaveMap();
		return Color._SAVE[str+""]=new Color(str);
	}

	Color._SAVE={};
	Color._SAVE_SIZE=0;
	Color._COLOR_MAP={"white":'#FFFFFF',"red":'#FF0000',"green":'#00FF00',"blue":'#0000FF',"black":'#000000',"yellow":'#FFFF00','gray':'#AAAAAA'};
	Color._DEFAULT=Color._initDefault();
	Color._COLODID=1;
	return Color;
})()


/**
*<code>Log</code> 类用于在界面内显示日志记录信息。
*/
//class laya.utils.Log
var Log=(function(){
	function Log(){}
	__class(Log,'laya.utils.Log');
	Log.enable=function(){
		if (!Log._logdiv){
			Log._logdiv=Browser.window.document.createElement('div');
			Browser.window.document.body.appendChild(Log._logdiv);
			Log._logdiv.style.cssText="pointer-events:none;border:white;overflow:hidden;z-index:1000000;background:rgba(100,100,100,0.6);color:white;position: absolute;left:0px;top:0px;width:50%;height:50%;";
		}
	}

	Log.toggle=function(){
		var style=Log._logdiv.style;
		if (style.width=="1px"){
			style.width=style.height="50%";
			}else {
			style.width=style.height="1px";
		}
	}

	Log.print=function(value){
		if (Log._logdiv){
			if (Log._count >=Log.maxCount)Log.clear();
			Log._count++;
			Log._logdiv.innerText+=value+"\n";
			Log._logdiv.scrollTop=Log._logdiv.scrollHeight;
		}
	}

	Log.clear=function(){
		Log._logdiv.innerText="";
		Log._count=0;
	}

	Log._logdiv=null;
	Log._count=0;
	Log.maxCount=20;
	return Log;
})()


/**
*@private
*/
//class laya.utils.VectorGraphManager
var VectorGraphManager=(function(){
	function VectorGraphManager(){
		this.useDic={};
		this.shapeDic={};
		this.shapeLineDic={};
		this._id=0;
		this._checkKey=false;
		this._freeIdArray=[];
		if (Render.isWebGL){
			CacheManager.regCacheByFunction(Utils.bind(this.startDispose,this),Utils.bind(this.getCacheList,this));
		}
	}

	__class(VectorGraphManager,'laya.utils.VectorGraphManager');
	var __proto=VectorGraphManager.prototype;
	/**
	*得到个空闲的ID
	*@return
	*/
	__proto.getId=function(){
		return this._id++;
	}

	/**
	*添加一个图形到列表中
	*@param id
	*@param shape
	*/
	__proto.addShape=function(id,shape){
		this.shapeDic[id]=shape;
		if (!this.useDic[id]){
			this.useDic[id]=true;
		}
	}

	/**
	*添加一个线图形到列表中
	*@param id
	*@param Line
	*/
	__proto.addLine=function(id,Line){
		this.shapeLineDic[id]=Line;
		if (!this.shapeLineDic[id]){
			this.shapeLineDic[id]=true;
		}
	}

	/**
	*检测一个对象是否在使用中
	*@param id
	*/
	__proto.getShape=function(id){
		if (this._checkKey){
			if (this.useDic[id] !=null){
				this.useDic[id]=true;
			}
		}
	}

	/**
	*删除一个图形对象
	*@param id
	*/
	__proto.deleteShape=function(id){
		if (this.shapeDic[id]){
			this.shapeDic[id]=null;
			delete this.shapeDic[id];
		}
		if (this.shapeLineDic[id]){
			this.shapeLineDic[id]=null;
			delete this.shapeLineDic[id];
		}
		if (this.useDic[id] !=null){
			delete this.useDic[id];
		}
	}

	/**
	*得到缓存列表
	*@return
	*/
	__proto.getCacheList=function(){
		var str;
		var list=[];
		for (str in this.shapeDic){
			list.push(this.shapeDic[str]);
		}
		for (str in this.shapeLineDic){
			list.push(this.shapeLineDic[str]);
		}
		return list;
	}

	/**
	*开始清理状态，准备销毁
	*/
	__proto.startDispose=function(key){
		var str;
		for (str in this.useDic){
			this.useDic[str]=false;
		}
		this._checkKey=true;
	}

	/**
	*确认销毁
	*/
	__proto.endDispose=function(){
		if (this._checkKey){
			var str;
			for (str in this.useDic){
				if (!this.useDic[str]){
					this.deleteShape(str);
				}
			}
			this._checkKey=false;
		}
	}

	VectorGraphManager.getInstance=function(){
		return VectorGraphManager.instance=VectorGraphManager.instance|| new VectorGraphManager();
	}

	VectorGraphManager.instance=null;
	return VectorGraphManager;
})()


/**
*<code>Timer</code> 是时钟管理类。它是一个单例，不要手动实例化此类，应该通过 Laya.timer 访问。
*/
//class laya.utils.Timer
var Timer=(function(){
	var TimerHandler;
	function Timer(){
		/**两帧之间的时间间隔,单位毫秒。*/
		this._delta=0;
		/**时针缩放。*/
		this.scale=1;
		/**当前的帧数。*/
		this.currFrame=0;
		/**@private */
		this._mid=1;
		/**@private */
		this._map=[];
		/**@private */
		this._laters=[];
		/**@private */
		this._handlers=[];
		/**@private */
		this._temp=[];
		/**@private */
		this._count=0;
		this.currTimer=this._now();
		this._lastTimer=this._now();
		this._init();
	}

	__class(Timer,'laya.utils.Timer');
	var __proto=Timer.prototype;
	/**@private */
	__proto._init=function(){
		Laya.timer && Laya.timer.frameLoop(1,this,this._update);
	}

	/**@private */
	__proto._now=function(){
		return Date.now();
	}

	/**
	*@private
	*帧循环处理函数。
	*/
	__proto._update=function(){
		if (this.scale <=0){
			this._lastTimer=this._now();
			return;
		};
		var frame=this.currFrame=this.currFrame+this.scale;
		var now=this._now();
		this._delta=(now-this._lastTimer)*this.scale;
		var timer=this.currTimer=this.currTimer+this._delta;
		this._lastTimer=now;
		var handlers=this._handlers;
		this._count=0;
		for (i=0,n=handlers.length;i < n;i++){
			handler=handlers[i];
			if (handler.method!==null){
				var t=handler.userFrame ? frame :timer;
				if (t >=handler.exeTime){
					if (handler.repeat){
						if (!handler.jumpFrame){
							handler.exeTime+=handler.delay;
							handler.run(false);
							if (t > handler.exeTime){
								handler.exeTime+=Math.ceil((t-handler.exeTime)/ handler.delay)*handler.delay;
							}
							}else {
							while (t >=handler.exeTime){
								handler.exeTime+=handler.delay;
								handler.run(false);
							}
						}
						}else {
						handler.run(true);
					}
				}
				}else {
				this._count++;
			}
		}
		if (this._count > 30 || frame % 200===0)this._clearHandlers();
		var laters=this._laters;
		for (var i=0,n=laters.length-1;i <=n;i++){
			var handler=laters[i];
			if (handler.method!==null){
				this._map[handler.key]=null;
				handler.run(false);
			}
			this._recoverHandler(handler);
			i===n && (n=laters.length-1);
		}
		laters.length=0;
	}

	/**@private */
	__proto._clearHandlers=function(){
		var handlers=this._handlers;
		for (var i=0,n=handlers.length;i < n;i++){
			var handler=handlers[i];
			if (handler.method!==null)this._temp.push(handler);
			else this._recoverHandler(handler);
		}
		this._handlers=this._temp;
		this._temp=handlers;
		this._temp.length=0;
	}

	/**@private */
	__proto._recoverHandler=function(handler){
		if(this._map[handler.key]==handler)this._map[handler.key]=null;
		handler.clear();
		Timer._pool.push(handler);
	}

	/**@private */
	__proto._create=function(useFrame,repeat,delay,caller,method,args,coverBefore){
		if (!delay){
			method.apply(caller,args);
			return null;
		}
		if (coverBefore){
			var handler=this._getHandler(caller,method);
			if (handler){
				handler.repeat=repeat;
				handler.userFrame=useFrame;
				handler.delay=delay;
				handler.caller=caller;
				handler.method=method;
				handler.args=args;
				handler.exeTime=delay+(useFrame ? this.currFrame :this.currTimer+this._now()-this._lastTimer);
				return handler;
			}
		}
		handler=Timer._pool.length > 0 ? Timer._pool.pop():new TimerHandler();
		handler.repeat=repeat;
		handler.userFrame=useFrame;
		handler.delay=delay;
		handler.caller=caller;
		handler.method=method;
		handler.args=args;
		handler.exeTime=delay+(useFrame ? this.currFrame :this.currTimer+this._now()-this._lastTimer)+1;
		this._indexHandler(handler);
		this._handlers.push(handler);
		return handler;
	}

	/**@private */
	__proto._indexHandler=function(handler){
		var caller=handler.caller;
		var method=handler.method;
		var cid=caller ? caller.$_GID || (caller.$_GID=Utils.getGID()):0;
		var mid=method.$_TID || (method.$_TID=(this._mid++)*100000);
		handler.key=cid+mid;
		this._map[handler.key]=handler;
	}

	/**
	*定时执行一次。
	*@param delay 延迟时间(单位为毫秒)。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*@param args 回调参数。
	*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
	*/
	__proto.once=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		this._create(false,false,delay,caller,method,args,coverBefore);
	}

	/**
	*定时重复执行。
	*@param delay 间隔时间(单位毫秒)。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*@param args 回调参数。
	*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
	*@param jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次
	*/
	__proto.loop=function(delay,caller,method,args,coverBefore,jumpFrame){
		(coverBefore===void 0)&& (coverBefore=true);
		(jumpFrame===void 0)&& (jumpFrame=false);
		var handler=this._create(false,true,delay,caller,method,args,coverBefore);
		if (handler)handler.jumpFrame=jumpFrame;
	}

	/**
	*定时执行一次(基于帧率)。
	*@param delay 延迟几帧(单位为帧)。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*@param args 回调参数。
	*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
	*/
	__proto.frameOnce=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		this._create(true,false,delay,caller,method,args,coverBefore);
	}

	/**
	*定时重复执行(基于帧率)。
	*@param delay 间隔几帧(单位为帧)。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*@param args 回调参数。
	*@param coverBefore 是否覆盖之前的延迟执行，默认为 true 。
	*/
	__proto.frameLoop=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		this._create(true,true,delay,caller,method,args,coverBefore);
	}

	/**返回统计信息。*/
	__proto.toString=function(){
		return "callLater:"+this._laters.length+" handlers:"+this._handlers.length+" pool:"+Timer._pool.length;
	}

	/**
	*清理定时器。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*/
	__proto.clear=function(caller,method){
		var handler=this._getHandler(caller,method);
		if (handler){
			this._map[handler.key]=null;handler.key=0;
			handler.clear();
		}
	}

	/**
	*清理对象身上的所有定时器。
	*@param caller 执行域(this)。
	*/
	__proto.clearAll=function(caller){
		if (!caller)return;
		for (var i=0,n=this._handlers.length;i < n;i++){
			var handler=this._handlers[i];
			if (handler.caller===caller){
				this._map[handler.key]=null;handler.key=0;
				handler.clear();
			}
		}
	}

	/**@private */
	__proto._getHandler=function(caller,method){
		var cid=caller ? caller.$_GID || (caller.$_GID=Utils.getGID()):0;
		var mid=method.$_TID || (method.$_TID=(this._mid++)*100000);
		return this._map[cid+mid];
	}

	/**
	*延迟执行。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*@param args 回调参数。
	*/
	__proto.callLater=function(caller,method,args){
		if (this._getHandler(caller,method)==null){
			if (Timer._pool.length)
				var handler=Timer._pool.pop();
			else handler=new TimerHandler();
			handler.caller=caller;
			handler.method=method;
			handler.args=args;
			this._indexHandler(handler);
			this._laters.push(handler);
		}
	}

	/**
	*立即执行 callLater 。
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*/
	__proto.runCallLater=function(caller,method){
		var handler=this._getHandler(caller,method);
		if (handler && handler.method !=null){
			this._map[handler.key]=null;
			handler.run(true);
		}
	}

	/**
	*立即提前执行定时器，执行之后从队列中删除
	*@param caller 执行域(this)。
	*@param method 定时器回调函数。
	*/
	__proto.runTimer=function(caller,method){
		this.runCallLater(caller,method);
	}

	/**
	*两帧之间的时间间隔,单位毫秒。
	*/
	__getset(0,__proto,'delta',function(){
		return this._delta;
	});

	Timer._pool=[];
	Timer.__init$=function(){
		/**@private */
		//class TimerHandler
		TimerHandler=(function(){
			function TimerHandler(){
				this.key=0;
				this.repeat=false;
				this.delay=0;
				this.userFrame=false;
				this.exeTime=0;
				this.caller=null;
				this.method=null;
				this.args=null;
				this.jumpFrame=false;
			}
			__class(TimerHandler,'');
			var __proto=TimerHandler.prototype;
			__proto.clear=function(){
				this.caller=null;
				this.method=null;
				this.args=null;
			}
			__proto.run=function(withClear){
				var caller=this.caller;
				if (caller && caller.destroyed)return this.clear();
				var method=this.method;
				var args=this.args;
				withClear && this.clear();
				if (method==null)return;
				args ? method.apply(caller,args):method.call(caller);
			}
			return TimerHandler;
		})()
	}

	return Timer;
})()


/**
*鼠标点击区域，可以设置绘制一系列矢量图作为点击区域和非点击区域（目前只支持圆形，矩形，多边形）
*/
//class laya.utils.HitArea
var HitArea=(function(){
	function HitArea(){
		/**@private */
		this._hit=null;
		/**@private */
		this._unHit=null;
	}

	__class(HitArea,'laya.utils.HitArea');
	var __proto=HitArea.prototype;
	/**
	*是否包含某个点
	*@param x x坐标
	*@param y y坐标
	*@return 是否点击到
	*/
	__proto.isHit=function(x,y){
		if (!HitArea.isHitGraphic(x,y,this.hit))return false;
		return !HitArea.isHitGraphic(x,y,this.unHit);
	}

	/**
	*检测对象是否包含指定的点。
	*@param x 点的 X 轴坐标值（水平位置）。
	*@param y 点的 Y 轴坐标值（垂直位置）。
	*@return 如果包含指定的点，则值为 true；否则为 false。
	*/
	__proto.contains=function(x,y){
		return this.isHit(x,y);
	}

	/**
	*不可点击区域，可以设置绘制一系列矢量图作为非点击区域（目前只支持圆形，矩形，多边形）
	*/
	__getset(0,__proto,'unHit',function(){
		if (!this._unHit)this._unHit=new Graphics();
		return this._unHit;
		},function(value){
		this._unHit=value;
	});

	/**
	*可点击区域，可以设置绘制一系列矢量图作为点击区域（目前只支持圆形，矩形，多边形）
	*/
	__getset(0,__proto,'hit',function(){
		if (!this._hit)this._hit=new Graphics();
		return this._hit;
		},function(value){
		this._hit=value;
	});

	HitArea.isHitGraphic=function(x,y,graphic){
		if (!graphic)return false;
		var cmds;
		cmds=graphic.cmds;
		if (!cmds && graphic._one){
			cmds=HitArea._cmds;
			cmds.length=1;
			cmds[0]=graphic._one;
		}
		if (!cmds)return false;
		var i=0,len=0;
		len=cmds.length;
		var cmd;
		for (i=0;i < len;i++){
			cmd=cmds[i];
			if (!cmd)continue ;
			var context=Render._context;
			switch (cmd.callee){
				case context._translate:
				case 6:
					x-=cmd[0];
					y-=cmd[1];
				default :
				}
			if (HitArea.isHitCmd(x,y,cmd))return true;
		}
		return false;
	}

	HitArea.isHitCmd=function(x,y,cmd){
		if (!cmd)return false;
		var context=Render._context;
		var rst=false;
		switch (cmd["callee"]){
			case context._drawRect:
			case 13:
				HitArea._rec.setTo(cmd[0],cmd[1],cmd[2],cmd[3]);
				rst=HitArea._rec.contains(x,y);
				break ;
			case context._drawCircle:
			case context._fillCircle:
			case 14:;
				var d=NaN;
				x-=cmd[0];
				y-=cmd[1];
				d=x *x+y *y;
				rst=d < cmd[2] *cmd[2];
				break ;
			case context._drawPoly:
			case 18:
				x-=cmd[0];
				y-=cmd[1];
				rst=HitArea.ptInPolygon(x,y,cmd[2]);
				break ;
			default :
				break ;
			}
		return rst;
	}

	HitArea.ptInPolygon=function(x,y,areaPoints){
		var p;
		p=HitArea._ptPoint;
		p.setTo(x,y);
		var nCross=0;
		var p1x=NaN,p1y=NaN,p2x=NaN,p2y=NaN;
		var len=0;
		len=areaPoints.length;
		for (var i=0;i < len;i+=2){
			p1x=areaPoints[i];
			p1y=areaPoints[i+1];
			p2x=areaPoints[(i+2)% len];
			p2y=areaPoints[(i+3)% len];
			if (p1y==p2y)
				continue ;
			if (p.y < Math.min(p1y,p2y))
				continue ;
			if (p.y >=Math.max(p1y,p2y))
				continue ;
			var tx=(p.y-p1y)*(p2x-p1x)/ (p2y-p1y)+p1x;
			if (tx > p.x){
				nCross++;
			}
		}
		return (nCross % 2==1);
	}

	HitArea._cmds=[];
	__static(HitArea,
	['_rec',function(){return this._rec=new Rectangle();},'_ptPoint',function(){return this._ptPoint=new Point();}
	]);
	return HitArea;
})()


/**
*@private
*/
//class laya.html.utils.LayoutLine
var LayoutLine=(function(){
	function LayoutLine(){
		this.x=0;
		this.y=0;
		this.w=0;
		this.h=0;
		this.wordStartIndex=0;
		this.minTextHeight=99999;
		this.mWidth=0;
		this.elements=new Array;
	}

	__class(LayoutLine,'laya.html.utils.LayoutLine');
	var __proto=LayoutLine.prototype;
	/**
	*底对齐（默认）
	*@param left
	*@param width
	*@param dy
	*@param align 水平
	*@param valign 垂直
	*@param lineHeight 行高
	*/
	__proto.updatePos=function(left,width,lineNum,dy,align,valign,lineHeight){
		var w=0;
		var one
		if (this.elements.length > 0){
			one=this.elements[this.elements.length-1];
			w=one.x+one.width-this.elements[0].x;
		};
		var dx=0,ddy=NaN;
		align===1 && (dx=(width-w)/ 2);
		align===2 && (dx=(width-w));
		lineHeight===0 || valign !=0 || (valign=1);
		for (var i=0,n=this.elements.length;i < n;i++){
			one=this.elements[i];
			var tCSSStyle=one._getCSSStyle();
			dx!==0 && (one.x+=dx);
			switch (tCSSStyle._getValign()){
				case 0:
					one.y=dy;
					break ;
				case 1:;
					var tMinTextHeight=0;
					if (this.minTextHeight !=99999){
						tMinTextHeight=this.minTextHeight;
					};
					var tBottomLineY=(tMinTextHeight+lineHeight)/ 2;
					tBottomLineY=Math.max(tBottomLineY,this.h);
					if ((one instanceof laya.html.dom.HTMLImageElement )){
						ddy=dy+tBottomLineY-one.height;
						}else {
						ddy=dy+tBottomLineY-one.height;
					}
					one.y=ddy;
					break ;
				case 2:
					one.y=dy+(lineHeight-one.height);
					break ;
				}
		}
	}

	/**
	*布局反向,目前用于将ltr模式布局转为rtl模式布局
	*/
	__proto.revertOrder=function(width){
		var one
		if (this.elements.length > 0){
			var i=0,len=0;
			len=this.elements.length;
			for (i=0;i < len;i++){
				one=this.elements[i];
				one.x=width-one.x-one.width;
			}
		}
	}

	return LayoutLine;
})()


/**
*@private
*/
//class laya.html.utils.HTMLParse
var HTMLParse=(function(){
	function HTMLParse(){}
	__class(HTMLParse,'laya.html.utils.HTMLParse');
	HTMLParse.parse=function(ower,xmlString,url){
		xmlString=xmlString.replace(/<br>/g,"<br/>");
		xmlString="<root>"+xmlString+"</root>";
		xmlString=xmlString.replace(HTMLParse.spacePattern,HTMLParse.char255);
		var xml=Utils.parseXMLFromString(xmlString);
		HTMLParse._parseXML(ower,xml.childNodes[0].childNodes,url);
	}

	HTMLParse._parseXML=function(parent,xml,url,href){
		var i=0,n=0;
		if (xml.join || xml.item){
			for (i=0,n=xml.length;i < n;++i){
				HTMLParse._parseXML(parent,xml[i],url,href);
			}
			}else {
			var node;
			var nodeName;
			if (xml.nodeType==3){
				var txt;
				if ((parent instanceof laya.html.dom.HTMLDivElement )){
					if (xml.nodeName==null){
						xml.nodeName="#text";
					}
					nodeName=xml.nodeName.toLowerCase();
					txt=xml.textContent.replace(/^\s+|\s+$/g,'');
					if (txt.length > 0){
						node=ClassUtils.getInstance(nodeName);
						if (node){
							parent.addChild(node);
							((node).innerTEXT=txt.replace(HTMLParse.char255AndOneSpacePattern," "));
						}
					}
					}else {
					txt=xml.textContent.replace(/^\s+|\s+$/g,'');
					if (txt.length > 0){
						((parent).innerTEXT=txt.replace(HTMLParse.char255AndOneSpacePattern," "));
					}
				}
				return;
				}else {
				nodeName=xml.nodeName.toLowerCase();
				if (nodeName=="#comment")return;
				node=ClassUtils.getInstance(nodeName);
				if (node){
					node=parent.addChild(node);
					(node).URI=url;
					(node).href=href;
					var attributes=xml.attributes;
					if (attributes && attributes.length > 0){
						for (i=0,n=attributes.length;i < n;++i){
							var attribute=attributes[i];
							var attrName=attribute.nodeName;
							var value=attribute.value;
							node._setAttributes(attrName,value);
						}
					}
					HTMLParse._parseXML(node,xml.childNodes,url,(node).href);
					}else {
					HTMLParse._parseXML(parent,xml.childNodes,url,href);
				}
			}
		}
	}

	HTMLParse.char255=String.fromCharCode(255);
	HTMLParse.spacePattern=/&nbsp;|&#160;/g;
	HTMLParse.char255AndOneSpacePattern=new RegExp(String.fromCharCode(255)+"|(\\s+)","g");
	return HTMLParse;
})()


/**
*@private
*HTML的布局类
*对HTML的显示对象进行排版
*/
//class laya.html.utils.Layout
var Layout=(function(){
	function Layout(){}
	__class(Layout,'laya.html.utils.Layout');
	Layout.later=function(element){
		if (Layout._will==null){
			Layout._will=[];
			Laya.stage.frameLoop(1,null,function(){
				if (Layout._will.length < 1)
					return;
				for (var i=0;i < Layout._will.length;i++){
					laya.html.utils.Layout.layout(Layout._will[i]);
				}
				Layout._will.length=0;
			});
		}
		Layout._will.push(element);
	}

	Layout.layout=function(element){
		if (!element || !element._style)return null;
		if ((element._style._type & 0x200)===0)
			return null;
		element.getStyle()._type &=~0x200;
		var arr=Layout._multiLineLayout(element);
		if (Render.isConchApp&&element["layaoutCallNative"]){
			(element).layaoutCallNative();
		}
		return arr;
	}

	Layout._multiLineLayout=function(element){
		if (Text.RightToLeft)return Layout._multiLineLayout2(element);
		var elements=new Array;
		element._addChildsToLayout(elements);
		var i=0,n=elements.length,j=0;
		var style=element._getCSSStyle();
		var letterSpacing=style.letterSpacing;
		var leading=style.leading;
		var lineHeight=style.lineHeight;
		var widthAuto=style._widthAuto()|| !style.wordWrap;
		var width=widthAuto ? 999999 :element.width;
		var height=element.height;
		var maxWidth=0;
		var exWidth=style.italic ? style.fontSize / 3 :0;
		var align=style._getAlign();
		var valign=style._getValign();
		var endAdjust=valign!==0 || align!==0 || lineHeight !=0;
		var oneLayout;
		var x=0;
		var y=0;
		var w=0;
		var h=0;
		var tBottom=0;
		var lines=new Array;
		var curStyle;
		var curPadding;
		var curLine=lines[0]=new LayoutLine();
		var newLine=false,nextNewline=false;
		var htmlWord;
		var sprite;
		curLine.h=0;
		if (style.italic)
			width-=style.fontSize / 3;
		var tWordWidth=0;
		var tLineFirstKey=true;
		function addLine (){
			curLine.y=y;
			y+=curLine.h+leading;
			if (curLine.h==0)y+=lineHeight;
			curLine.mWidth=tWordWidth;
			tWordWidth=0;
			curLine=new LayoutLine();
			lines.push(curLine);
			curLine.h=0;
			x=0;
			tLineFirstKey=true;
			newLine=false;
		}
		for (i=0;i < n;i++){
			oneLayout=elements[i];
			if (oneLayout==null){
				if (!tLineFirstKey){
					x+=Layout.DIV_ELEMENT_PADDING;
				}
				curLine.wordStartIndex=curLine.elements.length;
				continue ;
			}
			tLineFirstKey=false;
			if ((oneLayout instanceof laya.html.dom.HTMLBrElement )){
				addLine();
				curLine.y=y;
				continue ;
				}else if (oneLayout._isChar()){
				htmlWord=oneLayout;
				if (!htmlWord.isWord){
					if (lines.length > 0 && (x+w)> width && curLine.wordStartIndex > 0){
						var tLineWord=0;
						tLineWord=curLine.elements.length-curLine.wordStartIndex+1;
						curLine.elements.length=curLine.wordStartIndex;
						i-=tLineWord;
						addLine();
						continue ;
					}
					newLine=false;
					tWordWidth+=htmlWord.width;
					}else {
					newLine=nextNewline || (htmlWord.char==='\n');
					curLine.wordStartIndex=curLine.elements.length;
				}
				w=htmlWord.width+letterSpacing;
				h=htmlWord.height;
				nextNewline=false;
				newLine=newLine || ((x+w)> width);
				newLine && addLine();
				curLine.minTextHeight=Math.min(curLine.minTextHeight,oneLayout.height);
				}else {
				curStyle=oneLayout._getCSSStyle();
				sprite=oneLayout;
				curPadding=curStyle.padding;
				curStyle._getCssFloat()===0 || (endAdjust=true);
				newLine=nextNewline || curStyle.lineElement;
				w=sprite.width *sprite._style._tf.scaleX+curPadding[1]+curPadding[3]+letterSpacing;
				h=sprite.height *sprite._style._tf.scaleY+curPadding[0]+curPadding[2];
				nextNewline=curStyle.lineElement;
				newLine=newLine || ((x+w)> width && curStyle.wordWrap);
				newLine && addLine();
			}
			curLine.elements.push(oneLayout);
			curLine.h=Math.max(curLine.h,h);
			oneLayout.x=x;
			oneLayout.y=y;
			x+=w;
			curLine.w=x-letterSpacing;
			curLine.y=y;
			maxWidth=Math.max(x+exWidth,maxWidth);
		}
		y=curLine.y+curLine.h;
		if (endAdjust){
			var tY=0;
			var tWidth=width;
			if (widthAuto && element.width > 0){
				tWidth=element.width;
			}
			for (i=0,n=lines.length;i < n;i++){
				lines[i].updatePos(0,tWidth,i,tY,align,valign,lineHeight);
				tY+=Math.max(lineHeight,lines[i].h+leading);
			}
			y=tY;
		}
		widthAuto && (element.width=maxWidth);
		(y > element.height)&& (element.height=y);
		return [maxWidth,y];
	}

	Layout._multiLineLayout2=function(element){
		var elements=new Array;
		element._addChildsToLayout(elements);
		var i=0,n=elements.length,j=0;
		var style=element._getCSSStyle();
		var letterSpacing=style.letterSpacing;
		var leading=style.leading;
		var lineHeight=style.lineHeight;
		var widthAuto=style._widthAuto()|| !style.wordWrap;
		var width=widthAuto ? 999999 :element.width;
		var height=element.height;
		var maxWidth=0;
		var exWidth=style.italic ? style.fontSize / 3 :0;
		var align=2-style._getAlign();
		var valign=style._getValign();
		var endAdjust=valign!==0 || align!==0 || lineHeight !=0;
		var oneLayout;
		var x=0;
		var y=0;
		var w=0;
		var h=0;
		var tBottom=0;
		var lines=new Array;
		var curStyle;
		var curPadding;
		var curLine=lines[0]=new LayoutLine();
		var newLine=false,nextNewline=false;
		var htmlWord;
		var sprite;
		curLine.h=0;
		if (style.italic)
			width-=style.fontSize / 3;
		var tWordWidth=0;
		var tLineFirstKey=true;
		function addLine (){
			curLine.y=y;
			y+=curLine.h+leading;
			if (curLine.h==0)y+=lineHeight;
			curLine.mWidth=tWordWidth;
			tWordWidth=0;
			curLine=new LayoutLine();
			lines.push(curLine);
			curLine.h=0;
			x=0;
			tLineFirstKey=true;
			newLine=false;
		}
		for (i=0;i < n;i++){
			oneLayout=elements[i];
			if (oneLayout==null){
				if (!tLineFirstKey){
					x+=Layout.DIV_ELEMENT_PADDING;
				}
				curLine.wordStartIndex=curLine.elements.length;
				continue ;
			}
			tLineFirstKey=false;
			if ((oneLayout instanceof laya.html.dom.HTMLBrElement )){
				addLine();
				curLine.y=y;
				continue ;
				}else if (oneLayout._isChar()){
				htmlWord=oneLayout;
				if (!htmlWord.isWord){
					if (lines.length > 0 && (x+w)> width && curLine.wordStartIndex > 0){
						var tLineWord=0;
						tLineWord=curLine.elements.length-curLine.wordStartIndex+1;
						curLine.elements.length=curLine.wordStartIndex;
						i-=tLineWord;
						addLine();
						continue ;
					}
					newLine=false;
					tWordWidth+=htmlWord.width;
					}else {
					newLine=nextNewline || (htmlWord.char==='\n');
					curLine.wordStartIndex=curLine.elements.length;
				}
				w=htmlWord.width+letterSpacing;
				h=htmlWord.height;
				nextNewline=false;
				newLine=newLine || ((x+w)> width);
				newLine && addLine();
				curLine.minTextHeight=Math.min(curLine.minTextHeight,oneLayout.height);
				}else {
				curStyle=oneLayout._getCSSStyle();
				sprite=oneLayout;
				curPadding=curStyle.padding;
				curStyle._getCssFloat()===0 || (endAdjust=true);
				newLine=nextNewline || curStyle.lineElement;
				w=sprite.width *sprite._style._tf.scaleX+curPadding[1]+curPadding[3]+letterSpacing;
				h=sprite.height *sprite._style._tf.scaleY+curPadding[0]+curPadding[2];
				nextNewline=curStyle.lineElement;
				newLine=newLine || ((x+w)> width && curStyle.wordWrap);
				newLine && addLine();
			}
			curLine.elements.push(oneLayout);
			curLine.h=Math.max(curLine.h,h);
			oneLayout.x=x;
			oneLayout.y=y;
			x+=w;
			curLine.w=x-letterSpacing;
			curLine.y=y;
			maxWidth=Math.max(x+exWidth,maxWidth);
		}
		y=curLine.y+curLine.h;
		if (endAdjust){
			var tY=0;
			var tWidth=width;
			for (i=0,n=lines.length;i < n;i++){
				lines[i].updatePos(0,tWidth,i,tY,align,valign,lineHeight);
				tY+=Math.max(lineHeight,lines[i].h+leading);
			}
			y=tY;
		}
		widthAuto && (element.width=maxWidth);
		(y > element.height)&& (element.height=y);
		for (i=0,n=lines.length;i < n;i++){
			lines[i].revertOrder(width);
		}
		return [maxWidth,y];
	}

	Layout._will=null;
	Layout.DIV_ELEMENT_PADDING=0;
	return Layout;
})()


/**
*<p><code>Rectangle</code> 对象是按其位置（由它左上角的点 (x,y)确定）以及宽度和高度定义的区域。</p>
*<p>Rectangle 类的 x、y、width 和 height 属性相互独立；更改一个属性的值不会影响其他属性。</p>
*/
//class laya.maths.Rectangle
var Rectangle=(function(){
	function Rectangle(x,y,width,height){
		/**矩形左上角的 X 轴坐标。*/
		//this.x=NaN;
		/**矩形左上角的 Y 轴坐标。*/
		//this.y=NaN;
		/**矩形的宽度。*/
		//this.width=NaN;
		/**矩形的高度。*/
		//this.height=NaN;
		(x===void 0)&& (x=0);
		(y===void 0)&& (y=0);
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
	}

	__class(Rectangle,'laya.maths.Rectangle');
	var __proto=Rectangle.prototype;
	/**
	*将 Rectangle 的属性设置为指定值。
	*@param x x 矩形左上角的 X 轴坐标。
	*@param y x 矩形左上角的 Y 轴坐标。
	*@param width 矩形的宽度。
	*@param height 矩形的高。
	*@return 返回属性值修改后的矩形对象本身。
	*/
	__proto.setTo=function(x,y,width,height){
		this.x=x;
		this.y=y;
		this.width=width;
		this.height=height;
		return this;
	}

	/**
	*复制 source 对象的属性值到此矩形对象中。
	*@param sourceRect 源 Rectangle 对象。
	*@return 返回属性值修改后的矩形对象本身。
	*/
	__proto.copyFrom=function(source){
		this.x=source.x;
		this.y=source.y;
		this.width=source.width;
		this.height=source.height;
		return this;
	}

	/**
	*确定由此 Rectangle 对象定义的矩形区域内是否包含指定的点。
	*@param x 点的 X 轴坐标值（水平位置）。
	*@param y 点的 Y 轴坐标值（垂直位置）。
	*@return 如果 Rectangle 对象包含指定的点，则值为 true；否则为 false。
	*/
	__proto.contains=function(x,y){
		if (this.width <=0 || this.height <=0)return false;
		if (x >=this.x && x < this.right){
			if (y >=this.y && y < this.bottom){
				return true;
			}
		}
		return false;
	}

	/**
	*确定在 rect 参数中指定的对象是否与此 Rectangle 对象相交。此方法检查指定的 Rectangle 对象的 x、y、width 和 height 属性，以查看它是否与此 Rectangle 对象相交。
	*@param rect Rectangle 对象。
	*@return 如果传入的矩形对象与此对象相交，则返回 true 值，否则返回 false。
	*/
	__proto.intersects=function(rect){
		return !(rect.x > (this.x+this.width)|| (rect.x+rect.width)< this.x || rect.y > (this.y+this.height)|| (rect.y+rect.height)< this.y);
	}

	/**
	*如果在 rect 参数中指定的 Rectangle 对象与此 Rectangle 对象相交，则返回交集区域作为 Rectangle 对象。如果矩形不相交，则此方法返回null。
	*@param rect 待比较的矩形区域。
	*@param out （可选）待输出的矩形区域。如果为空则创建一个新的。建议：尽量复用对象，减少对象创建消耗。
	*@return 返回相交的矩形区域对象。
	*/
	__proto.intersection=function(rect,out){
		if (!this.intersects(rect))return null;
		out || (out=new Rectangle());
		out.x=Math.max(this.x,rect.x);
		out.y=Math.max(this.y,rect.y);
		out.width=Math.min(this.right,rect.right)-out.x;
		out.height=Math.min(this.bottom,rect.bottom)-out.y;
		return out;
	}

	/**
	*<p>矩形联合，通过填充两个矩形之间的水平和垂直空间，将这两个矩形组合在一起以创建一个新的 Rectangle 对象。</p>
	*<p>注意：union()方法忽略高度或宽度值为 0 的矩形，如：var rect2:Rectangle=new Rectangle(300,300,50,0);</p>
	*@param 要添加到此 Rectangle 对象的 Rectangle 对象。
	*@param out 用于存储输出结果的矩形对象。如果为空，则创建一个新的。建议：尽量复用对象，减少对象创建消耗。Rectangle.TEMP对象用于对象复用。
	*@return 充当两个矩形的联合的新 Rectangle 对象。
	*/
	__proto.union=function(source,out){
		out || (out=new Rectangle());
		this.clone(out);
		if (source.width <=0 || source.height <=0)return out;
		out.addPoint(source.x,source.y);
		out.addPoint(source.right,source.bottom);
		return this;
	}

	/**
	*返回一个 Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
	*@param out （可选）用于存储结果的矩形对象。如果为空，则创建一个新的。建议：尽量复用对象，减少对象创建消耗。。Rectangle.TEMP对象用于对象复用。
	*@return Rectangle 对象，其 x、y、width 和 height 属性的值与当前 Rectangle 对象的对应值相同。
	*/
	__proto.clone=function(out){
		out || (out=new Rectangle());
		out.x=this.x;
		out.y=this.y;
		out.width=this.width;
		out.height=this.height;
		return out;
	}

	/**
	*当前 Rectangle 对象的水平位置 x 和垂直位置 y 以及高度 width 和宽度 height 以逗号连接成的字符串。
	*/
	__proto.toString=function(){
		return this.x+","+this.y+","+this.width+","+this.height;
	}

	/**
	*检测传入的 Rectangle 对象的属性是否与当前 Rectangle 对象的属性 x、y、width、height 属性值都相等。
	*@param rect 待比较的 Rectangle 对象。
	*@return 如果判断的属性都相等，则返回 true ,否则返回 false。
	*/
	__proto.equals=function(rect){
		if (!rect || rect.x!==this.x || rect.y!==this.y || rect.width!==this.width || rect.height!==this.height)return false;
		return true;
	}

	/**
	*<p>为当前矩形对象加一个点，以使当前矩形扩展为包含当前矩形和此点的最小矩形。</p>
	*<p>此方法会修改本对象。</p>
	*@param x 点的 X 坐标。
	*@param y 点的 Y 坐标。
	*@return 返回此 Rectangle 对象。
	*/
	__proto.addPoint=function(x,y){
		this.x > x && (this.width+=this.x-x,this.x=x);
		this.y > y && (this.height+=this.y-y,this.y=y);
		if (this.width < x-this.x)this.width=x-this.x;
		if (this.height < y-this.y)this.height=y-this.y;
		return this;
	}

	/**
	*@private
	*返回代表当前矩形的顶点数据。
	*@return 顶点数据。
	*/
	__proto._getBoundPoints=function(){
		var rst=Rectangle._temB;
		rst.length=0;
		if (this.width==0 || this.height==0)return rst;
		rst.push(this.x,this.y,this.x+this.width,this.y,this.x,this.y+this.height,this.x+this.width,this.y+this.height);
		return rst;
	}

	/**
	*确定此 Rectangle 对象是否为空。
	*@return 如果 Rectangle 对象的宽度或高度小于等于 0，则返回 true 值，否则返回 false。
	*/
	__proto.isEmpty=function(){
		if (this.width <=0 || this.height <=0)return true;
		return false;
	}

	/**此矩形底端的 Y 轴坐标。y 和 height 属性的和。*/
	__getset(0,__proto,'bottom',function(){
		return this.y+this.height;
	});

	/**此矩形右侧的 X 轴坐标。 x 和 width 属性的和。*/
	__getset(0,__proto,'right',function(){
		return this.x+this.width;
	});

	Rectangle._getBoundPointS=function(x,y,width,height){
		var rst=Rectangle._temA;
		rst.length=0;
		if (width==0 || height==0)return rst;
		rst.push(x,y,x+width,y,x,y+height,x+width,y+height);
		return rst;
	}

	Rectangle._getWrapRec=function(pointList,rst){
		if (!pointList || pointList.length < 1)return rst ? rst.setTo(0,0,0,0):Rectangle.TEMP.setTo(0,0,0,0);
		rst=rst ? rst :new Rectangle();
		var i,len=pointList.length,minX,maxX,minY,maxY,tPoint=Point.TEMP;
		minX=minY=99999;
		maxX=maxY=-minX;
		for (i=0;i < len;i+=2){
			tPoint.x=pointList[i];
			tPoint.y=pointList[i+1];
			minX=minX < tPoint.x ? minX :tPoint.x;
			minY=minY < tPoint.y ? minY :tPoint.y;
			maxX=maxX > tPoint.x ? maxX :tPoint.x;
			maxY=maxY > tPoint.y ? maxY :tPoint.y;
		}
		return rst.setTo(minX,minY,maxX-minX,maxY-minY);
	}

	Rectangle.EMPTY=new Rectangle();
	Rectangle.TEMP=new Rectangle();
	Rectangle._temB=[];
	Rectangle._temA=[];
	return Rectangle;
})()


/**
*<code>Point</code> 对象表示二维坐标系统中的某个位置，其中 x 表示水平轴，y 表示垂直轴。
*/
//class laya.maths.Point
var Point=(function(){
	function Point(x,y){
		/**该点的水平坐标。*/
		//this.x=NaN;
		/**该点的垂直坐标。*/
		//this.y=NaN;
		(x===void 0)&& (x=0);
		(y===void 0)&& (y=0);
		this.x=x;
		this.y=y;
	}

	__class(Point,'laya.maths.Point');
	var __proto=Point.prototype;
	/**
	*将 <code>Point</code> 的成员设置为指定值。
	*@param x 水平坐标。
	*@param y 垂直坐标。
	*@return 当前 Point 对象。
	*/
	__proto.setTo=function(x,y){
		this.x=x;
		this.y=y;
		return this;
	}

	/**
	*计算当前点和目标点(x，y)的距离。
	*@param x 水平坐标。
	*@param y 垂直坐标。
	*@return 返回当前点和目标点之间的距离。
	*/
	__proto.distance=function(x,y){
		return Math.sqrt((this.x-x)*(this.x-x)+(this.y-y)*(this.y-y));
	}

	/**返回包含 x 和 y 坐标的值的字符串。*/
	__proto.toString=function(){
		return this.x+","+this.y;
	}

	/**
	*标准化向量。
	*/
	__proto.normalize=function(){
		var d=Math.sqrt(this.x *this.x+this.y *this.y);
		if (d > 0){
			var id=1.0 / d;
			this.x *=id;
			this.y *=id;
		}
	}

	Point.TEMP=new Point();
	Point.EMPTY=new Point();
	return Point;
})()


/**
*@private
*凸包算法。
*/
//class laya.maths.GrahamScan
var GrahamScan=(function(){
	function GrahamScan(){}
	__class(GrahamScan,'laya.maths.GrahamScan');
	GrahamScan.multiply=function(p1,p2,p0){
		return ((p1.x-p0.x)*(p2.y-p0.y)-(p2.x-p0.x)*(p1.y-p0.y));
	}

	GrahamScan.dis=function(p1,p2){
		return (p1.x-p2.x)*(p1.x-p2.x)+(p1.y-p2.y)*(p1.y-p2.y);
	}

	GrahamScan._getPoints=function(count,tempUse,rst){
		(tempUse===void 0)&& (tempUse=false);
		if (!GrahamScan._mPointList)GrahamScan._mPointList=[];
		while (GrahamScan._mPointList.length < count)GrahamScan._mPointList.push(new Point());
		if (!rst)rst=[];
		rst.length=0;
		if (tempUse){
			GrahamScan.getFrom(rst,GrahamScan._mPointList,count);
			}else {
			GrahamScan.getFromR(rst,GrahamScan._mPointList,count);
		}
		return rst;
	}

	GrahamScan.getFrom=function(rst,src,count){
		var i=0;
		for (i=0;i < count;i++){
			rst.push(src[i]);
		}
		return rst;
	}

	GrahamScan.getFromR=function(rst,src,count){
		var i=0;
		for (i=0;i < count;i++){
			rst.push(src.pop());
		}
		return rst;
	}

	GrahamScan.pListToPointList=function(pList,tempUse){
		(tempUse===void 0)&& (tempUse=false);
		var i=0,len=pList.length / 2,rst=GrahamScan._getPoints(len,tempUse,GrahamScan._tempPointList);
		for (i=0;i < len;i++){
			rst[i].setTo(pList[i+i],pList[i+i+1]);
		}
		return rst;
	}

	GrahamScan.pointListToPlist=function(pointList){
		var i=0,len=pointList.length,rst=GrahamScan._temPList,tPoint;
		rst.length=0;
		for (i=0;i < len;i++){
			tPoint=pointList[i];
			rst.push(tPoint.x,tPoint.y);
		}
		return rst;
	}

	GrahamScan.scanPList=function(pList){
		return Utils.copyArray(pList,GrahamScan.pointListToPlist(GrahamScan.scan(GrahamScan.pListToPointList(pList,true))));
	}

	GrahamScan.scan=function(PointSet){
		var i=0,j=0,k=0,top=2,tmp,n=PointSet.length,ch;
		var _tmpDic={};
		var key;
		ch=GrahamScan._temArr;
		ch.length=0;
		n=PointSet.length;
		for (i=n-1;i >=0;i--){
			tmp=PointSet[i];
			key=tmp.x+"_"+tmp.y;
			if (!_tmpDic.hasOwnProperty(key)){
				_tmpDic[key]=true;
				ch.push(tmp);
			}
		}
		n=ch.length;
		Utils.copyArray(PointSet,ch);
		for (i=1;i < n;i++)
		if ((PointSet[i].y < PointSet[k].y)|| ((PointSet[i].y==PointSet[k].y)&& (PointSet[i].x < PointSet[k].x)))
			k=i;
		tmp=PointSet[0];
		PointSet[0]=PointSet[k];
		PointSet[k]=tmp;
		for (i=1;i < n-1;i++){
			k=i;
			for (j=i+1;j < n;j++)
			if ((GrahamScan.multiply(PointSet[j],PointSet[k],PointSet[0])> 0)|| ((GrahamScan.multiply(PointSet[j],PointSet[k],PointSet[0])==0)&& (GrahamScan.dis(PointSet[0],PointSet[j])< GrahamScan.dis(PointSet[0],PointSet[k]))))
				k=j;
			tmp=PointSet[i];
			PointSet[i]=PointSet[k];
			PointSet[k]=tmp;
		}
		ch=GrahamScan._temArr;
		ch.length=0;
		if (PointSet.length < 3){
			return Utils.copyArray(ch,PointSet);
		}
		ch.push(PointSet[0],PointSet[1],PointSet[2]);
		for (i=3;i < n;i++){
			while (ch.length >=2 && GrahamScan.multiply(PointSet[i],ch[ch.length-1],ch[ch.length-2])>=0)ch.pop();
			PointSet[i] && ch.push(PointSet[i]);
		}
		return ch;
	}

	GrahamScan._mPointList=null;
	GrahamScan._tempPointList=[];
	GrahamScan._temPList=[];
	GrahamScan._temArr=[];
	return GrahamScan;
})()


/**
*<p> <code>Matrix</code> 类表示一个转换矩阵，它确定如何将点从一个坐标空间映射到另一个坐标空间。</p>
*<p>您可以对一个显示对象执行不同的图形转换，方法是设置 Matrix 对象的属性，将该 Matrix 对象应用于 Transform 对象的 matrix 属性，然后应用该 Transform 对象作为显示对象的 transform 属性。这些转换函数包括平移（x 和 y 重新定位）、旋转、缩放和倾斜。</p>
*/
//class laya.maths.Matrix
var Matrix=(function(){
	function Matrix(a,b,c,d,tx,ty){
		/**缩放或旋转图像时影响像素沿 x 轴定位的值。*/
		//this.a=NaN;
		/**旋转或倾斜图像时影响像素沿 y 轴定位的值。*/
		//this.b=NaN;
		/**旋转或倾斜图像时影响像素沿 x 轴定位的值。*/
		//this.c=NaN;
		/**缩放或旋转图像时影响像素沿 y 轴定位的值。*/
		//this.d=NaN;
		/**沿 x 轴平移每个点的距离。*/
		//this.tx=NaN;
		/**沿 y 轴平移每个点的距离。*/
		//this.ty=NaN;
		/**@private 表示此对象是否在对象池中。*/
		this.inPool=false;
		/**@private 是否有改变矩阵的值。*/
		this.bTransform=false;
		(a===void 0)&& (a=1);
		(b===void 0)&& (b=0);
		(c===void 0)&& (c=0);
		(d===void 0)&& (d=1);
		(tx===void 0)&& (tx=0);
		(ty===void 0)&& (ty=0);
		this.a=a;
		this.b=b;
		this.c=c;
		this.d=d;
		this.tx=tx;
		this.ty=ty;
		this._checkTransform();
	}

	__class(Matrix,'laya.maths.Matrix');
	var __proto=Matrix.prototype;
	/**
	*将本矩阵设置为单位矩阵。
	*@return 返回当前矩形。
	*/
	__proto.identity=function(){
		this.a=this.d=1;
		this.b=this.tx=this.ty=this.c=0;
		this.bTransform=false;
		return this;
	}

	/**@private */
	__proto._checkTransform=function(){
		return this.bTransform=(this.a!==1 || this.b!==0 || this.c!==0 || this.d!==1);
	}

	/**
	*设置沿 x 、y 轴平移每个点的距离。
	*@param x 沿 x 轴平移每个点的距离。
	*@param y 沿 y 轴平移每个点的距离。
	*@return 返回对象本身
	*/
	__proto.setTranslate=function(x,y){
		this.tx=x;
		this.ty=y;
		return this;
	}

	/**
	*沿 x 和 y 轴平移矩阵，平移的变化量由 x 和 y 参数指定。
	*@param x 沿 x 轴向右移动的量（以像素为单位）。
	*@param y 沿 y 轴向下移动的量（以像素为单位）。
	*@return 返回此矩形对象。
	*/
	__proto.translate=function(x,y){
		this.tx+=x;
		this.ty+=y;
		return this;
	}

	/**
	*对矩阵应用缩放转换。
	*@param x 用于沿 x 轴缩放对象的乘数。
	*@param y 用于沿 y 轴缩放对象的乘数。
	*/
	__proto.scale=function(x,y){
		this.a *=x;
		this.d *=y;
		this.c *=x;
		this.b *=y;
		this.tx *=x;
		this.ty *=y;
		this.bTransform=true;
	}

	/**
	*对 Matrix 对象应用旋转转换。
	*@param angle 以弧度为单位的旋转角度。
	*/
	__proto.rotate=function(angle){
		var cos=Math.cos(angle);
		var sin=Math.sin(angle);
		var a1=this.a;
		var c1=this.c;
		var tx1=this.tx;
		this.a=a1 *cos-this.b *sin;
		this.b=a1 *sin+this.b *cos;
		this.c=c1 *cos-this.d *sin;
		this.d=c1 *sin+this.d *cos;
		this.tx=tx1 *cos-this.ty *sin;
		this.ty=tx1 *sin+this.ty *cos;
		this.bTransform=true;
	}

	/**
	*对 Matrix 对象应用倾斜转换。
	*@param x 沿着 X 轴的 2D 倾斜弧度。
	*@param y 沿着 Y 轴的 2D 倾斜弧度。
	*@return 当前 Matrix 对象。
	*/
	__proto.skew=function(x,y){
		var tanX=Math.tan(x);
		var tanY=Math.tan(y);
		var a1=this.a;
		var b1=this.b;
		this.a+=tanY *this.c;
		this.b+=tanY *this.d;
		this.c+=tanX *a1;
		this.d+=tanX *b1;
		return this;
	}

	/**
	*对指定的点应用当前矩阵的逆转化并返回此点。
	*@param out 待转化的点 Point 对象。
	*@return 返回out
	*/
	__proto.invertTransformPoint=function(out){
		var a1=this.a;
		var b1=this.b;
		var c1=this.c;
		var d1=this.d;
		var tx1=this.tx;
		var n=a1 *d1-b1 *c1;
		var a2=d1 / n;
		var b2=-b1 / n;
		var c2=-c1 / n;
		var d2=a1 / n;
		var tx2=(c1 *this.ty-d1 *tx1)/ n;
		var ty2=-(a1 *this.ty-b1 *tx1)/ n;
		return out.setTo(a2 *out.x+c2 *out.y+tx2,b2 *out.x+d2 *out.y+ty2);
	}

	/**
	*将 Matrix 对象表示的几何转换应用于指定点。
	*@param out 用来设定输出结果的点。
	*@return 返回out
	*/
	__proto.transformPoint=function(out){
		return out.setTo(this.a *out.x+this.c *out.y+this.tx,this.b *out.x+this.d *out.y+this.ty);
	}

	/**
	*将 Matrix 对象表示的几何转换应用于指定点，忽略tx、ty。
	*@param out 用来设定输出结果的点。
	*@return 返回out
	*/
	__proto.transformPointN=function(out){
		return out.setTo(this.a *out.x+this.c *out.y ,this.b *out.x+this.d *out.y);
	}

	/**
	*@private
	*将 Matrix 对象表示的几何转换应用于指定点。
	*@param data 点集合。
	*@param out 存储应用转化的点的列表。
	*@return 返回out数组
	*/
	__proto.transformPointArray=function(data,out){
		var len=data.length;
		for (var i=0;i < len;i+=2){
			var x=data[i],y=data[i+1];
			out[i]=this.a *x+this.c *y+this.tx;
			out[i+1]=this.b *x+this.d *y+this.ty;
		}
		return out;
	}

	/**
	*@private
	*将 Matrix 对象表示的几何缩放转换应用于指定点。
	*@param data 点集合。
	*@param out 存储应用转化的点的列表。
	*@return 返回out数组
	*/
	__proto.transformPointArrayScale=function(data,out){
		var len=data.length;
		for (var i=0;i < len;i+=2){
			var x=data[i],y=data[i+1];
			out[i]=this.a *x+this.c *y;
			out[i+1]=this.b *x+this.d *y;
		}
		return out;
	}

	/**
	*获取 X 轴缩放值。
	*@return X 轴缩放值。
	*/
	__proto.getScaleX=function(){
		return this.b===0 ? this.a :Math.sqrt(this.a *this.a+this.b *this.b);
	}

	/**
	*获取 Y 轴缩放值。
	*@return Y 轴缩放值。
	*/
	__proto.getScaleY=function(){
		return this.c===0 ? this.d :Math.sqrt(this.c *this.c+this.d *this.d);
	}

	/**
	*执行原始矩阵的逆转换。
	*@return 当前矩阵对象。
	*/
	__proto.invert=function(){
		var a1=this.a;
		var b1=this.b;
		var c1=this.c;
		var d1=this.d;
		var tx1=this.tx;
		var n=a1 *d1-b1 *c1;
		this.a=d1 / n;
		this.b=-b1 / n;
		this.c=-c1 / n;
		this.d=a1 / n;
		this.tx=(c1 *this.ty-d1 *tx1)/ n;
		this.ty=-(a1 *this.ty-b1 *tx1)/ n;
		return this;
	}

	/**
	*将 Matrix 的成员设置为指定值。
	*@param a 缩放或旋转图像时影响像素沿 x 轴定位的值。
	*@param b 旋转或倾斜图像时影响像素沿 y 轴定位的值。
	*@param c 旋转或倾斜图像时影响像素沿 x 轴定位的值。
	*@param d 缩放或旋转图像时影响像素沿 y 轴定位的值。
	*@param tx 沿 x 轴平移每个点的距离。
	*@param ty 沿 y 轴平移每个点的距离。
	*@return 当前矩阵对象。
	*/
	__proto.setTo=function(a,b,c,d,tx,ty){
		this.a=a,this.b=b,this.c=c,this.d=d,this.tx=tx,this.ty=ty;
		return this;
	}

	/**
	*将指定矩阵与当前矩阵连接，从而将这两个矩阵的几何效果有效地结合在一起。
	*@param matrix 要连接到源矩阵的矩阵。
	*@return 当前矩阵。
	*/
	__proto.concat=function(matrix){
		var a=this.a;
		var c=this.c;
		var tx=this.tx;
		this.a=a *matrix.a+this.b *matrix.c;
		this.b=a *matrix.b+this.b *matrix.d;
		this.c=c *matrix.a+this.d *matrix.c;
		this.d=c *matrix.b+this.d *matrix.d;
		this.tx=tx *matrix.a+this.ty *matrix.c+matrix.tx;
		this.ty=tx *matrix.b+this.ty *matrix.d+matrix.ty;
		return this;
	}

	/**
	*@private
	*对矩阵应用缩放转换。反向相乘
	*@param x 用于沿 x 轴缩放对象的乘数。
	*@param y 用于沿 y 轴缩放对象的乘数。
	*/
	__proto.scaleEx=function(x,y){
		var ba=this.a,bb=this.b,bc=this.c,bd=this.d;
		if (bb!==0 || bc!==0){
			this.a=x *ba;
			this.b=x *bb;
			this.c=y *bc;
			this.d=y *bd;
			}else {
			this.a=x *ba;
			this.b=0 *bd;
			this.c=0 *ba;
			this.d=y *bd;
		}
		this.bTransform=true;
	}

	/**
	*@private
	*对 Matrix 对象应用旋转转换。反向相乘
	*@param angle 以弧度为单位的旋转角度。
	*/
	__proto.rotateEx=function(angle){
		var cos=Math.cos(angle);
		var sin=Math.sin(angle);
		var ba=this.a,bb=this.b,bc=this.c,bd=this.d;
		if (bb!==0 || bc!==0){
			this.a=cos *ba+sin *bc;
			this.b=cos *bb+sin *bd;
			this.c=-sin *ba+cos *bc;
			this.d=-sin *bb+cos *bd;
			}else {
			this.a=cos *ba;
			this.b=sin *bd;
			this.c=-sin *ba;
			this.d=cos *bd;
		}
		this.bTransform=true;
	}

	/**
	*返回此 Matrix 对象的副本。
	*@return 与原始实例具有完全相同的属性的新 Matrix 实例。
	*/
	__proto.clone=function(){
		var dec=Matrix.create();
		dec.a=this.a;
		dec.b=this.b;
		dec.c=this.c;
		dec.d=this.d;
		dec.tx=this.tx;
		dec.ty=this.ty;
		dec.bTransform=this.bTransform;
		return dec;
	}

	/**
	*将当前 Matrix 对象中的所有矩阵数据复制到指定的 Matrix 对象中。
	*@param dec 要复制当前矩阵数据的 Matrix 对象。
	*@return 已复制当前矩阵数据的 Matrix 对象。
	*/
	__proto.copyTo=function(dec){
		dec.a=this.a;
		dec.b=this.b;
		dec.c=this.c;
		dec.d=this.d;
		dec.tx=this.tx;
		dec.ty=this.ty;
		dec.bTransform=this.bTransform;
		return dec;
	}

	/**
	*返回列出该 Matrix 对象属性的文本值。
	*@return 一个字符串，它包含 Matrix 对象的属性值：a、b、c、d、tx 和 ty。
	*/
	__proto.toString=function(){
		return this.a+","+this.b+","+this.c+","+this.d+","+this.tx+","+this.ty;
	}

	/**
	*销毁此对象。
	*/
	__proto.destroy=function(){
		if (this.inPool)return;
		var cache=Matrix._cache;
		this.inPool=true;
		cache._length || (cache._length=0);
		cache[cache._length++]=this;
		this.a=this.d=1;
		this.b=this.c=this.tx=this.ty=0;
		this.bTransform=false;
	}

	Matrix.mul=function(m1,m2,out){
		var aa=m1.a,ab=m1.b,ac=m1.c,ad=m1.d,atx=m1.tx,aty=m1.ty;
		var ba=m2.a,bb=m2.b,bc=m2.c,bd=m2.d,btx=m2.tx,bty=m2.ty;
		if (bb!==0 || bc!==0){
			out.a=aa *ba+ab *bc;
			out.b=aa *bb+ab *bd;
			out.c=ac *ba+ad *bc;
			out.d=ac *bb+ad *bd;
			out.tx=ba *atx+bc *aty+btx;
			out.ty=bb *atx+bd *aty+bty;
			}else {
			out.a=aa *ba;
			out.b=ab *bd;
			out.c=ac *ba;
			out.d=ad *bd;
			out.tx=ba *atx+btx;
			out.ty=bd *aty+bty;
		}
		return out;
	}

	Matrix.mul16=function(m1,m2,out){
		var aa=m1.a,ab=m1.b,ac=m1.c,ad=m1.d,atx=m1.tx,aty=m1.ty;
		var ba=m2.a,bb=m2.b,bc=m2.c,bd=m2.d,btx=m2.tx,bty=m2.ty;
		if (bb!==0 || bc!==0){
			out[0]=aa *ba+ab *bc;
			out[1]=aa *bb+ab *bd;
			out[4]=ac *ba+ad *bc;
			out[5]=ac *bb+ad *bd;
			out[12]=ba *atx+bc *aty+btx;
			out[13]=bb *atx+bd *aty+bty;
			}else {
			out[0]=aa *ba;
			out[1]=ab *bd;
			out[4]=ac *ba;
			out[5]=ad *bd;
			out[12]=ba *atx+btx;
			out[13]=bd *aty+bty;
		}
		return out;
	}

	Matrix.mulPre=function(m1,ba,bb,bc,bd,btx,bty,out){
		var aa=m1.a,ab=m1.b,ac=m1.c,ad=m1.d,atx=m1.tx,aty=m1.ty;
		if (bb!==0 || bc!==0){
			out.a=aa *ba+ab *bc;
			out.b=aa *bb+ab *bd;
			out.c=ac *ba+ad *bc;
			out.d=ac *bb+ad *bd;
			out.tx=ba *atx+bc *aty+btx;
			out.ty=bb *atx+bd *aty+bty;
			}else {
			out.a=aa *ba;
			out.b=ab *bd;
			out.c=ac *ba;
			out.d=ad *bd;
			out.tx=ba *atx+btx;
			out.ty=bd *aty+bty;
		}
		return out;
	}

	Matrix.mulPos=function(m1,aa,ab,ac,ad,atx,aty,out){
		var ba=m1.a,bb=m1.b,bc=m1.c,bd=m1.d,btx=m1.tx,bty=m1.ty;
		if (bb!==0 || bc!==0){
			out.a=aa *ba+ab *bc;
			out.b=aa *bb+ab *bd;
			out.c=ac *ba+ad *bc;
			out.d=ac *bb+ad *bd;
			out.tx=ba *atx+bc *aty+btx;
			out.ty=bb *atx+bd *aty+bty;
			}else {
			out.a=aa *ba;
			out.b=ab *bd;
			out.c=ac *ba;
			out.d=ad *bd;
			out.tx=ba *atx+btx;
			out.ty=bd *aty+bty;
		}
		return out;
	}

	Matrix.preMul=function(parent,self,out){
		var pa=parent.a,pb=parent.b,pc=parent.c,pd=parent.d;
		var na=self.a,nb=self.b,nc=self.c,nd=self.d,ntx=self.tx,nty=self.ty;
		out.a=na *pa;
		out.b=out.c=0;
		out.d=nd *pd;
		out.tx=ntx *pa+parent.tx;
		out.ty=nty *pd+parent.ty;
		if (nb!==0 || nc!==0 || pb!==0 || pc!==0){
			out.a+=nb *pc;
			out.d+=nc *pb;
			out.b+=na *pb+nb *pd;
			out.c+=nc *pa+nd *pc;
			out.tx+=nty *pc;
			out.ty+=ntx *pb;
		}
		return out;
	}

	Matrix.preMulXY=function(parent,x,y,out){
		var pa=parent.a,pb=parent.b,pc=parent.c,pd=parent.d;
		out.a=pa;
		out.b=pb;
		out.c=pc;
		out.d=pd;
		out.tx=x *pa+parent.tx+y *pc;
		out.ty=y *pd+parent.ty+x *pb;
		return out;
	}

	Matrix.create=function(){
		var cache=Matrix._cache;
		var mat=!cache._length ? (new Matrix()):cache[--cache._length];
		mat.inPool=false;
		return mat;
	}

	Matrix.EMPTY=new Matrix();
	Matrix.TEMP=new Matrix();
	Matrix._cache=[];
	return Matrix;
})()


/**
*@private
*计算贝塞尔曲线的工具类。
*/
//class laya.maths.Bezier
var Bezier=(function(){
	function Bezier(){
		/**@private */
		this._controlPoints=[new Point(),new Point(),new Point()];
		this._calFun=this.getPoint2;
	}

	__class(Bezier,'laya.maths.Bezier');
	var __proto=Bezier.prototype;
	/**@private */
	__proto._switchPoint=function(x,y){
		var tPoint=this._controlPoints.shift();
		tPoint.setTo(x,y);
		this._controlPoints.push(tPoint);
	}

	/**
	*计算二次贝塞尔点。
	*@param t
	*@param rst
	*
	*/
	__proto.getPoint2=function(t,rst){
		var p1=this._controlPoints[0];
		var p2=this._controlPoints[1];
		var p3=this._controlPoints[2];
		var lineX=Math.pow((1-t),2)*p1.x+2 *t *(1-t)*p2.x+Math.pow(t,2)*p3.x;
		var lineY=Math.pow((1-t),2)*p1.y+2 *t *(1-t)*p2.y+Math.pow(t,2)*p3.y;
		rst.push(lineX,lineY);
	}

	/**
	*计算三次贝塞尔点
	*@param t
	*@param rst
	*
	*/
	__proto.getPoint3=function(t,rst){
		var p1=this._controlPoints[0];
		var p2=this._controlPoints[1];
		var p3=this._controlPoints[2];
		var p4=this._controlPoints[3];
		var lineX=Math.pow((1-t),3)*p1.x+3 *p2.x *t *(1-t)*(1-t)+3 *p3.x *t *t *(1-t)+p4.x *Math.pow(t,3);
		var lineY=Math.pow((1-t),3)*p1.y+3 *p2.y *t *(1-t)*(1-t)+3 *p3.y *t *t *(1-t)+p4.y *Math.pow(t,3);
		rst.push(lineX,lineY);
	}

	/**
	*计算贝塞尔点序列
	*@param count
	*@param rst
	*
	*/
	__proto.insertPoints=function(count,rst){
		var i=NaN;
		count=count > 0 ? count :5;
		var dLen=NaN;
		dLen=1 / count;
		for (i=0;i <=1;i+=dLen){
			this._calFun(i,rst);
		}
	}

	/**
	*获取贝塞尔曲线上的点。
	*@param pList 控制点[x0,y0,x1,y1...]
	*@param inSertCount 每次曲线的插值数量
	*@return
	*
	*/
	__proto.getBezierPoints=function(pList,inSertCount,count){
		(inSertCount===void 0)&& (inSertCount=5);
		(count===void 0)&& (count=2);
		var i=0,len=0;
		len=pList.length;
		if (len < (count+1)*2)return [];
		var rst;
		rst=[];
		switch (count){
			case 2:
				this._calFun=this.getPoint2;
				break ;
			case 3:
				this._calFun=this.getPoint3;
				break ;
			default :
				return [];
			}
		while (this._controlPoints.length <=count){
			this._controlPoints.push(new Point());
		}
		for (i=0;i < count *2;i+=2){
			this._switchPoint(pList[i],pList[i+1]);
		}
		for (i=count *2;i < len;i+=2){
			this._switchPoint(pList[i],pList[i+1]);
			if ((i / 2)% count==0)
				this.insertPoints(inSertCount,rst);
		}
		return rst;
	}

	__static(Bezier,
	['I',function(){return this.I=new Bezier();}
	]);
	return Bezier;
})()


/**
*@private
*Graphic bounds数据类
*/
//class laya.display.GraphicsBounds
var GraphicsBounds=(function(){
	function GraphicsBounds(){
		/**@private */
		//this._temp=null;
		/**@private */
		//this._bounds=null;
		/**@private */
		//this._rstBoundPoints=null;
		/**@private */
		this._cacheBoundsType=false;
		/**@private */
		//this._graphics=null;
	}

	__class(GraphicsBounds,'laya.display.GraphicsBounds');
	var __proto=GraphicsBounds.prototype;
	/**
	*销毁
	*/
	__proto.destroy=function(){
		this._graphics=null;
		this._temp=null;
		this._rstBoundPoints=null;
		this._bounds=null;
	}

	/**
	*重置数据
	*/
	__proto.reset=function(){
		this._temp && (this._temp.length=0);
	}

	/**
	*获取位置及宽高信息矩阵(比较耗CPU，频繁使用会造成卡顿，尽量少用)。
	*@param realSize （可选）使用图片的真实大小，默认为false
	*@return 位置与宽高组成的 一个 Rectangle 对象。
	*/
	__proto.getBounds=function(realSize){
		(realSize===void 0)&& (realSize=false);
		if (!this._bounds || !this._temp || this._temp.length < 1 || realSize !=this._cacheBoundsType){
			this._bounds=Rectangle._getWrapRec(this.getBoundPoints(realSize),this._bounds)
		}
		this._cacheBoundsType=realSize;
		return this._bounds;
	}

	/**
	*@private
	*@param realSize （可选）使用图片的真实大小，默认为false
	*获取端点列表。
	*/
	__proto.getBoundPoints=function(realSize){
		(realSize===void 0)&& (realSize=false);
		if (!this._temp || this._temp.length < 1 || realSize !=this._cacheBoundsType)
			this._temp=this._getCmdPoints(realSize);
		this._cacheBoundsType=realSize;
		return this._rstBoundPoints=Utils.copyArray(this._rstBoundPoints,this._temp);
	}

	__proto._getCmdPoints=function(realSize){
		(realSize===void 0)&& (realSize=false);
		var context=Render._context;
		var cmds=this._graphics.cmds;
		var rst;
		rst=this._temp || (this._temp=[]);
		rst.length=0;
		if (!cmds && this._graphics._one !=null){
			GraphicsBounds._tempCmds.length=0;
			GraphicsBounds._tempCmds.push(this._graphics._one);
			cmds=GraphicsBounds._tempCmds;
		}
		if (!cmds)
			return rst;
		var matrixs;
		matrixs=GraphicsBounds._tempMatrixArrays;
		matrixs.length=0;
		var tMatrix=GraphicsBounds._initMatrix;
		tMatrix.identity();
		var tempMatrix=GraphicsBounds._tempMatrix;
		var cmd;
		var tex;
		var wRate=NaN;
		var hRate=NaN;
		var oWidth=NaN;
		var oHeight=NaN;
		var offX=NaN;
		var offY=NaN;
		for (var i=0,n=cmds.length;i < n;i++){
			cmd=cmds[i];
			if (!cmd.callee)continue ;
			switch (cmd.callee){
				case context._save:
				case 7:
					matrixs.push(tMatrix);
					tMatrix=tMatrix.clone();
					break ;
				case context._restore:
				case 8:
					tMatrix=matrixs.pop();
					break ;
				case context._scale:
				case 5:
					tempMatrix.identity();
					tempMatrix.translate(-cmd[2],-cmd[3]);
					tempMatrix.scale(cmd[0],cmd[1]);
					tempMatrix.translate(cmd[2],cmd[3]);
					this._switchMatrix(tMatrix,tempMatrix);
					break ;
				case context._rotate:
				case 3:
					tempMatrix.identity();
					tempMatrix.translate(-cmd[1],-cmd[2]);
					tempMatrix.rotate(cmd[0]);
					tempMatrix.translate(cmd[1],cmd[2]);
					this._switchMatrix(tMatrix,tempMatrix);
					break ;
				case context._translate:
				case 6:
					tempMatrix.identity();
					tempMatrix.translate(cmd[0],cmd[1]);
					this._switchMatrix(tMatrix,tempMatrix);
					break ;
				case context._transform:
				case 4:
					tempMatrix.identity();
					tempMatrix.translate(-cmd[1],-cmd[2]);
					tempMatrix.concat(cmd[0]);
					tempMatrix.translate(cmd[1],cmd[2]);
					this._switchMatrix(tMatrix,tempMatrix);
					break ;
				case 16:
				case 24:
					GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]),tMatrix);
					break ;
				case 17:
					tMatrix.copyTo(tempMatrix);
					tempMatrix.concat(cmd[4]);
					GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]),tempMatrix);
					break ;
				case context._drawTexture:
					tex=cmd[0];
					if (realSize){
						if (cmd[3] && cmd[4]){
							GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],cmd[3],cmd[4]),tMatrix);
							}else {
							tex=cmd[0];
							GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],tex.width,tex.height),tMatrix);
						}
						}else {
						wRate=(cmd[3] || tex.sourceWidth)/ tex.width;
						hRate=(cmd[4] || tex.sourceHeight)/ tex.height;
						oWidth=wRate *tex.sourceWidth;
						oHeight=hRate *tex.sourceHeight;
						offX=tex.offsetX > 0 ? tex.offsetX :0;
						offY=tex.offsetY > 0 ? tex.offsetY :0;
						offX *=wRate;
						offY *=hRate;
						GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1]-offX,cmd[2]-offY,oWidth,oHeight),tMatrix);
					}
					break ;
				case context._fillTexture:
					if (cmd[3] && cmd[4]){
						GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],cmd[3],cmd[4]),tMatrix);
						}else {
						tex=cmd[0];
						GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],tex.width,tex.height),tMatrix);
					}
					break ;
				case context._drawTextureWithTransform:;
					var drawMatrix;
					if (cmd[5]){
						tMatrix.copyTo(tempMatrix);
						tempMatrix.concat(cmd[5]);
						drawMatrix=tempMatrix;
						}else {
						drawMatrix=tMatrix;
					}
					if (realSize){
						if (cmd[3] && cmd[4]){
							GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],cmd[3],cmd[4]),drawMatrix);
							}else {
							tex=cmd[0];
							GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1],cmd[2],tex.width,tex.height),drawMatrix);
						}
						}else {
						tex=cmd[0];
						wRate=(cmd[3] || tex.sourceWidth)/ tex.width;
						hRate=(cmd[4] || tex.sourceHeight)/ tex.height;
						oWidth=wRate *tex.sourceWidth;
						oHeight=hRate *tex.sourceHeight;
						offX=tex.offsetX > 0 ? tex.offsetX :0;
						offY=tex.offsetY > 0 ? tex.offsetY :0;
						offX *=wRate;
						offY *=hRate;
						GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[1]-offX,cmd[2]-offY,oWidth,oHeight),drawMatrix);
					}
					break ;
				case context._drawRect:
				case 13:
					GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0],cmd[1],cmd[2],cmd[3]),tMatrix);
					break ;
				case context._drawCircle:
				case context._fillCircle:
				case 14:
					GraphicsBounds._addPointArrToRst(rst,Rectangle._getBoundPointS(cmd[0]-cmd[2],cmd[1]-cmd[2],cmd[2]+cmd[2],cmd[2]+cmd[2]),tMatrix);
					break ;
				case context._drawLine:
				case 20:
					GraphicsBounds._tempPoints.length=0;
					var lineWidth=NaN;
					lineWidth=cmd[5] *0.5;
					if (cmd[0]==cmd[2]){
						GraphicsBounds._tempPoints.push(cmd[0]+lineWidth,cmd[1],cmd[2]+lineWidth,cmd[3],cmd[0]-lineWidth,cmd[1],cmd[2]-lineWidth,cmd[3]);
						}else if (cmd[1]==cmd[3]){
						GraphicsBounds._tempPoints.push(cmd[0],cmd[1]+lineWidth,cmd[2],cmd[3]+lineWidth,cmd[0],cmd[1]-lineWidth,cmd[2],cmd[3]-lineWidth);
						}else {
						GraphicsBounds._tempPoints.push(cmd[0],cmd[1],cmd[2],cmd[3]);
					}
					GraphicsBounds._addPointArrToRst(rst,GraphicsBounds._tempPoints,tMatrix);
					break ;
				case context._drawCurves:
				case 22:
					GraphicsBounds._addPointArrToRst(rst,Bezier.I.getBezierPoints(cmd[2]),tMatrix,cmd[0],cmd[1]);
					break ;
				case context._drawPoly:
				case context._drawLines:
				case 18:
					GraphicsBounds._addPointArrToRst(rst,cmd[2],tMatrix,cmd[0],cmd[1]);
					break ;
				case context._drawPath:
				case 19:
					GraphicsBounds._addPointArrToRst(rst,this._getPathPoints(cmd[2]),tMatrix,cmd[0],cmd[1]);
					break ;
				case context._drawPie:
				case 15:
					GraphicsBounds._addPointArrToRst(rst,this._getPiePoints(cmd[0],cmd[1],cmd[2],cmd[3],cmd[4]),tMatrix);
					break ;
				}
		}
		if (rst.length > 200){
			rst=Utils.copyArray(rst,Rectangle._getWrapRec(rst)._getBoundPoints());
		}else if (rst.length > 8)
		rst=GrahamScan.scanPList(rst);
		return rst;
	}

	__proto._switchMatrix=function(tMatix,tempMatrix){
		tempMatrix.concat(tMatix);
		tempMatrix.copyTo(tMatix);
	}

	__proto._getPiePoints=function(x,y,radius,startAngle,endAngle){
		var rst=GraphicsBounds._tempPoints;
		GraphicsBounds._tempPoints.length=0;
		rst.push(x,y);
		var delta=(endAngle-startAngle)% (2 *Math.PI);
		var segnum=10;
		var step=delta / segnum;
		var i=NaN;
		var angle=startAngle;
		for (i=0;i <=segnum;i++){
			rst.push(x+radius *Math.cos(angle),y+radius *Math.sin(angle));
			angle+=step;
		}
		return rst;
	}

	__proto._getPathPoints=function(paths){
		var i=0,len=0;
		var rst=GraphicsBounds._tempPoints;
		rst.length=0;
		len=paths.length;
		var tCMD;
		for (i=0;i < len;i++){
			tCMD=paths[i];
			if (tCMD.length > 1){
				rst.push(tCMD[1],tCMD[2]);
				if (tCMD.length > 3){
					rst.push(tCMD[3],tCMD[4]);
				}
			}
		}
		return rst;
	}

	GraphicsBounds._addPointArrToRst=function(rst,points,matrix,dx,dy){
		(dx===void 0)&& (dx=0);
		(dy===void 0)&& (dy=0);
		var i=0,len=0;
		len=points.length;
		for (i=0;i < len;i+=2){
			GraphicsBounds._addPointToRst(rst,points[i]+dx,points[i+1]+dy,matrix);
		}
	}

	GraphicsBounds._addPointToRst=function(rst,x,y,matrix){
		var _tempPoint=Point.TEMP;
		_tempPoint.setTo(x ? x :0,y ? y :0);
		matrix.transformPoint(_tempPoint);
		rst.push(_tempPoint.x,_tempPoint.y);
	}

	GraphicsBounds._tempPoints=[];
	GraphicsBounds._tempMatrixArrays=[];
	GraphicsBounds._tempCmds=[];
	__static(GraphicsBounds,
	['_tempMatrix',function(){return this._tempMatrix=new Matrix();},'_initMatrix',function(){return this._initMatrix=new Matrix();}
	]);
	return GraphicsBounds;
})()


/**
*@private
*/
//class laya.display.css.TransformInfo
var TransformInfo=(function(){
	function TransformInfo(){
		this.translateX=0;
		this.translateY=0;
		this.scaleX=1;
		this.scaleY=1;
		this.rotate=0;
		this.skewX=0;
		this.skewY=0;
	}

	__class(TransformInfo,'laya.display.css.TransformInfo');
	return TransformInfo;
})()


/**
*@private
*<code>Style</code> 类是元素样式定义类。
*/
//class laya.display.css.Style
var Style=(function(){
	function Style(){
		/**透明度。*/
		this.alpha=1;
		/**表示是否显示。*/
		this.visible=true;
		/**表示滚动区域。*/
		this.scrollRect=null;
		/**混合模式。*/
		this.blendMode=null;
		/**@private */
		this._type=0;
		this._tf=Style._TF_EMPTY;
	}

	__class(Style,'laya.display.css.Style');
	var __proto=Style.prototype;
	__proto.getTransform=function(){
		return this._tf;
	}

	__proto.setTransform=function(value){
		this._tf=value==='none' || !value ? Style._TF_EMPTY :value;
	}

	__proto.setTranslateX=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.translateX=value;
	}

	__proto.setTranslateY=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.translateY=value;
	}

	__proto.setScaleX=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.scaleX=value;
	}

	__proto.setScale=function(x,y){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.scaleX=x;
		this._tf.scaleY=y;
	}

	__proto.setScaleY=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.scaleY=value;
	}

	__proto.setRotate=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.rotate=value;
	}

	__proto.setSkewX=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.skewX=value;
	}

	__proto.setSkewY=function(value){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.skewY=value;
	}

	/**销毁此对象。*/
	__proto.destroy=function(){
		this.scrollRect=null;
	}

	/**@private */
	__proto.render=function(sprite,context,x,y){}
	/**@private */
	__proto.getCSSStyle=function(){
		return CSSStyle.EMPTY;
	}

	/**@private */
	__proto._enableLayout=function(){
		return false;
	}

	/**是否为绝对定位。*/
	__getset(0,__proto,'absolute',function(){
		return true;
	});

	/**表示元素是否显示为块级元素。*/
	__getset(0,__proto,'block',function(){
		return (this._type & 0x1)!=0;
	});

	/**X 轴缩放值。*/
	__getset(0,__proto,'scaleX',function(){
		return this._tf.scaleX;
		},function(value){
		this.setScaleX(value);
	});

	/**定义沿着 Y 轴的 2D 倾斜转换。*/
	__getset(0,__proto,'skewY',function(){
		return this._tf.skewY;
		},function(value){
		this.setSkewY(value);
	});

	/**定义沿着 X 轴的 2D 倾斜转换。*/
	__getset(0,__proto,'skewX',function(){
		return this._tf.skewX;
		},function(value){
		this.setSkewX(value);
	});

	/**定义旋转角度。*/
	__getset(0,__proto,'rotate',function(){
		return this._tf.rotate;
		},function(value){
		this.setRotate(value);
	});

	/**元素应用的 2D 或 3D 转换的值。该属性允许我们对元素进行旋转、缩放、移动或倾斜。*/
	__getset(0,__proto,'transform',function(){
		return this.getTransform();
		},function(value){
		this.setTransform(value);
	});

	/**Y 轴缩放值。*/
	__getset(0,__proto,'scaleY',function(){
		return this._tf.scaleY;
		},function(value){
		this.setScaleY(value);
	});

	/**表示元素的上内边距。*/
	__getset(0,__proto,'paddingTop',function(){
		return 0;
	});

	/**定义转换，只是用 Y 轴的值。*/
	__getset(0,__proto,'translateY',function(){
		return this._tf.translateY;
		},function(value){
		this.setTranslateY(value);
	});

	/**定义转换，只是用 X 轴的值。*/
	__getset(0,__proto,'translateX',function(){
		return this._tf.translateX;
		},function(value){
		this.setTranslateX(value);
	});

	/**表示元素的左内边距。*/
	__getset(0,__proto,'paddingLeft',function(){
		return 0;
	});

	Style.__init__=function(){
		Style._TF_EMPTY=new TransformInfo();
		Style.EMPTY=new Style();
	}

	Style.EMPTY=null;
	Style._TF_EMPTY=null;
	return Style;
})()


/**
*@private
*<code>Font</code> 类是字体显示定义类。
*/
//class laya.display.css.Font
var Font=(function(){
	function Font(src){
		this._type=0;
		this._weight=0;
		this._decoration=null;
		this._text=null;
		/**
		*首行缩进 （以像素为单位）。
		*/
		this.indent=0;
		this._color=Color.create(Font.defaultColor);
		this.family=Font.defaultFamily;
		this.stroke=Font._STROKE;
		this.size=Font.defaultSize;
		src && src!==Font.EMPTY && src.copyTo(this);
	}

	__class(Font,'laya.display.css.Font');
	var __proto=Font.prototype;
	/**
	*字体样式字符串。
	*/
	__proto.set=function(value){
		this._text=null;
		var strs=value.split(' ');
		for (var i=0,n=strs.length;i < n;i++){
			var str=strs[i];
			switch (str){
				case 'italic':
					this.italic=true;
					continue ;
				case 'bold':
					this.bold=true;
					continue ;
				}
			if (str.indexOf('px')> 0){
				this.size=parseInt(str);
				this.family=strs[i+1];
				i++;
				continue ;
			}
		}
	}

	/**
	*返回字体样式字符串。
	*@return 字体样式字符串。
	*/
	__proto.toString=function(){
		this._text=""
		this.italic && (this._text+="italic ");
		this.bold && (this._text+="bold ");
		return this._text+=this.size+"px "+this.family;
	}

	/**
	*将当前的属性值复制到传入的 <code>Font</code> 对象。
	*@param dec 一个 Font 对象。
	*/
	__proto.copyTo=function(dec){
		dec._type=this._type;
		dec._text=this._text;
		dec._weight=this._weight;
		dec._color=this._color;
		dec.family=this.family;
		dec.stroke=this.stroke !=Font._STROKE ? this.stroke.slice():Font._STROKE;
		dec.indent=this.indent;
		dec.size=this.size;
	}

	/**
	*规定添加到文本的修饰。
	*/
	__getset(0,__proto,'decoration',function(){
		return this._decoration ? this._decoration.value :null;
		},function(value){
		var strs=value.split(' ');
		this._decoration || (this._decoration={});
		switch (strs[0]){
			case '_':
				this._decoration.type='underline'
				break ;
			case '-':
				this._decoration.type='line-through'
				break ;
			case 'overline':
				this._decoration.type='overline'
				break ;
			default :
				this._decoration.type=strs[0];
			}
		strs[1] && (this._decoration.color=Color.create(strs));
		this._decoration.value=value;
	});

	/**
	*文本的粗细。
	*/
	__getset(0,__proto,'weight',function(){
		return ""+this._weight;
		},function(value){
		var weight=0;
		switch (value){
			case 'normal':
				break ;
			case 'bold':
				this.bold=true;
				weight=700;
				break ;
			case 'bolder':
				weight=800;
				break ;
			case 'lighter':
				weight=100;
				break ;
			default :
				weight=parseInt(value);
			}
		this._weight=weight;
		this._text=null;
	});

	/**
	*表示颜色字符串。
	*/
	__getset(0,__proto,'color',function(){
		return this._color.strColor;
		},function(value){
		this._color=Color.create(value);
	});

	/**
	*表示是否为粗体。
	*/
	__getset(0,__proto,'bold',function(){
		return (this._type & 0x800)!==0;
		},function(value){
		value ? (this._type |=0x800):(this._type &=~0x800);
	});

	/**
	*表示是否为斜体。
	*/
	__getset(0,__proto,'italic',function(){
		return (this._type & 0x200)!==0;
		},function(value){
		value ? (this._type |=0x200):(this._type &=~0x200);
	});

	/**
	*表示是否为密码格式。
	*/
	__getset(0,__proto,'password',function(){
		return (this._type & 0x400)!==0;
		},function(value){
		value ? (this._type |=0x400):(this._type &=~0x400);
	});

	Font.__init__=function(){
		Font.EMPTY=new Font(null);
	}

	Font.EMPTY=null;
	Font.defaultColor="#000000";
	Font.defaultSize=12;
	Font.defaultFamily="Arial";
	Font.defaultFont="12px Arial";
	Font._STROKE=[0,"#000000"];
	Font._ITALIC=0x200;
	Font._PASSWORD=0x400;
	Font._BOLD=0x800;
	return Font;
})()


/**
*<code>BitmapFont</code> 是位图字体类，用于定义位图字体信息。
*/
//class laya.display.BitmapFont
var BitmapFont=(function(){
	function BitmapFont(){
		this._texture=null;
		this._fontCharDic={};
		this._fontWidthMap={};
		this._complete=null;
		this._path=null;
		this._maxWidth=0;
		this._spaceWidth=10;
		this._padding=null;
		/**当前位图字体字号。*/
		this.fontSize=12;
		/**表示是否根据实际使用的字体大小缩放位图字体大小。*/
		this.autoScaleSize=false;
		/**字符间距（以像素为单位）。*/
		this.letterSpacing=0;
	}

	__class(BitmapFont,'laya.display.BitmapFont');
	var __proto=BitmapFont.prototype;
	/**
	*通过指定位图字体文件路径，加载位图字体文件，加载完成后会自动解析。
	*@param path 位图字体文件的路径。
	*@param complete 加载并解析完成的回调。如果成功返回this,如果失败返回null
	*/
	__proto.loadFont=function(path,complete){
		this._path=path;
		this._complete=complete;
		Laya.loader.load([{url:this._path,type:"xml"},{url:this._path.replace(".fnt",".png"),type:"image"}],Handler.create(this,this.onLoaded));
	}

	/**
	*@private
	*/
	__proto.onLoaded=function(){
		this.parseFont(Loader.getRes(this._path),Loader.getRes(this._path.replace(".fnt",".png")));
		this._complete && this._complete.runWith(this._texture?this:null);
	}

	/**
	*解析字体文件。
	*@param xml 字体文件XML。
	*@param texture 字体的纹理。
	*/
	__proto.parseFont=function(xml,texture){
		if (xml==null || texture==null)return;
		this._texture=texture;
		var tX=0;
		var tScale=1;
		var tInfo=xml.getElementsByTagName("info");
		if (!tInfo[0].getAttributeNode){
			return this.parseFont2(xml,texture);
		}
		this.fontSize=parseInt(tInfo[0].getAttributeNode("size").nodeValue);
		var tPadding=tInfo[0].getAttributeNode("padding").nodeValue;
		var tPaddingArray=tPadding.split(",");
		this._padding=[parseInt(tPaddingArray[0]),parseInt(tPaddingArray[1]),parseInt(tPaddingArray[2]),parseInt(tPaddingArray[3])];
		var chars;
		chars=xml.getElementsByTagName("char");
		var i=0;
		for (i=0;i < chars.length;i++){
			var tAttribute=chars[i];
			var tId=parseInt(tAttribute.getAttributeNode("id").nodeValue);
			var xOffset=parseInt(tAttribute.getAttributeNode("xoffset").nodeValue)/ tScale;
			var yOffset=parseInt(tAttribute.getAttributeNode("yoffset").nodeValue)/ tScale;
			var xAdvance=parseInt(tAttribute.getAttributeNode("xadvance").nodeValue)/ tScale;
			var region=new Rectangle();
			region.x=parseInt(tAttribute.getAttributeNode("x").nodeValue);
			region.y=parseInt(tAttribute.getAttributeNode("y").nodeValue);
			region.width=parseInt(tAttribute.getAttributeNode("width").nodeValue);
			region.height=parseInt(tAttribute.getAttributeNode("height").nodeValue);
			var tTexture=Texture.create(texture,region.x,region.y,region.width,region.height,xOffset,yOffset);
			this._maxWidth=Math.max(this._maxWidth,xAdvance+this.letterSpacing);
			this._fontCharDic[tId]=tTexture;
			this._fontWidthMap[tId]=xAdvance;
		}
	}

	/**
	*@private
	*解析字体文件。
	*@param xml 字体文件XML。
	*@param texture 字体的纹理。
	*/
	__proto.parseFont2=function(xml,texture){
		if (xml==null || texture==null)return;
		this._texture=texture;
		var tX=0;
		var tScale=1;
		var tInfo=xml.getElementsByTagName("info");
		this.fontSize=parseInt(tInfo[0].attributes["size"].nodeValue);
		var tPadding=tInfo[0].attributes["padding"].nodeValue;
		var tPaddingArray=tPadding.split(",");
		this._padding=[parseInt(tPaddingArray[0]),parseInt(tPaddingArray[1]),parseInt(tPaddingArray[2]),parseInt(tPaddingArray[3])];
		var chars=xml.getElementsByTagName("char");
		var i=0;
		for (i=0;i < chars.length;i++){
			var tAttribute=chars[i].attributes;
			var tId=parseInt(tAttribute["id"].nodeValue);
			var xOffset=parseInt(tAttribute["xoffset"].nodeValue)/ tScale;
			var yOffset=parseInt(tAttribute["yoffset"].nodeValue)/ tScale;
			var xAdvance=parseInt(tAttribute["xadvance"].nodeValue)/ tScale;
			var region=new Rectangle();
			region.x=parseInt(tAttribute["x"].nodeValue);
			region.y=parseInt(tAttribute["y"].nodeValue);
			region.width=parseInt(tAttribute["width"].nodeValue);
			region.height=parseInt(tAttribute["height"].nodeValue);
			var tTexture=Texture.create(texture,region.x,region.y,region.width,region.height,xOffset,yOffset);
			this._maxWidth=Math.max(this._maxWidth,xAdvance+this.letterSpacing);
			this._fontCharDic[tId]=tTexture;
			this._fontWidthMap[tId]=xAdvance;
		}
	}

	/**
	*获取指定字符的字体纹理对象。
	*@param char 字符。
	*@return 指定的字体纹理对象。
	*/
	__proto.getCharTexture=function(char){
		return this._fontCharDic[char.charCodeAt(0)];
	}

	/**
	*销毁位图字体，调用Text.unregisterBitmapFont 时，默认会销毁。
	*/
	__proto.destroy=function(){
		if (this._texture){
			for (var p in this._fontCharDic){
				var tTexture=this._fontCharDic[p];
				if (tTexture)tTexture.destroy();
			}
			this._texture.destroy();
			this._fontCharDic=null;
			this._fontWidthMap=null;
			this._texture=null;
		}
	}

	/**
	*设置空格的宽（如果字体库有空格，这里就可以不用设置了）。
	*@param spaceWidth 宽度，单位为像素。
	*/
	__proto.setSpaceWidth=function(spaceWidth){
		this._spaceWidth=spaceWidth;
	}

	/**
	*获取指定字符的宽度。
	*@param char 字符。
	*@return 宽度。
	*/
	__proto.getCharWidth=function(char){
		var code=char.charCodeAt(0);
		if (this._fontWidthMap[code])return this._fontWidthMap[code]+this.letterSpacing;
		if (char==" ")return this._spaceWidth+this.letterSpacing;
		return 0;
	}

	/**
	*获取指定文本内容的宽度。
	*@param text 文本内容。
	*@return 宽度。
	*/
	__proto.getTextWidth=function(text){
		var tWidth=0;
		for (var i=0,n=text.length;i < n;i++){
			tWidth+=this.getCharWidth(text.charAt(i));
		}
		return tWidth;
	}

	/**
	*获取最大字符宽度。
	*/
	__proto.getMaxWidth=function(){
		return this._maxWidth;
	}

	/**
	*获取最大字符高度。
	*/
	__proto.getMaxHeight=function(){
		return this.fontSize;
	}

	/**
	*@private
	*将指定的文本绘制到指定的显示对象上。
	*/
	__proto.drawText=function(text,sprite,drawX,drawY,align,width){
		var tWidth=this.getTextWidth(text);
		var tTexture;
		var dx=0;
		align==="center" && (dx=(width-tWidth)/ 2);
		align==="right" && (dx=(width-tWidth));
		var tX=0;
		for (var i=0,n=text.length;i < n;i++){
			tTexture=this.getCharTexture(text.charAt(i));
			if (tTexture){
				sprite.graphics.drawTexture(tTexture,drawX+tX+dx,drawY);
				tX+=this.getCharWidth(text.charAt(i));
			}
		}
	}

	return BitmapFont;
})()


/**
*@private
*Touch事件管理类，处理多点触控下的鼠标事件
*/
//class laya.events.TouchManager
var TouchManager=(function(){
	function TouchManager(){
		/**
		*当前over的touch表
		*/
		this.preOvers=[];
		/**
		*当前down的touch表
		*/
		this.preDowns=[];
		this.preRightDowns=[];
		/**
		*是否启用
		*/
		this.enable=true;
		this._lastClickTime=0;
		this._event=new Event();
	}

	__class(TouchManager,'laya.events.TouchManager');
	var __proto=TouchManager.prototype;
	__proto._clearTempArrs=function(){
		TouchManager._oldArr.length=0;
		TouchManager._newArr.length=0;
		TouchManager._tEleArr.length=0;
	}

	/**
	*从touch表里查找对应touchID的数据
	*@param touchID touch ID
	*@param arr touch表
	*@return
	*
	*/
	__proto.getTouchFromArr=function(touchID,arr){
		var i=0,len=0;
		len=arr.length;
		var tTouchO;
		for (i=0;i < len;i++){
			tTouchO=arr[i];
			if (tTouchO.id==touchID){
				return tTouchO;
			}
		}
		return null;
	}

	/**
	*从touch表里移除一个元素
	*@param touchID touch ID
	*@param arr touch表
	*
	*/
	__proto.removeTouchFromArr=function(touchID,arr){
		var i=0;
		for (i=arr.length-1;i >=0;i--){
			if (arr[i].id==touchID){
				arr.splice(i,1);
			}
		}
	}

	/**
	*创建一个touch数据
	*@param ele 当前的根节点
	*@param touchID touchID
	*@return
	*
	*/
	__proto.createTouchO=function(ele,touchID){
		var rst;
		rst=Pool.getItem("TouchData")|| {};
		rst.id=touchID;
		rst.tar=ele;
		return rst;
	}

	/**
	*处理touchStart
	*@param ele 根节点
	*@param touchID touchID
	*@param isLeft （可选）是否为左键
	*/
	__proto.onMouseDown=function(ele,touchID,isLeft){
		(isLeft===void 0)&& (isLeft=false);
		if (!this.enable)
			return;
		var preO;
		var tO;
		var arrs;
		preO=this.getTouchFromArr(touchID,this.preOvers);
		arrs=this.getEles(ele,null,TouchManager._tEleArr);
		if (!preO){
			tO=this.createTouchO(ele,touchID);
			this.preOvers.push(tO);
			}else {
			preO.tar=ele;
		}
		if (Browser.onMobile)
			this.sendEvents(arrs,"mouseover");
		var preDowns;
		preDowns=isLeft ? this.preDowns :this.preRightDowns;
		preO=this.getTouchFromArr(touchID,preDowns);
		if (!preO){
			tO=this.createTouchO(ele,touchID);
			preDowns.push(tO);
			}else {
			preO.tar=ele;
		}
		this.sendEvents(arrs,isLeft ? "mousedown" :"rightmousedown");
		this._clearTempArrs();
	}

	/**
	*派发事件。
	*@param eles 对象列表。
	*@param type 事件类型。
	*/
	__proto.sendEvents=function(eles,type){
		var i=0,len=0;
		len=eles.length;
		this._event._stoped=false;
		var _target;
		_target=eles[0];
		var tE;
		for (i=0;i < len;i++){
			tE=eles[i];
			if (tE.destroyed)return;
			tE.event(type,this._event.setTo(type,tE,_target));
			if (this._event._stoped)
				break ;
		}
	}

	/**
	*获取对象列表。
	*@param start 起始节点。
	*@param end 结束节点。
	*@param rst 返回值。如果此值不为空，则将其赋值为计算结果，从而避免创建新数组；如果此值为空，则创建新数组返回。
	*@return Array 返回节点列表。
	*/
	__proto.getEles=function(start,end,rst){
		if (!rst){
			rst=[];
			}else {
			rst.length=0;
		}
		while (start && start !=end){
			rst.push(start);
			start=start.parent;
		}
		return rst;
	}

	/**
	*touchMove时处理out事件和over时间。
	*@param eleNew 新的根节点。
	*@param elePre 旧的根节点。
	*@param touchID （可选）touchID，默认为0。
	*/
	__proto.checkMouseOutAndOverOfMove=function(eleNew,elePre,touchID){
		(touchID===void 0)&& (touchID=0);
		if (elePre==eleNew)
			return;
		var tar;
		var arrs;
		var i=0,len=0;
		if (elePre.contains(eleNew)){
			arrs=this.getEles(eleNew,elePre,TouchManager._tEleArr);
			this.sendEvents(arrs,"mouseover");
			}else if (eleNew.contains(elePre)){
			arrs=this.getEles(elePre,eleNew,TouchManager._tEleArr);
			this.sendEvents(arrs,"mouseout");
			}else {
			arrs=TouchManager._tEleArr;
			arrs.length=0;
			var oldArr;
			oldArr=this.getEles(elePre,null,TouchManager._oldArr);
			var newArr;
			newArr=this.getEles(eleNew,null,TouchManager._newArr);
			len=oldArr.length;
			var tIndex=0;
			for (i=0;i < len;i++){
				tar=oldArr[i];
				tIndex=newArr.indexOf(tar);
				if (tIndex >=0){
					newArr.splice(tIndex,newArr.length-tIndex);
					break ;
					}else {
					arrs.push(tar);
				}
			}
			if (arrs.length > 0){
				this.sendEvents(arrs,"mouseout");
			}
			if (newArr.length > 0){
				this.sendEvents(newArr,"mouseover");
			}
		}
	}

	/**
	*处理TouchMove事件
	*@param ele 根节点
	*@param touchID touchID
	*
	*/
	__proto.onMouseMove=function(ele,touchID){
		if (!this.enable)
			return;
		var preO;
		preO=this.getTouchFromArr(touchID,this.preOvers);
		var arrs;
		var tO;
		if (!preO){
			arrs=this.getEles(ele,null,TouchManager._tEleArr);
			this.sendEvents(arrs,"mouseover");
			this.preOvers.push(this.createTouchO(ele,touchID));
			}else {
			this.checkMouseOutAndOverOfMove(ele,preO.tar);
			preO.tar=ele;
			arrs=this.getEles(ele,null,TouchManager._tEleArr);
		}
		this.sendEvents(arrs,"mousemove");
		this._clearTempArrs();
	}

	__proto.getLastOvers=function(){
		TouchManager._tEleArr.length=0;
		if (this.preOvers.length > 0 && this.preOvers[0].tar){
			return this.getEles(this.preOvers[0].tar,null,TouchManager._tEleArr);
		}
		TouchManager._tEleArr.push(Laya.stage);
		return TouchManager._tEleArr;
	}

	__proto.stageMouseOut=function(){
		var lastOvers;
		lastOvers=this.getLastOvers();
		this.preOvers.length=0;
		this.sendEvents(lastOvers,"mouseout");
	}

	/**
	*处理TouchEnd事件
	*@param ele 根节点
	*@param touchID touchID
	*@param isLeft 是否为左键
	*/
	__proto.onMouseUp=function(ele,touchID,isLeft){
		(isLeft===void 0)&& (isLeft=false);
		if (!this.enable)
			return;
		var preO;
		var tO;
		var arrs;
		var oldArr;
		var i=0,len=0;
		var tar;
		var sendArr;
		var onMobile=Browser.onMobile;
		arrs=this.getEles(ele,null,TouchManager._tEleArr);
		this.sendEvents(arrs,isLeft ? "mouseup" :"rightmouseup");
		var preDowns;
		preDowns=isLeft ? this.preDowns :this.preRightDowns;
		preO=this.getTouchFromArr(touchID,preDowns);
		if (!preO){
			}else {
			var isDouble=false;
			var now=Browser.now();
			isDouble=now-this._lastClickTime < 300;
			this._lastClickTime=now;
			if (ele==preO.tar){
				sendArr=arrs;
				}else {
				oldArr=this.getEles(preO.tar,null,TouchManager._oldArr);
				sendArr=TouchManager._newArr;
				sendArr.length=0;
				len=oldArr.length;
				for (i=0;i < len;i++){
					tar=oldArr[i];
					if (arrs.indexOf(tar)>=0){
						sendArr.push(tar);
					}
				}
			}
			if (sendArr.length > 0){
				this.sendEvents(sendArr,isLeft ? "click" :"rightclick");
			}
			if (isLeft && isDouble){
				this.sendEvents(sendArr,"doubleclick");
			}
			this.removeTouchFromArr(touchID,preDowns);
			preO.tar=null;
			Pool.recover("TouchData",preO);
		}
		preO=this.getTouchFromArr(touchID,this.preOvers);
		if (!preO){
			}else {
			if (onMobile){
				sendArr=this.getEles(preO.tar,null,sendArr);
				if (sendArr && sendArr.length > 0){
					this.sendEvents(sendArr,"mouseout");
				}
				this.removeTouchFromArr(touchID,this.preOvers);
				preO.tar=null;
				Pool.recover("TouchData",preO);
			}
		}
		this._clearTempArrs();
	}

	TouchManager._oldArr=[];
	TouchManager._newArr=[];
	TouchManager._tEleArr=[];
	__static(TouchManager,
	['I',function(){return this.I=new TouchManager();}
	]);
	return TouchManager;
})()


/**
*<p><code>KeyBoardManager</code> 是键盘事件管理类。该类从浏览器中接收键盘事件，并派发该事件。</p>
*<p>派发事件时若 Stage.focus 为空则只从 Stage 上派发该事件，否则将从 Stage.focus 对象开始一直冒泡派发该事件。所以在 Laya.stage 上监听键盘事件一定能够收到，如果在其他地方监听，则必须处在Stage.focus的冒泡链上才能收到该事件。</p>
*<p>用户可以通过代码 Laya.stage.focus=someNode 的方式来设置focus对象。</p>
*<p>用户可统一的根据事件对象中 e.keyCode 来判断按键类型，该属性兼容了不同浏览器的实现。</p>
*/
//class laya.events.KeyBoardManager
var KeyBoardManager=(function(){
	function KeyBoardManager(){}
	__class(KeyBoardManager,'laya.events.KeyBoardManager');
	KeyBoardManager.__init__=function(){
		KeyBoardManager._addEvent("keydown");
		KeyBoardManager._addEvent("keypress");
		KeyBoardManager._addEvent("keyup");
	}

	KeyBoardManager._addEvent=function(type){
		Browser.document.addEventListener(type,function(e){
			laya.events.KeyBoardManager._dispatch(e,type);
		},true);
	}

	KeyBoardManager._dispatch=function(e,type){
		if (!KeyBoardManager.enabled)return;
		KeyBoardManager._event._stoped=false;
		KeyBoardManager._event.nativeEvent=e;
		KeyBoardManager._event.keyCode=e.keyCode || e.which || e.charCode;
		if (type==="keydown")KeyBoardManager._pressKeys[KeyBoardManager._event.keyCode]=true;
		else if (type==="keyup")KeyBoardManager._pressKeys[KeyBoardManager._event.keyCode]=null;
		var target=(Laya.stage.focus && (Laya.stage.focus.event !=null)&& Laya.stage.focus.displayedInStage)? Laya.stage.focus :Laya.stage;
		var ct=target;
		while (ct){
			ct.event(type,KeyBoardManager._event.setTo(type,ct,target));
			ct=ct.parent;
		}
	}

	KeyBoardManager.hasKeyDown=function(key){
		return KeyBoardManager._pressKeys[key];
	}

	KeyBoardManager._pressKeys={};
	KeyBoardManager.enabled=true;
	__static(KeyBoardManager,
	['_event',function(){return this._event=new Event();}
	]);
	return KeyBoardManager;
})()


/**
*<p><code>MouseManager</code> 是鼠标、触摸交互管理器。</p>
*<p>鼠标事件流包括捕获阶段、目标阶段、冒泡阶段。<br/>
*捕获阶段：此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象；<br/>
*目标阶段：找到命中的目标对象；<br/>
*冒泡阶段：事件离开目标对象，按节点层级向上逐层通知，直到到达舞台的过程。</p>
*/
//class laya.events.MouseManager
var MouseManager=(function(){
	function MouseManager(){
		/**canvas 上的鼠标X坐标。*/
		this.mouseX=0;
		/**canvas 上的鼠标Y坐标。*/
		this.mouseY=0;
		/**是否禁用除 stage 以外的鼠标事件检测。*/
		this.disableMouseEvent=false;
		/**鼠标按下的时间。单位为毫秒。*/
		this.mouseDownTime=0;
		/**鼠标移动精度。*/
		this.mouseMoveAccuracy=2;
		this._stage=null;
		this._target=null;
		this._lastMoveTimer=0;
		this._isLeftMouse=false;
		this._eventList=[];
		this._touchIDs={};
		this._id=1;
		this._tTouchID=0;
		this._event=new Event();
		this._matrix=new Matrix();
		this._point=new Point();
		this._rect=new Rectangle();
		this._prePoint=new Point();
		this._curTouchID=NaN;
	}

	__class(MouseManager,'laya.events.MouseManager');
	var __proto=MouseManager.prototype;
	/**
	*@private
	*初始化。
	*/
	__proto.__init__=function(stage,canvas){
		var _$this=this;
		this._stage=stage;
		var _this=this;
		var list=this._eventList;
		canvas.oncontextmenu=function (e){
			if (MouseManager.enabled)return false;
		}
		canvas.addEventListener('mousedown',function(e){
			if (MouseManager.enabled){
				if(!Browser.onIE)e.preventDefault();
				list.push(e);
				_this.mouseDownTime=Browser.now();
			}
		});
		canvas.addEventListener('mouseup',function(e){
			if (MouseManager.enabled){
				e.preventDefault();
				list.push(e);
				_this.mouseDownTime=-Browser.now();
			}
		},true);
		canvas.addEventListener('mousemove',function(e){
			if (MouseManager.enabled){
				e.preventDefault();
				var now=Browser.now();
				if (now-_this._lastMoveTimer < 10)return;
				_this._lastMoveTimer=now;
				list.push(e);
			}
		},true);
		canvas.addEventListener("mouseout",function(e){
			if (MouseManager.enabled)list.push(e);
		})
		canvas.addEventListener("mouseover",function(e){
			if (MouseManager.enabled)list.push(e);
		})
		canvas.addEventListener("touchstart",function(e){
			if (MouseManager.enabled){
				list.push(e);
				if (!MouseManager._isFirstTouch&&!Input.isInputting)e.preventDefault();
				_this.mouseDownTime=Browser.now();
			}
		});
		canvas.addEventListener("touchend",function(e){
			if (MouseManager.enabled){
				if (!MouseManager._isFirstTouch&&!Input.isInputting)e.preventDefault();
				MouseManager._isFirstTouch=false;
				list.push(e);
				_this.mouseDownTime=-Browser.now();
				}else {
				_$this._curTouchID=NaN;
			}
		},true);
		canvas.addEventListener("touchmove",function(e){
			if (MouseManager.enabled){
				e.preventDefault();
				list.push(e);
			}
		},true);
		canvas.addEventListener("touchcancel",function(e){
			if (MouseManager.enabled){
				e.preventDefault();
				list.push(e);
				}else {
				_$this._curTouchID=NaN;
			}
		},true);
		canvas.addEventListener('mousewheel',function(e){
			if (MouseManager.enabled)list.push(e);
		});
		canvas.addEventListener('DOMMouseScroll',function(e){
			if (MouseManager.enabled)list.push(e);
		});
	}

	__proto.initEvent=function(e,nativeEvent){
		var _this=this;
		_this._event._stoped=false;
		_this._event.nativeEvent=nativeEvent || e;
		_this._target=null;
		this._point.setTo(e.pageX || e.clientX,e.pageY || e.clientY);
		this._stage._canvasTransform.invertTransformPoint(this._point);
		_this.mouseX=this._point.x;
		_this.mouseY=this._point.y;
		_this._event.touchId=e.identifier || 0;
		this._tTouchID=_this._event.touchId;
		var evt;
		evt=TouchManager.I._event;
		evt._stoped=false;
		evt.nativeEvent=_this._event.nativeEvent;
		evt.touchId=_this._event.touchId;
	}

	__proto.checkMouseWheel=function(e){
		this._event.delta=e.wheelDelta ? e.wheelDelta *0.025 :-e.detail;
		var _lastOvers=TouchManager.I.getLastOvers();
		for (var i=0,n=_lastOvers.length;i < n;i++){
			var ele=_lastOvers[i];
			ele.event("mousewheel",this._event.setTo("mousewheel",ele,this._target));
		}
	}

	// _stage.event(Event.MOUSE_WHEEL,_event.setTo(Event.MOUSE_WHEEL,_stage,_target));
	__proto.onMouseMove=function(ele){
		TouchManager.I.onMouseMove(ele,this._tTouchID);
	}

	__proto.onMouseDown=function(ele){
		if (Input.isInputting && Laya.stage.focus && Laya.stage.focus["focus"] && !Laya.stage.focus.contains(this._target)){
			var pre_input=Laya.stage.focus['_tf'] || Laya.stage.focus;
			var new_input=ele['_tf'] || ele;
			if ((new_input instanceof laya.display.Input )&& new_input.multiline==pre_input.multiline)
				pre_input['_focusOut']();
			else
			pre_input.focus=false;
		}
		TouchManager.I.onMouseDown(ele,this._tTouchID,this._isLeftMouse);
	}

	__proto.onMouseUp=function(ele){
		TouchManager.I.onMouseUp(ele,this._tTouchID,this._isLeftMouse);
	}

	__proto.check=function(sp,mouseX,mouseY,callBack){
		this._point.setTo(mouseX,mouseY);
		sp.fromParentPoint(this._point);
		mouseX=this._point.x;
		mouseY=this._point.y;
		var scrollRect=sp.scrollRect;
		if (scrollRect){
			this._rect.setTo(scrollRect.x,scrollRect.y,scrollRect.width,scrollRect.height);
			if (!this._rect.contains(mouseX,mouseY))return false;
		}
		if (!this.disableMouseEvent){
			if (sp.hitTestPrior && !sp.mouseThrough && !this.hitTest(sp,mouseX,mouseY)){
				return false;
			}
			for (var i=sp._childs.length-1;i >-1;i--){
				var child=sp._childs[i];
				if (!child.destroyed && child.mouseEnabled && child.visible){
					if (this.check(child,mouseX,mouseY,callBack))return true;
				}
			}
		};
		var isHit=(sp.hitTestPrior && !sp.mouseThrough && !this.disableMouseEvent)? true :this.hitTest(sp,mouseX,mouseY);
		if (isHit){
			this._target=sp;
			callBack.call(this,sp);
			}else if (callBack===this.onMouseUp && sp===this._stage){
			this._target=this._stage;
			callBack.call(this,this._target);
		}
		return isHit;
	}

	__proto.hitTest=function(sp,mouseX,mouseY){
		var isHit=false;
		if (sp.scrollRect){
			mouseX-=sp.scrollRect.x;
			mouseY-=sp.scrollRect.y;
		}
		if ((sp.hitArea instanceof laya.utils.HitArea )){
			return sp.hitArea.isHit(mouseX,mouseY);
		}
		if (sp.width > 0 && sp.height > 0 || sp.mouseThrough || sp.hitArea){
			if (!sp.mouseThrough){
				var hitRect=this._rect;
				if (sp.hitArea)hitRect=sp.hitArea;
				else hitRect.setTo(0,0,sp.width,sp.height);
				isHit=hitRect.contains(mouseX,mouseY);
				}else {
				isHit=sp.getGraphicBounds().contains(mouseX,mouseY);
			}
		}
		return isHit;
	}

	/**
	*执行事件处理。
	*/
	__proto.runEvent=function(){
		var len=this._eventList.length;
		if (!len)return;
		var _this=this;
		var i=0,j=0,n=0,touch;
		while (i < len){
			var evt=this._eventList[i];
			if (evt.type!=='mousemove')this._prePoint.x=this._prePoint.y=-1000000;
			switch (evt.type){
				case 'mousedown':
					this._touchIDs[0]=this._id++;
					if (!MouseManager._isTouchRespond){
						_this._isLeftMouse=evt.button===0;
						_this.initEvent(evt);
						_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
					}else
					MouseManager._isTouchRespond=false;
					break ;
				case 'mouseup':
					_this._isLeftMouse=evt.button===0;
					_this.initEvent(evt);
					_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
					break ;
				case 'mousemove':
					if ((Math.abs(this._prePoint.x-evt.clientX)+Math.abs(this._prePoint.y-evt.clientY))>=this.mouseMoveAccuracy){
						this._prePoint.x=evt.clientX;
						this._prePoint.y=evt.clientY;
						_this.initEvent(evt);
						_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
					}
					break ;
				case "touchstart":
					MouseManager._isTouchRespond=true;
					_this._isLeftMouse=true;
					var touches=evt.changedTouches;
					for (j=0,n=touches.length;j < n;j++){
						touch=touches[j];
						if (MouseManager.multiTouchEnabled || isNaN(this._curTouchID)){
							this._curTouchID=touch.identifier;
							if (this._id % 200===0)this._touchIDs={};
							this._touchIDs[touch.identifier]=this._id++;
							_this.initEvent(touch,evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseDown);
						}
					}
					break ;
				case "touchend":
				case "touchcancel":
					MouseManager._isTouchRespond=true;
					_this._isLeftMouse=true;
					var touchends=evt.changedTouches;
					for (j=0,n=touchends.length;j < n;j++){
						touch=touchends[j];
						if (MouseManager.multiTouchEnabled || touch.identifier==this._curTouchID){
							this._curTouchID=NaN;
							_this.initEvent(touch,evt);
							var isChecked=false;
							isChecked=_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseUp);
							if (!isChecked){
								_this.onMouseUp(null);
							}
						}
					}
					break ;
				case "touchmove":;
					var touchemoves=evt.changedTouches;
					for (j=0,n=touchemoves.length;j < n;j++){
						touch=touchemoves[j];
						if (MouseManager.multiTouchEnabled || touch.identifier==this._curTouchID){
							_this.initEvent(touch,evt);
							_this.check(_this._stage,_this.mouseX,_this.mouseY,_this.onMouseMove);
						}
					}
					break ;
				case "wheel":
				case "mousewheel":
				case "DOMMouseScroll":
					_this.checkMouseWheel(evt);
					break ;
				case "mouseout":
					TouchManager.I.stageMouseOut();
					break ;
				case "mouseover":
					_this._stage.event("mouseover",_this._event.setTo("mouseover",_this._stage,_this._stage));
					break ;
				}
			i++;
		}
		this._eventList.length=0;
	}

	MouseManager.enabled=true;
	MouseManager.multiTouchEnabled=true;
	MouseManager._isTouchRespond=false;
	MouseManager._isFirstTouch=true;
	__static(MouseManager,
	['instance',function(){return this.instance=new MouseManager();}
	]);
	return MouseManager;
})()


/**
*@private
*<code>ResourceManager</code> 是资源管理类。它用于资源的载入、获取、销毁。
*/
//class laya.resource.ResourceManager
var ResourceManager=(function(){
	function ResourceManager(name){
		/**唯一标识ID。*/
		this._id=0;
		/**名字。*/
		this._name=null;
		/**所管理资源。*/
		this._resources=null;
		/**所管理资源的累计内存,以字节为单位。*/
		this._memorySize=0;
		/**垃圾回收比例，范围是0到1。*/
		this._garbageCollectionRate=NaN;
		/**自动释放机制中内存是否溢出。*/
		this._isOverflow=false;
		/**是否启用自动释放机制。*/
		this.autoRelease=false;
		/**自动释放机制的内存触发上限,以字节为单位。*/
		this.autoReleaseMaxSize=0;
		this._id=++ResourceManager._uniqueIDCounter;
		this._name=name ? name :"Content Manager";
		ResourceManager._isResourceManagersSorted=false;
		this._memorySize=0;
		this._isOverflow=false;
		this.autoRelease=false;
		this.autoReleaseMaxSize=1024 *1024 *512;
		this._garbageCollectionRate=0.2;
		ResourceManager._resourceManagers.push(this);
		this._resources=[];
	}

	__class(ResourceManager,'laya.resource.ResourceManager');
	var __proto=ResourceManager.prototype;
	Laya.imps(__proto,{"laya.resource.IDispose":true})
	/**
	*获取指定索引的资源 Resource 对象。
	*@param 索引。
	*@return 资源 Resource 对象。
	*/
	__proto.getResourceByIndex=function(index){
		return this._resources[index];
	}

	/**
	*获取此管理器所管理的资源个数。
	*@return 资源个数。
	*/
	__proto.getResourcesLength=function(){
		return this._resources.length;
	}

	/**
	*添加指定资源。
	*@param resource 需要添加的资源 Resource 对象。
	*@return 是否添加成功。
	*/
	__proto.addResource=function(resource){
		if (resource.resourceManager)
			resource.resourceManager.removeResource(resource);
		var index=this._resources.indexOf(resource);
		if (index===-1){
			resource._resourceManager=this;
			this._resources.push(resource);
			this.addSize(resource.memorySize);
			return true;
		}
		return false;
	}

	/**
	*移除指定资源。
	*@param resource 需要移除的资源 Resource 对象
	*@return 是否移除成功。
	*/
	__proto.removeResource=function(resource){
		var index=this._resources.indexOf(resource);
		if (index!==-1){
			this._resources.splice(index,1);
			resource._resourceManager=null;
			this._memorySize-=resource.memorySize;
			return true;
		}
		return false;
	}

	/**
	*卸载此资源管理器载入的资源。
	*/
	__proto.unload=function(){
		var tempResources=this._resources.slice(0,this._resources.length);
		for (var i=0;i < tempResources.length;i++){
			var resource=tempResources[i];
			resource.destroy();
		}
		tempResources.length=0;
	}

	/**释放资源。*/
	__proto.dispose=function(){
		if (this===ResourceManager._systemResourceManager)
			throw new Error("systemResourceManager不能被释放！");
		ResourceManager._resourceManagers.splice(ResourceManager._resourceManagers.indexOf(this),1);
		ResourceManager._isResourceManagersSorted=false;
		var tempResources=this._resources.slice(0,this._resources.length);
		for (var i=0;i < tempResources.length;i++){
			var resource=tempResources[i];
			resource.resourceManager.removeResource(resource);
			resource.destroy();
		}
		tempResources.length=0;
	}

	/**
	*增加内存。
	*@param add 需要增加的内存大小。
	*/
	__proto.addSize=function(add){
		if (add){
			if (this.autoRelease && add > 0)
				((this._memorySize+add)> this.autoReleaseMaxSize)&& (this.garbageCollection((1-this._garbageCollectionRate)*this.autoReleaseMaxSize));
			this._memorySize+=add;
		}
	}

	/**
	*垃圾回收。
	*@param reserveSize 保留尺寸。
	*/
	__proto.garbageCollection=function(reserveSize){
		var all=this._resources;
		all=all.slice();
		all.sort(function(a,b){
			if (!a || !b)
				throw new Error("a或b不能为空！");
			if (a.released && b.released)
				return 0;
			else if (a.released)
			return 1;
			else if (b.released)
			return-1;
			return a._lastUseFrameCount-b._lastUseFrameCount;
		});
		var currentFrameCount=Stat.loopCount;
		for (var i=0,n=all.length;i < n;i++){
			var resou=all[i];
			if (currentFrameCount-resou._lastUseFrameCount > 1){
				resou.releaseResource();
				}else {
				if (this._memorySize >=reserveSize)
					this._isOverflow=true;
				return;
			}
			if (this._memorySize < reserveSize){
				this._isOverflow=false;
				return;
			}
		}
	}

	/**
	*此管理器所管理资源的累计内存，以字节为单位。
	*/
	__getset(0,__proto,'memorySize',function(){
		return this._memorySize;
	});

	/**
	*名字。
	*/
	__getset(0,__proto,'name',function(){
		return this._name;
		},function(value){
		if ((value || value!=="")&& this._name!==value){
			this._name=value;
			ResourceManager._isResourceManagersSorted=false;
		}
	});

	/**
	*唯一标识 ID 。
	*/
	__getset(0,__proto,'id',function(){
		return this._id;
	});

	/**
	*系统资源管理器。
	*/
	__getset(1,ResourceManager,'systemResourceManager',function(){
		return ResourceManager._systemResourceManager;
	});

	ResourceManager.__init__=function(){
		ResourceManager.currentResourceManager=ResourceManager.systemResourceManager;
	}

	ResourceManager.getLoadedResourceManagerByIndex=function(index){
		return ResourceManager._resourceManagers[index];
	}

	ResourceManager.getLoadedResourceManagersCount=function(){
		return ResourceManager._resourceManagers.length;
	}

	ResourceManager.recreateContentManagers=function(force){
		(force===void 0)&& (force=false);
		var temp=ResourceManager.currentResourceManager;
		for (var i=0;i < ResourceManager._resourceManagers.length;i++){
			ResourceManager.currentResourceManager=ResourceManager._resourceManagers[i];
			for (var j=0;j < ResourceManager.currentResourceManager._resources.length;j++){
				ResourceManager.currentResourceManager._resources[j].releaseResource(force);
				ResourceManager.currentResourceManager._resources[j].activeResource(force);
			}
		}
		ResourceManager.currentResourceManager=temp;
	}

	ResourceManager.releaseContentManagers=function(force){
		(force===void 0)&& (force=false);
		var temp=ResourceManager.currentResourceManager;
		for (var i=0;i < ResourceManager._resourceManagers.length;i++){
			ResourceManager.currentResourceManager=ResourceManager._resourceManagers[i];
			for (var j=0;j < ResourceManager.currentResourceManager._resources.length;j++){
				var resource=ResourceManager.currentResourceManager._resources[j];
				(!resource.released)&& (resource.releaseResource(force));
			}
		}
		ResourceManager.currentResourceManager=temp;
	}

	ResourceManager._uniqueIDCounter=0;
	ResourceManager._isResourceManagersSorted=false;
	ResourceManager._resourceManagers=[];
	__static(ResourceManager,
	['_systemResourceManager',function(){return this._systemResourceManager=new ResourceManager("System Resource Manager");},'currentResourceManager',function(){return this.currentResourceManager=ResourceManager._systemResourceManager;}
	]);
	return ResourceManager;
})()


/**
*<code>SoundManager</code> 是一个声音管理类。提供了对背景音乐、音效的播放控制方法。
*引擎默认有两套声音方案：WebAudio和H5Audio
*播放音效，优先使用WebAudio播放声音，如果WebAudio不可用，则用H5Audio播放，H5Audio在部分机器上有兼容问题（比如不能混音，播放有延迟等）。
*播放背景音乐，则使用H5Audio播放（使用WebAudio会增加特别大的内存，并且要等加载完毕后才能播放，有延迟）
*建议背景音乐用mp3类型，音效用wav或者mp3类型（如果打包为app，音效只能用wav格式）。
*详细教程及声音格式请参考：http://ldc.layabox.com/doc/?nav=ch-as-1-7-0
*/
//class laya.media.SoundManager
var SoundManager=(function(){
	function SoundManager(){}
	__class(SoundManager,'laya.media.SoundManager');
	/**
	*背景音乐（不包括音效）是否静音。
	*/
	__getset(1,SoundManager,'musicMuted',function(){
		return SoundManager._musicMuted;
		},function(value){
		if (value==SoundManager._musicMuted)return;
		if (value){
			if (SoundManager._tMusic){
				if (SoundManager._musicChannel&&!SoundManager._musicChannel.isStopped){
					SoundManager._musicChannel.pause();
					}else{
					SoundManager._musicChannel=null;
				}
				}else{
				SoundManager._musicChannel=null;
			}
			SoundManager._musicMuted=value;
			}else {
			SoundManager._musicMuted=value;
			if (SoundManager._tMusic){
				if (SoundManager._musicChannel){
					SoundManager._musicChannel.resume();
				}
			}
		}
	});

	__getset(1,SoundManager,'useAudioMusic',function(){
		return SoundManager._useAudioMusic;
		},function(value){
		SoundManager._useAudioMusic=value;
		if (value){
			SoundManager._musicClass=AudioSound;
			}else{
			SoundManager._musicClass=null;
		}
	});

	/**
	*所有音效（不包括背景音乐）是否静音。
	*/
	__getset(1,SoundManager,'soundMuted',function(){
		return SoundManager._soundMuted;
		},function(value){
		SoundManager._soundMuted=value;
	});

	/**
	*背景音乐和所有音效是否静音。
	*/
	__getset(1,SoundManager,'muted',function(){
		return SoundManager._muted;
		},function(value){
		if (value==SoundManager._muted)return;
		if (value){
			SoundManager.stopAllSound();
		}
		SoundManager.musicMuted=value;
		SoundManager._muted=value;
	});

	/**
	*失去焦点后是否自动停止背景音乐。
	*@param v Boolean 失去焦点后是否自动停止背景音乐。
	*
	*/
	/**
	*失去焦点后是否自动停止背景音乐。
	*/
	__getset(1,SoundManager,'autoStopMusic',function(){
		return SoundManager._autoStopMusic;
		},function(v){
		Laya.stage.off("blur",null,SoundManager._stageOnBlur);
		Laya.stage.off("focus",null,SoundManager._stageOnFocus);
		Laya.stage.off("visibilitychange",null,SoundManager._visibilityChange);
		SoundManager._autoStopMusic=v;
		if (v){
			Laya.stage.on("blur",null,SoundManager._stageOnBlur);
			Laya.stage.on("focus",null,SoundManager._stageOnFocus);
			Laya.stage.on("visibilitychange",null,SoundManager._visibilityChange);
		}
	});

	SoundManager.addChannel=function(channel){
		if (SoundManager._channels.indexOf(channel)>=0)return;
		SoundManager._channels.push(channel);
	}

	SoundManager.removeChannel=function(channel){
		var i=0;
		for (i=SoundManager._channels.length-1;i >=0;i--){
			if (SoundManager._channels[i]==channel){
				SoundManager._channels.splice(i,1);
			}
		}
	}

	SoundManager.disposeSoundIfNotUsed=function(url){
		var i=0;
		for (i=SoundManager._channels.length-1;i >=0;i--){
			if (SoundManager._channels[i].url==url){
				return;
			}
		}
		SoundManager.destroySound(url);
	}

	SoundManager._visibilityChange=function(){
		if (Laya.stage.isVisibility){
			SoundManager._stageOnFocus();
			}else {
			SoundManager._stageOnBlur();
		}
	}

	SoundManager._stageOnBlur=function(){
		SoundManager._isActive=false;
		if (SoundManager._musicChannel){
			if (!SoundManager._musicChannel.isStopped){
				SoundManager._blurPaused=true;
				SoundManager._musicChannel.pause();
			}
		}
		SoundManager.stopAllSound();
		Laya.stage.once("mousedown",null,SoundManager._stageOnFocus);
	}

	SoundManager._recoverWebAudio=function(){
		if(WebAudioSound.ctx&&WebAudioSound.ctx.state!="running"&&WebAudioSound.ctx.resume)
			WebAudioSound.ctx.resume();
	}

	SoundManager._stageOnFocus=function(){
		SoundManager._isActive=true;
		SoundManager._recoverWebAudio();
		Laya.stage.off("mousedown",null,SoundManager._stageOnFocus);
		if (SoundManager._blurPaused){
			if (SoundManager._musicChannel && SoundManager._musicChannel.isStopped){
				SoundManager._blurPaused=false;
				SoundManager._musicChannel.resume();
			}
		}
	}

	SoundManager.playSound=function(url,loops,complete,soundClass,startTime){
		(loops===void 0)&& (loops=1);
		(startTime===void 0)&& (startTime=0);
		if (!SoundManager._isActive || !url)return null;
		if (SoundManager._muted)return null;
		SoundManager._recoverWebAudio();
		url=URL.formatURL(url);
		if (url==SoundManager._tMusic){
			if (SoundManager._musicMuted)return null;
			}else {
			if (Render.isConchApp){
				var ext=Utils.getFileExtension(url);
				if (ext !="wav" && ext !="ogg"){
					alert("The sound only supports wav or ogg format,for optimal performance reason,please refer to the official website document.");
					return null;
				}
			}
			if (SoundManager._soundMuted)return null;
		};
		var tSound;
		if (!Browser.onMiniGame){
			tSound=Laya.loader.getRes(url);
		}
		if (!soundClass)soundClass=SoundManager._soundClass;
		if (!tSound){
			tSound=new soundClass();
			tSound.load(url);
			if (!Browser.onMiniGame){
				Loader.cacheRes(url,tSound);
			}
		};
		var channel;
		channel=tSound.play(startTime,loops);
		if (!channel)return null;
		channel.url=url;
		channel.volume=(url==SoundManager._tMusic)? SoundManager.musicVolume :SoundManager.soundVolume;
		channel.completeHandler=complete;
		return channel;
	}

	SoundManager.destroySound=function(url){
		var tSound=Laya.loader.getRes(url);
		if (tSound){
			Loader.clearRes(url);
			tSound.dispose();
		}
	}

	SoundManager.playMusic=function(url,loops,complete,startTime){
		(loops===void 0)&& (loops=0);
		(startTime===void 0)&& (startTime=0);
		url=URL.formatURL(url);
		SoundManager._tMusic=url;
		if (SoundManager._musicChannel)SoundManager._musicChannel.stop();
		return SoundManager._musicChannel=SoundManager.playSound(url,loops,complete,SoundManager._musicClass,startTime);
	}

	SoundManager.stopSound=function(url){
		url=URL.formatURL(url);
		var i=0;
		var channel;
		for (i=SoundManager._channels.length-1;i >=0;i--){
			channel=SoundManager._channels[i];
			if (channel.url==url){
				channel.stop();
			}
		}
	}

	SoundManager.stopAll=function(){
		SoundManager._tMusic=null;
		var i=0;
		var channel;
		for (i=SoundManager._channels.length-1;i >=0;i--){
			channel=SoundManager._channels[i];
			channel.stop();
		}
	}

	SoundManager.stopAllSound=function(){
		var i=0;
		var channel;
		for (i=SoundManager._channels.length-1;i >=0;i--){
			channel=SoundManager._channels[i];
			if (channel.url !=SoundManager._tMusic){
				channel.stop();
			}
		}
	}

	SoundManager.stopMusic=function(){
		if (SoundManager._musicChannel)SoundManager._musicChannel.stop();
		SoundManager._tMusic=null;
	}

	SoundManager.setSoundVolume=function(volume,url){
		if (url){
			url=URL.formatURL(url);
			SoundManager._setVolume(url,volume);
			}else {
			SoundManager.soundVolume=volume;
			var i=0;
			var channel;
			for (i=SoundManager._channels.length-1;i >=0;i--){
				channel=SoundManager._channels[i];
				if (channel.url !=SoundManager._tMusic){
					channel.volume=volume;
				}
			}
		}
	}

	SoundManager.setMusicVolume=function(volume){
		SoundManager.musicVolume=volume;
		SoundManager._setVolume(SoundManager._tMusic,volume);
	}

	SoundManager._setVolume=function(url,volume){
		url=URL.formatURL(url);
		var i=0;
		var channel;
		for (i=SoundManager._channels.length-1;i >=0;i--){
			channel=SoundManager._channels[i];
			if (channel.url==url){
				channel.volume=volume;
			}
		}
	}

	SoundManager.musicVolume=1;
	SoundManager.soundVolume=1;
	SoundManager.playbackRate=1;
	SoundManager._useAudioMusic=true;
	SoundManager._muted=false;
	SoundManager._soundMuted=false;
	SoundManager._musicMuted=false;
	SoundManager._tMusic=null;
	SoundManager._musicChannel=null;
	SoundManager._channels=[];
	SoundManager._autoStopMusic=false;
	SoundManager._blurPaused=false;
	SoundManager._isActive=true;
	SoundManager._soundClass=null;
	SoundManager._musicClass=null;
	SoundManager.autoReleaseSound=true;
	return SoundManager;
})()


//class fairygui.ScrollPane
var ScrollPane=(function(){
	function ScrollPane(owner){
		this._owner=null;
		this._container=null;
		this._maskContainer=null;
		this._alignContainer=null;
		this._scrollType=0;
		this._scrollStep=0;
		this._mouseWheelStep=0;
		this._decelerationRate=NaN;
		this._scrollBarMargin=null;
		this._bouncebackEffect=false;
		this._touchEffect=false;
		this._scrollBarDisplayAuto=false;
		this._vScrollNone=false;
		this._hScrollNone=false;
		this._needRefresh=false;
		this._refreshBarAxis=null;
		this._displayOnLeft=false;
		this._snapToItem=false;
		this._displayInDemand=false;
		this._mouseWheelEnabled=false;
		this._pageMode=false;
		this._inertiaDisabled=false;
		this._xPos=NaN;
		this._yPos=NaN;
		this._viewSize=null;
		this._contentSize=null;
		this._overlapSize=null;
		this._pageSize=null;
		this._containerPos=null;
		this._beginTouchPos=null;
		this._lastTouchPos=null;
		this._lastTouchGlobalPos=null;
		this._velocity=null;
		this._velocityScale=NaN;
		this._lastMoveTime=NaN;
		this._isHoldAreaDone=false;
		this._aniFlag=0;
		this._scrollBarVisible=false;
		this._loop=0;
		this._headerLockedSize=0;
		this._footerLockedSize=0;
		this._refreshEventDispatching=false;
		this._tweening=0;
		this._tweenTime=null;
		this._tweenDuration=null;
		this._tweenStart=null;
		this._tweenChange=null;
		this._pageController=null;
		this._hzScrollBar=null;
		this._vtScrollBar=null;
		this._header=null;
		this._footer=null;
		this.isDragged=false;
		;
		this._owner=owner;
		this._maskContainer=new Sprite();
		this._owner.displayObject.addChild(this._maskContainer);
		this._container=this._owner._container;
		this._container.pos(0,0);
		this._maskContainer.addChild(this._container);
		this._scrollBarVisible=true;
		this._mouseWheelEnabled=true;
		this._xPos=0;
		this._yPos=0;
		this._aniFlag=0;
		this._footerLockedSize=0;
		this._headerLockedSize=0;
		this._scrollBarMargin=new Margin();
		this._viewSize=new Point();
		this._contentSize=new Point();
		this._pageSize=new Point(1,1);
		this._overlapSize=new Point();
		this._tweenTime=new Point();
		this._tweenStart=new Point();
		this._tweenDuration=new Point();
		this._tweenChange=new Point();
		this._velocity=new Point();
		this._containerPos=new Point();
		this._beginTouchPos=new Point();
		this._lastTouchPos=new Point();
		this._lastTouchGlobalPos=new Point();
		this._scrollStep=UIConfig$1.defaultScrollStep;
		this._mouseWheelStep=this._scrollStep*2;
		this._decelerationRate=UIConfig$1.defaultScrollDecelerationRate;
		this._owner.on("mousedown",this,this.__mouseDown);
		this._owner.on("mousewheel",this,this.__mouseWheel);
	}

	__class(ScrollPane,'fairygui.ScrollPane');
	var __proto=ScrollPane.prototype;
	__proto.setup=function(buffer){
		this._scrollType=buffer.readByte();
		var scrollBarDisplay=buffer.readByte();
		var flags=buffer.getInt32();
		if (buffer.readBool()){
			this._scrollBarMargin.top=buffer.getInt32();
			this._scrollBarMargin.bottom=buffer.getInt32();
			this._scrollBarMargin.left=buffer.getInt32();
			this._scrollBarMargin.right=buffer.getInt32();
		};
		var vtScrollBarRes=buffer.readS();
		var hzScrollBarRes=buffer.readS();
		var headerRes=buffer.readS();
		var footerRes=buffer.readS();
		this._displayOnLeft=(flags & 1)!=0;
		this._snapToItem=(flags & 2)!=0;
		this._displayInDemand=(flags & 4)!=0;
		this._pageMode=(flags & 8)!=0;
		if(flags & 16)
			this._touchEffect=true;
		else if(flags & 32)
		this._touchEffect=false;
		else
		this._touchEffect=UIConfig$1.defaultScrollTouchEffect;
		if(flags & 64)
			this._bouncebackEffect=true;
		else if(flags & 128)
		this._bouncebackEffect=false;
		else
		this._bouncebackEffect=UIConfig$1.defaultScrollBounceEffect;
		this._inertiaDisabled=(flags & 256)!=0;
		if((flags & 512)==0)
			this._maskContainer.scrollRect=new Rectangle();
		if(scrollBarDisplay==0)
			scrollBarDisplay=UIConfig$1.defaultScrollBarDisplay;
		if(scrollBarDisplay !=3){
			if(this._scrollType==2 || this._scrollType==1){
				var res=vtScrollBarRes ? vtScrollBarRes :UIConfig$1.verticalScrollBar;
				if(res){
					this._vtScrollBar=(UIPackage.createObjectFromURL(res));
					if(!this._vtScrollBar)
						throw "cannot create scrollbar from "+res;
					this._vtScrollBar.setScrollPane(this,true);
					this._owner.displayObject.addChild(this._vtScrollBar.displayObject);
				}
			}
			if(this._scrollType==2 || this._scrollType==0){
				res=hzScrollBarRes ? hzScrollBarRes :UIConfig$1.horizontalScrollBar;
				if(res){
					this._hzScrollBar=(UIPackage.createObjectFromURL(res));
					if(!this._hzScrollBar)
						throw "cannot create scrollbar from "+res;
					this._hzScrollBar.setScrollPane(this,false);
					this._owner.displayObject.addChild(this._hzScrollBar.displayObject);
				}
			}
			this._scrollBarDisplayAuto=scrollBarDisplay==2;
			if(this._scrollBarDisplayAuto){
				this._scrollBarVisible=false;
				if(this._vtScrollBar)
					this._vtScrollBar.displayObject.visible=false;
				if(this._hzScrollBar)
					this._hzScrollBar.displayObject.visible=false;
			}
		}
		else
		this._mouseWheelEnabled=false;
		if (headerRes){
			this._header=UIPackage.createObjectFromURL(headerRes);
			if (this._header==null)
				throw new Error("FairyGUI: cannot create scrollPane header from "+headerRes);
		}
		if (footerRes){
			this._footer=UIPackage.createObjectFromURL(footerRes);
			if (this._footer==null)
				throw new Error("FairyGUI: cannot create scrollPane footer from "+footerRes);
		}
		if (this._header !=null || this._footer !=null)
			this._refreshBarAxis=(this._scrollType==2 || this._scrollType==1)? "y" :"x";
		this.setSize(this.owner.width,this.owner.height);
	}

	__proto.dispose=function(){
		if (this._tweening !=0)
			Laya.timer.clear(this,this.tweenUpdate);
		this._pageController=null;
		if (this._hzScrollBar !=null)
			this._hzScrollBar.dispose();
		if (this._vtScrollBar !=null)
			this._vtScrollBar.dispose();
		if (this._header !=null)
			this._header.dispose();
		if (this._footer !=null)
			this._footer.dispose();
	}

	__proto.setPercX=function(value,ani){
		(ani===void 0)&& (ani=false);
		this._owner.ensureBoundsCorrect();
		this.setPosX(this._overlapSize.x *ToolSet.clamp01(value),ani);
	}

	__proto.setPercY=function(value,ani){
		(ani===void 0)&& (ani=false);
		this._owner.ensureBoundsCorrect();
		this.setPosY(this._overlapSize.y *ToolSet.clamp01(value),ani);
	}

	__proto.setPosX=function(value,ani){
		(ani===void 0)&& (ani=false);
		this._owner.ensureBoundsCorrect();
		if (this._loop==1)
			value=this.loopCheckingNewPos(value,"x");
		value=ToolSet.clamp(value,0,this._overlapSize.x);
		if (value !=this._xPos){
			this._xPos=value;
			this.posChanged(ani);
		}
	}

	__proto.setPosY=function(value,ani){
		(ani===void 0)&& (ani=false);
		this._owner.ensureBoundsCorrect();
		if (this._loop==1)
			value=this.loopCheckingNewPos(value,"y");
		value=ToolSet.clamp(value,0,this._overlapSize.y);
		if (value !=this._yPos){
			this._yPos=value;
			this.posChanged(ani);
		}
	}

	__proto.setCurrentPageX=function(value,ani){
		if (this._pageMode && this._overlapSize.x>0)
			this.setPosX(value *this._pageSize.x,ani);
	}

	__proto.setCurrentPageY=function(value,ani){
		if (this._pageMode && this._overlapSize.y>0)
			this.setPosY(value *this._pageSize.y,ani);
	}

	__proto.scrollTop=function(ani){
		(ani===void 0)&& (ani=false);
		this.setPercY(0,ani);
	}

	__proto.scrollBottom=function(ani){
		(ani===void 0)&& (ani=false);
		this.setPercY(1,ani);
	}

	__proto.scrollUp=function(ratio,ani){
		(ratio===void 0)&& (ratio=1);
		(ani===void 0)&& (ani=false);
		if (this._pageMode)
			this.setPosY(this._yPos-this._pageSize.y *ratio,ani);
		else
		this.setPosY(this._yPos-this._scrollStep *ratio,ani);;
	}

	__proto.scrollDown=function(ratio,ani){
		(ratio===void 0)&& (ratio=1);
		(ani===void 0)&& (ani=false);
		if (this._pageMode)
			this.setPosY(this._yPos+this._pageSize.y *ratio,ani);
		else
		this.setPosY(this._yPos+this._scrollStep *ratio,ani);
	}

	__proto.scrollLeft=function(ratio,ani){
		(ratio===void 0)&& (ratio=1);
		(ani===void 0)&& (ani=false);
		if (this._pageMode)
			this.setPosX(this._xPos-this._pageSize.x *ratio,ani);
		else
		this.setPosX(this._xPos-this._scrollStep *ratio,ani);
	}

	__proto.scrollRight=function(ratio,ani){
		(ratio===void 0)&& (ratio=1);
		(ani===void 0)&& (ani=false);
		if (this._pageMode)
			this.setPosX(this._xPos+this._pageSize.x *ratio,ani);
		else
		this.setPosX(this._xPos+this._scrollStep *ratio,ani);
	}

	__proto.scrollToView=function(target,ani,setFirst){
		(ani===void 0)&& (ani=false);
		(setFirst===void 0)&& (setFirst=false);
		this._owner.ensureBoundsCorrect();
		if(this._needRefresh)
			this.refresh();
		var rect;
		if((target instanceof fairygui.GObject )){
			if(target.parent !=this._owner){
				target.parent.localToGlobalRect(target.x,target.y,
				target.width,target.height,fairygui.ScrollPane.sHelperRect);
				rect=this._owner.globalToLocalRect(fairygui.ScrollPane.sHelperRect.x,fairygui.ScrollPane.sHelperRect.y,
				fairygui.ScrollPane.sHelperRect.width,fairygui.ScrollPane.sHelperRect.height,fairygui.ScrollPane.sHelperRect);
			}
			else {
				rect=fairygui.ScrollPane.sHelperRect;
				rect.setTo(target.x,target.y,target.width,target.height);
			}
		}
		else
		rect=(target);
		if(this._overlapSize.y>0){
			var bottom=this._yPos+this._viewSize.y;
			if(setFirst || rect.y<=this._yPos || rect.height>=this._viewSize.y){
				if(this._pageMode)
					this.setPosY(Math.floor(rect.y/this._pageSize.y)*this._pageSize.y,ani);
				else
				this.setPosY(rect.y,ani);
			}
			else if(rect.y+rect.height>bottom){
				if(this._pageMode)
					this.setPosY(Math.floor(rect.y/this._pageSize.y)*this._pageSize.y,ani);
				else if (rect.height <=this._viewSize.y/2)
				this.setPosY(rect.y+rect.height*2-this._viewSize.y,ani);
				else
				this.setPosY(rect.y+rect.height-this._viewSize.y,ani);
			}
		}
		if(this._overlapSize.x>0){
			var right=this._xPos+this._viewSize.x;
			if(setFirst || rect.x<=this._xPos || rect.width>=this._viewSize.x){
				if(this._pageMode)
					this.setPosX(Math.floor(rect.x/this._pageSize.x)*this._pageSize.x,ani);
				else
				this.setPosX(rect.x,ani);
			}
			else if(rect.x+rect.width>right){
				if(this._pageMode)
					this.setPosX(Math.floor(rect.x/this._pageSize.x)*this._pageSize.x,ani);
				else if (rect.width <=this._viewSize.x/2)
				this.setPosX(rect.x+rect.width*2-this._viewSize.x,ani);
				else
				this.setPosX(rect.x+rect.width-this._viewSize.x,ani);
			}
		}
		if(!ani && this._needRefresh)
			this.refresh();
	}

	__proto.isChildInView=function(obj){
		if(this._overlapSize.y>0){
			var dist=obj.y+this._container.y;
			if(dist<-obj.height || dist>this._viewSize.y)
				return false;
		}
		if(this._overlapSize.x>0){
			dist=obj.x+this._container.x;
			if(dist<-obj.width || dist>this._viewSize.x)
				return false;
		}
		return true;
	}

	__proto.cancelDragging=function(){
		this._owner.displayObject.stage.off("mousemove",this,this.__mouseMove);
		this._owner.displayObject.stage.off("mouseup",this,this.__mouseUp);
		this._owner.displayObject.stage.off("click",this,this.__click);
		if (ScrollPane.draggingPane==this)
			ScrollPane.draggingPane=null;
		ScrollPane._gestureFlag=0;
		this.isDragged=false;
		this._maskContainer.mouseEnabled=true;
	}

	__proto.lockHeader=function(size){
		if (this._headerLockedSize==size)
			return;
		this._headerLockedSize=size;
		if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] >=0){
			this._tweenStart.setTo(this._container.x,this._container.y);
			this._tweenChange.setTo(0,0);
			this._tweenChange[this._refreshBarAxis]=this._headerLockedSize-this._tweenStart[this._refreshBarAxis];
			this._tweenDuration.setTo(0.3,0.3);
			this._tweenTime.setTo(0,0);
			this._tweening=2;
			Laya.timer.frameLoop(1,this,this.tweenUpdate);
		}
	}

	__proto.lockFooter=function(size){
		if (this._footerLockedSize==size)
			return;
		this._footerLockedSize=size;
		if (!this._refreshEventDispatching && this._container[this._refreshBarAxis] <=-this._overlapSize[this._refreshBarAxis]){
			this._tweenStart.setTo(this._container.x,this._container.y);
			this._tweenChange.setTo(0,0);
			var max=this._overlapSize[this._refreshBarAxis];
			if (max==0)
				max=Math.max(this._contentSize[this._refreshBarAxis]+this._footerLockedSize-this._viewSize[this._refreshBarAxis],0);
			else
			max+=this._footerLockedSize;
			this._tweenChange[this._refreshBarAxis]=-max-this._tweenStart[this._refreshBarAxis];
			this._tweenDuration.setTo(0.3,0.3);
			this._tweenTime.setTo(0,0);
			this._tweening=2;
			Laya.timer.frameLoop(1,this,this.tweenUpdate);
		}
	}

	__proto.onOwnerSizeChanged=function(){
		this.setSize(this._owner.width,this._owner.height);
		this.posChanged(false);
	}

	__proto.handleControllerChanged=function(c){
		if (this._pageController==c){
			if (this._scrollType==0)
				this.setCurrentPageX(c.selectedIndex,true);
			else
			this.setCurrentPageY(c.selectedIndex,true);
		}
	}

	__proto.updatePageController=function(){
		if (this._pageController !=null && !this._pageController.changing){
			var index=0;
			if (this._scrollType==0)
				index=this.currentPageX;
			else
			index=this.currentPageY;
			if (index < this._pageController.pageCount){
				var c=this._pageController;
				this._pageController=null;
				c.selectedIndex=index;
				this._pageController=c;
			}
		}
	}

	__proto.adjustMaskContainer=function(){
		var mx=NaN,my=NaN;
		if (this._displayOnLeft && this._vtScrollBar !=null)
			mx=Math.floor(this._owner.margin.left+this._vtScrollBar.width);
		else
		mx=Math.floor(this._owner.margin.left);
		my=Math.floor(this._owner.margin.top);
		this._maskContainer.pos(mx,my);
		if(this._owner._alignOffset.x!=0 || this._owner._alignOffset.y!=0){
			if(this._alignContainer==null){
				this._alignContainer=new Sprite();
				this._maskContainer.addChild(this._alignContainer);
				this._alignContainer.addChild(this._container);
			}
			this._alignContainer.pos(this._owner._alignOffset.x,this._owner._alignOffset.y);
		}
		else if(this._alignContainer){
			this._alignContainer.pos(0,0);
		}
	}

	__proto.setSize=function(aWidth,aHeight){
		this.adjustMaskContainer();
		if (this._hzScrollBar){
			this._hzScrollBar.y=aHeight-this._hzScrollBar.height;
			if(this._vtScrollBar && !this._vScrollNone){
				this._hzScrollBar.width=aWidth-this._vtScrollBar.width-this._scrollBarMargin.left-this._scrollBarMargin.right;
				if(this._displayOnLeft)
					this._hzScrollBar.x=this._scrollBarMargin.left+this._vtScrollBar.width;
				else
				this._hzScrollBar.x=this._scrollBarMargin.left;
			}
			else {
				this._hzScrollBar.width=aWidth-this._scrollBarMargin.left-this._scrollBarMargin.right;
				this._hzScrollBar.x=this._scrollBarMargin.left;
			}
		}
		if (this._vtScrollBar){
			if (!this._displayOnLeft)
				this._vtScrollBar.x=aWidth-this._vtScrollBar.width;
			if(this._hzScrollBar)
				this._vtScrollBar.height=aHeight-this._hzScrollBar.height-this._scrollBarMargin.top-this._scrollBarMargin.bottom;
			else
			this._vtScrollBar.height=aHeight-this._scrollBarMargin.top-this._scrollBarMargin.bottom;
			this._vtScrollBar.y=this._scrollBarMargin.top;
		}
		this._viewSize.x=aWidth;
		this._viewSize.y=aHeight;
		if(this._hzScrollBar && !this._hScrollNone)
			this._viewSize.y-=this._hzScrollBar.height;
		if(this._vtScrollBar && !this._vScrollNone)
			this._viewSize.x-=this._vtScrollBar.width;
		this._viewSize.x-=(this._owner.margin.left+this._owner.margin.right);
		this._viewSize.y-=(this._owner.margin.top+this._owner.margin.bottom);
		this._viewSize.x=Math.max(1,this._viewSize.x);
		this._viewSize.y=Math.max(1,this._viewSize.y);
		this._pageSize.x=this._viewSize.x;
		this._pageSize.y=this._viewSize.y;
		this.handleSizeChanged();
	}

	__proto.setContentSize=function(aWidth,aHeight){
		if(this._contentSize.x==aWidth && this._contentSize.y==aHeight)
			return;
		this._contentSize.x=aWidth;
		this._contentSize.y=aHeight;
		this.handleSizeChanged();
	}

	__proto.changeContentSizeOnScrolling=function(deltaWidth,deltaHeight,deltaPosX,deltaPosY){
		var isRightmost=this._xPos==this._overlapSize.x;
		var isBottom=this._yPos==this._overlapSize.y;
		this._contentSize.x+=deltaWidth;
		this._contentSize.y+=deltaHeight;
		this.handleSizeChanged();
		if (this._tweening==1){
			if (deltaWidth !=0 && isRightmost && this._tweenChange.x < 0){
				this._xPos=this._overlapSize.x;
				this._tweenChange.x=-this._xPos-this._tweenStart.x;
			}
			if (deltaHeight !=0 && isBottom && this._tweenChange.y < 0){
				this._yPos=this._overlapSize.y;
				this._tweenChange.y=-this._yPos-this._tweenStart.y;
			}
		}
		else if (this._tweening==2){
			if (deltaPosX !=0){
				this._container.x-=deltaPosX;
				this._tweenStart.x-=deltaPosX;
				this._xPos=-this._container.x;
			}
			if (deltaPosY !=0){
				this._container.y-=deltaPosY;
				this._tweenStart.y-=deltaPosY;
				this._yPos=-this._container.y;
			}
		}
		else if (this.isDragged){
			if (deltaPosX !=0){
				this._container.x-=deltaPosX;
				this._containerPos.x-=deltaPosX;
				this._xPos=-this._container.x;
			}
			if (deltaPosY !=0){
				this._container.y-=deltaPosY;
				this._containerPos.y-=deltaPosY;
				this._yPos=-this._container.y;
			}
		}
		else{
			if (deltaWidth !=0 && isRightmost){
				this._xPos=this._overlapSize.x;
				this._container.x=-this._xPos;
			}
			if (deltaHeight !=0 && isBottom){
				this._yPos=this._overlapSize.y;
				this._container.y=-this._yPos;
			}
		}
		if (this._pageMode)
			this.updatePageController();
	}

	__proto.handleSizeChanged=function(onScrolling){
		(onScrolling===void 0)&& (onScrolling=false);
		if(this._displayInDemand){
			if(this._vtScrollBar){
				if(this._contentSize.y<=this._viewSize.y){
					if(!this._vScrollNone){
						this._vScrollNone=true;
						this._viewSize.x+=this._vtScrollBar.width;
					}
				}
				else{
					if(this._vScrollNone){
						this._vScrollNone=false;
						this._viewSize.x-=this._vtScrollBar.width;
					}
				}
			}
			if(this._hzScrollBar){
				if(this._contentSize.x<=this._viewSize.x){
					if(!this._hScrollNone){
						this._hScrollNone=true;
						this._viewSize.y+=this._hzScrollBar.height;
					}
				}
				else{
					if(this._hScrollNone){
						this._hScrollNone=false;
						this._viewSize.y-=this._hzScrollBar.height;
					}
				}
			}
		}
		if(this._vtScrollBar){
			if(this._viewSize.y<this._vtScrollBar.minSize)
				this._vtScrollBar.displayObject.visible=false;
			else{
				this._vtScrollBar.displayObject.visible=this._scrollBarVisible && !this._vScrollNone;
				if(this._contentSize.y==0)
					this._vtScrollBar.displayPerc=0;
				else
				this._vtScrollBar.displayPerc=Math.min(1,this._viewSize.y/this._contentSize.y);
			}
		}
		if(this._hzScrollBar){
			if(this._viewSize.x<this._hzScrollBar.minSize)
				this._hzScrollBar.displayObject.visible=false;
			else{
				this._hzScrollBar.displayObject.visible=this._scrollBarVisible && !this._hScrollNone;
				if(this._contentSize.x==0)
					this._hzScrollBar.displayPerc=0;
				else
				this._hzScrollBar.displayPerc=Math.min(1,this._viewSize.x/this._contentSize.x);
			}
		};
		var rect=this._maskContainer.scrollRect;
		if (rect){
			rect.width=this._viewSize.x;
			rect.height=this._viewSize.y;
			this._maskContainer.scrollRect=rect;
		}
		if (this._scrollType==0 || this._scrollType==2)
			this._overlapSize.x=Math.ceil(Math.max(0,this._contentSize.x-this._viewSize.x));
		else
		this._overlapSize.x=0;
		if (this._scrollType==1 || this._scrollType==2)
			this._overlapSize.y=Math.ceil(Math.max(0,this._contentSize.y-this._viewSize.y));
		else
		this._overlapSize.y=0;
		this._xPos=ToolSet.clamp(this._xPos,0,this._overlapSize.x);
		this._yPos=ToolSet.clamp(this._yPos,0,this._overlapSize.y);
		if(this._refreshBarAxis!=null){
			var max=this._overlapSize[this._refreshBarAxis];
			if (max==0)
				max=Math.max(this._contentSize[this._refreshBarAxis]+this._footerLockedSize-this._viewSize[this._refreshBarAxis],0);
			else
			max+=this._footerLockedSize;
			if (this._refreshBarAxis=="x"){
				this._container.pos(ToolSet.clamp(this._container.x,-max,this._headerLockedSize),
				ToolSet.clamp(this._container.y,-this._overlapSize.y,0));
			}
			else{
				this._container.pos(ToolSet.clamp(this._container.x,-this._overlapSize.x,0),
				ToolSet.clamp(this._container.y,-max,this._headerLockedSize));
			}
			if (this._header !=null){
				if (this._refreshBarAxis=="x")
					this._header.height=this._viewSize.y;
				else
				this._header.width=this._viewSize.x;
			}
			if (this._footer !=null){
				if (this._refreshBarAxis=="y")
					this._footer.height=this._viewSize.y;
				else
				this._footer.width=this._viewSize.x;
			}
		}
		else{
			this._container.pos(ToolSet.clamp(this._container.x,-this._overlapSize.x,0),
			ToolSet.clamp(this._container.y,-this._overlapSize.y,0));
		}
		this.syncScrollBar(true);
		this.checkRefreshBar();
		if (this._pageMode)
			this.updatePageController();
	}

	__proto.posChanged=function(ani){
		if (this._aniFlag==0)
			this._aniFlag=ani ? 1 :-1;
		else if (this._aniFlag==1 && !ani)
		this._aniFlag=-1;
		this._needRefresh=true;
		Laya.timer.callLater(this,this.refresh);
	}

	__proto.refresh=function(){
		this._needRefresh=false;
		Laya.timer.clear(this,this.refresh);
		if (this._pageMode || this._snapToItem){
			ScrollPane.sEndPos.setTo(-this._xPos,-this._yPos);
			this.alignPosition(ScrollPane.sEndPos,false);
			this._xPos=-ScrollPane.sEndPos.x;
			this._yPos=-ScrollPane.sEndPos.y;
		}
		this.refresh2();
		Events.dispatch("fui_scroll",this._owner.displayObject);
		if (this._needRefresh){
			this._needRefresh=false;
			Laya.timer.clear(this,this.refresh);
			this.refresh2();
		}
		this.syncScrollBar();
		this._aniFlag=0;
	}

	__proto.refresh2=function(){
		if (this._aniFlag==1 && !this.isDragged){
			var posX=NaN;
			var posY=NaN;
			if (this._overlapSize.x > 0)
				posX=-Math.floor(this._xPos);
			else{
				if (this._container.x !=0)
					this._container.x=0;
				posX=0;
			}
			if (this._overlapSize.y > 0)
				posY=-Math.floor(this._yPos);
			else{
				if (this._container.y !=0)
					this._container.y=0;
				posY=0;
			}
			if (posX !=this._container.x || posY !=this._container.y){
				this._tweening=1;
				this._tweenTime.setTo(0,0);
				this._tweenDuration.setTo(0.5,0.5);
				this._tweenStart.setTo(this._container.x,this._container.y);
				this._tweenChange.setTo(posX-this._tweenStart.x,posY-this._tweenStart.y);
				Laya.timer.frameLoop(1,this,this.tweenUpdate);
			}
			else if (this._tweening !=0)
			this.killTween();
		}
		else{
			if (this._tweening !=0)
				this.killTween();
			this._container.pos(Math.floor(-this._xPos),Math.floor(-this._yPos));
			this.loopCheckingCurrent();
		}
		if (this._pageMode)
			this.updatePageController();
	}

	__proto.syncScrollBar=function(end){
		(end===void 0)&& (end=false);
		if (this._vtScrollBar !=null){
			this._vtScrollBar.scrollPerc=this._overlapSize.y==0 ? 0 :ToolSet.clamp(-this._container.y,0,this._overlapSize.y)/ this._overlapSize.y;
			if (this._scrollBarDisplayAuto)
				this.showScrollBar(!end);
		}
		if (this._hzScrollBar !=null){
			this._hzScrollBar.scrollPerc=this._overlapSize.x==0 ? 0 :ToolSet.clamp(-this._container.x,0,this._overlapSize.x)/ this._overlapSize.x;
			if (this._scrollBarDisplayAuto)
				this.showScrollBar(!end);
		}
		if(end)
			this._maskContainer.mouseEnabled=true;
	}

	__proto.__mouseDown=function(){
		if(!this._touchEffect)
			return;
		if(this._tweening!=0){
			this.killTween();
			this.isDragged=true;
		}
		else
		this.isDragged=false;
		var pt=this._owner.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,fairygui.ScrollPane.sHelperPoint);
		this._containerPos.setTo(this._container.x,this._container.y);
		this._beginTouchPos.setTo(pt.x,pt.y);
		this._lastTouchPos.setTo(pt.x,pt.y);
		this._lastTouchGlobalPos.setTo(Laya.stage.mouseX,Laya.stage.mouseY);
		this._isHoldAreaDone=false;
		this._velocity.setTo(0,0);
		this._velocityScale=1;
		this._lastMoveTime=Laya.timer.currTimer/1000;
		this._owner.displayObject.stage.on("mousemove",this,this.__mouseMove);
		this._owner.displayObject.stage.on("mouseup",this,this.__mouseUp);
		this._owner.displayObject.stage.on("click",this,this.__click);
	}

	__proto.__mouseMove=function(){
		if(!this._touchEffect)
			return;
		if (ScrollPane.draggingPane !=null && ScrollPane.draggingPane !=this || GObject.draggingObject !=null)
			return;
		var sensitivity=UIConfig$1.touchScrollSensitivity;
		var pt=this._owner.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,fairygui.ScrollPane.sHelperPoint);
		var diff=NaN,diff2=NaN;
		var sv=false,sh=false,st=false;
		if (this._scrollType==1){
			if (!this._isHoldAreaDone){
				ScrollPane._gestureFlag |=1;
				diff=Math.abs(this._beginTouchPos.y-pt.y);
				if (diff < sensitivity)
					return;
				if ((ScrollPane._gestureFlag & 2)!=0){
					diff2=Math.abs(this._beginTouchPos.x-pt.x);
					if (diff < diff2)
						return;
				}
			}
			sv=true;
		}
		else if (this._scrollType==0){
			if (!this._isHoldAreaDone){
				ScrollPane._gestureFlag |=2;
				diff=Math.abs(this._beginTouchPos.x-pt.x);
				if (diff < sensitivity)
					return;
				if ((ScrollPane._gestureFlag & 1)!=0){
					diff2=Math.abs(this._beginTouchPos.y-pt.y);
					if (diff < diff2)
						return;
				}
			}
			sh=true;
		}
		else{
			ScrollPane._gestureFlag=3;
			if (!this._isHoldAreaDone){
				diff=Math.abs(this._beginTouchPos.y-pt.y);
				if (diff < sensitivity){
					diff=Math.abs(this._beginTouchPos.x-pt.x);
					if (diff < sensitivity)
						return;
				}
			}
			sv=sh=true;
		};
		var newPosX=Math.floor(this._containerPos.x+pt.x-this._beginTouchPos.x);
		var newPosY=Math.floor(this._containerPos.y+pt.y-this._beginTouchPos.y);
		if (sv){
			if (newPosY > 0){
				if (!this._bouncebackEffect)
					this._container.y=0;
				else if (this._header !=null && this._header.maxHeight !=0)
				this._container.y=Math.floor(Math.min(newPosY *0.5,this._header.maxHeight));
				else
				this._container.y=Math.floor(Math.min(newPosY *0.5,this._viewSize.y *0.5));
			}
			else if (newPosY <-this._overlapSize.y){
				if (!this._bouncebackEffect)
					this._container.y=-this._overlapSize.y;
				else if (this._footer !=null && this._footer.maxHeight > 0)
				this._container.y=Math.floor(Math.max((newPosY+this._overlapSize.y)*0.5,-this._footer.maxHeight)-this._overlapSize.y);
				else
				this._container.y=Math.floor(Math.max((newPosY+this._overlapSize.y)*0.5,-this._viewSize.y *0.5)-this._overlapSize.y);
			}
			else
			this._container.y=newPosY;
		}
		if (sh){
			if (newPosX > 0){
				if (!this._bouncebackEffect)
					this._container.x=0;
				else if (this._header !=null && this._header.maxWidth !=0)
				this._container.x=Math.floor(Math.min(newPosX *0.5,this._header.maxWidth));
				else
				this._container.x=Math.floor(Math.min(newPosX *0.5,this._viewSize.x *0.5));
			}
			else if (newPosX < 0-this._overlapSize.x){
				if (!this._bouncebackEffect)
					this._container.x=-this._overlapSize.x;
				else if (this._footer !=null && this._footer.maxWidth > 0)
				this._container.x=Math.floor(Math.max((newPosX+this._overlapSize.x)*0.5,-this._footer.maxWidth)-this._overlapSize.x);
				else
				this._container.x=Math.floor(Math.max((newPosX+this._overlapSize.x)*0.5,-this._viewSize.x *0.5)-this._overlapSize.x);
			}
			else
			this._container.x=newPosX;
		};
		var frameRate=Laya.stage.frameRate=="slow"?30:60;
		var now=Laya.timer.currTimer/1000;
		var deltaTime=Math.max(now-this._lastMoveTime,1/frameRate);
		var deltaPositionX=pt.x-this._lastTouchPos.x;
		var deltaPositionY=pt.y-this._lastTouchPos.y;
		if (!sh)
			deltaPositionX=0;
		if (!sv)
			deltaPositionY=0;
		if(deltaTime!=0){
			var elapsed=deltaTime *frameRate-1;
			if (elapsed > 1){
				var factor=Math.pow(0.833,elapsed);
				this._velocity.x=this._velocity.x *factor;
				this._velocity.y=this._velocity.y *factor;
			}
			this._velocity.x=ToolSet.lerp(this._velocity.x,deltaPositionX *60 / frameRate / deltaTime,deltaTime *10);
			this._velocity.y=ToolSet.lerp(this._velocity.y,deltaPositionY *60 / frameRate / deltaTime,deltaTime *10);
		};
		var deltaGlobalPositionX=this._lastTouchGlobalPos.x-Laya.stage.mouseX;
		var deltaGlobalPositionY=this._lastTouchGlobalPos.y-Laya.stage.mouseY;
		if (deltaPositionX !=0)
			this._velocityScale=Math.abs(deltaGlobalPositionX / deltaPositionX);
		else if (deltaPositionY !=0)
		this._velocityScale=Math.abs(deltaGlobalPositionY / deltaPositionY);
		this._lastTouchPos.setTo(pt.x,pt.y);
		this._lastTouchGlobalPos.setTo(Laya.stage.mouseX,Laya.stage.mouseY);
		this._lastMoveTime=now;
		if (this._overlapSize.x > 0)
			this._xPos=ToolSet.clamp(-this._container.x,0,this._overlapSize.x);
		if (this._overlapSize.y > 0)
			this._yPos=ToolSet.clamp(-this._container.y,0,this._overlapSize.y);
		if (this._loop !=0){
			newPosX=this._container.x;
			newPosY=this._container.y;
			if (this.loopCheckingCurrent()){
				this._containerPos.x+=this._container.x-newPosX;
				this._containerPos.y+=this._container.y-newPosY;
			}
		}
		ScrollPane.draggingPane=this;
		this._isHoldAreaDone=true;
		this.isDragged=true;
		this._maskContainer.mouseEnabled=false;
		this.syncScrollBar();
		this.checkRefreshBar();
		if (this._pageMode)
			this.updatePageController();
		Events.dispatch("fui_scroll",this._owner.displayObject);
	}

	__proto.__mouseUp=function(){
		this._owner.displayObject.stage.off("mousemove",this,this.__mouseMove);
		this._owner.displayObject.stage.off("mouseup",this,this.__mouseUp);
		this._owner.displayObject.stage.off("click",this,this.__click);
		if (ScrollPane.draggingPane==this)
			ScrollPane.draggingPane=null;
		ScrollPane._gestureFlag=0;
		if (!this.isDragged || !this._touchEffect){
			this.isDragged=false;
			this._maskContainer.mouseEnabled=true;
			return;
		}
		this.isDragged=false;
		this._maskContainer.mouseEnabled=true;
		this._tweenStart.setTo(this._container.x,this._container.y);
		ScrollPane.sEndPos.setTo(this._tweenStart.x,this._tweenStart.y);
		var flag=false;
		if (this._container.x > 0){
			ScrollPane.sEndPos.x=0;
			flag=true;
		}
		else if (this._container.x <-this._overlapSize.x){
			ScrollPane.sEndPos.x=-this._overlapSize.x;
			flag=true;
		}
		if (this._container.y > 0){
			ScrollPane.sEndPos.y=0;
			flag=true;
		}
		else if (this._container.y <-this._overlapSize.y){
			ScrollPane.sEndPos.y=-this._overlapSize.y;
			flag=true;
		}
		if (flag){
			this._tweenChange.setTo(ScrollPane.sEndPos.x-this._tweenStart.x,ScrollPane.sEndPos.y-this._tweenStart.y);
			if (this._tweenChange.x <-UIConfig$1.touchDragSensitivity || this._tweenChange.y <-UIConfig$1.touchDragSensitivity){
				this._refreshEventDispatching=true;
				Events.dispatch("fui_pull_down_release",this._owner.displayObject);
				this._refreshEventDispatching=false;
			}
			else if (this._tweenChange.x > UIConfig$1.touchDragSensitivity || this._tweenChange.y > UIConfig$1.touchDragSensitivity){
				this._refreshEventDispatching=true;
				Events.dispatch("fui_pull_up_release",this._owner.displayObject);
				this._refreshEventDispatching=false;
			}
			if (this._headerLockedSize > 0 && ScrollPane.sEndPos[this._refreshBarAxis]==0){
				ScrollPane.sEndPos[this._refreshBarAxis]=this._headerLockedSize;
				this._tweenChange.x=ScrollPane.sEndPos.x-this._tweenStart.x;
				this._tweenChange.y=ScrollPane.sEndPos.y-this._tweenStart.y;
			}
			else if (this._footerLockedSize > 0 && ScrollPane.sEndPos[this._refreshBarAxis]==-this._overlapSize[this._refreshBarAxis]){
				var max=this._overlapSize[this._refreshBarAxis];
				if (max==0)
					max=Math.max(this._contentSize[this._refreshBarAxis]+this._footerLockedSize-this._viewSize[this._refreshBarAxis],0);
				else
				max+=this._footerLockedSize;
				ScrollPane.sEndPos[this._refreshBarAxis]=-max;
				this._tweenChange.x=ScrollPane.sEndPos.x-this._tweenStart.x;
				this._tweenChange.y=ScrollPane.sEndPos.y-this._tweenStart.y;
			}
			this._tweenDuration.setTo(0.3,0.3);
		}
		else{
			if (!this._inertiaDisabled){
				var frameRate=Laya.stage.frameRate=="slow"?30:60;
				var elapsed=(Laya.timer.currTimer/1000-this._lastMoveTime)*frameRate-1;
				if (elapsed > 1){
					var factor=Math.pow(0.833,elapsed);
					this._velocity.x=this._velocity.x *factor;
					this._velocity.y=this._velocity.y *factor;
				}
				this.updateTargetAndDuration(this._tweenStart,ScrollPane.sEndPos);
			}
			else
			this._tweenDuration.setTo(0.3,0.3);
			ScrollPane.sOldChange.setTo(ScrollPane.sEndPos.x-this._tweenStart.x,ScrollPane.sEndPos.y-this._tweenStart.y);
			this.loopCheckingTarget(ScrollPane.sEndPos);
			if (this._pageMode || this._snapToItem)
				this.alignPosition(ScrollPane.sEndPos,true);
			this._tweenChange.x=ScrollPane.sEndPos.x-this._tweenStart.x;
			this._tweenChange.y=ScrollPane.sEndPos.y-this._tweenStart.y;
			if (this._tweenChange.x==0 && this._tweenChange.y==0){
				if (this._scrollBarDisplayAuto)
					this.showScrollBar(false);
				return;
			}
			if (this._pageMode || this._snapToItem){
				this.fixDuration("x",ScrollPane.sOldChange.x);
				this.fixDuration("y",ScrollPane.sOldChange.y);
			}
		}
		this._tweening=2;
		this._tweenTime.setTo(0,0);
		Laya.timer.frameLoop(1,this,this.tweenUpdate);
	}

	__proto.__click=function(){
		this.isDragged=false;
	}

	__proto.__mouseWheel=function(evt){
		if(!this._mouseWheelEnabled)
			return;
		var pt=this._owner.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,fairygui.ScrollPane.sHelperPoint);
		var delta=evt["delta"];
		delta=delta>0?-1:(delta<0?1:0);
		if (this._overlapSize.x > 0 && this._overlapSize.y==0){
			if (this._pageMode)
				this.setPosX(this._xPos+this._pageSize.x *delta,false);
			else
			this.setPosX(this._xPos+this._mouseWheelStep *delta,false);
		}
		else {
			if (this._pageMode)
				this.setPosY(this._yPos+this._pageSize.y *delta,false);
			else
			this.setPosY(this._yPos+this._mouseWheelStep *delta,false);
		}
	}

	__proto.__rollOver=function(){
		this.showScrollBar(true);
	}

	__proto.__rollOut=function(){
		this.showScrollBar(false);
	}

	__proto.showScrollBar=function(val){
		if (val){
			this.__showScrollBar(true);
			Laya.timer.clear(this,this.__showScrollBar);
		}
		else
		Laya.timer.once(500,this,this.__showScrollBar,[val]);
	}

	__proto.__showScrollBar=function(val){
		this._scrollBarVisible=val && this._viewSize.x>0 && this._viewSize.y>0;
		if (this._vtScrollBar)
			this._vtScrollBar.displayObject.visible=this._scrollBarVisible && !this._vScrollNone;
		if (this._hzScrollBar)
			this._hzScrollBar.displayObject.visible=this._scrollBarVisible && !this._hScrollNone;
	}

	__proto.getLoopPartSize=function(division,axis){
		return (this._contentSize[axis]+(axis=="x" ? (this._owner).columnGap :(this._owner).lineGap))/ division;
	}

	__proto.loopCheckingCurrent=function(){
		var changed=false;
		if (this._loop==1 && this._overlapSize.x > 0){
			if (this._xPos < 0.001){
				this._xPos+=this.getLoopPartSize(2,"x");
				changed=true;
			}
			else if (this._xPos >=this._overlapSize.x){
				this._xPos-=this.getLoopPartSize(2,"x");
				changed=true;
			}
		}
		else if (this._loop==2 && this._overlapSize.y > 0){
			if (this._yPos < 0.001){
				this._yPos+=this.getLoopPartSize(2,"y");
				changed=true;
			}
			else if (this._yPos >=this._overlapSize.y){
				this._yPos-=this.getLoopPartSize(2,"y");
				changed=true;
			}
		}
		if (changed)
			this._container.pos(Math.floor(-this._xPos),Math.floor(-this._yPos));
		return changed;
	}

	__proto.loopCheckingTarget=function(endPos){
		if (this._loop==1)
			this.loopCheckingTarget2(endPos,"x");
		if (this._loop==2)
			this.loopCheckingTarget2(endPos,"y");
	}

	__proto.loopCheckingTarget2=function(endPos,axis){
		var halfSize=NaN;
		var tmp=NaN;
		if (endPos[axis] > 0){
			halfSize=this.getLoopPartSize(2,axis);
			tmp=this._tweenStart[axis]-halfSize;
			if (tmp <=0 && tmp >=-this._overlapSize[axis]){
				endPos[axis]-=halfSize;
				this._tweenStart[axis]=tmp;
			}
		}
		else if (endPos[axis] <-this._overlapSize[axis]){
			halfSize=this.getLoopPartSize(2,axis);
			tmp=this._tweenStart[axis]+halfSize;
			if (tmp <=0 && tmp >=-this._overlapSize[axis]){
				endPos[axis]+=halfSize;
				this._tweenStart[axis]=tmp;
			}
		}
	}

	__proto.loopCheckingNewPos=function(value,axis){
		if (this._overlapSize[axis]==0)
			return value;
		var pos=axis=="x" ? this._xPos :this._yPos;
		var changed=false;
		var v=NaN;
		if (value < 0.001){
			value+=this.getLoopPartSize(2,axis);
			if (value > pos){
				v=this.getLoopPartSize(6,axis);
				v=Math.ceil((value-pos)/ v)*v;
				pos=ToolSet.clamp(pos+v,0,this._overlapSize[axis]);
				changed=true;
			}
		}
		else if (value >=this._overlapSize[axis]){
			value-=this.getLoopPartSize(2,axis);
			if (value < pos){
				v=this.getLoopPartSize(6,axis);
				v=Math.ceil((pos-value)/ v)*v;
				pos=ToolSet.clamp(pos-v,0,this._overlapSize[axis]);
				changed=true;
			}
		}
		if (changed){
			if (axis=="x")
				this._container.x=-Math.floor(pos);
			else
			this._container.y=-Math.floor(pos);
		}
		return value;
	}

	__proto.alignPosition=function(pos,inertialScrolling){
		if (this._pageMode){
			pos.x=this.alignByPage(pos.x,"x",inertialScrolling);
			pos.y=this.alignByPage(pos.y,"y",inertialScrolling);
		}
		else if (this._snapToItem){
			var pt=this._owner.getSnappingPosition(-pos.x,-pos.y,ScrollPane.sHelperPoint);
			if (pos.x < 0 && pos.x >-this._overlapSize.x)
				pos.x=-pt.x;
			if (pos.y < 0 && pos.y >-this._overlapSize.y)
				pos.y=-pt.y;
		}
	}

	__proto.alignByPage=function(pos,axis,inertialScrolling){
		var page=0;
		if (pos > 0)
			page=0;
		else if (pos <-this._overlapSize[axis])
		page=Math.ceil(this._contentSize[axis] / this._pageSize[axis])-1;
		else{
			page=Math.floor(-pos / this._pageSize[axis]);
			var change=inertialScrolling ? (pos-this._containerPos[axis]):(pos-this._container[axis]);
			var testPageSize=Math.min(this._pageSize[axis],this._contentSize[axis]-(page+1)*this._pageSize[axis]);
			var delta=-pos-page *this._pageSize[axis];
			if (Math.abs(change)> this._pageSize[axis]){
				if (delta > testPageSize *0.5)
					page++;
			}
			else{
				if (delta > testPageSize *(change < 0 ? 0.3 :0.7))
					page++;
			}
			pos=-page *this._pageSize[axis];
			if (pos <-this._overlapSize[axis])
				pos=-this._overlapSize[axis];
		}
		if (inertialScrolling){
			var oldPos=this._tweenStart[axis];
			var oldPage=0;
			if (oldPos > 0)
				oldPage=0;
			else if (oldPos <-this._overlapSize[axis])
			oldPage=Math.ceil(this._contentSize[axis] / this._pageSize[axis])-1;
			else
			oldPage=Math.floor(-oldPos / this._pageSize[axis]);
			var startPage=Math.floor(-this._containerPos[axis] / this._pageSize[axis]);
			if (Math.abs(page-startPage)> 1 && Math.abs(oldPage-startPage)<=1){
				if (page > startPage)
					page=startPage+1;
				else
				page=startPage-1;
				pos=-page *this._pageSize[axis];
			}
		}
		return pos;
	}

	__proto.updateTargetAndDuration=function(orignPos,resultPos){
		resultPos.x=this.updateTargetAndDuration2(orignPos.x,"x");
		resultPos.y=this.updateTargetAndDuration2(orignPos.y,"y");
	}

	__proto.updateTargetAndDuration2=function(pos,axis){
		var v=this._velocity[axis];
		var duration=0;
		if (pos > 0)
			pos=0;
		else if (pos <-this._overlapSize[axis])
		pos=-this._overlapSize[axis];
		else{
			var v2=Math.abs(v)*this._velocityScale;
			if(Browser.onMobile)
				v2 *=1136 / Math.max(Laya.stage.width,Laya.stage.height);
			var ratio=0;
			if (this._pageMode || !Browser.onMobile){
				if (v2 > 500)
					ratio=Math.pow((v2-500)/ 500,2);
			}
			else{
				if (v2 > 1000)
					ratio=Math.pow((v2-1000)/ 1000,2);
			}
			if (ratio !=0){
				if (ratio > 1)
					ratio=1;
				v2 *=ratio;
				v *=ratio;
				this._velocity[axis]=v;
				duration=Math.log(60 / v2)/Math.log(this._decelerationRate)/ 60;
				var change=Math.floor(v *duration *0.4);
				pos+=change;
			}
		}
		if (duration < 0.3)
			duration=0.3;
		this._tweenDuration[axis]=duration;
		return pos;
	}

	__proto.fixDuration=function(axis,oldChange){
		if (this._tweenChange[axis]==0 || Math.abs(this._tweenChange[axis])>=Math.abs(oldChange))
			return;
		var newDuration=Math.abs(this._tweenChange[axis] / oldChange)*this._tweenDuration[axis];
		if (newDuration < 0.3)
			newDuration=0.3;
		this._tweenDuration[axis]=newDuration;
	}

	__proto.killTween=function(){
		if (this._tweening==1){
			this._container.pos(this._tweenStart.x+this._tweenChange.x,this._tweenStart.y+this._tweenChange.y);
			Events.dispatch("fui_scroll",this._owner.displayObject);
		}
		this._tweening=0;
		Laya.timer.clear(this,this.tweenUpdate);
		Events.dispatch("fui_scroll_end",this._owner.displayObject);
	}

	__proto.checkRefreshBar=function(){
		if (this._header==null && this._footer==null)
			return;
		var pos=this._container[this._refreshBarAxis];
		if (this._header !=null){
			if (pos > 0){
				if (this._header.displayObject.parent==null)
					this._maskContainer.addChildAt(this._header.displayObject,0);
				var pt=ScrollPane.sHelperPoint;
				pt.setTo(this._header.width,this._header.height);
				pt[this._refreshBarAxis]=pos;
				this._header.setSize(pt.x,pt.y);
			}
			else{
				if (this._header.displayObject.parent !=null)
					this._maskContainer.removeChild(this._header.displayObject);
			}
		}
		if (this._footer !=null){
			var max=this._overlapSize[this._refreshBarAxis];
			if (pos <-max || max==0 && this._footerLockedSize > 0){
				if (this._footer.displayObject.parent==null)
					this._maskContainer.addChildAt(this._footer.displayObject,0);
				pt=ScrollPane.sHelperPoint;
				pt.setTo(this._footer.x,this._footer.y);
				if (max > 0)
					pt[this._refreshBarAxis]=pos+this._contentSize[this._refreshBarAxis];
				else
				pt[this._refreshBarAxis]=Math.max(Math.min(pos+this._viewSize[this._refreshBarAxis],this._viewSize[this._refreshBarAxis]-this._footerLockedSize),
				this._viewSize[this._refreshBarAxis]-this._contentSize[this._refreshBarAxis]);
				this._footer.setXY(pt.x,pt.y);
				pt.setTo(this._footer.width,this._footer.height);
				if (max > 0)
					pt[this._refreshBarAxis]=-max-pos;
				else
				pt[this._refreshBarAxis]=this._viewSize[this._refreshBarAxis]-this._footer[this._refreshBarAxis];
				this._footer.setSize(pt.x,pt.y);
			}
			else{
				if (this._footer.displayObject.parent !=null)
					this._maskContainer.removeChild(this._footer.displayObject);
			}
		}
	}

	__proto.tweenUpdate=function(){
		var nx=this.runTween("x");
		var ny=this.runTween("y");
		this._container.pos(nx,ny);
		if (this._tweening==2){
			if (this._overlapSize.x > 0)
				this._xPos=ToolSet.clamp(-nx,0,this._overlapSize.x);
			if (this._overlapSize.y > 0)
				this._yPos=ToolSet.clamp(-ny,0,this._overlapSize.y);
			if (this._pageMode)
				this.updatePageController();
		}
		if (this._tweenChange.x==0 && this._tweenChange.y==0){
			this._tweening=0;
			Laya.timer.clear(this,this.tweenUpdate);
			this.loopCheckingCurrent();
			this.syncScrollBar(true);
			this.checkRefreshBar();
			Events.dispatch("fui_scroll",this._owner.displayObject);
			Events.dispatch("fui_scroll_end",this._owner.displayObject);
		}
		else{
			this.syncScrollBar(false);
			this.checkRefreshBar();
			Events.dispatch("fui_scroll",this._owner.displayObject);
		}
	}

	__proto.runTween=function(axis){
		var newValue=NaN;
		if (this._tweenChange[axis] !=0){
			this._tweenTime[axis]+=Laya.timer.delta/1000;
			if (this._tweenTime[axis] >=this._tweenDuration[axis]){
				newValue=this._tweenStart[axis]+this._tweenChange[axis];
				this._tweenChange[axis]=0;
			}
			else{
				var ratio=ScrollPane.easeFunc(this._tweenTime[axis],this._tweenDuration[axis]);
				newValue=this._tweenStart[axis]+Math.floor(this._tweenChange[axis] *ratio);
			};
			var threshold1=0;
			var threshold2=-this._overlapSize[axis];
			if (this._headerLockedSize > 0 && this._refreshBarAxis==axis)
				threshold1=this._headerLockedSize;
			if (this._footerLockedSize > 0 && this._refreshBarAxis==axis){
				var max=this._overlapSize[this._refreshBarAxis];
				if (max==0)
					max=Math.max(this._contentSize[this._refreshBarAxis]+this._footerLockedSize-this._viewSize[this._refreshBarAxis],0);
				else
				max+=this._footerLockedSize;
				threshold2=-max;
			}
			if (this._tweening==2 && this._bouncebackEffect){
				if (newValue > 20+threshold1 && this._tweenChange[axis] > 0
					|| newValue > threshold1 && this._tweenChange[axis]==0){
					this._tweenTime[axis]=0;
					this._tweenDuration[axis]=0.3;
					this._tweenChange[axis]=-newValue+threshold1;
					this._tweenStart[axis]=newValue;
				}
				else if (newValue < threshold2-20 && this._tweenChange[axis] < 0
				|| newValue < threshold2 && this._tweenChange[axis]==0){
					this._tweenTime[axis]=0;
					this._tweenDuration[axis]=0.3;
					this._tweenChange[axis]=threshold2-newValue;
					this._tweenStart[axis]=newValue;
				}
			}
			else{
				if (newValue > threshold1){
					newValue=threshold1;
					this._tweenChange[axis]=0;
				}
				else if (newValue < threshold2){
					newValue=threshold2;
					this._tweenChange[axis]=0;
				}
			}
		}
		else
		newValue=this._container[axis];
		return newValue;
	}

	__getset(0,__proto,'scrollingPosY',function(){
		return ToolSet.clamp(-this._container.y,0,this._overlapSize.y);
	});

	__getset(0,__proto,'isBottomMost',function(){
		return this._yPos==this._overlapSize.y || this._overlapSize.y==0;
	});

	__getset(0,__proto,'currentPageY',function(){
		if (!this._pageMode)
			return 0;
		var page=Math.floor(this._yPos / this._pageSize.y);
		if (this._yPos-page *this._pageSize.y > this._pageSize.y *0.5)
			page++;
		return page;
		},function(value){
		this.setCurrentPageY(value,false);
	});

	__getset(0,__proto,'footer',function(){
		return this._footer;
	});

	__getset(0,__proto,'owner',function(){
		return this._owner;
	});

	__getset(0,__proto,'currentPageX',function(){
		if (!this._pageMode)
			return 0;
		var page=Math.floor(this._xPos / this._pageSize.x);
		if (this._xPos-page *this._pageSize.x > this._pageSize.x *0.5)
			page++;
		return page;
		},function(value){
		this.setCurrentPageX(value,false);
	});

	__getset(0,__proto,'viewWidth',function(){
		return this._viewSize.x;
		},function(value){
		value=value+this._owner.margin.left+this._owner.margin.right;
		if (this._vtScrollBar !=null)
			value+=this._vtScrollBar.width;
		this._owner.width=value;
	});

	__getset(0,__proto,'scrollStep',function(){
		return this._scrollStep;
		},function(val){
		this._scrollStep=val;
		if(this._scrollStep==0)
			this._scrollStep=UIConfig$1.defaultScrollStep;
		this._mouseWheelStep=this._scrollStep*2;
	});

	__getset(0,__proto,'posY',function(){
		return this._yPos;
		},function(value){
		this.setPosY(value,false);
	});

	__getset(0,__proto,'contentHeight',function(){
		return this._contentSize.y;
	});

	__getset(0,__proto,'contentWidth',function(){
		return this._contentSize.x;
	});

	__getset(0,__proto,'percY',function(){
		return this._overlapSize.y==0 ? 0 :this._yPos / this._overlapSize.y;
		},function(value){
		this.setPercY(value,false);
	});

	__getset(0,__proto,'decelerationRate',function(){
		return this._decelerationRate;
		},function(value){
		this._decelerationRate=value;
	});

	__getset(0,__proto,'bouncebackEffect',function(){
		return this._bouncebackEffect;
		},function(sc){
		this._bouncebackEffect=sc;
	});

	__getset(0,__proto,'posX',function(){
		return this._xPos;
		},function(value){
		this.setPosX(value,false);
	});

	__getset(0,__proto,'snapToItem',function(){
		return this._snapToItem;
		},function(value){
		this._snapToItem=value;
	});

	__getset(0,__proto,'touchEffect',function(){
		return this._touchEffect;
		},function(sc){
		this._touchEffect=sc;
	});

	__getset(0,__proto,'viewHeight',function(){
		return this._viewSize.y;
		},function(value){
		value=value+this._owner.margin.top+this._owner.margin.bottom;
		if (this._hzScrollBar !=null)
			value+=this._hzScrollBar.height;
		this._owner.height=value;
	});

	__getset(0,__proto,'pageController',function(){
		return this._pageController;
		},function(value){
		this._pageController=value;
	});

	__getset(0,__proto,'header',function(){
		return this._header;
	});

	__getset(0,__proto,'vtScrollBar',function(){
		return this._vtScrollBar;
	});

	__getset(0,__proto,'isRightMost',function(){
		return this._xPos==this._overlapSize.x || this._overlapSize.x==0;
	});

	__getset(0,__proto,'mouseWheelEnabled',function(){
		return this._mouseWheelEnabled;
		},function(value){
		this._mouseWheelEnabled=value;
	});

	__getset(0,__proto,'scrollingPosX',function(){
		return ToolSet.clamp(-this._container.x,0,this._overlapSize.x);
	});

	__getset(0,__proto,'percX',function(){
		return this._overlapSize.x==0 ? 0 :this._xPos / this._overlapSize.x;
		},function(value){
		this.setPercX(value,false);
	});

	__getset(0,__proto,'hzScrollBar',function(){
		return this._hzScrollBar;
	});

	ScrollPane.easeFunc=function(t,d){
		return (t=t / d-1)*t *t+1;
	}

	ScrollPane.draggingPane=null;
	ScrollPane._gestureFlag=0;
	ScrollPane.TWEEN_TIME_GO=0.5;
	ScrollPane.TWEEN_TIME_DEFAULT=0.3;
	ScrollPane.PULL_RATIO=0.5;
	__static(ScrollPane,
	['sHelperPoint',function(){return this.sHelperPoint=new Point();},'sHelperRect',function(){return this.sHelperRect=new Rectangle();},'sEndPos',function(){return this.sEndPos=new Point();},'sOldChange',function(){return this.sOldChange=new Point();}
	]);
	return ScrollPane;
})()


//class fairygui.GObject
var GObject=(function(){
	function GObject(){
		this.data=null;
		this.packageItem=null;
		this._x=0;
		this._y=0;
		this._alpha=1;
		this._rotation=0;
		this._visible=true;
		this._touchable=true;
		this._grayed=false;
		this._draggable=false;
		this._scaleX=1;
		this._scaleY=1;
		this._skewX=0;
		this._skewY=0;
		this._pivotX=0;
		this._pivotY=0;
		this._pivotAsAnchor=false;
		this._pivotOffsetX=0;
		this._pivotOffsetY=0;
		this._sortingOrder=0;
		this._internalVisible=true;
		this._handlingController=false;
		this._focusable=false;
		this._tooltips=null;
		this._pixelSnapping=false;
		this._relations=null;
		this._group=null;
		this._gears=null;
		this._dragBounds=null;
		this._displayObject=null;
		this._yOffset=0;
		//Size的实现方式，有两种，0-GObject的w/h等于DisplayObject的w/h。1-GObject的sourceWidth/sourceHeight等于DisplayObject的w/h，剩余部分由scale实现
		this._sizeImplType=0;
		this.minWidth=0;
		this.minHeight=0;
		this.maxWidth=0;
		this.maxHeight=0;
		this.sourceWidth=0;
		this.sourceHeight=0;
		this.initWidth=0;
		this.initHeight=0;
		this._parent=null;
		this._width=0;
		this._height=0;
		this._rawWidth=0;
		this._rawHeight=0;
		this._id=null;
		this._name=null;
		this._underConstruct=false;
		this._gearLocked=false;
		this._sizePercentInGroup=0;
		this._touchDownPoint=null;
		;
		this._id=""+fairygui.GObject._gInstanceCounter++;
		this._name="";
		this.createDisplayObject();
		this._relations=new Relations(this);
		this._gears=__newvec(8,null);
	}

	__class(GObject,'fairygui.GObject');
	var __proto=GObject.prototype;
	__proto.setXY=function(xv,yv){
		if(this._x !=xv || this._y !=yv){
			var dx=xv-this._x;
			var dy=yv-this._y;
			this._x=xv;
			this._y=yv;
			this.handleXYChanged();
			if((this instanceof fairygui.GGroup ))
				(this).moveChildren(dx,dy);
			this.updateGear(1);
			if(this._parent && !((this._parent instanceof fairygui.GList ))){
				this._parent.setBoundsChangedFlag();
				if (this._group !=null)
					this._group.setBoundsChangedFlag();
				this.displayObject.event("fui_xy_changed");
			}
			if (GObject.draggingObject==this && !GObject.sUpdateInDragging)
				this.localToGlobalRect(0,0,this.width,this.height,GObject.sGlobalRect);
		}
	}

	__proto.center=function(restraint){
		(restraint===void 0)&& (restraint=false);
		var r;
		if(this._parent !=null)
			r=this.parent;
		else
		r=this.root;
		this.setXY((r.width-this.width)/ 2,(r.height-this.height)/ 2);
		if(restraint){
			this.addRelation(r,3);
			this.addRelation(r,10);
		}
	}

	__proto.setSize=function(wv,hv,ignorePivot){
		(ignorePivot===void 0)&& (ignorePivot=false);
		if(this._rawWidth !=wv || this._rawHeight !=hv){
			this._rawWidth=wv;
			this._rawHeight=hv;
			if(wv<this.minWidth)
				wv=this.minWidth;
			if(hv<this.minHeight)
				hv=this.minHeight;
			if(this.maxWidth>0 && wv>this.maxWidth)
				wv=this.maxWidth;
			if(this.maxHeight>0 && hv>this.maxHeight)
				hv=this.maxHeight;
			var dWidth=wv-this._width;
			var dHeight=hv-this._height;
			this._width=wv;
			this._height=hv;
			this.handleSizeChanged();
			if(this._pivotX !=0 || this._pivotY !=0){
				if(!this._pivotAsAnchor){
					if(!ignorePivot)
						this.setXY(this.x-this._pivotX *dWidth,this.y-this._pivotY *dHeight);
					this.updatePivotOffset();
				}
				else
				this.applyPivot();
			}
			if ((this instanceof fairygui.GGroup ))
				(this).resizeChildren(dWidth,dHeight);
			this.updateGear(2);
			if(this._parent){
				this._relations.onOwnerSizeChanged(dWidth,dHeight,this._pivotAsAnchor || !ignorePivot);
				this._parent.setBoundsChangedFlag();
				if (this._group !=null)
					this._group.setBoundsChangedFlag(true);
			}
			this.displayObject.event("fui_size_changed");
		}
	}

	__proto.ensureSizeCorrect=function(){}
	__proto.setScale=function(sx,sy){
		if(this._scaleX !=sx || this._scaleY !=sy){
			this._scaleX=sx;
			this._scaleY=sy;
			this.handleScaleChanged();
			this.applyPivot();
			this.updateGear(2);
		}
	}

	__proto.setSkew=function(sx,sy){
		if(this._skewX !=sx || this._skewY !=sy){
			this._skewX=sx;
			this._skewY=sy;
			if(this._displayObject!=null){
				this._displayObject.skew(-sx,sy);
				this.applyPivot();
			}
		}
	}

	__proto.setPivot=function(xv,yv,asAnchor){
		(yv===void 0)&& (yv=0);
		(asAnchor===void 0)&& (asAnchor=false);
		if(this._pivotX !=xv || this._pivotY !=yv || this._pivotAsAnchor!=asAnchor){
			this._pivotX=xv;
			this._pivotY=yv;
			this._pivotAsAnchor=asAnchor;
			this.updatePivotOffset();
			this.handleXYChanged();
		}
	}

	__proto.internalSetPivot=function(xv,yv,asAnchor){
		this._pivotX=xv;
		this._pivotY=yv;
		this._pivotAsAnchor=asAnchor;
		if(this._pivotAsAnchor)
			this.handleXYChanged();
	}

	__proto.updatePivotOffset=function(){
		if(this._displayObject!=null){
			if(this._displayObject.transform && (this._pivotX!=0 || this._pivotY!=0)){
				if(this._sizeImplType==0){
					fairygui.GObject.sHelperPoint.x=this._pivotX*this._width;
					fairygui.GObject.sHelperPoint.y=this._pivotY*this._height;
				}
				else {
					fairygui.GObject.sHelperPoint.x=this._pivotX*this.sourceWidth;
					fairygui.GObject.sHelperPoint.y=this._pivotY*this.sourceHeight;
				};
				var pt=this._displayObject.transform.transformPoint(fairygui.GObject.sHelperPoint);
				this._pivotOffsetX=this._pivotX*this._width-pt.x;
				this._pivotOffsetY=this._pivotY*this._height-pt.y;
			}
			else{
				this._pivotOffsetX=0;
				this._pivotOffsetY=0;
			}
		}
	}

	__proto.applyPivot=function(){
		if(this._pivotX !=0 || this._pivotY !=0){
			this.updatePivotOffset();
			this.handleXYChanged();
		}
	}

	__proto.requestFocus=function(){
		var p=this;
		while (p && !p._focusable)
		p=p.parent;
		if (p !=null)
			this.root.focus=p;
	}

	__proto.__rollOver=function(evt){
		Laya.timer.once(100,this,this.__doShowTooltips);
	}

	__proto.__doShowTooltips=function(){
		var r=this.root;
		if(r)
			this.root.showTooltips(this._tooltips);
	}

	__proto.__rollOut=function(evt){
		Laya.timer.clear(this,this.__doShowTooltips);
		this.root.hideTooltips();
	}

	__proto.getGear=function(index){
		var gear=this._gears[index];
		if (gear==null){
			switch (index){
				case 0:
					gear=new GearDisplay(this);
					break ;
				case 1:
					gear=new GearXY(this);
					break ;
				case 2:
					gear=new GearSize(this);
					break ;
				case 3:
					gear=new GearLook(this);
					break ;
				case 4:
					gear=new GearColor(this);
					break ;
				case 5:
					gear=new GearAnimation(this);
					break ;
				case 6:
					gear=new GearText(this);
					break ;
				case 7:
					gear=new GearIcon(this);
					break ;
				default :
					throw new Error("FairyGUI: invalid gear index!");
				}
			this._gears[index]=gear;
		}
		return gear;
	}

	__proto.updateGear=function(index){
		if(this._underConstruct || this._gearLocked)
			return;
		var gear=this._gears[index];
		if (gear!=null && gear.controller!=null)
			gear.updateState();
	}

	__proto.checkGearController=function(index,c){
		return this._gears[index] !=null && this._gears[index].controller==c;
	}

	__proto.updateGearFromRelations=function(index,dx,dy){
		if (this._gears[index] !=null)
			this._gears[index].updateFromRelations(dx,dy);
	}

	__proto.addDisplayLock=function(){
		var gearDisplay=(this._gears[0]);
		if(gearDisplay && gearDisplay.controller){
			var ret=gearDisplay.addLock();
			this.checkGearDisplay();
			return ret;
		}
		else
		return 0;
	}

	__proto.releaseDisplayLock=function(token){
		var gearDisplay=(this._gears[0]);
		if(gearDisplay && gearDisplay.controller){
			gearDisplay.releaseLock(token);
			this.checkGearDisplay();
		}
	}

	__proto.checkGearDisplay=function(){
		if(this._handlingController)
			return;
		var connected=this._gears[0]==null || (this._gears[0]).connected;
		if(connected!=this._internalVisible){
			this._internalVisible=connected;
			if(this._parent)
				this._parent.childStateChanged(this);
		}
	}

	__proto.addRelation=function(target,relationType,usePercent){
		(usePercent===void 0)&& (usePercent=false);
		this._relations.add(target,relationType,usePercent);
	}

	__proto.removeRelation=function(target,relationType){
		(relationType===void 0)&& (relationType=0);
		this._relations.remove(target,relationType);
	}

	__proto.removeFromParent=function(){
		if (this._parent)
			this._parent.removeChild(this);
	}

	__proto.dispose=function(){
		this.removeFromParent();
		this._relations.dispose();
		this._displayObject.destroy();
		this._displayObject=null;
	}

	__proto.onClick=function(thisObj,listener,args){
		this.on("click",thisObj,listener,args);
	}

	__proto.offClick=function(thisObj,listener){
		this.off("click",thisObj,listener);
	}

	__proto.hasClickListener=function(){
		return this._displayObject.hasListener("click");
	}

	__proto.on=function(type,thisObject,listener,args){
		this._displayObject.on(type,thisObject,listener,args);
	}

	__proto.off=function(type,thisObject,listener){
		this._displayObject.off(type,thisObject,listener);
	}

	__proto.startDrag=function(touchPointID){
		(touchPointID===void 0)&& (touchPointID=-1);
		if (this._displayObject.stage==null)
			return;
		this.dragBegin();
	}

	__proto.stopDrag=function(){
		this.dragEnd();
	}

	__proto.localToGlobal=function(ax,ay,resultPoint){
		(ax===void 0)&& (ax=0);
		(ay===void 0)&& (ay=0);
		if(this._pivotAsAnchor){
			ax+=this._pivotX*this._width;
			ay+=this._pivotY*this._height;
		}
		if(!resultPoint){
			resultPoint=fairygui.GObject.sHelperPoint;
			resultPoint.x=ax;
			resultPoint.y=ay;
			return this._displayObject.localToGlobal(resultPoint,true);
		}
		else{
			resultPoint.x=ax;
			resultPoint.y=ay;
			return this._displayObject.localToGlobal(resultPoint,false);
		}
	}

	__proto.globalToLocal=function(ax,ay,resultPoint){
		(ax===void 0)&& (ax=0);
		(ay===void 0)&& (ay=0);
		if(!resultPoint){
			resultPoint=fairygui.GObject.sHelperPoint;
			resultPoint.x=ax;
			resultPoint.y=ay;
			resultPoint=this._displayObject.globalToLocal(resultPoint,true);
		}
		else{
			resultPoint.x=ax;
			resultPoint.y=ay;
			this._displayObject.globalToLocal(resultPoint,false);
		}
		if(this._pivotAsAnchor){
			resultPoint.x-=this._pivotX*this._width;
			resultPoint.y-=this._pivotY*this._height;
		}
		return resultPoint;
	}

	__proto.localToGlobalRect=function(ax,ay,aWidth,aHeight,resultRect){
		(ax===void 0)&& (ax=0);
		(ay===void 0)&& (ay=0);
		(aWidth===void 0)&& (aWidth=0);
		(aHeight===void 0)&& (aHeight=0);
		if(resultRect==null)
			resultRect=new Rectangle();
		var pt=this.localToGlobal(ax,ay);
		resultRect.x=pt.x;
		resultRect.y=pt.y;
		pt=this.localToGlobal(ax+aWidth,ay+aHeight);
		resultRect.width=pt.x-resultRect.x;
		resultRect.height=pt.y-resultRect.y;
		return resultRect;
	}

	__proto.globalToLocalRect=function(ax,ay,aWidth,aHeight,resultRect){
		(ax===void 0)&& (ax=0);
		(ay===void 0)&& (ay=0);
		(aWidth===void 0)&& (aWidth=0);
		(aHeight===void 0)&& (aHeight=0);
		if(resultRect==null)
			resultRect=new Rectangle();
		var pt=this.globalToLocal(ax,ay);
		resultRect.x=pt.x;
		resultRect.y=pt.y;
		pt=this.globalToLocal(ax+aWidth,ay+aHeight);
		resultRect.width=pt.x-resultRect.x;
		resultRect.height=pt.y-resultRect.y;
		return resultRect;
	}

	__proto.handleControllerChanged=function(c){
		this._handlingController=true;
		for (var i=0;i < 8;i++){
			var gear=this._gears[i];
			if (gear !=null && gear.controller==c)
				gear.apply();
		}
		this._handlingController=false;
		this.checkGearDisplay();
	}

	__proto.createDisplayObject=function(){
		this._displayObject=new Sprite();
		this._displayObject["$owner"]=this;
	}

	__proto.handleXYChanged=function(){
		var xv=this._x;
		var yv=this._y+this._yOffset;
		if(this._pivotAsAnchor){
			xv-=this._pivotX*this._width;
			yv-=this._pivotY*this._height;
		}
		if(this._pixelSnapping){
			xv=Math.round(xv);
			yv=Math.round(yv);
		}
		this._displayObject.pos(xv+this._pivotOffsetX,yv+this._pivotOffsetY);
	}

	__proto.handleSizeChanged=function(){
		if(this._displayObject!=null){
			if(this._sizeImplType==0 || this.sourceWidth==0 || this.sourceHeight==0)
				this._displayObject.size(this._width,this._height);
			else
			this._displayObject.scale(this._width/this.sourceWidth*this._scaleX,
			this._height/this.sourceHeight*this._scaleY);
		}
	}

	__proto.handleScaleChanged=function(){
		if(this._displayObject!=null){
			if(this._sizeImplType==0 || this.sourceWidth==0 || this.sourceHeight==0)
				this._displayObject.scale(this._scaleX,this._scaleY);
			else
			this._displayObject.scale(this._width/this.sourceWidth*this._scaleX,
			this._height/this.sourceHeight*this._scaleY);
		}
	}

	__proto.handleGrayedChanged=function(){
		if(this._displayObject){
			if(this._grayed){
				if(GObject.grayFilter==null)
					GObject.grayFilter=new ColorFilter([0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0.3086,0.6094,0.082,0,0,0,0,0,1,0]);
				this._displayObject.filters=[GObject.grayFilter];
			}
			else
			this._displayObject.filters=null;
		}
	}

	__proto.handleAlphaChanged=function(){
		if(this._displayObject)
			this._displayObject.alpha=this._alpha;
	}

	__proto.handleVisibleChanged=function(){
		if(this._displayObject)
			this._displayObject.visible=this.internalVisible2;
	}

	__proto.constructFromResource=function(){}
	__proto.setup_beforeAdd=function(buffer,beginPos){
		buffer.seek(beginPos,0);
		buffer.skip(5);
		var f1=NaN;
		var f2=NaN;
		this._id=buffer.readS();
		this._name=buffer.readS();
		f1=buffer.getInt32();
		f2=buffer.getInt32();
		this.setXY(f1,f2);
		if (buffer.readBool()){
			this.initWidth=buffer.getInt32();
			this.initHeight=buffer.getInt32();
			this.setSize(this.initWidth,this.initHeight,true);
		}
		if (buffer.readBool()){
			this.minWidth=buffer.getInt32();
			this.maxWidth=buffer.getInt32();
			this.minHeight=buffer.getInt32();
			this.maxHeight=buffer.getInt32();
		}
		if (buffer.readBool()){
			f1=buffer.getFloat32();
			f2=buffer.getFloat32();
			this.setScale(f1,f2);
		}
		if (buffer.readBool()){
			f1=buffer.getFloat32();
			f2=buffer.getFloat32();
			this.setSkew(f1,f2);
		}
		if (buffer.readBool()){
			f1=buffer.getFloat32();
			f2=buffer.getFloat32();
			this.setPivot(f1,f2,buffer.readBool());
		}
		f1=buffer.getFloat32();
		if (f1 !=1)
			this.alpha=f1;
		f1=buffer.getFloat32();
		if (f1 !=0)
			this.rotation=f1;
		if (!buffer.readBool())
			this.visible=false;
		if (!buffer.readBool())
			this.touchable=false;
		if (buffer.readBool())
			this.grayed=true;
		var bm=buffer.readByte();
		if(bm==2)
			this.blendMode="lighter";
		var filter=buffer.readByte();
		if (filter==1){
			var cm=new ColorMatrix();
			cm.adjustBrightness(buffer.getFloat32());
			cm.adjustContrast(buffer.getFloat32());
			cm.adjustSaturation(buffer.getFloat32());
			cm.adjustHue(buffer.getFloat32());
			var cf=new ColorFilter(cm);
			this.filters=[cf];
		};
		var str=buffer.readS();
		if (str !=null)
			this.data=str;
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		buffer.seek(beginPos,1);
		var str=buffer.readS();
		if (str !=null)
			this.tooltips=str;
		var groupId=buffer.getInt16();
		if (groupId >=0)
			this.group=this.parent.getChildAt(groupId);
		buffer.seek(beginPos,2);
		var cnt=buffer.getInt16();
		for (var i=0;i < cnt;i++){
			var nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			var gear=this.getGear(buffer.readByte());
			gear.setup(buffer);
			buffer.pos=nextPos;
		}
	}

	__proto.initDrag=function(){
		if (this._draggable)
			this.on("mousedown",this,this.__begin);
		else
		this.off("mousedown",this,this.__begin);
	}

	__proto.dragBegin=function(){
		if (fairygui.GObject.draggingObject !=null)
			fairygui.GObject.draggingObject.stopDrag();
		fairygui.GObject.sGlobalDragStart.x=Laya.stage.mouseX;
		fairygui.GObject.sGlobalDragStart.y=Laya.stage.mouseY;
		this.localToGlobalRect(0,0,this.width,this.height,fairygui.GObject.sGlobalRect);
		fairygui.GObject.draggingObject=this;
		Laya.stage.on("mousemove",this,this.__moving2);
		Laya.stage.on("mouseup",this,this.__end2);
	}

	__proto.dragEnd=function(){
		if (fairygui.GObject.draggingObject==this){
			Laya.stage.off("mousemove",this,this.__moving2);
			Laya.stage.off("mouseup",this,this.__end2);
			fairygui.GObject.draggingObject=null;
		}
		fairygui.GObject.sDraggingQuery=false;
	}

	__proto.reset=function(){
		Laya.stage.off("mousemove",this,this.__moving);
		Laya.stage.off("mouseup",this,this.__end);
	}

	__proto.__begin=function(){
		if(this._touchDownPoint==null)
			this._touchDownPoint=new Point();
		this._touchDownPoint.x=Laya.stage.mouseX;
		this._touchDownPoint.y=Laya.stage.mouseY;
		Laya.stage.on("mousemove",this,this.__moving);
		Laya.stage.on("mouseup",this,this.__end);
	}

	__proto.__end=function(){
		this.reset();
	}

	__proto.__moving=function(evt){
		var sensitivity=UIConfig$1.touchDragSensitivity;
		if(this._touchDownPoint !=null
			&& Math.abs(this._touchDownPoint.x-Laya.stage.mouseX)< sensitivity
		&& Math.abs(this._touchDownPoint.y-Laya.stage.mouseY)< sensitivity)
		return;
		this.reset();
		fairygui.GObject.sDraggingQuery=true;
		Events.dispatch("fui_drag_start",this._displayObject,evt);
		if (fairygui.GObject.sDraggingQuery)
			this.dragBegin();
	}

	__proto.__moving2=function(evt){
		var xx=Laya.stage.mouseX-fairygui.GObject.sGlobalDragStart.x+fairygui.GObject.sGlobalRect.x;
		var yy=Laya.stage.mouseY-fairygui.GObject.sGlobalDragStart.y+fairygui.GObject.sGlobalRect.y;
		if(this._dragBounds !=null){
			var rect=GRoot.inst.localToGlobalRect(this._dragBounds.x,this._dragBounds.y,
			this._dragBounds.width,this._dragBounds.height,fairygui.GObject.sDragHelperRect);
			if(xx < rect.x)
				xx=rect.x;
			else if(xx+fairygui.GObject.sGlobalRect.width > rect.right){
				xx=rect.right-fairygui.GObject.sGlobalRect.width;
				if(xx < rect.x)
					xx=rect.x;
			}
			if(yy < rect.y)
				yy=rect.y;
			else if(yy+fairygui.GObject.sGlobalRect.height > rect.bottom){
				yy=rect.bottom-fairygui.GObject.sGlobalRect.height;
				if(yy < rect.y)
					yy=rect.y;
			}
		}
		GObject.sUpdateInDragging=true;
		var pt=this.parent.globalToLocal(xx,yy,fairygui.GObject.sHelperPoint);
		this.setXY(Math.round(pt.x),Math.round(pt.y));
		GObject.sUpdateInDragging=false;
		Events.dispatch("fui_drag_move",this._displayObject,evt);
	}

	__proto.__end2=function(evt){
		if (fairygui.GObject.draggingObject==this){
			this.stopDrag();
			Events.dispatch("fui_drag_end",this._displayObject,evt);
		}
	}

	__getset(0,__proto,'dragging',function(){
		return fairygui.GObject.draggingObject==this;
	});

	__getset(0,__proto,'draggable',function(){
		return this._draggable;
		},function(value){
		if (this._draggable !=value){
			this._draggable=value;
			this.initDrag();
		}
	});

	__getset(0,__proto,'icon',function(){
		return null;
		},function(value){
	});

	__getset(0,__proto,'text',function(){
		return null;
		},function(value){
	});

	__getset(0,__proto,'asMovieClip',function(){
		return this;
	});

	__getset(0,__proto,'asComboBox',function(){
		return this;
	});

	__getset(0,__proto,'asGraph',function(){
		return this;
	});

	__getset(0,__proto,'asTextInput',function(){
		return this;
	});

	__getset(0,__proto,'asRichTextField',function(){
		return this;
	});

	__getset(0,__proto,'asTextField',function(){
		return this;
	});

	__getset(0,__proto,'asProgress',function(){
		return this;
	});

	__getset(0,__proto,'actualWidth',function(){
		return this.width *Math.abs(this._scaleX);
	});

	__getset(0,__proto,'scaleY',function(){
		return this._scaleY;
		},function(value){
		this.setScale(this._scaleX,value);
	});

	__getset(0,__proto,'asButton',function(){
		return this;
	});

	__getset(0,__proto,'parent',function(){
		return this._parent;
		},function(val){
		this._parent=val;
	});

	__getset(0,__proto,'gearXY',function(){
		return (this.getGear(1));
	});

	__getset(0,__proto,'actualHeight',function(){
		return this.height *Math.abs(this._scaleY);
	});

	__getset(0,__proto,'group',function(){
		return this._group;
		},function(value){
		if (this._group !=value){
			if (this._group !=null)
				this._group.setBoundsChangedFlag(true);
			this._group=value;
			if (this._group !=null)
				this._group.setBoundsChangedFlag(true);
		}
	});

	__getset(0,__proto,'asSlider',function(){
		return this;
	});

	__getset(0,__proto,'filters',function(){
		return this._displayObject.filters;
		},function(value){
		this._displayObject.filters=value;
	});

	__getset(0,__proto,'tooltips',function(){
		return this._tooltips;
		},function(value){
		if(this._tooltips){
			this.off("mouseover",this,this.__rollOver);
			this.off("mouseout",this,this.__rollOut);
		}
		this._tooltips=value;
		if(this._tooltips){
			this.on("mouseover",this,this.__rollOver);
			this.on("mouseout",this,this.__rollOut);
		}
	});

	__getset(0,__proto,'width',function(){
		this.ensureSizeCorrect();
		if(this._relations.sizeDirty)
			this._relations.ensureRelationsSizeCorrect();
		return this._width;
		},function(value){
		this.setSize(value,this._rawHeight);
	});

	__getset(0,__proto,'normalizeRotation',function(){
		var rot=this._rotation % 360;
		if(rot > 180)
			rot=rot-360;
		else if(rot <-180)
		rot=360+rot;
		return rot;
	});

	__getset(0,__proto,'blendMode',function(){
		return this._displayObject.blendMode;
		},function(value){
		this._displayObject.blendMode=value;
	});

	__getset(0,__proto,'focusable',function(){
		return this._focusable;
		},function(value){
		this._focusable=value;
	});

	__getset(0,__proto,'asLoader',function(){
		return this;
	});

	__getset(0,__proto,'sortingOrder',function(){
		return this._sortingOrder;
		},function(value){
		if (value < 0)
			value=0;
		if (this._sortingOrder !=value){
			var old=this._sortingOrder;
			this._sortingOrder=value;
			if (this._parent !=null)
				this._parent.childSortingOrderChanged(this,old,this._sortingOrder);
		}
	});

	__getset(0,__proto,'resourceURL',function(){
		if (this.packageItem !=null)
			return "ui://"+this.packageItem.owner.id+this.packageItem.id;
		else
		return null;
	});

	__getset(0,__proto,'alpha',function(){
		return this._alpha;
		},function(value){
		if(this._alpha!=value){
			this._alpha=value;
			this.handleAlphaChanged();
			this.updateGear(3);
		}
	});

	__getset(0,__proto,'asGroup',function(){
		return this;
	});

	__getset(0,__proto,'rotation',function(){
		return this._rotation;
		},function(value){
		if(this._rotation !=value){
			this._rotation=value;
			if(this._displayObject!=null){
				this._displayObject.rotation=this.normalizeRotation;
				this.applyPivot();
			}
			this.updateGear(3);
		}
	});

	__getset(0,__proto,'height',function(){
		this.ensureSizeCorrect();
		if(this._relations.sizeDirty)
			this._relations.ensureRelationsSizeCorrect();
		return this._height;
		},function(value){
		this.setSize(this._rawWidth,value);
	});

	__getset(0,__proto,'asCom',function(){
		return this;
	});

	__getset(0,__proto,'grayed',function(){
		return this._grayed;
		},function(value){
		if(this._grayed !=value){
			this._grayed=value;
			this.handleGrayedChanged();
			this.updateGear(3);
		}
	});

	__getset(0,__proto,'asLabel',function(){
		return this;
	});

	__getset(0,__proto,'pivotY',function(){
		return this._pivotY;
		},function(value){
		this.setPivot(this._pivotX,value);
	});

	__getset(0,__proto,'visible',function(){
		return this._visible;
		},function(value){
		if (this._visible !=value){
			this._visible=value;
			this.handleVisibleChanged();
			if (this._parent)
				this._parent.setBoundsChangedFlag();
		}
	});

	__getset(0,__proto,'root',function(){
		if((this instanceof fairygui.GRoot ))
			return (this);
		var p=this._parent;
		while (p){
			if ((p instanceof fairygui.GRoot ))
				return (p);
			p=p.parent;
		}
		return GRoot.inst;
	});

	__getset(0,__proto,'internalVisible2',function(){
		return this._visible && (!this._group || this._group.internalVisible2);
	});

	__getset(0,__proto,'displayObject',function(){
		return this._displayObject;
	});

	__getset(0,__proto,'skewX',function(){
		return this._skewX;
		},function(value){
		this.setSkew(value,this._skewY);
	});

	__getset(0,__proto,'dragBounds',function(){
		return this._dragBounds;
		},function(value){
		this._dragBounds=value;
	});

	__getset(0,__proto,'enabled',function(){
		return !this._grayed && this._touchable;
		},function(value){
		this.grayed=!value;
		this.touchable=value;
	});

	__getset(0,__proto,'relations',function(){
		return this._relations;
	});

	__getset(0,__proto,'inContainer',function(){
		return this._displayObject !=null && this._displayObject.parent !=null;
	});

	__getset(0,__proto,'asImage',function(){
		return this;
	});

	__getset(0,__proto,'yMin',function(){
		return this._pivotAsAnchor ? (this._y-this._height *this._pivotY):this._y;
		},function(value){
		if (this._pivotAsAnchor)
			this.setXY(this._x,value+this._height *this._pivotY);
		else
		this.setXY(this._x,value);
	});

	__getset(0,__proto,'touchable',function(){
		return this._touchable;
		},function(value){
		if(this._touchable!=value){
			this._touchable=value;
			this.updateGear(3);
			if(((this instanceof fairygui.GImage ))|| ((this instanceof fairygui.GMovieClip ))
				|| ((this instanceof fairygui.GTextField ))&& !((this instanceof fairygui.GTextInput ))&& !((this instanceof fairygui.GRichTextField )))
			return;
			if(this._displayObject !=null)
				this._displayObject.mouseEnabled=this._touchable;
		}
	});

	__getset(0,__proto,'pivotAsAnchor',function(){
		return this._pivotAsAnchor;
	});

	__getset(0,__proto,'onStage',function(){
		return this._displayObject !=null && this._displayObject.stage !=null;
	});

	__getset(0,__proto,'internalVisible',function(){
		return this._internalVisible && (!this._group || this._group.internalVisible)
		&& !this._displayObject._$P["maskParent"];
	});

	__getset(0,__proto,'skewY',function(){
		return this._skewY;
		},function(value){
		this.setSkew(this._skewX,value);
	});

	__getset(0,__proto,'pivotX',function(){
		return this._pivotX;
		},function(value){
		this.setPivot(value,this._pivotY);
	});

	__getset(0,__proto,'y',function(){
		return this._y;
		},function(value){
		this.setXY(this._x,value);
	});

	__getset(0,__proto,'gearSize',function(){
		return (this.getGear(2));
	});

	__getset(0,__proto,'asList',function(){
		return this;
	});

	__getset(0,__proto,'scaleX',function(){
		return this._scaleX;
		},function(value){
		this.setScale(value,this._scaleY);
	});

	__getset(0,__proto,'pixelSnapping',function(){
		return this._pixelSnapping;
		},function(value){
		if(this._pixelSnapping!=value){
			this._pixelSnapping=value;
			this.handleXYChanged();
		}
	});

	__getset(0,__proto,'gearLook',function(){
		return (this.getGear(3));
	});

	__getset(0,__proto,'x',function(){
		return this._x;
		},function(value){
		this.setXY(value,this._y);
	});

	__getset(0,__proto,'focused',function(){
		return this.root.focus==this;
	});

	__getset(0,__proto,'name',function(){
		return this._name;
		},function(value){
		this._name=value;
	});

	__getset(0,__proto,'xMin',function(){
		return this._pivotAsAnchor ? (this._x-this._width *this._pivotX):this._x;
		},function(value){
		if (this._pivotAsAnchor)
			this.setXY(value+this._width *this._pivotX,this._y);
		else
		this.setXY(value,this._y);
	});

	__getset(0,__proto,'id',function(){
		return this._id;
	});

	GObject.cast=function(sprite){
		return (sprite["$owner"]);
	}

	GObject.draggingObject=null;
	GObject._gInstanceCounter=0;
	GObject.grayFilter=null;
	GObject.sDraggingQuery=false;
	GObject.sUpdateInDragging=false;
	__static(GObject,
	['sGlobalDragStart',function(){return this.sGlobalDragStart=new Point();},'sGlobalRect',function(){return this.sGlobalRect=new Rectangle();},'sHelperPoint',function(){return this.sHelperPoint=new Point();},'sDragHelperRect',function(){return this.sDragHelperRect=new Rectangle();}
	]);
	return GObject;
})()


/**
*Use for GList.selectionMode
*/
//class fairygui.ListSelectionMode
var ListSelectionMode=(function(){
	function ListSelectionMode(){}
	__class(ListSelectionMode,'fairygui.ListSelectionMode');
	ListSelectionMode.Single=0;
	ListSelectionMode.Multiple=1;
	ListSelectionMode.Multiple_SingleClick=2;
	ListSelectionMode.None=3;
	return ListSelectionMode;
})()


//class fairygui.UIConfig
var UIConfig$1=(function(){
	function UIConfig(){}
	__class(UIConfig,'fairygui.UIConfig',null,'UIConfig$1');
	UIConfig.defaultFont="SimSun";
	UIConfig.windowModalWaiting=null;
	UIConfig.globalModalWaiting=null;
	UIConfig.modalLayerColor="rgba(33,33,33,0.2)";
	UIConfig.buttonSound=null;
	UIConfig.buttonSoundVolumeScale=1;
	UIConfig.horizontalScrollBar=null;
	UIConfig.verticalScrollBar=null;
	UIConfig.defaultScrollStep=25;
	UIConfig.defaultScrollDecelerationRate=0.967;
	UIConfig.defaultScrollBarDisplay=1;
	UIConfig.defaultScrollTouchEffect=true;
	UIConfig.defaultScrollBounceEffect=true;
	UIConfig.popupMenu=null;
	UIConfig.popupMenu_seperator=null;
	UIConfig.loaderErrorSign=null;
	UIConfig.tooltipsWin=null;
	UIConfig.defaultComboBoxVisibleItemCount=10;
	UIConfig.touchScrollSensitivity=20;
	UIConfig.touchDragSensitivity=10;
	UIConfig.clickDragSensitivity=2;
	UIConfig.bringWindowToFrontOnClick=true;
	UIConfig.frameTimeForAsyncUIConstruction=2;
	UIConfig.textureLinearSampling=true;
	UIConfig.packageFileExtension="fui";
	return UIConfig;
})()


//class fairygui.tween.TweenManager
var TweenManager=(function(){
	function TweenManager(){}
	__class(TweenManager,'fairygui.tween.TweenManager');
	TweenManager.createTween=function(){
		if (!TweenManager._inited){
			Laya.timer.frameLoop(1,null,TweenManager.update);
			TweenManager._inited=true;
		};
		var tweener;
		var cnt=TweenManager._tweenerPool.length;
		if (cnt > 0){
			tweener=TweenManager._tweenerPool.pop();
		}
		else
		tweener=new GTweener();
		tweener._init();
		TweenManager._activeTweens[TweenManager._totalActiveTweens++]=tweener;
		if (TweenManager._totalActiveTweens==TweenManager._activeTweens.length)
			TweenManager._activeTweens.length=TweenManager._activeTweens.length+Math.ceil(TweenManager._activeTweens.length *0.5);
		return tweener;
	}

	TweenManager.isTweening=function(target,propType){
		if (target==null)
			return false;
		var anyType=propType==null;
		for (var i=0;i < TweenManager._totalActiveTweens;i++){
			var tweener=TweenManager._activeTweens[i];
			if (tweener !=null && tweener.target==target && !tweener._killed
				&& (anyType || tweener._propType==propType))
			return true;
		}
		return false;
	}

	TweenManager.killTweens=function(target,completed,propType){
		if (target==null)
			return false;
		var flag=false;
		var cnt=TweenManager._totalActiveTweens;
		var anyType=propType==null;
		for (var i=0;i < cnt;i++){
			var tweener=TweenManager._activeTweens[i];
			if (tweener !=null && tweener.target==target && !tweener._killed
				&& (anyType || tweener._propType==propType)){
				tweener.kill(completed);
				flag=true;
			}
		}
		return flag;
	}

	TweenManager.getTween=function(target,propType){
		if (target==null)
			return null;
		var cnt=TweenManager._totalActiveTweens;
		var anyType=propType==null;
		for (var i=0;i < cnt;i++){
			var tweener=TweenManager._activeTweens[i];
			if (tweener !=null && tweener.target==target && !tweener._killed
				&& (anyType || tweener._propType==propType)){
				return tweener;
			}
		}
		return null;
	}

	TweenManager.update=function(){
		var dt=Laya.timer.delta/1000;
		var cnt=TweenManager._totalActiveTweens;
		var freePosStart=-1;
		var freePosCount=0;
		for (var i=0;i < cnt;i++){
			var tweener=TweenManager._activeTweens[i];
			if (tweener==null){
				if (freePosStart==-1)
					freePosStart=i;
				freePosCount++;
			}
			else if (tweener._killed){
				tweener._reset();
				TweenManager._tweenerPool.push(tweener);
				TweenManager._activeTweens[i]=null;
				if (freePosStart==-1)
					freePosStart=i;
				freePosCount++;
			}
			else{
				if(!tweener._paused)
					tweener._update(dt);
				if (freePosStart !=-1){
					TweenManager._activeTweens[freePosStart]=tweener;
					TweenManager._activeTweens[i]=null;
					freePosStart++;
				}
			}
		}
		if (freePosStart >=0){
			if (TweenManager._totalActiveTweens !=cnt){
				var j=cnt;
				cnt=TweenManager._totalActiveTweens-cnt;
				for (i=0;i < cnt;i++)
				TweenManager._activeTweens[freePosStart++]=TweenManager._activeTweens[j++];
			}
			TweenManager._totalActiveTweens=freePosStart;
		}
	}

	TweenManager._tweenerPool=[];
	TweenManager._totalActiveTweens=0;
	TweenManager._inited=false;
	__static(TweenManager,
	['_activeTweens',function(){return this._activeTweens=new Array(30);}
	]);
	return TweenManager;
})()


//class fairygui.tween.TweenValue
var TweenValue=(function(){
	function TweenValue(){
		this.x=NaN;
		this.y=NaN;
		this.z=NaN;
		this.w=NaN;
		this.x=this.y=this.z=this.w=0;
	}

	__class(TweenValue,'fairygui.tween.TweenValue');
	var __proto=TweenValue.prototype;
	__proto.getField=function(index){
		switch (index){
			case 0:
				return this.x;
			case 1:
				return this.y;
			case 2:
				return this.z;
			case 3:
				return this.w;
			default :
				throw new Error("Index out of bounds: "+index);
			}
	}

	__proto.setField=function(index,value){
		switch (index){
			case 0:
				this.x=value;
				break ;
			case 1:
				this.y=value;
				break ;
			case 2:
				this.z=value;
				break ;
			case 3:
				this.w=value;
				break ;
			default :
				throw new Error("Index out of bounds: "+index);
			}
	}

	__proto.setZero=function(){
		this.x=this.y=this.z=this.w=0;
	}

	__getset(0,__proto,'color',function(){
		return (this.w<<24)+(this.x<<16)+(this.y<<8)+this.z;
		},function(value){
		this.x=(value & 0xFF0000)>>16;
		this.y=(value & 0x00FF00)>>8;
		this.z=(value & 0x0000FF);
		this.w=(value & 0xFF000000)>>24;
	});

	return TweenValue;
})()


//class fairygui.tween.GTween
var GTween=(function(){
	function GTween(){}
	__class(GTween,'fairygui.tween.GTween');
	GTween.to=function(start,end,duration){
		return TweenManager.createTween()._to(start,end,duration);
	}

	GTween.to2=function(start,start2,end,end2,duration){
		return TweenManager.createTween()._to2(start,start2,end,end2,duration);
	}

	GTween.to3=function(start,start2,start3,end,end2,end3,duration){
		return TweenManager.createTween()._to3(start,start2,start3,end,end2,end3,duration);
	}

	GTween.to4=function(start,start2,start3,start4,end,end2,end3,end4,duration){
		return TweenManager.createTween()._to4(start,start2,start3,start4,end,end2,end3,end4,duration);
	}

	GTween.toColor=function(start,end,duration){
		return TweenManager.createTween()._toColor(start,end,duration);
	}

	GTween.delayedCall=function(delay){
		return TweenManager.createTween().setDelay(delay);
	}

	GTween.shake=function(startX,startY,amplitude,duration){
		return TweenManager.createTween()._shake(startX,startY,amplitude,duration);
	}

	GTween.isTweening=function(target,propType){
		return TweenManager.isTweening(target,propType);
	}

	GTween.kill=function(target,complete,propType){
		(complete===void 0)&& (complete=false);
		TweenManager.killTweens(target,false,null);
	}

	GTween.getTween=function(target,propType){
		return TweenManager.getTween(target,propType);
	}

	GTween.catchCallbackExceptions=true;
	return GTween;
})()


//class fairygui.tween.EaseManager
var EaseManager=(function(){
	var Bounce;
	function EaseManager(){}
	__class(EaseManager,'fairygui.tween.EaseManager');
	EaseManager.evaluate=function(easeType,time,duration,overshootOrAmplitude,period){
		switch (easeType){
			case 0:
				return time / duration;
			case 1:
				return-Math.cos(time / duration *EaseManager._PiOver2)+1;
			case 2:
				return Math.sin(time / duration *EaseManager._PiOver2);
			case 3:
				return-0.5 *(Math.cos(Math.PI *time / duration)-1);
			case 4:
				return (time /=duration)*time;
			case 5:
				return-(time /=duration)*(time-2);
			case 6:
				if ((time /=duration *0.5)< 1)return 0.5 *time *time;
				return-0.5 *((--time)*(time-2)-1);
			case 7:
				return (time /=duration)*time *time;
			case 8:
				return ((time=time / duration-1)*time *time+1);
			case 9:
				if ((time /=duration *0.5)< 1)return 0.5 *time *time *time;
				return 0.5 *((time-=2)*time *time+2);
			case 10:
				return (time /=duration)*time *time *time;
			case 11:
				return-((time=time / duration-1)*time *time *time-1);
			case 12:
				if ((time /=duration *0.5)< 1)return 0.5 *time *time *time *time;
				return-0.5 *((time-=2)*time *time *time-2);
			case 13:
				return (time /=duration)*time *time *time *time;
			case 14:
				return ((time=time / duration-1)*time *time *time *time+1);
			case 15:
				if ((time /=duration *0.5)< 1)return 0.5 *time *time *time *time *time;
				return 0.5 *((time-=2)*time *time *time *time+2);
			case 16:
				return (time==0)? 0 :Math.pow(2,10 *(time / duration-1));
			case 17:
				if (time==duration)return 1;
				return (-Math.pow(2,-10 *time / duration)+1);
			case 18:
				if (time==0)return 0;
				if (time==duration)return 1;
				if ((time /=duration *0.5)< 1)return 0.5 *Math.pow(2,10 *(time-1));
				return 0.5 *(-Math.pow(2,-10 *--time)+2);
			case 19:
				return-(Math.sqrt(1-(time /=duration)*time)-1);
			case 20:
				return Math.sqrt(1-(time=time / duration-1)*time);
			case 21:
				if ((time /=duration *0.5)< 1)return-0.5 *(Math.sqrt(1-time *time)-1);
				return 0.5 *(Math.sqrt(1-(time-=2)*time)+1);
			case 22:;
				var s0=NaN;
				if (time==0)return 0;
				if ((time /=duration)==1)return 1;
				if (period==0)period=duration *0.3;
				if (overshootOrAmplitude < 1){
					overshootOrAmplitude=1;
					s0=period / 4;
				}
				else s0=period / EaseManager._TwoPi *Math.asin(1 / overshootOrAmplitude);
				return-(overshootOrAmplitude *Math.pow(2,10 *(time-=1))*Math.sin((time *duration-s0)*EaseManager._TwoPi / period));
			case 23:;
				var s1=NaN;
				if (time==0)return 0;
				if ((time /=duration)==1)return 1;
				if (period==0)period=duration *0.3;
				if (overshootOrAmplitude < 1){
					overshootOrAmplitude=1;
					s1=period / 4;
				}
				else s1=period / EaseManager._TwoPi *Math.asin(1 / overshootOrAmplitude);
				return (overshootOrAmplitude *Math.pow(2,-10 *time)*Math.sin((time *duration-s1)*EaseManager._TwoPi / period)+1);
			case 24:;
				var s=NaN;
				if (time==0)return 0;
				if ((time /=duration *0.5)==2)return 1;
				if (period==0)period=duration *(0.3 *1.5);
				if (overshootOrAmplitude < 1){
					overshootOrAmplitude=1;
					s=period / 4;
				}
				else s=period / EaseManager._TwoPi *Math.asin(1 / overshootOrAmplitude);
				if (time < 1)return-0.5 *(overshootOrAmplitude *Math.pow(2,10 *(time-=1))*Math.sin((time *duration-s)*EaseManager._TwoPi / period));
				return overshootOrAmplitude *Math.pow(2,-10 *(time-=1))*Math.sin((time *duration-s)*EaseManager._TwoPi / period)*0.5+1;
			case 25:
				return (time /=duration)*time *((overshootOrAmplitude+1)*time-overshootOrAmplitude);
			case 26:
				return ((time=time / duration-1)*time *((overshootOrAmplitude+1)*time+overshootOrAmplitude)+1);
			case 27:
				if ((time /=duration *0.5)< 1)return 0.5 *(time *time *(((overshootOrAmplitude *=(1.525))+1)*time-overshootOrAmplitude));
				return 0.5 *((time-=2)*time *(((overshootOrAmplitude *=(1.525))+1)*time+overshootOrAmplitude)+2);
			case 28:
				return Bounce.easeIn(time,duration);
			case 29:
				return Bounce.easeOut(time,duration);
			case 30:
				return Bounce.easeInOut(time,duration);
			default :
				return-(time /=duration)*(time-2);
			}
	}

	__static(EaseManager,
	['_PiOver2',function(){return this._PiOver2=Math.PI *0.5;},'_TwoPi',function(){return this._TwoPi=Math.PI *2;}
	]);
	EaseManager.__init$=function(){
		/// This class contains a C# port of the easing equations created by Robert Penner (http://robertpenner.com/easing).
		//class Bounce
		Bounce=(function(){
			function Bounce(){}
			__class(Bounce,'');
			Bounce.easeIn=function(time,duration){
				return 1-Bounce.easeOut(duration-time,duration);
			}
			Bounce.easeOut=function(time,duration){
				if ((time /=duration)< (1 / 2.75)){
					return (7.5625 *time *time);
				}
				if (time < (2 / 2.75)){
					return (7.5625 *(time-=(1.5 / 2.75))*time+0.75);
				}
				if (time < (2.5 / 2.75)){
					return (7.5625 *(time-=(2.25 / 2.75))*time+0.9375);
				}
				return (7.5625 *(time-=(2.625 / 2.75))*time+0.984375);
			}
			Bounce.easeInOut=function(time,duration){
				if (time < duration *0.5){
					return Bounce.easeIn(time *2,duration)*0.5;
				}
				return Bounce.easeOut(time *2-duration,duration)*0.5+0.5;
			}
			return Bounce;
		})()
	}

	return EaseManager;
})()


//class fairygui.tween.EaseType
var EaseType=(function(){
	function EaseType(){}
	__class(EaseType,'fairygui.tween.EaseType');
	EaseType.Linear=0;
	EaseType.SineIn=1;
	EaseType.SineOut=2;
	EaseType.SineInOut=3;
	EaseType.QuadIn=4;
	EaseType.QuadOut=5;
	EaseType.QuadInOut=6;
	EaseType.CubicIn=7;
	EaseType.CubicOut=8;
	EaseType.CubicInOut=9;
	EaseType.QuartIn=10;
	EaseType.QuartOut=11;
	EaseType.QuartInOut=12;
	EaseType.QuintIn=13;
	EaseType.QuintOut=14;
	EaseType.QuintInOut=15;
	EaseType.ExpoIn=16;
	EaseType.ExpoOut=17;
	EaseType.ExpoInOut=18;
	EaseType.CircIn=19;
	EaseType.CircOut=20;
	EaseType.CircInOut=21;
	EaseType.ElasticIn=22;
	EaseType.ElasticOut=23;
	EaseType.ElasticInOut=24;
	EaseType.BackIn=25;
	EaseType.BackOut=26;
	EaseType.BackInOut=27;
	EaseType.BounceIn=28;
	EaseType.BounceOut=29;
	EaseType.BounceInOut=30;
	EaseType.Custom=31;
	return EaseType;
})()


//class fairygui.tween.GTweener
var GTweener=(function(){
	function GTweener(){
		this._target=null;
		this._propType=null;
		this._killed=false;
		this._paused=false;
		this._delay=NaN;
		this._duration=NaN;
		this._breakpoint=NaN;
		this._easeType=0;
		this._easeOvershootOrAmplitude=NaN;
		this._easePeriod=NaN;
		this._repeat=0;
		this._yoyo=false;
		this._timeScale=NaN;
		this._snapping=false;
		this._userData=null;
		this._onUpdate=null;
		this._onUpdateCaller=null;
		this._onStart=null;
		this._onStartCaller=null;
		this._onComplete=null;
		this._onCompleteCaller=null;
		this._startValue=null;
		this._endValue=null;
		this._value=null;
		this._deltaValue=null;
		this._valueSize=0;
		this._started=false;
		this._ended=0;
		this._elapsedTime=NaN;
		this._normalizedTime=NaN;
		this._startValue=new TweenValue();
		this._endValue=new TweenValue();
		this._value=new TweenValue();
		this._deltaValue=new TweenValue();
		this._reset();
	}

	__class(GTweener,'fairygui.tween.GTweener');
	var __proto=GTweener.prototype;
	__proto.setDelay=function(value){
		this._delay=value;
		return this;
	}

	__proto.setDuration=function(value){
		this._duration=value;
		return this;
	}

	__proto.setBreakpoint=function(value){
		this._breakpoint=value;
		return this;
	}

	__proto.setEase=function(value){
		this._easeType=value;
		return this;
	}

	__proto.setEasePeriod=function(value){
		this._easePeriod=value;
		return this;
	}

	__proto.setEaseOvershootOrAmplitude=function(value){
		this._easeOvershootOrAmplitude=value;
		return this;
	}

	__proto.setRepeat=function(repeat,yoyo){
		(yoyo===void 0)&& (yoyo=false);
		this._repeat=repeat;
		this._yoyo=yoyo;
		return this;
	}

	__proto.setTimeScale=function(value){
		this._timeScale=value;
		return this;
	}

	__proto.setSnapping=function(value){
		this._snapping=value;
		return this;
	}

	__proto.setTarget=function(value,propType){
		this._target=value;
		this._propType=propType;
		return this;
	}

	__proto.setUserData=function(value){
		this._userData=value;
		return this;
	}

	__proto.onUpdate=function(callback,caller){
		this._onUpdate=callback;
		this._onUpdateCaller=caller;
		return this;
	}

	__proto.onStart=function(callback,caller){
		this._onStart=callback;
		this._onStartCaller=caller;
		return this;
	}

	__proto.onComplete=function(callback,caller){
		this._onComplete=callback;
		this._onCompleteCaller=caller;
		return this;
	}

	__proto.setPaused=function(paused){
		this._paused=paused;
		return this;
	}

	/**
	*seek position of the tween,in seconds.
	*/
	__proto.seek=function(time){
		if (this._killed)
			return;
		this._elapsedTime=time;
		if (this._elapsedTime < this._delay){
			if (this._started)
				this._elapsedTime=this._delay;
			else
			return;
		}
		this.update();
	}

	__proto.kill=function(complete){
		(complete===void 0)&& (complete=false);
		if (this._killed)
			return;
		if (complete){
			if (this._ended==0){
				if (this._breakpoint >=0)
					this._elapsedTime=this._delay+this._breakpoint;
				else if (this._repeat >=0)
				this._elapsedTime=this._delay+this._duration *(this._repeat+1);
				else
				this._elapsedTime=this._delay+this._duration *2;
				this.update();
			}
			this.callCompleteCallback();
		}
		this._killed=true;
	}

	__proto._to=function(start,end,duration){
		this._valueSize=1;
		this._startValue.x=start;
		this._endValue.x=end;
		this._duration=duration;
		return this;
	}

	__proto._to2=function(start,start2,end,end2,duration){
		this._valueSize=2;
		this._startValue.x=start;
		this._endValue.x=end;
		this._startValue.y=start2;
		this._endValue.y=end2;
		this._duration=duration;
		return this;
	}

	__proto._to3=function(start,start2,start3,end,end2,end3,duration){
		this._valueSize=3;
		this._startValue.x=start;
		this._endValue.x=end;
		this._startValue.y=start2;
		this._endValue.y=end2;
		this._startValue.z=start3;
		this._endValue.z=end3;
		this._duration=duration;
		return this;
	}

	__proto._to4=function(start,start2,start3,start4,end,end2,end3,end4,duration){
		this._valueSize=4;
		this._startValue.x=start;
		this._endValue.x=end;
		this._startValue.y=start2;
		this._endValue.y=end2;
		this._startValue.z=start3;
		this._endValue.z=end3;
		this._startValue.w=start4;
		this._endValue.w=end4;
		this._duration=duration;
		return this;
	}

	__proto._toColor=function(start,end,duration){
		this._valueSize=4;
		this._startValue.color=start;
		this._endValue.color=end;
		this._duration=duration;
		return this;
	}

	__proto._shake=function(startX,startY,amplitude,duration){
		this._valueSize=5;
		this._startValue.x=startX;
		this._startValue.y=startY;
		this._startValue.w=amplitude;
		this._duration=duration;
		this._easeType=0;
		return this;
	}

	__proto._init=function(){
		this._delay=0;
		this._duration=0;
		this._breakpoint=-1;
		this._easeType=5;
		this._timeScale=1;
		this._easePeriod=0;
		this._easeOvershootOrAmplitude=1.70158;
		this._snapping=false;
		this._repeat=0;
		this._yoyo=false;
		this._valueSize=0;
		this._started=false;
		this._paused=false;
		this._killed=false;
		this._elapsedTime=0;
		this._normalizedTime=0;
		this._ended=0;
	}

	__proto._reset=function(){
		this._target=null;
		this._userData=null;
		this._onStart=this._onUpdate=this._onComplete=null;
		this._onStartCaller=this._onUpdateCaller=this._onCompleteCaller=null;
	}

	__proto._update=function(dt){
		if (this._timeScale !=1)
			dt *=this._timeScale;
		if (dt==0)
			return;
		if (this._ended !=0){
			this.callCompleteCallback();
			this._killed=true;
			return;
		}
		this._elapsedTime+=dt;
		this.update();
		if (this._ended !=0){
			if (!this._killed){
				this.callCompleteCallback();
				this._killed=true;
			}
		}
	}

	__proto.update=function(){
		this._ended=0;
		if (this._valueSize==0){
			if (this._elapsedTime >=this._delay+this._duration)
				this._ended=1;
			return;
		}
		if (!this._started){
			if (this._elapsedTime < this._delay)
				return;
			this._started=true;
			this.callStartCallback();
			if (this._killed)
				return;
		};
		var reversed=false;
		var tt=this._elapsedTime-this._delay;
		if (this._breakpoint >=0 && tt >=this._breakpoint){
			tt=this._breakpoint;
			this._ended=2;
		}
		if (this._repeat !=0){
			var round=Math.floor(tt / this._duration);
			tt-=this._duration *round;
			if (this._yoyo)
				reversed=round % 2==1;
			if (this._repeat > 0 && this._repeat-round < 0){
				if (this._yoyo)
					reversed=this._repeat % 2==1;
				tt=this._duration;
				this._ended=1;
			}
		}
		else if (tt >=this._duration){
			tt=this._duration;
			this._ended=1;
		}
		this._normalizedTime=EaseManager.evaluate(this._easeType,reversed ? (this._duration-tt):tt,this._duration,
		this._easeOvershootOrAmplitude,this._easePeriod);
		this._value.setZero();
		this._deltaValue.setZero();
		if (this._valueSize==5){
			if (this._ended==0){
				var r=this._startValue.w*(1-this._normalizedTime);
				var rx=(Math.random()*2-1)*r;
				var ry=(Math.random()*2-1)*r;
				rx=rx > 0 ? Math.ceil(rx):Math.floor(rx);
				ry=ry > 0 ? Math.ceil(ry):Math.floor(ry);
				this._deltaValue.x=rx;
				this._deltaValue.y=ry;
				this._value.x=this._startValue.x+rx;
				this._value.y=this._startValue.y+ry;
			}
			else{
				this._value.x=this._startValue.x;
				this._value.y=this._startValue.y;
			}
		}
		else{
			for (var i=0;i < this._valueSize;i++){
				var n1=this._startValue.getField(i);
				var n2=this._endValue.getField(i);
				var f=n1+(n2-n1)*this._normalizedTime;
				if (this._snapping)
					f=Math.round(f);
				this._deltaValue.setField(i,f-this._value.getField(i));
				this._value.setField(i,f);
			}
		}
		if (this._target !=null && this._propType !=null){
			if((typeof this._propType=='function')){
				switch(this._valueSize){
					case 1:
						this._propType.call(this._target,this._value.x);
						break ;
					case 2:
						this._propType.call(this._target,this._value.x,this._value.y);
						break ;
					case 3:
						this._propType.call(this._target,this._value.x,this._value.y,this._value.z);
						break ;
					case 4:
						this._propType.call(this._target,this._value.x,this._value.y,this._value.z,this._value.w);
						break ;
					case 5:
						this._propType.call(this._target,this._value.color);
						break ;
					case 6:
						this._propType.call(this._target,this._value.x,this._value.y);
						break ;
					}
			}
			else{
				if(this._valueSize==5)
					this._target[this._propType]=this._value.color;
				else
				this._target[this._propType]=this._value.x;
			}
		}
		this.callUpdateCallback();
	}

	__proto.callStartCallback=function(){
		if (this._onStart !=null){
			if(GTween.catchCallbackExceptions){
				try{
					this._onStart.call(this._onStartCaller,this);
				}
				catch(err){
					console.log("FairyGUI: error in start callback > "+err.message);
				}
			}
			else
			this._onStart.call(this._onStartCaller,this);
		}
	}

	__proto.callUpdateCallback=function(){
		if (this._onUpdate !=null){
			if(GTween.catchCallbackExceptions){
				try{
					this._onUpdate.call(this._onUpdateCaller,this);
				}
				catch(err){
					console.log("FairyGUI: error in update callback > "+err.message);
				}
			}
			else
			this._onUpdate.call(this._onUpdateCaller,this);
		}
	}

	__proto.callCompleteCallback=function(){
		if (this._onComplete !=null){
			if(GTween.catchCallbackExceptions){
				try{
					this._onComplete.call(this._onCompleteCaller,this);
				}
				catch(err){
					console.log("FairyGUI: error in complete callback > "+err.message);
				}
			}
			else
			this._onComplete.call(this._onCompleteCaller,this);
		}
	}

	__getset(0,__proto,'allCompleted',function(){
		return this._ended==1;
	});

	__getset(0,__proto,'completed',function(){
		return this._ended !=0;
	});

	__getset(0,__proto,'startValue',function(){
		return this._startValue;
	});

	__getset(0,__proto,'normalizedTime',function(){
		return this._normalizedTime;
	});

	__getset(0,__proto,'value',function(){
		return this._value;
	});

	__getset(0,__proto,'endValue',function(){
		return this._endValue;
	});

	__getset(0,__proto,'repeat',function(){
		return this._repeat;
	});

	__getset(0,__proto,'userData',function(){
		return this._userData;
	});

	__getset(0,__proto,'deltaValue',function(){
		return this._deltaValue;
	});

	__getset(0,__proto,'duration',function(){
		return this._duration;
	});

	__getset(0,__proto,'target',function(){
		return this._target;
	});

	__getset(0,__proto,'delay',function(){
		return this._delay;
	});

	return GTweener;
})()


//class fairygui.RelationType
var RelationType=(function(){
	function RelationType(){}
	__class(RelationType,'fairygui.RelationType');
	RelationType.Left_Left=0;
	RelationType.Left_Center=1;
	RelationType.Left_Right=2;
	RelationType.Center_Center=3;
	RelationType.Right_Left=4;
	RelationType.Right_Center=5;
	RelationType.Right_Right=6;
	RelationType.Top_Top=7;
	RelationType.Top_Middle=8;
	RelationType.Top_Bottom=9;
	RelationType.Middle_Middle=10;
	RelationType.Bottom_Top=11;
	RelationType.Bottom_Middle=12;
	RelationType.Bottom_Bottom=13;
	RelationType.Width=14;
	RelationType.Height=15;
	RelationType.LeftExt_Left=16;
	RelationType.LeftExt_Right=17;
	RelationType.RightExt_Left=18;
	RelationType.RightExt_Right=19;
	RelationType.TopExt_Top=20;
	RelationType.TopExt_Bottom=21;
	RelationType.BottomExt_Top=22;
	RelationType.BottomExt_Bottom=23;
	RelationType.Size=24;
	return RelationType;
})()


/**
*Use for GList.layout
*/
//class fairygui.ListLayoutType
var ListLayoutType=(function(){
	function ListLayoutType(){}
	__class(ListLayoutType,'fairygui.ListLayoutType');
	ListLayoutType.SingleColumn=0;
	ListLayoutType.SingleRow=1;
	ListLayoutType.FlowHorizontal=2;
	ListLayoutType.FlowVertical=3;
	ListLayoutType.Pagination=4;
	return ListLayoutType;
})()


/**
*Use for GComboBox.popupDirection
*/
//class fairygui.PopupDirection
var PopupDirection=(function(){
	function PopupDirection(){}
	__class(PopupDirection,'fairygui.PopupDirection');
	PopupDirection.Auto=0;
	PopupDirection.Up=1;
	PopupDirection.Down=2;
	return PopupDirection;
})()


/**
*Use for GProgressBar.titleType and GSlider.titleType
*/
//class fairygui.ProgressTitleType
var ProgressTitleType=(function(){
	function ProgressTitleType(){}
	__class(ProgressTitleType,'fairygui.ProgressTitleType');
	ProgressTitleType.Percent=0;
	ProgressTitleType.ValueAndMax=1;
	ProgressTitleType.Value=2;
	ProgressTitleType.Max=3;
	return ProgressTitleType;
})()


/**
*Use for GButton.mode
*/
//class fairygui.ButtonMode
var ButtonMode=(function(){
	function ButtonMode(){}
	__class(ButtonMode,'fairygui.ButtonMode');
	ButtonMode.Common=0;
	ButtonMode.Check=1;
	ButtonMode.Radio=2;
	return ButtonMode;
})()


/**
*Use for GImage.flip
*/
//class fairygui.FlipType
var FlipType=(function(){
	function FlipType(){}
	__class(FlipType,'fairygui.FlipType');
	FlipType.None=0;
	FlipType.Horizontal=1;
	FlipType.Vertical=2;
	FlipType.Both=3;
	return FlipType;
})()


//class fairygui.TranslationHelper
var TranslationHelper=(function(){
	function TranslationHelper(){}
	__class(TranslationHelper,'fairygui.TranslationHelper');
	TranslationHelper.loadFromXML=function(source){
		TranslationHelper.strings={};
		var xml=Utils.parseXMLFromString(source);
		var resNode=TranslationHelper.findChildNode(xml,"resources");
		var nodes=resNode.childNodes;
		var length1=nodes.length;
		for (var i1=0;i1 < length1;i1++){
			var cxml=nodes[i1];
			if (cxml.nodeName=="string"){
				var key=cxml.getAttribute("name");
				var text=cxml.textContent;
				var i=key.indexOf("-");
				if(i==-1)
					continue ;
				var key2=key.substr(0,i);
				var key3=key.substr(i+1);
				var col=TranslationHelper.strings[key2];
				if(!col){
					col={};
					TranslationHelper.strings[key2]=col;
				}
				col[key3]=text;
			}
		}
	}

	TranslationHelper.translateComponent=function(item){
		if(TranslationHelper.strings==null)
			return;
		var compStrings=TranslationHelper.strings[item.owner.id+item.id];
		if(compStrings==null)
			return;
		var elementId,value;
		var buffer=item.rawData;
		var nextPos=0;
		var itemCount=0;
		var i=0,j=0,k=0;
		var dataLen=0;
		var curPos=0;
		var valueCnt=0;
		var page;
		buffer.seek(0,2);
		var childCount=buffer.getInt16();
		for (i=0;i < childCount;i++){
			dataLen=buffer.getInt16();
			curPos=buffer.pos;
			buffer.seek(curPos,0);
			var type=buffer.readByte();
			buffer.skip(4);
			elementId=buffer.readS();
			if (type==9){
				if (buffer.seek(curPos,6))
					type=buffer.readByte();
			}
			buffer.seek(curPos,1);
			if((value=compStrings[elementId+"-tips"])!=null)
				buffer.writeS(value);
			buffer.seek(curPos,2);
			var gearCnt=buffer.getInt16();
			for (j=0;j < gearCnt;j++){
				nextPos=buffer.getInt16();
				nextPos+=buffer.pos;
				if (buffer.readByte()==6){
					buffer.skip(2);
					valueCnt=buffer.getInt16();
					for (k=0;k < valueCnt;k++){
						page=buffer.readS();
						if (page !=null){
							if((value=compStrings[elementId+"-texts_"+k])!=null)
								buffer.writeS(value);
							else
							buffer.skip(2);
						}
					}
					if (buffer.readBool()&& (value=compStrings[elementId+"-texts_def"])!=null)
						buffer.writeS(value);
				}
				buffer.pos=nextPos;
			}
			switch (type){
				case 6:
				case 7:
				case 8:{
						if ((value=compStrings[elementId])!=null){
							buffer.seek(curPos,6);
							buffer.writeS(value);
						}
						if ((value=compStrings[elementId+"-prompt"])!=null){
							buffer.seek(curPos,4);
							buffer.writeS(value);
						}
						break ;
					}
				case 10:{
						buffer.seek(curPos,8);
						buffer.skip(2);
						itemCount=buffer.getInt16();
						for (j=0;j<itemCount;j++){
							nextPos=buffer.getInt16();
							nextPos+=buffer.pos;
							buffer.skip(2);
							if ((value=compStrings[elementId+"-"+j])!=null)
								buffer.writeS(value);
							else
							buffer.skip(2);
							if ((value=compStrings[elementId+"-"+j+"-0"])!=null)
								buffer.writeS(value);
							buffer.pos=nextPos;
						}
						break ;
					}
				case 11:{
						if (buffer.seek(curPos,6)&& buffer.readByte()==type){
							if ((value=compStrings[elementId])!=null)
								buffer.writeS(value);
							else
							buffer.skip(2);
							buffer.skip(2);
							if (buffer.readBool())
								buffer.skip(4);
							buffer.skip(4);
							if (buffer.readBool()&& (value=compStrings[elementId+"-prompt"])!=null)
								buffer.writeS(value);
						}
						break ;
					}
				case 12:{
						if (buffer.seek(curPos,6)&& buffer.readByte()==type){
							if ((value=compStrings[elementId])!=null)
								buffer.writeS(value);
							else
							buffer.skip(2);
							if ((value=compStrings[elementId+"-0"])!=null)
								buffer.writeS(value);
						}
						break ;
					}
				case 13:{
						if (buffer.seek(curPos,6)&& buffer.readByte()==type){
							itemCount=buffer.getInt16();
							for (j=0;j < itemCount;j++){
								nextPos=buffer.getInt16();
								nextPos+=buffer.pos;
								if ((value=compStrings[elementId+"-"+j])!=null)
									buffer.writeS(value);
								buffer.pos=nextPos;
							}
							if ((value=compStrings[elementId])!=null)
								buffer.writeS(value);
						}
						break ;
					}
				}
			buffer.pos=curPos+dataLen;
		}
	}

	TranslationHelper.findChildNode=function(xml,name){
		var col=xml.childNodes;
		var length1=col.length;
		if (length1>0){
			for (var i1=0;i1 < length1;i1++){
				var cxml=col[i1];
				if (cxml.nodeName==name){
					return cxml;
				}
			}
		}
		return null;
	}

	TranslationHelper.strings=null;
	return TranslationHelper;
})()


//class fairygui.PackageItemType
var PackageItemType=(function(){
	function PackageItemType(){}
	__class(PackageItemType,'fairygui.PackageItemType');
	PackageItemType.Image=0;
	PackageItemType.MovieClip=1;
	PackageItemType.Sound=2;
	PackageItemType.Component=3;
	PackageItemType.Atlas=4;
	PackageItemType.Font=5;
	PackageItemType.Swf=6;
	PackageItemType.Misc=7;
	PackageItemType.Unknown=8;
	return PackageItemType;
})()


/**
*Use for GLoader.fill
*/
//class fairygui.LoaderFillType
var LoaderFillType=(function(){
	function LoaderFillType(){}
	__class(LoaderFillType,'fairygui.LoaderFillType');
	LoaderFillType.None=0;
	LoaderFillType.Scale=1;
	LoaderFillType.ScaleMatchHeight=2;
	LoaderFillType.ScaleMatchWidth=3;
	LoaderFillType.ScaleFree=4;
	LoaderFillType.ScaleNoBorder=5;
	return LoaderFillType;
})()


//class fairygui.AssetProxy
var AssetProxy=(function(){
	function AssetProxy(){
		this._asset=null;
		this._asset=Laya.loader;
	}

	__class(AssetProxy,'fairygui.AssetProxy');
	var __proto=AssetProxy.prototype;
	__proto.getRes=function(url){
		return this._asset.getRes(url);
	}

	__proto.load=function(url,complete,progress,type,priority,cache){
		(priority===void 0)&& (priority=1);
		(cache===void 0)&& (cache=true);
		this._asset.load(url,complete,progress,type,priority,cache);
	}

	__proto.setAsset=function(asset){
		this._asset=asset;
	}

	__getset(1,AssetProxy,'inst',function(){
		if(fairygui.AssetProxy._inst==null)
			AssetProxy._inst=new AssetProxy();
		return fairygui.AssetProxy._inst;
	});

	AssetProxy._inst=null;
	return AssetProxy;
})()


//class fairygui.utils.UBBParser
var UBBParser=(function(){
	function UBBParser(){
		this._text=null;
		this._readPos=0;
		this._handlers=null;
		this.smallFontSize=12;
		this.normalFontSize=14;
		this.largeFontSize=16;
		this.defaultImgWidth=0;
		this.defaultImgHeight=0;
		this._handlers={};
		this._handlers["url"]=this.onTag_URL;
		this._handlers["img"]=this.onTag_IMG;
		this._handlers["b"]=this.onTag_Simple;
		this._handlers["i"]=this.onTag_Simple;
		this._handlers["u"]=this.onTag_Simple;
		this._handlers["sup"]=this.onTag_Simple;
		this._handlers["sub"]=this.onTag_Simple;
		this._handlers["color"]=this.onTag_COLOR;
		this._handlers["font"]=this.onTag_FONT;
		this._handlers["size"]=this.onTag_SIZE;
	}

	__class(UBBParser,'fairygui.utils.UBBParser');
	var __proto=UBBParser.prototype;
	__proto.onTag_URL=function(tagName,end,attr){
		if (!end){
			if (attr !=null)
				return "<a href=\""+attr+"\" target=\"_blank\">";
			else {
				var href=this.getTagText();
				return "<a href=\""+href+"\" target=\"_blank\">";
			}
		}
		else
		return "</a>";
	}

	__proto.onTag_IMG=function(tagName,end,attr){
		if (!end){
			var src=this.getTagText(true);
			if (!src)
				return null;
			if (this.defaultImgWidth)
				return "<img src=\""+src+"\" width=\""+this.defaultImgWidth+"\" height=\""+this.defaultImgHeight+"\"/>";
			else
			return "<img src=\""+src+"\"/>";
		}
		else
		return null;
	}

	__proto.onTag_Simple=function(tagName,end,attr){
		return end ? ("</"+tagName+">"):("<"+tagName+">");
	}

	__proto.onTag_COLOR=function(tagName,end,attr){
		if (!end)
			return "<font color=\""+attr+"\">";
		else
		return "</font>";
	}

	__proto.onTag_FONT=function(tagName,end,attr){
		if (!end)
			return "<font face=\""+attr+"\">";
		else
		return "</font>";
	}

	__proto.onTag_SIZE=function(tagName,end,attr){
		if (!end){
			if (attr=="normal")
				attr=""+this.normalFontSize;
			else if (attr=="small")
			attr=""+this.smallFontSize;
			else if (attr=="large")
			attr=""+this.largeFontSize;
			else if (attr.length && attr.charAt(0)=="+")
			attr=""+(this.smallFontSize+parseInt(attr.substr(1)));
			else if (attr.length && attr.charAt(0)=="-")
			attr=""+(this.smallFontSize-parseInt(attr.substr(1)));
			return "<font size=\""+attr+"\">";
		}
		else
		return "</font>";
	}

	__proto.getTagText=function(remove){
		(remove===void 0)&& (remove=false);
		var pos1=this._readPos;
		var pos2=0;
		var result="";
		while ((pos2=this._text.indexOf("[",pos1))!=-1){
			if (this._text.charCodeAt(pos2-1)==92){
				result+=this._text.substring(pos1,pos2-1);
				result+="[";
				pos1=pos2+1;
			}
			else{
				result+=this._text.substring(pos1,pos2);
				break ;
			}
		}
		if (pos2==-1)
			return null;
		if (remove)
			this._readPos=pos2;
		return result;
	}

	__proto.parse=function(text,remove){
		(remove===void 0)&& (remove=false);
		this._text=text;
		var pos1=0,pos2=0,pos3=0;
		var end=false;
		var tag,attr;
		var repl;
		var func;
		var result="";
		while((pos2=this._text.indexOf("[",pos1))!=-1){
			if (pos2 > 0 && this._text.charCodeAt(pos2-1)==92){
				result+=this._text.substring(pos1,pos2-1);
				result+="[";
				pos1=pos2+1;
				continue ;
			}
			result+=this._text.substring(pos1,pos2);
			pos1=pos2;
			pos2=this._text.indexOf("]",pos1);
			if(pos2==-1)
				break ;
			end=this._text.charAt(pos1+1)=='/';
			tag=this._text.substring(end?pos1+2:pos1+1,pos2);
			this._readPos=pos2+1;
			attr=null;
			repl=null;
			pos3=tag.indexOf("=");
			if(pos3!=-1){
				attr=tag.substring(pos3+1);
				tag=tag.substring(0,pos3);
			}
			tag=tag.toLowerCase();
			func=this._handlers[tag];
			if(func!=null){
				if(!remove){
					repl=func.call(this,tag,end,attr);
					if(repl!=null)
						result+=repl;
				}
			}
			else
			result+=this._text.substring(pos1,this._readPos);
			pos1=this._readPos;
		}
		if (pos1 < this._text.length)
			result+=this._text.substr(pos1);
		this._text=null;
		return result;
	}

	__static(UBBParser,
	['inst',function(){return this.inst=new UBBParser();}
	]);
	return UBBParser;
})()


//class fairygui.utils.ToolSet
var ToolSet=(function(){
	function ToolSet(){}
	__class(ToolSet,'fairygui.utils.ToolSet');
	ToolSet.getFileName=function(source){
		var i=source.lastIndexOf("/");
		if (i !=-1)
			source=source.substr(i+1);
		i=source.lastIndexOf("\\");
		if (i !=-1)
			source=source.substr(i+1);
		i=source.lastIndexOf(".");
		if (i !=-1)
			return source.substring(0,i);
		else
		return source;
	}

	ToolSet.startsWith=function(source,str,ignoreCase){
		(ignoreCase===void 0)&& (ignoreCase=false);
		if (!source)
			return false;
		else if (source.length < str.length)
		return false;
		else {
			source=source.substring(0,str.length);
			if (!ignoreCase)
				return source==str;
			else
			return source.toLowerCase()==str.toLowerCase();
		}
	}

	ToolSet.endsWith=function(source,str,ignoreCase){
		(ignoreCase===void 0)&& (ignoreCase=false);
		if (!source)
			return false;
		else if (source.length < str.length)
		return false;
		else {
			source=source.substring(source.length-str.length);
			if (!ignoreCase)
				return source==str;
			else
			return source.toLowerCase()==str.toLowerCase();
		}
	}

	ToolSet.trim=function(targetString){
		return fairygui.utils.ToolSet.trimLeft(fairygui.utils.ToolSet.trimRight(targetString));
	}

	ToolSet.trimLeft=function(targetString){
		var tempChar="";
		for (var i=0;i < targetString.length;i++){
			tempChar=targetString.charAt(i);
			if (tempChar !=" " && tempChar !="\n" && tempChar !="\r"){
				break ;
			}
		}
		return targetString.substr(i);
	}

	ToolSet.trimRight=function(targetString){
		var tempChar="";
		for (var i=targetString.length-1;i >=0;i--){
			tempChar=targetString.charAt(i);
			if (tempChar !=" " && tempChar !="\n" && tempChar !="\r"){
				break ;
			}
		}
		return targetString.substring(0,i+1);
	}

	ToolSet.convertToHtmlColor=function(argb,hasAlpha){
		(hasAlpha===void 0)&& (hasAlpha=false);
		var alpha;
		if (hasAlpha)
			alpha=(argb >> 24 & 0xFF).toString(16);
		else
		alpha="";
		var red=(argb >> 16 & 0xFF).toString(16);
		var green=(argb >> 8 & 0xFF).toString(16);
		var blue=(argb & 0xFF).toString(16);
		if (alpha.length==1)
			alpha="0"+alpha;
		if (red.length==1)
			red="0"+red;
		if (green.length==1)
			green="0"+green;
		if (blue.length==1)
			blue="0"+blue;
		return "#"+alpha+red+green+blue;
	}

	ToolSet.convertFromHtmlColor=function(str,hasAlpha){
		(hasAlpha===void 0)&& (hasAlpha=false);
		if (str.length < 1)
			return 0;
		if (str.charAt(0)=="#")
			str=str.substr(1);
		if (str.length==8)
			return (parseInt(str.substr(0,2),16)<< 24)+parseInt(str.substr(2),16);
		else if (hasAlpha)
		return 0xFF000000+parseInt(str,16);
		else
		return parseInt(str,16);
	}

	ToolSet.displayObjectToGObject=function(obj){
		while (obj !=null && !((obj instanceof laya.display.Stage ))){
			if (obj["$owner"])
				return obj["$owner"];
			obj=obj.parent;
		}
		return null;
	}

	ToolSet.encodeHTML=function(str){
		if (!str)
			return "";
		else
		return str.replace("&","&amp;").replace("<","&lt;").replace(">","&gt;").replace("'","&apos;");
	}

	ToolSet.parseUBB=function(text){
		return fairygui.utils.ToolSet.defaultUBBParser.parse(text);
	}

	ToolSet.removeUBB=function(text){
		return fairygui.utils.ToolSet.defaultUBBParser.parse(text,true);
	}

	ToolSet.clamp=function(value,min,max){
		if(value<min)
			value=min;
		else if(value>max)
		value=max;
		return value;
	}

	ToolSet.clamp01=function(value){
		if(value>1)
			value=1;
		else if(value<0)
		value=0;
		return value;
	}

	ToolSet.lerp=function(start,end,percent){
		return (start+percent*(end-start));
	}

	__static(ToolSet,
	['defaultUBBParser',function(){return this.defaultUBBParser=new UBBParser();}
	]);
	return ToolSet;
})()


//class fairygui.utils.PixelHitTestData
var PixelHitTestData=(function(){
	function PixelHitTestData(){
		this.pixelWidth=0;
		this.scale=NaN;
		this.pixels=null;
	}

	__class(PixelHitTestData,'fairygui.utils.PixelHitTestData');
	var __proto=PixelHitTestData.prototype;
	__proto.load=function(ba){
		ba.getInt32();
		this.pixelWidth=ba.getInt32();
		this.scale=1/ba.readByte();
		var len=ba.getInt32();
		this.pixels=__newvec(len);
		for(var i=0;i<len;i++){
			var j=ba.readByte();
			if(j<0)
				j+=256;
			this.pixels[i]=j;
		}
	}

	return PixelHitTestData;
})()


//class fairygui.ScrollBarDisplayType
var ScrollBarDisplayType=(function(){
	function ScrollBarDisplayType(){}
	__class(ScrollBarDisplayType,'fairygui.ScrollBarDisplayType');
	ScrollBarDisplayType.Default=0;
	ScrollBarDisplayType.Visible=1;
	ScrollBarDisplayType.Auto=2;
	ScrollBarDisplayType.Hidden=3;
	return ScrollBarDisplayType;
})()


//class fairygui.PackageItem
var PackageItem=(function(){
	function PackageItem(){
		this.owner=null;
		this.type=0;
		this.objectType=0;
		this.id=null;
		this.name=null;
		this.width=0;
		this.height=0;
		this.file=null;
		this.decoded=false;
		this.rawData=null;
		//image
		this.scale9Grid=null;
		this.scaleByTile=false;
		this.tileGridIndice=0;
		this.smoothing=false;
		this.texture=null;
		this.pixelHitTestData=null;
		//movieclip
		this.interval=0;
		this.repeatDelay=0;
		this.swing=false;
		this.frames=null;
		//componenet
		this.extensionType=null;
		//font
		this.bitmapFont=null;
	}

	__class(PackageItem,'fairygui.PackageItem');
	var __proto=PackageItem.prototype;
	__proto.load=function(){
		return this.owner.getItemAsset(this);
	}

	__proto.toString=function(){
		return this.name;
	}

	return PackageItem;
})()


//class fairygui.action.ControllerAction
var ControllerAction=(function(){
	function ControllerAction(){
		this.fromPage=null;
		this.toPage=null;
	}

	__class(ControllerAction,'fairygui.action.ControllerAction');
	var __proto=ControllerAction.prototype;
	__proto.run=function(controller,prevPage,curPage){
		if((this.fromPage==null || this.fromPage.length==0 || this.fromPage.indexOf(prevPage)!=-1)
			&& (this.toPage==null || this.toPage.length==0 || this.toPage.indexOf(curPage)!=-1))
		this.enter(controller);
		else
		this.leave(controller);
	}

	__proto.enter=function(controller){}
	__proto.leave=function(controller){}
	__proto.setup=function(buffer){
		var cnt=0;
		var i=0;
		cnt=buffer.getInt16();
		this.fromPage=[];
		for (i=0;i < cnt;i++)
		this.fromPage[i]=buffer.readS();
		cnt=buffer.getInt16();
		this.toPage=[];
		for (i=0;i < cnt;i++)
		this.toPage[i]=buffer.readS();
	}

	ControllerAction.createAction=function(type){
		switch(type){
			case 0:
				return new PlayTransitionAction();
			case 1:
				return new ChangePageAction();
			}
		return null;
	}

	return ControllerAction;
})()


/**
*Use for GGroup.layout
*/
//class fairygui.GroupLayoutType
var GroupLayoutType=(function(){
	function GroupLayoutType(){}
	__class(GroupLayoutType,'fairygui.GroupLayoutType');
	GroupLayoutType.None=0;
	GroupLayoutType.Horizontal=1;
	GroupLayoutType.Vertical=2;
	return GroupLayoutType;
})()


//class fairygui.FillOrigin
var FillOrigin=(function(){
	function FillOrigin(){}
	__class(FillOrigin,'fairygui.FillOrigin');
	FillOrigin.Top=0;
	FillOrigin.Bottom=1;
	FillOrigin.Left=2;
	FillOrigin.Right=3;
	FillOrigin.TopLeft=0;
	FillOrigin.TopRight=1;
	FillOrigin.BottomLeft=2;
	FillOrigin.BottomRight=3;
	return FillOrigin;
})()


//class fairygui.UIPackage
var UIPackage=(function(){
	var AtlasSprite;
	function UIPackage(){
		this._id=null;
		this._name=null;
		this._items=null;
		this._itemsById=null;
		this._itemsByName=null;
		this._customId=null;
		this._sprites=null;
		this._items=[];
		this._itemsById={};
		this._itemsByName={};
		this._sprites={};
	}

	__class(UIPackage,'fairygui.UIPackage');
	var __proto=UIPackage.prototype;
	__proto.loadPackage=function(buffer,resKey){
		if (buffer.getUint32()!=0x46475549)
			throw new Error("FairyGUI: old package format found in '"+resKey+"'");
		buffer.version=buffer.getInt32();
		var compressed=buffer.readBool();
		this._id=buffer.readUTFString();
		this._name=buffer.readUTFString();
		buffer.skip(20);
		if(compressed){
			var buf=new Uint8Array(buffer.buffer,buffer.pos,buffer.length-buffer.pos);
			var inflater=new Zlib.RawInflate(buf);buf=inflater.decompress();;
			buffer=new ByteBuffer(buf);
		};
		var indexTablePos=buffer.pos;
		var cnt=0;
		var i=0;
		var nextPos=0;
		buffer.seek(indexTablePos,4);
		cnt=buffer.getInt32();
		var stringTable=__newvec(cnt);
		for (i=0;i < cnt;i++)
		stringTable[i]=buffer.readUTFString();
		buffer.stringTable=stringTable;
		buffer.seek(indexTablePos,1);
		var pi;
		resKey=resKey+"_";
		cnt=buffer.getUint16();
		for (i=0;i < cnt;i++){
			nextPos=buffer.getInt32();
			nextPos+=buffer.pos;
			pi=new PackageItem();
			pi.owner=this;
			pi.type=buffer.readByte();
			pi.id=buffer.readS();
			pi.name=buffer.readS();
			buffer.readS();
			pi.file=buffer.readS();
			buffer.readBool();
			pi.width=buffer.getInt32();
			pi.height=buffer.getInt32();
			switch (pi.type){
				case 0:{
						pi.objectType=0;
						var scaleOption=buffer.readByte();
						if (scaleOption==1){
							pi.scale9Grid=new laya.maths.Rectangle();
							pi.scale9Grid.x=buffer.getInt32();
							pi.scale9Grid.y=buffer.getInt32();
							pi.scale9Grid.width=buffer.getInt32();
							pi.scale9Grid.height=buffer.getInt32();
							pi.tileGridIndice=buffer.getInt32();
						}
						else if (scaleOption==2)
						pi.scaleByTile=true;
						pi.smoothing=buffer.readBool();
						break ;
					}
				case 1:{
						pi.smoothing=buffer.readBool();
						pi.objectType=1;
						pi.rawData=buffer.readBuffer();
						break ;
					}
				case 5:{
						pi.rawData=buffer.readBuffer();
						break ;
					}
				case 3:{
						var extension=buffer.readByte();
						if (extension > 0)
							pi.objectType=extension;
						else
						pi.objectType=9;
						pi.rawData=buffer.readBuffer();
						UIObjectFactory.resolvePackageItemExtension(pi);
						break ;
					}
				case 4:
				case 2:
				case 7:{
						pi.file=resKey+pi.file;
						break ;
					}
				}
			this._items.push(pi);
			this._itemsById[pi.id]=pi;
			if (pi.name !=null)
				this._itemsByName[pi.name]=pi;
			buffer.pos=nextPos;
		}
		buffer.seek(indexTablePos,2);
		cnt=buffer.getUint16();
		for (i=0;i < cnt;i++){
			nextPos=buffer.getUint16();
			nextPos+=buffer.pos;
			var itemId=buffer.readS();
			pi=this._itemsById[buffer.readS()];
			var sprite=new AtlasSprite();
			sprite.atlas=pi;
			sprite.rect.x=buffer.getInt32();
			sprite.rect.y=buffer.getInt32();
			sprite.rect.width=buffer.getInt32();
			sprite.rect.height=buffer.getInt32();
			sprite.rotated=buffer.readBool();
			this._sprites[itemId]=sprite;
			buffer.pos=nextPos;
		}
		if (buffer.seek(indexTablePos,3)){
			cnt=buffer.getUint16();
			for (i=0;i < cnt;i++){
				nextPos=buffer.getInt32();
				nextPos+=buffer.pos;
				pi=this._itemsById[buffer.readS()];
				if (pi && pi.type==0){
					pi.pixelHitTestData=new PixelHitTestData();
					pi.pixelHitTestData.load(buffer);
				}
				buffer.pos=nextPos;
			}
		}
	}

	__proto.loadAllAssets=function(){
		var cnt=this._items.length;
		for(var i=0;i < cnt;i++){
			var pi=this._items[i];
			this.getItemAsset(pi);
		}
	}

	__proto.unloadAssets=function(){
		var cnt=this._items.length;
		for(var i=0;i < cnt;i++){
			var pi=this._items[i];
			if(pi.type==4){
				if(pi.texture!=null)
					Laya.loader.clearTextureRes(pi.texture.url);
			}
		}
	}

	__proto.dispose=function(){
		var cnt=this._items.length;
		for(var i=0;i < cnt;i++){
			var pi=this._items[i];
			if(pi.type==4){
				if(pi.texture!=null){
					pi.texture.destroy(true);
					pi.texture=null;
				}
			}
			else if(pi.type==2){
				SoundManager.destroySound(pi.file);
			}
		}
	}

	__proto.createObject=function(resName,userClass){
		var pi=this._itemsByName[resName];
		if (pi)
			return this.internalCreateObject(pi,userClass);
		else
		return null;
	}

	__proto.internalCreateObject=function(item,userClass){
		var g;
		if (item.type==3){
			if (userClass !=null)
				g=new userClass();
			else
			g=UIObjectFactory.newObject(item);
		}
		else
		g=UIObjectFactory.newObject(item);
		if (g==null)
			return null;
		fairygui.UIPackage._constructing++;
		g.packageItem=item;
		g.constructFromResource();
		fairygui.UIPackage._constructing--;
		return g;
	}

	__proto.getItemById=function(itemId){
		return this._itemsById[itemId];
	}

	__proto.getItemByName=function(resName){
		return this._itemsByName[resName];
	}

	__proto.getItemAssetByName=function(resName){
		var pi=this._itemsByName[resName];
		if (pi==null){
			throw "Resource not found -"+resName;
		}
		return this.getItemAsset(pi);
	}

	__proto.getItemAsset=function(item){
		switch (item.type){
			case 0:
				if (!item.decoded){
					item.decoded=true;
					var sprite=this._sprites[item.id];
					if (sprite !=null)
						item.texture=this.createSpriteTexture(sprite);
					else
					item.texture=null;
				}
				return item.texture;
			case 4:
				if (!item.decoded){
					item.decoded=true;
					item.texture=AssetProxy.inst.getRes(item.file);
					if(!UIConfig$1.textureLinearSampling)
						item.texture.isLinearSampling=false;
				}
				return item.texture;
			case 5:
				if (!item.decoded){
					item.decoded=true;
					this.loadFont(item);
				}
				return item.bitmapFont;
			case 1:
				if (!item.decoded){
					item.decoded=true;
					this.loadMovieClip(item);
				}
				return item.frames;
			case 3:
				return item.rawData;
			case 7:
				if(item.file)
					return AssetProxy.inst.getRes(item.file);
				else
				return null;
			default :
				return null;
			}
	}

	__proto.createSpriteTexture=function(sprite){
		var atlasTexture=(this.getItemAsset(sprite.atlas));
		return Texture.createFromTexture(atlasTexture,
		sprite.rect.x,sprite.rect.y,sprite.rect.width,sprite.rect.height);
	}

	__proto.loadMovieClip=function(item){
		var buffer=item.rawData;
		buffer.seek(0,0);
		item.interval=buffer.getInt32();
		item.swing=buffer.readBool();
		item.repeatDelay=buffer.getInt32();
		buffer.seek(0,1);
		var frameCount=buffer.getInt16();
		item.frames=__newvec(frameCount);
		var spriteId;
		var frame;
		var sprite;
		for (var i=0;i < frameCount;i++){
			var nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			frame=new Frame();
			frame.rect.x=buffer.getInt32();
			frame.rect.y=buffer.getInt32();
			frame.rect.width=buffer.getInt32();
			frame.rect.height=buffer.getInt32();
			frame.addDelay=buffer.getInt32();
			spriteId=buffer.readS();
			if (spriteId !=null && (sprite=this._sprites[spriteId])!=null)
				frame.texture=this.createSpriteTexture(sprite);
			item.frames[i]=frame;
			buffer.pos=nextPos;
		}
	}

	__proto.loadFont=function(item){
		var font=new BitmapFont$1();
		item.bitmapFont=font;
		var buffer=item.rawData;
		buffer.seek(0,0);
		font.ttf=buffer.readBool();
		buffer.readBool();
		font.resizable=buffer.readBool();
		buffer.readBool();
		font.size=buffer.getInt32();
		var xadvance=buffer.getInt32();
		var lineHeight=buffer.getInt32();
		var mainTexture=null;
		var mainSprite=this._sprites[item.id];
		if (mainSprite!=null)
			mainTexture=(this.getItemAsset(mainSprite.atlas));
		buffer.seek(0,1);
		var bg=null;
		var cnt=buffer.getInt32();
		for (var i=0;i < cnt;i++){
			var nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			bg=new BMGlyph();
			var ch=buffer.readChar();
			font.glyphs[ch]=bg;
			var img=buffer.readS();
			var bx=buffer.getInt32();
			var by=buffer.getInt32();
			bg.offsetX=buffer.getInt32();
			bg.offsetY=buffer.getInt32();
			bg.width=buffer.getInt32();
			bg.height=buffer.getInt32();
			bg.advance=buffer.getInt32();
			bg.channel=buffer.readByte();
			if (bg.channel==1)
				bg.channel=3;
			else if (bg.channel==2)
			bg.channel=2;
			else if (bg.channel==3)
			bg.channel=1;
			if (!font.ttf){
				var charImg=this._itemsById[img];
				if (charImg){
					this.getItemAsset(charImg);
					bg.width=charImg.width;
					bg.height=charImg.height;
					bg.texture=charImg.texture;
				}
			}
			else{
				bg.texture=Texture.createFromTexture(mainTexture,
				bx+mainSprite.rect.x,by+mainSprite.rect.y,bg.width,bg.height);
			}
			if (font.ttf)
				bg.lineHeight=lineHeight;
			else{
				if (bg.advance==0){
					if (xadvance==0)
						bg.advance=bg.offsetX+bg.width;
					else
					bg.advance=xadvance;
				}
				bg.lineHeight=bg.offsetY < 0 ? bg.height :(bg.offsetY+bg.height);
				if (bg.lineHeight < font.size)
					bg.lineHeight=font.size;
			}
			buffer.pos=nextPos;
		}
	}

	__getset(0,__proto,'name',function(){
		return this._name;
	});

	__getset(0,__proto,'customId',function(){
		return this._customId;
		},function(value){
		if (this._customId !=null)
			delete fairygui.UIPackage._packageInstById[this._customId];
		this._customId=value;
		if (this._customId !=null)
			fairygui.UIPackage._packageInstById[this._customId]=this;
	});

	__getset(0,__proto,'id',function(){
		return this._id;
	});

	UIPackage.getById=function(id){
		return fairygui.UIPackage._packageInstById[id];
	}

	UIPackage.getByName=function(name){
		return fairygui.UIPackage._packageInstByName[name];
	}

	UIPackage.addPackage=function(resKey,descData){
		if(!descData){
			descData=AssetProxy.inst.getRes(resKey+"."+UIConfig$1.packageFileExtension);
			if(!descData || descData.length==0)
				throw new Error("package resource not ready: "+resKey);
		};
		var buffer=new ByteBuffer(descData);
		var pkg=new UIPackage();
		pkg.loadPackage(buffer,resKey);
		fairygui.UIPackage._packageInstById[pkg.id]=pkg;
		fairygui.UIPackage._packageInstByName[pkg.name]=pkg;
		pkg.customId=resKey;
		return pkg;
	}

	UIPackage.removePackage=function(packageIdOrName){
		var pkg=fairygui.UIPackage._packageInstById[packageIdOrName];
		if(!pkg)
			pkg=fairygui.UIPackage._packageInstByName[packageIdOrName];
		if(!pkg)
			throw new Error("unknown package: "+packageIdOrName);
		pkg.dispose();
		delete fairygui.UIPackage._packageInstById[pkg.id];
		if(pkg._customId !=null)
			delete fairygui.UIPackage._packageInstById[pkg._customId];
		delete fairygui.UIPackage._packageInstByName[pkg.name];
	}

	UIPackage.createObject=function(pkgName,resName,userClass){
		var pkg=fairygui.UIPackage.getByName(pkgName);
		if(pkg)
			return pkg.createObject(resName,userClass);
		else
		return null;
	}

	UIPackage.createObjectFromURL=function(url,userClass){
		var pi=fairygui.UIPackage.getItemByURL(url);
		if(pi)
			return pi.owner.internalCreateObject(pi,userClass);
		else
		return null;
	}

	UIPackage.getItemURL=function(pkgName,resName){
		var pkg=fairygui.UIPackage.getByName(pkgName);
		if(!pkg)
			return null;
		var pi=pkg._itemsByName[resName];
		if(!pi)
			return null;
		return "ui://"+pkg.id+pi.id;
	}

	UIPackage.getItemByURL=function(url){
		var pos1=url.indexOf("//");
		if (pos1==-1)
			return null;
		var pos2=url.indexOf("/",pos1+2);
		if (pos2==-1){
			if (url.length > 13){
				var pkgId=url.substr(5,8);
				var pkg=UIPackage.getById(pkgId);
				if (pkg !=null){
					var srcId=url.substr(13);
					return pkg.getItemById(srcId);
				}
			}
		}
		else{
			var pkgName=url.substr(pos1+2,pos2-pos1-2);
			pkg=UIPackage.getByName(pkgName);
			if (pkg !=null){
				var srcName=url.substr(pos2+1);
				return pkg.getItemByName(srcName);
			}
		}
		return null;
	}

	UIPackage.getItemAssetByURL=function(url){
		var item=UIPackage.getItemByURL(url);
		if (item==null)
			return null;
		return item.owner.getItemAsset(item);
	}

	UIPackage.normalizeURL=function(url){
		if(url==null)
			return null;
		var pos1=url.indexOf("//");
		if (pos1==-1)
			return null;
		var pos2=url.indexOf("/",pos1+2);
		if (pos2==-1)
			return url;
		var pkgName=url.substr(pos1+2,pos2-pos1-2);
		var srcName=url.substr(pos2+1);
		return UIPackage.getItemURL(pkgName,srcName);
	}

	UIPackage.setStringsSource=function(source){
		TranslationHelper.loadFromXML(source);
	}

	UIPackage._constructing=0;
	UIPackage._packageInstById={};
	UIPackage._packageInstByName={};
	UIPackage.__init$=function(){
		//class AtlasSprite
		AtlasSprite=(function(){
			function AtlasSprite(){
				this.atlas=null;
				this.rect=null;
				this.rotated=false;
				this.rect=new Rectangle();
			}
			__class(AtlasSprite,'');
			return AtlasSprite;
		})()
	}

	return UIPackage;
})()


//class fairygui.RelationItem
var RelationItem=(function(){
	var RelationDef;
	function RelationItem(owner){
		this._owner=null;
		this._target=null;
		this._defs=null;
		this._targetX=NaN;
		this._targetY=NaN;
		this._targetWidth=NaN;
		this._targetHeight=NaN;
		this._owner=owner;
		this._defs=[];
	}

	__class(RelationItem,'fairygui.RelationItem');
	var __proto=RelationItem.prototype;
	__proto.add=function(relationType,usePercent){
		if (relationType==24){
			this.add(14,usePercent);
			this.add(15,usePercent);
			return;
		};
		var cnt=this._defs.length;
		for(var i=0;i<cnt;i++){
			if (this._defs[i].type==relationType)
				return;
		}
		this.internalAdd(relationType,usePercent);
	}

	__proto.internalAdd=function(relationType,usePercent){
		if (relationType==24){
			this.internalAdd(14,usePercent);
			this.internalAdd(15,usePercent);
			return;
		};
		var info=new RelationDef();
		info.percent=usePercent;
		info.type=relationType;
		info.axis=(relationType <=6 || relationType==14 || relationType >=16 && relationType <=19)? 0 :1;
		this._defs.push(info);
		if (usePercent || relationType==1 || relationType==3 || relationType==5
			|| relationType==8 || relationType==10 || relationType==12)
		this._owner.pixelSnapping=true;
	}

	__proto.remove=function(relationType){
		if (relationType==24){
			this.remove(14);
			this.remove(15);
			return;
		};
		var dc=this._defs.length;
		for (var k=0;k < dc;k++){
			if (this._defs[k].type==relationType){
				this._defs.splice(k,1);
				break ;
			}
		}
	}

	__proto.copyFrom=function(source){
		this.target=source.target;
		this._defs.length=0;
		var cnt=source._defs.length;
		for(var i=0;i<cnt;i++){
			var info=source._defs[i];
			var info2=new RelationDef();
			info2.copyFrom(info);
			this._defs.push(info2);
		}
	}

	__proto.dispose=function(){
		if (this._target !=null){
			this.releaseRefTarget(this._target);
			this._target=null;
		}
	}

	__proto.applyOnSelfResized=function(dWidth,dHeight,applyPivot){
		var cnt=this._defs.length;
		if(cnt==0)
			return;
		var ox=this._owner.x;
		var oy=this._owner.y;
		for (var i=0;i < cnt;i++){
			var info=this._defs[i];
			switch (info.type){
				case 3:
					this._owner.x-=(0.5-(applyPivot ? this._owner.pivotX :0))*dWidth;
					break ;
				case 5:
				case 4:
				case 6:
					this._owner.x-=(1-(applyPivot ? this._owner.pivotX :0))*dWidth;
					break ;
				case 10:
					this._owner.y-=(0.5-(applyPivot ? this._owner.pivotY :0))*dHeight;
					break ;
				case 12:
				case 11:
				case 13:
					this._owner.y-=(1-(applyPivot ? this._owner.pivotY :0))*dHeight;
					break ;
				}
		}
		if (ox!=this._owner.x || oy!=this._owner.y){
			ox=this._owner.x-ox;
			oy=this._owner.y-oy;
			this._owner.updateGearFromRelations(1,ox,oy);
			if (this._owner.parent !=null && this._owner.parent._transitions.length > 0){
				cnt=this._owner.parent._transitions.length;
				for(var j=0;j<cnt;j++){
					var trans=this._owner.parent._transitions[j];
					trans.updateFromRelations(this._owner.id,ox,oy);
				}
			}
		}
	}

	__proto.applyOnXYChanged=function(info,dx,dy){
		var tmp=NaN;
		switch (info.type){
			case 0:
			case 1:
			case 2:
			case 3:
			case 4:
			case 5:
			case 6:
				this._owner.x+=dx;
				break ;
			case 7:
			case 8:
			case 9:
			case 10:
			case 11:
			case 12:
			case 13:
				this._owner.y+=dy;
				break ;
			case 14:
			case 15:
				break ;
			case 16:
			case 17:
				tmp=this._owner.xMin;
				this._owner.width=this._owner._rawWidth-dx;
				this._owner.xMin=tmp+dx;
				break ;
			case 18:
			case 19:
				tmp=this._owner.xMin;
				this._owner.width=this._owner._rawWidth+dx;
				this._owner.xMin=tmp;
				break ;
			case 20:
			case 21:
				tmp=this._owner.yMin;
				this._owner.height=this._owner._rawHeight-dy;
				this._owner.yMin=tmp+dy;
				break ;
			case 22:
			case 23:
				tmp=this._owner.yMin;
				this._owner.height=this._owner._rawHeight+dy;
				this._owner.yMin=tmp;
				break ;
			}
	}

	__proto.applyOnSizeChanged=function(info){
		var pos=0,pivot=0,delta=0;
		var v=NaN,tmp=NaN;
		if (info.axis==0){
			if (this._target !=this._owner.parent){
				pos=this._target.x;
				if (this._target.pivotAsAnchor)
					pivot=this._target.pivotX;
			}
			if (info.percent){
				if (this._targetWidth !=0)
					delta=this._target._width / this._targetWidth;
			}
			else
			delta=this._target._width-this._targetWidth;
		}
		else{
			if (this._target !=this._owner.parent){
				pos=this._target.y;
				if (this._target.pivotAsAnchor)
					pivot=this._target.pivotY;
			}
			if (info.percent){
				if (this._targetHeight !=0)
					delta=this._target._height / this._targetHeight;
			}
			else
			delta=this._target._height-this._targetHeight;
		}
		switch (info.type){
			case 0:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin-pos)*delta;
				else if (pivot !=0)
				this._owner.x+=delta *(-pivot);
				break ;
			case 1:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin-pos)*delta;
				else
				this._owner.x+=delta *(0.5-pivot);
				break ;
			case 2:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin-pos)*delta;
				else
				this._owner.x+=delta *(1-pivot);
				break ;
			case 3:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin+this._owner._rawWidth *0.5-pos)*delta-this._owner._rawWidth *0.5;
				else
				this._owner.x+=delta *(0.5-pivot);
				break ;
			case 4:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin+this._owner._rawWidth-pos)*delta-this._owner._rawWidth;
				else if (pivot !=0)
				this._owner.x+=delta *(-pivot);
				break ;
			case 5:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin+this._owner._rawWidth-pos)*delta-this._owner._rawWidth;
				else
				this._owner.x+=delta *(0.5-pivot);
				break ;
			case 6:
				if (info.percent)
					this._owner.xMin=pos+(this._owner.xMin+this._owner._rawWidth-pos)*delta-this._owner._rawWidth;
				else
				this._owner.x+=delta *(1-pivot);
				break ;
			case 7:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin-pos)*delta;
				else if (pivot !=0)
				this._owner.y+=delta *(-pivot);
				break ;
			case 8:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin-pos)*delta;
				else
				this._owner.y+=delta *(0.5-pivot);
				break ;
			case 9:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin-pos)*delta;
				else
				this._owner.y+=delta *(1-pivot);
				break ;
			case 10:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin+this._owner._rawHeight *0.5-pos)*delta-this._owner._rawHeight *0.5;
				else
				this._owner.y+=delta *(0.5-pivot);
				break ;
			case 11:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin+this._owner._rawHeight-pos)*delta-this._owner._rawHeight;
				else if (pivot !=0)
				this._owner.y+=delta *(-pivot);
				break ;
			case 12:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin+this._owner._rawHeight-pos)*delta-this._owner._rawHeight;
				else
				this._owner.y+=delta *(0.5-pivot);
				break ;
			case 13:
				if (info.percent)
					this._owner.yMin=pos+(this._owner.yMin+this._owner._rawHeight-pos)*delta-this._owner._rawHeight;
				else
				this._owner.y+=delta *(1-pivot);
				break ;
			case 14:
				if (this._owner._underConstruct && this._owner==this._target.parent)
					v=this._owner.sourceWidth-this._target.initWidth;
				else
				v=this._owner._rawWidth-this._targetWidth;
				if (info.percent)
					v=v *delta;
				if (this._target==this._owner.parent){
					if (this._owner.pivotAsAnchor){
						tmp=this._owner.xMin;
						this._owner.setSize(this._target._width+v,this._owner._rawHeight,true);
						this._owner.xMin=tmp;
					}
					else
					this._owner.setSize(this._target._width+v,this._owner._rawHeight,true);
				}
				else
				this._owner.width=this._target._width+v;
				break ;
			case 15:
				if (this._owner._underConstruct && this._owner==this._target.parent)
					v=this._owner.sourceHeight-this._target.initHeight;
				else
				v=this._owner._rawHeight-this._targetHeight;
				if (info.percent)
					v=v *delta;
				if (this._target==this._owner.parent){
					if (this._owner.pivotAsAnchor){
						tmp=this._owner.yMin;
						this._owner.setSize(this._owner._rawWidth,this._target._height+v,true);
						this._owner.yMin=tmp;
					}
					else
					this._owner.setSize(this._owner._rawWidth,this._target._height+v,true);
				}
				else
				this._owner.height=this._target._height+v;
				break ;
			case 16:
				tmp=this._owner.xMin;
				if (info.percent)
					v=pos+(tmp-pos)*delta-tmp;
				else
				v=delta *(-pivot);
				this._owner.width=this._owner._rawWidth-v;
				this._owner.xMin=tmp+v;
				break ;
			case 17:
				tmp=this._owner.xMin;
				if (info.percent)
					v=pos+(tmp-pos)*delta-tmp;
				else
				v=delta *(1-pivot);
				this._owner.width=this._owner._rawWidth-v;
				this._owner.xMin=tmp+v;
				break ;
			case 18:
				tmp=this._owner.xMin;
				if (info.percent)
					v=pos+(tmp+this._owner._rawWidth-pos)*delta-(tmp+this._owner._rawWidth);
				else
				v=delta *(-pivot);
				this._owner.width=this._owner._rawWidth+v;
				this._owner.xMin=tmp;
				break ;
			case 19:
				tmp=this._owner.xMin;
				if (info.percent){
					if (this._owner==this._target.parent){
						if (this._owner._underConstruct)
							this._owner.width=pos+this._target._width-this._target._width *pivot+
						(this._owner.sourceWidth-pos-this._target.initWidth+this._target.initWidth *pivot)*delta;
						else
						this._owner.width=pos+(this._owner._rawWidth-pos)*delta;
					}
					else{
						v=pos+(tmp+this._owner._rawWidth-pos)*delta-(tmp+this._owner._rawWidth);
						this._owner.width=this._owner._rawWidth+v;
						this._owner.xMin=tmp;
					}
				}
				else{
					if (this._owner==this._target.parent){
						if (this._owner._underConstruct)
							this._owner.width=this._owner.sourceWidth+(this._target._width-this._target.initWidth)*(1-pivot);
						else
						this._owner.width=this._owner._rawWidth+delta *(1-pivot);
					}
					else{
						v=delta *(1-pivot);
						this._owner.width=this._owner._rawWidth+v;
						this._owner.xMin=tmp;
					}
				}
				break ;
			case 20:
				tmp=this._owner.yMin;
				if (info.percent)
					v=pos+(tmp-pos)*delta-tmp;
				else
				v=delta *(-pivot);
				this._owner.height=this._owner._rawHeight-v;
				this._owner.yMin=tmp+v;
				break ;
			case 21:
				tmp=this._owner.yMin;
				if (info.percent)
					v=pos+(tmp-pos)*delta-tmp;
				else
				v=delta *(1-pivot);
				this._owner.height=this._owner._rawHeight-v;
				this._owner.yMin=tmp+v;
				break ;
			case 22:
				tmp=this._owner.yMin;
				if (info.percent)
					v=pos+(tmp+this._owner._rawHeight-pos)*delta-(tmp+this._owner._rawHeight);
				else
				v=delta *(-pivot);
				this._owner.height=this._owner._rawHeight+v;
				this._owner.yMin=tmp;
				break ;
			case 23:
				tmp=this._owner.yMin;
				if (info.percent){
					if (this._owner==this._target.parent){
						if (this._owner._underConstruct)
							this._owner.height=pos+this._target._height-this._target._height *pivot+
						(this._owner.sourceHeight-pos-this._target.initHeight+this._target.initHeight *pivot)*delta;
						else
						this._owner.height=pos+(this._owner._rawHeight-pos)*delta;
					}
					else{
						v=pos+(tmp+this._owner._rawHeight-pos)*delta-(tmp+this._owner._rawHeight);
						this._owner.height=this._owner._rawHeight+v;
						this._owner.yMin=tmp;
					}
				}
				else{
					if (this._owner==this._target.parent){
						if (this._owner._underConstruct)
							this._owner.height=this._owner.sourceHeight+(this._target._height-this._target.initHeight)*(1-pivot);
						else
						this._owner.height=this._owner._rawHeight+delta *(1-pivot);
					}
					else{
						v=delta *(1-pivot);
						this._owner.height=this._owner._rawHeight+v;
						this._owner.yMin=tmp;
					}
				}
				break ;
			}
	}

	__proto.addRefTarget=function(target){
		if (target !=this._owner.parent)
			target.on("fui_xy_changed",this,this.__targetXYChanged);
		target.on("fui_size_changed",this,this.__targetSizeChanged);
		target.on("fui_size_delay_change",this,this.__targetSizeWillChange);
		this._targetX=this._target.x;
		this._targetY=this._target.y;
		this._targetWidth=this._target._width;
		this._targetHeight=this._target._height;
	}

	__proto.releaseRefTarget=function(target){
		if(target.displayObject==null)
			return;
		target.off("fui_xy_changed",this,this.__targetXYChanged);
		target.off("fui_size_changed",this,this.__targetSizeChanged);
		target.off("fui_size_delay_change",this,this.__targetSizeWillChange);
	}

	__proto.__targetXYChanged=function(target){
		if (this._owner.relations.handling!=null || this._owner.group!=null && this._owner.group._updating){
			this._targetX=this._target.x;
			this._targetY=this._target.y;
			return;
		}
		this._owner.relations.handling=target;
		var ox=this._owner.x;
		var oy=this._owner.y;
		var dx=this._target.x-this._targetX;
		var dy=this._target.y-this._targetY;
		var cnt=this._defs.length;
		for(var i=0;i<cnt;i++){
			this.applyOnXYChanged(this._defs[i],dx,dy);
		}
		this._targetX=this._target.x;
		this._targetY=this._target.y;
		if (ox!=this._owner.x || oy!=this._owner.y){
			ox=this._owner.x-ox;
			oy=this._owner.y-oy;
			this._owner.updateGearFromRelations(1,ox,oy);
			if (this._owner.parent !=null && this._owner.parent._transitions.length > 0){
				cnt=this._owner.parent._transitions.length;
				for(var j=0;j<cnt;j++){
					var trans=this._owner.parent._transitions[j];
					trans.updateFromRelations(this._owner.id,ox,oy);
				}
			}
		}
		this._owner.relations.handling=null;
	}

	__proto.__targetSizeChanged=function(target){
		if (this._owner.relations.handling!=null){
			this._targetWidth=this._target._width;
			this._targetHeight=this._target._height;
			return;
		}
		this._owner.relations.handling=target;
		var ox=this._owner.x;
		var oy=this._owner.y;
		var ow=this._owner._rawWidth;
		var oh=this._owner._rawHeight;
		var cnt=this._defs.length;
		for(var i=0;i<cnt;i++){
			this.applyOnSizeChanged(this._defs[i]);
		}
		this._targetWidth=this._target._width;
		this._targetHeight=this._target._height;
		if (ox!=this._owner.x || oy!=this._owner.y){
			ox=this._owner.x-ox;
			oy=this._owner.y-oy;
			this._owner.updateGearFromRelations(1,ox,oy);
			if (this._owner.parent !=null && this._owner.parent._transitions.length > 0){
				cnt=this._owner.parent._transitions.length;
				for(var j=0;j<cnt;j++){
					var trans=this._owner.parent._transitions[j];
					trans.updateFromRelations(this._owner.id,ox,oy);
				}
			}
		}
		if (ow!=this._owner._rawWidth || oh!=this._owner._rawHeight){
			ow=this._owner._rawWidth-ow;
			oh=this._owner._rawHeight-oh;
			this._owner.updateGearFromRelations(2,ow,oh);
		}
		this._owner.relations.handling=null;
	}

	__proto.__targetSizeWillChange=function(target){
		this._owner.relations.sizeDirty=true;
	}

	__getset(0,__proto,'isEmpty',function(){
		return this._defs.length==0;
	});

	__getset(0,__proto,'target',function(){
		return this._target;
		},function(value){
		if(this._target!=value){
			if(this._target)
				this.releaseRefTarget(this._target);
			this._target=value;
			if(this._target)
				this.addRefTarget(this._target);
		}
	});

	__getset(0,__proto,'owner',function(){
		return this._owner;
	});

	RelationItem.__init$=function(){
		//class RelationDef
		RelationDef=(function(){
			function RelationDef(){
				this.percent=false;
				this.type=0;
				this.axis=0;
			}
			__class(RelationDef,'');
			var __proto=RelationDef.prototype;
			__proto.copyFrom=function(source){
				this.percent=source.percent;
				this.type=source.type;
				this.axis=source.axis;
			}
			return RelationDef;
		})()
	}

	return RelationItem;
})()


/**
*Use for UIObjectFactory.newObject
*/
//class fairygui.ObjectType
var ObjectType=(function(){
	function ObjectType(){}
	__class(ObjectType,'fairygui.ObjectType');
	ObjectType.Image=0;
	ObjectType.MovieClip=1;
	ObjectType.Swf=2;
	ObjectType.Graph=3;
	ObjectType.Loader=4;
	ObjectType.Group=5;
	ObjectType.Text=6;
	ObjectType.RichText=7;
	ObjectType.InputText=8;
	ObjectType.Component=9;
	ObjectType.List=10;
	ObjectType.Label=11;
	ObjectType.Button=12;
	ObjectType.ComboBox=13;
	ObjectType.ProgressBar=14;
	ObjectType.Slider=15;
	ObjectType.ScrollBar=16;
	return ObjectType;
})()


/**
*Use for GComponent.childrenRenderOrder
*/
//class fairygui.ChildrenRenderOrder
var ChildrenRenderOrder=(function(){
	function ChildrenRenderOrder(){}
	__class(ChildrenRenderOrder,'fairygui.ChildrenRenderOrder');
	ChildrenRenderOrder.Ascent=0;
	ChildrenRenderOrder.Descent=1;
	ChildrenRenderOrder.Arch=2;
	return ChildrenRenderOrder;
})()


/**
*Use for GTextField.autoSize
*/
//class fairygui.AutoSizeType
var AutoSizeType=(function(){
	function AutoSizeType(){}
	__class(AutoSizeType,'fairygui.AutoSizeType');
	AutoSizeType.None=0;
	AutoSizeType.Both=1;
	AutoSizeType.Height=2;
	AutoSizeType.Shrink=3;
	return AutoSizeType;
})()


//class fairygui.display.Frame
var Frame=(function(){
	function Frame(){
		this.rect=null;
		this.addDelay=0;
		this.texture=null;
		this.rect=new Rectangle();
	}

	__class(Frame,'fairygui.display.Frame');
	return Frame;
})()


//class fairygui.display.BitmapFont
var BitmapFont$1=(function(){
	function BitmapFont(){
		this.id=null;
		this.size=0;
		this.ttf=false;
		this.glyphs=null;
		this.resizable=false;
		this.glyphs={};
	}

	__class(BitmapFont,'fairygui.display.BitmapFont',null,'BitmapFont$1');
	return BitmapFont;
})()


//class fairygui.display.BMGlyph
var BMGlyph=(function(){
	function BMGlyph(){
		this.offsetX=0;
		this.offsetY=0;
		this.width=0;
		this.height=0;
		this.advance=0;
		this.lineHeight=0;
		this.channel=0;
		this.texture=null;
	}

	__class(BMGlyph,'fairygui.display.BMGlyph');
	return BMGlyph;
})()


//class fairygui.display.FillUtils
var FillUtils=(function(){
	function FillUtils(){}
	__class(FillUtils,'fairygui.display.FillUtils');
	FillUtils.fill=function(w,h,method,origin,clockwise,amount){
		if(amount<=0)
			return null;
		else if(amount>=0.9999)
		return [0,0,w,0,w,h,0,h];
		var points;
		switch(method){
			case 1:
				points=fairygui.display.FillUtils.fillHorizontal(w,h,origin,amount);
				break ;
			case 2:
				points=fairygui.display.FillUtils.fillVertical(w,h,origin,amount);
				break ;
			case 3:
				points=fairygui.display.FillUtils.fillRadial90(w,h,origin,clockwise,amount);
				break ;
			case 4:
				points=fairygui.display.FillUtils.fillRadial180(w,h,origin,clockwise,amount);
				break ;
			case 5:
				points=fairygui.display.FillUtils.fillRadial360(w,h,origin,clockwise,amount);
				break ;
			}
		return points;
	}

	FillUtils.fillHorizontal=function(w,h,origin,amount){
		var w2=w*amount;
		if(origin==2 || origin==0)
			return [0,0,w2,0,w2,h,0,h];
		else
		return [w,0,w,h,w-w2,h,w-w2,0];
	}

	FillUtils.fillVertical=function(w,h,origin,amount){
		var h2=h*amount;
		if(origin==2 || origin==0)
			return [0,0,0,h2,w,h2,w,0];
		else
		return [0,h,w,h,w,h-h2,0,h-h2];
	}

	FillUtils.fillRadial90=function(w,h,origin,clockwise,amount){
		if(clockwise && (origin==1 || origin==2)
			|| !clockwise && (origin==0 || origin==3)){
			amount=1-amount;
		};
		var v=NaN,v2=NaN,h2=NaN;
		v=Math.tan(Math.PI / 2 *amount);
		h2=w *v;
		v2=(h2-h)/ h2;
		var points;
		switch(origin){
			case 0:
				if(clockwise){
					if(h2<=h)
						points=[0,0,w,h2,w,0];
					else
					points=[0,0,w*(1-v2),h,w,h,w,0];
				}
				else{
					if(h2<=h)
						points=[0,0,w,h2,w,h,0,h];
					else
					points=[0,0,w*(1-v2),h,0,h];
				}
				break ;
			case 1:
				if(clockwise){
					if(h2<=h)
						points=[w,0,0,h2,0,h,w,h];
					else
					points=[w,0,w*v2,h,w,h];
				}
				else{
					if(h2<=h)
						points=[w,0,0,h2,0,0];
					else
					points=[w,0,w*v2,h,0,h,0,0];
				}
				break ;
			case 2:
				if(clockwise){
					if(h2<=h)
						points=[0,h,w,h-h2,w,0,0,0];
					else
					points=[0,h,w*(1-v2),0,0,0];
				}
				else{
					if(h2<=h)
						points=[0,h,w,h-h2,w,h];
					else
					points=[0,h,w*(1-v2),0,w,0,w,h];
				}
				break ;
			case 3:
				if(clockwise){
					if(h2<=h)
						points=[w,h,0,h-h2,0,h];
					else
					points=[w,h,w*v2,0,0,0,0,h];
				}
				else{
					if(h2<=h)
						points=[w,h,0,h-h2,0,0,w,0];
					else
					points=[w,h,w*v2,0,w,0];
				}
				break ;
			}
		return points;
	}

	FillUtils.movePoints=function(points,offsetX,offsetY){
		var cnt=points.length;
		for(var i=0;i<cnt;i+=2){
			points[i]+=offsetX;
			points[i+1]+=offsetY;
		}
	}

	FillUtils.fillRadial180=function(w,h,origin,clockwise,amount){
		var points;
		switch(origin){
			case 0:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial90(w/2,h,
					clockwise?0:1,
					clockwise,
					amount);
					if(clockwise)
						FillUtils.movePoints(points,w/2,0);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial90(w/2,h,
					clockwise?1:0,
					clockwise,
					amount);
					if(clockwise)
						points.push(w,h,w,0);
					else{
						FillUtils.movePoints(points,w/2,0);
						points.push(0,h,0,0);
					}
				}
				break ;
			case 1:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial90(w/2,h,
					clockwise?3:2,
					clockwise,
					amount);
					if(!clockwise)
						FillUtils.movePoints(points,w/2,0);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial90(w/2,h,
					clockwise?2:3,
					clockwise,
					amount);
					if(clockwise){
						FillUtils.movePoints(points,w/2,0);
						points.push(0,0,0,h);
					}
					else
					points.push(w,0,w,h);
				}
				break ;
			case 2:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial90(w,h/2,
					clockwise?2:0,
					clockwise,
					amount);
					if(!clockwise)
						FillUtils.movePoints(points,0,h/2);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial90(w,h/2,
					clockwise?0:2,
					clockwise,
					amount);
					if(clockwise){
						FillUtils.movePoints(points,0,h/2);
						points.push(w,0,0,0);
					}
					else
					points.push(w,h,0,h);
				}
				break ;
			case 3:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial90(w,h/2,
					clockwise?1:3,
					clockwise,
					amount);
					if(clockwise)
						FillUtils.movePoints(points,0,h/2);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial90(w,h/2,
					clockwise?3:1,
					clockwise,
					amount);
					if(clockwise)
						points.push(0,h,w,h);
					else{
						FillUtils.movePoints(points,0,h/2);
						points.push(0,0,w,0);
					}
				}
				break ;
			}
		return points;
	}

	FillUtils.fillRadial360=function(w,h,origin,clockwise,amount){
		var points;
		switch(origin){
			case 0:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial180(w/2,h,
					clockwise?2:3,
					clockwise,
					amount);
					if(clockwise)
						FillUtils.movePoints(points,w/2,0);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial180(w/2,h,
					clockwise?3:2,
					clockwise,
					amount);
					if(clockwise)
						points.push(w,h,w,0,w/2,0);
					else{
						FillUtils.movePoints(points,w/2,0);
						points.push(0,h,0,0,w/2,0);
					}
				}
				break ;
			case 1:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial180(w/2,h,
					clockwise?3:2,
					clockwise,
					amount);
					if(!clockwise)
						FillUtils.movePoints(points,w/2,0);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial180(w/2,h,
					clockwise?2:3,
					clockwise,
					amount);
					if(clockwise){
						FillUtils.movePoints(points,w/2,0);
						points.push(0,0,0,h,w/2,h);
					}
					else
					points.push(w,0,w,h,w/2,h);
				}
				break ;
			case 2:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial180(w,h/2,
					clockwise?1:0,
					clockwise,
					amount);
					if(!clockwise)
						FillUtils.movePoints(points,0,h/2);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial180(w,h/2,
					clockwise?0:1,
					clockwise,
					amount);
					if(clockwise){
						FillUtils.movePoints(points,0,h/2);
						points.push(w,0,0,0,0,h/2);
					}
					else
					points.push(w,h,0,h,0,h/2);
				}
				break ;
			case 3:
				if(amount<=0.5){
					amount=amount / 0.5;
					points=FillUtils.fillRadial180(w,h/2,
					clockwise?0:1,
					clockwise,
					amount);
					if(clockwise)
						FillUtils.movePoints(points,0,h/2);
				}
				else{
					amount=(amount-0.5)/ 0.5;
					points=FillUtils.fillRadial180(w,h/2,
					clockwise?1:0,
					clockwise,
					amount);
					if(clockwise)
						points.push(0,h,w,h,w,h/2);
					else{
						FillUtils.movePoints(points,0,h/2);
						points.push(0,0,w,0,w,h/2);
					}
				}
				break ;
			}
		return points;
	}

	return FillUtils;
})()


//class fairygui.GObjectPool
var GObjectPool=(function(){
	function GObjectPool(){
		this._pool=null;
		this._count=0;
		this._pool={};
	}

	__class(GObjectPool,'fairygui.GObjectPool');
	var __proto=GObjectPool.prototype;
	__proto.clear=function(){
		for (var i1 in this._pool){
			var arr=this._pool[i1];
			var cnt=arr.length;
			for (var i=0;i < cnt;i++)
			arr[i].dispose();
		}
		this._pool={};
		this._count=0;
	}

	__proto.getObject=function(url){
		url=UIPackage.normalizeURL(url);
		if(url==null)
			return null;
		var arr=this._pool[url];
		if (arr !=null && arr.length>0){
			this._count--;
			return arr.shift();
		};
		var child=UIPackage.createObjectFromURL(url);
		return child;
	}

	__proto.returnObject=function(obj){
		var url=obj.resourceURL;
		if (!url)
			return;
		var arr=this._pool[url];
		if (arr==null){
			arr=[];
			this._pool[url]=arr;
		}
		this._count++;
		arr.push(obj);
	}

	__getset(0,__proto,'count',function(){
		return this._count;
	});

	return GObjectPool;
})()


//class fairygui.PageOption
var PageOption=(function(){
	function PageOption(){
		this._controller=null;
		this._id=null;
	}

	__class(PageOption,'fairygui.PageOption');
	var __proto=PageOption.prototype;
	__proto.clear=function(){
		this._id=null;
	}

	__getset(0,__proto,'name',function(){
		if (this._id)
			return this._controller.getPageNameById(this._id);
		else
		return null;
		},function(pageName){
		this._id=this._controller.getPageIdByName(pageName);
	});

	__getset(0,__proto,'index',function(){
		if (this._id)
			return this._controller.getPageIndexById(this._id);
		else
		return-1;
		},function(pageIndex){
		this._id=this._controller.getPageId(pageIndex);
	});

	__getset(0,__proto,'id',function(){
		return this._id;
		},function(id){
		this._id=id;
	});

	__getset(0,__proto,'controller',null,function(val){
		this._controller=val;
	});

	return PageOption;
})()


//class fairygui.ScrollType
var ScrollType=(function(){
	function ScrollType(){}
	__class(ScrollType,'fairygui.ScrollType');
	ScrollType.Horizontal=0;
	ScrollType.Vertical=1;
	ScrollType.Both=2;
	return ScrollType;
})()


//class fairygui.gears.GearBase
var GearBase=(function(){
	function GearBase(owner){
		this._owner=null;
		this._controller=null;
		this._tweenConfig=null;
		this._owner=owner;
	}

	__class(GearBase,'fairygui.gears.GearBase');
	var __proto=GearBase.prototype;
	__proto.setup=function(buffer){
		this._controller=this._owner.parent.getControllerAt(buffer.getInt16());
		this.init();
		var cnt=0;
		var i=0;
		var page;
		if ((this instanceof fairygui.gears.GearDisplay )){
			cnt=buffer.getInt16();
			var pages=[];
			for (i=0;i < cnt;i++)
			pages[i]=buffer.readS();
			(this).pages=pages;
		}
		else{
			cnt=buffer.getInt16();
			for (i=0;i < cnt;i++){
				page=buffer.readS();
				if (page==null)
					continue ;
				this.addStatus(page,buffer);
			}
			if (buffer.readBool())
				this.addStatus(null,buffer);
		}
		if (buffer.readBool()){
			this._tweenConfig=new GearTweenConfig();
			this._tweenConfig.easeType=buffer.readByte();
			this._tweenConfig.duration=buffer.getFloat32();
			this._tweenConfig.delay=buffer.getFloat32();
		}
	}

	__proto.updateFromRelations=function(dx,dy){}
	__proto.addStatus=function(pageId,buffer){}
	__proto.init=function(){}
	__proto.apply=function(){}
	__proto.updateState=function(){}
	__getset(0,__proto,'tweenConfig',function(){
		if(this._tweenConfig==null)
			this._tweenConfig=new GearTweenConfig();
		return this._tweenConfig;
	});

	__getset(0,__proto,'controller',function(){
		return this._controller;
		},function(val){
		if (val !=this._controller){
			this._controller=val;
			if(this._controller)
				this.init();
		}
	});

	GearBase.disableAllTweenEffect=false;
	return GearBase;
})()


//class fairygui.gears.GearTweenConfig
var GearTweenConfig=(function(){
	function GearTweenConfig(){
		this.tween=false;
		this.easeType=0;
		this.duration=NaN;
		this.delay=NaN;
		this._displayLockToken=NaN;
		this._tweener=null;
		this.tween=true;
		this.easeType=5;
		this.duration=0.3;
		this.delay=0;
	}

	__class(GearTweenConfig,'fairygui.gears.GearTweenConfig');
	return GearTweenConfig;
})()


//class fairygui.Margin
var Margin=(function(){
	function Margin(){
		this.left=0;
		this.right=0;
		this.top=0;
		this.bottom=0;
	}

	__class(Margin,'fairygui.Margin');
	var __proto=Margin.prototype;
	__proto.copy=function(source){
		this.top=source.top;
		this.bottom=source.bottom;
		this.left=source.left;
		this.right=source.right;
	}

	return Margin;
})()


//class fairygui.Events
var Events=(function(){
	function Events(){}
	__class(Events,'fairygui.Events');
	Events.createEvent=function(type,target,source){
		fairygui.Events.$event.setTo(type,target,source?source.target:target);
		if(source){
			fairygui.Events.$event.touchId=source.touchId;
			fairygui.Events.$event.nativeEvent=source.nativeEvent;
		}
		else{
			fairygui.Events.$event.nativeEvent=null;
		}
		fairygui.Events.$event._stoped=false;
		return fairygui.Events.$event;
	}

	Events.dispatch=function(type,target,source){
		target.event(type,fairygui.Events.createEvent(type,target,source));
	}

	Events.STATE_CHANGED="fui_state_changed";
	Events.XY_CHANGED="fui_xy_changed";
	Events.SIZE_CHANGED="fui_size_changed";
	Events.SIZE_DELAY_CHANGE="fui_size_delay_change";
	Events.CLICK_ITEM="fui_click_item";
	Events.SCROLL="fui_scroll";
	Events.SCROLL_END="fui_scroll_end";
	Events.DROP="fui_drop";
	Events.FOCUS_CHANGED="fui_focus_changed";
	Events.DRAG_START="fui_drag_start";
	Events.DRAG_MOVE="fui_drag_move";
	Events.DRAG_END="fui_drag_end";
	Events.PULL_DOWN_RELEASE="fui_pull_down_release";
	Events.PULL_UP_RELEASE="fui_pull_up_release";
	Events.GEAR_STOP="fui_gear_stop";
	__static(Events,
	['$event',function(){return this.$event=new Event();}
	]);
	return Events;
})()


/**
*Use for GComponent.overflow
*/
//class fairygui.OverflowType
var OverflowType=(function(){
	function OverflowType(){}
	__class(OverflowType,'fairygui.OverflowType');
	OverflowType.Visible=0;
	OverflowType.Hidden=1;
	OverflowType.Scroll=2;
	return OverflowType;
})()


//class fairygui.FillMethod
var FillMethod=(function(){
	function FillMethod(){}
	__class(FillMethod,'fairygui.FillMethod');
	FillMethod.None=0;
	FillMethod.Horizontal=1;
	FillMethod.Vertical=2;
	FillMethod.Radial90=3;
	FillMethod.Radial180=4;
	FillMethod.Radial360=5;
	return FillMethod;
})()


//class fairygui.Relations
var Relations=(function(){
	function Relations(owner){
		this._owner=null;
		this._items=null;
		this.handling=null;
		this.sizeDirty=false;
		this._owner=owner;
		this._items=[];
	}

	__class(Relations,'fairygui.Relations');
	var __proto=Relations.prototype;
	__proto.add=function(target,relationType,usePercent){
		(usePercent===void 0)&& (usePercent=false);
		var length=this._items.length;
		for (var i=0;i < length;i++){
			var item=this._items[i];
			if (item.target==target){
				item.add(relationType,usePercent);
				return;
			}
		};
		var newItem=new RelationItem(this._owner);
		newItem.target=target;
		newItem.add(relationType,usePercent);
		this._items.push(newItem);
	}

	__proto.remove=function(target,relationType){
		(relationType===void 0)&& (relationType=0);
		var cnt=this._items.length;
		var i=0;
		while (i < cnt){
			var item=this._items[i];
			if (item.target==target){
				item.remove(relationType);
				if (item.isEmpty){
					item.dispose();
					this._items.splice(i,1);
					cnt--;
				}
				else
				i++;
			}
			else
			i++;
		}
	}

	__proto.contains=function(target){
		var length=this._items.length;
		for (var i=0;i < length;i++){
			var item=this._items[i];
			if (item.target==target)
				return true;
		}
		return false;
	}

	__proto.clearFor=function(target){
		var cnt=this._items.length;
		var i=0;
		while (i < cnt){
			var item=this._items[i];
			if (item.target==target){
				item.dispose();
				this._items.splice(i,1);
				cnt--;
			}
			else
			i++;
		}
	}

	__proto.clearAll=function(){
		var length=this._items.length;
		for (var i=0;i < length;i++){
			var item=this._items[i];
			item.dispose();
		}
		this._items.length=0;
	}

	__proto.copyFrom=function(source){
		this.clearAll();
		var arr=source._items;
		var length=arr.length;
		for (var i=0;i < length;i++){
			var ri=arr[i];
			var item=new RelationItem(this._owner);
			item.copyFrom(ri);
			this._items.push(item);
		}
	}

	__proto.dispose=function(){
		this.clearAll();
	}

	__proto.onOwnerSizeChanged=function(dWidth,dHeight,applyPivot){
		if (this._items.length==0)
			return;
		var length=this._items.length;
		for (var i=0;i < length;i++){
			var item=this._items[i];
			item.applyOnSelfResized(dWidth,dHeight,applyPivot);
		}
	}

	__proto.ensureRelationsSizeCorrect=function(){
		if (this._items.length==0)
			return;
		this.sizeDirty=false;
		var length=this._items.length;
		for (var i=0;i < length;i++){
			var item=this._items[i];
			item.target.ensureSizeCorrect();
		}
	}

	__proto.setup=function(buffer,parentToChild){
		var cnt=buffer.readByte();
		var target;
		for (var i=0;i < cnt;i++){
			var targetIndex=buffer.getInt16();
			if (targetIndex==-1)
				target=this._owner.parent;
			else if (parentToChild)
			target=(this._owner).getChildAt(targetIndex);
			else
			target=this._owner.parent.getChildAt(targetIndex);
			var newItem=new RelationItem(this._owner);
			newItem.target=target;
			this._items.push(newItem);
			var cnt2=buffer.readByte();
			for (var j=0;j < cnt2;j++){
				var rt=buffer.readByte();
				var usePercent=buffer.readBool();
				newItem.internalAdd(rt,usePercent);
			}
		}
	}

	__getset(0,__proto,'empty',function(){
		return this._items.length==0;
	});

	return Relations;
})()


//class fairygui.Transition
var Transition=(function(){
	var TransitionActionType,TransitionItem,TweenConfig,TValue_Visible,TValue_Animation,TValue_Sound,TValue_Transition,TValue_Shake,TValue_Text,TValue;
	function Transition(owner){
		this.name=null;
		this._owner=null;
		this._ownerBaseX=NaN;
		this._ownerBaseY=NaN;
		this._items=null;
		this._totalTimes=0;
		this._totalTasks=0;
		this._playing=false;
		this._paused=false;
		this._onComplete=null;
		this._options=0;
		this._reversed=false;
		this._totalDuration=NaN;
		this._autoPlay=false;
		this._autoPlayTimes=0;
		this._autoPlayDelay=NaN;
		this._timeScale=NaN;
		this._startTime=NaN;
		this._endTime=NaN;
		this.OPTION_IGNORE_DISPLAY_CONTROLLER=1;
		this.OPTION_AUTO_STOP_DISABLED=2;
		this.OPTION_AUTO_STOP_AT_END=4;
		this._owner=owner;
		this._items=[];
		this._totalDuration=0;
		this._autoPlayTimes=1;
		this._autoPlayDelay=0;
		this._timeScale=1;
		this._startTime=0;
		this._endTime=0;
	}

	__class(Transition,'fairygui.Transition');
	var __proto=Transition.prototype;
	__proto.play=function(onComplete,times,delay,startTime,endTime){
		(times===void 0)&& (times=1);
		(delay===void 0)&& (delay=0);
		(startTime===void 0)&& (startTime=0);
		(endTime===void 0)&& (endTime=-1);
		this._play(onComplete,times,delay,startTime,endTime,false);
	}

	__proto.playReverse=function(onComplete,times,delay,startTime,endTime){
		(times===void 0)&& (times=1);
		(delay===void 0)&& (delay=0);
		(startTime===void 0)&& (startTime=0);
		(endTime===void 0)&& (endTime=-1);
		this._play(onComplete,1,delay,startTime,endTime,true);
	}

	__proto.changePlayTimes=function(value){
		this._totalTimes=value;
	}

	__proto.setAutoPlay=function(value,times,delay){
		(times===void 0)&& (times=1);
		(delay===void 0)&& (delay=0);
		if (this._autoPlay !=value){
			this._autoPlay=value;
			this._autoPlayTimes=times;
			this._autoPlayDelay=delay;
			if (this._autoPlay){
				if (this._owner.onStage)
					this.play(null,null,this._autoPlayTimes,this._autoPlayDelay);
			}
			else{
				if (!this._owner.onStage)
					this.stop(false,true);
			}
		}
	}

	__proto._play=function(onComplete,times,delay,startTime,endTime,reversed){
		(times===void 0)&& (times=1);
		(delay===void 0)&& (delay=0);
		(startTime===void 0)&& (startTime=0);
		(endTime===void 0)&& (endTime=-1);
		(reversed===void 0)&& (reversed=false);
		this.stop(true,true);
		this._totalTimes=times;
		this._reversed=reversed;
		this._startTime=startTime;
		this._endTime=endTime;
		this._playing=true;
		this._paused=false;
		this._onComplete=onComplete;
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if(item.target==null){
				if (item.targetId)
					item.target=this._owner.getChildById(item.targetId);
				else
				item.target=this._owner;
			}
			else if (item.target !=this._owner && item.target.parent !=this._owner)
			item.target=null;
			if (item.target !=null && item.type==10){
				var trans=(item.target).getTransition(item.value.transName);
				if(trans==this)
					trans=null;
				if (trans !=null){
					if (item.value.playTimes==0){
						var j=0;
						for (j=i-1;j >=0;j--){
							var item2=this._items[j];
							if (item2.type==10){
								if (item2.value.trans==trans){
									item2.value.stopTime=item.time-item2.time;
									break ;
								}
							}
						}
						if(j<0)
							item.value.stopTime=0;
						else
						trans=null;
					}
					else
					item.value.stopTime=-1;
				}
				item.value.trans=trans;
			}
		}
		if(delay==0)
			this.onDelayedPlay();
		else
		GTween.delayedCall(delay).onComplete(this.onDelayedPlay,this);
	}

	__proto.stop=function(setToComplete,processCallback){
		(setToComplete===void 0)&& (setToComplete=true);
		(processCallback===void 0)&& (processCallback=false);
		if (!this._playing)
			return;
		this._playing=false;
		this._totalTasks=0;
		this._totalTimes=0;
		var handler=this._onComplete;
		this._onComplete=null;
		GTween.kill(this);
		var cnt=this._items.length;
		if(this._reversed){
			for (var i=cnt-1;i >=0;i--){
				var item=this._items[i];
				if(item.target==null)
					continue ;
				this.stopItem(item,setToComplete);
			}
		}
		else{
			for (i=0;i < cnt;i++){
				item=this._items[i];
				if(item.target==null)
					continue ;
				this.stopItem(item,setToComplete);
			}
		}
		if (processCallback && handler !=null){
			handler.run();
		}
	}

	__proto.stopItem=function(item,setToComplete){
		if (item.displayLockToken!=0){
			item.target.releaseDisplayLock(item.displayLockToken);
			item.displayLockToken=0;
		}
		if (item.tweener !=null){
			item.tweener.kill(setToComplete);
			item.tweener=null;
			if (item.type==11 && !setToComplete){
				item.target._gearLocked=true;
				item.target.setXY(item.target.x-item.value.lastOffsetX,item.target.y-item.value.lastOffsetY);
				item.target._gearLocked=false;
			}
		}
		if (item.type==10){
			var trans=item.value.trans;
			if (trans !=null)
				trans.stop(setToComplete,false);
		}
	}

	__proto.setPaused=function(paused){
		if (!this._playing || this._paused==paused)
			return;
		this._paused=paused;
		var tweener=GTween.getTween(this);
		if (tweener !=null)
			tweener.setPaused(paused);
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.target==null)
				continue ;
			if (item.type==10){
				if (item.value.trans !=null)
					item.value.trans.setPaused(paused);
			}
			else if (item.type==7){
				if (paused){
					item.value.flag=(item.target).playing;
					(item.target).playing=false;
				}
				else
				(item.target).playing=item.value.flag;
			}
			if (item.tweener !=null)
				item.tweener.setPaused(paused);
		}
	}

	__proto.dispose=function(){
		if(this._playing)
			GTween.kill(this);
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.tweener !=null){
				item.tweener.kill();
				item.tweener=null;
			}
			item.target=null;
			item.hook=null;
			if (item.tweenConfig !=null)
				item.tweenConfig.endHook=null;
		}
		this._items.length=0;
		this._playing=false;
		this._onComplete=null;
	}

	__proto.setValue=function(label,__args){
		var args=[];for(var i=1,sz=arguments.length;i<sz;i++)args.push(arguments[i]);
		var cnt=this._items.length;
		var value;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.label==label){
				if (item.tweenConfig !=null)
					value=item.tweenConfig.startValue;
				else
				value=item.value;
			}
			else if (item.tweenConfig !=null && item.tweenConfig.endLabel==label){
				value=item.tweenConfig.endValue;
			}
			else
			continue ;
			switch (item.type){
				case 0:
				case 1:
				case 3:
				case 2:
				case 13:
					value.b1=true;
					value.b2=true;
					value.f1=parseFloat(args[0]);
					value.f2=parseFloat(args[1]);
					break ;
				case 4:
					value.f1=parseFloat(args[0]);
					break ;
				case 5:
					value.f1=parseFloat(args[0]);
					break ;
				case 6:
					value.f1=parseFloat(args[0]);
					break ;
				case 7:
					value.frame=parseInt(args[0]);
					if (args.length > 1)
						value.playing=args[1];
					break ;
				case 8:
					value.visible=args[0];
					break ;
				case 9:
					value.sound=args[0];
					if(args.length > 1)
						value.volume=parseFloat(args[1]);
					break ;
				case 10:
					value.transName=args[0];
					if (args.length > 1)
						value.playTimes=parseInt(args[1]);
					break ;
				case 11:
					value.amplitude=parseFloat(args[0]);
					if (args.length > 1)
						value.duration=parseFloat(args[1]);
					break ;
				case 12:
					value.f1=parseFloat(args[0]);
					value.f2=parseFloat(args[1]);
					value.f3=parseFloat(args[2]);
					value.f4=parseFloat(args[3]);
					break ;
				case 14:
				case 15:
					value.text=args[0];
					break ;
				}
		}
	}

	__proto.setHook=function(label,callback){
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.label==label){
				item.hook=callback;
				break ;
			}
			else if (item.tweenConfig !=null && item.tweenConfig.endLabel==label){
				item.tweenConfig.endHook=callback;
				break ;
			}
		}
	}

	__proto.clearHooks=function(){
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			item.hook=null;
			if (item.tweenConfig !=null)
				item.tweenConfig.endHook=null;
		}
	}

	__proto.setTarget=function(label,newTarget){
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.label==label){
				item.targetId=newTarget.id;
				item.target=null;
			}
		}
	}

	__proto.setDuration=function(label,value){
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.tweenConfig !=null && item.label==label)
				item.tweenConfig.duration=value;
		}
	}

	__proto.getLabelTime=function(label){
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.label==label)
				return item.time;
			else if (item.tweenConfig !=null && item.tweenConfig.endLabel==label)
			return item.time+item.tweenConfig.duration;
		}
		return Number.NaN;
	}

	__proto.updateFromRelations=function(targetId,dx,dy){
		var cnt=this._items.length;
		if (cnt==0)
			return;
		for (var i=0;i < cnt;i++){
			var item=this._items[i];
			if (item.type==0 && item.targetId==targetId){
				if (item.tweenConfig!=null){
					item.tweenConfig.startValue.f1+=dx;
					item.tweenConfig.startValue.f2+=dy;
					item.tweenConfig.endValue.f1+=dx;
					item.tweenConfig.endValue.f2+=dy;
				}
				else{
					item.value.f1+=dx;
					item.value.f2+=dy;
				}
			}
		}
	}

	__proto.onOwnerAddedToStage=function(){
		if (this._autoPlay && !this._playing)
			this.play(null,this._autoPlayTimes,this._autoPlayDelay);
	}

	__proto.onOwnerRemovedFromStage=function(){
		if ((this._options & this.OPTION_AUTO_STOP_DISABLED)==0)
			this.stop((this._options & this.OPTION_AUTO_STOP_AT_END)!=0 ? true :false,false);
	}

	__proto.onDelayedPlay=function(){
		this.internalPlay();
		this._playing=this._totalTasks>0;
		if (this._playing){
			if ((this._options & this.OPTION_IGNORE_DISPLAY_CONTROLLER)!=0){
				var cnt=this._items.length;
				for (var i=0;i < cnt;i++){
					var item=this._items[i];
					if (item.target !=null && item.target!=this._owner)
						item.displayLockToken=item.target.addDisplayLock();
				}
			}
		}
		else if (this._onComplete !=null){
			var handler=this._onComplete;
			this._onComplete=null;
			handler.run();
		}
	}

	__proto.internalPlay=function(){
		this._ownerBaseX=this._owner.x;
		this._ownerBaseY=this._owner.y;
		this._totalTasks=0;
		var cnt=this._items.length;
		var item;
		var needSkipAnimations=false;
		if (!this._reversed){
			for (var i=0;i < cnt;i++){
				item=this._items[i];
				if (item.target==null)
					continue ;
				if (item.type==7 && this._startTime !=0 && item.time <=this._startTime){
					needSkipAnimations=true;
					item.value.flag=false;
				}
				else
				this.playItem(item);
			}
		}
		else{
			for (i=cnt-1;i >=0;i--){
				item=this._items[i];
				if (item.target==null)
					continue ;
				this.playItem(item);
			}
		}
		if (needSkipAnimations)
			this.skipAnimations();
	}

	__proto.playItem=function(item){
		var time=NaN;
		if (item.tweenConfig !=null){
			if (this._reversed)
				time=(this._totalDuration-item.time-item.tweenConfig.duration);
			else
			time=item.time;
			if (this._endTime==-1 || time <=this._endTime){
				var startValue;
				var endValue;
				if(this._reversed){
					startValue=item.tweenConfig.endValue;
					endValue=item.tweenConfig.startValue;
				}
				else{
					startValue=item.tweenConfig.startValue;
					endValue=item.tweenConfig.endValue;
				}
				item.value.b1=startValue.b1 || endValue.b1;
				item.value.b2=startValue.b2 || endValue.b2;
				switch(item.type){
					case 0:
					case 1:
					case 2:
					case 13:
						item.tweener=GTween.to2(startValue.f1,startValue.f2,endValue.f1,endValue.f2,item.tweenConfig.duration);
						break ;
					case 4:
					case 5:
						item.tweener=GTween.to(startValue.f1,endValue.f1,item.tweenConfig.duration);
						break ;
					case 6:
						item.tweener=GTween.toColor(startValue.f1,endValue.f1,item.tweenConfig.duration);
						break ;
					case 12:
						item.tweener=GTween.to4(startValue.f1,startValue.f2,startValue.f3,startValue.f4,
						endValue.f1,endValue.f2,endValue.f3,endValue.f4,item.tweenConfig.duration);
						break ;
					}
				item.tweener.setDelay(time)
				.setEase(item.tweenConfig.easeType)
				.setRepeat(item.tweenConfig.repeat,item.tweenConfig.yoyo)
				.setTimeScale(this._timeScale)
				.setTarget(item)
				.onStart(this.onTweenStart,this)
				.onUpdate(this.onTweenUpdate,this)
				.onComplete(this.onTweenComplete,this);
				if (this._endTime >=0)
					item.tweener.setBreakpoint(this._endTime-time);
				this._totalTasks++;
			}
		}
		else if(item.type==11){
			if (this._reversed)
				time=(this._totalDuration-item.time-item.value.duration);
			else
			time=item.time;
			item.value.offsetX=item.value.offsetY=0;
			item.value.lastOffsetX=item.value.lastOffsetY=0;
			item.tweener=GTween.shake(0,0,item.value.amplitude,item.value.duration)
			.setDelay(time)
			.setTimeScale(this._timeScale)
			.setTarget(item)
			.onUpdate(this.onTweenUpdate,this)
			.onComplete(this.onTweenComplete,this);
			if (this._endTime >=0)
				item.tweener.setBreakpoint(this._endTime-item.time);
			this._totalTasks++;
		}
		else{
			if (this._reversed)
				time=(this._totalDuration-item.time);
			else
			time=item.time;
			if (time <=this._startTime){
				this.applyValue(item);
				this.callHook(item,false);
			}
			else if (this._endTime==-1 || time <=this._endTime){
				this._totalTasks++;
				item.tweener=GTween.delayedCall(time)
				.setTimeScale(this._timeScale)
				.setTarget(item)
				.onComplete(this.onDelayedPlayItem,this);
			}
		}
		if (item.tweener !=null)
			item.tweener.seek(this._startTime);
	}

	__proto.skipAnimations=function(){
		var frame=0;
		var playStartTime=NaN;
		var playTotalTime=NaN;
		var value;
		var target;
		var item;
		var cnt=this._items.length;
		for (var i=0;i < cnt;i++){
			item=this._items[i];
			if (item.type !=7 || item.time > this._startTime)
				continue ;
			value=item.value;
			if (value.flag)
				continue ;
			target=(item.target);
			frame=target.frame;
			playStartTime=target.playing ? 0 :-1;
			playTotalTime=0;
			for (var j=i;j < cnt;j++){
				item=this._items[j];
				if (item.type !=7 || item.target !=target || item.time > this._startTime)
					continue ;
				value=item.value;
				value.flag=true;
				if (value.frame !=-1){
					frame=value.frame;
					if (value.playing)
						playStartTime=item.time;
					else
					playStartTime=-1;
					playTotalTime=0;
				}
				else{
					if (value.playing){
						if (playStartTime < 0)
							playStartTime=item.time;
					}
					else{
						if (playStartTime >=0)
							playTotalTime+=(item.time-playStartTime);
						playStartTime=-1;
					}
				}
				this.callHook(item,false);
			}
			if (playStartTime >=0)
				playTotalTime+=(this._startTime-playStartTime);
			target.playing=playStartTime>=0;
			target.frame=frame;
			if (playTotalTime > 0)
				target.advance(playTotalTime*1000);
		}
	}

	__proto.onDelayedPlayItem=function(tweener){
		var item=tweener.target;
		item.tweener=null;
		this._totalTasks--;
		this.applyValue(item);
		this.callHook(item,false);
		this.checkAllComplete();
	}

	__proto.onTweenStart=function(tweener){
		var item=tweener.target;
		if (item.type==0 || item.type==1){
			var startValue;
			var endValue;
			if (this._reversed){
				startValue=item.tweenConfig.endValue;
				endValue=item.tweenConfig.startValue;
			}
			else{
				startValue=item.tweenConfig.startValue;
				endValue=item.tweenConfig.endValue;
			}
			if (item.type==0){
				if (item.target !=this._owner){
					if (!startValue.b1)
						startValue.f1=item.target.x;
					if (!startValue.b2)
						startValue.f2=item.target.y;
				}
				else{
					if (!startValue.b1)
						startValue.f1=item.target.x-this._ownerBaseX;
					if (!startValue.b2)
						startValue.f2=item.target.y-this._ownerBaseY;
				}
			}
			else{
				if (!startValue.b1)
					startValue.f1=item.target.width;
				if (!startValue.b2)
					startValue.f2=item.target.height;
			}
			if (!endValue.b1)
				endValue.f1=startValue.f1;
			if (!endValue.b2)
				endValue.f2=startValue.f2;
			tweener.startValue.x=startValue.f1;
			tweener.startValue.y=startValue.f2;
			tweener.endValue.x=endValue.f1;
			tweener.endValue.y=endValue.f2;
		}
		this.callHook(item,false);
	}

	__proto.onTweenUpdate=function(tweener){
		var item=tweener.target;
		switch (item.type){
			case 0:
			case 1:
			case 2:
			case 13:
				item.value.f1=tweener.value.x;
				item.value.f2=tweener.value.y;
				break ;
			case 4:
			case 5:
				item.value.f1=tweener.value.x;
				break ;
			case 6:
				item.value.f1=tweener.value.color;
				break ;
			case 12:
				item.value.f1=tweener.value.x;
				item.value.f2=tweener.value.y;
				item.value.f3=tweener.value.z;
				item.value.f4=tweener.value.w;
				break ;
			case 11:
				item.value.offsetX=tweener.deltaValue.x;
				item.value.offsetY=tweener.deltaValue.y;
				break ;
			}
		this.applyValue(item);
	}

	__proto.onTweenComplete=function(tweener){
		var item=tweener.target;
		item.tweener=null;
		this._totalTasks--;
		if (tweener.allCompleted)
			this.callHook(item,true);
		this.checkAllComplete();
	}

	__proto.onPlayTransCompleted=function(item){
		this._totalTasks--;
		this.checkAllComplete();
	}

	__proto.callHook=function(item,tweenEnd){
		if (tweenEnd){
			if (item.tweenConfig!=null && item.tweenConfig.endHook !=null)
				item.tweenConfig.endHook.run();
		}
		else{
			if (item.time >=this._startTime && item.hook !=null)
				item.hook.run();
		}
	}

	__proto.checkAllComplete=function(){
		if (this._playing && this._totalTasks==0){
			if (this._totalTimes < 0){
				this.internalPlay();
			}
			else{
				this._totalTimes--;
				if (this._totalTimes > 0)
					this.internalPlay();
				else{
					this._playing=false;
					var cnt=this._items.length;
					for (var i=0;i < cnt;i++){
						var item=this._items[i];
						if (item.target !=null && item.displayLockToken!=0){
							item.target.releaseDisplayLock(item.displayLockToken);
							item.displayLockToken=0;
						}
					}
					if (this._onComplete !=null){
						var handler=this._onComplete;
						this._onComplete=null;
						handler.run();
					}
				}
			}
		}
	}

	__proto.applyValue=function(item){
		item.target._gearLocked=true;
		switch (item.type){
			case 0:
				if(item.target==this._owner){
					var f1=NaN,f2=NaN;
					if (!item.value.b1)
						f1=item.target.x;
					else
					f1=item.value.f1+this._ownerBaseX;
					if (!item.value.b2)
						f2=item.target.y;
					else
					f2=item.value.f2+this._ownerBaseY;
					item.target.setXY(f1,f2);
				}
				else{
					if (!item.value.b1)
						item.value.f1=item.target.x;
					if (!item.value.b2)
						item.value.f2=item.target.y;
					item.target.setXY(item.value.f1,item.value.f2);
				}
				break ;
			case 1:
				if (!item.value.b1)
					item.value.f1=item.target.width;
				if (!item.value.b2)
					item.value.f2=item.target.height;
				item.target.setSize(item.value.f1,item.value.f2);
				break ;
			case 3:
				item.target.setPivot(item.value.f1,item.value.f2,item.target.pivotAsAnchor);
				break ;
			case 4:
				item.target.alpha=item.value.f1;
				break ;
			case 5:
				item.target.rotation=item.value.f1;
				break ;
			case 2:
				item.target.setScale(item.value.f1,item.value.f2);
				break ;
			case 13:
				item.target.setSkew(item.value.f1,item.value.f2);
				break ;
			case 6:
				(item.target).color=ToolSet.convertToHtmlColor(item.value.f1,false);
				break ;
			case 7:
				if (item.value.frame>=0)
					(item.target).frame=item.value.frame;
				(item.target).playing=item.value.playing;
				(item.target).timeScale=this._timeScale;
				break ;
			case 8:
				item.target.visible=item.value.visible;
				break ;
			case 10:
				if (this._playing){
					var trans=item.value.trans;
					if (trans !=null){
						this._totalTasks++;
						var startTime=this._startTime > item.time ? (this._startTime-item.time):0;
						var endTime=this._endTime >=0 ? (this._endTime-item.time):-1;
						if (item.value.stopTime >=0 && (endTime < 0 || endTime > item.value.stopTime))
							endTime=item.value.stopTime;
						trans.timeScale=this._timeScale;
						trans._play(Handler.create(this,this.onPlayTransCompleted,[item]),item.value.playTimes,0,startTime,endTime,this._reversed);
					}
				}
				break ;
			case 9:
				if (this._playing && item.time >=this._startTime){
					if(item.value.audioClip==null){
						var pi=UIPackage.getItemByURL(item.value.sound);
						if(pi)
							item.value.audioClip=pi.file;
						else
						item.value.audioClip=item.value.sound;
					}
					if(item.value.audioClip)
						GRoot.inst.playOneShotSound(item.value.audioClip,item.value.volume);
				}
				break ;
			case 11:
				item.target.setXY(item.target.x-item.value.lastOffsetX+item.value.offsetX,item.target.y-item.value.lastOffsetY+item.value.offsetY);
				item.value.lastOffsetX=item.value.offsetX;
				item.value.lastOffsetY=item.value.offsetY;
				break ;
			case 12:{
					var arr=item.target.filters;
					var cm=new ColorMatrix();
					cm.adjustBrightness(item.value.f1);
					cm.adjustContrast(item.value.f2);
					cm.adjustSaturation(item.value.f3);
					cm.adjustHue(item.value.f4);
					arr=[new ColorFilter(cm)];
					item.target.filters=arr;
					break ;
				}
			case 14:
				item.target.text=item.value.text;
				break ;
			case 15:
				item.target.icon=item.value.text;
				break ;
			}
		item.target._gearLocked=false;
	}

	__proto.setup=function(buffer){
		this.name=buffer.readS();
		this._options=buffer.getInt32();
		this._autoPlay=buffer.readBool();
		this._autoPlayTimes=buffer.getInt32();
		this._autoPlayDelay=buffer.getFloat32();
		var cnt=buffer.getInt16();
		for (var i=0;i < cnt;i++){
			var dataLen=buffer.getInt16();
			var curPos=buffer.pos;
			buffer.seek(curPos,0);
			var item=new TransitionItem(buffer.readByte());
			this._items[i]=item;
			item.time=buffer.getFloat32();
			var targetId=buffer.getInt16();
			if (targetId < 0)
				item.targetId="";
			else
			item.targetId=this._owner.getChildAt(targetId).id;
			item.label=buffer.readS();
			if (buffer.readBool()){
				buffer.seek(curPos,1);
				item.tweenConfig=new TweenConfig();
				item.tweenConfig.duration=buffer.getFloat32();
				if (item.time+item.tweenConfig.duration > this._totalDuration)
					this._totalDuration=item.time+item.tweenConfig.duration;
				item.tweenConfig.easeType=buffer.readByte();
				item.tweenConfig.repeat=buffer.getInt32();
				item.tweenConfig.yoyo=buffer.readBool();
				item.tweenConfig.endLabel=buffer.readS();
				buffer.seek(curPos,2);
				this.decodeValue(item,buffer,item.tweenConfig.startValue);
				buffer.seek(curPos,3);
				this.decodeValue(item,buffer,item.tweenConfig.endValue);
			}
			else{
				if (item.time > this._totalDuration)
					this._totalDuration=item.time;
				buffer.seek(curPos,2);
				this.decodeValue(item,buffer,item.value);
			}
			buffer.pos=curPos+dataLen;
		}
	}

	__proto.decodeValue=function(item,buffer,value){
		switch(item.type){
			case 0:
			case 1:
			case 3:
			case 13:
				value.b1=buffer.readBool();
				value.b2=buffer.readBool();
				value.f1=buffer.getFloat32();
				value.f2=buffer.getFloat32();
				break ;
			case 4:
			case 5:
				value.f1=buffer.getFloat32();
				break ;
			case 2:
				value.f1=buffer.getFloat32();
				value.f2=buffer.getFloat32();
				break ;
			case 6:
				value.f1=buffer.readColor();
				break ;
			case 7:
				value.playing=buffer.readBool();
				value.frame=buffer.getInt32();
				break ;
			case 8:
				value.visible=buffer.readBool();
				break ;
			case 9:
				value.sound=buffer.readS();
				value.volume=buffer.getFloat32();
				break ;
			case 10:
				value.transName=buffer.readS();
				value.playTimes=buffer.getInt32();
				break ;
			case 11:
				value.amplitude=buffer.getFloat32();
				value.duration=buffer.getFloat32();
				break ;
			case 12:
				value.f1=buffer.getFloat32();
				value.f2=buffer.getFloat32();
				value.f3=buffer.getFloat32();
				value.f4=buffer.getFloat32();
				break ;
			case 14:
			case 15:
				value.text=buffer.readS();
				break ;
			}
	}

	__getset(0,__proto,'timeScale',function(){
		return this._timeScale;
		},function(value){
		if(this._timeScale !=value){
			this._timeScale=value;
			if (this._playing){
				var cnt=this._items.length;
				for (var i=0;i < cnt;i++){
					var item=this._items[i];
					if (item.tweener !=null)
						item.tweener.setTimeScale(value);
					else if (item.type==10){
						if(item.value.trans !=null)
							item.value.trans.timeScale=value;
					}
					else if(item.type==7){
						if(item.target !=null)
							(item.target).timeScale=value;
					}
				}
			}
		}
	});

	__getset(0,__proto,'playing',function(){
		return this._playing;
	});

	Transition.__init$=function(){
		//class TransitionActionType
		TransitionActionType=(function(){
			function TransitionActionType(){}
			__class(TransitionActionType,'');
			TransitionActionType.XY=0;
			TransitionActionType.Size=1;
			TransitionActionType.Scale=2;
			TransitionActionType.Pivot=3;
			TransitionActionType.Alpha=4;
			TransitionActionType.Rotation=5;
			TransitionActionType.Color=6;
			TransitionActionType.Animation=7;
			TransitionActionType.Visible=8;
			TransitionActionType.Sound=9;
			TransitionActionType.Transition=10;
			TransitionActionType.Shake=11;
			TransitionActionType.ColorFilter=12;
			TransitionActionType.Skew=13;
			TransitionActionType.Text=14;
			TransitionActionType.Icon=15;
			TransitionActionType.Unknown=16;
			return TransitionActionType;
		})()
		//class TransitionItem
		TransitionItem=(function(){
			function TransitionItem(type){
				this.time=NaN;
				this.targetId=null;
				this.type=0;
				this.tweenConfig=null;
				this.label=null;
				this.value=null;
				this.hook=null;
				this.tweener=null;
				this.target=null;
				this.displayLockToken=0;
				this.type=type;
				switch (type){
					case 0:
					case 1:
					case 2:
					case 3:
					case 13:
					case 4:
					case 5:
					case 6:
					case 12:
						this.value=new TValue();
						break ;
					case 7:
						this.value=new TValue_Animation();
						break ;
					case 11:
						this.value=new TValue_Shake();
						break ;
					case 9:
						this.value=new TValue_Sound();
						break ;
					case 10:
						this.value=new TValue_Transition();
						break ;
					case 8:
						this.value=new TValue_Visible();
						break ;
					case 14:
					case 15:
						this.value=new TValue_Text();
						break ;
					}
			}
			__class(TransitionItem,'');
			return TransitionItem;
		})()
		//class TweenConfig
		TweenConfig=(function(){
			function TweenConfig(){
				this.duration=NaN;
				this.easeType=0;
				this.repeat=0;
				this.yoyo=false;
				this.startValue=null;
				this.endValue=null;
				this.endLabel=null;
				this.endHook=null;
				this.easeType=5;
				this.startValue=new TValue();
				this.endValue=new TValue();
			}
			__class(TweenConfig,'');
			return TweenConfig;
		})()
		//class TValue_Visible
		TValue_Visible=(function(){
			function TValue_Visible(){
				this.visible=false;
			}
			__class(TValue_Visible,'');
			return TValue_Visible;
		})()
		//class TValue_Animation
		TValue_Animation=(function(){
			function TValue_Animation(){
				this.frame=0;
				this.playing=false;
				this.flag=false;
			}
			__class(TValue_Animation,'');
			return TValue_Animation;
		})()
		//class TValue_Sound
		TValue_Sound=(function(){
			function TValue_Sound(){
				this.sound=null;
				this.volume=NaN;
				this.audioClip=null;
			}
			__class(TValue_Sound,'');
			return TValue_Sound;
		})()
		//class TValue_Transition
		TValue_Transition=(function(){
			function TValue_Transition(){
				this.transName=null;
				this.playTimes=0;
				this.trans=null;
				this.stopTime=NaN;
			}
			__class(TValue_Transition,'');
			return TValue_Transition;
		})()
		//class TValue_Shake
		TValue_Shake=(function(){
			function TValue_Shake(){
				this.amplitude=NaN;
				this.duration=NaN;
				this.offsetX=NaN;
				this.offsetY=NaN;
				this.lastOffsetX=NaN;
				this.lastOffsetY=NaN;
			}
			__class(TValue_Shake,'');
			return TValue_Shake;
		})()
		//class TValue_Text
		TValue_Text=(function(){
			function TValue_Text(){
				this.text=null;
			}
			__class(TValue_Text,'');
			return TValue_Text;
		})()
		//class TValue
		TValue=(function(){
			function TValue(){
				this.f1=NaN;
				this.f2=NaN;
				this.f3=NaN;
				this.f4=NaN;
				this.b1=false;
				this.b2=false;
				this.b1=this.b2=true;
			}
			__class(TValue,'');
			return TValue;
		})()
	}

	return Transition;
})()


//class fairygui.UIObjectFactory
var UIObjectFactory=(function(){
	function UIObjectFactory(){}
	__class(UIObjectFactory,'fairygui.UIObjectFactory');
	UIObjectFactory.setPackageItemExtension=function(url,type){
		if (url==null)
			throw new Error("Invaild url: "+url);
		var pi=UIPackage.getItemByURL(url);
		if (pi !=null)
			pi.extensionType=type;
		UIObjectFactory.packageItemExtensions[url]=type;
	}

	UIObjectFactory.setLoaderExtension=function(type){
		fairygui.UIObjectFactory.loaderType=type;
	}

	UIObjectFactory.resolvePackageItemExtension=function(pi){
		pi.extensionType=UIObjectFactory.packageItemExtensions["ui://"+pi.owner.id+pi.id];
		if(!pi.extensionType)
			pi.extensionType=UIObjectFactory.packageItemExtensions["ui://"+pi.owner.name+"/"+pi.name];
	}

	UIObjectFactory.newObject=function(pi){
		if(pi.extensionType!=null)
			return new pi.extensionType();
		else
		return UIObjectFactory.newObject2(pi.objectType);
	}

	UIObjectFactory.newObject2=function(type){
		switch (type){
			case 0:
				return new GImage();
			case 1:
				return new GMovieClip();
			case 9:
				return new GComponent();
			case 6:
				return new GBasicTextField();
			case 7:
				return new GRichTextField();
			case 8:
				return new GTextInput();
			case 5:
				return new GGroup();
			case 10:
				return new GList();
			case 3:
				return new GGraph();
			case 4:
				if (fairygui.UIObjectFactory.loaderType !=null)
					return new fairygui.UIObjectFactory.loaderType();
				else
				return new GLoader();
			case 12:
				return new GButton();
			case 11:
				return new GLabel();
			case 14:
				return new GProgressBar();
			case 15:
				return new GSlider();
			case 16:
				return new GScrollBar();
			case 13:
				return new GComboBox();
			default :
				return null;
			}
	}

	UIObjectFactory.packageItemExtensions={};
	UIObjectFactory.loaderType=null;
	return UIObjectFactory;
})()


//class fairygui.utils.ColorMatrix extends Array
var ColorMatrix=(function(_super){
	// initialization:
	function ColorMatrix(){
		ColorMatrix.__super.call(this);
		this.reset();
	}

	__class(ColorMatrix,'fairygui.utils.ColorMatrix',Array);
	var __proto=ColorMatrix.prototype;
	// public methods:
	__proto.reset=function(){
		for (var i=0;i<ColorMatrix.LENGTH;i++){
			this[i]=ColorMatrix.IDENTITY_MATRIX[i];
		}
	}

	__proto.invert=function(){
		this.multiplyMatrix([-1,0,0,0,255,
		0,-1,0,0,255,
		0,0,-1,0,255,
		0,0,0,1,0]);
	}

	__proto.adjustColor=function(p_brightness,p_contrast,p_saturation,p_hue){
		this.adjustHue(p_hue);
		this.adjustContrast(p_contrast);
		this.adjustBrightness(p_brightness);
		this.adjustSaturation(p_saturation);
	}

	__proto.adjustBrightness=function(p_val){
		p_val=this.cleanValue(p_val,1)*255;
		this.multiplyMatrix([
		1,0,0,0,p_val,
		0,1,0,0,p_val,
		0,0,1,0,p_val,
		0,0,0,1,0]);
	}

	__proto.adjustContrast=function(p_val){
		p_val=this.cleanValue(p_val,1);
		var s=p_val+1;
		var o=128 *(1-s);
		this.multiplyMatrix([
		s,0,0,0,o,
		0,s,0,0,o,
		0,0,s,0,o,
		0,0,0,1,0]);
	}

	__proto.adjustSaturation=function(p_val){
		p_val=this.cleanValue(p_val,1);
		p_val+=1;
		var invSat=1-p_val;
		var invLumR=invSat *0.299;
		var invLumG=invSat *0.587;
		var invLumB=invSat *0.114;
		this.multiplyMatrix([
		(invLumR+p_val),invLumG,invLumB,0,0,
		invLumR,(invLumG+p_val),invLumB,0,0,
		invLumR,invLumG,(invLumB+p_val),0,0,
		0,0,0,1,0]);
	}

	__proto.adjustHue=function(p_val){
		p_val=this.cleanValue(p_val,1);
		p_val *=Math.PI;
		var cos=Math.cos(p_val);
		var sin=Math.sin(p_val);
		this.multiplyMatrix([
		((0.299+(cos *(1-0.299)))+(sin *-(0.299))),((0.587+(cos *-(0.587)))+(sin *-(0.587))),((0.114+(cos *-(0.114)))+(sin *(1-0.114))),0,0,
		((0.299+(cos *-(0.299)))+(sin *0.143)),((0.587+(cos *(1-0.587)))+(sin *0.14)),((0.114+(cos *-(0.114)))+(sin *-0.283)),0,0,
		((0.299+(cos *-(0.299)))+(sin *-((1-0.299)))),((0.587+(cos *-(0.587)))+(sin *0.587)),((0.114+(cos *(1-0.114)))+(sin *0.114)),0,0,
		0,0,0,1,0]);
	}

	__proto.concat=function(p_matrix){
		if (p_matrix.length !=ColorMatrix.LENGTH){return;}
			this.multiplyMatrix(p_matrix);
	}

	__proto.clone=function(){
		var result=new ColorMatrix();
		result.copyMatrix(this);
		return result;
	}

	__proto.copyMatrix=function(p_matrix){
		var l=ColorMatrix.LENGTH;
		for (var i=0;i<l;i++){
			this[i]=p_matrix[i];
		}
	}

	__proto.multiplyMatrix=function(p_matrix){
		var col=[];
		var i=0;
		for (var y=0;y<4;++y){
			for (var x=0;x<5;++x){
				col[i+x]=p_matrix[i] *this[x]+
				p_matrix[i+1] *this[x+5]+
				p_matrix[i+2] *this[x+10]+
				p_matrix[i+3] *this[x+15]+
				(x==4 ? p_matrix[i+4] :0);
			}
			i+=5;
		}
		this.copyMatrix(col);
	}

	__proto.cleanValue=function(p_val,p_limit){
		return Math.min(p_limit,Math.max(-p_limit,p_val));
	}

	ColorMatrix.create=function(p_brightness,p_contrast,p_saturation,p_hue){
		var ret=new ColorMatrix();
		ret.adjustColor(p_brightness,p_contrast,p_saturation,p_hue);
		return ret;
	}

	ColorMatrix.LUMA_R=0.299;
	ColorMatrix.LUMA_G=0.587;
	ColorMatrix.LUMA_B=0.114;
	__static(ColorMatrix,
	['IDENTITY_MATRIX',function(){return this.IDENTITY_MATRIX=[
		1,0,0,0,0,
		0,1,0,0,0,
		0,0,1,0,0,
		0,0,0,1,0];},'LENGTH',function(){return this.LENGTH=ColorMatrix.IDENTITY_MATRIX.length;}
	]);
	return ColorMatrix;
})(Array)


/**
*<p><code>ColorFilter</code> 是颜色滤镜。使用 ColorFilter 类可以将 4 x 5 矩阵转换应用于输入图像上的每个像素的 RGBA 颜色和 Alpha 值，以生成具有一组新的 RGBA 颜色和 Alpha 值的结果。该类允许饱和度更改、色相旋转、亮度转 Alpha 以及各种其他效果。您可以将滤镜应用于任何显示对象（即，从 Sprite 类继承的对象）。</p>
*<p>注意：对于 RGBA 值，最高有效字节代表红色通道值，其后的有效字节分别代表绿色、蓝色和 Alpha 通道值。</p>
*/
//class laya.filters.ColorFilter extends laya.filters.Filter
var ColorFilter=(function(_super){
	function ColorFilter(mat){
		/**@private */
		//this._mat=null;
		/**@private */
		//this._alpha=null;
		ColorFilter.__super.call(this);
		if (!mat){
			mat=[0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0.3,0.59,0.11,0,0,0,0,0,1,0];
		}
		this._mat=new Float32Array(16);
		this._alpha=new Float32Array(4);
		var j=0;
		var z=0;
		for (var i=0;i < 20;i++){
			if (i % 5 !=4){
				this._mat[j++]=mat[i];
				}else {
				this._alpha[z++]=mat[i];
			}
		}
		this._action=RunDriver.createFilterAction(0x20);
		this._action.data=this;
	}

	__class(ColorFilter,'laya.filters.ColorFilter',_super);
	var __proto=ColorFilter.prototype;
	Laya.imps(__proto,{"laya.filters.IFilter":true})
	/**
	*@private 通知微端
	*/
	__proto.callNative=function(sp){
		var t=sp._$P.cf=this;
		sp.conchModel && sp.conchModel.setFilterMatrix && sp.conchModel.setFilterMatrix(this._mat,this._alpha);
	}

	/**@private */
	__getset(0,__proto,'action',function(){
		return this._action;
	});

	/**@private */
	__getset(0,__proto,'type',function(){
		return 0x20;
	});

	return ColorFilter;
})(Filter)


/**
*<code>Node</code> 类是可放在显示列表中的所有对象的基类。该显示列表管理 Laya 运行时中显示的所有对象。使用 Node 类排列显示列表中的显示对象。Node 对象可以有子显示对象。
*/
//class laya.display.Node extends laya.events.EventDispatcher
var Node=(function(_super){
	function Node(){
		/**@private */
		this._bits=0;
		/**@private 是否在显示列表中显示*/
		this._displayedInStage=false;
		/**@private 父节点对象*/
		this._parent=null;
		/**@private */
		this.conchModel=null;
		/**节点名称。*/
		this.name="";
		/**[只读]是否已经销毁。对象销毁后不能再使用。*/
		this._destroyed=false;
		Node.__super.call(this);
		this._childs=Node.ARRAY_EMPTY;
		this._$P=Node.PROP_EMPTY;
		this.timer=Laya.scaleTimer;
		this.conchModel=Render.isConchNode ? this.createConchModel():null;
	}

	__class(Node,'laya.display.Node',_super);
	var __proto=Node.prototype;
	/**@private */
	__proto._setBit=function(type,value){
		if (type==0x1){
			var preValue=this._getBit(type);
			if (preValue !=value){
				this._updateDisplayedInstage();
			}
		}
		if (value){
			this._bits |=type;
			}else {
			this._bits &=~type;
		}
	}

	/**@private */
	__proto._getBit=function(type){
		return (this._bits & type)!=0;
	}

	/**@private */
	__proto._setUpNoticeChain=function(){
		if (this._getBit(0x1)){
			this._setUpNoticeType(0x1);
		}
	}

	/**@private */
	__proto._setUpNoticeType=function(type){
		var ele=this;
		ele._setBit(type,true);
		ele=ele.parent;
		while (ele){
			if (ele._getBit(type))return;
			ele._setBit(type,true);
			ele=ele.parent;
		}
	}

	/**
	*<p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
	*<p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.on=function(type,caller,listener,args){
		if (type==="display" || type==="undisplay"){
			if (!this._getBit(0x1)){
				this._setUpNoticeType(0x1);
			}
		}
		return this._createListener(type,caller,listener,args,false);
	}

	/**
	*<p>增加事件侦听器，以使侦听器能够接收事件通知，此侦听事件响应一次后则自动移除侦听。</p>
	*<p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.once=function(type,caller,listener,args){
		if (type==="display" || type==="undisplay"){
			if (!this._getBit(0x1)){
				this._setUpNoticeType(0x1);
			}
		}
		return this._createListener(type,caller,listener,args,true);
	}

	/**@private */
	__proto.createConchModel=function(){
		return null;
	}

	/**
	*<p>销毁此对象。destroy对象默认会把自己从父节点移除，并且清理自身引用关系，等待js自动垃圾回收机制回收。destroy后不能再使用。</p>
	*<p>destroy时会移除自身的事情监听，自身的timer监听，移除子对象及从父节点移除自己。</p>
	*@param destroyChild （可选）是否同时销毁子节点，若值为true,则销毁子节点，否则不销毁子节点。
	*/
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._destroyed=true;
		this._parent && this._parent.removeChild(this);
		if (this._childs){
			if (destroyChild)this.destroyChildren();
			else this.removeChildren();
		}
		this._childs=null;
		this._$P=null;
		this.offAll();
		this.timer.clearAll(this);
	}

	/**
	*销毁所有子对象，不销毁自己本身。
	*/
	__proto.destroyChildren=function(){
		if (this._childs){
			for (var i=this._childs.length-1;i >-1;i--){
				this._childs[i].destroy(true);
			}
		}
	}

	/**
	*添加子节点。
	*@param node 节点对象
	*@return 返回添加的节点
	*/
	__proto.addChild=function(node){
		if (!node || this.destroyed || node===this)return node;
		if ((node).zOrder)this._set$P("hasZorder",true);
		if (node._parent===this){
			var index=this.getChildIndex(node);
			if (index!==this._childs.length-1){
				this._childs.splice(index,1);
				this._childs.push(node);
				if (this.conchModel){
					this.conchModel.removeChild(node.conchModel);
					this.conchModel.addChildAt(node.conchModel,this._childs.length-1);
				}
				this._childChanged();
			}
			}else {
			node.parent && node.parent.removeChild(node);
			this._childs===Node.ARRAY_EMPTY && (this._childs=[]);
			this._childs.push(node);
			this.conchModel && this.conchModel.addChildAt(node.conchModel,this._childs.length-1);
			node.parent=this;
			this._childChanged();
		}
		return node;
	}

	/**
	*批量增加子节点
	*@param ...args 无数子节点。
	*/
	__proto.addChildren=function(__args){
		var args=arguments;
		var i=0,n=args.length;
		while (i < n){
			this.addChild(args[i++]);
		}
	}

	/**
	*添加子节点到指定的索引位置。
	*@param node 节点对象。
	*@param index 索引位置。
	*@return 返回添加的节点。
	*/
	__proto.addChildAt=function(node,index){
		if (!node || this.destroyed || node===this)return node;
		if ((node).zOrder)this._set$P("hasZorder",true);
		if (index >=0 && index <=this._childs.length){
			if (node._parent===this){
				var oldIndex=this.getChildIndex(node);
				this._childs.splice(oldIndex,1);
				this._childs.splice(index,0,node);
				if (this.conchModel){
					this.conchModel.removeChild(node.conchModel);
					this.conchModel.addChildAt(node.conchModel,index);
				}
				this._childChanged();
				}else {
				node.parent && node.parent.removeChild(node);
				this._childs===Node.ARRAY_EMPTY && (this._childs=[]);
				this._childs.splice(index,0,node);
				this.conchModel && this.conchModel.addChildAt(node.conchModel,index);
				node.parent=this;
			}
			return node;
			}else {
			throw new Error("appendChildAt:The index is out of bounds");
		}
	}

	/**
	*根据子节点对象，获取子节点的索引位置。
	*@param node 子节点。
	*@return 子节点所在的索引位置。
	*/
	__proto.getChildIndex=function(node){
		return this._childs.indexOf(node);
	}

	/**
	*根据子节点的名字，获取子节点对象。
	*@param name 子节点的名字。
	*@return 节点对象。
	*/
	__proto.getChildByName=function(name){
		var nodes=this._childs;
		if (nodes){
			for (var i=0,n=nodes.length;i < n;i++){
				var node=nodes[i];
				if (node.name===name)return node;
			}
		}
		return null;
	}

	/**@private */
	__proto._get$P=function(key){
		return this._$P[key];
	}

	/**@private */
	__proto._set$P=function(key,value){
		if (!this.destroyed){
			this._$P===Node.PROP_EMPTY && (this._$P={});
			this._$P[key]=value;
		}
		return value;
	}

	/**
	*根据子节点的索引位置，获取子节点对象。
	*@param index 索引位置
	*@return 子节点
	*/
	__proto.getChildAt=function(index){
		return this._childs[index];
	}

	/**
	*设置子节点的索引位置。
	*@param node 子节点。
	*@param index 新的索引。
	*@return 返回子节点本身。
	*/
	__proto.setChildIndex=function(node,index){
		var childs=this._childs;
		if (index < 0 || index >=childs.length){
			throw new Error("setChildIndex:The index is out of bounds.");
		};
		var oldIndex=this.getChildIndex(node);
		if (oldIndex < 0)throw new Error("setChildIndex:node is must child of this object.");
		childs.splice(oldIndex,1);
		childs.splice(index,0,node);
		if (this.conchModel){
			this.conchModel.removeChild(node.conchModel);
			this.conchModel.addChildAt(node.conchModel,index);
		}
		this._childChanged();
		return node;
	}

	/**
	*@private
	*子节点发生改变。
	*@param child 子节点。
	*/
	__proto._childChanged=function(child){}
	/**
	*删除子节点。
	*@param node 子节点
	*@return 被删除的节点
	*/
	__proto.removeChild=function(node){
		if (!this._childs)return node;
		var index=this._childs.indexOf(node);
		return this.removeChildAt(index);
	}

	/**
	*从父容器删除自己，如已经被删除不会抛出异常。
	*@return 当前节点（ Node ）对象。
	*/
	__proto.removeSelf=function(){
		this._parent && this._parent.removeChild(this);
		return this;
	}

	/**
	*根据子节点名字删除对应的子节点对象，如果找不到不会抛出异常。
	*@param name 对象名字。
	*@return 查找到的节点（ Node ）对象。
	*/
	__proto.removeChildByName=function(name){
		var node=this.getChildByName(name);
		node && this.removeChild(node);
		return node;
	}

	/**
	*根据子节点索引位置，删除对应的子节点对象。
	*@param index 节点索引位置。
	*@return 被删除的节点。
	*/
	__proto.removeChildAt=function(index){
		var node=this.getChildAt(index);
		if (node){
			this._childs.splice(index,1);
			this.conchModel && this.conchModel.removeChild(node.conchModel);
			node.parent=null;
		}
		return node;
	}

	/**
	*删除指定索引区间的所有子对象。
	*@param beginIndex 开始索引。
	*@param endIndex 结束索引。
	*@return 当前节点对象。
	*/
	__proto.removeChildren=function(beginIndex,endIndex){
		(beginIndex===void 0)&& (beginIndex=0);
		(endIndex===void 0)&& (endIndex=0x7fffffff);
		if (this._childs && this._childs.length > 0){
			var childs=this._childs;
			if (beginIndex===0 && endIndex >=n){
				var arr=childs;
				this._childs=Node.ARRAY_EMPTY;
				}else {
				arr=childs.splice(beginIndex,endIndex-beginIndex);
			}
			for (var i=0,n=arr.length;i < n;i++){
				arr[i].parent=null;
				this.conchModel && this.conchModel.removeChild(arr[i].conchModel);
			}
		}
		return this;
	}

	/**
	*替换子节点。
	*@internal 将传入的新节点对象替换到已有子节点索引位置处。
	*@param newNode 新节点。
	*@param oldNode 老节点。
	*@return 返回新节点。
	*/
	__proto.replaceChild=function(newNode,oldNode){
		var index=this._childs.indexOf(oldNode);
		if (index >-1){
			this._childs.splice(index,1,newNode);
			if (this.conchModel){
				this.conchModel.removeChild(oldNode.conchModel);
				this.conchModel.addChildAt(newNode.conchModel,index);
			}
			oldNode.parent=null;
			newNode.parent=this;
			return newNode;
		}
		return null;
	}

	/**@private */
	__proto._updateDisplayedInstage=function(){
		var ele;
		ele=this;
		var stage=Laya.stage;
		this._displayedInStage=false;
		while (ele){
			if (ele._getBit(0x1)){
				this._displayedInStage=ele._displayedInStage;
				break ;
			}
			if (ele==stage || ele._displayedInStage){
				this._displayedInStage=true;
				break ;
			}
			ele=ele.parent;
		}
	}

	/**@private */
	__proto._setDisplay=function(value){
		if (this._displayedInStage!==value){
			this._displayedInStage=value;
			if (value)this.event("display");
			else this.event("undisplay");
		}
	}

	/**
	*@private
	*设置指定节点对象是否可见(是否在渲染列表中)。
	*@param node 节点。
	*@param display 是否可见。
	*/
	__proto._displayChild=function(node,display){
		var childs=node._childs;
		if (childs){
			for (var i=0,n=childs.length;i < n;i++){
				var child=childs[i];
				if (!child._getBit(0x1))continue ;
				if (child._childs.length > 0){
					this._displayChild(child,display);
					}else {
					child._setDisplay(display);
				}
			}
		}
		node._setDisplay(display);
	}

	/**
	*当前容器是否包含指定的 <code>Node</code> 节点对象 。
	*@param node 指定的 <code>Node</code> 节点对象 。
	*@return 一个布尔值表示是否包含指定的 <code>Node</code> 节点对象 。
	*/
	__proto.contains=function(node){
		if (node===this)return true;
		while (node){
			if (node.parent===this)return true;
			node=node.parent;
		}
		return false;
	}

	/**
	*定时重复执行某函数。功能同Laya.timer.timerLoop()。
	*@param delay 间隔时间(单位毫秒)。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*@param args （可选）回调参数。
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
	*@param jumpFrame 时钟是否跳帧。基于时间的循环回调，单位时间间隔内，如能执行多次回调，出于性能考虑，引擎默认只执行一次，设置jumpFrame=true后，则回调会连续执行多次
	*/
	__proto.timerLoop=function(delay,caller,method,args,coverBefore,jumpFrame){
		(coverBefore===void 0)&& (coverBefore=true);
		(jumpFrame===void 0)&& (jumpFrame=false);
		this.timer.loop(delay,caller,method,args,coverBefore,jumpFrame);
	}

	/**
	*定时执行某函数一次。功能同Laya.timer.timerOnce()。
	*@param delay 延迟时间(单位毫秒)。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*@param args （可选）回调参数。
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
	*/
	__proto.timerOnce=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		this.timer._create(false,false,delay,caller,method,args,coverBefore);
	}

	/**
	*定时重复执行某函数(基于帧率)。功能同Laya.timer.frameLoop()。
	*@param delay 间隔几帧(单位为帧)。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*@param args （可选）回调参数。
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true。
	*/
	__proto.frameLoop=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		this.timer._create(true,true,delay,caller,method,args,coverBefore);
	}

	/**
	*定时执行一次某函数(基于帧率)。功能同Laya.timer.frameOnce()。
	*@param delay 延迟几帧(单位为帧)。
	*@param caller 执行域(this)
	*@param method 结束时的回调方法
	*@param args （可选）回调参数
	*@param coverBefore （可选）是否覆盖之前的延迟执行，默认为true
	*/
	__proto.frameOnce=function(delay,caller,method,args,coverBefore){
		(coverBefore===void 0)&& (coverBefore=true);
		this.timer._create(true,false,delay,caller,method,args,coverBefore);
	}

	/**
	*清理定时器。功能同Laya.timer.clearTimer()。
	*@param caller 执行域(this)。
	*@param method 结束时的回调方法。
	*/
	__proto.clearTimer=function(caller,method){
		this.timer.clear(caller,method);
	}

	/**表示是否在显示列表中显示。*/
	__getset(0,__proto,'displayedInStage',function(){
		if (this._getBit(0x1))return this._displayedInStage;
		this._setUpNoticeType(0x1);
		return this._displayedInStage;
	});

	/**父节点。*/
	__getset(0,__proto,'parent',function(){
		return this._parent;
		},function(value){
		if (this._parent!==value){
			if (value){
				this._parent=value;
				this.event("added");
				if (this._getBit(0x1)){
					this._setUpNoticeChain();
					value.displayedInStage && this._displayChild(this,true);
				}
				value._childChanged(this);
				}else {
				this.event("removed");
				this._parent._childChanged();
				if (this._getBit(0x1))this._displayChild(this,false);
				this._parent=value;
			}
		}
	});

	/**
	*子对象数量。
	*/
	__getset(0,__proto,'numChildren',function(){
		return this._childs.length;
	});

	/**
	*[只读]是否已经销毁。对象销毁后不能再使用。
	*@return
	*/
	__getset(0,__proto,'destroyed',function(){
		return this._destroyed;
	});

	Node.ARRAY_EMPTY=[];
	Node.PROP_EMPTY={};
	Node.NOTICE_DISPLAY=0x1;
	Node.MOUSEENABLE=0x2;
	return Node;
})(EventDispatcher)


/**
*@private
*<code>Resource</code> 资源存取类。
*/
//class laya.resource.Resource extends laya.events.EventDispatcher
var Resource=(function(_super){
	function Resource(){
		/**@private */
		//this.__loaded=false;
		/**@private */
		//this._id=0;
		/**@private */
		//this._memorySize=0;
		/**@private */
		//this._released=false;
		/**@private */
		//this._destroyed=false;
		/**@private */
		//this._referenceCount=0;
		/**@private */
		//this._group=null;
		/**@private */
		//this._url=null;
		/**@private */
		//this._resourceManager=null;
		/**@private */
		//this._lastUseFrameCount=0;
		/**是否加锁，如果true为不能使用自动释放机制。*/
		//this.lock=false;
		/**名称。 */
		//this.name=null;
		Resource.__super.call(this);
		this._$1__id=++Resource._uniqueIDCounter;
		this.__loaded=true;
		this._destroyed=false;
		this._referenceCount=0;
		Resource._idResourcesMap[this.id]=this;
		this._released=true;
		this.lock=false;
		this._memorySize=0;
		this._lastUseFrameCount=-1;
		(ResourceManager.currentResourceManager)&& (ResourceManager.currentResourceManager.addResource(this));
	}

	__class(Resource,'laya.resource.Resource',_super);
	var __proto=Resource.prototype;
	Laya.imps(__proto,{"laya.resource.IDispose":true,"laya.resource.ICreateResource":true})
	/**
	*@private
	*/
	__proto._setUrl=function(url){
		if (this._url!==url){
			var resList;
			if (this._url){
				resList=Resource._urlResourcesMap[this._url];
				resList.splice(resList.indexOf(this),1);
				(resList.length===0)&& (delete Resource._urlResourcesMap[this._url]);
			}
			if (url){
				resList=Resource._urlResourcesMap[url];
				(resList)|| (Resource._urlResourcesMap[url]=resList=[]);
				resList.push(this);
			}
			this._url=url;
		}
	}

	/**
	*@private
	*/
	__proto._getGroup=function(){
		return this._group;
	}

	/**
	*@private
	*/
	__proto._setGroup=function(value){
		if (this._group!==value){
			var groupList;
			if (this._group){
				groupList=Resource._groupResourcesMap[this._group];
				groupList.splice(groupList.indexOf(this),1);
				(groupList.length===0)&& (delete Resource._groupResourcesMap[this._group]);
			}
			if (value){
				groupList=Resource._groupResourcesMap[value];
				(groupList)|| (Resource._groupResourcesMap[value]=groupList=[]);
				groupList.push(this);
			}
			this._group=value;
		}
	}

	/**
	*@private
	*/
	__proto._addReference=function(){
		this._referenceCount++;
	}

	/**
	*@private
	*/
	__proto._removeReference=function(){
		this._referenceCount--;
	}

	/**
	*@private
	*/
	__proto._clearReference=function(){
		this._referenceCount=0;
	}

	/**
	*@private
	*/
	__proto._endLoaded=function(){
		this.__loaded=true;
		this.event("loaded",this);
	}

	/**
	*@private
	*/
	__proto.recreateResource=function(){
		this.completeCreate();
	}

	/**
	*@private
	*/
	__proto.disposeResource=function(){}
	/**
	*激活资源，使用资源前应先调用此函数激活。
	*@param force 是否强制创建。
	*/
	__proto.activeResource=function(force){
		(force===void 0)&& (force=false);
		this._lastUseFrameCount=Stat.loopCount;
		if (!this._destroyed && this.__loaded && (this._released || force))
			this.recreateResource();
	}

	/**
	*释放资源。
	*@param force 是否强制释放。
	*@return 是否成功释放。
	*/
	__proto.releaseResource=function(force){
		(force===void 0)&& (force=false);
		if (!force && this.lock)
			return false;
		if (!this._released || force){
			this.disposeResource();
			this._released=true;
			this._lastUseFrameCount=-1;
			this.event("released",this);
			return true;
			}else {
			return false;
		}
	}

	/**
	*@private
	*/
	__proto.onAsynLoaded=function(url,data,params){
		throw new Error("Resource: must override this function!");
	}

	/**
	*<p>彻底处理资源，处理后不能恢复。</p>
	*<p><b>注意：</b>会强制解锁清理。</p>
	*/
	__proto.destroy=function(){
		if (this._destroyed)
			return;
		if (this._resourceManager!==null)
			this._resourceManager.removeResource(this);
		this._destroyed=true;
		this.lock=false;
		this.releaseResource();
		delete Resource._idResourcesMap[this.id];
		var resList;
		if (this._url){
			resList=Resource._urlResourcesMap[this._url];
			if (resList){
				resList.splice(resList.indexOf(this),1);
				(resList.length===0)&& (delete Resource._urlResourcesMap[this.url]);
			}
			Loader.clearRes(this._url);
			(this.__loaded)||(RunDriver.cancelLoadByUrl(this._url));
		}
		if (this._group){
			resList=Resource._groupResourcesMap[this._group];
			resList.splice(resList.indexOf(this),1);
			(resList.length===0)&& (delete Resource._groupResourcesMap[this.url]);
		}
	}

	/**完成资源激活。*/
	__proto.completeCreate=function(){
		this._released=false;
		this.event("recovered",this);
	}

	/**
	*@private
	*/
	__proto.dispose=function(){
		this.destroy();
	}

	/**
	*设置资源组名。
	*/
	/**
	*获取资源组名。
	*/
	__getset(0,__proto,'group',function(){
		return this._getGroup();
		},function(value){
		this._setGroup(value);
	});

	/**
	*获取资源的URL地址。
	*@return URL地址。
	*/
	__getset(0,__proto,'url',function(){
		return this._url;
	});

	/**
	*是否已处理。
	*/
	__getset(0,__proto,'destroyed',function(){
		return this._destroyed;
	});

	/**
	*资源管理员。
	*/
	__getset(0,__proto,'resourceManager',function(){
		return this._resourceManager;
	});

	/**
	*是否已释放。
	*/
	__getset(0,__proto,'released',function(){
		return this._released;
	});

	/**
	*获取资源的引用计数。
	*/
	__getset(0,__proto,'referenceCount',function(){
		return this._referenceCount;
	});

	/**
	*获取是否已加载完成。
	*/
	__getset(0,__proto,'loaded',function(){
		return this.__loaded;
	});

	/**
	*@private
	*/
	__getset(0,__proto,'_loaded',null,function(value){
		this.__loaded=value;
	});

	/**
	*@private
	*/
	/**
	*占用内存尺寸。
	*/
	__getset(0,__proto,'memorySize',function(){
		return this._memorySize;
		},function(value){
		var offsetValue=value-this._memorySize;
		this._memorySize=value;
		this.resourceManager && this.resourceManager.addSize(offsetValue);
	});

	/**
	*获取唯一标识ID,通常用于识别。
	*/
	__getset(0,__proto,'id',function(){
		return this._$1__id;
	});

	Resource.getResourceByID=function(id){
		return Resource._idResourcesMap[id];
	}

	Resource.getResourceByURL=function(url,index){
		(index===void 0)&& (index=0);
		return Resource._urlResourcesMap[url][index];
	}

	Resource.getResourceCountByURL=function(url){
		return Resource._urlResourcesMap[url].length;
	}

	Resource.destroyUnusedResources=function(group){
		var res;
		if (group){
			var resouList=Resource._groupResourcesMap[group];
			if (resouList){
				var tempResouList=resouList.slice();
				for (var i=0,n=tempResouList.length;i < n;i++){
					res=tempResouList[i];
					if (!res.lock && res._referenceCount===0)
						res.destroy();
				}
			}
			}else {
			for (var k in Resource._idResourcesMap){
				res=Resource._idResourcesMap[k];
				if (!res.lock && res._referenceCount===0)
					res.destroy();
			}
		}
	}

	Resource._uniqueIDCounter=0;
	Resource._idResourcesMap={};
	Resource._urlResourcesMap={};
	Resource._groupResourcesMap={};
	return Resource;
})(EventDispatcher)


/**
*<code>Loader</code> 类可用来加载文本、JSON、XML、二进制、图像等资源。
*/
//class laya.net.Loader extends laya.events.EventDispatcher
var Loader=(function(_super){
	function Loader(){
		/**@private 加载后的数据对象，只读*/
		this._data=null;
		/**@private */
		this._class=null;
		/**@private */
		this._url=null;
		/**@private */
		this._type=null;
		/**@private */
		this._cache=false;
		/**@private */
		this._http=null;
		/**@private 自定义解析不派发complete事件，但会派发loaded事件，手动调用endLoad方法再派发complete事件*/
		this._customParse=false;
		Loader.__super.call(this);
	}

	__class(Loader,'laya.net.Loader',_super);
	var __proto=Loader.prototype;
	/**
	*加载资源。加载错误会派发 Event.ERROR 事件，参数为错误信息。
	*@param url 资源地址。
	*@param type (default=null)资源类型。可选值为：Loader.TEXT、Loader.JSON、Loader.XML、Loader.BUFFER、Loader.IMAGE、Loader.SOUND、Loader.ATLAS、Loader.FONT。如果为null，则根据文件后缀分析类型。
	*@param cache (default=true)是否缓存数据。
	*@param group (default=null)分组名称。
	*@param ignoreCache (default=false)是否忽略缓存，强制重新加载。
	*/
	__proto.load=function(url,type,cache,group,ignoreCache){
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		this._url=url;
		if (url.indexOf("data:image")===0)this._type=type="image";
		else {
			this._type=type || (type=this.getTypeFromUrl(url));
			url=URL.formatURL(url);
		}
		this._cache=cache;
		this._data=null;
		if (!ignoreCache && Loader.loadedMap[url]){
			this._data=Loader.loadedMap[url];
			this.event("progress",1);
			this.event("complete",this._data);
			return;
		}
		if (group)Loader.setGroup(url,group);
		if (Loader.parserMap[type] !=null){
			this._customParse=true;
			if (((Loader.parserMap[type])instanceof laya.utils.Handler ))Loader.parserMap[type].runWith(this);
			else Loader.parserMap[type].call(null,this);
			return;
		}
		if (type==="image" || type==="htmlimage" || type==="nativeimage")return this._loadImage(url);
		if (type==="sound")return this._loadSound(url);
		if (type==="ttf")return this._loadTTF(url);
		var contentType;
		switch (type){
			case "atlas":
			case "plf":
				contentType="json";
				break ;
			case "font":
				contentType="xml";
				break ;
			case "pkm":
				contentType="arraybuffer";
				break
			default :
				contentType=type;
			}
		if (Loader.preLoadedMap[url]){
			this.onLoaded(Loader.preLoadedMap[url]);
			}else{
			if (!this._http){
				this._http=new HttpRequest();
				this._http.on("progress",this,this.onProgress);
				this._http.on("error",this,this.onError);
				this._http.on("complete",this,this.onLoaded);
			}
			this._http.send(url,null,"get",contentType);
		}
	}

	/**
	*获取指定资源地址的数据类型。
	*@param url 资源地址。
	*@return 数据类型。
	*/
	__proto.getTypeFromUrl=function(url){
		var type=Utils.getFileExtension(url);
		if (type)return Loader.typeMap[type];
		console.warn("Not recognize the resources suffix",url);
		return "text";
	}

	/**
	*@private
	*加载TTF资源。
	*@param url 资源地址。
	*/
	__proto._loadTTF=function(url){
		url=URL.formatURL(url);
		var ttfLoader=new TTFLoader();
		ttfLoader.complete=Handler.create(this,this.onLoaded);
		ttfLoader.load(url);
	}

	/**
	*@private
	*加载图片资源。
	*@param url 资源地址。
	*/
	__proto._loadImage=function(url){
		url=URL.formatURL(url);
		var _this=this;
		var image;
		function clear (){
			image.onload=null;
			image.onerror=null;
			delete Loader.imgCache[url]
		};
		var onload=function (){
			clear();
			_this.onLoaded(image);
		};
		var onerror=function (){
			clear();
			_this.event("error","Load image failed");
		}
		if (this._type==="nativeimage"){
			image=new Browser.window.Image();
			image.crossOrigin="";
			image.onload=onload;
			image.onerror=onerror;
			image.src=url;
			Loader.imgCache[url]=image;
			}else {
			new HTMLImage.create(url,{onload:onload,onerror:onerror,onCreate:function (img){
					image=img;
					Loader.imgCache[url]=img;
			}});
		}
	}

	/**
	*@private
	*加载声音资源。
	*@param url 资源地址。
	*/
	__proto._loadSound=function(url){
		var sound=(new SoundManager._soundClass());
		var _this=this;
		sound.on("complete",this,soundOnload);
		sound.on("error",this,soundOnErr);
		sound.load(url);
		function soundOnload (){
			clear();
			_this.onLoaded(sound);
		}
		function soundOnErr (){
			clear();
			sound.dispose();
			_this.event("error","Load sound failed");
		}
		function clear (){
			sound.offAll();
		}
	}

	/**@private */
	__proto.onProgress=function(value){
		if (this._type==="atlas")this.event("progress",value *0.3);
		else this.event("progress",value);
	}

	/**@private */
	__proto.onError=function(message){
		this.event("error",message);
	}

	/**
	*资源加载完成的处理函数。
	*@param data 数据。
	*/
	__proto.onLoaded=function(data){
		var type=this._type;
		if (type=="plf"){
			this.parsePLFData(data);
			this.complete(data);
		}else
		if (type==="image"){
			var tex=new Texture(data);
			tex.url=this._url;
			this.complete(tex);
			}else if (type==="sound" || type==="htmlimage" || type==="nativeimage"){
			this.complete(data);
			}else if (type==="atlas"){
			if (!data.src && !data._setContext){
				if (!this._data){
					this._data=data;
					if (data.meta && data.meta.image){
						var toloadPics=data.meta.image.split(",");
						var split=this._url.indexOf("/")>=0 ? "/" :"\\";
						var idx=this._url.lastIndexOf(split);
						var folderPath=idx >=0 ? this._url.substr(0,idx+1):"";
						for (var i=0,len=toloadPics.length;i < len;i++){
							toloadPics[i]=folderPath+toloadPics[i];
						}
						}else {
						toloadPics=[this._url.replace(".json",".png")];
					}
					toloadPics.reverse();
					data.toLoads=toloadPics;
					data.pics=[];
				}
				this.event("progress",0.3+1 / toloadPics.length *0.6);
				return this._loadImage(toloadPics.pop());
				}else {
				this._data.pics.push(data);
				if (this._data.toLoads.length > 0){
					this.event("progress",0.3+1 / this._data.toLoads.length *0.6);
					return this._loadImage(this._data.toLoads.pop());
				};
				var frames=this._data.frames;
				var cleanUrl=this._url.split("?")[0];
				var directory=(this._data.meta && this._data.meta.prefix)? this._data.meta.prefix :cleanUrl.substring(0,cleanUrl.lastIndexOf("."))+"/";
				var pics=this._data.pics;
				var atlasURL=URL.formatURL(this._url);
				var map=Loader.atlasMap[atlasURL] || (Loader.atlasMap[atlasURL]=[]);
				map.dir=directory;
				var scaleRate=1;
				if (this._data.meta && this._data.meta.scale && this._data.meta.scale !=1){
					scaleRate=parseFloat(this._data.meta.scale);
					for (var name in frames){
						var obj=frames[name];
						var tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						var url=URL.formatURL(directory+name);
						tPic.scaleRate=scaleRate;
						var tTexture;
						tTexture=Texture.create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h);
						Loader.cacheRes(url,tTexture);
						tTexture.url=url;
						map.push(url);
					}
					}else{
					for (name in frames){
						obj=frames[name];
						tPic=pics[obj.frame.idx ? obj.frame.idx :0];
						url=URL.formatURL(directory+name);
						Loader.cacheRes(url,Texture.create(tPic,obj.frame.x,obj.frame.y,obj.frame.w,obj.frame.h,obj.spriteSourceSize.x,obj.spriteSourceSize.y,obj.sourceSize.w,obj.sourceSize.h));
						Loader.loadedMap[url].url=url;
						map.push(url);
					}
				}
				delete this._data.pics;
				this.complete(this._data);
			}
			}else if (type=="font"){
			if (!data.src){
				this._data=data;
				this.event("progress",0.5);
				return this._loadImage(this._url.replace(".fnt",".png"));
				}else {
				var bFont=new BitmapFont();
				bFont.parseFont(this._data,data);
				var tArr=this._url.split(".fnt")[0].split("/");
				var fontName=tArr[tArr.length-1];
				Text.registerBitmapFont(fontName,bFont);
				this._data=bFont;
				this.complete(this._data);
			}
			}else if (type=="pkm"){
			var image=HTMLImage.create(data,this._url);
			var tex1=new Texture(image);
			tex1.url=this._url;
			this.complete(tex1);
			}else {
			this.complete(data);
		}
	}

	__proto.parsePLFData=function(plfData){
		var type;
		var filePath;
		var fileDic;
		for (type in plfData){
			fileDic=plfData[type];
			switch(type){
				case "json":
				case "text":
					for (filePath in fileDic){
						Loader.preLoadedMap[URL.formatURL(filePath)]=fileDic[filePath]
					}
					break ;
				default :
					for (filePath in fileDic){
						Loader.preLoadedMap[URL.formatURL(filePath)]=fileDic[filePath]
					}
				}
		}
	}

	/**
	*加载完成。
	*@param data 加载的数据。
	*/
	__proto.complete=function(data){
		this._data=data;
		if (this._customParse){
			this.event("loaded",(data instanceof Array)? [data] :data);
			}else {
			Loader._loaders.push(this);
			if (!Loader._isWorking)Loader.checkNext();
		}
	}

	/**
	*结束加载，处理是否缓存及派发完成事件 <code>Event.COMPLETE</code> 。
	*@param content 加载后的数据
	*/
	__proto.endLoad=function(content){
		content && (this._data=content);
		if (this._cache)Loader.cacheRes(this._url,this._data);
		this.event("progress",1);
		this.event("complete",(this.data instanceof Array)? [this.data] :this.data);
	}

	/**返回的数据。*/
	__getset(0,__proto,'data',function(){
		return this._data;
	});

	/**是否缓存。*/
	__getset(0,__proto,'cache',function(){
		return this._cache;
	});

	/**加载类型。*/
	__getset(0,__proto,'type',function(){
		return this._type;
	});

	/**加载地址。*/
	__getset(0,__proto,'url',function(){
		return this._url;
	});

	Loader.checkNext=function(){
		Loader._isWorking=true;
		var startTimer=Browser.now();
		var thisTimer=startTimer;
		while (Loader._startIndex < Loader._loaders.length){
			thisTimer=Browser.now();
			Loader._loaders[Loader._startIndex].endLoad();
			Loader._startIndex++;
			if (Browser.now()-startTimer > Loader.maxTimeOut){
				console.warn("loader callback cost a long time:"+(Browser.now()-startTimer)+" url="+Loader._loaders[Loader._startIndex-1].url);
				Laya.timer.frameOnce(1,null,Loader.checkNext);
				return;
			}
		}
		Loader._loaders.length=0;
		Loader._startIndex=0;
		Loader._isWorking=false;
	}

	Loader.clearRes=function(url,forceDispose){
		(forceDispose===void 0)&& (forceDispose=false);
		url=URL.formatURL(url);
		var arr=Loader.getAtlas(url);
		if (arr){
			for (var i=0,n=arr.length;i < n;i++){
				var resUrl=arr[i];
				var tex=Loader.getRes(resUrl);
				delete Loader.loadedMap[resUrl];
				if (tex)tex.destroy(forceDispose);
			}
			arr.length=0;
			delete Loader.atlasMap[url];
			delete Loader.loadedMap[url];
			}else {
			var res=Loader.loadedMap[url];
			if (res){
				delete Loader.loadedMap[url];
				if ((res instanceof laya.resource.Texture )&& res.bitmap)(res).destroy(forceDispose);
			}
		}
	}

	Loader.clearTextureRes=function(url){
		url=URL.formatURL(url);
		var arr=laya.net.Loader.getAtlas(url);
		var res=(arr && arr.length>0)? laya.net.Loader.getRes(arr[0]):laya.net.Loader.getRes(url);
		if (res && res.bitmap){
			if (Render.isConchApp && !Render.isConchWebGL){
				if (res.bitmap.source.releaseTexture){
					res.bitmap.source.releaseTexture();
				}
				}else if (res.bitmap._atlaser==null){
				res.bitmap.releaseResource(true);
			}
		}
	}

	Loader.getRes=function(url){
		return Loader.loadedMap[URL.formatURL(url)];
	}

	Loader.getAtlas=function(url){
		return Loader.atlasMap[URL.formatURL(url)];
	}

	Loader.cacheRes=function(url,data){
		url=URL.formatURL(url);
		if (Loader.loadedMap[url] !=null){
			console.warn("Resources already exist,is repeated loading:",url);
			}else {
			Loader.loadedMap[url]=data;
		}
	}

	Loader.setGroup=function(url,group){
		if (!Loader.groupMap[group])Loader.groupMap[group]=[];
		Loader.groupMap[group].push(url);
	}

	Loader.clearResByGroup=function(group){
		if (!Loader.groupMap[group])return;
		var arr=Loader.groupMap[group],i=0,len=arr.length;
		for (i=0;i < len;i++){
			Loader.clearRes(arr[i]);
		}
		arr.length=0;
	}

	Loader.TEXT="text";
	Loader.JSON="json";
	Loader.XML="xml";
	Loader.BUFFER="arraybuffer";
	Loader.IMAGE="image";
	Loader.SOUND="sound";
	Loader.ATLAS="atlas";
	Loader.FONT="font";
	Loader.TTF="ttf";
	Loader.PLF="plf";
	Loader.PKM="pkm";
	Loader.typeMap={"png":"image","jpg":"image","jpeg":"image","txt":"text","json":"json","xml":"xml","als":"atlas","atlas":"atlas","mp3":"sound","ogg":"sound","wav":"sound","part":"json","fnt":"font","pkm":"pkm","ttf":"ttf","plf":"plf","ani":"json","sk":"arraybuffer"};
	Loader.parserMap={};
	Loader.groupMap={};
	Loader.maxTimeOut=100;
	Loader.loadedMap={};
	Loader.preLoadedMap={};
	Loader.atlasMap={};
	Loader._loaders=[];
	Loader._isWorking=false;
	Loader._startIndex=0;
	Loader.imgCache={};
	return Loader;
})(EventDispatcher)


/**
*<p> <code>HttpRequest</code> 通过封装 HTML <code>XMLHttpRequest</code> 对象提供了对 HTTP 协议的完全的访问，包括做出 POST 和 HEAD 请求以及普通的 GET 请求的能力。 <code>HttpRequest</code> 只提供以异步的形式返回 Web 服务器的响应，并且能够以文本或者二进制的形式返回内容。</p>
*<p><b>注意：</b>建议每次请求都使用新的 <code>HttpRequest</code> 对象，因为每次调用该对象的send方法时，都会清空之前设置的数据，并重置 HTTP 请求的状态，这会导致之前还未返回响应的请求被重置，从而得不到之前请求的响应结果。</p>
*/
//class laya.net.HttpRequest extends laya.events.EventDispatcher
var HttpRequest=(function(_super){
	function HttpRequest(){
		/**@private */
		this._responseType=null;
		/**@private */
		this._data=null;
		HttpRequest.__super.call(this);
		this._http=new Browser.window.XMLHttpRequest();
	}

	__class(HttpRequest,'laya.net.HttpRequest',_super);
	var __proto=HttpRequest.prototype;
	/**
	*发送 HTTP 请求。
	*@param url 请求的地址。大多数浏览器实施了一个同源安全策略，并且要求这个 URL 与包含脚本的文本具有相同的主机名和端口。
	*@param data (default=null)发送的数据。
	*@param method (default="get")用于请求的 HTTP 方法。值包括 "get"、"post"、"head"。
	*@param responseType (default="text")Web 服务器的响应类型，可设置为 "text"、"json"、"xml"、"arraybuffer"。
	*@param headers (default=null)HTTP 请求的头部信息。参数形如key-value数组：key是头部的名称，不应该包括空白、冒号或换行；value是头部的值，不应该包括换行。比如["Content-Type","application/json"]。
	*/
	__proto.send=function(url,data,method,responseType,headers){
		(method===void 0)&& (method="get");
		(responseType===void 0)&& (responseType="text");
		this._responseType=responseType;
		this._data=null;
		var _this=this;
		var http=this._http;
		http.open(method,url,true);
		if (headers){
			for (var i=0;i < headers.length;i++){
				http.setRequestHeader(headers[i++],headers[i]);
			}
			}else if (!Render.isConchApp){
			if (!data || (typeof data=='string'))http.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
			else http.setRequestHeader("Content-Type","application/json");
		}
		http.responseType=responseType!=="arraybuffer" ? "text" :"arraybuffer";
		http.onerror=function (e){
			_this._onError(e);
		}
		http.onabort=function (e){
			_this._onAbort(e);
		}
		http.onprogress=function (e){
			_this._onProgress(e);
		}
		http.onload=function (e){
			_this._onLoad(e);
		}
		http.send(data);
	}

	/**
	*@private
	*请求进度的侦听处理函数。
	*@param e 事件对象。
	*/
	__proto._onProgress=function(e){
		if (e && e.lengthComputable)this.event("progress",e.loaded / e.total);
	}

	/**
	*@private
	*请求中断的侦听处理函数。
	*@param e 事件对象。
	*/
	__proto._onAbort=function(e){
		this.error("Request was aborted by user");
	}

	/**
	*@private
	*请求出错侦的听处理函数。
	*@param e 事件对象。
	*/
	__proto._onError=function(e){
		this.error("Request failed Status:"+this._http.status+" text:"+this._http.statusText);
	}

	/**
	*@private
	*请求消息返回的侦听处理函数。
	*@param e 事件对象。
	*/
	__proto._onLoad=function(e){
		var http=this._http;
		var status=http.status!==undefined ? http.status :200;
		if (status===200 || status===204 || status===0){
			this.complete();
			}else {
			this.error("["+http.status+"]"+http.statusText+":"+http.responseURL);
		}
	}

	/**
	*@private
	*请求错误的处理函数。
	*@param message 错误信息。
	*/
	__proto.error=function(message){
		this.clear();
		this.event("error",message);
	}

	/**
	*@private
	*请求成功完成的处理函数。
	*/
	__proto.complete=function(){
		this.clear();
		var flag=true;
		try {
			if (this._responseType==="json"){
				this._data=JSON.parse(this._http.responseText);
				}else if (this._responseType==="xml"){
				this._data=Utils.parseXMLFromString(this._http.responseText);
				}else {
				this._data=this._http.response || this._http.responseText;
			}
			}catch (e){
			flag=false;
			this.error(e.message);
		}
		flag && this.event("complete",(this._data instanceof Array)? [this._data] :this._data);
	}

	/**
	*@private
	*清除当前请求。
	*/
	__proto.clear=function(){
		var http=this._http;
		http.onerror=http.onabort=http.onprogress=http.onload=null;
	}

	/**返回的数据。*/
	__getset(0,__proto,'data',function(){
		return this._data;
	});

	/**
	*本对象所封装的原生 XMLHttpRequest 引用。
	*/
	__getset(0,__proto,'http',function(){
		return this._http;
	});

	/**请求的地址。*/
	__getset(0,__proto,'url',function(){
		return this._http.responseURL;
	});

	return HttpRequest;
})(EventDispatcher)


/**
*<p> <code>LoaderManager</code> 类用于用于批量加载资源。此类是单例，不要手动实例化此类，请通过Laya.loader访问。</p>
*<p>全部队列加载完成，会派发 Event.COMPLETE 事件；如果队列中任意一个加载失败，会派发 Event.ERROR 事件，事件回调参数值为加载出错的资源地址。</p>
*<p> <code>LoaderManager</code> 类提供了以下几种功能：<br/>
*多线程：默认5个加载线程，可以通过maxLoader属性修改线程数量；<br/>
*多优先级：有0-4共5个优先级，优先级高的优先加载。0最高，4最低；<br/>
*重复过滤：自动过滤重复加载（不会有多个相同地址的资源同时加载）以及复用缓存资源，防止重复加载；<br/>
*错误重试：资源加载失败后，会重试加载（以最低优先级插入加载队列），retryNum设定加载失败后重试次数，retryDelay设定加载重试的时间间隔。</p>
*@see laya.net.Loader
*/
//class laya.net.LoaderManager extends laya.events.EventDispatcher
var LoaderManager=(function(_super){
	var ResInfo;
	function LoaderManager(){
		/**加载出错后的重试次数，默认重试一次*/
		this.retryNum=1;
		/**延迟时间多久再进行错误重试，默认立即重试*/
		this.retryDelay=0;
		/**最大下载线程，默认为5个*/
		this.maxLoader=5;
		/**@private */
		this._loaders=[];
		/**@private */
		this._loaderCount=0;
		/**@private */
		this._resInfos=[];
		/**@private */
		this._infoPool=[];
		/**@private */
		this._maxPriority=5;
		/**@private */
		this._failRes={};
		LoaderManager.__super.call(this);
		for (var i=0;i < this._maxPriority;i++)this._resInfos[i]=[];
	}

	__class(LoaderManager,'laya.net.LoaderManager',_super);
	var __proto=LoaderManager.prototype;
	/**
	*<p>根据clas类型创建一个未初始化资源的对象，随后进行异步加载，资源加载完成后，初始化对象的资源，并通过此对象派发 Event.LOADED 事件，事件回调参数值为此对象本身。套嵌资源的子资源会保留资源路径"?"后的部分。</p>
	*<p>如果url为数组，返回true；否则返回指定的资源类对象，可以通过侦听此对象的 Event.LOADED 事件来判断资源是否已经加载完毕。</p>
	*<p><b>注意：</b>cache参数只能对文件后缀为atlas的资源进行缓存控制，其他资源会忽略缓存，强制重新加载。</p>
	*@param url 资源地址或者数组。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：[{url:xx,clas:xx,priority:xx,params:xx},{url:xx,clas:xx,priority:xx,params:xx}]。
	*@param complete 加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
	*@param progress 资源加载进度回调，回调参数值为当前资源加载的进度信息(0-1)。
	*@param clas 资源类名。如果url和clas同时指定了资源类型，优先使用url指定的资源类型。参数形如：Texture。
	*@param params 资源构造参数。
	*@param priority (default=1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
	*@param cache 是否缓存加载的资源。
	*@return 如果url为数组，返回true；否则返回指定的资源类对象。
	*/
	__proto.create=function(url,complete,progress,clas,params,priority,cache,group){
		(priority===void 0)&& (priority=1);
		(cache===void 0)&& (cache=true);
		if ((url instanceof Array)){
			var items=url;
			var itemCount=items.length;
			var loadedCount=0;
			if (progress){
				var progress2=Handler.create(progress.caller,progress.method,progress.args,false);
			}
			for (var i=0;i < itemCount;i++){
				var item=items[i];
				if ((typeof item=='string'))
					item=items[i]={url:item};
				item.progress=0;
			}
			for (i=0;i < itemCount;i++){
				item=items[i];
				var progressHandler=progress ? Handler.create(null,onProgress,[item],false):null;
				var completeHandler=(progress || complete)? Handler.create(null,onComplete,[item]):null;
				this._create(item.url,completeHandler,progressHandler,item.clas || clas,item.params || params,item.priority || priority,cache,item.group || group);
			}
			function onComplete (item,content){
				loadedCount++;
				item.progress=1;
				if (loadedCount===itemCount && complete){
					complete.run();
				}
			}
			function onProgress (item,value){
				item.progress=value;
				var num=0;
				for (var j=0;j < itemCount;j++){
					var item1=items[j];
					num+=item1.progress;
				};
				var v=num / itemCount;
				progress2.runWith(v);
			}
			return true;
		}else return this._create(url,complete,progress,clas,params,priority,cache,group);
	}

	__proto._create=function(url,complete,progress,clas,params,priority,cache,group){
		(priority===void 0)&& (priority=1);
		(cache===void 0)&& (cache=true);
		var formarUrl=URL.formatURL(url);
		var item=this.getRes(formarUrl);
		if (!item){
			var extension=Utils.getFileExtension(url);
			var creatItem=LoaderManager.createMap[extension];
			if (!creatItem)
				throw new Error("LoaderManager:unknown file("+url+") extension with: "+extension+".");
			if (!clas)clas=creatItem[0];
			var type=creatItem[1];
			if (extension=="atlas"){
				this.load(url,complete,progress,type,priority,cache);
				}else {
				if (clas===Texture)type="htmlimage";
				item=clas ? new clas():null;
				if (item.hasOwnProperty("_loaded"))
					item._loaded=false;
				item._setUrl(url);
				(group)&& (item._setGroup(group));
				this._createLoad(item,url,Handler.create(null,onLoaded),progress,type,priority,false,group,true);
				function onLoaded (data){
					(item && !item.destroyed && data)&& (item.onAsynLoaded.call(item,url,data,params));
					if (complete)complete.run();
					Laya.loader.event(url);
				}
				(cache)&& (this.cacheRes(formarUrl,item));
			}
			}else {
			if (!item.hasOwnProperty("loaded")|| item.loaded){
				progress && progress.runWith(1);
				complete && complete.run();
				}else if (complete){
				Laya.loader._createListener(url,complete.caller,complete.method,complete.args,true,false);
			}
		}
		return item;
	}

	/**
	*<p>加载资源。资源加载错误时，本对象会派发 Event.ERROR 事件，事件回调参数值为加载出错的资源地址。</p>
	*<p>因为返回值为 LoaderManager 对象本身，所以可以使用如下语法：Laya.loader.load(...).load(...);</p>
	*@param url 要加载的单个资源地址或资源信息数组。比如：简单数组：["a.png","b.png"]；复杂数组[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}]。
	*@param complete 加载结束回调。根据url类型不同分为2种情况：1. url为String类型，也就是单个资源地址，如果加载成功，则回调参数值为加载完成的资源，否则为null；2. url为数组类型，指定了一组要加载的资源，如果全部加载成功，则回调参数值为true，否则为false。
	*@param progress 加载进度回调。回调参数值为当前资源的加载进度信息(0-1)。
	*@param type 资源类型。比如：Loader.IMAGE。
	*@param priority (default=1)加载的优先级，优先级高的优先加载。有0-4共5个优先级，0最高，4最低。
	*@param cache 是否缓存加载结果。
	*@param group 分组，方便对资源进行管理。
	*@param ignoreCache 是否忽略缓存，强制重新加载。
	*@return 此 LoaderManager 对象本身。
	*/
	__proto.load=function(url,complete,progress,type,priority,cache,group,ignoreCache){
		var _$this=this;
		(priority===void 0)&& (priority=1);
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		if ((url instanceof Array))return this._loadAssets(url,complete,progress,type,priority,cache,group);
		var content=Loader.getRes(url);
		if (content !=null){
			Laya.timer.frameOnce(1,null,function(){
				progress && progress.runWith(1);
				complete && complete.runWith(content);
				_$this._loaderCount || _$this.event("complete");
			});
			}else {
			var info=LoaderManager._resMap[url];
			if (!info){
				info=this._infoPool.length ? this._infoPool.pop():new ResInfo();
				info.url=url;
				info.type=type;
				info.cache=cache;
				info.group=group;
				info.ignoreCache=ignoreCache;
				complete && info.on("complete",complete.caller,complete.method,complete.args);
				progress && info.on("progress",progress.caller,progress.method,progress.args);
				LoaderManager._resMap[url]=info;
				priority=priority < this._maxPriority ? priority :this._maxPriority-1;
				this._resInfos[priority].push(info);
				this._next();
				}else {
				complete && info._createListener("complete",complete.caller,complete.method,complete.args,false,false);
				progress && info._createListener("progress",progress.caller,progress.method,progress.args,false,false);
			}
		}
		return this;
	}

	/**
	*@private
	*/
	__proto._createLoad=function(item,url,complete,progress,type,priority,cache,group,ignoreCache){
		var _$this=this;
		(priority===void 0)&& (priority=1);
		(cache===void 0)&& (cache=true);
		(ignoreCache===void 0)&& (ignoreCache=false);
		if ((url instanceof Array))return this._loadAssets(url,complete,progress,type,priority,cache,group);
		var content=Loader.getRes(url);
		if (content !=null){
			Laya.timer.frameOnce(1,null,function(){
				progress && progress.runWith(1);
				complete && complete.runWith(content);
				_$this._loaderCount || _$this.event("complete");
			});
			}else {
			var info=LoaderManager._resMap[url];
			if (!info){
				info=this._infoPool.length ? this._infoPool.pop():new ResInfo();
				info.url=url;
				info.clas=item;
				info.type=type;
				info.cache=cache;
				info.group=group;
				info.ignoreCache=ignoreCache;
				complete && info.on("complete",complete.caller,complete.method,complete.args);
				progress && info.on("progress",progress.caller,progress.method,progress.args);
				LoaderManager._resMap[url]=info;
				priority=priority < this._maxPriority ? priority :this._maxPriority-1;
				this._resInfos[priority].push(info);
				this._next();
				}else {
				complete && info._createListener("complete",complete.caller,complete.method,complete.args,false,false);
				progress && info._createListener("progress",progress.caller,progress.method,progress.args,false,false);
			}
		}
		return this;
	}

	__proto._next=function(){
		if (this._loaderCount >=this.maxLoader)return;
		for (var i=0;i < this._maxPriority;i++){
			var infos=this._resInfos[i];
			while (infos.length > 0){
				var info=infos.shift();
				if (info)return this._doLoad(info);
			}
		}
		this._loaderCount || this.event("complete");
	}

	__proto._doLoad=function(resInfo){
		this._loaderCount++;
		var loader=this._loaders.length ? this._loaders.pop():new Loader();
		loader.on("complete",null,onLoaded);
		loader.on("progress",null,function(num){
			resInfo.event("progress",num);
		});
		loader.on("error",null,function(msg){
			onLoaded(null);
		});
		var _this=this;
		function onLoaded (data){
			loader.offAll();
			loader._data=null;
			loader._customParse=false;
			_this._loaders.push(loader);
			_this._endLoad(resInfo,(data instanceof Array)? [data] :data);
			_this._loaderCount--;
			_this._next();
		}
		loader._class=resInfo.clas;
		loader.load(resInfo.url,resInfo.type,resInfo.cache,resInfo.group,resInfo.ignoreCache);
	}

	__proto._endLoad=function(resInfo,content){
		var url=resInfo.url;
		if (content==null){
			var errorCount=this._failRes[url] || 0;
			if (errorCount < this.retryNum){
				console.warn("[warn]Retry to load:",url);
				this._failRes[url]=errorCount+1;
				Laya.timer.once(this.retryDelay,this,this._addReTry,[resInfo],false);
				return;
				}else {
				console.warn("[error]Failed to load:",url);
				this.event("error",url);
			}
		}
		if (this._failRes[url])this._failRes[url]=0;
		delete LoaderManager._resMap[url];
		resInfo.event("complete",content);
		resInfo.offAll();
		this._infoPool.push(resInfo);
	}

	__proto._addReTry=function(resInfo){
		this._resInfos[this._maxPriority-1].push(resInfo);
		this._next();
	}

	/**
	*清理指定资源地址缓存。
	*@param url 资源地址。
	*@param forceDispose 是否强制销毁，有些资源是采用引用计数方式销毁，如果forceDispose=true，则忽略引用计数，直接销毁，比如Texture，默认为false
	*/
	__proto.clearRes=function(url,forceDispose){
		(forceDispose===void 0)&& (forceDispose=false);
		Loader.clearRes(url,forceDispose);
	}

	/**
	*获取指定资源地址的资源。
	*@param url 资源地址。
	*@return 返回资源。
	*/
	__proto.getRes=function(url){
		return Loader.getRes(url);
	}

	/**
	*缓存资源。
	*@param url 资源地址。
	*@param data 要缓存的内容。
	*/
	__proto.cacheRes=function(url,data){
		Loader.cacheRes(url,data);
	}

	/**
	*销毁Texture使用的图片资源，保留texture壳，如果下次渲染的时候，发现texture使用的图片资源不存在，则会自动恢复
	*相比clearRes，clearTextureRes只是清理texture里面使用的图片资源，并不销毁texture，再次使用到的时候会自动恢复图片资源
	*而clearRes会彻底销毁texture，导致不能再使用；clearTextureRes能确保立即销毁图片资源，并且不用担心销毁错误，clearRes则采用引用计数方式销毁
	*【注意】如果图片本身在自动合集里面（默认图片小于512*512），内存是不能被销毁的，此图片被大图合集管理器管理
	*@param url 图集地址或者texture地址，比如 Loader.clearTextureRes("res/atlas/comp.atlas");Loader.clearTextureRes("hall/bg.jpg");
	*/
	__proto.clearTextureRes=function(url){
		Loader.clearTextureRes(url);
	}

	/**
	*设置资源分组。
	*@param url 资源地址。
	*@param group 分组名
	*/
	__proto.setGroup=function(url,group){
		Loader.setGroup(url,group);
	}

	/**
	*根据分组清理资源。
	*@param group 分组名
	*/
	__proto.clearResByGroup=function(group){
		Loader.clearResByGroup(group);
	}

	/**清理当前未完成的加载，所有未加载的内容全部停止加载。*/
	__proto.clearUnLoaded=function(){
		for (var i=0;i < this._maxPriority;i++){
			var infos=this._resInfos[i];
			for (var j=infos.length-1;j >-1;j--){
				var info=infos[j];
				if (info){
					info.offAll();
					this._infoPool.push(info);
				}
			}
			infos.length=0;
		}
		this._loaderCount=0;
		LoaderManager._resMap={};
	}

	/**
	*根据地址集合清理掉未加载的内容
	*@param urls 资源地址集合
	*/
	__proto.cancelLoadByUrls=function(urls){
		if (!urls)return;
		for (var i=0,n=urls.length;i < n;i++){
			this.cancelLoadByUrl(urls[i]);
		}
	}

	/**
	*根据地址清理掉未加载的内容
	*@param url 资源地址
	*/
	__proto.cancelLoadByUrl=function(url){
		for (var i=0;i < this._maxPriority;i++){
			var infos=this._resInfos[i];
			for (var j=infos.length-1;j >-1;j--){
				var info=infos[j];
				if (info && info.url===url){
					infos[j]=null;
					info.offAll();
					this._infoPool.push(info);
				}
			}
		}
		if (LoaderManager._resMap[url])delete LoaderManager._resMap[url];
	}

	/**
	*@private
	*加载数组里面的资源。
	*@param arr 简单：["a.png","b.png"]，复杂[{url:"a.png",type:Loader.IMAGE,size:100,priority:1},{url:"b.json",type:Loader.JSON,size:50,priority:1}]*/
	__proto._loadAssets=function(arr,complete,progress,type,priority,cache,group){
		(priority===void 0)&& (priority=1);
		(cache===void 0)&& (cache=true);
		var itemCount=arr.length;
		var loadedCount=0;
		var totalSize=0;
		var items=[];
		var success=true;
		for (var i=0;i < itemCount;i++){
			var item=arr[i];
			if ((typeof item=='string'))item={url:item,type:type,size:1,priority:priority};
			if (!item.size)item.size=1;
			item.progress=0;
			totalSize+=item.size;
			items.push(item);
			var progressHandler=progress ? Handler.create(null,loadProgress,[item],false):null;
			var completeHandler=(complete || progress)? Handler.create(null,loadComplete,[item]):null;
			this.load(item.url,completeHandler,progressHandler,item.type,item.priority || 1,cache,item.group || group);
		}
		function loadComplete (item,content){
			loadedCount++;
			item.progress=1;
			if (!content)success=false;
			if (loadedCount===itemCount && complete){
				complete.runWith(success);
			}
		}
		function loadProgress (item,value){
			if (progress !=null){
				item.progress=value;
				var num=0;
				for (var j=0;j < items.length;j++){
					var item1=items[j];
					num+=item1.size *item1.progress;
				};
				var v=num / totalSize;
				progress.runWith(v);
			}
		}
		return this;
	}

	LoaderManager.cacheRes=function(url,data){
		Loader.cacheRes(url,data);
	}

	LoaderManager._resMap={};
	__static(LoaderManager,
	['createMap',function(){return this.createMap={atlas:[null,"atlas"]};}
	]);
	LoaderManager.__init$=function(){
		//class ResInfo extends laya.events.EventDispatcher
		ResInfo=(function(_super){
			function ResInfo(){
				this.url=null;
				this.type=null;
				this.cache=false;
				this.group=null;
				this.ignoreCache=false;
				this.clas=null;
				ResInfo.__super.call(this);
			}
			__class(ResInfo,'',_super);
			return ResInfo;
		})(EventDispatcher)
	}

	return LoaderManager;
})(EventDispatcher)


/**
*<code>Texture</code> 是一个纹理处理类。
*/
//class laya.resource.Texture extends laya.events.EventDispatcher
var Texture=(function(_super){
	function Texture(bitmap,uv){
		/**图片或者canvas 。*/
		//this.bitmap=null;
		/**UV信息。*/
		//this.uv=null;
		/**沿 X 轴偏移量。*/
		this.offsetX=0;
		/**沿 Y 轴偏移量。*/
		this.offsetY=0;
		/**原始宽度（包括被裁剪的透明区域）。*/
		this.sourceWidth=0;
		/**原始高度（包括被裁剪的透明区域）。*/
		this.sourceHeight=0;
		/**@private */
		//this._loaded=false;
		/**@private */
		this._w=0;
		/**@private */
		this._h=0;
		/**@private 唯一ID*/
		//this.$_GID=NaN;
		/**图片地址*/
		//this.url=null;
		/**@private */
		this._uvID=0;
		this._atlasID=-1;
		/**@private */
		this.scaleRate=1;
		Texture.__super.call(this);
		if (bitmap && bitmap._addReference!=null){
			bitmap._addReference();
		}
		this.setTo(bitmap,uv);
	}

	__class(Texture,'laya.resource.Texture',_super);
	var __proto=Texture.prototype;
	/**
	*@private
	*/
	__proto._setUrl=function(url){
		this.url=url;
	}

	/**
	*设置此对象的位图资源、UV数据信息。
	*@param bitmap 位图资源
	*@param uv UV数据信息
	*/
	__proto.setTo=function(bitmap,uv){
		if (bitmap instanceof window.HTMLElement){
			var canvas=HTMLCanvas.create("2D",bitmap);
			this.bitmap=canvas;
			}else{
			this.bitmap=bitmap;
		}
		this.uv=uv || Texture.DEF_UV;
		if (bitmap){
			this._w=bitmap.width;
			this._h=bitmap.height;
			this.sourceWidth=this.sourceWidth || this._w;
			this.sourceHeight=this.sourceHeight || this._h
			this._loaded=this._w > 0;
			var _this=this;
			if (this._loaded){
				RunDriver.addToAtlas && RunDriver.addToAtlas(_this);
				}else {
				var bm=bitmap;
				if ((bm instanceof laya.resource.HTMLImage )&& bm.image)
					bm.image.addEventListener('load',function(e){
					RunDriver.addToAtlas && RunDriver.addToAtlas(_this);
				},false);
			}
		}
	}

	/**@private 激活资源。*/
	__proto.active=function(){
		if (this.bitmap)this.bitmap.activeResource();
	}

	/**
	*销毁纹理（分直接销毁，跟计数销毁两种）。
	*@param forceDispose (default=false)true为强制销毁主纹理，false是通过计数销毁纹理。
	*/
	__proto.destroy=function(forceDispose){
		(forceDispose===void 0)&& (forceDispose=false);
		if (this.bitmap && (this.bitmap).referenceCount > 0){
			var temp=this.bitmap;
			if (forceDispose){
				if (Render.isConchApp && temp.source && temp.source.conchDestroy){
					this.bitmap.source.conchDestroy();
				}
				this.bitmap=null;
				temp.dispose();
				(temp)._clearReference();
				}else {
				(temp)._removeReference();
				if ((temp).referenceCount==0){
					if (Render.isConchApp && temp.source && temp.source.conchDestroy){
						this.bitmap.source.conchDestroy();
					}
					this.bitmap=null;
					temp.dispose();
				}
			}
			if (this.url && this===Laya.loader.getRes(this.url))Laya.loader.clearRes(this.url,forceDispose);
			this._loaded=false;
		}
	}

	/**
	*加载指定地址的图片。
	*@param url 图片地址。
	*/
	__proto.load=function(url){
		var _$this=this;
		this._loaded=false;
		url=URL.customFormat(url);
		var fileBitmap=(this.bitmap || (this.bitmap=HTMLImage.create(url)));
		if (fileBitmap)fileBitmap._addReference();
		var _this=this;
		fileBitmap.onload=function (){
			fileBitmap.onload=null;
			_this._loaded=true;
			_$this.sourceWidth=_$this._w=fileBitmap.width;
			_$this.sourceHeight=_$this._h=fileBitmap.height;
			_this.event("loaded",this);
			(RunDriver.addToAtlas)&& (RunDriver.addToAtlas(_this));
		};
	}

	/**@private */
	__proto.addTextureToAtlas=function(e){
		RunDriver.addTextureToAtlas(this);
	}

	/**
	*获取Texture上的某个区域的像素点
	*@param x
	*@param y
	*@param width
	*@param height
	*@return 返回像素点集合
	*/
	__proto.getPixels=function(x,y,width,height){
		if (Render.isConchApp){
			var temp=this.bitmap;
			if (temp.source && temp.source.getImageData){
				var arraybuffer=temp.source.getImageData(x,y,width,height);
				var tUint8Array=new Uint8Array(arraybuffer);
				return Array.from(tUint8Array);
			}
			return null;
			}else if (Render.isWebGL){
			return RunDriver.getTexturePixels(this,x,y,width,height);
			}else {
			Browser.canvas.size(width,height);
			Browser.canvas.clear();
			Browser.context.drawTexture(this,-x,-y,this.width,this.height,0,0);
			var info=Browser.context.getImageData(0,0,width,height);
		}
		return info.data;
	}

	/**@private */
	__proto.onAsynLoaded=function(url,bitmap){
		if (bitmap)bitmap._addReference();
		this.setTo(bitmap,this.uv);
	}

	/**
	*设置线性采样的状态（目前只能第一次绘制前设置false生效,来关闭线性采样）。
	*/
	/**
	*获取当前纹理是否启用了线性采样。
	*/
	__getset(0,__proto,'isLinearSampling',function(){
		return Render.isWebGL ? (this.bitmap.minFifter !=0x2600):true;
		},function(value){
		if (!value && Render.isWebGL){
			if (!value && (this.bitmap.minFifter==-1)&& (this.bitmap.magFifter==-1)){
				this.bitmap.minFifter=0x2600;
				this.bitmap.magFifter=0x2600;
				this.bitmap.enableMerageInAtlas=false;
			}
		}
	});

	/**实际高度。*/
	__getset(0,__proto,'height',function(){
		if (this._h)return this._h;
		return (this.uv && this.uv!==Texture.DEF_UV)? (this.uv[5]-this.uv[1])*this.bitmap.height :this.bitmap.height;
		},function(value){
		this._h=value;
		this.sourceHeight || (this.sourceHeight=value);
	});

	/**实际宽度。*/
	__getset(0,__proto,'width',function(){
		if (this._w)return this._w;
		return (this.uv && this.uv!==Texture.DEF_UV)? (this.uv[2]-this.uv[0])*this.bitmap.width :this.bitmap.width;
		},function(value){
		this._w=value;
		this.sourceWidth || (this.sourceWidth=value);
	});

	/**激活并获取资源。*/
	__getset(0,__proto,'source',function(){
		if (!this.bitmap)return null;
		this.bitmap.activeResource();
		return this.bitmap.source;
	});

	/**
	*表示资源是否已释放。
	*/
	__getset(0,__proto,'released',function(){
		if (!this.bitmap)return true;
		return this.bitmap.released;
	});

	/**
	*通过外部设置是否启用纹理平铺(后面要改成在着色器里计算)
	*/
	/**
	*获取当前纹理是否启用了纹理平铺
	*/
	__getset(0,__proto,'repeat',function(){
		if (Render.isWebGL && this.bitmap){
			return this.bitmap.repeat;
		}
		return true;
		},function(value){
		if (value){
			if (Render.isWebGL && this.bitmap){
				this.bitmap.repeat=value;
				if (value){
					this.bitmap.enableMerageInAtlas=false;
				}
			}
		}
	});

	/**
	*表示是否加载成功，只能表示初次载入成功（通常包含下载和载入）,并不能完全表示资源是否可立即使用（资源管理机制释放影响等）。
	*/
	__getset(0,__proto,'loaded',function(){
		return this._loaded;
	});

	Texture.moveUV=function(offsetX,offsetY,uv){
		for (var i=0;i < 8;i+=2){
			uv[i]+=offsetX;
			uv[i+1]+=offsetY;
		}
		return uv;
	}

	Texture.create=function(source,x,y,width,height,offsetX,offsetY,sourceWidth,sourceHeight){
		(offsetX===void 0)&& (offsetX=0);
		(offsetY===void 0)&& (offsetY=0);
		(sourceWidth===void 0)&& (sourceWidth=0);
		(sourceHeight===void 0)&& (sourceHeight=0);
		var btex=(source instanceof laya.resource.Texture );
		var uv=btex ? source.uv :Texture.DEF_UV;
		var bitmap=btex ? source.bitmap :source;
		var bIsAtlas=RunDriver.isAtlas(bitmap);
		if (bIsAtlas){
			var atlaser=bitmap._atlaser;
			var nAtlasID=(source)._atlasID;
			if (nAtlasID==-1){
				throw new Error("create texture error");
			}
			bitmap=atlaser._inAtlasTextureBitmapValue[nAtlasID];
			uv=atlaser._inAtlasTextureOriUVValue[nAtlasID];
		};
		var tex=new Texture(bitmap,null);
		if (bitmap.width && (x+width)> bitmap.width)width=bitmap.width-x;
		if (bitmap.height && (y+height)> bitmap.height)height=bitmap.height-y;
		tex.width=width;
		tex.height=height;
		tex.offsetX=offsetX;
		tex.offsetY=offsetY;
		tex.sourceWidth=sourceWidth || width;
		tex.sourceHeight=sourceHeight || height;
		var dwidth=1 / bitmap.width;
		var dheight=1 / bitmap.height;
		x *=dwidth;
		y *=dheight;
		width *=dwidth;
		height *=dheight;
		var u1=tex.uv[0],v1=tex.uv[1],u2=tex.uv[4],v2=tex.uv[5];
		var inAltasUVWidth=(u2-u1),inAltasUVHeight=(v2-v1);
		var oriUV=Texture.moveUV(uv[0],uv[1],[x,y,x+width,y,x+width,y+height,x,y+height]);
		tex.uv=[u1+oriUV[0] *inAltasUVWidth,v1+oriUV[1] *inAltasUVHeight,u2-(1-oriUV[2])*inAltasUVWidth,v1+oriUV[3] *inAltasUVHeight,u2-(1-oriUV[4])*inAltasUVWidth,v2-(1-oriUV[5])*inAltasUVHeight,u1+oriUV[6] *inAltasUVWidth,v2-(1-oriUV[7])*inAltasUVHeight];
		if (bIsAtlas){
			tex.addTextureToAtlas();
		};
		var bitmapScale=bitmap.scaleRate;
		if (bitmapScale && bitmapScale !=1){
			tex.sourceWidth /=bitmapScale;
			tex.sourceHeight /=bitmapScale;
			tex.width /=bitmapScale;
			tex.height /=bitmapScale;
			tex.scaleRate=bitmapScale;
			tex.offsetX /=bitmapScale;
			tex.offsetY /=bitmapScale;
			}else{
			tex.scaleRate=1;
		}
		return tex;
	}

	Texture.createFromTexture=function(texture,x,y,width,height){
		var texScaleRate=texture.scaleRate;
		if (texScaleRate !=1){
			x *=texScaleRate;
			y *=texScaleRate;
			width *=texScaleRate;
			height *=texScaleRate;
		};
		var rect=Rectangle.TEMP.setTo(x-texture.offsetX,y-texture.offsetY,width,height);
		var result=rect.intersection(Texture._rect1.setTo(0,0,texture.width,texture.height),Texture._rect2);
		if (result)
			var tex=Texture.create(texture,result.x,result.y,result.width,result.height,result.x-rect.x,result.y-rect.y,width,height);
		else return null;
		tex.bitmap._removeReference();
		return tex;
	}

	Texture.DEF_UV=[0,0,1.0,0,1.0,1.0,0,1.0];
	Texture.INV_UV=[0,1,1.0,1,1.0,0.0,0,0.0];
	Texture._rect1=new Rectangle();
	Texture._rect2=new Rectangle();
	return Texture;
})(EventDispatcher)


/**
*<p> <code>SoundChannel</code> 用来控制程序中的声音。每个声音均分配给一个声道，而且应用程序可以具有混合在一起的多个声道。</p>
*<p> <code>SoundChannel</code> 类包含控制声音的播放、暂停、停止、音量的方法，以及获取声音的播放状态、总时间、当前播放时间、总循环次数、播放地址等信息的方法。</p>
*/
//class laya.media.SoundChannel extends laya.events.EventDispatcher
var SoundChannel=(function(_super){
	function SoundChannel(){
		/**
		*声音地址。
		*/
		this.url=null;
		/**
		*循环次数。
		*/
		this.loops=0;
		/**
		*开始时间。
		*/
		this.startTime=NaN;
		/**
		*表示声音是否已暂停。
		*/
		this.isStopped=false;
		/**
		*播放完成处理器。
		*/
		this.completeHandler=null;
		SoundChannel.__super.call(this);
	}

	__class(SoundChannel,'laya.media.SoundChannel',_super);
	var __proto=SoundChannel.prototype;
	/**
	*播放。
	*/
	__proto.play=function(){}
	/**
	*停止。
	*/
	__proto.stop=function(){}
	/**
	*暂停。
	*/
	__proto.pause=function(){}
	/**
	*继续播放。
	*/
	__proto.resume=function(){}
	/**
	*private
	*/
	__proto.__runComplete=function(handler){
		if (handler){
			handler.run();
		}
	}

	/**
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		return 0;
	});

	/**
	*获取当前播放时间。
	*/
	__getset(0,__proto,'position',function(){
		return 0;
	});

	/**
	*音量范围从 0（静音）至 1（最大音量）。
	*/
	__getset(0,__proto,'volume',function(){
		return 1;
		},function(v){
	});

	return SoundChannel;
})(EventDispatcher)


/**
*@private
*使用Audio标签播放声音
*/
//class laya.media.h5audio.AudioSound extends laya.events.EventDispatcher
var AudioSound=(function(_super){
	function AudioSound(){
		/**
		*声音URL
		*/
		this.url=null;
		/**
		*播放用的audio标签
		*/
		this.audio=null;
		/**
		*是否已加载完成
		*/
		this.loaded=false;
		AudioSound.__super.call(this);
	}

	__class(AudioSound,'laya.media.h5audio.AudioSound',_super);
	var __proto=AudioSound.prototype;
	/**
	*释放声音
	*
	*/
	__proto.dispose=function(){
		var ad=AudioSound._audioCache[this.url];
		if (ad){
			ad.src="";
			delete AudioSound._audioCache[this.url];
		}
	}

	/**
	*加载声音
	*@param url
	*
	*/
	__proto.load=function(url){
		url=URL.formatURL(url);
		this.url=url;
		var ad;
		if (url==SoundManager._tMusic){
			AudioSound._initMusicAudio();
			ad=AudioSound._musicAudio;
			if (ad.src !=url){
				AudioSound._audioCache[ad.src]=null;
				ad=null;
			}
			}else{
			ad=AudioSound._audioCache[url];
		}
		if (ad && ad.readyState >=2){
			this.event("complete");
			return;
		}
		if (!ad){
			if (url==SoundManager._tMusic){
				AudioSound._initMusicAudio();
				ad=AudioSound._musicAudio;
				}else{
				ad=Browser.createElement("audio");
			}
			AudioSound._audioCache[url]=ad;
			ad.src=url;
		}
		ad.addEventListener("canplaythrough",onLoaded);
		ad.addEventListener("error",onErr);
		var me=this;
		function onLoaded (){
			offs();
			me.loaded=true;
			me.event("complete");
		}
		function onErr (){
			ad.load=null;
			offs();
			me.event("error");
		}
		function offs (){
			ad.removeEventListener("canplaythrough",onLoaded);
			ad.removeEventListener("error",onErr);
		}
		this.audio=ad;
		if (ad.load){
			ad.load();
			}else {
			onErr();
		}
	}

	/**
	*播放声音
	*@param startTime 起始时间
	*@param loops 循环次数
	*@return
	*
	*/
	__proto.play=function(startTime,loops){
		(startTime===void 0)&& (startTime=0);
		(loops===void 0)&& (loops=0);
		if (!this.url)return null;
		var ad;
		if (this.url==SoundManager._tMusic){
			ad=AudioSound._musicAudio;
			}else{
			ad=AudioSound._audioCache[this.url];
		}
		if (!ad)return null;
		var tAd;
		tAd=Pool.getItem("audio:"+this.url);
		if (Render.isConchApp){
			if (!tAd){
				tAd=Browser.createElement("audio");
				tAd.src=this.url;
			}
		}
		else {
			if (this.url==SoundManager._tMusic){
				AudioSound._initMusicAudio();
				tAd=AudioSound._musicAudio;
				tAd.src=this.url;
				}else{
				tAd=tAd ? tAd :ad.cloneNode(true);
			}
		};
		var channel=new AudioSoundChannel(tAd);
		channel.url=this.url;
		channel.loops=loops;
		channel.startTime=startTime;
		channel.play();
		SoundManager.addChannel(channel);
		return channel;
	}

	/**
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		var ad;
		ad=AudioSound._audioCache[this.url];
		if (!ad)
			return 0;
		return ad.duration;
	});

	AudioSound._initMusicAudio=function(){
		if (AudioSound._musicAudio)return;
		if (!AudioSound._musicAudio)AudioSound._musicAudio=Browser.createElement("audio");
		if (!Render.isConchApp){
			Browser.document.addEventListener("mousedown",AudioSound._makeMusicOK);
		}
	}

	AudioSound._makeMusicOK=function(){
		Browser.document.removeEventListener("mousedown",AudioSound._makeMusicOK);
		if (!AudioSound._musicAudio.src){
			AudioSound._musicAudio.src="";
			AudioSound._musicAudio.load();
			}else{
			AudioSound._musicAudio.play();
		}
	}

	AudioSound._audioCache={};
	AudioSound._musicAudio=null;
	return AudioSound;
})(EventDispatcher)


/**
*<code>Sound</code> 类是用来播放控制声音的类。
*/
//class laya.media.Sound extends laya.events.EventDispatcher
var Sound=(function(_super){
	function Sound(){
		Sound.__super.call(this);;
	}

	__class(Sound,'laya.media.Sound',_super);
	var __proto=Sound.prototype;
	/**
	*加载声音。
	*@param url 地址。
	*
	*/
	__proto.load=function(url){}
	/**
	*播放声音。
	*@param startTime 开始时间,单位秒
	*@param loops 循环次数,0表示一直循环
	*@return 声道 SoundChannel 对象。
	*
	*/
	__proto.play=function(startTime,loops){
		(startTime===void 0)&& (startTime=0);
		(loops===void 0)&& (loops=0);
		return null;
	}

	/**
	*释放声音资源。
	*
	*/
	__proto.dispose=function(){}
	/**
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		return 0;
	});

	return Sound;
})(EventDispatcher)


/**
*@private
*web audio api方式播放声音
*/
//class laya.media.webaudio.WebAudioSound extends laya.events.EventDispatcher
var WebAudioSound=(function(_super){
	function WebAudioSound(){
		/**
		*声音URL
		*/
		this.url=null;
		/**
		*是否已加载完成
		*/
		this.loaded=false;
		/**
		*声音文件数据
		*/
		this.data=null;
		/**
		*声音原始文件数据
		*/
		this.audioBuffer=null;
		/**
		*待播放的声音列表
		*/
		this.__toPlays=null;
		/**
		*@private
		*/
		this._disposed=false;
		WebAudioSound.__super.call(this);
	}

	__class(WebAudioSound,'laya.media.webaudio.WebAudioSound',_super);
	var __proto=WebAudioSound.prototype;
	/**
	*加载声音
	*@param url
	*
	*/
	__proto.load=function(url){
		var me=this;
		url=URL.formatURL(url);
		this.url=url;
		this.audioBuffer=WebAudioSound._dataCache[url];
		if (this.audioBuffer){
			this._loaded(this.audioBuffer);
			return;
		}
		WebAudioSound.e.on("loaded:"+url,this,this._loaded);
		WebAudioSound.e.on("err:"+url,this,this._err);
		if (WebAudioSound.__loadingSound[url]){
			return;
		}
		WebAudioSound.__loadingSound[url]=true;
		var request=new Browser.window.XMLHttpRequest();
		request.open("GET",url,true);
		request.responseType="arraybuffer";
		request.onload=function (){
			if (me._disposed){
				me._removeLoadEvents();
				return;
			}
			me.data=request.response;
			WebAudioSound.buffs.push({"buffer":me.data,"url":me.url});
			WebAudioSound.decode();
		};
		request.onerror=function (e){
			me._err();
		}
		request.send();
	}

	__proto._err=function(){
		this._removeLoadEvents();
		WebAudioSound.__loadingSound[this.url]=false;
		this.event("error");
		if (!this.__toPlays)return;
		var i=0,len=0;
		var toPlays;
		toPlays=this.__toPlays;
		len=toPlays.length;
		var tParams;
		for (i=0;i < len;i++){
			tParams=toPlays[i];
			if (tParams[2] && !(tParams [2]).isStopped){
				(tParams [2]).event("error");
			}
		}
		this.__toPlays.length=0;
	}

	__proto._loaded=function(audioBuffer){
		this._removeLoadEvents();
		if (this._disposed){
			return;
		}
		this.audioBuffer=audioBuffer;
		WebAudioSound._dataCache[this.url]=this.audioBuffer;
		this.loaded=true;
		this.event("complete");
	}

	__proto._removeLoadEvents=function(){
		WebAudioSound.e.off("loaded:"+this.url,this,this._loaded);
		WebAudioSound.e.off("err:"+this.url,this,this._err);
	}

	__proto.__playAfterLoaded=function(){
		if (!this.__toPlays)return;
		var i=0,len=0;
		var toPlays;
		toPlays=this.__toPlays;
		len=toPlays.length;
		var tParams;
		for (i=0;i < len;i++){
			tParams=toPlays[i];
			if (tParams[2] && !(tParams [2]).isStopped){
				this.play(tParams[0],tParams[1],tParams[2]);
			}
		}
		this.__toPlays.length=0;
	}

	/**
	*播放声音
	*@param startTime 起始时间
	*@param loops 循环次数
	*@return
	*
	*/
	__proto.play=function(startTime,loops,channel){
		(startTime===void 0)&& (startTime=0);
		(loops===void 0)&& (loops=0);
		channel=channel ? channel :new WebAudioSoundChannel();
		if (!this.audioBuffer){
			if (this.url){
				if (!this.__toPlays)this.__toPlays=[];
				this.__toPlays.push([startTime,loops,channel]);
				this.once("complete",this,this.__playAfterLoaded);
				this.load(this.url);
			}
		}
		channel.url=this.url;
		channel.loops=loops;
		channel["audioBuffer"]=this.audioBuffer;
		channel.startTime=startTime;
		channel.play();
		SoundManager.addChannel(channel);
		return channel;
	}

	__proto.dispose=function(){
		this._disposed=true;
		delete WebAudioSound._dataCache[this.url];
		delete WebAudioSound.__loadingSound[this.url];
		this.audioBuffer=null;
		this.data=null;
		this.__toPlays=[];
	}

	__getset(0,__proto,'duration',function(){
		if (this.audioBuffer){
			return this.audioBuffer.duration;
		}
		return 0;
	});

	WebAudioSound.decode=function(){
		if (WebAudioSound.buffs.length <=0 || WebAudioSound.isDecoding){
			return;
		}
		WebAudioSound.isDecoding=true;
		WebAudioSound.tInfo=WebAudioSound.buffs.shift();
		WebAudioSound.ctx.decodeAudioData(WebAudioSound.tInfo["buffer"],WebAudioSound._done,WebAudioSound._fail);
	}

	WebAudioSound._done=function(audioBuffer){
		WebAudioSound.e.event("loaded:"+WebAudioSound.tInfo.url,audioBuffer);
		WebAudioSound.isDecoding=false;
		WebAudioSound.decode();
	}

	WebAudioSound._fail=function(){
		WebAudioSound.e.event("err:"+WebAudioSound.tInfo.url,null);
		WebAudioSound.isDecoding=false;
		WebAudioSound.decode();
	}

	WebAudioSound._playEmptySound=function(){
		if (WebAudioSound.ctx==null){
			return;
		};
		var source=WebAudioSound.ctx.createBufferSource();
		source.buffer=WebAudioSound._miniBuffer;
		source.connect(WebAudioSound.ctx.destination);
		source.start(0,0,0);
	}

	WebAudioSound._unlock=function(){
		if (WebAudioSound._unlocked){
			return;
		}
		WebAudioSound._playEmptySound();
		if (WebAudioSound.ctx.state=="running"){
			Browser.document.removeEventListener("mousedown",WebAudioSound._unlock,true);
			Browser.document.removeEventListener("touchend",WebAudioSound._unlock,true);
			Browser.document.removeEventListener("touchstart",WebAudioSound._unlock,true);
			WebAudioSound._unlocked=true;
		}
	}

	WebAudioSound.initWebAudio=function(){
		if (WebAudioSound.ctx.state !="running"){
			WebAudioSound._unlock();
			Browser.document.addEventListener("mousedown",WebAudioSound._unlock,true);
			Browser.document.addEventListener("touchend",WebAudioSound._unlock,true);
			Browser.document.addEventListener("touchstart",WebAudioSound._unlock,true);
		}
	}

	WebAudioSound._dataCache={};
	WebAudioSound.buffs=[];
	WebAudioSound.isDecoding=false;
	WebAudioSound._unlocked=false;
	WebAudioSound.tInfo=null;
	WebAudioSound.__loadingSound={};
	__static(WebAudioSound,
	['window',function(){return this.window=Browser.window;},'webAudioEnabled',function(){return this.webAudioEnabled=WebAudioSound.window["AudioContext"] || WebAudioSound.window["webkitAudioContext"] || WebAudioSound.window["mozAudioContext"];},'ctx',function(){return this.ctx=WebAudioSound.webAudioEnabled ? new (WebAudioSound.window["AudioContext"] || WebAudioSound.window["webkitAudioContext"] || WebAudioSound.window["mozAudioContext"])():undefined;},'_miniBuffer',function(){return this._miniBuffer=WebAudioSound.ctx.createBuffer(1,1,22050);},'e',function(){return this.e=new EventDispatcher();}
	]);
	return WebAudioSound;
})(EventDispatcher)


//class fairygui.Controller extends laya.events.EventDispatcher
var Controller=(function(_super){
	function Controller(){
		this._selectedIndex=0;
		this._previousIndex=0;
		this._pageIds=null;
		this._pageNames=null;
		this._actions=null;
		this.name=null;
		this.parent=null;
		this.autoRadioGroupDepth=false;
		this.changing=false;
		Controller.__super.call(this);
		this._pageIds=[];
		this._pageNames=[];
		this._selectedIndex=-1;
		this._previousIndex=-1;
	}

	__class(Controller,'fairygui.Controller',_super);
	var __proto=Controller.prototype;
	__proto.dispose=function(){
		this.offAll();
	}

	//功能和设置selectedIndex一样，但不会触发事件
	__proto.setSelectedIndex=function(value){
		(value===void 0)&& (value=0);
		if (this._selectedIndex !=value){
			if(value > this._pageIds.length-1)
				throw "index out of bounds: "+value;
			this.changing=true;
			this._previousIndex=this._selectedIndex;
			this._selectedIndex=value;
			this.parent.applyController(this);
			this.changing=false;
		}
	}

	//功能和设置selectedPage一样，但不会触发事件
	__proto.setSelectedPage=function(value){
		var i=this._pageNames.indexOf(value);
		if (i==-1)
			i=0;
		this.setSelectedIndex(i);
	}

	__proto.getPageName=function(index){
		(index===void 0)&& (index=0);
		return this._pageNames[index];
	}

	__proto.addPage=function(name){
		(name===void 0)&& (name="");
		this.addPageAt(name,this._pageIds.length);
	}

	__proto.addPageAt=function(name,index){
		(index===void 0)&& (index=0);
		var nid=""+(fairygui.Controller._nextPageId++);
		if (index==this._pageIds.length){
			this._pageIds.push(nid);
			this._pageNames.push(name);
		}
		else {
			this._pageIds.splice(index,0,nid);
			this._pageNames.splice(index,0,name);
		}
	}

	__proto.removePage=function(name){
		var i=this._pageNames.indexOf(name);
		if (i !=-1){
			this._pageIds.splice(i,1);
			this._pageNames.splice(i,1);
			if (this._selectedIndex >=this._pageIds.length)
				this.selectedIndex=this._selectedIndex-1;
			else
			this.parent.applyController(this);
		}
	}

	__proto.removePageAt=function(index){
		(index===void 0)&& (index=0);
		this._pageIds.splice(index,1);
		this._pageNames.splice(index,1);
		if (this._selectedIndex >=this._pageIds.length)
			this.selectedIndex=this._selectedIndex-1;
		else
		this.parent.applyController(this);
	}

	__proto.clearPages=function(){
		this._pageIds.length=0;
		this._pageNames.length=0;
		if (this._selectedIndex !=-1)
			this.selectedIndex=-1;
		else
		this.parent.applyController(this);
	}

	__proto.hasPage=function(aName){
		return this._pageNames.indexOf(aName)!=-1;
	}

	__proto.getPageIndexById=function(aId){
		return this._pageIds.indexOf(aId);
	}

	__proto.getPageIdByName=function(aName){
		var i=this._pageNames.indexOf(aName);
		if(i !=-1)
			return this._pageIds[i];
		else
		return null;
	}

	__proto.getPageNameById=function(aId){
		var i=this._pageIds.indexOf(aId);
		if(i !=-1)
			return this._pageNames[i];
		else
		return null;
	}

	__proto.getPageId=function(index){
		(index===void 0)&& (index=0);
		return this._pageIds[index];
	}

	__proto.runActions=function(){
		if(this._actions){
			var cnt=this._actions.length;
			for(var i=0;i<cnt;i++){
				this._actions[i].run(this,this.previousPageId,this.selectedPageId);
			}
		}
	}

	__proto.setup=function(buffer){
		var beginPos=buffer.pos;
		buffer.seek(beginPos,0);
		this.name=buffer.readS();
		this.autoRadioGroupDepth=buffer.readBool();
		buffer.seek(beginPos,1);
		var i=0;
		var nextPos=0;
		var cnt=buffer.getInt16();
		for (i=0;i < cnt;i++){
			this._pageIds.push(buffer.readS());
			this._pageNames.push(buffer.readS());
		}
		buffer.seek(beginPos,2);
		cnt=buffer.getInt16();
		if (cnt > 0){
			if (this._actions==null)
				this._actions=[];
			for (i=0;i < cnt;i++){
				nextPos=buffer.getInt16();
				nextPos+=buffer.pos;
				var action=ControllerAction.createAction(buffer.readByte());
				action.setup(buffer);
				this._actions.push(action);
				buffer.pos=nextPos;
			}
		}
		if (this.parent !=null && this._pageIds.length > 0)
			this._selectedIndex=0;
		else
		this._selectedIndex=-1;
	}

	__getset(0,__proto,'oppositePageId',null,function(val){
		var i=this._pageIds.indexOf(val);
		if(i > 0)
			this.selectedIndex=0;
		else if(this._pageIds.length > 1)
		this.selectedIndex=1;
	});

	__getset(0,__proto,'selectedPageId',function(){
		if (this._selectedIndex==-1)
			return null;
		else
		return this._pageIds[this._selectedIndex];
		},function(val){
		var i=this._pageIds.indexOf(val);
		this.selectedIndex=i;
	});

	__getset(0,__proto,'pageCount',function(){
		return this._pageIds.length;
	});

	__getset(0,__proto,'previousPage',function(){
		if (this._previousIndex==-1)
			return null;
		else
		return this._pageNames[this._previousIndex];
	});

	__getset(0,__proto,'previousPageId',function(){
		if(this._previousIndex==-1)
			return null;
		else
		return this._pageIds[this._previousIndex];
	});

	__getset(0,__proto,'selectedPage',function(){
		if (this._selectedIndex==-1)
			return null;
		else
		return this._pageNames[this._selectedIndex];
		},function(val){
		var i=this._pageNames.indexOf(val);
		if (i==-1)
			i=0;
		this.selectedIndex=i;
	});

	__getset(0,__proto,'previsousIndex',function(){
		return this._previousIndex;
	});

	__getset(0,__proto,'selectedIndex',function(){
		return this._selectedIndex;
		},function(value){
		if(this._selectedIndex !=value){
			if(value > this._pageIds.length-1)
				throw "index out of bounds: "+value;
			this.changing=true;
			this._previousIndex=this._selectedIndex;
			this._selectedIndex=value;
			this.parent.applyController(this);
			this.event("fui_state_changed");
			this.changing=false;
		}
	});

	Controller._nextPageId=0;
	return Controller;
})(EventDispatcher)


//class fairygui.utils.ByteBuffer extends laya.utils.Byte
var ByteBuffer=(function(_super){
	function ByteBuffer(data,offset,length){
		this.stringTable=null;
		this.version=0;
		(offset===void 0)&& (offset=0);
		(length===void 0)&& (length=-1);
		if(length==-1)
			length=data.byteLength-offset;
		if(offset==0 && length==data.byteLength)
			ByteBuffer.__super.call(this,data);
		else{
			this._u8d_=new Uint8Array(data,offset,length);
			this._d_=new DataView(this._u8d_.buffer,offset,length);
			this._length=length;
		}
		this.endian="bigEndian";
	}

	__class(ByteBuffer,'fairygui.utils.ByteBuffer',_super);
	var __proto=ByteBuffer.prototype;
	__proto.skip=function(count){
		this.pos+=count;
	}

	__proto.readBool=function(){
		return this.getUint8()==1;
	}

	__proto.readS=function(){
		var index=this.getUint16();
		if (index==65534)
			return null;
		else if (index==65533)
		return ""
		else
		return this.stringTable[index];
	}

	__proto.writeS=function(value){
		var index=this.getUint16();
		if (index !=65534 && index !=65533)
			this.stringTable[index]=value;
	}

	__proto.readColor=function(hasAlpha){
		(hasAlpha===void 0)&& (hasAlpha=false);
		var r=this.getUint8();
		var g=this.getUint8();
		var b=this.getUint8();
		var a=this.getUint8();
		return (hasAlpha?(a<<24):0)+(r<<16)+(g<<8)+b;
	}

	__proto.readColorS=function(hasAlpha){
		(hasAlpha===void 0)&& (hasAlpha=false);
		var r=this.getUint8();
		var g=this.getUint8();
		var b=this.getUint8();
		var a=this.getUint8();
		if(hasAlpha && a!=255)
			return "rgba("+r+","+g+","+b+","+(a/255)+")";
		else{
			var sr=r.toString(16);
			var sg=g.toString(16);
			var sb=b.toString(16);
			if (sr.length==1)
				sr="0"+sr;
			if (sg.length==1)
				sg="0"+sg;
			if (sb.length==1)
				sb="0"+sb;
			return "#"+sr+sg+sb;
		}
	}

	__proto.readChar=function(){
		var i=this.getUint16();
		return String.fromCharCode(i);
	}

	__proto.readBuffer=function(){
		var count=this.getUint32();
		var ba=new ByteBuffer(this.buffer,this._pos_,count);
		ba.stringTable=this.stringTable;
		ba.version=this.version;
		return ba;
	}

	__proto.seek=function(indexTablePos,blockIndex){
		var tmp=this._pos_;
		this.pos=indexTablePos;
		var segCount=this.getUint8();
		if (blockIndex < segCount){
			var useShort=this.getUint8()==1;
			var newPos=0;
			if (useShort){
				this.pos+=2 *blockIndex;
				newPos=this.getUint16();
			}
			else{
				this.pos+=4 *blockIndex;
				newPos=this.getUint32();
			}
			if (newPos > 0){
				this.pos=indexTablePos+newPos;
				return true;
			}
			else{
				this.pos=tmp;
				return false;
			}
		}
		else{
			this.pos=tmp;
			return false;
		}
	}

	return ByteBuffer;
})(Byte)


//class fairygui.utils.PixelHitTest extends laya.utils.HitArea
var PixelHitTest=(function(_super){
	function PixelHitTest(data,offsetX,offsetY){
		this._data=null;
		this.offsetX=0;
		this.offsetY=0;
		this.scaleX=NaN;
		this.scaleY=NaN;
		PixelHitTest.__super.call(this);
		(offsetX===void 0)&& (offsetX=0);
		(offsetY===void 0)&& (offsetY=0);
		this._data=data;
		this.offsetX=offsetX;
		this.offsetY=offsetY;
		this.scaleX=1;
		this.scaleY=1;
	}

	__class(PixelHitTest,'fairygui.utils.PixelHitTest',_super);
	var __proto=PixelHitTest.prototype;
	__proto.isHit=function(x,y){
		x=Math.floor((x / this.scaleX-this.offsetX)*this._data.scale);
		y=Math.floor((y / this.scaleY-this.offsetY)*this._data.scale);
		if (x < 0 || y < 0 || x >=this._data.pixelWidth)
			return false;
		var pos=y *this._data.pixelWidth+x;
		var pos2=Math.floor(pos / 8);
		var pos3=pos % 8;
		if (pos2 >=0 && pos2 < this._data.pixels.length)
			return ((this._data.pixels[pos2] >> pos3)& 0x1)==1;
		else
		return false;
	}

	return PixelHitTest;
})(HitArea)


//class fairygui.utils.ChildHitArea extends laya.utils.HitArea
var ChildHitArea=(function(_super){
	function ChildHitArea(child,reversed){
		this._child=null;
		this._reversed=false;
		ChildHitArea.__super.call(this);
		this._child=child;
		this._reversed=reversed;
		if(this._reversed)
			this.unHit=child.hitArea.hit;
		else
		this.hit=child.hitArea.hit;
	}

	__class(ChildHitArea,'fairygui.utils.ChildHitArea',_super);
	var __proto=ChildHitArea.prototype;
	__proto.isHit=function(x,y){
		var tPos;
		tPos=Point.TEMP;
		tPos.setTo(0,0);
		tPos=this._child.toParentPoint(tPos);
		if (this._reversed)
			return !HitArea.isHitGraphic(x-tPos.x,y-tPos.y,this.unHit);
		else
		return HitArea.isHitGraphic(x-tPos.x,y-tPos.y,this.hit);
	}

	return ChildHitArea;
})(HitArea)


/**
*@private
*<code>CSSStyle</code> 类是元素CSS样式定义类。
*/
//class laya.display.css.CSSStyle extends laya.display.css.Style
var CSSStyle=(function(_super){
	function CSSStyle(ower){
		this._bgground=null;
		this._border=null;
		//this._ower=null;
		this._rect=null;
		/**@private */
		this.underLine=0;
		/**行高。 */
		this.lineHeight=0;
		CSSStyle.__super.call(this);
		this._padding=CSSStyle._PADDING;
		this._spacing=CSSStyle._SPACING;
		this._aligns=CSSStyle._ALIGNS;
		this._font=Font.EMPTY;
		this._ower=ower;
	}

	__class(CSSStyle,'laya.display.css.CSSStyle',_super);
	var __proto=CSSStyle.prototype;
	/**@inheritDoc */
	__proto.destroy=function(){
		this._ower=null;
		this._font=null;
		this._rect=null;
	}

	/**
	*复制传入的 CSSStyle 属性值。
	*@param src 待复制的 CSSStyle 对象。
	*/
	__proto.inherit=function(src){
		this._font=src._font;
		this._spacing=src._spacing===CSSStyle._SPACING ? CSSStyle._SPACING :src._spacing.slice();
		this.lineHeight=src.lineHeight;
	}

	/**@private */
	__proto._widthAuto=function(){
		return (this._type & 0x40000)!==0;
	}

	/**@inheritDoc */
	__proto.widthed=function(sprite){
		return (this._type & 0x8)!=0;
	}

	/**
	*@private
	*/
	__proto._calculation=function(type,value){
		if (value.indexOf('%')< 0)return false;
		var ower=this._ower;
		var parent=ower.parent;
		var rect=this._rect;
		function getValue (pw,w,nums){
			return (pw *nums[0]+w *nums[1]+nums[2]);
		}
		function onParentResize (type){
			var pw=parent.width,w=ower.width;
			rect.width && (ower.width=getValue(pw,w,rect.width));
			rect.height && (ower.height=getValue(pw,w,rect.height));
			rect.left && (ower.x=getValue(pw,w,rect.left));
			rect.top && (ower.y=getValue(pw,w,rect.top));
		}
		if (rect===null){
			parent._getCSSStyle()._type |=0x80000;
			parent.on("resize",this,onParentResize);
			this._rect=rect={input:{}};
		};
		var nums=value.split(' ');
		nums[0]=parseFloat(nums[0])/ 100;
		if (nums.length==1)
			nums[1]=nums[2]=0;
		else {
			nums[1]=parseFloat(nums[1])/ 100;
			nums[2]=parseFloat(nums[2]);
		}
		rect[type]=nums;
		rect.input[type]=value;
		onParentResize(type);
		return true;
	}

	/**
	*是否已设置高度。
	*@param sprite 显示对象 Sprite。
	*@return 一个Boolean 表示是否已设置高度。
	*/
	__proto.heighted=function(sprite){
		return (this._type & 0x2000)!=0;
	}

	/**
	*设置宽高。
	*@param w 宽度。
	*@param h 高度。
	*/
	__proto.size=function(w,h){
		var ower=this._ower;
		var resize=false;
		if (w!==-1 && w !=this._ower.width){
			this._type |=0x8;
			this._ower.width=w;
			resize=true;
		}
		if (h!==-1 && h !=this._ower.height){
			this._type |=0x2000;
			this._ower.height=h;
			resize=true;
		}
		if (resize){
			ower._layoutLater();
			(this._type & 0x80000)&& ower.event("resize",this);
		}
	}

	/**@private */
	__proto._getAlign=function(){
		return this._aligns[0];
	}

	/**@private */
	__proto._getValign=function(){
		return this._aligns[1];
	}

	/**@private */
	__proto._getCssFloat=function(){
		return (this._type & 0x8000)!=0 ? 0x8000 :0;
	}

	__proto._createFont=function(){
		return (this._type & 0x1000)? this._font :(this._type |=0x1000,this._font=new Font(this._font));
	}

	/**@inheritDoc */
	__proto.render=function(sprite,context,x,y){
		var w=sprite.width;
		var h=sprite.height;
		x-=sprite.pivotX;
		y-=sprite.pivotY;
		this._bgground && this._bgground.color !=null && context.ctx.fillRect(x,y,w,h,this._bgground.color);
		this._border && this._border.color && context.drawRect(x,y,w,h,this._border.color.strColor,this._border.size);
	}

	/**@inheritDoc */
	__proto.getCSSStyle=function(){
		return this;
	}

	/**
	*设置 CSS 样式字符串。
	*@param text CSS样式字符串。
	*/
	__proto.cssText=function(text){
		this.attrs(CSSStyle.parseOneCSS(text,';'));
	}

	/**
	*根据传入的属性名、属性值列表，设置此对象的属性值。
	*@param attrs 属性名与属性值列表。
	*/
	__proto.attrs=function(attrs){
		if (attrs){
			for (var i=0,n=attrs.length;i < n;i++){
				var attr=attrs[i];
				this[attr[0]]=attr[1];
			}
		}
	}

	/**@inheritDoc */
	__proto.setTransform=function(value){
		(value==='none')? (this._tf=Style._TF_EMPTY):this.attrs(CSSStyle.parseOneCSS(value,','));
	}

	/**
	*定义 X 轴、Y 轴移动转换。
	*@param x X 轴平移量。
	*@param y Y 轴平移量。
	*/
	__proto.translate=function(x,y){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.translateX=x;
		this._tf.translateY=y;
	}

	/**
	*定义 缩放转换。
	*@param x X 轴缩放值。
	*@param y Y 轴缩放值。
	*/
	__proto.scale=function(x,y){
		this._tf===Style._TF_EMPTY && (this._tf=new TransformInfo());
		this._tf.scaleX=x;
		this._tf.scaleY=y;
	}

	/**@private */
	__proto._enableLayout=function(){
		return (this._type & 0x2)===0 && (this._type & 0x4)===0;
	}

	__getset(0,__proto,'_rotate',null,function(value){
		this._ower.rotation=value;
	});

	__getset(0,__proto,'_translate',null,function(value){
		this.translate(value[0],value[1]);
	});

	/**
	*规定元素应该生成的框的类型。
	*/
	__getset(0,__proto,'display',null,function(value){
		switch (value){
			case '':
				this._type &=~0x2;
				this.visible=true;
				break ;
			case 'none':
				this._type |=0x2;
				this.visible=false;
				this._ower._layoutLater();
				break ;
			}
	});

	/**@inheritDoc */
	__getset(0,__proto,'paddingLeft',function(){
		return this.padding[3];
	});

	__getset(0,__proto,'background',null,function(value){
		if (!value){
			this._bgground=null;
			return;
		}
		this._bgground || (this._bgground={});
		this._bgground.color=value;
		this._ower.conchModel && this._ower.conchModel.bgColor(value);
		this._type |=0x4000;
		this._ower._renderType |=0x100;
	});

	/**
	*边框属性，比如border="5px solid red"
	*/
	__getset(0,__proto,'border',function(){
		return this._border ? this._border.value :"";
		},function(value){
		if (value=='none'){
			this._border=null;
			return;
		}
		this._border || (this._border={});
		this._border.value=value;
		var values=value.split(' ');
		this._border.color=Color.create(values[values.length-1]);
		if (values.length==1){
			this._border.size=1;
			this._border.type='solid';
			return;
		};
		var i=0;
		if (values[0].indexOf('px')> 0){
			this._border.size=parseInt(values[0]);
			i++;
		}else this._border.size=1;
		this._border.type=values[i];
		this._ower._renderType |=0x100;
	});

	/**@inheritDoc */
	__getset(0,__proto,'absolute',function(){
		return (this._type & 0x4)!==0;
	});

	/**
	*<p>描边颜色，以字符串表示。</p>
	*@default "#000000";
	*/
	__getset(0,__proto,'strokeColor',function(){
		return this._font.stroke[1];
		},function(value){
		if (this._createFont().stroke===Font._STROKE)this._font.stroke=[0,"#000000"];
		this._font.stroke[1]=value;
	});

	/**
	*<p>描边宽度（以像素为单位）。</p>
	*默认值0，表示不描边。
	*@default 0
	*/
	__getset(0,__proto,'stroke',function(){
		return this._font.stroke[0];
		},function(value){
		if (this._createFont().stroke===Font._STROKE)this._font.stroke=[0,"#000000"];
		this._font.stroke[0]=value;
	});

	/**
	*字体颜色。
	*/
	__getset(0,__proto,'color',function(){
		return this._font.color;
		},function(value){
		this._createFont().color=value;
	});

	/**
	*添加到文本的修饰。
	*/
	__getset(0,__proto,'textDecoration',function(){
		return this._font.decoration;
		},function(value){
		this._createFont().decoration=value;
	});

	/**
	*字体粗细。
	*/
	__getset(0,__proto,'fontWeight',function(){
		return this._font.weight;
		},function(value){
		this._createFont().weight=value;
	});

	/**
	*文本的粗细。
	*/
	__getset(0,__proto,'weight',null,function(value){
		this._createFont().weight=value;
	});

	/**
	*字体系列。
	*/
	__getset(0,__proto,'fontFamily',function(){
		return this._font.family;
		},function(value){
		this._createFont().family=value;
	});

	/**
	*边框的颜色。
	*/
	__getset(0,__proto,'borderColor',function(){
		return (this._border && this._border.color)? this._border.color.strColor :null;
		},function(value){
		if (!value){
			this._border=null;
			return;
		}
		this._border || (this._border={size:1,type:'solid'});
		this._border.color=(value==null)? null :Color.create(value);
		this._ower.conchModel && this._ower.conchModel.border(this._border.color.strColor);
		this._ower._renderType |=0x100;
	});

	/**
	*垂直对齐方式。
	*/
	__getset(0,__proto,'valign',function(){
		return CSSStyle._valigndef[this._aligns[1]];
		},function(value){
		this._aligns===CSSStyle._ALIGNS && (this._aligns=[0,0,0]);
		this._aligns[1]=CSSStyle._valigndef[value];
	});

	/**
	*设置如何处理元素内的空白。
	*/
	__getset(0,__proto,'whiteSpace',function(){
		return (this._type & 0x20000)? "nowrap" :"";
		},function(type){
		type==="nowrap" && (this._type |=0x20000);
		type==="none" && (this._type &=~0x20000);
	});

	/**
	*间距。
	*/
	__getset(0,__proto,'letterSpacing',function(){
		return this._spacing[0];
		},function(d){
		((typeof d=='string'))&& (d=parseInt(d+""));
		this._spacing===CSSStyle._SPACING && (this._spacing=[0,0]);
		this._spacing[0]=d;
	});

	/**
	*背景颜色。
	*/
	__getset(0,__proto,'backgroundColor',function(){
		return this._bgground ? this._bgground.color :null;
		},function(value){
		if (value==='none')this._bgground=null;
		else (this._bgground || (this._bgground={}),this._bgground.color=value);
		this._ower.conchModel && this._ower.conchModel.bgColor(value);
		this._ower._renderType |=0x100;
	});

	/**
	*行间距。
	*/
	__getset(0,__proto,'leading',function(){
		return this._spacing[1];
		},function(d){
		((typeof d=='string'))&& (d=parseInt(d+""));
		this._spacing===CSSStyle._SPACING && (this._spacing=[0,0]);
		this._spacing[1]=d;
	});

	/**
	*字体信息。
	*/
	__getset(0,__proto,'font',function(){
		return this._font.toString();
		},function(value){
		this._createFont().set(value);
	});

	/**
	*<p>指定文本字段是否是密码文本字段。</p>
	*如果此属性的值为 true，则文本字段被视为密码文本字段，并使用星号而不是实际字符来隐藏输入的字符。如果为 false，则不会将文本字段视为密码文本字段。
	*/
	__getset(0,__proto,'password',function(){
		return this._font.password;
		},function(value){
		this._createFont().password=value;
	});

	/**
	*边距信息。
	*/
	__getset(0,__proto,'padding',function(){
		return this._padding;
		},function(value){
		this._padding=value;
	});

	/**
	*表示是否加粗。
	*/
	__getset(0,__proto,'bold',function(){
		return this._font.bold;
		},function(value){
		this._createFont().bold=value;
	});

	/**@inheritDoc */
	__getset(0,__proto,'paddingTop',function(){
		return this.padding[0];
	});

	/**
	*高度。
	*/
	__getset(0,__proto,'height',null,function(h){
		this._type |=0x2000;
		if ((typeof h=='string')){
			if (this._calculation("height",h))return;
			h=parseInt(h);
		}
		this.size(-1,h);
	});

	/**
	*表示是否换行。
	*/
	__getset(0,__proto,'wordWrap',function(){
		return (this._type & 0x20000)===0;
		},function(value){
		value ? (this._type &=~0x20000):(this._type |=0x20000);
	});

	/**
	*是否是行元素。
	*/
	__getset(0,__proto,'lineElement',function(){
		return (this._type & 0x10000)!=0;
		},function(value){
		value ? (this._type |=0x10000):(this._type &=(~0x10000));
	});

	/**
	*表示是否为斜体。
	*/
	__getset(0,__proto,'italic',function(){
		return this._font.italic;
		},function(value){
		this._createFont().italic=value;
	});

	__getset(0,__proto,'_scale',null,function(value){
		this._ower.scale(value[0],value[1]);
	});

	/**
	*表示上边距。
	*/
	__getset(0,__proto,'top',null,function(value){
		var ower=this._ower;
		if (((typeof value=='string'))){
			if (value==="middle")
				value="50% -50% 0";
			else if (value==="bottom")
			value="100% -100% 0";
			if (this._calculation("top",value))return;
			value=parseInt(value);
		}
		ower.y=value;
	});

	/**
	*表示左边距。
	*/
	__getset(0,__proto,'left',null,function(value){
		var ower=this._ower;
		if (((typeof value=='string'))){
			if (value==="center")
				value="50% -50% 0";
			else if (value==="right")
			value="100% -100% 0";
			if (this._calculation("left",value))return;
			value=parseInt(value);
		}
		ower.x=value;
	});

	/**
	*是否显示为块级元素。
	*/
	__getset(0,__proto,'block',_super.prototype._$get_block,function(value){
		value ? (this._type |=0x1):(this._type &=(~0x1));
	});

	/**
	*元素的定位类型。
	*/
	__getset(0,__proto,'position',function(){
		return (this._type & 0x4)? "absolute" :"";
		},function(value){
		value=="absolute" ? (this._type |=0x4):(this._type &=~0x4);
	});

	/**
	*浮动方向。
	*/
	__getset(0,__proto,'cssFloat',function(){
		return (this._type & 0x8000)!=0 ? "right" :"left";
		},function(value){
		this.lineElement=false;
		value==="right" ? (this._type |=0x8000):(this._type &=(~0x8000));
	});

	/**
	*字体大小。
	*/
	__getset(0,__proto,'fontSize',function(){
		return this._font.size;
		},function(value){
		this._createFont().size=value;
	});

	/**
	*水平对齐方式。
	*/
	__getset(0,__proto,'align',function(){
		return CSSStyle._aligndef[this._aligns[0]];
		},function(value){
		this._aligns===CSSStyle._ALIGNS && (this._aligns=[0,0,0]);
		this._aligns[0]=CSSStyle._aligndef[value];
	});

	/**
	*宽度。
	*/
	__getset(0,__proto,'width',null,function(w){
		this._type |=0x8;
		if ((typeof w=='string')){
			var offset=w.indexOf('auto');
			if (offset >=0){
				this._type |=0x40000;
				w=w.substr(0,offset);
			}
			if (this._calculation("width",w))return;
			w=parseInt(w);
		}
		this.size(w,-1);
	});

	CSSStyle.parseOneCSS=function(text,clipWord){
		var out=[];
		var attrs=text.split(clipWord);
		var valueArray;
		for (var i=0,n=attrs.length;i < n;i++){
			var attr=attrs[i];
			var ofs=attr.indexOf(':');
			var name=attr.substr(0,ofs).replace(/^\s+|\s+$/g,'');
			if (name.length==0)
				continue ;
			var value=attr.substr(ofs+1).replace(/^\s+|\s+$/g,'');
			var one=[name,value];
			switch (name){
				case 'italic':
				case 'bold':
					one[1]=value=="true";
					break ;
				case 'line-height':
					one[0]='lineHeight';
					one[1]=parseInt(value);
					break ;
				case 'font-size':
					one[0]='fontSize';
					one[1]=parseInt(value);
					break ;
				case 'padding':
					valueArray=value.split(' ');
					valueArray.length > 1 || (valueArray[1]=valueArray[2]=valueArray[3]=valueArray[0]);
					one[1]=[parseInt(valueArray[0]),parseInt(valueArray[1]),parseInt(valueArray[2]),parseInt(valueArray[3])];
					break ;
				case 'rotate':
					one[0]="_rotate";
					one[1]=parseFloat(value);
					break ;
				case 'scale':
					valueArray=value.split(' ');
					one[0]="_scale";
					one[1]=[parseFloat(valueArray[0]),parseFloat(valueArray[1])];
					break ;
				case 'translate':
					valueArray=value.split(' ');
					one[0]="_translate";
					one[1]=[parseInt(valueArray[0]),parseInt(valueArray[1])];
					break ;
				default :
					(one[0]=CSSStyle._CSSTOVALUE[name])|| (one[0]=name);
				}
			out.push(one);
		}
		return out;
	}

	CSSStyle.parseCSS=function(text,uri){
		var one;
		while ((one=CSSStyle._parseCSSRegExp.exec(text))!=null){
			CSSStyle.styleSheets[one[1]]=CSSStyle.parseOneCSS(one[2],';');
		}
	}

	CSSStyle.EMPTY=new CSSStyle(null);
	CSSStyle._CSSTOVALUE={'letter-spacing':'letterSpacing','line-spacing':'lineSpacing','white-space':'whiteSpace','line-height':'lineHeight','scale-x':'scaleX','scale-y':'scaleY','translate-x':'translateX','translate-y':'translateY','font-family':'fontFamily','font-weight':'fontWeight','vertical-align':'valign','text-decoration':'textDecoration','background-color':'backgroundColor','border-color':'borderColor','float':'cssFloat'};
	CSSStyle._parseCSSRegExp=new RegExp("([\.\#]\\w+)\\s*{([\\s\\S]*?)}","g");
	CSSStyle._aligndef={'left':0,'center':1,'right':2,0:'left',1:'center',2:'right'};
	CSSStyle._valigndef={'top':0,'middle':1,'bottom':2,0:'top',1:'middle',2:'bottom'};
	CSSStyle.styleSheets={};
	CSSStyle.ALIGN_CENTER=1;
	CSSStyle.ALIGN_RIGHT=2;
	CSSStyle.VALIGN_MIDDLE=1;
	CSSStyle.VALIGN_BOTTOM=2;
	CSSStyle._CSS_BLOCK=0x1;
	CSSStyle._DISPLAY_NONE=0x2;
	CSSStyle._ABSOLUTE=0x4;
	CSSStyle._WIDTH_SET=0x8;
	CSSStyle._PADDING=[0,0,0,0];
	CSSStyle._RECT=[-1,-1,-1,-1];
	CSSStyle._SPACING=[0,0];
	CSSStyle._ALIGNS=[0,0,0];
	CSSStyle.ADDLAYOUTED=0x200;
	CSSStyle._NEWFONT=0x1000;
	CSSStyle._HEIGHT_SET=0x2000;
	CSSStyle._BACKGROUND_SET=0x4000;
	CSSStyle._FLOAT_RIGHT=0x8000;
	CSSStyle._LINE_ELEMENT=0x10000;
	CSSStyle._NOWARP=0x20000;
	CSSStyle._WIDTHAUTO=0x40000;
	CSSStyle._LISTERRESZIE=0x80000;
	return CSSStyle;
})(Style)


//class fairygui.GTextField extends fairygui.GObject
var GTextField=(function(_super){
	function GTextField(){
		this._gearColor=null;
		this._templateVars=null;
		this._text=null;
		GTextField.__super.call(this);
		this._gearColor=new GearColor(this);
	}

	__class(GTextField,'fairygui.GTextField',_super);
	var __proto=GTextField.prototype;
	Laya.imps(__proto,{"fairygui.gears.IColorGear":true})
	__proto.parseTemplate=function(template){
		var pos1=0,pos2=0,pos3=0;
		var tag;
		var value;
		var result="";
		while((pos2=template.indexOf("{",pos1))!=-1){
			if (pos2 > 0 && template.charCodeAt(pos2-1)==92){
				result+=template.substring(pos1,pos2-1);
				result+="{";
				pos1=pos2+1;
				continue ;
			}
			result+=template.substring(pos1,pos2);
			pos1=pos2;
			pos2=template.indexOf("}",pos1);
			if(pos2==-1)
				break ;
			if(pos2==pos1+1){
				result+=template.substr(pos1,2);
				pos1=pos2+1;
				continue ;
			}
			tag=template.substring(pos1+1,pos2);
			pos3=tag.indexOf("=");
			if(pos3!=-1){
				value=this._templateVars[tag.substring(0,pos3)];
				if(value==null)
					result+=tag.substring(pos3+1);
				else
				result+=value;
			}
			else{
				value=this._templateVars[tag];
				if(value!=null)
					result+=value;
			}
			pos1=pos2+1;
		}
		if (pos1 < template.length)
			result+=template.substr(pos1);
		return result;
	}

	__proto.setVar=function(name,value){
		if(!this._templateVars)
			this._templateVars={};
		this._templateVars[name]=value;
		return this;
	}

	__proto.flushVars=function(){
		this.text=this._text;
	}

	__proto.handleControllerChanged=function(c){
		_super.prototype.handleControllerChanged.call(this,c);
		if(this._gearColor.controller==c)
			this._gearColor.apply();
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		var iv=0;
		this.font=buffer.readS();
		this.fontSize=buffer.getInt16();
		this.color=buffer.readColorS();
		iv=buffer.readByte();
		this.align=iv==0?"left":(iv==1?"center":"right");
		iv=buffer.readByte();
		this.valign=iv==0?"top":(iv==1?"middle":"bottom");
		this.leading=buffer.getInt16();
		this.letterSpacing=buffer.getInt16();
		this.ubbEnabled=buffer.readBool();
		this.autoSize=buffer.readByte();
		this.underline=buffer.readBool();
		this.italic=buffer.readBool();
		this.bold=buffer.readBool();
		this.singleLine=buffer.readBool();
		if (buffer.readBool()){
			this.strokeColor=buffer.readColorS();
			this.stroke=buffer.getFloat32()+1;
		}
		if (buffer.readBool())
			buffer.skip(12);
		if (buffer.readBool())
			this._templateVars={};
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,6);
		var str=buffer.readS();
		if (str !=null)
			this.text=str;
	}

	/**
	*@see AutoSizeType
	*/
	/**
	*@see AutoSizeType
	*/
	__getset(0,__proto,'autoSize',function(){
		return 0;
		},function(value){
	});

	__getset(0,__proto,'ubbEnabled',function(){
		return false;
		},function(value){
	});

	__getset(0,__proto,'templateVars',function(){
		return this._templateVars;
		},function(value){
		if(this._templateVars==null && value==null)
			return;
		this._templateVars=value;
		this.flushVars();
	});

	__getset(0,__proto,'strokeColor',function(){
		return null;
		},function(value){
	});

	__getset(0,__proto,'stroke',function(){
		return 0;
		},function(value){
	});

	__getset(0,__proto,'fontSize',function(){
		return 0;
		},function(value){
	});

	__getset(0,__proto,'align',function(){
		return null;
		},function(value){
	});

	__getset(0,__proto,'color',function(){
		return null;
		},function(value){
	});

	__getset(0,__proto,'singleLine',function(){
		return false;
		},function(value){
	});

	__getset(0,__proto,'underline',function(){
		return false;
		},function(value){
	});

	__getset(0,__proto,'italic',function(){
		return false;
		},function(value){
	});

	__getset(0,__proto,'letterSpacing',function(){
		return 0;
		},function(value){
	});

	__getset(0,__proto,'valign',function(){
		return null;
		},function(value){
	});

	__getset(0,__proto,'bold',function(){
		return false;
		},function(value){
	});

	__getset(0,__proto,'textWidth',function(){
		return 0;
	});

	__getset(0,__proto,'leading',function(){
		return 0;
		},function(value){
	});

	__getset(0,__proto,'font',function(){
		return null;
		},function(value){
	});

	return GTextField;
})(GObject)


//class fairygui.GComponent extends fairygui.GObject
var GComponent=(function(_super){
	function GComponent(){
		this._sortingChildCount=0;
		this._opaque=false;
		this._applyingController=null;
		this._mask=null;
		this._margin=null;
		this._trackBounds=false;
		this._boundsChanged=false;
		this._childrenRenderOrder=0;
		this._apexIndex=0;
		this._buildingDisplayList=false;
		this._children=null;
		this._controllers=null;
		this._transitions=null;
		this._container=null;
		this._scrollPane=null;
		this._alignOffset=null;
		GComponent.__super.call(this);
		this._children=[];
		this._controllers=[];
		this._transitions=[];
		this._margin=new Margin();
		this._alignOffset=new Point();
		this._opaque=false;
	}

	__class(GComponent,'fairygui.GComponent',_super);
	var __proto=GComponent.prototype;
	__proto.createDisplayObject=function(){
		_super.prototype.createDisplayObject.call(this);
		this._displayObject.mouseEnabled=true;
		this._displayObject.mouseThrough=true;
		this._container=this._displayObject;
	}

	__proto.dispose=function(){
		var i=0;
		var cnt=0;
		cnt=this._transitions.length;
		for (i=0;i < cnt;++i){
			var trans=this._transitions[i];
			trans.dispose();
		}
		cnt=this._controllers.length;
		for (i=0;i < cnt;++i){
			var cc=this._controllers[i];
			cc.dispose();
		}
		if (this.scrollPane !=null)
			this.scrollPane.dispose();
		cnt=this._children.length;
		for(i=cnt-1;i >=0;--i){
			var obj=this._children[i];
			obj.parent=null;
			obj.dispose();
		}
		this._boundsChanged=false;
		this._mask=null;
		_super.prototype.dispose.call(this);
	}

	__proto.addChild=function(child){
		this.addChildAt(child,this._children.length);
		return child;
	}

	__proto.addChildAt=function(child,index){
		(index===void 0)&& (index=0);
		if(!child)
			throw "child is null";
		var numChildren=this._children.length;
		if(index >=0 && index <=numChildren){
			if(child.parent==this){
				this.setChildIndex(child,index);
			}
			else {
				child.removeFromParent();
				child.parent=this;
				var cnt=this._children.length;
				if(child.sortingOrder !=0){
					this._sortingChildCount++;
					index=this.getInsertPosForSortingChild(child);
				}
				else if(this._sortingChildCount > 0){
					if(index > (cnt-this._sortingChildCount))
						index=cnt-this._sortingChildCount;
				}
				if(index==cnt)
					this._children.push(child);
				else
				this._children.splice(index,0,child);
				this.childStateChanged(child);
				this.setBoundsChangedFlag();
			}
			return child;
		}
		else {
			throw "Invalid child index";
		}
	}

	__proto.getInsertPosForSortingChild=function(target){
		var cnt=this._children.length;
		var i=0;
		for(i=0;i < cnt;i++){
			var child=this._children[i];
			if(child==target)
				continue ;
			if(target.sortingOrder < child.sortingOrder)
				break ;
		}
		return i;
	}

	__proto.removeChild=function(child,dispose){
		(dispose===void 0)&& (dispose=false);
		var childIndex=this._children.indexOf(child);
		if(childIndex !=-1){
			this.removeChildAt(childIndex,dispose);
		}
		return child;
	}

	__proto.removeChildAt=function(index,dispose){
		(dispose===void 0)&& (dispose=false);
		if(index >=0 && index < this.numChildren){
			var child=this._children[index];
			child.parent=null;
			if(child.sortingOrder !=0)
				this._sortingChildCount--;
			this._children.splice(index,1);
			child.group=null;
			if(child.inContainer){
				this._container.removeChild(child.displayObject);
				if (this._childrenRenderOrder==2)
					Laya.timer.callLater(this,this.buildNativeDisplayList);
			}
			if(dispose)
				child.dispose();
			this.setBoundsChangedFlag();
			return child;
		}
		else {
			throw "Invalid child index";
		}
	}

	__proto.removeChildren=function(beginIndex,endIndex,dispose){
		(beginIndex===void 0)&& (beginIndex=0);
		(endIndex===void 0)&& (endIndex=-1);
		(dispose===void 0)&& (dispose=false);
		if(endIndex < 0 || endIndex >=this.numChildren)
			endIndex=this.numChildren-1;
		for(var i=beginIndex;i <=endIndex;++i)
		this.removeChildAt(beginIndex,dispose);
	}

	__proto.getChildAt=function(index){
		(index===void 0)&& (index=0);
		if(index >=0 && index < this.numChildren)
			return this._children[index];
		else
		throw "Invalid child index";
	}

	__proto.getChild=function(name){
		var cnt=this._children.length;
		for(var i=0;i < cnt;++i){
			if(this._children[i].name==name)
				return this._children[i];
		}
		return null;
	}

	__proto.getVisibleChild=function(name){
		var cnt=this._children.length;
		for(var i=0;i < cnt;++i){
			var child=this._children[i];
			if(child.internalVisible && child.internalVisible2 && child.name==name)
				return child;
		}
		return null;
	}

	__proto.getChildInGroup=function(name,group){
		var cnt=this._children.length;
		for(var i=0;i < cnt;++i){
			var child=this._children[i];
			if(child.group==group && child.name==name)
				return child;
		}
		return null;
	}

	__proto.getChildById=function(id){
		var cnt=this._children.length;
		for(var i=0;i < cnt;++i){
			if(this._children[i]._id==id)
				return this._children[i];
		}
		return null;
	}

	__proto.getChildIndex=function(child){
		return this._children.indexOf(child);
	}

	__proto.setChildIndex=function(child,index){
		(index===void 0)&& (index=0);
		var oldIndex=this._children.indexOf(child);
		if(oldIndex==-1)
			throw "Not a child of this container";
		if(child.sortingOrder !=0)
			return;
		var cnt=this._children.length;
		if(this._sortingChildCount > 0){
			if(index > (cnt-this._sortingChildCount-1))
				index=cnt-this._sortingChildCount-1;
		}
		this._setChildIndex(child,oldIndex,index);
	}

	__proto.setChildIndexBefore=function(child,index){
		var oldIndex=this._children.indexOf(child);
		if (oldIndex==-1)
			throw "Not a child of this container";
		if(child.sortingOrder!=0)
			return oldIndex;
		var cnt=this._children.length;
		if(this._sortingChildCount>0){
			if (index > (cnt-this._sortingChildCount-1))
				index=cnt-this._sortingChildCount-1;
		}
		if (oldIndex < index)
			return this._setChildIndex(child,oldIndex,index-1);
		else
		return this._setChildIndex(child,oldIndex,index);
	}

	__proto._setChildIndex=function(child,oldIndex,index){
		var cnt=this._children.length;
		if(index > cnt)
			index=cnt;
		if(oldIndex==index)
			return oldIndex;
		this._children.splice(oldIndex,1);
		this._children.splice(index,0,child);
		if(child.inContainer){
			var displayIndex=0;
			var g;
			var i=0;
			if (this._childrenRenderOrder==0){
				for(i=0;i<index;i++){
					g=this._children[i];
					if(g.inContainer)
						displayIndex++;
				}
				if(displayIndex==this._container.numChildren)
					displayIndex--;
				this._container.setChildIndex(child.displayObject,displayIndex);
			}
			else if (this._childrenRenderOrder==1){
				for (i=cnt-1;i > index;i--){
					g=this._children[i];
					if (g.inContainer)
						displayIndex++;
				}
				if(displayIndex==this._container.numChildren)
					displayIndex--;
				this._container.setChildIndex(child.displayObject,displayIndex);
			}
			else{
				Laya.timer.callLater(this,this.buildNativeDisplayList);
			}
			this.setBoundsChangedFlag();
		}
		return index;
	}

	__proto.swapChildren=function(child1,child2){
		var index1=this._children.indexOf(child1);
		var index2=this._children.indexOf(child2);
		if(index1==-1 || index2==-1)
			throw "Not a child of this container";
		this.swapChildrenAt(index1,index2);
	}

	__proto.swapChildrenAt=function(index1,index2){
		(index2===void 0)&& (index2=0);
		var child1=this._children[index1];
		var child2=this._children[index2];
		this.setChildIndex(child1,index2);
		this.setChildIndex(child2,index1);
	}

	__proto.isAncestorOf=function(child){
		if (child==null)
			return false;
		var p=child.parent;
		while(p){
			if(p==this)
				return true;
			p=p.parent;
		}
		return false;
	}

	__proto.addController=function(controller){
		this._controllers.push(controller);
		controller.parent=this;
		this.applyController(controller);
	}

	__proto.getControllerAt=function(index){
		return this._controllers[index];
	}

	__proto.getController=function(name){
		var cnt=this._controllers.length;
		for(var i=0;i < cnt;++i){
			var c=this._controllers[i];
			if(c.name==name)
				return c;
		}
		return null;
	}

	__proto.removeController=function(c){
		var index=this._controllers.indexOf(c);
		if(index==-1)
			throw new Error("controller not exists");
		c.parent=null;
		this._controllers.splice(index,1);
		var length=this._children.length;
		for(var i=0;i < length;i++){
			var child=this._children[i];
			child.handleControllerChanged(c);
		}
	}

	__proto.childStateChanged=function(child){
		if(this._buildingDisplayList)
			return;
		var cnt=this._children.length;
		if((child instanceof fairygui.GGroup )){
			for(var i=0;i < cnt;i++){
				var g=this._children[i];
				if(g.group==child)
					this.childStateChanged(g);
			}
			return;
		}
		if(!child.displayObject)
			return;
		if(child.internalVisible && child.displayObject!=this._displayObject.mask){
			if(!child.displayObject.parent){
				var index=0
				if (this._childrenRenderOrder==0){
					for (i=0;i < cnt;i++){
						g=this._children[i];
						if (g==child)
							break ;
						if (g.displayObject !=null && g.displayObject.parent !=null)
							index++;
					}
					this._container.addChildAt(child.displayObject,index);
				}
				else if (this._childrenRenderOrder==1){
					for (i=cnt-1;i >=0;i--){
						g=this._children[i];
						if (g==child)
							break ;
						if (g.displayObject !=null && g.displayObject.parent !=null)
							index++;
					}
					this._container.addChildAt(child.displayObject,index);
				}
				else{
					this._container.addChild(child.displayObject);
					Laya.timer.callLater(this,this.buildNativeDisplayList);
				}
			}
		}
		else {
			if(child.displayObject.parent){
				this._container.removeChild(child.displayObject);
				if (this._childrenRenderOrder==2)
					Laya.timer.callLater(this,this.buildNativeDisplayList);
			}
		}
	}

	__proto.buildNativeDisplayList=function(){
		var cnt=this._children.length;
		if (cnt==0)
			return;
		var i=0;
		var child;
		switch (this._childrenRenderOrder){
			case 0:{
					for (i=0;i < cnt;i++){
						child=this._children[i];
						if (child.displayObject !=null && child.internalVisible)
							this._container.addChild(child.displayObject);
					}
				}
				break ;
			case 1:{
					for (i=cnt-1;i >=0;i--){
						child=this._children[i];
						if (child.displayObject !=null && child.internalVisible)
							this._container.addChild(child.displayObject);
					}
				}
				break ;
			case 2:{
					for (i=0;i < this._apexIndex;i++){
						child=this._children[i];
						if (child.displayObject !=null && child.internalVisible)
							this._container.addChild(child.displayObject);
					}
					for (i=cnt-1;i >=this._apexIndex;i--){
						child=this._children[i];
						if (child.displayObject !=null && child.internalVisible)
							this._container.addChild(child.displayObject);
					}
				}
				break ;
			}
	}

	__proto.applyController=function(c){
		this._applyingController=c;
		var child;
		var length=this._children.length;
		for(var i=0;i < length;i++){
			child=this._children[i];
			child.handleControllerChanged(c);
		}
		this._applyingController=null;
		c.runActions();
	}

	__proto.applyAllControllers=function(){
		var cnt=this._controllers.length;
		for(var i=0;i < cnt;++i){
			this.applyController(this._controllers[i]);
		}
	}

	__proto.adjustRadioGroupDepth=function(obj,c){
		var cnt=this._children.length;
		var i=NaN;
		var child;
		var myIndex=-1,maxIndex=-1;
		for(i=0;i < cnt;i++){
			child=this._children[i];
			if(child==obj){
				myIndex=i;
			}
			else if(((child instanceof fairygui.GButton ))
			&& (child).relatedController==c){
				if(i > maxIndex)
					maxIndex=i;
			}
		}
		if(myIndex < maxIndex){
			if(this._applyingController!=null)
				this._children[maxIndex].handleControllerChanged(this._applyingController);
			this.swapChildrenAt(myIndex,maxIndex);
		}
	}

	__proto.getTransitionAt=function(index){
		return this._transitions[index];
	}

	__proto.getTransition=function(transName){
		var cnt=this._transitions.length;
		for(var i=0;i < cnt;++i){
			var trans=this._transitions[i];
			if(trans.name==transName)
				return trans;
		}
		return null;
	}

	__proto.isChildInView=function(child){
		if(this._displayObject.scrollRect !=null){
			return child.x+child.width >=0 && child.x <=this.width
			&& child.y+child.height >=0 && child.y <=this.height;
		}
		else if(this._scrollPane !=null){
			return this._scrollPane.isChildInView(child);
		}
		else
		return true;
	}

	__proto.getFirstChildInView=function(){
		var cnt=this._children.length;
		for(var i=0;i < cnt;++i){
			var child=this._children[i];
			if(this.isChildInView(child))
				return i;
		}
		return-1;
	}

	__proto.setMask=function(value,reversed){
		if(this._mask && this._mask!=value){
			if(this._mask.blendMode=="destination-out")
				this._mask.blendMode=null;
		}
		this._mask=value;
		if(!this._mask){
			this._displayObject.mask=null;
			if((this._displayObject.hitArea instanceof fairygui.utils.ChildHitArea ))
				this._displayObject.hitArea=null;
			return;
		}
		if(this._mask.hitArea){
			this._displayObject.hitArea=new ChildHitArea(this._mask,reversed);
			this._displayObject.mouseThrough=false;
			this._displayObject.hitTestPrior=true;
		}
		if(reversed){
			this._displayObject.mask=null;
			this._displayObject.cacheAs="bitmap";
			this._mask.blendMode="destination-out";
		}
		else
		this._displayObject.mask=this._mask;
	}

	__proto.updateHitArea=function(){
		if((this._displayObject.hitArea instanceof fairygui.utils.PixelHitTest )){
			var hitTest=(this._displayObject.hitArea);
			if(this.sourceWidth!=0)
				hitTest.scaleX=this.width/this.sourceWidth;
			if(this.sourceHeight!=0)
				hitTest.scaleY=this.height/this.sourceHeight;
		}
		else if((this._displayObject.hitArea instanceof laya.maths.Rectangle )){
			this._displayObject.hitArea.setTo(0,0,this.width,this.height);
		}
	}

	__proto.updateMask=function(){
		var rect=this._displayObject.scrollRect;
		if(rect==null)
			rect=new Rectangle();
		rect.x=this._margin.left;
		rect.y=this._margin.top;
		rect.width=this.width-this._margin.right;
		rect.height=this.height-this._margin.bottom;
		this._displayObject.scrollRect=rect;
	}

	__proto.setupScroll=function(buffer){
		if (this._displayObject==this._container){
			this._container=new Sprite();
			this._displayObject.addChild(this._container);
		}
		this._scrollPane=new ScrollPane(this);
		this._scrollPane.setup(buffer);
	}

	__proto.setupOverflow=function(overflow){
		if(overflow==1){
			if (this._displayObject==this._container){
				this._container=new Sprite();
				this._displayObject.addChild(this._container);
			}
			this.updateMask();
			this._container.pos(this._margin.left,this._margin.top);
		}
		else if(this._margin.left !=0 || this._margin.top !=0){
			if (this._displayObject==this._container){
				this._container=new Sprite();
				this._displayObject.addChild(this._container);
			}
			this._container.pos(this._margin.left,this._margin.top);
		}
	}

	__proto.handleSizeChanged=function(){
		_super.prototype.handleSizeChanged.call(this);
		if(this._scrollPane)
			this._scrollPane.onOwnerSizeChanged();
		else if(this._displayObject.scrollRect !=null)
		this.updateMask();
		if(this._displayObject.hitArea!=null)
			this.updateHitArea();
	}

	__proto.handleGrayedChanged=function(){
		var c=this.getController("grayed");
		if(c !=null){
			c.selectedIndex=this.grayed ? 1 :0;
			return;
		};
		var v=this.grayed;
		var cnt=this._children.length;
		for(var i=0;i < cnt;++i){
			this._children[i].grayed=v;
		}
	}

	__proto.handleControllerChanged=function(c){
		_super.prototype.handleControllerChanged.call(this,c);
		if (this._scrollPane !=null)
			this._scrollPane.handleControllerChanged(c);
	}

	__proto.setBoundsChangedFlag=function(){
		if (!this._scrollPane && !this._trackBounds)
			return;
		if (!this._boundsChanged){
			this._boundsChanged=true;
			Laya.timer.callLater(this,this.__render);
		}
	}

	__proto.__render=function(){
		if (this._boundsChanged){
			var i1=0;
			var len=this._children.length;
			var child
			for(i1=0;i1 < len;i1++){
				child=this._children[i1];
				child.ensureSizeCorrect();
			}
			this.updateBounds();
		}
	}

	__proto.ensureBoundsCorrect=function(){
		var i1=0;
		var len=this._children.length;
		var child
		for(i1=0;i1 < len;i1++){
			child=this._children[i1];
			child.ensureSizeCorrect();
		}
		if (this._boundsChanged)
			this.updateBounds();
	}

	__proto.updateBounds=function(){
		var ax=0,ay=0,aw=0,ah=0;
		var len=this._children.length;
		if(len > 0){
			ax=Number.POSITIVE_INFINITY,ay=Number.POSITIVE_INFINITY;
			var ar=Number.NEGATIVE_INFINITY,ab=Number.NEGATIVE_INFINITY;
			var tmp=0;
			var i1=0;
			for(i1=0;i1 < len;i1++){
				var child=this._children[i1];
				tmp=child.x;
				if(tmp < ax)
					ax=tmp;
				tmp=child.y;
				if(tmp < ay)
					ay=tmp;
				tmp=child.x+child.actualWidth;
				if(tmp > ar)
					ar=tmp;
				tmp=child.y+child.actualHeight;
				if(tmp > ab)
					ab=tmp;
			}
			aw=ar-ax;
			ah=ab-ay;
		}
		this.setBounds(ax,ay,aw,ah);
	}

	__proto.setBounds=function(ax,ay,aw,ah){
		this._boundsChanged=false;
		if (this._scrollPane)
			this._scrollPane.setContentSize(Math.round(ax+aw),Math.round(ay+ah));
	}

	__proto.getSnappingPosition=function(xValue,yValue,resultPoint){
		if(!resultPoint)
			resultPoint=new Point();
		var cnt=this._children.length;
		if(cnt==0){
			resultPoint.x=0;
			resultPoint.y=0;
			return resultPoint;
		}
		this.ensureBoundsCorrect();
		var obj=null;
		var prev=null;
		var i=0;
		if(yValue !=0){
			for(;i < cnt;i++){
				obj=this._children[i];
				if(yValue < obj.y){
					if(i==0){
						yValue=0;
						break ;
					}
					else {
						prev=this._children[i-1];
						if(yValue < prev.y+prev.actualHeight / 2)
							yValue=prev.y;
						else
						yValue=obj.y;
						break ;
					}
				}
			}
			if(i==cnt)
				yValue=obj.y;
		}
		if(xValue !=0){
			if(i > 0)
				i--;
			for(;i < cnt;i++){
				obj=this._children[i];
				if(xValue < obj.x){
					if(i==0){
						xValue=0;
						break ;
					}
					else {
						prev=this._children[i-1];
						if(xValue < prev.x+prev.actualWidth / 2)
							xValue=prev.x;
						else
						xValue=obj.x;
						break ;
					}
				}
			}
			if(i==cnt)
				xValue=obj.x;
		}
		resultPoint.x=xValue;
		resultPoint.y=yValue;
		return resultPoint;
	}

	__proto.childSortingOrderChanged=function(child,oldValue,newValue){
		(newValue===void 0)&& (newValue=0);
		if (newValue==0){
			this._sortingChildCount--;
			this.setChildIndex(child,this._children.length);
		}
		else {
			if (oldValue==0)
				this._sortingChildCount++;
			var oldIndex=this._children.indexOf(child);
			var index=this.getInsertPosForSortingChild(child);
			if (oldIndex < index)
				this._setChildIndex(child,oldIndex,index-1);
			else
			this._setChildIndex(child,oldIndex,index);
		}
	}

	__proto.constructFromResource=function(){
		this.constructFromResource2(null,0);
	}

	__proto.constructFromResource2=function(objectPool,poolIndex){
		if (!this.packageItem.decoded){
			this.packageItem.decoded=true;
			TranslationHelper.translateComponent(this.packageItem);
		};
		var i=0;
		var dataLen=0;
		var curPos=0;
		var nextPos=0;
		var f1=NaN;
		var f2=NaN;
		var i1=0;
		var i2=0;
		var buffer=this.packageItem.rawData;
		buffer.seek(0,0);
		this._underConstruct=true;
		this.sourceWidth=buffer.getInt32();
		this.sourceHeight=buffer.getInt32();
		this.initWidth=this.sourceWidth;
		this.initHeight=this.sourceHeight;
		this.setSize(this.sourceWidth,this.sourceHeight);
		if (buffer.readBool()){
			this.minWidth=buffer.getInt32();
			this.maxWidth=buffer.getInt32();
			this.minHeight=buffer.getInt32();
			this.maxHeight=buffer.getInt32();
		}
		if (buffer.readBool()){
			f1=buffer.getFloat32();
			f2=buffer.getFloat32();
			this.internalSetPivot(f1,f2,buffer.readBool());
		}
		if (buffer.readBool()){
			this._margin.top=buffer.getInt32();
			this._margin.bottom=buffer.getInt32();
			this._margin.left=buffer.getInt32();
			this._margin.right=buffer.getInt32();
		};
		var overflow=buffer.readByte();
		if (overflow==2){
			var savedPos=buffer.pos;
			buffer.seek(0,7);
			this.setupScroll(buffer);
			buffer.pos=savedPos;
		}
		else
		this.setupOverflow(overflow);
		if (buffer.readBool())
			buffer.skip(8);
		this._buildingDisplayList=true;
		buffer.seek(0,1);
		var controllerCount=buffer.getInt16();
		for (i=0;i < controllerCount;i++){
			nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			var controller=new Controller();
			this._controllers.push(controller);
			controller.parent=this;
			controller.setup(buffer);
			buffer.pos=nextPos;
		}
		buffer.seek(0,2);
		var child;
		var childCount=buffer.getInt16();
		for (i=0;i < childCount;i++){
			dataLen=buffer.getInt16();
			curPos=buffer.pos;
			if (objectPool !=null)
				child=objectPool[poolIndex+i];
			else{
				buffer.seek(curPos,0);
				var type=buffer.readByte();
				var src=buffer.readS();
				var pkgId=buffer.readS();
				var pi=null;
				if (src !=null){
					var pkg;
					if (pkgId !=null)
						pkg=UIPackage.getById(pkgId);
					else
					pkg=this.packageItem.owner;
					pi=pkg !=null ? pkg.getItemById(src):null;
				}
				if (pi !=null){
					child=UIObjectFactory.newObject(pi);
					child.packageItem=pi;
					child.constructFromResource();
				}
				else
				child=UIObjectFactory.newObject2(type);
			}
			child._underConstruct=true;
			child.setup_beforeAdd(buffer,curPos);
			child.parent=this;
			this._children.push(child);
			buffer.pos=curPos+dataLen;
		}
		buffer.seek(0,3);
		this.relations.setup(buffer,true);
		buffer.seek(0,2);
		buffer.skip(2);
		for (i=0;i < childCount;i++){
			nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			buffer.seek(buffer.pos,3);
			this._children[i].relations.setup(buffer,false);
			buffer.pos=nextPos;
		}
		buffer.seek(0,2);
		buffer.skip(2);
		for (i=0;i < childCount;i++){
			nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			child=this._children[i];
			child.setup_afterAdd(buffer,buffer.pos);
			child._underConstruct=false;
			buffer.pos=nextPos;
		}
		buffer.seek(0,4);
		buffer.skip(2);
		this.opaque=buffer.readBool();
		var maskId=buffer.getInt16();
		if (maskId !=-1){
			this.setMask(this.getChildAt(maskId).displayObject,buffer.readBool());
		};
		var hitTestId=buffer.readS();
		if (hitTestId !=null){
			pi=this.packageItem.owner.getItemById(hitTestId);
			if (pi !=null && pi.pixelHitTestData !=null){
				i1=buffer.getInt32();
				i2=buffer.getInt32();
				this._displayObject.hitArea=new PixelHitTest(pi.pixelHitTestData,i1,i2);
				this._displayObject.mouseThrough=false;
				this._displayObject.hitTestPrior=true;
			}
		}
		buffer.seek(0,5);
		var transitionCount=buffer.getInt16();
		for (i=0;i < transitionCount;i++){
			nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			var trans=new Transition(this);
			trans.setup(buffer);
			this._transitions.push(trans);
			buffer.pos=nextPos;
		}
		if (this._transitions.length > 0){
			this.displayObject.on("display",this,this.___added);
			this.displayObject.on("undisplay",this,this.___removed);
		}
		this.applyAllControllers();
		this._buildingDisplayList=false;
		this._underConstruct=false;
		this.buildNativeDisplayList();
		this.setBoundsChangedFlag();
		if (this.packageItem.objectType !=9)
			this.constructExtension(buffer);
		this.constructFromXML(null);
	}

	__proto.constructExtension=function(buffer){}
	__proto.constructFromXML=function(xml){}
	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,4);
		var pageController=buffer.getInt16();
		if (pageController !=-1 && this._scrollPane !=null)
			this._scrollPane.pageController=this._parent.getControllerAt(pageController);
		var cnt=buffer.getInt16();
		for (var i=0;i < cnt;i++){
			var cc=this.getController(buffer.readS());
			var pageId=buffer.readS();
			if(cc)
				cc.selectedPageId=pageId;
		}
	}

	__proto.___added=function(){
		var cnt=this._transitions.length;
		for(var i=0;i < cnt;++i){
			this._transitions[i].onOwnerAddedToStage();
		}
	}

	__proto.___removed=function(){
		var cnt=this._transitions.length;
		for(var i=0;i < cnt;++i){
			this._transitions[i].onOwnerRemovedFromStage();
		}
	}

	__getset(0,__proto,'viewHeight',function(){
		if (this._scrollPane !=null)
			return this._scrollPane.viewHeight;
		else
		return this.height-this._margin.top-this._margin.bottom;
		},function(value){
		if (this._scrollPane !=null)
			this._scrollPane.viewHeight=value;
		else
		this.height=value+this._margin.top+this._margin.bottom;
	});

	__getset(0,__proto,'baseUserData',function(){
		var buffer=this.packageItem.rawData;
		buffer.seek(0,4);
		return buffer.readS();
	});

	__getset(0,__proto,'mask',function(){
		return this._mask;
		},function(value){
		this.setMask(value,false);
	});

	/**
	*@see ChildrenRenderOrder
	*/
	/**
	*@see ChildrenRenderOrder
	*/
	__getset(0,__proto,'childrenRenderOrder',function(){
		return this._childrenRenderOrder;
		},function(value){
		if (this._childrenRenderOrder !=value){
			this._childrenRenderOrder=value;
			this.buildNativeDisplayList();
		}
	});

	__getset(0,__proto,'margin',function(){
		return this._margin;
		},function(value){
		this._margin.copy(value);
		if(this._displayObject.scrollRect!=null){
			this._container.pos(this._margin.left+this._alignOffset.x,this._margin.top+this._alignOffset.y);
		}
		this.handleSizeChanged();
	});

	__getset(0,__proto,'scrollPane',function(){
		return this._scrollPane;
	});

	__getset(0,__proto,'controllers',function(){
		return this._controllers;
	});

	__getset(0,__proto,'apexIndex',function(){
		return this._apexIndex;
		},function(value){
		if (this._apexIndex !=value){
			this._apexIndex=value;
			if (this._childrenRenderOrder==2)
				this.buildNativeDisplayList();
		}
	});

	__getset(0,__proto,'opaque',function(){
		return this._opaque;
		},function(value){
		if(this._opaque!=value){
			this._opaque=value;
			if (this._opaque){
				if(this._displayObject.hitArea==null)
					this._displayObject.hitArea=new Rectangle();
				if((this._displayObject.hitArea instanceof laya.maths.Rectangle ))
					this._displayObject.hitArea.setTo(0,0,this.width,this.height);
				this._displayObject.mouseThrough=false;
			}
			else {
				if((this._displayObject.hitArea instanceof laya.maths.Rectangle ))
					this._displayObject.hitArea=null;
				this._displayObject.mouseThrough=true;
			}
		}
	});

	__getset(0,__proto,'viewWidth',function(){
		if (this._scrollPane !=null)
			return this._scrollPane.viewWidth;
		else
		return this.width-this._margin.left-this._margin.right;
		},function(value){
		if (this._scrollPane !=null)
			this._scrollPane.viewWidth=value;
		else
		this.width=value+this._margin.left+this._margin.right;
	});

	__getset(0,__proto,'numChildren',function(){
		return this._children.length;
	});

	__getset(0,__proto,'displayListContainer',function(){
		return this._container;
	});

	return GComponent;
})(GObject)


//class fairygui.GImage extends fairygui.GObject
var GImage=(function(_super){
	function GImage(){
		this.image=null;
		this._color=null;
		this._flip=0;
		GImage.__super.call(this);
		this._color="#FFFFFF";
	}

	__class(GImage,'fairygui.GImage',_super);
	var __proto=GImage.prototype;
	Laya.imps(__proto,{"fairygui.gears.IColorGear":true})
	__proto.applyColor=function(){}
	__proto.createDisplayObject=function(){
		this._displayObject=this.image=new Image$1();
		this.image.mouseEnabled=false;
		this._displayObject["$owner"]=this;
	}

	__proto.constructFromResource=function(){
		this.packageItem.load();
		this.sourceWidth=this.packageItem.width;
		this.sourceHeight=this.packageItem.height;
		this.initWidth=this.sourceWidth;
		this.initHeight=this.sourceHeight;
		this.image.scale9Grid=this.packageItem.scale9Grid;
		this.image.scaleByTile=this.packageItem.scaleByTile;
		this.image.tileGridIndice=this.packageItem.tileGridIndice;
		this.image.tex=this.packageItem.texture;
		this.setSize(this.sourceWidth,this.sourceHeight);
	}

	__proto.handleXYChanged=function(){
		_super.prototype.handleXYChanged.call(this);
		if(this._flip !=0){
			if(this.scaleX==-1)
				this.image.x+=this.width;
			if(this.scaleY==-1)
				this.image.y+=this.height;
		}
	}

	__proto.handleSizeChanged=function(){
		if(this.image.tex!=null){
			this.image.scaleTexture(this.width/this.sourceWidth,this.height/this.sourceHeight);
		}
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		if (buffer.readBool())
			this.color=buffer.readColorS();
		this.flip=buffer.readByte();
		this.image.fillMethod=buffer.readByte();
		if (this.image.fillMethod !=0){
			this.image.fillOrigin=buffer.readByte();
			this.image.fillClockwise=buffer.readBool();
			this.image.fillAmount=buffer.getFloat32();
		}
	}

	__getset(0,__proto,'fillClockwise',function(){
		return this.image.fillClockwise;
		},function(value){
		this.image.fillClockwise=value;
	});

	__getset(0,__proto,'fillMethod',function(){
		return this.image.fillMethod;
		},function(value){
		this.image.fillMethod=value;
	});

	/**
	*@see FlipType
	*/
	/**
	*@see FlipType
	*/
	__getset(0,__proto,'flip',function(){
		return this._flip;
		},function(value){
		if(this._flip!=value){
			this._flip=value;
			var sx=1,sy=1;
			if(this._flip==1 || this._flip==3)
				sx=-1;
			if(this._flip==2 || this._flip==3)
				sy=-1;
			this.setScale(sx,sy);
			this.handleXYChanged();
		}
	});

	__getset(0,__proto,'fillOrigin',function(){
		return this.image.fillOrigin;
		},function(value){
		this.image.fillOrigin=value;
	});

	__getset(0,__proto,'fillAmount',function(){
		return this.image.fillAmount;
		},function(value){
		this.image.fillAmount=value;
	});

	__getset(0,__proto,'color',function(){
		return this._color;
		},function(value){
		if(this._color !=value){
			this._color=value;
			this.updateGear(4);
			this.applyColor();
		}
	});

	return GImage;
})(GObject)


//class fairygui.GGroup extends fairygui.GObject
var GGroup=(function(_super){
	function GGroup(){
		this._layout=0;
		this._lineGap=0;
		this._columnGap=0;
		this._percentReady=false;
		this._boundsChanged=false;
		this._updating=0;
		GGroup.__super.call(this);
	}

	__class(GGroup,'fairygui.GGroup',_super);
	var __proto=GGroup.prototype;
	__proto.setBoundsChangedFlag=function(childSizeChanged){
		(childSizeChanged===void 0)&& (childSizeChanged=false);
		if (this._updating==0 && this.parent !=null){
			if (childSizeChanged)
				this._percentReady=false;
			if(!this._boundsChanged){
				this._boundsChanged=true;
				if(this._layout!=0)
					Laya.timer.callLater(this,this.ensureBoundsCorrect);
			}
		}
	}

	__proto.ensureBoundsCorrect=function(){
		if (this._boundsChanged)
			this.updateBounds();
	}

	__proto.updateBounds=function(){
		Laya.timer.clear(this,this.ensureBoundsCorrect);
		this._boundsChanged=false;
		if (this.parent==null)
			return;
		this.handleLayout();
		var cnt=this._parent.numChildren;
		var i=0;
		var child;
		var ax=Number.POSITIVE_INFINITY,ay=Number.POSITIVE_INFINITY;
		var ar=Number.NEGATIVE_INFINITY,ab=Number.NEGATIVE_INFINITY;
		var tmp=0;
		var empty=true;
		for(i=0;i<cnt;i++){
			child=this._parent.getChildAt(i);
			if(child.group==this){
				tmp=child.x;
				if(tmp<ax)
					ax=tmp;
				tmp=child.y;
				if(tmp<ay)
					ay=tmp;
				tmp=child.x+child.width;
				if(tmp>ar)
					ar=tmp;
				tmp=child.y+child.height;
				if(tmp>ab)
					ab=tmp;
				empty=false;
			}
		}
		if (!empty){
			this._updating=1;
			this.setXY(ax,ay);
			this._updating=2;
			this.setSize(ar-ax,ab-ay);
		}
		else{
			this._updating=2;
			this.setSize(0,0);
		}
		this._updating=0;
	}

	__proto.handleLayout=function(){
		this._updating |=1;
		var child;
		var i=0;
		var cnt=0;
		if (this._layout==1){
			var curX=NaN;
			cnt=this.parent.numChildren;
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				if (isNaN(curX))
					curX=Math.floor(child.x);
				else
				child.x=curX;
				if (child.width !=0)
					curX+=Math.floor(child.width+this._columnGap);
			}
			if (!this._percentReady)
				this.updatePercent();
		}
		else if (this._layout==2){
			var curY=NaN;
			cnt=this.parent.numChildren;
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				if (isNaN(curY))
					curY=Math.floor(child.y);
				else
				child.y=curY;
				if (child.height !=0)
					curY+=Math.floor(child.height+this._lineGap);
			}
			if (!this._percentReady)
				this.updatePercent();
		}
		this._updating &=2;
	}

	__proto.updatePercent=function(){
		this._percentReady=true;
		var cnt=this.parent.numChildren;
		var i=0;
		var child;
		var size=0;
		if (this._layout==1){
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				size+=child.width;
			}
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				if (size > 0)
					child._sizePercentInGroup=child.width / size;
				else
				child._sizePercentInGroup=0;
			}
		}
		else{
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				size+=child.height;
			}
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				if (size > 0)
					child._sizePercentInGroup=child.height / size;
				else
				child._sizePercentInGroup=0;
			}
		}
	}

	__proto.moveChildren=function(dx,dy){
		if ((this._updating & 1)!=0 || this.parent==null)
			return;
		this._updating |=1;
		var cnt=this.parent.numChildren;
		var i=0;
		var child;
		for (i=0;i < cnt;i++){
			child=this.parent.getChildAt(i);
			if (child.group==this){
				child.setXY(child.x+dx,child.y+dy);
			}
		}
		this._updating &=2;
	}

	__proto.resizeChildren=function(dw,dh){
		if (this._layout==0 || (this._updating & 2)!=0 || this.parent==null)
			return;
		this._updating |=2;
		if (!this._percentReady)
			this.updatePercent();
		var cnt=this.parent.numChildren;
		var i=0;
		var j=0;
		var child;
		var last=-1;
		var numChildren=0;
		var lineSize=0;
		var remainSize=0;
		var found=false;
		for (i=0;i < cnt;i++){
			child=this.parent.getChildAt(i);
			if (child.group !=this)
				continue ;
			last=i;
			numChildren++;
		}
		if (this._layout==1){
			remainSize=lineSize=this.width-(numChildren-1)*this._columnGap;
			var curX=NaN;
			var nw=NaN;
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				if (isNaN(curX))
					curX=Math.floor(child.x);
				else
				child.x=curX;
				if (last==i)
					nw=remainSize;
				else
				nw=Math.round(child._sizePercentInGroup *lineSize);
				child.setSize(nw,child._rawHeight+dh,true);
				remainSize-=child.width;
				if (last==i){
					if (remainSize >=1){
						for (j=0;j <=i;j++){
							child=this.parent.getChildAt(j);
							if (child.group !=this)
								continue ;
							if (!found){
								nw=child.width+remainSize;
								if ((child.maxWidth==0 || nw < child.maxWidth)
									&& (child.minWidth==0 || nw > child.minWidth)){
									child.setSize(nw,child.height,true);
									found=true;
								}
							}
							else
							child.x+=remainSize;
						}
					}
				}
				else
				curX+=(child.width+this._columnGap);
			}
		}
		else if (this._layout==2){
			remainSize=lineSize=this.height-(numChildren-1)*this._lineGap;
			var curY=NaN;
			var nh=NaN;
			for (i=0;i < cnt;i++){
				child=this.parent.getChildAt(i);
				if (child.group !=this)
					continue ;
				if (isNaN(curY))
					curY=Math.floor(child.y);
				else
				child.y=curY;
				if (last==i)
					nh=remainSize;
				else
				nh=Math.round(child._sizePercentInGroup *lineSize);
				child.setSize(child._rawWidth+dw,nh,true);
				remainSize-=child.height;
				if (last==i){
					if (remainSize >=1){
						for (j=0;j <=i;j++){
							child=this.parent.getChildAt(j);
							if (child.group !=this)
								continue ;
							if (!found){
								nh=child.height+remainSize;
								if ((child.maxHeight==0 || nh < child.maxHeight)
									&& (child.minHeight==0 || nh > child.minHeight)){
									child.setSize(child.width,nh,true);
									found=true;
								}
							}
							else
							child.y+=remainSize;
						}
					}
				}
				else
				curY+=(child.height+this._lineGap);
			}
		}
		this._updating &=1;
	}

	__proto.handleAlphaChanged=function(){
		if(this._underConstruct)
			return;
		var cnt=this._parent.numChildren;
		for(var i=0;i<cnt;i++){
			var child=this._parent.getChildAt(i);
			if(child.group==this)
				child.alpha=this.alpha;
		}
	}

	__proto.handleVisibleChanged=function(){
		if(!this._parent)
			return;
		var cnt=this._parent.numChildren;
		for(var i=0;i<cnt;i++){
			var child=this._parent.getChildAt(i);
			if(child.group==this)
				child.handleVisibleChanged();
		}
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		this._layout=buffer.readByte();
		this._lineGap=buffer.getInt32();
		this._columnGap=buffer.getInt32();
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		if(!this.visible)
			this.handleVisibleChanged();
	}

	__getset(0,__proto,'lineGap',function(){
		return this._lineGap;
		},function(value){
		if(this._lineGap !=value){
			this._lineGap=value;
			this.setBoundsChangedFlag();
		}
	});

	__getset(0,__proto,'columnGap',function(){
		return this._columnGap;
		},function(value){
		if(this._columnGap !=value){
			this._columnGap=value;
			this.setBoundsChangedFlag();
		}
	});

	/**
	*@see GroupLayout
	*/
	/**
	*@see GroupLayout
	*/
	__getset(0,__proto,'layout',function(){
		return this._layout;
		},function(value){
		if(this._layout !=value){
			this._layout=value;
			this.setBoundsChangedFlag(true);
		}
	});

	return GGroup;
})(GObject)


//class fairygui.GGraph extends fairygui.GObject
var GGraph=(function(_super){
	function GGraph(){
		this._type=0;
		this._lineSize=NaN;
		this._lineColor=null;
		this._fillColor=null;
		this._cornerRadius=null;
		this._hitArea=null;
		GGraph.__super.call(this);
		this._type=0;
		this._lineSize=1;
		this._lineColor="#000000"
		this._fillColor="#FFFFFF";
		this._cornerRadius=null;
	}

	__class(GGraph,'fairygui.GGraph',_super);
	var __proto=GGraph.prototype;
	Laya.imps(__proto,{"fairygui.gears.IColorGear":true})
	__proto.drawRect=function(lineSize,lineColor,fillColor,cornerRadius){
		this._type=1;
		this._lineSize=lineSize;
		this._lineColor=lineColor;
		this._fillColor=fillColor;
		this._cornerRadius=cornerRadius;
		this.drawCommon();
	}

	__proto.drawEllipse=function(lineSize,lineColor,fillColor){
		this._type=2;
		this._lineSize=lineSize;
		this._lineColor=lineColor;
		this._fillColor=fillColor;
		this.drawCommon();
	}

	__proto.drawCommon=function(){
		this._displayObject.mouseEnabled=this.touchable;
		var gr=this._displayObject.graphics;
		gr.clear();
		var w=this.width;
		var h=this.height;
		if(w==0 || h==0)
			return;
		var fillColor=this._fillColor;
		var lineColor=this._lineColor;
		if(Render.isWebGL && ToolSet.startsWith(fillColor,"rgba")){
			var arr=fillColor.substring(5,fillColor.lastIndexOf(")")).split(",");
			var a=parseFloat(arr[3]);
			if(a==0)
				fillColor=null;
			else {
				fillColor=Utils.toHexColor((parseInt(arr[0])<<16)+(parseInt(arr[1])<<8)+parseInt(arr[2]));
				this.alpha=a;
			}
		}
		if (this._type==1){
			if(this._cornerRadius!=null){
				var paths=[
				["moveTo",this._cornerRadius[0],0],
				["lineTo",w-this._cornerRadius[1],0],
				["arcTo",w,0,w,this._cornerRadius[1],this._cornerRadius[1]],
				["lineTo",w,h-this._cornerRadius[3]],
				["arcTo",w,h,w-this._cornerRadius[3],h,this._cornerRadius[3]],
				["lineTo",this._cornerRadius[2],h],
				["arcTo",0,h,0,h-this._cornerRadius[2],this._cornerRadius[2]],
				["lineTo",0,this._cornerRadius[0]],
				["arcTo",0,0,this._cornerRadius[0],0,this._cornerRadius[0]],
				["closePath"]];
				gr.drawPath(0,0,paths,{fillStyle:fillColor},this._lineSize>0?{strokeStyle:lineColor,lineWidth:this._lineSize}:null);
			}
			else
			gr.drawRect(0,0,w,h,fillColor,this._lineSize>0?lineColor:null,this._lineSize);
			}else{
			gr.drawCircle(w/2,h/2,w/2,fillColor,this._lineSize>0?lineColor:null,this._lineSize);
		}
		this._displayObject.repaint();
	}

	__proto.replaceMe=function(target){
		if (!this._parent)
			throw "parent not set";
		target.name=this.name;
		target.alpha=this.alpha;
		target.rotation=this.rotation;
		target.visible=this.visible;
		target.touchable=this.touchable;
		target.grayed=this.grayed;
		target.setXY(this.x,this.y);
		target.setSize(this.width,this.height);
		var index=this._parent.getChildIndex(this);
		this._parent.addChildAt(target,index);
		target.relations.copyFrom(this.relations);
		this._parent.removeChild(this,true);
	}

	__proto.addBeforeMe=function(target){
		if (this._parent==null)
			throw "parent not set";
		var index=this._parent.getChildIndex(this);
		this._parent.addChildAt(target,index);
	}

	__proto.addAfterMe=function(target){
		if (this._parent==null)
			throw "parent not set";
		var index=this._parent.getChildIndex(this);
		index++;
		this._parent.addChildAt(target,index);
	}

	__proto.setNativeObject=function(obj){
		this._type=0;
		this._displayObject.mouseEnabled=this.touchable;
		this._displayObject.graphics.clear();
		this._displayObject.addChild(obj);
	}

	__proto.createDisplayObject=function(){
		_super.prototype.createDisplayObject.call(this);
		this._displayObject.mouseEnabled=false;
		this._hitArea=new HitArea();
		this._hitArea.hit=this._displayObject.graphics;
		this._displayObject.hitArea=this._hitArea;
	}

	__proto.handleSizeChanged=function(){
		_super.prototype.handleSizeChanged.call(this);
		if(this._type !=0)
			this.drawCommon();
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		this._type=buffer.readByte();
		if (this._type!=0){
			this._lineSize=buffer.getInt32();
			this._lineColor=buffer.readColorS(true);
			this._fillColor=buffer.readColorS(true);
			if (buffer.readBool()){
				this._cornerRadius=[];
				for (var i=0;i < 4;i++)
				this._cornerRadius[i]=buffer.getFloat32();
			}
			this.drawCommon();
		}
	}

	__getset(0,__proto,'color',function(){
		return this._fillColor;
		},function(value){
		this._fillColor=value;
		if(this._type!=0)
			this.drawCommon();
	});

	return GGraph;
})(GObject)


//class fairygui.action.PlayTransitionAction extends fairygui.action.ControllerAction
var PlayTransitionAction=(function(_super){
	function PlayTransitionAction(){
		this.transitionName=null;
		this.playTimes=1;
		this.delay=0;
		this.stopOnExit=false;
		this._currentTransition=null;
		PlayTransitionAction.__super.call(this);
	}

	__class(PlayTransitionAction,'fairygui.action.PlayTransitionAction',_super);
	var __proto=PlayTransitionAction.prototype;
	__proto.enter=function(controller){
		var trans=controller.parent.getTransition(this.transitionName);
		if(trans){
			if(this._currentTransition && this._currentTransition.playing)
				trans.changePlayTimes(this.playTimes);
			else
			trans.play(null,this.playTimes,this.delay);
			this._currentTransition=trans;
		}
	}

	__proto.leave=function(controller){
		if(this.stopOnExit && this._currentTransition){
			this._currentTransition.stop();
			this._currentTransition=null;
		}
	}

	__proto.setup=function(buffer){
		_super.prototype.setup.call(this,buffer);
		this.transitionName=buffer.readS();
		this.playTimes=buffer.getInt32();
		this.delay=buffer.getFloat32();
		this.stopOnExit=buffer.readBool();
	}

	return PlayTransitionAction;
})(ControllerAction)


//class fairygui.action.ChangePageAction extends fairygui.action.ControllerAction
var ChangePageAction=(function(_super){
	function ChangePageAction(){
		this.objectId=null;
		this.controllerName=null;
		this.targetPage=null;
		ChangePageAction.__super.call(this);
	}

	__class(ChangePageAction,'fairygui.action.ChangePageAction',_super);
	var __proto=ChangePageAction.prototype;
	__proto.enter=function(controller){
		if(!this.controllerName)
			return;
		var gcom;
		if(this.objectId)
			gcom=controller.parent.getChildById(this.objectId);
		else
		gcom=controller.parent;
		if(gcom){
			var cc=gcom.getController(this.controllerName);
			if(cc && cc!=controller && !cc.changing)
				cc.selectedPageId=this.targetPage;
		}
	}

	__proto.setup=function(buffer){
		_super.prototype.setup.call(this,buffer);
		this.objectId=buffer.readS();
		this.controllerName=buffer.readS();
		this.targetPage=buffer.readS();
	}

	return ChangePageAction;
})(ControllerAction)


//class fairygui.GLoader extends fairygui.GObject
var GLoader=(function(_super){
	function GLoader(){
		this._url=null;
		this._align=null;
		this._valign=null;
		this._autoSize=false;
		this._fill=0;
		this._shrinkOnly=false;
		this._showErrorSign=false;
		this._playing=false;
		this._frame=0;
		this._color=null;
		this._contentItem=null;
		this._contentSourceWidth=0;
		this._contentSourceHeight=0;
		this._contentWidth=0;
		this._contentHeight=0;
		this._content=null;
		this._errorSign=null;
		this._content2=null;
		this._updatingLayout=false;
		GLoader.__super.call(this);
		this._playing=true;
		this._url="";
		this._fill=0;
		this._align="left";
		this._valign="top";
		this._showErrorSign=true;
		this._color="#FFFFFF";
	}

	__class(GLoader,'fairygui.GLoader',_super);
	var __proto=GLoader.prototype;
	Laya.imps(__proto,{"fairygui.gears.IColorGear":true,"fairygui.gears.IAnimationGear":true})
	__proto.createDisplayObject=function(){
		_super.prototype.createDisplayObject.call(this);
		this._displayObject.mouseEnabled=true;
	}

	__proto.dispose=function(){
		if(this._contentItem==null && ((this._content instanceof fairygui.display.Image ))){
			var texture=(this._content).tex;
			if(texture !=null)
				this.freeExternal(texture);
		}
		if(this._content2!=null)
			this._content2.dispose();
		_super.prototype.dispose.call(this);
	}

	__proto.advance=function(timeInMiniseconds){
		if((this._content instanceof fairygui.display.MovieClip ))
			(this._content).advance(timeInMiniseconds);
	}

	__proto.applyColor=function(){}
	__proto.loadContent=function(){
		this.clearContent();
		if (!this._url)
			return;
		if(ToolSet.startsWith(this._url,"ui://"))
			this.loadFromPackage(this._url);
		else
		this.loadExternal();
	}

	__proto.loadFromPackage=function(itemURL){
		this._contentItem=UIPackage.getItemByURL(itemURL);
		if(this._contentItem !=null){
			this._contentItem.load();
			if(this._autoSize)
				this.setSize(this._contentItem.width,this._contentItem.height);
			if(this._contentItem.type==0){
				if(this._contentItem.texture==null){
					this.setErrorState();
				}
				else {
					if(!((this._content instanceof fairygui.display.Image ))){
						this._content=new Image$1();
						this._displayObject.addChild(this._content);
					}
					else
					this._displayObject.addChild(this._content);
					(this._content).tex=this._contentItem.texture;
					(this._content).scale9Grid=this._contentItem.scale9Grid;
					(this._content).scaleByTile=this._contentItem.scaleByTile;
					(this._content).tileGridIndice=this._contentItem.tileGridIndice;
					this._contentSourceWidth=this._contentItem.width;
					this._contentSourceHeight=this._contentItem.height;
					this.updateLayout();
				}
			}
			else if(this._contentItem.type==1){
				if(!((this._content instanceof fairygui.display.MovieClip ))){
					this._content=new MovieClip$1();
					this._displayObject.addChild(this._content);
				}
				else
				this._displayObject.addChild(this._content);
				this._contentSourceWidth=this._contentItem.width;
				this._contentSourceHeight=this._contentItem.height;
				(this._content).interval=this._contentItem.interval;
				(this._content).swing=this._contentItem.swing;
				(this._content).repeatDelay=this._contentItem.repeatDelay;
				(this._content).frames=this._contentItem.frames;
				(this._content).boundsRect=new Rectangle(0,0,this._contentSourceWidth,this._contentSourceHeight);
				this.updateLayout();
			}
			else if(this._contentItem.type==3){
				var obj=UIPackage.createObjectFromURL(itemURL);
				if(!obj)
					this.setErrorState();
				else if(!((obj instanceof fairygui.GComponent ))){
					obj.dispose();
					this.setErrorState();
				}
				else{
					this._content2=obj.asCom;
					this._displayObject.addChild(this._content2.displayObject);
					this._contentSourceWidth=this._contentItem.width;
					this._contentSourceHeight=this._contentItem.height;
					this.updateLayout();
				}
			}
			else
			this.setErrorState();
		}
		else
		this.setErrorState();
	}

	__proto.loadExternal=function(){
		AssetProxy.inst.load(this._url,Handler.create(this,this.__getResCompleted),null,"image");
	}

	__proto.freeExternal=function(texture){}
	__proto.onExternalLoadSuccess=function(texture){
		if(!((this._content instanceof fairygui.display.Image ))){
			this._content=new Image$1();
			this._displayObject.addChild(this._content);
		}
		else
		this._displayObject.addChild(this._content);
		(this._content).tex=texture;
		(this._content).scale9Grid=null;
		(this._content).scaleByTile=false;
		this._contentSourceWidth=texture.width;
		this._contentSourceHeight=texture.height;
		this.updateLayout();
	}

	__proto.onExternalLoadFailed=function(){
		this.setErrorState();
	}

	__proto.__getResCompleted=function(tex){
		if(tex!=null)
			this.onExternalLoadSuccess(tex);
		else
		this.onExternalLoadFailed();
	}

	__proto.setErrorState=function(){
		if (!this._showErrorSign)
			return;
		if (this._errorSign==null){
			if (UIConfig$1.loaderErrorSign !=null){
				this._errorSign=fairygui.GLoader._errorSignPool.getObject(UIConfig$1.loaderErrorSign);
			}
		}
		if (this._errorSign !=null){
			this._errorSign.setSize(this.width,this.height);
			this._displayObject.addChild(this._errorSign.displayObject);
		}
	}

	__proto.clearErrorState=function(){
		if (this._errorSign !=null){
			this._displayObject.removeChild(this._errorSign.displayObject);
			fairygui.GLoader._errorSignPool.returnObject(this._errorSign);
			this._errorSign=null;
		}
	}

	__proto.updateLayout=function(){
		if (this._content2==null && this._content==null){
			if (this._autoSize){
				this._updatingLayout=true;
				this.setSize(50,30);
				this._updatingLayout=false;
			}
			return;
		}
		this._contentWidth=this._contentSourceWidth;
		this._contentHeight=this._contentSourceHeight;
		if (this._autoSize){
			this._updatingLayout=true;
			if (this._contentWidth==0)
				this._contentWidth=50;
			if (this._contentHeight==0)
				this._contentHeight=30;
			this.setSize(this._contentWidth,this._contentHeight);
			this._updatingLayout=false;
			if(this._contentWidth==this._width && this._contentHeight==this._height){
				if(this._content2!=null){
					this._content2.setXY(0,0);
					this._content2.setScale(1,1);
				}
				else{
					this._content.x=0;
					this._content.y=0;
					this._content.scaleX=1;
					this._content.scaleY=1;
				}
				return;
			}
		};
		var sx=1,sy=1;
		if(this._fill!=0){
			sx=this.width/this._contentSourceWidth;
			sy=this.height/this._contentSourceHeight;
			if(sx!=1 || sy!=1){
				if (this._fill==2)
					sx=sy;
				else if (this._fill==3)
				sy=sx;
				else if (this._fill==1){
					if (sx > sy)
						sx=sy;
					else
					sy=sx;
				}
				else if (this._fill==5){
					if (sx > sy)
						sy=sx;
					else
					sx=sy;
				}
				if(this._shrinkOnly){
					if(sx>1)
						sx=1;
					if(sy>1)
						sy=1;
				}
				this._contentWidth=this._contentSourceWidth *sx;
				this._contentHeight=this._contentSourceHeight *sy;
			}
		}
		if(this._content2!=null)
			this._content2.setScale(sx,sy);
		else if ((this._content instanceof fairygui.display.Image ))
		(this._content).scaleTexture(sx,sy);
		else
		this._content.scale(sx,sy);
		var nx=NaN,ny=NaN;
		if (this._align=="center")
			nx=Math.floor((this.width-this._contentWidth)/ 2);
		else if (this._align=="right")
		nx=this.width-this._contentWidth;
		else
		nx=0;
		if (this._valign=="middle")
			ny=Math.floor((this.height-this._contentHeight)/ 2);
		else if (this._valign=="bottom")
		ny=this.height-this._contentHeight;
		else
		ny=0;
		if(this._content2!=null)
			this._content2.setXY(nx,ny);
		else{
			this._content.x=nx;
			this._content.y=ny;
		}
	}

	__proto.clearContent=function(){
		this.clearErrorState();
		if (this._content !=null && this._content.parent !=null)
			this._displayObject.removeChild(this._content);
		if(this._contentItem==null && ((this._content instanceof fairygui.display.Image ))){
			var texture=(this._content).tex;
			if(texture !=null)
				this.freeExternal(texture);
		}
		if(this._content2!=null){
			this._content2.dispose();
			this._content2=null;
		}
		this._contentItem=null;
	}

	__proto.handleSizeChanged=function(){
		_super.prototype.handleSizeChanged.call(this);
		if(!this._updatingLayout)
			this.updateLayout();
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		var iv=0;
		this._url=buffer.readS();
		iv=buffer.readByte();
		this._align=iv==0?"left":(iv==1?"center":"right");
		iv=buffer.readByte();
		this._valign=iv==0?"top":(iv==1?"middle":"bottom");
		this._fill=buffer.readByte();
		this._shrinkOnly=buffer.readBool();
		this._autoSize=buffer.readBool();
		this._showErrorSign=buffer.readBool();
		this._playing=buffer.readBool();
		this._frame=buffer.getInt32();
		if (buffer.readBool())
			this.color=buffer.readColorS();
		var fillMethod=buffer.readByte();
		if (fillMethod !=0)
			buffer.skip(6);
		if (this._url)
			this.loadContent();
	}

	__getset(0,__proto,'component',function(){
		return this._content2;
	});

	__getset(0,__proto,'content',function(){
		return this._content;
	});

	__getset(0,__proto,'icon',function(){
		return this._url;
		},function(value){
		this.url=value;
	});

	__getset(0,__proto,'frame',function(){
		return this._frame;
		},function(value){
		if (this._frame !=value){
			this._frame=value;
			if ((this._content instanceof fairygui.display.MovieClip ))
				(this._content).frame=value;
			this.updateGear(5);
		}
	});

	__getset(0,__proto,'playing',function(){
		return this._playing;
		},function(value){
		if (this._playing !=value){
			this._playing=value;
			if ((this._content instanceof fairygui.display.MovieClip ))
				(this._content).playing=value;
			this.updateGear(5);
		}
	});

	//todo:
	__getset(0,__proto,'showErrorSign',function(){
		return this._showErrorSign;
		},function(value){
		this._showErrorSign=value;
	});

	__getset(0,__proto,'autoSize',function(){
		return this._autoSize;
		},function(value){
		if (this._autoSize !=value){
			this._autoSize=value;
			this.updateLayout();
		}
	});

	__getset(0,__proto,'shrinkOnly',function(){
		return this._shrinkOnly;
		},function(value){
		if(this._shrinkOnly!=value){
			this._shrinkOnly=value;
			this.updateLayout();
		}
	});

	__getset(0,__proto,'verticalAlign',function(){
		return this._valign;
		},function(value){
		if (this._valign !=value){
			this._valign=value;
			this.updateLayout();
		}
	});

	__getset(0,__proto,'align',function(){
		return this._align;
		},function(value){
		if (this._align !=value){
			this._align=value;
			this.updateLayout();
		}
	});

	__getset(0,__proto,'color',function(){
		return this._color;
		},function(value){
		if(this._color !=value){
			this._color=value;
			this.updateGear(4);
			this.applyColor();
		}
	});

	__getset(0,__proto,'timeScale',function(){
		if((this._content instanceof fairygui.display.MovieClip ))
			return (this._content).timeScale;
		else
		return 1;
		},function(value){
		if((this._content instanceof fairygui.display.MovieClip ))
			(this._content).timeScale=value;
	});

	/**
	*@see LoaderFillType
	*/
	/**
	*@see LoaderFillType
	*/
	__getset(0,__proto,'fill',function(){
		return this._fill;
		},function(value){
		if (this._fill !=value){
			this._fill=value;
			this.updateLayout();
		}
	});

	__getset(0,__proto,'url',function(){
		return this._url;
		},function(value){
		if (this._url==value)
			return;
		this._url=value;
		this.loadContent();
		this.updateGear(7);
	});

	__static(GLoader,
	['_errorSignPool',function(){return this._errorSignPool=new GObjectPool();}
	]);
	return GLoader;
})(GObject)


//class fairygui.GMovieClip extends fairygui.GObject
var GMovieClip=(function(_super){
	function GMovieClip(){
		this._movieClip=null;
		GMovieClip.__super.call(this);
		this._sizeImplType=1;
	}

	__class(GMovieClip,'fairygui.GMovieClip',_super);
	var __proto=GMovieClip.prototype;
	Laya.imps(__proto,{"fairygui.gears.IColorGear":true,"fairygui.gears.IAnimationGear":true})
	__proto.createDisplayObject=function(){
		this._displayObject=this._movieClip=new MovieClip$1();
		this._movieClip.mouseEnabled=false;
		this._displayObject["$owner"]=this;
	}

	__proto.rewind=function(){
		this._movieClip.rewind();
	}

	__proto.syncStatus=function(anotherMc){
		this._movieClip.syncStatus(anotherMc._movieClip);
	}

	__proto.advance=function(timeInMiniseconds){
		this._movieClip.advance(timeInMiniseconds);
	}

	//从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
	__proto.setPlaySettings=function(start,end,times,endAt,endHandler){
		(start===void 0)&& (start=0);
		(end===void 0)&& (end=-1);
		(times===void 0)&& (times=0);
		(endAt===void 0)&& (endAt=-1);
		this._movieClip.setPlaySettings(start,end,times,endAt,endHandler);
	}

	__proto.constructFromResource=function(){
		this.sourceWidth=this.packageItem.width;
		this.sourceHeight=this.packageItem.height;
		this.initWidth=this.sourceWidth;
		this.initHeight=this.sourceHeight;
		this.setSize(this.sourceWidth,this.sourceHeight);
		this.packageItem.load();
		this._movieClip.interval=this.packageItem.interval;
		this._movieClip.swing=this.packageItem.swing;
		this._movieClip.repeatDelay=this.packageItem.repeatDelay;
		this._movieClip.frames=this.packageItem.frames;
		this._movieClip.boundsRect=new Rectangle(0,0,this.sourceWidth,this.sourceHeight);
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		if (buffer.readBool())
			this.color=buffer.readColorS();
		buffer.readByte();
		this._movieClip.frame=buffer.getInt32();
		this._movieClip.playing=buffer.readBool();
	}

	__getset(0,__proto,'timeScale',function(){
		return this._movieClip.timeScale;
		},function(value){
		this._movieClip.timeScale=value;
	});

	__getset(0,__proto,'playing',function(){
		return this._movieClip.playing;
		},function(value){
		if (this._movieClip.playing !=value){
			this._movieClip.playing=value;
			this.updateGear(5);
		}
	});

	__getset(0,__proto,'frame',function(){
		return this._movieClip.frame;
		},function(value){
		if (this._movieClip.frame !=value){
			this._movieClip.frame=value;
			this.updateGear(5);
		}
	});

	__getset(0,__proto,'color',function(){
		return "#FFFFFF";
		},function(value){
	});

	return GMovieClip;
})(GObject)


//class fairygui.gears.GearText extends fairygui.gears.GearBase
var GearText=(function(_super){
	function GearText(owner){
		this._storage=null;
		this._default=null;
		GearText.__super.call(this,owner);
	}

	__class(GearText,'fairygui.gears.GearText',_super);
	var __proto=GearText.prototype;
	__proto.init=function(){
		this._default=this._owner.text;
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		if(pageId==null)
			this._default=buffer.readS();
		else
		this._storage[pageId]=buffer.readS();
	}

	__proto.apply=function(){
		this._owner._gearLocked=true;
		var data=this._storage[this._controller.selectedPageId];
		if(data!==undefined)
			this._owner.text=data;
		else
		this._owner.text=this._default;
		this._owner._gearLocked=false;
	}

	__proto.updateState=function(){
		this._storage[this._controller.selectedPageId]=this._owner.text;
	}

	return GearText;
})(GearBase)


//class fairygui.gears.GearXY extends fairygui.gears.GearBase
var GearXY=(function(_super){
	function GearXY(owner){
		this._storage=null;
		this._default=null;
		GearXY.__super.call(this,owner);
	}

	__class(GearXY,'fairygui.gears.GearXY',_super);
	var __proto=GearXY.prototype;
	__proto.init=function(){
		this._default=new Point(this._owner.x,this._owner.y);
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		var gv;
		if (pageId==null)
			gv=this._default;
		else {
			gv=new Point();
			this._storage[pageId]=gv;
		}
		gv.x=buffer.getInt32();
		gv.y=buffer.getInt32();
	}

	__proto.apply=function(){
		var pt=this._storage[this._controller.selectedPageId];
		if (!pt)
			pt=this._default;
		if(this._tweenConfig!=null && this._tweenConfig.tween && !UIPackage._constructing && !GearBase.disableAllTweenEffect){
			if (this._tweenConfig._tweener !=null){
				if (this._tweenConfig._tweener.endValue.x !=pt.x || this._tweenConfig._tweener.endValue.y !=pt.y){
					this._tweenConfig._tweener.kill(true);
					this._tweenConfig._tweener=null;
				}
				else
				return;
			}
			if (this._owner.x !=pt.x || this._owner.y !=pt.y){
				if(this._owner.checkGearController(0,this._controller))
					this._tweenConfig._displayLockToken=this._owner.addDisplayLock();
				this._tweenConfig._tweener=GTween.to2(this._owner.x,this._owner.y,pt.x,pt.y,this._tweenConfig.duration)
				.setDelay(this._tweenConfig.delay)
				.setEase(this._tweenConfig.easeType)
				.setTarget(this)
				.onUpdate(this.__tweenUpdate,this)
				.onComplete(this.__tweenComplete,this);
			}
		}
		else {
			this._owner._gearLocked=true;
			this._owner.setXY(pt.x,pt.y);
			this._owner._gearLocked=false;
		}
	}

	__proto.__tweenUpdate=function(tweener){
		this._owner._gearLocked=true;
		this._owner.setXY(tweener.value.x,tweener.value.y);
		this._owner._gearLocked=false;
	}

	__proto.__tweenComplete=function(){
		if(this._tweenConfig._displayLockToken!=0){
			this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
			this._tweenConfig._displayLockToken=0;
		}
		this._tweenConfig._tweener=null;
	}

	__proto.updateState=function(){
		var pt=this._storage[this._controller.selectedPageId];
		if(!pt){
			pt=new Point();
			this._storage[this._controller.selectedPageId]=pt;
		}
		pt.x=this._owner.x;
		pt.y=this._owner.y;
	}

	__proto.updateFromRelations=function(dx,dy){
		if(this._controller==null || this._storage==null)
			return;
		for (var key in this._storage){
			var pt=this._storage[key];
			pt.x+=dx;
			pt.y+=dy;
		}
		this._default.x+=dx;
		this._default.y+=dy;
		this.updateState();
	}

	return GearXY;
})(GearBase)


//class fairygui.gears.GearDisplay extends fairygui.gears.GearBase
var GearDisplay=(function(_super){
	function GearDisplay(owner){
		this.pages=null;
		this._visible=0;
		this._displayLockToken=0;
		GearDisplay.__super.call(this,owner);
		this._displayLockToken=1;
	}

	__class(GearDisplay,'fairygui.gears.GearDisplay',_super);
	var __proto=GearDisplay.prototype;
	__proto.init=function(){
		this.pages=null;
	}

	__proto.addLock=function(){
		this._visible++;
		return this._displayLockToken;
	}

	__proto.releaseLock=function(token){
		if(token==this._displayLockToken)
			this._visible--;
	}

	__proto.apply=function(){
		this._displayLockToken++;
		if(this._displayLockToken<=0)
			this._displayLockToken=1;
		if(this.pages==null || this.pages.length==0
			|| this.pages.indexOf(this._controller.selectedPageId)!=-1)
		this._visible=1;
		else
		this._visible=0;
	}

	__getset(0,__proto,'connected',function(){
		return this._controller==null || this._visible>0;
	});

	return GearDisplay;
})(GearBase)


//class fairygui.gears.GearLook extends fairygui.gears.GearBase
var GearLook=(function(_super){
	var GearLookValue;
	function GearLook(owner){
		this._storage=null;
		this._default=null;
		GearLook.__super.call(this,owner);
	}

	__class(GearLook,'fairygui.gears.GearLook',_super);
	var __proto=GearLook.prototype;
	__proto.init=function(){
		this._default=new GearLookValue(this._owner.alpha,this._owner.rotation,this._owner.grayed,this._owner.touchable);
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		var gv;
		if (pageId==null)
			gv=this._default;
		else {
			gv=new GearLookValue();
			this._storage[pageId]=gv;
		}
		gv.alpha=buffer.getFloat32();
		gv.rotation=buffer.getFloat32();
		gv.grayed=buffer.readBool();
		gv.touchable=buffer.readBool();
	}

	__proto.apply=function(){
		var gv=this._storage[this._controller.selectedPageId];
		if(!gv)
			gv=this._default;
		if(this._tweenConfig!=null && this._tweenConfig.tween && !UIPackage._constructing && !GearBase.disableAllTweenEffect){
			this._owner._gearLocked=true;
			this._owner.grayed=gv.grayed;
			this._owner.touchable=gv.touchable;
			this._owner._gearLocked=false;
			if (this._tweenConfig._tweener !=null){
				if (this._tweenConfig._tweener.endValue.x !=gv.alpha || this._tweenConfig._tweener.endValue.y !=gv.rotation){
					this._tweenConfig._tweener.kill(true);
					this._tweenConfig._tweener=null;
				}
				else
				return;
			};
			var a=gv.alpha!=this._owner.alpha;
			var b=gv.rotation!=this._owner.rotation;
			if(a || b){
				if(this._owner.checkGearController(0,this._controller))
					this._tweenConfig._displayLockToken=this._owner.addDisplayLock();
				this._tweenConfig._tweener=GTween.to2(this._owner.alpha,this._owner.rotation,gv.alpha,gv.rotation,this._tweenConfig.duration)
				.setDelay(this._tweenConfig.delay)
				.setEase(this._tweenConfig.easeType)
				.setUserData((a ? 1 :0)+(b ? 2 :0))
				.setTarget(this)
				.onUpdate(this.__tweenUpdate,this)
				.onComplete(this.__tweenComplete,this);
			}
		}
		else {
			this._owner._gearLocked=true;
			this._owner.grayed=gv.grayed;
			this._owner.alpha=gv.alpha;
			this._owner.rotation=gv.rotation;
			this._owner.touchable=gv.touchable;
			this._owner._gearLocked=false;
		}
	}

	__proto.__tweenUpdate=function(tweener){
		var flag=tweener.userData;
		this._owner._gearLocked=true;
		if ((flag & 1)!=0)
			this._owner.alpha=tweener.value.x;
		if ((flag & 2)!=0)
			this._owner.rotation=tweener.value.y;
		this._owner._gearLocked=false;
	}

	__proto.__tweenComplete=function(){
		if(this._tweenConfig._displayLockToken!=0){
			this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
			this._tweenConfig._displayLockToken=0;
		}
		this._tweenConfig._tweener=null;
	}

	__proto.updateState=function(){
		var gv=this._storage[this._controller.selectedPageId];
		if(!gv){
			gv=new GearLookValue();
			this._storage[this._controller.selectedPageId]=gv;
		}
		gv.alpha=this._owner.alpha;
		gv.rotation=this._owner.rotation;
		gv.grayed=this._owner.grayed;
		gv.touchable=this._owner.touchable;
	}

	GearLook.__init$=function(){
		//class GearLookValue
		GearLookValue=(function(){
			function GearLookValue(alpha,rotation,grayed,touchable){
				this.alpha=NaN;
				this.rotation=NaN;
				this.grayed=false;
				this.touchable=false;
				(alpha===void 0)&& (alpha=0);
				(rotation===void 0)&& (rotation=0);
				(grayed===void 0)&& (grayed=false);
				(touchable===void 0)&& (touchable=true);
				this.alpha=alpha;
				this.rotation=rotation;
				this.grayed=grayed;
				this.touchable=touchable;
			}
			__class(GearLookValue,'');
			return GearLookValue;
		})()
	}

	return GearLook;
})(GearBase)


//class fairygui.gears.GearAnimation extends fairygui.gears.GearBase
var GearAnimation=(function(_super){
	var GearAnimationValue;
	function GearAnimation(owner){
		this._storage=null;
		this._default=null;
		GearAnimation.__super.call(this,owner);
	}

	__class(GearAnimation,'fairygui.gears.GearAnimation',_super);
	var __proto=GearAnimation.prototype;
	__proto.init=function(){
		this._default=new GearAnimationValue((this._owner).playing,
		(this._owner).frame);
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		var gv;
		if (pageId==null)
			gv=this._default;
		else {
			gv=new GearAnimationValue();
			this._storage[pageId]=gv;
		}
		gv.playing=buffer.readBool();
		gv.frame=buffer.getInt32();
	}

	__proto.apply=function(){
		this._owner._gearLocked=true;
		var gv=this._storage[this._controller.selectedPageId];
		if (!gv)
			gv=this._default;
		(this._owner).frame=gv.frame;
		(this._owner).playing=gv.playing;
		this._owner._gearLocked=false;
	}

	__proto.updateState=function(){
		var mc=(this._owner);
		var gv=this._storage[this._controller.selectedPageId];
		if(!gv){
			gv=new GearAnimationValue();
			this._storage[this._controller.selectedPageId]=gv;
		}
		gv.frame=mc.frame;
		gv.playing=mc.playing;
	}

	GearAnimation.__init$=function(){
		//class GearAnimationValue
		GearAnimationValue=(function(){
			function GearAnimationValue(playing,frame){
				this.playing=false;
				this.frame=NaN;
				(playing===void 0)&& (playing=true);
				(frame===void 0)&& (frame=0);
				this.playing=playing;
				this.frame=frame;
			}
			__class(GearAnimationValue,'');
			return GearAnimationValue;
		})()
	}

	return GearAnimation;
})(GearBase)


//class fairygui.gears.GearColor extends fairygui.gears.GearBase
var GearColor=(function(_super){
	var GearColorValue;
	function GearColor(owner){
		this._storage=null;
		this._default=null;
		GearColor.__super.call(this,owner);
	}

	__class(GearColor,'fairygui.gears.GearColor',_super);
	var __proto=GearColor.prototype;
	__proto.init=function(){
		if(this._owner["strokeColor"]!=undefined)
			this._default=new GearColorValue(this._owner["color"],this._owner["strokeColor"]);
		else
		this._default=new GearColorValue(this._owner["color"],null);
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		var gv;
		if (pageId==null)
			gv=this._default;
		else {
			gv=new GearColorValue();
			this._storage[pageId]=gv;
		}
		gv.color=buffer.readColorS();
		gv.strokeColor=buffer.readColorS();
	}

	__proto.apply=function(){
		this._owner._gearLocked=true;
		var gv=this._storage[this._controller.selectedPageId];
		if(!gv)
			gv=this._default;
		(this._owner).color=gv.color;
		if(this._owner["strokeColor"]!=undefined && gv.strokeColor!=null)
			this._owner["strokeColor"]=gv.strokeColor;
		this._owner._gearLocked=false;
	}

	__proto.updateState=function(){
		var gv=this._storage[this._controller.selectedPageId];
		if(!gv){
			gv=new GearColorValue(null,null);
			this._storage[this._controller.selectedPageId]=gv;
		}
		gv.color=(this._owner).color;
		if(this._owner["strokeColor"]!=undefined)
			gv.strokeColor=this._owner["strokeColor"];
	}

	GearColor.__init$=function(){
		//class GearColorValue
		GearColorValue=(function(){
			function GearColorValue(color,strokeColor){
				this.color=null;
				this.strokeColor=null;
				this.color=color;
				this.strokeColor=strokeColor;
			}
			__class(GearColorValue,'');
			return GearColorValue;
		})()
	}

	return GearColor;
})(GearBase)


//class fairygui.gears.GearSize extends fairygui.gears.GearBase
var GearSize=(function(_super){
	var GearSizeValue;
	function GearSize(owner){
		this._storage=null;
		this._default=null;
		GearSize.__super.call(this,owner);
	}

	__class(GearSize,'fairygui.gears.GearSize',_super);
	var __proto=GearSize.prototype;
	__proto.init=function(){
		this._default=new GearSizeValue(this._owner.width,this._owner.height,
		this._owner.scaleX,this._owner.scaleY);
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		var gv;
		if (pageId==null)
			gv=this._default;
		else {
			gv=new GearSizeValue();
			this._storage[pageId]=gv;
		}
		gv.width=buffer.getInt32();
		gv.height=buffer.getInt32();
		gv.scaleX=buffer.getFloat32();
		gv.scaleY=buffer.getFloat32();
	}

	__proto.apply=function(){
		var gv=this._storage[this._controller.selectedPageId];
		if (!gv)
			gv=this._default;
		if(this._tweenConfig!=null && this._tweenConfig.tween && !UIPackage._constructing && !GearBase.disableAllTweenEffect){
			if (this._tweenConfig._tweener !=null){
				if (this._tweenConfig._tweener.endValue.x !=gv.width || this._tweenConfig._tweener.endValue.y !=gv.height
					|| this._tweenConfig._tweener.endValue.z !=gv.scaleX || this._tweenConfig._tweener.endValue.w !=gv.scaleY){
					this._tweenConfig._tweener.kill(true);
					this._tweenConfig._tweener=null;
				}
				else
				return;
			};
			var a=gv.width !=this._owner.width || gv.height !=this._owner.height;
			var b=gv.scaleX !=this._owner.scaleX || gv.scaleY !=this._owner.scaleY;
			if(a || b){
				if(this._owner.checkGearController(0,this._controller))
					this._tweenConfig._displayLockToken=this._owner.addDisplayLock();
				this._tweenConfig._tweener=GTween.to4(this._owner.width,this._owner.height,this._owner.scaleX,this._owner.scaleY,gv.width,gv.height,gv.scaleX,gv.scaleY,this._tweenConfig.duration)
				.setDelay(this._tweenConfig.delay)
				.setEase(this._tweenConfig.easeType)
				.setUserData((a ? 1 :0)+(b ? 2 :0))
				.setTarget(this)
				.onUpdate(this.__tweenUpdate,this)
				.onComplete(this.__tweenComplete,this);
			}
		}
		else {
			this._owner._gearLocked=true;
			this._owner.setSize(gv.width,gv.height,this._owner.checkGearController(1,this._controller));
			this._owner.setScale(gv.scaleX,gv.scaleY);
			this._owner._gearLocked=false;
		}
	}

	__proto.__tweenUpdate=function(tweener){
		var flag=tweener.userData;
		this._owner._gearLocked=true;
		if ((flag & 1)!=0)
			this._owner.setSize(tweener.value.x,tweener.value.y,this._owner.checkGearController(1,this._controller));
		if ((flag & 2)!=0)
			this._owner.setScale(tweener.value.z,tweener.value.w);
		this._owner._gearLocked=false;
	}

	__proto.__tweenComplete=function(){
		if(this._tweenConfig._displayLockToken!=0){
			this._owner.releaseDisplayLock(this._tweenConfig._displayLockToken);
			this._tweenConfig._displayLockToken=0;
		}
		this._tweenConfig._tweener=null;
	}

	__proto.updateState=function(){
		var gv=this._storage[this._controller.selectedPageId];
		if(!gv){
			gv=new GearSizeValue();
			this._storage[this._controller.selectedPageId]=gv;
		}
		gv.width=this._owner.width;
		gv.height=this._owner.height;
		gv.scaleX=this._owner.scaleX;
		gv.scaleY=this._owner.scaleY;
	}

	__proto.updateFromRelations=function(dx,dy){
		if(this._controller==null || this._storage==null)
			return;
		for(var key in this._storage){
			var gv=this._storage[key];
			gv.width+=dx;
			gv.height+=dy;
		}
		this._default.width+=dx;
		this._default.height+=dy;
		this.updateState();
	}

	GearSize.__init$=function(){
		//class GearSizeValue
		GearSizeValue=(function(){
			function GearSizeValue(width,height,scaleX,scaleY){
				this.width=NaN;
				this.height=NaN;
				this.scaleX=NaN;
				this.scaleY=NaN;
				(width===void 0)&& (width=0);
				(height===void 0)&& (height=0);
				(scaleX===void 0)&& (scaleX=0);
				(scaleY===void 0)&& (scaleY=0);
				this.width=width;
				this.height=height;
				this.scaleX=scaleX;
				this.scaleY=scaleY;
			}
			__class(GearSizeValue,'');
			return GearSizeValue;
		})()
	}

	return GearSize;
})(GearBase)


//class fairygui.gears.GearIcon extends fairygui.gears.GearBase
var GearIcon=(function(_super){
	function GearIcon(owner){
		this._storage=null;
		this._default=null;
		GearIcon.__super.call(this,owner);
	}

	__class(GearIcon,'fairygui.gears.GearIcon',_super);
	var __proto=GearIcon.prototype;
	__proto.init=function(){
		this._default=this._owner.icon;
		this._storage={};
	}

	__proto.addStatus=function(pageId,buffer){
		if(pageId==null)
			this._default=buffer.readS();
		else
		this._storage[pageId]=buffer.readS();
	}

	__proto.apply=function(){
		this._owner._gearLocked=true;
		var data=this._storage[this._controller.selectedPageId];
		if(data!==undefined)
			this._owner.icon=data;
		else
		this._owner.icon=this._default;
		this._owner._gearLocked=false;
	}

	__proto.updateState=function(){
		this._storage[this._controller.selectedPageId]=this._owner.icon;
	}

	return GearIcon;
})(GearBase)


/**
*<p> <code>Sprite</code> 是基本的显示图形的显示列表节点。 <code>Sprite</code> 默认没有宽高，默认不接受鼠标事件。通过 <code>graphics</code> 可以绘制图片或者矢量图，支持旋转，缩放，位移等操作。<code>Sprite</code>同时也是容器类，可用来添加多个子节点。</p>
*<p>注意： <code>Sprite</code> 默认没有宽高，可以通过<code>getBounds</code>函数获取；也可手动设置宽高；还可以设置<code>autoSize=true</code>，然后再获取宽高。<code>Sprite</code>的宽高一般用于进行碰撞检测和排版，并不影响显示图像大小，如果需要更改显示图像大小，请使用 <code>scaleX</code> ， <code>scaleY</code> ， <code>scale</code>。</p>
*<p> <code>Sprite</code> 默认不接受鼠标事件，即<code>mouseEnabled=false</code>，但是只要对其监听任意鼠标事件，会自动打开自己以及所有父对象的<code>mouseEnabled=true</code>。所以一般也无需手动设置<code>mouseEnabled</code>。</p>
*<p>LayaAir引擎API设计精简巧妙。核心显示类只有一个<code>Sprite</code>。<code>Sprite</code>针对不同的情况做了渲染优化，所以保证一个类实现丰富功能的同时，又达到高性能。</p>
*
*@example <caption>创建了一个 <code>Sprite</code> 实例。</caption>
*package
*{
	*import laya.display.Sprite;
	*import laya.events.Event;
	*
	*public class Sprite_Example
	*{
		*private var sprite:Sprite;
		*private var shape:Sprite
		*public function Sprite_Example()
		*{
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*onInit();
			*}
		*private function onInit():void
		*{
			*sprite=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
			*sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
			*sprite.x=200;//设置 sprite 对象相对于父容器的水平方向坐标值。
			*sprite.y=200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
			*sprite.pivotX=0;//设置 sprite 对象的水平方法轴心点坐标。
			*sprite.pivotY=0;//设置 sprite 对象的垂直方法轴心点坐标。
			*Laya.stage.addChild(sprite);//将此 sprite 对象添加到显示列表。
			*sprite.on(Event.CLICK,this,onClickSprite);//给 sprite 对象添加点击事件侦听。
			*shape=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
			*shape.graphics.drawRect(0,0,100,100,"#ccff00","#ff0000",2);//绘制一个有边框的填充矩形。
			*shape.x=400;//设置 shape 对象相对于父容器的水平方向坐标值。
			*shape.y=200;//设置 shape 对象相对于父容器的垂直方向坐标值。
			*shape.width=100;//设置 shape 对象的宽度。
			*shape.height=100;//设置 shape 对象的高度。
			*shape.pivotX=50;//设置 shape 对象的水平方法轴心点坐标。
			*shape.pivotY=50;//设置 shape 对象的垂直方法轴心点坐标。
			*Laya.stage.addChild(shape);//将此 shape 对象添加到显示列表。
			*shape.on(Event.CLICK,this,onClickShape);//给 shape 对象添加点击事件侦听。
			*}
		*private function onClickSprite():void
		*{
			*trace("点击 sprite 对象。");
			*sprite.rotation+=5;//旋转 sprite 对象。
			*}
		*private function onClickShape():void
		*{
			*trace("点击 shape 对象。");
			*shape.rotation+=5;//旋转 shape 对象。
			*}
		*}
	*}
*
*@example
*var sprite;
*var shape;
*Sprite_Example();
*function Sprite_Example()
*{
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*onInit();
	*}
*function onInit()
*{
	*sprite=new laya.display.Sprite();//创建一个 Sprite 类的实例对象 sprite 。
	*sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
	*sprite.x=200;//设置 sprite 对象相对于父容器的水平方向坐标值。
	*sprite.y=200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
	*sprite.pivotX=0;//设置 sprite 对象的水平方法轴心点坐标。
	*sprite.pivotY=0;//设置 sprite 对象的垂直方法轴心点坐标。
	*Laya.stage.addChild(sprite);//将此 sprite 对象添加到显示列表。
	*sprite.on(Event.CLICK,this,onClickSprite);//给 sprite 对象添加点击事件侦听。
	*shape=new laya.display.Sprite();//创建一个 Sprite 类的实例对象 sprite 。
	*shape.graphics.drawRect(0,0,100,100,"#ccff00","#ff0000",2);//绘制一个有边框的填充矩形。
	*shape.x=400;//设置 shape 对象相对于父容器的水平方向坐标值。
	*shape.y=200;//设置 shape 对象相对于父容器的垂直方向坐标值。
	*shape.width=100;//设置 shape 对象的宽度。
	*shape.height=100;//设置 shape 对象的高度。
	*shape.pivotX=50;//设置 shape 对象的水平方法轴心点坐标。
	*shape.pivotY=50;//设置 shape 对象的垂直方法轴心点坐标。
	*Laya.stage.addChild(shape);//将此 shape 对象添加到显示列表。
	*shape.on(laya.events.Event.CLICK,this,onClickShape);//给 shape 对象添加点击事件侦听。
	*}
*function onClickSprite()
*{
	*console.log("点击 sprite 对象。");
	*sprite.rotation+=5;//旋转 sprite 对象。
	*}
*function onClickShape()
*{
	*console.log("点击 shape 对象。");
	*shape.rotation+=5;//旋转 shape 对象。
	*}
*
*@example
*import Sprite=laya.display.Sprite;
*class Sprite_Example {
	*private sprite:Sprite;
	*private shape:Sprite
	*public Sprite_Example(){
		*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
		*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
		*this.onInit();
		*}
	*private onInit():void {
		*this.sprite=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
		*this.sprite.loadImage("resource/ui/bg.png");//加载并显示图片。
		*this.sprite.x=200;//设置 sprite 对象相对于父容器的水平方向坐标值。
		*this.sprite.y=200;//设置 sprite 对象相对于父容器的垂直方向坐标值。
		*this.sprite.pivotX=0;//设置 sprite 对象的水平方法轴心点坐标。
		*this.sprite.pivotY=0;//设置 sprite 对象的垂直方法轴心点坐标。
		*Laya.stage.addChild(this.sprite);//将此 sprite 对象添加到显示列表。
		*this.sprite.on(laya.events.Event.CLICK,this,this.onClickSprite);//给 sprite 对象添加点击事件侦听。
		*this.shape=new Sprite();//创建一个 Sprite 类的实例对象 sprite 。
		*this.shape.graphics.drawRect(0,0,100,100,"#ccff00","#ff0000",2);//绘制一个有边框的填充矩形。
		*this.shape.x=400;//设置 shape 对象相对于父容器的水平方向坐标值。
		*this.shape.y=200;//设置 shape 对象相对于父容器的垂直方向坐标值。
		*this.shape.width=100;//设置 shape 对象的宽度。
		*this.shape.height=100;//设置 shape 对象的高度。
		*this.shape.pivotX=50;//设置 shape 对象的水平方法轴心点坐标。
		*this.shape.pivotY=50;//设置 shape 对象的垂直方法轴心点坐标。
		*Laya.stage.addChild(this.shape);//将此 shape 对象添加到显示列表。
		*this.shape.on(laya.events.Event.CLICK,this,this.onClickShape);//给 shape 对象添加点击事件侦听。
		*}
	*private onClickSprite():void {
		*console.log("点击 sprite 对象。");
		*this.sprite.rotation+=5;//旋转 sprite 对象。
		*}
	*private onClickShape():void {
		*console.log("点击 shape 对象。");
		*this.shape.rotation+=5;//旋转 shape 对象。
		*}
	*}
*/
//class laya.display.Sprite extends laya.display.Node
var Sprite=(function(_super){
	function Sprite(){
		/**@private 矩阵变换信息。*/
		this._transform=null;
		/**@private */
		this._tfChanged=false;
		/**@private */
		this._x=0;
		/**@private */
		this._y=0;
		/**@private */
		this._width=0;
		/**@private */
		this._height=0;
		/**@private */
		this._repaint=1;
		/**@private 鼠标状态，0:auto,1:mouseEnabled=false,2:mouseEnabled=true。*/
		this._mouseEnableState=0;
		/**@private Z排序，数值越大越靠前。*/
		this._zOrder=0;
		/**@private */
		this._graphics=null;
		/**@private */
		this._renderType=0;
		/**@private */
		this._optimizeScrollRect=false;
		/**@private */
		this._texture=null;
		/**
		*<p>鼠标事件与此对象的碰撞检测是否可穿透。碰撞检测发生在鼠标事件的捕获阶段，此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象。</p>
		*<p>穿透表示鼠标事件发生的位置处于本对象绘图区域内时，才算命中，而与对象宽高和值为Rectangle对象的hitArea属性无关。如果sprite.hitArea值是HitArea对象，表示显式声明了此对象的鼠标事件响应区域，而忽略对象的宽高、mouseThrough属性。</p>
		*<p>影响对象鼠标事件响应区域的属性为：width、height、hitArea，优先级顺序为：hitArea(type:HitArea)>hitArea(type:Rectangle)>width/height。</p>
		*@default false 不可穿透，此对象的鼠标响应区域由width、height、hitArea属性决定。</p>
		*/
		this.mouseThrough=false;
		/**
		*<p>指定是否自动计算宽高数据。默认值为 false 。</p>
		*<p>Sprite宽高默认为0，并且不会随着绘制内容的变化而变化，如果想根据绘制内容获取宽高，可以设置本属性为true，或者通过getBounds方法获取。设置为true，对性能有一定影响。</p>
		*/
		this.autoSize=false;
		/**
		*<p>指定鼠标事件检测是优先检测自身，还是优先检测其子对象。鼠标事件检测发生在鼠标事件的捕获阶段，此阶段引擎会从stage开始递归检测stage及其子对象，直到找到命中的目标对象或者未命中任何对象。</p>
		*<p>如果为false，优先检测子对象，当有子对象被命中时，中断检测，获得命中目标。如果未命中任何子对象，最后再检测此对象；如果为true，则优先检测本对象，如果本对象没有被命中，直接中断检测，表示没有命中目标；如果本对象被命中，则进一步递归检测其子对象，以确认最终的命中目标。</p>
		*<p>合理使用本属性，能减少鼠标事件检测的节点，提高性能。可以设置为true的情况：开发者并不关心此节点的子节点的鼠标事件检测结果，也就是以此节点作为其子节点的鼠标事件检测依据。</p>
		*<p>Stage对象和UI的View组件默认为true。</p>
		*@default false 优先检测此对象的子对象，当递归检测完所有子对象后，仍然没有找到目标对象，最后再检测此对象。
		*/
		this.hitTestPrior=false;
		/**
		*<p>视口大小，视口外的子对象，将不被渲染(如果想实现裁剪效果，请使用srollRect)，合理使用能提高渲染性能。比如由一个个小图片拼成的地图块，viewport外面的小图片将不渲染</p>
		*<p>srollRect和viewport的区别：<br/>
		*1. srollRect自带裁剪效果，viewport只影响子对象渲染是否渲染，不具有裁剪效果（性能更高）。<br/>
		*2. 设置rect的x,y属性均能实现区域滚动效果，但scrollRect会保持0,0点位置不变。</p>
		*@default null
		*/
		this.viewport=null;
		Sprite.__super.call(this);
		this._style=Style.EMPTY;
	}

	__class(Sprite,'laya.display.Sprite',_super);
	var __proto=Sprite.prototype;
	Laya.imps(__proto,{"laya.display.ILayout":true})
	/**@private */
	__proto.createConchModel=function(){
		return new ConchNode();
	}

	/**@inheritDoc */
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		this._releaseMem();
		_super.prototype.destroy.call(this,destroyChild);
		this._style && this._style.destroy();
		this._transform && this._transform.destroy();
		this._transform=null;
		this._style=null;
		this._graphics=null;
	}

	/**根据zOrder进行重新排序。*/
	__proto.updateZOrder=function(){
		Utils.updateOrder(this._childs)&& this.repaint();
	}

	/**在设置cacheAs的情况下，调用此方法会重新刷新缓存。*/
	__proto.reCache=function(){
		if (this._$P.cacheCanvas)this._$P.cacheCanvas.reCache=true;
		this._repaint=1;
	}

	/**
	*<p>设置对象在自身坐标系下的边界范围。与 <code>getSelfBounds</code> 对应。当 autoSize==true 时，会影响对象宽高。设置后，当需要获取自身边界范围时，就不再需要计算，合理使用能提高性能。比如 <code>getBounds</code> 会优先使用 <code>setBounds</code> 指定的值，如果没有指定则进行计算，此计算会对性能消耗比较大。</p>
	*<p><b>注意：</b> <code>setBounds</code> 与 <code>getBounds</code> 并非对应相等关系， <code>getBounds</code> 获取的是本对象在父容器坐标系下的边界范围，通过设置 <code>setBounds</code> 会影响 <code>getBounds</code> 的结果。</p>
	*@param bound bounds矩形区域
	*/
	__proto.setBounds=function(bound){
		this._set$P("uBounds",bound);
	}

	/**
	*<p>获取本对象在父容器坐标系的矩形显示区域。</p>
	*<p><b>注意：</b> 1.计算量较大，尽量少用，如果需要频繁使用，可以通过手动设置 <code>setBounds</code> 来缓存自身边界信息，从而避免比较消耗性能的计算。2. <code>setBounds</code> 与 <code>getBounds</code> 并非对应相等关系， <code>getBounds</code> 获取的是本对象在父容器坐标系下的边界范围，通过设置 <code>setBounds</code> 会影响 <code>getBounds</code> 的结果。</p>
	*@return 矩形区域。
	*/
	__proto.getBounds=function(){
		if (!this._$P.mBounds)this._set$P("mBounds",new Rectangle());
		return Rectangle._getWrapRec(this._boundPointsToParent(),this._$P.mBounds);
	}

	/**
	*获取对象在自身坐标系的边界范围。与 <code>setBounds</code> 对应。
	*<p><b>注意：</b>计算量较大，尽量少用，如果需要频繁使用，可以提前手动设置 <code>setBounds</code> 来缓存自身边界信息，从而避免比较消耗性能的计算。</p>
	*@return 矩形区域。
	*/
	__proto.getSelfBounds=function(){
		if (this._$P.uBounds)return this._$P.uBounds;
		if (!this._$P.mBounds)this._set$P("mBounds",new Rectangle());
		return Rectangle._getWrapRec(this._getBoundPointsM(false),this._$P.mBounds);
	}

	/**
	*@private
	*获取本对象在父容器坐标系的显示区域多边形顶点列表。
	*当显示对象链中有旋转时，返回多边形顶点列表，无旋转时返回矩形的四个顶点。
	*@param ifRotate （可选）之前的对象链中是否有旋转。
	*@return 顶点列表。结构：[x1,y1,x2,y2,x3,y3,...]。
	*/
	__proto._boundPointsToParent=function(ifRotate){
		(ifRotate===void 0)&& (ifRotate=false);
		var pX=0,pY=0;
		if (this._style){
			pX=this._style._tf.translateX;
			pY=this._style._tf.translateY;
			ifRotate=ifRotate || (this._style._tf.rotate!==0);
			if (this._style.scrollRect){
				pX+=this._style.scrollRect.x;
				pY+=this._style.scrollRect.y;
			}
		};
		var pList=this._getBoundPointsM(ifRotate);
		if (!pList || pList.length < 1)return pList;
		if (pList.length !=8){
			pList=ifRotate ? GrahamScan.scanPList(pList):Rectangle._getWrapRec(pList,Rectangle.TEMP)._getBoundPoints();
		}
		if (!this.transform){
			Utils.transPointList(pList,this._x-pX,this._y-pY);
			return pList;
		};
		var tPoint=Point.TEMP;
		var i=0,len=pList.length;
		for (i=0;i < len;i+=2){
			tPoint.x=pList[i];
			tPoint.y=pList[i+1];
			this.toParentPoint(tPoint);
			pList[i]=tPoint.x;
			pList[i+1]=tPoint.y;
		}
		return pList;
	}

	/**
	*返回此实例中的绘图对象（ <code>Graphics</code> ）的显示区域，不包括子对象。
	*@param realSize （可选）使用图片的真实大小，默认为false
	*@return 一个 Rectangle 对象，表示获取到的显示区域。
	*/
	__proto.getGraphicBounds=function(realSize){
		(realSize===void 0)&& (realSize=false);
		if (!this._graphics)return Rectangle.TEMP.setTo(0,0,0,0);
		return this._graphics.getBounds(realSize);
	}

	/**
	*@private
	*获取自己坐标系的显示区域多边形顶点列表
	*@param ifRotate （可选）当前的显示对象链是否由旋转
	*@return 顶点列表。结构：[x1,y1,x2,y2,x3,y3,...]。
	*/
	__proto._getBoundPointsM=function(ifRotate){
		(ifRotate===void 0)&& (ifRotate=false);
		if (this._$P.uBounds)return this._$P.uBounds._getBoundPoints();
		if (!this._$P.temBM)this._set$P("temBM",[]);
		if (this.scrollRect){
			var rst=Utils.clearArray(this._$P.temBM);
			var rec=Rectangle.TEMP;
			rec.copyFrom(this.scrollRect);
			Utils.concatArray(rst,rec._getBoundPoints());
			return rst;
		};
		var pList=this._graphics ? this._graphics.getBoundPoints():Utils.clearArray(this._$P.temBM);
		var child;
		var cList;
		var __childs;
		__childs=this._childs;
		for (var i=0,n=__childs.length;i < n;i++){
			child=__childs [i];
			if ((child instanceof laya.display.Sprite )&& child.visible==true){
				cList=child._boundPointsToParent(ifRotate);
				if (cList)
					pList=pList ? Utils.concatArray(pList,cList):cList;
			}
		}
		return pList;
	}

	/**
	*@private
	*获取样式。
	*@return 样式 Style 。
	*/
	__proto.getStyle=function(){
		this._style===Style.EMPTY && (this._style=new Style());
		return this._style;
	}

	/**
	*@private
	*设置样式。
	*@param value 样式。
	*/
	__proto.setStyle=function(value){
		this._style=value;
	}

	/**@private */
	__proto._adjustTransform=function(){
		this._tfChanged=false;
		var style=this._style;
		var tf=style._tf;
		var sx=tf.scaleX,sy=tf.scaleY;
		var m;
		if (tf.rotate || sx!==1 || sy!==1 || tf.skewX || tf.skewY){
			m=this._transform || (this._transform=Matrix.create());
			m.bTransform=true;
			var skx=(tf.rotate-tf.skewX)*0.0174532922222222;
			var sky=(tf.rotate+tf.skewY)*0.0174532922222222;
			var cx=Math.cos(sky);
			var ssx=Math.sin(sky);
			var cy=Math.sin(skx);
			var ssy=Math.cos(skx);
			m.a=sx *cx;
			m.b=sx *ssx;
			m.c=-sy *cy;
			m.d=sy *ssy;
			m.tx=m.ty=0;
			return m;
			}else {
			this._transform && this._transform.destroy();
			this._transform=null;
			this._renderType &=~0x04;
		}
		return m;
	}

	/**
	*<p>设置坐标位置。相当于分别设置x和y属性。</p>
	*<p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.pos(...).scale(...);</p>
	*@param x X轴坐标。
	*@param y Y轴坐标。
	*@param speedMode （可选）是否极速模式，正常是调用this.x=value进行赋值，极速模式直接调用内部函数处理，如果未重写x,y属性，建议设置为急速模式性能更高。
	*@return 返回对象本身。
	*/
	__proto.pos=function(x,y,speedMode){
		(speedMode===void 0)&& (speedMode=false);
		if (this._x!==x || this._y!==y){
			if (this.destroyed)return this;
			if (speedMode){
				this._x=x;
				this._y=y;
				this.conchModel && this.conchModel.pos(this._x,this._y);
				var p=this._parent;
				if (p && p._repaint===0){
					p._repaint=1;
					p.parentRepaint();
				}
				if (this._$P.maskParent && this._$P.maskParent._repaint===0){
					this._$P.maskParent._repaint=1;
					this._$P.maskParent.parentRepaint();
				}
				}else {
				this.x=x;
				this.y=y;
			}
		}
		return this;
	}

	/**
	*<p>设置轴心点。相当于分别设置pivotX和pivotY属性。</p>
	*<p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.pivot(...).pos(...);</p>
	*@param x X轴心点。
	*@param y Y轴心点。
	*@return 返回对象本身。
	*/
	__proto.pivot=function(x,y){
		this.pivotX=x;
		this.pivotY=y;
		return this;
	}

	/**
	*<p>设置宽高。相当于分别设置width和height属性。</p>
	*<p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.size(...).pos(...);</p>
	*@param width 宽度值。
	*@param hegiht 高度值。
	*@return 返回对象本身。
	*/
	__proto.size=function(width,height){
		this.width=width;
		this.height=height;
		return this;
	}

	/**
	*<p>设置缩放。相当于分别设置scaleX和scaleY属性。</p>
	*<p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.scale(...).pos(...);</p>
	*@param scaleX X轴缩放比例。
	*@param scaleY Y轴缩放比例。
	*@param speedMode （可选）是否极速模式，正常是调用this.scaleX=value进行赋值，极速模式直接调用内部函数处理，如果未重写scaleX,scaleY属性，建议设置为急速模式性能更高。
	*@return 返回对象本身。
	*/
	__proto.scale=function(scaleX,scaleY,speedMode){
		(speedMode===void 0)&& (speedMode=false);
		var style=this.getStyle();
		var _tf=style._tf;
		if (_tf.scaleX !=scaleX || _tf.scaleY !=scaleY){
			if (this.destroyed)return this;
			if (speedMode){
				style.setScale(scaleX,scaleY);
				this._tfChanged=true;
				this.conchModel && this.conchModel.scale(scaleX,scaleY);
				this._renderType |=0x04;
				var p=this._parent;
				if (p && p._repaint===0){
					p._repaint=1;
					p.parentRepaint();
				}
				}else {
				this.scaleX=scaleX;
				this.scaleY=scaleY;
			}
		}
		return this;
	}

	/**
	*<p>设置倾斜角度。相当于分别设置skewX和skewY属性。</p>
	*<p>因为返回值为Sprite对象本身，所以可以使用如下语法：spr.skew(...).pos(...);</p>
	*@param skewX 水平倾斜角度。
	*@param skewY 垂直倾斜角度。
	*@return 返回对象本身
	*/
	__proto.skew=function(skewX,skewY){
		this.skewX=skewX;
		this.skewY=skewY;
		return this;
	}

	/**
	*更新、呈现显示对象。由系统调用。
	*@param context 渲染的上下文引用。
	*@param x X轴坐标。
	*@param y Y轴坐标。
	*/
	__proto.render=function(context,x,y){
		Stat.spriteCount++;
		RenderSprite.renders[this._renderType]._fun(this,context,x+this._x,y+this._y);
		this._repaint=0;
	}

	/**
	*<p>绘制 当前<code>Sprite</code> 到 <code>Canvas</code> 上，并返回一个HtmlCanvas。</p>
	*<p>绘制的结果可以当作图片源，再次绘制到其他Sprite里面，示例：</p>
	*
	*var htmlCanvas:HTMLCanvas=sprite.drawToCanvas(100,100,0,0);//把精灵绘制到canvas上面
	*var texture:Texture=new Texture(htmlCanvas);//使用htmlCanvas创建Texture
	*var sp:Sprite=new Sprite().pos(0,200);//创建精灵并把它放倒200位置
	*sp.graphics.drawTexture(texture);//把截图绘制到精灵上
	*Laya.stage.addChild(sp);//把精灵显示到舞台
	*
	*<p>也可以获取原始图片数据，分享到网上，从而实现截图效果，示例：</p>
	*
	*var htmlCanvas:HTMLCanvas=sprite.drawToCanvas(100,100,0,0);//把精灵绘制到canvas上面
	*
	*htmlCanvas.toBase64("image/png",0.92,function(base64){//webgl和canvas模式下为同步方法，加速器下是异步方法
		*trace(base64);//打印图片base64信息，可以发给服务器或者保存为图片
		*});
	*
	*@param canvasWidth 画布宽度。
	*@param canvasHeight 画布高度。
	*@param x 绘制的 X 轴偏移量。
	*@param y 绘制的 Y 轴偏移量。
	*@return HTMLCanvas 对象。
	*/
	__proto.drawToCanvas=function(canvasWidth,canvasHeight,offsetX,offsetY){
		if (Render.isConchNode){
			var canvas=HTMLCanvas.create("2D");
			var context=new RenderContext(canvasWidth,canvasHeight,canvas);
			context.ctx.setCanvasType(1);
			this.conchModel.drawToCanvas(canvas.source,offsetX,offsetY);
			return canvas;
			}else {
			return RunDriver.drawToCanvas(this,this._renderType,canvasWidth,canvasHeight,offsetX,offsetY);
		}
	}

	/**
	*<p>自定义更新、呈现显示对象。一般用来扩展渲染模式，请合理使用，可能会导致在加速器上无法渲染。</p>
	*<p><b>注意</b>不要在此函数内增加或删除树节点，否则会对树节点遍历造成影响。</p>
	*@param context 渲染的上下文引用。
	*@param x X轴坐标。
	*@param y Y轴坐标。
	*/
	__proto.customRender=function(context,x,y){
		this._renderType |=0x400;
	}

	/**
	*@private
	*应用滤镜。
	*/
	__proto._applyFilters=function(){
		if (Render.isWebGL)return;
		var _filters;
		_filters=this._$P.filters;
		if (!_filters || _filters.length < 1)return;
		for (var i=0,n=_filters.length;i < n;i++){
			_filters[i].action.apply(this._$P.cacheCanvas);
		}
	}

	/**
	*@private
	*查看当前原件中是否包含发光滤镜。
	*@return 一个 Boolean 值，表示当前原件中是否包含发光滤镜。
	*/
	__proto._isHaveGlowFilter=function(){
		var i=0,len=0;
		if (this.filters){
			for (i=0;i < this.filters.length;i++){
				if (this.filters[i].type==0x08){
					return true;
				}
			}
		}
		for (i=0,len=this._childs.length;i < len;i++){
			if (this._childs[i]._isHaveGlowFilter()){
				return true;
			}
		}
		return false;
	}

	/**
	*把本地坐标转换为相对stage的全局坐标。
	*@param point 本地坐标点。
	*@param createNewPoint （可选）是否创建一个新的Point对象作为返回值，默认为false，使用输入的point对象返回，减少对象创建开销。
	*@return 转换后的坐标的点。
	*/
	__proto.localToGlobal=function(point,createNewPoint){
		(createNewPoint===void 0)&& (createNewPoint=false);
		if (createNewPoint===true){
			point=new Point(point.x,point.y);
		};
		var ele=this;
		while (ele){
			if (ele==Laya.stage)break ;
			point=ele.toParentPoint(point);
			ele=ele.parent;
		}
		return point;
	}

	/**
	*把stage的全局坐标转换为本地坐标。
	*@param point 全局坐标点。
	*@param createNewPoint （可选）是否创建一个新的Point对象作为返回值，默认为false，使用输入的point对象返回，减少对象创建开销。
	*@return 转换后的坐标的点。
	*/
	__proto.globalToLocal=function(point,createNewPoint){
		(createNewPoint===void 0)&& (createNewPoint=false);
		if (createNewPoint){
			point=new Point(point.x,point.y);
		};
		var ele=this;
		var list=[];
		while (ele){
			if (ele==Laya.stage)break ;
			list.push(ele);
			ele=ele.parent;
		};
		var i=list.length-1;
		while (i >=0){
			ele=list[i];
			point=ele.fromParentPoint(point);
			i--;
		}
		return point;
	}

	/**
	*将本地坐标系坐标转转换到父容器坐标系。
	*@param point 本地坐标点。
	*@return 转换后的点。
	*/
	__proto.toParentPoint=function(point){
		if (!point)return point;
		point.x-=this.pivotX;
		point.y-=this.pivotY;
		if (this.transform){
			this._transform.transformPoint(point);
		}
		point.x+=this._x;
		point.y+=this._y;
		var scroll=this._style.scrollRect;
		if (scroll){
			point.x-=scroll.x;
			point.y-=scroll.y;
		}
		return point;
	}

	/**
	*将父容器坐标系坐标转换到本地坐标系。
	*@param point 父容器坐标点。
	*@return 转换后的点。
	*/
	__proto.fromParentPoint=function(point){
		if (!point)return point;
		point.x-=this._x;
		point.y-=this._y;
		var scroll=this._style.scrollRect;
		if (scroll){
			point.x+=scroll.x;
			point.y+=scroll.y;
		}
		if (this.transform){
			this._transform.invertTransformPoint(point);
		}
		point.x+=this.pivotX;
		point.y+=this.pivotY;
		return point;
	}

	/**
	*<p>增加事件侦听器，以使侦听器能够接收事件通知。</p>
	*<p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.on=function(type,caller,listener,args){
		if (this._mouseEnableState!==1 && this.isMouseEvent(type)){
			this.mouseEnabled=true;
			this._setBit(0x2,true);
			if (this._parent){
				this._$2__onDisplay();
			}
			return this._createListener(type,caller,listener,args,false);
		}
		return _super.prototype.on.call(this,type,caller,listener,args);
	}

	/**
	*<p>增加事件侦听器，以使侦听器能够接收事件通知，此侦听事件响应一次后则自动移除侦听。</p>
	*<p>如果侦听鼠标事件，则会自动设置自己和父亲节点的属性 mouseEnabled 的值为 true(如果父节点mouseEnabled=false，则停止设置父节点mouseEnabled属性)。</p>
	*@param type 事件的类型。
	*@param caller 事件侦听函数的执行域。
	*@param listener 事件侦听函数。
	*@param args （可选）事件侦听函数的回调参数。
	*@return 此 EventDispatcher 对象。
	*/
	__proto.once=function(type,caller,listener,args){
		if (this._mouseEnableState!==1 && this.isMouseEvent(type)){
			this.mouseEnabled=true;
			this._setBit(0x2,true);
			if (this._parent){
				this._$2__onDisplay();
			}
			return this._createListener(type,caller,listener,args,true);
		}
		return _super.prototype.once.call(this,type,caller,listener,args);
	}

	/**@private */
	__proto._$2__onDisplay=function(){
		if (this._mouseEnableState!==1){
			var ele=this;
			ele=ele.parent;
			while (ele && ele._mouseEnableState!==1){
				if (ele._getBit(0x2))break ;
				ele.mouseEnabled=true;
				ele._setBit(0x2,true);
				ele=ele.parent;
			}
		}
	}

	/**
	*<p>加载并显示一个图片。功能等同于graphics.loadImage方法。支持异步加载。</p>
	*<p>注意：多次调用loadImage绘制不同的图片，会同时显示。</p>
	*@param url 图片地址。
	*@param x （可选）显示图片的x位置。
	*@param y （可选）显示图片的y位置。
	*@param width （可选）显示图片的宽度，设置为0表示使用图片默认宽度。
	*@param height （可选）显示图片的高度，设置为0表示使用图片默认高度。
	*@param complete （可选）加载完成回调。
	*@return 返回精灵对象本身。
	*/
	__proto.loadImage=function(url,x,y,width,height,complete){
		var _$this=this;
		(x===void 0)&& (x=0);
		(y===void 0)&& (y=0);
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		function loaded (tex){
			if (!_$this.destroyed){
				_$this.size(x+(width || tex.width),y+(height || tex.height));
				_$this.repaint();
				complete && complete.runWith(tex);
			}
		}
		this.graphics.loadImage(url,x,y,width,height,loaded);
		return this;
	}

	/**cacheAs后，设置自己和父对象缓存失效。*/
	__proto.repaint=function(){
		this.conchModel && this.conchModel.repaint && this.conchModel.repaint();
		if (this._repaint===0){
			this._repaint=1;
			this.parentRepaint();
		}
		if (this._$P && this._$P.maskParent){
			this._$P.maskParent.repaint();
		}
	}

	/**
	*@private
	*获取是否重新缓存。
	*@return 如果重新缓存值为 true，否则值为 false。
	*/
	__proto._needRepaint=function(){
		return (this._repaint!==0)&& this._$P.cacheCanvas && this._$P.cacheCanvas.reCache;
	}

	/**@private */
	__proto._childChanged=function(child){
		if (this._childs.length)this._renderType |=0x800;
		else this._renderType &=~0x800;
		if (child && this._get$P("hasZorder"))Laya.timer.callLater(this,this.updateZOrder);
		this.repaint();
	}

	/**cacheAs时，设置所有父对象缓存失效。 */
	__proto.parentRepaint=function(){
		var p=this._parent;
		if (p && p._repaint===0){
			p._repaint=1;
			p.parentRepaint();
		}
	}

	/**
	*开始拖动此对象。
	*@param area （可选）拖动区域，此区域为当前对象注册点活动区域（不包括对象宽高），可选。
	*@param hasInertia （可选）鼠标松开后，是否还惯性滑动，默认为false，可选。
	*@param elasticDistance （可选）橡皮筋效果的距离值，0为无橡皮筋效果，默认为0，可选。
	*@param elasticBackTime （可选）橡皮筋回弹时间，单位为毫秒，默认为300毫秒，可选。
	*@param data （可选）拖动事件携带的数据，可选。
	*@param disableMouseEvent （可选）禁用其他对象的鼠标检测，默认为false，设置为true能提高性能。
	*@param ratio （可选）惯性阻尼系数，影响惯性力度和时长。
	*/
	__proto.startDrag=function(area,hasInertia,elasticDistance,elasticBackTime,data,disableMouseEvent,ratio){
		(hasInertia===void 0)&& (hasInertia=false);
		(elasticDistance===void 0)&& (elasticDistance=0);
		(elasticBackTime===void 0)&& (elasticBackTime=300);
		(disableMouseEvent===void 0)&& (disableMouseEvent=false);
		(ratio===void 0)&& (ratio=0.92);
		this._$P.dragging || (this._set$P("dragging",new Dragging()));
		this._$P.dragging.start(this,area,hasInertia,elasticDistance,elasticBackTime,data,disableMouseEvent,ratio);
	}

	/**停止拖动此对象。*/
	__proto.stopDrag=function(){
		this._$P.dragging && this._$P.dragging.stop();
	}

	__proto._releaseMem=function(){
		if (!this._$P)return;
		var cc=this._$P.cacheCanvas;
		if (cc && cc.ctx){
			Pool.recover("RenderContext",cc.ctx);
			cc.ctx.canvas.size(0,0);
			cc.ctx=null;
		};
		var fc=this._$P._filterCache;
		if (fc){
			fc.destroy();
			fc.recycle();
			this._set$P('_filterCache',null);
		}
		this._$P._isHaveGlowFilter && this._set$P('_isHaveGlowFilter',false);
		this._$P._isHaveGlowFilter=null;
	}

	/**@private */
	__proto._setDisplay=function(value){
		if (!value)this._releaseMem();
		_super.prototype._setDisplay.call(this,value);
	}

	/**
	*检测某个点是否在此对象内。
	*@param x 全局x坐标。
	*@param y 全局y坐标。
	*@return 表示是否在对象内。
	*/
	__proto.hitTestPoint=function(x,y){
		var point=this.globalToLocal(Point.TEMP.setTo(x,y));
		x=point.x;
		y=point.y;
		var rect=this._$P.hitArea ? this._$P.hitArea :(this._width > 0 && this._height > 0)? Rectangle.TEMP.setTo(0,0,this._width,this._height):this.getSelfBounds();
		return rect.contains(x,y);
	}

	/**获得相对于本对象上的鼠标坐标信息。*/
	__proto.getMousePoint=function(){
		return this.globalToLocal(Point.TEMP.setTo(Laya.stage.mouseX,Laya.stage.mouseY));
	}

	/**@private */
	__proto._getWords=function(){
		return null;
	}

	/**@private */
	__proto._addChildsToLayout=function(out){
		var words=this._getWords();
		if (words==null && this._childs.length==0)return false;
		if (words){
			for (var i=0,n=words.length;i < n;i++){
				out.push(words[i]);
			}
		}
		this._childs.forEach(function(o,index,array){
			o._style._enableLayout()&& o._addToLayout(out);
		});
		return true;
	}

	/**@private */
	__proto._addToLayout=function(out){
		if (this._style.absolute)return;
		this._style.block ? out.push(this):(this._addChildsToLayout(out)&& (this.x=this.y=0));
	}

	/**@private */
	__proto._isChar=function(){
		return false;
	}

	/**@private */
	__proto._getCSSStyle=function(){
		return this._style.getCSSStyle();
	}

	/**
	*@private
	*设置指定属性名的属性值。
	*@param name 属性名。
	*@param value 属性值。
	*/
	__proto._setAttributes=function(name,value){
		switch (name){
			case 'x':
				this.x=parseFloat(value);
				break ;
			case 'y':
				this.y=parseFloat(value);
				break ;
			case 'width':
				this.width=parseFloat(value);
				break ;
			case 'height':
				this.height=parseFloat(value);
				break ;
			default :
				this[name]=value;
			}
	}

	/**
	*@private
	*/
	__proto._layoutLater=function(){
		this.parent && (this.parent)._layoutLater();
	}

	/**设置一个Texture实例，并显示此图片（如果之前有其他绘制，则会被清除掉）。等同于graphics.clear();graphics.drawTexture()*/
	__getset(0,__proto,'texture',function(){
		return this._texture;
		},function(value){
		if (this._texture !=value){
			this._texture=value;
			this.graphics.cleanByTexture(value,0,0);
		}
	});

	/**
	*返回鼠标在此对象坐标系上的 Y 轴坐标信息。
	*/
	__getset(0,__proto,'mouseY',function(){
		return this.getMousePoint().y;
	});

	/**
	*获得相对于stage的全局X轴缩放值（会叠加父亲节点的缩放值）。
	*/
	__getset(0,__proto,'globalScaleX',function(){
		var scale=1;
		var ele=this;
		while (ele){
			if (ele===Laya.stage)break ;
			scale *=ele.scaleX;
			ele=ele.parent;
		}
		return scale;
	});

	/**
	*是否接受鼠标事件。
	*默认为false，如果监听鼠标事件，则会自动设置本对象及父节点的属性 mouseEnable 的值都为 true（如果父节点手动设置为false，则不会更改）。
	**/
	__getset(0,__proto,'mouseEnabled',function(){
		return this._mouseEnableState > 1;
		},function(value){
		this._mouseEnableState=value ? 2 :1;
	});

	/**
	*<p>遮罩，可以设置一个对象(支持位图和矢量图)，根据对象形状进行遮罩显示。</p>
	*<p>【注意】遮罩对象坐标系是相对遮罩对象本身的，和Flash机制不同</p>
	*/
	__getset(0,__proto,'mask',function(){
		return this._$P._mask;
		},function(value){
		if (value && this.mask && this.mask._$P.maskParent)return;
		if (value){
			this.cacheAs="bitmap";
			this._set$P("_mask",value);
			value._set$P("maskParent",this);
			}else {
			this.mask && this.mask._set$P("maskParent",null);
			this._set$P("_mask",value);
			this.cacheAs="none";
		}
		this.conchModel && this.conchModel.mask(value ? value.conchModel :null);
		this._renderType |=0x40;
		this.parentRepaint();
	});

	/**
	*<p>可以设置一个Rectangle区域作为点击区域，或者设置一个<code>HitArea</code>实例作为点击区域，HitArea内可以设置可点击和不可点击区域。</p>
	*<p>如果不设置hitArea，则根据宽高形成的区域进行碰撞。</p>
	*/
	__getset(0,__proto,'hitArea',function(){
		return this._$P.hitArea;
		},function(value){
		this._set$P("hitArea",value);
	});

	/**绘图对象。封装了绘制位图和矢量图的接口，Sprite所有的绘图操作都通过Graphics来实现的。*/
	__getset(0,__proto,'graphics',function(){
		return this._graphics || (this.graphics=RunDriver.createGraphics());
		},function(value){
		if (this._graphics)this._graphics._sp=null;
		this._graphics=value;
		if (value){
			this._renderType &=~0x01;
			this._renderType |=0x200;
			value._sp=this;
			this.conchModel && this.conchModel.graphics(this._graphics);
			}else {
			this._renderType &=~0x200;
			this._renderType &=~0x01;
			if (this.conchModel){
				if (Sprite.RUNTIMEVERION < "0.9.1")
					this.conchModel.removeType(0x100);
				else
				this.conchModel.removeType(0x200);
			}
		}
		this.repaint();
	});

	/**滤镜集合。可以设置多个滤镜组合。*/
	__getset(0,__proto,'filters',function(){
		return this._$P.filters;
		},function(value){
		value && value.length===0 && (value=null);
		if (this._$P.filters==value)return;
		this._set$P("filters",value ? value.slice():null);
		if (Render.isConchApp){
			if (this.conchModel){
				if (Sprite.RUNTIMEVERION < "0.9.1")
					this.conchModel.removeType(0x10);
				else
				this.conchModel.removeType(0x20);
			}
			if (this._$P.filters && this._$P.filters.length==1){
				this._$P.filters[0].callNative(this);
			}
		}
		if (Render.isWebGL){
			if (value && value.length){
				this._renderType |=0x20;
				}else {
				this._renderType &=~0x20;
			}
		}
		if (value && value.length > 0){
			if (!this._getBit(0x1))this._setUpNoticeType(0x1);
			if (!(Render.isWebGL && value.length==1 && (((value[0])instanceof laya.filters.ColorFilter )))){
				if (this.cacheAs !="bitmap"){
					if (!Render.isConchNode)this.cacheAs="bitmap";
					this._set$P("cacheForFilters",true);
				}
				this._set$P("hasFilter",true);
			}
			}else {
			this._set$P("hasFilter",false);
			if (this._$P["cacheForFilters"] && this.cacheAs=="bitmap"){
				this.cacheAs="none";
			}
		}
		this.repaint();
	});

	/**
	*获得相对于stage的全局Y轴缩放值（会叠加父亲节点的缩放值）。
	*/
	__getset(0,__proto,'globalScaleY',function(){
		var scale=1;
		var ele=this;
		while (ele){
			if (ele===Laya.stage)break ;
			scale *=ele.scaleY;
			ele=ele.parent;
		}
		return scale;
	});

	/**透明度，值为0-1，默认值为1，表示不透明。更改alpha值会影响drawcall。*/
	__getset(0,__proto,'alpha',function(){
		return this._style.alpha;
		},function(value){
		if (this._style && this._style.alpha!==value){
			value=value < 0 ? 0 :(value > 1 ? 1 :value);
			this.getStyle().alpha=value;
			this.conchModel && this.conchModel.alpha(value);
			if (value!==1)this._renderType |=0x02;
			else this._renderType &=~0x02;
			this.parentRepaint();
		}
	});

	/**X轴缩放值，默认值为1。设置为负数，可以实现水平反转效果，比如scaleX=-1。*/
	__getset(0,__proto,'scaleX',function(){
		return this._style._tf.scaleX;
		},function(value){
		var style=this.getStyle();
		if (style._tf.scaleX!==value){
			style.setScaleX(value);
			this._tfChanged=true;
			this.conchModel && this.conchModel.scale(value,style._tf.scaleY);
			this._renderType |=0x04;
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
		}
	});

	/**垂直倾斜角度，默认值为0。以角度为单位。*/
	__getset(0,__proto,'skewY',function(){
		return this._style._tf.skewY;
		},function(value){
		var style=this.getStyle();
		if (style._tf.skewY!==value){
			style.setSkewY(value);
			this._tfChanged=true;
			this.conchModel && this.conchModel.skew(style._tf.skewX,value);
			this._renderType |=0x04;
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
		}
	});

	/**表示是否可见，默认为true。如果设置不可见，节点将不被渲染。*/
	__getset(0,__proto,'visible',function(){
		return this._style.visible;
		},function(value){
		if (this._style && this._style.visible!==value){
			this.getStyle().visible=value;
			this.conchModel && this.conchModel.visible(value);
			this.parentRepaint();
		}
	});

	/**Y轴 轴心点的位置，单位为像素，默认为0。轴心点会影响对象位置，缩放中心，旋转中心。*/
	__getset(0,__proto,'pivotY',function(){
		return this._style._tf.translateY;
		},function(value){
		this.getStyle().setTranslateY(value);
		this.conchModel && this.conchModel.pivot(this._style._tf.translateX,value);
		this.repaint();
	});

	/**表示显示对象相对于父容器的垂直方向坐标值。*/
	__getset(0,__proto,'y',function(){
		return this._y;
		},function(value){
		if (this._y!==value){
			if (this.destroyed)return;
			this._y=value;
			this.conchModel && this.conchModel.pos(this._x,value);
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
			if (this._$P.maskParent && this._$P.maskParent._repaint===0){
				this._$P.maskParent._repaint=1;
				this._$P.maskParent.parentRepaint();
			}
		}
	});

	/**X轴 轴心点的位置，单位为像素，默认为0。轴心点会影响对象位置，缩放中心，旋转中心。*/
	__getset(0,__proto,'pivotX',function(){
		return this._style._tf.translateX;
		},function(value){
		this.getStyle().setTranslateX(value);
		this.conchModel && this.conchModel.pivot(value,this._style._tf.translateY);
		this.repaint();
	});

	/**水平倾斜角度，默认值为0。以角度为单位。*/
	__getset(0,__proto,'skewX',function(){
		return this._style._tf.skewX;
		},function(value){
		var style=this.getStyle();
		if (style._tf.skewX!==value){
			style.setSkewX(value);
			this._tfChanged=true;
			this.conchModel && this.conchModel.skew(value,style._tf.skewY);
			this._renderType |=0x04;
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
		}
	});

	/**
	*<p>显示对象的滚动矩形范围，具有裁剪效果(如果只想限制子对象渲染区域，请使用viewport)，设置optimizeScrollRect=true，可以优化裁剪区域外的内容不进行渲染。</p>
	*<p> srollRect和viewport的区别：<br/>
	*1.srollRect自带裁剪效果，viewport只影响子对象渲染是否渲染，不具有裁剪效果（性能更高）。<br/>
	*2.设置rect的x,y属性均能实现区域滚动效果，但scrollRect会保持0,0点位置不变。</p>
	*/
	__getset(0,__proto,'scrollRect',function(){
		return this._style.scrollRect;
		},function(value){
		this.getStyle().scrollRect=value;
		this.repaint();
		if (value){
			this._renderType |=0x80;
			this.conchModel && this.conchModel.scrollRect(value.x,value.y,value.width,value.height);
			}else {
			this._renderType &=~0x80;
			if (this.conchModel){
				if (Sprite.RUNTIMEVERION < "0.9.1")
					this.conchModel.removeType(0x40);
				else
				this.conchModel.removeType(0x80);
			}
		}
	});

	/**旋转角度，默认值为0。以角度为单位。*/
	__getset(0,__proto,'rotation',function(){
		return this._style._tf.rotate;
		},function(value){
		var style=this.getStyle();
		if (style._tf.rotate!==value){
			style.setRotate(value);
			this._tfChanged=true;
			this.conchModel && this.conchModel.rotate(value);
			this._renderType |=0x04;
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
		}
	});

	/**
	*<p>对象的矩阵信息。通过设置矩阵可以实现节点旋转，缩放，位移效果。</p>
	*<p>矩阵更多信息请参考 <code>Matrix</code></p>
	*/
	__getset(0,__proto,'transform',function(){
		return this._tfChanged ? this._adjustTransform():this._transform;
		},function(value){
		this._tfChanged=false;
		this._transform=value;
		if (value){
			this._x=value.tx;
			this._y=value.ty;
			value.tx=value.ty=0;
			this.conchModel && this.conchModel.transform(value.a,value.b,value.c,value.d,this._x,this._y);
		}
		if (value)this._renderType |=0x04;
		else {
			this._renderType &=~0x04;
			this.conchModel && this.conchModel.removeType(0x04);
		}
		this.parentRepaint();
	});

	/**Y轴缩放值，默认值为1。设置为负数，可以实现垂直反转效果，比如scaleX=-1。*/
	__getset(0,__proto,'scaleY',function(){
		return this._style._tf.scaleY;
		},function(value){
		var style=this.getStyle();
		if (style._tf.scaleY!==value){
			style.setScaleY(value);
			this._tfChanged=true;
			this.conchModel && this.conchModel.scale(style._tf.scaleX,value);
			this._renderType |=0x04;
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
		}
	});

	/**
	*返回鼠标在此对象坐标系上的 X 轴坐标信息。
	*/
	__getset(0,__proto,'mouseX',function(){
		return this.getMousePoint().x;
	});

	/**
	*<p>显示对象的宽度，单位为像素，默认为0。</p>
	*<p>此宽度用于鼠标碰撞检测，并不影响显示对象图像大小。需要对显示对象的图像进行缩放，请使用scale、scaleX、scaleY。</p>
	*<p>可以通过getbounds获取显示对象图像的实际宽度。</p>
	*/
	__getset(0,__proto,'width',function(){
		if (!this.autoSize)return this._width;
		return this.getSelfBounds().width;
		},function(value){
		if (this._width!==value){
			this._width=value;
			this.conchModel && this.conchModel.size(value,this._height)
			this.repaint();
		}
	});

	/**
	*<p>指定显示对象是否缓存为静态图像，cacheAs时，子对象发生变化，会自动重新缓存，同时也可以手动调用reCache方法更新缓存。</p>
	*<p>建议把不经常变化的“复杂内容”缓存为静态图像，能极大提高渲染性能。cacheAs有"none"，"normal"和"bitmap"三个值可选。
	*<li>默认为"none"，不做任何缓存。</li>
	*<li>当值为"normal"时，canvas模式下进行画布缓存，webgl模式下进行命令缓存。</li>
	*<li>当值为"bitmap"时，canvas模式下进行依然是画布缓存，webgl模式下使用renderTarget缓存。</li></p>
	*<p>webgl下renderTarget缓存模式缺点：会额外创建renderTarget对象，增加内存开销，缓存面积有最大2048限制，不断重绘时会增加CPU开销。优点：大幅减少drawcall，渲染性能最高。
	*webgl下命令缓存模式缺点：只会减少节点遍历及命令组织，不会减少drawcall数，性能中等。优点：没有额外内存开销，无需renderTarget支持。</p>
	*/
	__getset(0,__proto,'cacheAs',function(){
		return this._$P.cacheCanvas==null ? "none" :this._$P.cacheCanvas.type;
		},function(value){
		var cacheCanvas=this._$P.cacheCanvas;
		if (value===(cacheCanvas ? cacheCanvas.type :"none"))return;
		if (value!=="none"){
			if (!this._getBit(0x1))this._setUpNoticeType(0x1);
			cacheCanvas || (cacheCanvas=this._set$P("cacheCanvas",Pool.getItemByClass("cacheCanvas",Object)));
			cacheCanvas.type=value;
			cacheCanvas.reCache=true;
			this._renderType |=0x10;
			if (value=="bitmap")this.conchModel && this.conchModel.cacheAs(1);
			this._set$P("cacheForFilters",false);
			}else {
			if (this._$P["_mask"]){
			}else
			if (this._$P["hasFilter"]){
				this._set$P("cacheForFilters",true);
				}else {
				if (cacheCanvas){
					var cc=cacheCanvas;
					if (cc && cc.ctx){
						Pool.recover("RenderContext",cc.ctx);
						cc.ctx.canvas.size(0,0);
						cc.ctx=null;
					}
					Pool.recover("cacheCanvas",cacheCanvas);
				}
				this._$P.cacheCanvas=null;
				this._renderType &=~0x10;
				this.conchModel && this.conchModel.cacheAs(0);
			}
		}
		this.repaint();
	});

	/**
	*是否静态缓存此对象的当前帧的最终属性。为 true 时，子对象变化时不会自动更新缓存，但是可以通过调用 reCache 方法手动刷新。
	*<b>注意：</b> 1. 设置 cacheAs 为非空和非"none"时才有效。 2. 由于渲染的时机在脚本执行之后，也就是说当前帧渲染的是对象的最终属性，所以如果在当前帧渲染之前、设置静态缓存之后改变对象属性，则最终渲染结果表现的是对象的最终属性。
	*/
	__getset(0,__proto,'staticCache',function(){
		return this._$P.staticCache;
		},function(value){
		this._set$P("staticCache",value);
		if (!value)this.reCache();
	});

	/**z排序，更改此值，则会按照值的大小对同一容器的所有对象重新排序。值越大，越靠上。默认为0，则根据添加顺序排序。*/
	__getset(0,__proto,'zOrder',function(){
		return this._zOrder;
		},function(value){
		if (this._zOrder !=value){
			this._zOrder=value;
			this.conchModel && this.conchModel.setZOrder && this.conchModel.setZOrder(value);
			if (this._parent){
				value && this._parent._set$P("hasZorder",true);
				Laya.timer.callLater(this._parent,this.updateZOrder);
			}
		}
	});

	/**对舞台 <code>stage</code> 的引用。*/
	__getset(0,__proto,'stage',function(){
		return Laya.stage;
	});

	__getset(0,__proto,'parent',_super.prototype._$get_parent,function(value){
		Laya.superSet(Node,this,'parent',value);
		if (value && this._getBit(0x2)){
			this._$2__onDisplay();
		}
	});

	/**
	*设置是否开启自定义渲染，只有开启自定义渲染，才能使用customRender函数渲染。
	*/
	__getset(0,__proto,'customRenderEnable',null,function(b){
		if (b){
			this._renderType |=0x400;
			if (Render.isConchNode){
				Sprite.CustomList.push(this);
				var canvas=new HTMLCanvas("2d");
				canvas._setContext(new CanvasRenderingContext2D());
				this.customContext=new RenderContext(0,0,canvas);
				canvas.context.setCanvasType && canvas.context.setCanvasType(2);
				this.conchModel.custom(canvas.context);
			}
		}
	});

	/**
	*<p>显示对象的高度，单位为像素，默认为0。</p>
	*<p>此高度用于鼠标碰撞检测，并不影响显示对象图像大小。需要对显示对象的图像进行缩放，请使用scale、scaleX、scaleY。</p>
	*<p>可以通过getbounds获取显示对象图像的实际高度。</p>
	*/
	__getset(0,__proto,'height',function(){
		if (!this.autoSize)return this._height;
		return this.getSelfBounds().height;
		},function(value){
		if (this._height!==value){
			this._height=value;
			this.conchModel && this.conchModel.size(this._width,value);
			this.repaint();
		}
	});

	/**
	*指定显示对象是否缓存为静态图像。功能同cacheAs的normal模式。建议优先使用cacheAs代替。
	*/
	__getset(0,__proto,'cacheAsBitmap',function(){
		return this.cacheAs!=="none";
		},function(value){
		this.cacheAs=value ? (this._$P["hasFilter"] ? "none" :"normal"):"none";
	});

	/**表示显示对象相对于父容器的水平方向坐标值。*/
	__getset(0,__proto,'x',function(){
		return this._x;
		},function(value){
		if (this._x!==value){
			if (this.destroyed)return;
			this._x=value;
			this.conchModel && this.conchModel.pos(value,this._y);
			var p=this._parent;
			if (p && p._repaint===0){
				p._repaint=1;
				p.parentRepaint();
			}
			if (this._$P.maskParent && this._$P.maskParent._repaint===0){
				this._$P.maskParent._repaint=1;
				this._$P.maskParent.parentRepaint();
			}
		}
	});

	/**指定要使用的混合模式。目前只支持"lighter"。*/
	__getset(0,__proto,'blendMode',function(){
		return this._style.blendMode;
		},function(value){
		this.getStyle().blendMode=value;
		this.conchModel && this.conchModel.blendMode(value);
		if (value && value !="source-over")this._renderType |=0x08;
		else this._renderType &=~0x08;
		this.parentRepaint();
	});

	/**
	*<p>指定是否对使用了 scrollRect 的显示对象进行优化处理。默认为false(不优化)。</p>
	*<p>当值为ture时：将对此对象使用了scrollRect 设定的显示区域以外的显示内容不进行渲染，以提高性能(如果子对象有旋转缩放或者中心点偏移，则显示筛选会不精确)。</p>
	*/
	__getset(0,__proto,'optimizeScrollRect',function(){
		return this._optimizeScrollRect;
		},function(b){
		if (this._optimizeScrollRect !=b){
			this._optimizeScrollRect=b;
			this.conchModel && this.conchModel.optimizeScrollRect(b);
		}
	});

	Sprite.fromImage=function(url){
		return new Sprite().loadImage(url);
	}

	Sprite.CustomList=[];
	__static(Sprite,
	['RUNTIMEVERION',function(){return this.RUNTIMEVERION=window.conch?conchConfig.getRuntimeVersion().substr(conchConfig.getRuntimeVersion().lastIndexOf('-')+1):'';}
	]);
	return Sprite;
})(Node)


/**
*@private
*<code>Bitmap</code> 是图片资源类。
*/
//class laya.resource.Bitmap extends laya.resource.Resource
var Bitmap=(function(_super){
	function Bitmap(){
		/**@private
		*HTML Image或HTML Canvas或WebGL Texture。
		**/
		//this._source=null;
		/**@private 宽度*/
		//this._w=NaN;
		/**@private 高度*/
		//this._h=NaN;
		Bitmap.__super.call(this);
		this._w=0;
		this._h=0;
	}

	__class(Bitmap,'laya.resource.Bitmap',_super);
	var __proto=Bitmap.prototype;
	/***
	*HTML Image 或 HTML Canvas 或 WebGL Texture 。
	*/
	__getset(0,__proto,'source',function(){
		return this._source;
	});

	/***
	*高度。
	*/
	__getset(0,__proto,'height',function(){
		return this._h;
	});

	/***
	*宽度。
	*/
	__getset(0,__proto,'width',function(){
		return this._w;
	});

	return Bitmap;
})(Resource)


/**
*@private
*audio标签播放声音的音轨控制
*/
//class laya.media.h5audio.AudioSoundChannel extends laya.media.SoundChannel
var AudioSoundChannel=(function(_super){
	function AudioSoundChannel(audio){
		/**
		*播放用的audio标签
		*/
		this._audio=null;
		this._onEnd=null;
		this._resumePlay=null;
		AudioSoundChannel.__super.call(this);
		this._onEnd=Utils.bind(this.__onEnd,this);
		this._resumePlay=Utils.bind(this.__resumePlay,this);
		audio.addEventListener("ended",this._onEnd);
		this._audio=audio;
	}

	__class(AudioSoundChannel,'laya.media.h5audio.AudioSoundChannel',_super);
	var __proto=AudioSoundChannel.prototype;
	__proto.__onEnd=function(){
		if (this.loops==1){
			if (this.completeHandler){
				Laya.timer.once(10,this,this.__runComplete,[this.completeHandler],false);
				this.completeHandler=null;
			}
			this.stop();
			this.event("complete");
			return;
		}
		if (this.loops > 0){
			this.loops--;
		}
		this.startTime=0;
		this.play();
	}

	__proto.__resumePlay=function(){
		if (this._audio)this._audio.removeEventListener("canplay",this._resumePlay);
		if (this.isStopped)return;
		try {
			this._audio.currentTime=this.startTime;
			Browser.container.appendChild(this._audio);
			this._audio.play();
			}catch (e){
			this.event("error");
		}
	}

	/**
	*播放
	*/
	__proto.play=function(){
		this.isStopped=false;
		if (!this._audio)return;
		try {
			this._audio.playbackRate=SoundManager.playbackRate;
			this._audio.currentTime=this.startTime;
			}catch (e){
			this._audio.addEventListener("canplay",this._resumePlay);
			return;
		}
		SoundManager.addChannel(this);
		Browser.container.appendChild(this._audio);
		if("play" in this._audio)
			this._audio.play();
	}

	/**
	*停止播放
	*
	*/
	__proto.stop=function(){
		this.isStopped=true;
		SoundManager.removeChannel(this);
		this.completeHandler=null;
		if (!this._audio)
			return;
		if ("pause" in this._audio)
			if (Render.isConchApp){
			this._audio.stop();
		}
		this._audio.pause();
		this._audio.removeEventListener("ended",this._onEnd);
		this._audio.removeEventListener("canplay",this._resumePlay);
		if (!Browser.onIE){
			if (this._audio!=AudioSound._musicAudio){
				Pool.recover("audio:"+this.url,this._audio);
			}
		}
		Browser.removeElement(this._audio);
		this._audio=null;
	}

	__proto.pause=function(){
		this.isStopped=true;
		SoundManager.removeChannel(this);
		if("pause" in this._audio)
			this._audio.pause();
	}

	__proto.resume=function(){
		if (!this._audio)
			return;
		this.isStopped=false;
		SoundManager.addChannel(this);
		if("play" in this._audio)
			this._audio.play();
	}

	/**
	*设置音量
	*@param v
	*
	*/
	/**
	*获取音量
	*@return
	*
	*/
	__getset(0,__proto,'volume',function(){
		if (!this._audio)return 1;
		return this._audio.volume;
		},function(v){
		if (!this._audio)return;
		this._audio.volume=v;
	});

	/**
	*获取总时间。
	*/
	__getset(0,__proto,'duration',function(){
		if (!this._audio)
			return 0;
		return this._audio.duration;
	});

	/**
	*当前播放到的位置
	*@return
	*
	*/
	__getset(0,__proto,'position',function(){
		if (!this._audio)
			return 0;
		return this._audio.currentTime;
	});

	return AudioSoundChannel;
})(SoundChannel)


/**
*@private
*web audio api方式播放声音的音轨控制
*/
//class laya.media.webaudio.WebAudioSoundChannel extends laya.media.SoundChannel
var WebAudioSoundChannel=(function(_super){
	function WebAudioSoundChannel(){
		/**
		*声音原始文件数据
		*/
		this.audioBuffer=null;
		/**
		*gain节点
		*/
		this.gain=null;
		/**
		*播放用的数据
		*/
		this.bufferSource=null;
		/**
		*当前时间
		*/
		this._currentTime=0;
		/**
		*当前音量
		*/
		this._volume=1;
		/**
		*播放开始时的时间戳
		*/
		this._startTime=0;
		this._pauseTime=0;
		this._onPlayEnd=null;
		this.context=WebAudioSound.ctx;
		WebAudioSoundChannel.__super.call(this);
		this._onPlayEnd=Utils.bind(this.__onPlayEnd,this);
		if (this.context["createGain"]){
			this.gain=this.context["createGain"]();
			}else {
			this.gain=this.context["createGainNode"]();
		}
	}

	__class(WebAudioSoundChannel,'laya.media.webaudio.WebAudioSoundChannel',_super);
	var __proto=WebAudioSoundChannel.prototype;
	/**
	*播放声音
	*/
	__proto.play=function(){
		SoundManager.addChannel(this);
		this.isStopped=false;
		this._clearBufferSource();
		if (!this.audioBuffer)return;
		var context=this.context;
		var gain=this.gain;
		var bufferSource=context.createBufferSource();
		this.bufferSource=bufferSource;
		bufferSource.buffer=this.audioBuffer;
		bufferSource.connect(gain);
		if (gain)
			gain.disconnect();
		gain.connect(context.destination);
		bufferSource.onended=this._onPlayEnd;
		if (this.startTime >=this.duration)this.startTime=0;
		this._startTime=Browser.now();
		if (this.gain.gain.setTargetAtTime){
			this.gain.gain.setTargetAtTime(this._volume,this.context.currentTime,0.001);
		}else
		this.gain.gain.value=this._volume;
		if (this.loops==0){
			bufferSource.loop=true;
		}
		if (bufferSource.playbackRate.setTargetAtTime){
			bufferSource.playbackRate.setTargetAtTime(SoundManager.playbackRate,this.context.currentTime,0.001)
		}else
		bufferSource.playbackRate.value=SoundManager.playbackRate;
		bufferSource.start(0,this.startTime);
		this._currentTime=0;
	}

	__proto.__onPlayEnd=function(){
		if (this.loops==1){
			if (this.completeHandler){
				Laya.timer.once(10,this,this.__runComplete,[this.completeHandler],false);
				this.completeHandler=null;
			}
			this.stop();
			this.event("complete");
			return;
		}
		if (this.loops > 0){
			this.loops--;
		}
		this.startTime=0;
		this.play();
	}

	__proto._clearBufferSource=function(){
		if (this.bufferSource){
			var sourceNode=this.bufferSource;
			if (sourceNode.stop){
				sourceNode.stop(0);
				}else {
				sourceNode.noteOff(0);
			}
			sourceNode.disconnect(0);
			sourceNode.onended=null;
			if (!WebAudioSoundChannel._tryCleanFailed)this._tryClearBuffer(sourceNode);
			this.bufferSource=null;
		}
	}

	__proto._tryClearBuffer=function(sourceNode){
		if (!Browser.onMac){
			try{
				sourceNode.buffer=null;
				}catch (e){
				WebAudioSoundChannel._tryCleanFailed=true;
			}
			return;
		}
		try {sourceNode.buffer=WebAudioSound._miniBuffer;}catch (e){WebAudioSoundChannel._tryCleanFailed=true;}
	}

	/**
	*停止播放
	*/
	__proto.stop=function(){
		this._clearBufferSource();
		this.audioBuffer=null;
		if (this.gain)
			this.gain.disconnect();
		this.isStopped=true;
		SoundManager.removeChannel(this);
		this.completeHandler=null;
		if(SoundManager.autoReleaseSound)
			Laya.timer.once(5000,null,SoundManager.disposeSoundIfNotUsed,[this.url],false);
	}

	__proto.pause=function(){
		if (!this.isStopped){
			this._pauseTime=this.position;
		}
		this._clearBufferSource();
		if (this.gain)
			this.gain.disconnect();
		this.isStopped=true;
		SoundManager.removeChannel(this);
		if(SoundManager.autoReleaseSound)
			Laya.timer.once(5000,null,SoundManager.disposeSoundIfNotUsed,[this.url],false);
	}

	__proto.resume=function(){
		this.startTime=this._pauseTime;
		this.play();
	}

	/**
	*设置音量
	*/
	/**
	*获取音量
	*/
	__getset(0,__proto,'volume',function(){
		return this._volume;
		},function(v){
		if (this.isStopped){
			return;
		}
		this._volume=v;
		if (this.gain.gain.setTargetAtTime){
			this.gain.gain.setTargetAtTime(v,this.context.currentTime,0.001);
		}else
		this.gain.gain.value=v;
	});

	__getset(0,__proto,'duration',function(){
		if (this.audioBuffer){
			return this.audioBuffer.duration;
		}
		return 0;
	});

	/**
	*获取当前播放位置
	*/
	__getset(0,__proto,'position',function(){
		if (this.bufferSource){
			return (Browser.now()-this._startTime)/ 1000+this.startTime;
		}
		return 0;
	});

	WebAudioSoundChannel._tryCleanFailed=false;
	WebAudioSoundChannel.SetTargetDelay=0.001;
	return WebAudioSoundChannel;
})(SoundChannel)


//class fairygui.GBasicTextField extends fairygui.GTextField
var GBasicTextField=(function(_super){
	var LineInfo,TextExt;
	function GBasicTextField(){
		this.textField=null;
		this._font=null;
		this._color=null;
		this._ubbEnabled=false;
		this._singleLine=false;
		this._letterSpacing=0;
		this._autoSize=0;
		this._widthAutoSize=false;
		this._heightAutoSize=false;
		this._updatingSize=false;
		this._textWidth=0;
		this._textHeight=0;
		this._bitmapFont=null;
		this._lines=null;
		GBasicTextField.__super.call(this);
		this._text="";
		this._color="#000000";
		this.textField.align="left";
		this.textField.font=UIConfig$1.defaultFont;
		this._autoSize=1;
		this._widthAutoSize=this._heightAutoSize=true;
		this.textField["_sizeDirty"]=false;
	}

	__class(GBasicTextField,'fairygui.GBasicTextField',_super);
	var __proto=GBasicTextField.prototype;
	__proto.createDisplayObject=function(){
		this._displayObject=this.textField=new TextExt(this);
		this._displayObject["$owner"]=this;
		this._displayObject.mouseEnabled=false;
	}

	__proto.setAutoSize=function(value){
		this._autoSize=value;
		this._widthAutoSize=value==1;
		this._heightAutoSize=value==1 || value==2;
		this.textField.wordWrap=!this._widthAutoSize && !this._singleLine;
		if(!this._underConstruct){
			if(!this._heightAutoSize)
				this.textField.size(this.width,this.height);
			else if(!this._widthAutoSize)
			this.textField.width=this.width;
		}
	}

	__proto.ensureSizeCorrect=function(){
		if (!this._underConstruct && this.textField["_isChanged"])
			this.textField.typeset();
	}

	__proto.typeset=function(){
		if(this._bitmapFont!=null)
			this.renderWithBitmapFont();
		else if(this._widthAutoSize || this._heightAutoSize)
		this.updateSize();
	}

	__proto.updateSize=function(){
		this._textWidth=Math.ceil(this.textField.textWidth);
		this._textHeight=Math.ceil(this.textField.textHeight);
		var w=NaN,h=0;
		if(this._widthAutoSize){
			w=this._textWidth;
			if(this.textField.width!=w){
				this.textField.width=w;
				if(this.textField.align!="left")
					this.textField["baseTypeset"]();
			}
		}
		else
		w=this.width;
		if(this._heightAutoSize){
			h=this._textHeight;
			if(!this._widthAutoSize){
				if(this.textField.height!=this._textHeight)
					this.textField.height=this._textHeight;
			}
		}
		else {
			h=this.height;
			if(this._textHeight > h)
				this._textHeight=h;
			if(this.textField.height!=this._textHeight)
				this.textField.height=this._textHeight;
		}
		this._updatingSize=true;
		this.setSize(w,h);
		this._updatingSize=false;
	}

	__proto.renderWithBitmapFont=function(){
		var gr=this._displayObject.graphics;
		gr.clear();
		if (!this._lines)
			this._lines=[];
		else
		LineInfo.returnList(this._lines);
		var letterSpacing=this.letterSpacing;
		var lineSpacing=this.leading-1;
		var rectWidth=this.width-2 *2;
		var lineWidth=0,lineHeight=0,lineTextHeight=0;
		var glyphWidth=0,glyphHeight=0;
		var wordChars=0,wordStart=0,wordEnd=0;
		var lastLineHeight=0;
		var lineBuffer="";
		var lineY=2;
		var line;
		var wordWrap=!this._widthAutoSize && !this._singleLine;
		var fontSize=this.fontSize;
		var fontScale=this._bitmapFont.resizable?fontSize/this._bitmapFont.size:1;
		this._textWidth=0;
		this._textHeight=0;
		var text2=this._text;
		if (this._templateVars !=null)
			text2=this.parseTemplate(text2);
		var textLength=text2.length;
		for (var offset=0;offset < textLength;++offset){
			var ch=text2.charAt(offset);
			var cc=ch.charCodeAt(0);
			if (cc==10){
				lineBuffer+=ch;
				line=LineInfo.borrow();
				line.width=lineWidth;
				if (lineTextHeight==0){
					if (lastLineHeight==0)
						lastLineHeight=fontSize;
					if (lineHeight==0)
						lineHeight=lastLineHeight;
					lineTextHeight=lineHeight;
				}
				line.height=lineHeight;
				lastLineHeight=lineHeight;
				line.textHeight=lineTextHeight;
				line.text=lineBuffer;
				line.y=lineY;
				lineY+=(line.height+lineSpacing);
				if (line.width > this._textWidth)
					this._textWidth=line.width;
				this._lines.push(line);
				lineBuffer="";
				lineWidth=0;
				lineHeight=0;
				lineTextHeight=0;
				wordChars=0;
				wordStart=0;
				wordEnd=0;
				continue ;
			}
			if (cc>=65 && cc<=90 || cc>=97 && cc<=122){
				if (wordChars==0)
					wordStart=lineWidth;
				wordChars++;
			}
			else{
				if (wordChars > 0)
					wordEnd=lineWidth;
				wordChars=0;
			}
			if (cc==32){
				glyphWidth=Math.ceil(fontSize / 2);
				glyphHeight=fontSize;
			}
			else {
				var glyph=this._bitmapFont.glyphs[ch];
				if (glyph){
					glyphWidth=Math.ceil(glyph.advance*fontScale);
					glyphHeight=Math.ceil(glyph.lineHeight*fontScale);
				}
				else {
					glyphWidth=0;
					glyphHeight=0;
				}
			}
			if (glyphHeight > lineTextHeight)
				lineTextHeight=glyphHeight;
			if (glyphHeight > lineHeight)
				lineHeight=glyphHeight;
			if (lineWidth !=0)
				lineWidth+=letterSpacing;
			lineWidth+=glyphWidth;
			if (!wordWrap || lineWidth <=rectWidth){
				lineBuffer+=ch;
			}
			else {
				line=LineInfo.borrow();
				line.height=lineHeight;
				line.textHeight=lineTextHeight;
				if (lineBuffer.length==0){
					line.text=ch;
				}
				else if (wordChars > 0 && wordEnd > 0){
					lineBuffer+=ch;
					var len=lineBuffer.length-wordChars;
					line.text=ToolSet.trimRight(lineBuffer.substr(0,len));
					line.width=wordEnd;
					lineBuffer=lineBuffer.substr(len);
					lineWidth-=wordStart;
				}
				else {
					line.text=lineBuffer;
					line.width=lineWidth-(glyphWidth+letterSpacing);
					lineBuffer=ch;
					lineWidth=glyphWidth;
					lineHeight=glyphHeight;
					lineTextHeight=glyphHeight;
				}
				line.y=lineY;
				lineY+=(line.height+lineSpacing);
				if (line.width > this._textWidth)
					this._textWidth=line.width;
				wordChars=0;
				wordStart=0;
				wordEnd=0;
				this._lines.push(line);
			}
		}
		if (lineBuffer.length > 0){
			line=LineInfo.borrow();
			line.width=lineWidth;
			if (lineHeight==0)
				lineHeight=lastLineHeight;
			if (lineTextHeight==0)
				lineTextHeight=lineHeight;
			line.height=lineHeight;
			line.textHeight=lineTextHeight;
			line.text=lineBuffer;
			line.y=lineY;
			if (line.width > this._textWidth)
				this._textWidth=line.width;
			this._lines.push(line);
		}
		if (this._textWidth > 0)
			this._textWidth+=2 *2;
		var count=this._lines.length;
		if (count==0){
			this._textHeight=0;
		}
		else {
			line=this._lines[this._lines.length-1];
			this._textHeight=line.y+line.height+2;
		};
		var w=NaN,h=0;
		if (this._widthAutoSize){
			if (this._textWidth==0)
				w=0;
			else
			w=this._textWidth;
		}
		else
		w=this.width;
		if (this._heightAutoSize){
			if (this._textHeight==0)
				h=0;
			else
			h=this._textHeight;
		}
		else
		h=this.height;
		this._updatingSize=true;
		this.setSize(w,h);
		this._updatingSize=false;
		this.doAlign();
		if (w==0 || h==0)
			return;
		var charX=2;
		var lineIndent=0;
		var charIndent=0;
		rectWidth=this.width-2 *2;
		var lineCount=this._lines.length;
		for (var i=0;i < lineCount;i++){
			line=this._lines[i];
			charX=2;
			if (this.align=="center")
				lineIndent=(rectWidth-line.width)/ 2;
			else if (this.align=="right")
			lineIndent=rectWidth-line.width;
			else
			lineIndent=0;
			textLength=line.text.length;
			for (var j=0;j < textLength;j++){
				ch=line.text.charAt(j);
				cc=ch.charCodeAt(0);
				if(cc==10)
					continue ;
				if(cc==32){
					charX+=this._letterSpacing+Math.ceil(fontSize/2);
					continue ;
				}
				glyph=this._bitmapFont.glyphs[ch];
				if (glyph !=null){
					charIndent=(line.height+line.textHeight)/ 2-Math.ceil(glyph.lineHeight*fontScale);
					if(glyph.texture){
						gr.drawTexture(glyph.texture,
						charX+lineIndent+Math.ceil(glyph.offsetX*fontScale),
						line.y+charIndent+Math.ceil(glyph.offsetY*fontScale),
						glyph.texture.width *fontScale,
						glyph.texture.height *fontScale);
					}
					charX+=letterSpacing+Math.ceil(glyph.advance*fontScale);
				}
				else {
					charX+=letterSpacing;
				}
			}
		}
	}

	//line loop
	__proto.handleSizeChanged=function(){
		if(this._updatingSize)
			return;
		if(this._underConstruct)
			this.textField.size(this.width,this.height);
		else{
			if(this._bitmapFont!=null){
				if(!this._widthAutoSize)
					this.textField["setChanged"]();
				else
				this.doAlign();
			}
			else {
				if(!this._widthAutoSize){
					if(!this._heightAutoSize)
						this.textField.size(this.width,this.height);
					else
					this.textField.width=this.width;
				}
			}
		}
	}

	__proto.handleGrayedChanged=function(){
		fairygui.GObject.prototype.handleGrayedChanged.call(this);
		if(this.grayed)
			this.textField.color="#AAAAAA";
		else
		this.textField.color=this._color;
	}

	__proto.doAlign=function(){
		if(this.valign=="top" || this._textHeight==0)
			this._yOffset=2;
		else {
			var dh=this.height-this._textHeight;
			if(dh < 0)
				dh=0;
			if(this.valign=="middle")
				this._yOffset=Math.floor(dh / 2);
			else
			this._yOffset=Math.floor(dh);
		}
		this.handleXYChanged();
	}

	__proto.flushVars=function(){
		this.text=this._text;
	}

	__getset(0,__proto,'autoSize',function(){
		return this._autoSize;
		},function(value){
		if (this._autoSize !=value){
			this.setAutoSize(value);
		}
	});

	__getset(0,__proto,'ubbEnabled',function(){
		return this._ubbEnabled;
		},function(value){
		this._ubbEnabled=value;
	});

	__getset(0,__proto,'strokeColor',function(){
		return this.textField.strokeColor;
		},function(value){
		this.textField.strokeColor=value;
		this.updateGear(4);
	});

	__getset(0,__proto,'stroke',function(){
		return this.textField.stroke;
		},function(value){
		this.textField.stroke=value;
	});

	__getset(0,__proto,'underline',function(){
		return this.textField.underline;
		},function(value){
		this.textField.underline=value;
	});

	__getset(0,__proto,'italic',function(){
		return this.textField.italic;
		},function(value){
		this.textField.italic=value;
	});

	__getset(0,__proto,'letterSpacing',function(){
		return this._letterSpacing;
		},function(value){
		this._letterSpacing=value;
	});

	__getset(0,__proto,'valign',function(){
		return this.textField.valign;
		},function(value){
		this.textField.valign=value;
	});

	__getset(0,__proto,'bold',function(){
		return this.textField.bold;
		},function(value){
		this.textField.bold=value;
	});

	__getset(0,__proto,'textWidth',function(){
		if (this.textField["_isChanged"])
			this.textField.typeset();
		return this._textWidth;
	});

	__getset(0,__proto,'font',function(){
		return this.textField.font;
		},function(value){
		this._font=value;
		if(ToolSet.startsWith(this._font,"ui://"))
			this._bitmapFont=UIPackage.getItemAssetByURL(this._font);
		else
		this._bitmapFont=null;
		if(this._bitmapFont!=null){
			this.textField["setChanged"]();
		}
		else {
			if(this._font)
				this.textField.font=this._font;
			else
			this.textField.font=UIConfig$1.defaultFont;
		}
	});

	__getset(0,__proto,'leading',function(){
		return this.textField.leading;
		},function(value){
		this.textField.leading=value;
	});

	__getset(0,__proto,'singleLine',function(){
		return this._singleLine;
		},function(value){
		this._singleLine=value;
		this.textField.wordWrap=!this._widthAutoSize && !this._singleLine;
	});

	__getset(0,__proto,'color',function(){
		return this._color;
		},function(value){
		if (this._color !=value){
			this._color=value;
			if (this._gearColor.controller)
				this._gearColor.updateState();
			if(this.grayed)
				this.textField.color="#AAAAAA";
			else
			this.textField.color=this._color;
		}
	});

	__getset(0,__proto,'align',function(){
		return this.textField.align;
		},function(value){
		this.textField.align=value;
	});

	__getset(0,__proto,'fontSize',function(){
		return this.textField.fontSize;
		},function(value){
		this.textField.fontSize=value;
	});

	__getset(0,__proto,'text',function(){
		return this._text;
		},function(value){
		this._text=value;
		if(this._text==null)
			this._text="";
		if(this._bitmapFont==null){
			if(this._widthAutoSize)
				this.textField.width=10000;
			var text2=this._text;
			if (this._templateVars !=null)
				text2=this.parseTemplate(text2);
			if(this._ubbEnabled)
				this.textField.text=ToolSet.removeUBB(ToolSet.encodeHTML(text2));
			else
			this.textField.text=text2;
		}
		else{
			this.textField.text="";
			this.textField["setChanged"]();
		}
		if(this.parent && this.parent._underConstruct)
			this.textField.typeset();
	});

	GBasicTextField.GUTTER_X=2;
	GBasicTextField.GUTTER_Y=2;
	GBasicTextField.__init$=function(){
		//class LineInfo
		LineInfo=(function(){
			function LineInfo(){
				this.width=0;
				this.height=0;
				this.textHeight=0;
				this.text=null;
				this.y=0;
			}
			__class(LineInfo,'');
			LineInfo.borrow=function(){
				if (LineInfo.pool.length){
					var ret=LineInfo.pool.pop();
					ret.width=0;
					ret.height=0;
					ret.textHeight=0;
					ret.text=null;
					ret.y=0;
					return ret;
				}
				else
				return new LineInfo();
			}
			LineInfo.returns=function(value){
				LineInfo.pool.push(value);
			}
			LineInfo.returnList=function(value){
				var length=value.length;
				for (var i=0;i < length;i++){
					var li=value[i];
					LineInfo.pool.push(li);
				}
				value.length=0;
			}
			LineInfo.pool=[];
			return LineInfo;
		})()
		//class TextExt extends laya.display.Text
		TextExt=(function(_super){
			function TextExt(owner){
				this._owner=null;
				this._lock=false;
				this._sizeDirty=false;
				TextExt.__super.call(this);
				this._owner=owner;
			}
			__class(TextExt,'',_super);
			var __proto=TextExt.prototype;
			__proto.baseTypeset=function(){
				this._lock=true;
				this.typeset();
				this._lock=false;
			}
			__proto.typeset=function(){
				this._sizeDirty=true;
				_super.prototype.typeset.call(this);
				if(!this._lock)
					this._owner.typeset();
				if(this._isChanged){
					Laya.timer.clear(this,this.typeset);
					this._isChanged=false;
				}
				this._sizeDirty=false;
			}
			__proto.setChanged=function(){
				this.isChanged=true;
			}
			__getset(0,__proto,'isChanged',null,function(value){
				if (value && !this._sizeDirty){
					if(this._owner.autoSize!=0 && this._owner.parent){
						this._sizeDirty=true;
						this.event("fui_size_delay_change");
					}
				}
				Laya.superSet(Text,this,'isChanged',value);
			});
			return TextExt;
		})(Text)
	}

	return GBasicTextField;
})(GTextField)


//class fairygui.GComboBox extends fairygui.GComponent
var GComboBox=(function(_super){
	function GComboBox(){
		this.dropdown=null;
		this._titleObject=null;
		this._iconObject=null;
		this._list=null;
		this._items=null;
		this._icons=null;
		this._values=null;
		this._popupDirection=0;
		this._visibleItemCount=0;
		this._itemsUpdated=false;
		this._selectedIndex=0;
		this._buttonController=null;
		this._selectionController=null;
		this._down=false;
		this._over=false;
		GComboBox.__super.call(this);
		this._visibleItemCount=UIConfig$1.defaultComboBoxVisibleItemCount;
		this._itemsUpdated=true;
		this._selectedIndex=-1;
		this._items=[];
		this._values=[];
	}

	__class(GComboBox,'fairygui.GComboBox',_super);
	var __proto=GComboBox.prototype;
	__proto.getTextField=function(){
		if ((this._titleObject instanceof fairygui.GTextField ))
			return this._titleObject;
		else if ((this._titleObject instanceof fairygui.GLabel ))
		return (this._titleObject).getTextField();
		else if ((this._titleObject instanceof fairygui.GButton ))
		return (this._titleObject).getTextField();
		else
		return null;
	}

	__proto.setState=function(val){
		if (this._buttonController)
			this._buttonController.selectedPage=val;
	}

	__proto.handleControllerChanged=function(c){
		_super.prototype.handleControllerChanged.call(this,c);
		if (this._selectionController==c)
			this.selectedIndex=c.selectedIndex;
	}

	__proto.updateSelectionController=function(){
		if (this._selectionController !=null && !this._selectionController.changing
			&& this._selectedIndex < this._selectionController.pageCount){
			var c=this._selectionController;
			this._selectionController=null;
			c.selectedIndex=this._selectedIndex;
			this._selectionController=c;
		}
	}

	__proto.dispose=function(){
		if(this.dropdown){
			this.dropdown.dispose();
			this.dropdown=null;
		}
		this._selectionController=null;
		_super.prototype.dispose.call(this);
	}

	__proto.constructExtension=function(buffer){
		var str;
		this._buttonController=this.getController("button");
		this._titleObject=this.getChild("title");
		this._iconObject=this.getChild("icon");
		str=buffer.readS();
		if (str){
			this.dropdown=(UIPackage.createObjectFromURL(str));
			if (!this.dropdown){
				Log.print("下拉框必须为元件");
				return;
			}
			this.dropdown.name="this._dropdownObject";
			this._list=this.dropdown.getChild("list").asList;
			if (this._list==null){
				Log.print(this.resourceURL+": 下拉框的弹出元件里必须包含名为list的列表");
				return;
			}
			this._list.on("fui_click_item",this,this.__clickItem);
			this._list.addRelation(this.dropdown,14);
			this._list.removeRelation(this.dropdown,15);
			this.dropdown.addRelation(this._list,15);
			this.dropdown.removeRelation(this._list,14);
			this.dropdown.displayObject.on("undisplay",this,this.__popupWinClosed);
		}
		this.on("mouseover",this,this.__rollover);
		this.on("mouseout",this,this.__rollout);
		this.on("mousedown",this,this.__mousedown);
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		if (!buffer.seek(beginPos,6))
			return;
		if (buffer.readByte()!=this.packageItem.objectType)
			return;
		var i=0;
		var iv=0;
		var nextPos=0;
		var str;
		var itemCount=buffer.getInt16();
		for (i=0;i < itemCount;i++){
			nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			this._items[i]=buffer.readS();
			this._values[i]=buffer.readS();
			str=buffer.readS();
			if (str !=null){
				if (this._icons==null)
					this._icons=[];
				this._icons[i]=str;
			}
			buffer.pos=nextPos;
		}
		str=buffer.readS();
		if (str !=null){
			this.text=str;
			this._selectedIndex=this._items.indexOf(str);
		}
		else if (this._items.length > 0){
			this._selectedIndex=0;
			this.text=this._items[0];
		}
		else
		this._selectedIndex=-1;
		str=buffer.readS();
		if (str !=null)
			this.icon=str;
		if (buffer.readBool())
			this.titleColor=buffer.readColorS();
		iv=buffer.getInt32();
		if (iv > 0)
			this._visibleItemCount=iv;
		this._popupDirection=buffer.readByte();
		iv=buffer.getInt16();
		if (iv >=0)
			this._selectionController=this.parent.getControllerAt(iv);
	}

	__proto.showDropdown=function(){
		if (this._itemsUpdated){
			this._itemsUpdated=false;
			this._list.removeChildrenToPool();
			var cnt=this._items.length;
			for (var i=0;i < cnt;i++){
				var item=this._list.addItemFromPool();
				item.name=i < this._values.length ? this._values[i] :"";
				item.text=this._items[i];
				item.icon=(this._icons !=null && i < this._icons.length)? this._icons[i] :null;
			}
			this._list.resizeToFit(this._visibleItemCount);
		}
		this._list.selectedIndex=-1;
		this.dropdown.width=this.width;
		var downward=null;
		if (this._popupDirection==2)
			downward=true;
		else if (this._popupDirection==1)
		downward=false;
		this.root.togglePopup(this.dropdown,this,downward);
		if (this.dropdown.parent)
			this.setState("down");
	}

	__proto.__popupWinClosed=function(){
		if(this._over)
			this.setState("over");
		else
		this.setState("up");
	}

	__proto.__clickItem=function(itemObject,evt){
		Laya.timer.callLater(this,this.__clickItem2,[this._list.getChildIndex(itemObject),evt])
	}

	__proto.__clickItem2=function(index,evt){
		if ((this.dropdown.parent instanceof fairygui.GRoot ))
			(this.dropdown.parent).hidePopup();
		this._selectedIndex=-1;
		this.selectedIndex=index;
		Events.dispatch("fui_state_changed",this.displayObject,evt);
	}

	__proto.__rollover=function(){
		this._over=true;
		if (this._down || this.dropdown && this.dropdown.parent)
			return;
		this.setState("over");
	}

	__proto.__rollout=function(){
		this._over=false;
		if (this._down || this.dropdown && this.dropdown.parent)
			return;
		this.setState("up");
	}

	__proto.__mousedown=function(evt){
		if((evt.target instanceof laya.display.Input ))
			return;
		this._down=true;
		GRoot.inst.checkPopups(evt.target);
		Laya.stage.on("mouseup",this,this.__mouseup);
		if (this.dropdown)
			this.showDropdown();
	}

	__proto.__mouseup=function(){
		if(this._down){
			this._down=false;
			Laya.stage.off("mouseup",this,this.__mouseup);
			if(this.dropdown && !this.dropdown.parent){
				if(this._over)
					this.setState("over");
				else
				this.setState("up");
			}
		}
	}

	__getset(0,__proto,'selectionController',function(){
		return this._selectionController;
		},function(value){
		this._selectionController=value;
	});

	__getset(0,__proto,'selectedIndex',function(){
		return this._selectedIndex;
		},function(val){
		if(this._selectedIndex==val)
			return;
		this._selectedIndex=val;
		if(this._selectedIndex>=0 && this._selectedIndex<this._items.length){
			this.text=this._items[this._selectedIndex];
			if (this._icons !=null && this._selectedIndex < this._icons.length)
				this.icon=this._icons[this._selectedIndex];
		}
		else{
			this.text="";
			if (this._icons !=null)
				this.icon=null;
		}
		this.updateSelectionController();
	});

	__getset(0,__proto,'text',function(){
		if (this._titleObject)
			return this._titleObject.text;
		else
		return null;
		},function(value){
		if (this._titleObject)
			this._titleObject.text=value;
		this.updateGear(6);
	});

	__getset(0,__proto,'icons',function(){
		return this._icons;
		},function(value){
		this._icons=value;
		if (this._icons !=null && this._selectedIndex !=-1 && this._selectedIndex < this._icons.length)
			this.icon=this._icons[this._selectedIndex];
	});

	__getset(0,__proto,'items',function(){
		return this._items;
		},function(value){
		if(!value)
			this._items.length=0;
		else
		this._items=value.concat();
		if(this._items.length>0){
			if(this._selectedIndex>=this._items.length)
				this._selectedIndex=this._items.length-1;
			else if(this._selectedIndex==-1)
			this._selectedIndex=0;
			this.text=this._items[this._selectedIndex];
			if (this._icons !=null && this._selectedIndex < this._icons.length)
				this.icon=this._icons[this._selectedIndex];
		}
		else{
			this.text="";
			if (this._icons !=null)
				this.icon=null;
			this._selectedIndex=-1;
		}
		this._itemsUpdated=true;
	});

	__getset(0,__proto,'values',function(){
		return this._values;
		},function(value){
		if (!value)
			this._values.length=0;
		else
		this._values=value.concat();
	});

	/**
	*@see PopupDirection
	*/
	/**
	*@see PopupDirection
	*/
	__getset(0,__proto,'popupDirection',function(){
		return this._popupDirection;
		},function(value){
		this._popupDirection=value;
	});

	__getset(0,__proto,'value',function(){
		return this._values[this._selectedIndex];
		},function(val){
		this.selectedIndex=this._values.indexOf(val);
	});

	__getset(0,__proto,'icon',function(){
		if(this._iconObject)
			return this._iconObject.icon;
		else
		return null;
		},function(value){
		if(this._iconObject)
			this._iconObject.icon=value;
		this.updateGear(7);
	});

	__getset(0,__proto,'titleColor',function(){
		var tf=this.getTextField();
		if(tf!=null)
			return tf.color;
		else
		return "#000000";
		},function(value){
		var tf=this.getTextField();
		if(tf!=null)
			tf.color=value;
		this.updateGear(4);
	});

	__getset(0,__proto,'visibleItemCount',function(){
		return this._visibleItemCount;
		},function(value){
		this._visibleItemCount=value;
	});

	__getset(0,__proto,'titleFontSize',function(){
		var tf=this.getTextField();
		if(tf!=null)
			return tf.fontSize;
		else
		return 0;
		},function(value){
		var tf=this.getTextField();
		if(tf!=null)
			tf.fontSize=value;
	});

	return GComboBox;
})(GComponent)


//class fairygui.GList extends fairygui.GComponent
var GList=(function(_super){
	var ItemInfo;
	function GList(){
		/**
		*itemRenderer(int index,GObject item);
		*/
		this.itemRenderer=null;
		/**
		*itemProvider(index:int):String;
		*/
		this.itemProvider=null;
		this.scrollItemToViewOnClick=false;
		this.foldInvisibleItems=false;
		this._layout=0;
		this._lineCount=0;
		this._columnCount=0;
		this._lineGap=0;
		this._columnGap=0;
		this._defaultItem=null;
		this._autoResizeItem=false;
		this._selectionMode=0;
		this._align=null;
		this._verticalAlign=null;
		this._selectionController=null;
		this._lastSelectedIndex=0;
		this._pool=null;
		//Virtual List support
		this._virtual=false;
		this._loop=false;
		this._numItems=0;
		this._realNumItems=0;
		this._firstIndex=0;
		//the top left index
		this._curLineItemCount=0;
		//item count in one line
		this._curLineItemCount2=0;
		//只用在页面模式，表示垂直方向的项目数
		this._itemSize=null;
		this._virtualListChanged=0;
		//1-content changed,2-size changed
		this._virtualItems=null;
		this._eventLocked=false;
		this.itemInfoVer=0;
		GList.__super.call(this);
		this._trackBounds=true;
		this._pool=new GObjectPool();
		this._layout=0;
		this._autoResizeItem=true;
		this._lastSelectedIndex=-1;
		this._selectionMode=0;
		this.opaque=true;
		this.scrollItemToViewOnClick=true;
		this._align="left";
		this._verticalAlign="top";
		this._container=new Sprite();
		this._displayObject.addChild(this._container);
	}

	__class(GList,'fairygui.GList',_super);
	var __proto=GList.prototype;
	__proto.dispose=function(){
		this._pool.clear();
		_super.prototype.dispose.call(this);
	}

	__proto.getFromPool=function(url){
		if (!url)
			url=this._defaultItem;
		var obj=this._pool.getObject(url);
		if(obj!=null)
			obj.visible=true;
		return obj;
	}

	__proto.returnToPool=function(obj){
		obj.displayObject.cacheAsBitmap=false;
		this._pool.returnObject(obj);
	}

	__proto.addChildAt=function(child,index){
		(index===void 0)&& (index=0);
		_super.prototype.addChildAt.call(this,child,index);
		if ((child instanceof fairygui.GButton )){
			var button=(child);
			button.selected=false;
			button.changeStateOnClick=false;
		}
		child.on("click",this,this.__clickItem);
		return child;
	}

	__proto.addItem=function(url){
		if (!url)
			url=this._defaultItem;
		return this.addChild(UIPackage.createObjectFromURL(url));
	}

	__proto.addItemFromPool=function(url){
		return this.addChild(this.getFromPool(url));
	}

	__proto.removeChildAt=function(index,dispose){
		(dispose===void 0)&& (dispose=false);
		var child=_super.prototype.removeChildAt.call(this,index,dispose);
		child.off("click",this,this.__clickItem);
		return child;
	}

	__proto.removeChildToPoolAt=function(index){
		(index===void 0)&& (index=0);
		var child=_super.prototype.removeChildAt.call(this,index);
		this.returnToPool(child);
	}

	__proto.removeChildToPool=function(child){
		this.removeChild(child);
		this.returnToPool(child);
	}

	__proto.removeChildrenToPool=function(beginIndex,endIndex){
		(beginIndex===void 0)&& (beginIndex=0);
		(endIndex===void 0)&& (endIndex=-1);
		if (endIndex < 0 || endIndex >=this._children.length)
			endIndex=this._children.length-1;
		for (var i=beginIndex;i <=endIndex;++i)
		this.removeChildToPoolAt(beginIndex);
	}

	__proto.getSelection=function(){
		var ret=[];
		var i=0;
		if (this._virtual){
			for (i=0;i < this._realNumItems;i++){
				var ii=this._virtualItems[i];
				if (((ii.obj instanceof fairygui.GButton ))&& (ii.obj).selected
					|| ii.obj==null && ii.selected){
					var j=i;
					if (this._loop){
						j=i % this._numItems;
						if (ret.indexOf(j)!=-1)
							continue ;
					}
					ret.push(j);
				}
			}
		}
		else{
			var cnt=this._children.length;
			for (i=0;i < cnt;i++){
				var obj=this._children[i].asButton;
				if (obj !=null && obj.selected)
					ret.push(i);
			}
		}
		return ret;
	}

	__proto.addSelection=function(index,scrollItToView){
		(scrollItToView===void 0)&& (scrollItToView=false);
		if(this._selectionMode==3)
			return;
		this.checkVirtualList();
		if(this._selectionMode==0)
			this.clearSelection();
		if (scrollItToView)
			this.scrollToView(index);
		this._lastSelectedIndex=index;
		var obj=null;
		if (this._virtual){
			var ii=this._virtualItems[index];
			if (ii.obj !=null)
				obj=ii.obj.asButton;
			ii.selected=true;
		}
		else
		obj=this.getChildAt(index).asButton;
		if (obj !=null && !obj.selected){
			obj.selected=true;
			this.updateSelectionController(index);
		}
	}

	__proto.removeSelection=function(index){
		if(this._selectionMode==3)
			return;
		var obj=null;
		if (this._virtual){
			var ii=this._virtualItems[index];
			if (ii.obj !=null)
				obj=ii.obj.asButton;
			ii.selected=false;
		}
		else
		obj=this.getChildAt(index).asButton;
		if (obj !=null)
			obj.selected=false;
	}

	__proto.clearSelection=function(){
		var i=0;
		if (this._virtual){
			for (i=0;i < this._realNumItems;i++){
				var ii=this._virtualItems[i];
				if ((ii.obj instanceof fairygui.GButton ))
					(ii.obj).selected=false;
				ii.selected=false;
			}
		}
		else{
			var cnt=this._children.length;
			for (i=0;i < cnt;i++){
				var obj=this._children[i].asButton;
				if (obj !=null)
					obj.selected=false;
			}
		}
	}

	__proto.clearSelectionExcept=function(g){
		var i=0;
		if (this._virtual){
			for (i=0;i < this._realNumItems;i++){
				var ii=this._virtualItems[i];
				if (ii.obj !=g){
					if (((ii.obj instanceof fairygui.GButton )))
						(ii.obj).selected=false;
					ii.selected=false;
				}
			}
		}
		else{
			var cnt=this._children.length;
			for (i=0;i < cnt;i++){
				var obj=this._children[i].asButton;
				if (obj !=null && obj !=g)
					obj.selected=false;
			}
		}
	}

	__proto.selectAll=function(){
		this.checkVirtualList();
		var last=-1;
		var i=0;
		if (this._virtual){
			for (i=0;i < this._realNumItems;i++){
				var ii=this._virtualItems[i];
				if (((ii.obj instanceof fairygui.GButton ))&& !(ii.obj).selected){
					(ii.obj).selected=true;
					last=i;
				}
				ii.selected=true;
			}
		}
		else{
			var cnt=this._children.length;
			for (i=0;i < cnt;i++){
				var obj=this._children[i].asButton;
				if (obj !=null && !obj.selected){
					obj.selected=true;
					last=i;
				}
			}
		}
		if(last!=-1)
			this.updateSelectionController(last);
	}

	__proto.selectNone=function(){
		this.clearSelection();
	}

	__proto.selectReverse=function(){
		this.checkVirtualList();
		var last=-1;
		var i=0;
		if (this._virtual){
			for (i=0;i < this._realNumItems;i++){
				var ii=this._virtualItems[i];
				if ((ii.obj instanceof fairygui.GButton )){
					(ii.obj).selected=!(ii.obj).selected;
					if ((ii.obj).selected)
						last=i;
				}
				ii.selected=!ii.selected;
			}
		}
		else{
			var cnt=this._children.length;
			for (i=0;i < cnt;i++){
				var obj=this._children[i].asButton;
				if (obj !=null){
					obj.selected=!obj.selected;
					if (obj.selected)
						last=i;
				}
			}
		}
		if(last!=-1)
			this.updateSelectionController(last);
	}

	__proto.handleArrowKey=function(dir){
		(dir===void 0)&& (dir=0);
		var index=this.selectedIndex;
		if (index==-1)
			return;
		switch (dir){
			case 1:
				if (this._layout==0 || this._layout==3){
					index--;
					if (index >=0){
						this.clearSelection();
						this.addSelection(index,true);
					}
				}
				else if (this._layout==2 || this._layout==4){
					var current=this._children[index];
					var k=0;
					for (var i=index-1;i >=0;i--){
						var obj=this._children[i];
						if (obj.y !=current.y){
							current=obj;
							break ;
						}
						k++;
					}
					for (;i >=0;i--){
						obj=this._children[i];
						if (obj.y !=current.y){
							this.clearSelection();
							this.addSelection(i+k+1,true);
							break ;
						}
					}
				}
				break ;
			case 3:
				if (this._layout==1 || this._layout==2 || this._layout==4){
					index++;
					if (index < this._children.length){
						this.clearSelection();
						this.addSelection(index,true);
					}
				}
				else if (this._layout==3){
					current=this._children[index];
					k=0;
					var cnt=this._children.length;
					for (i=index+1;i < cnt;i++){
						obj=this._children[i];
						if (obj.x !=current.x){
							current=obj;
							break ;
						}
						k++;
					}
					for (;i < cnt;i++){
						obj=this._children[i];
						if (obj.x !=current.x){
							this.clearSelection();
							this.addSelection(i-k-1,true);
							break ;
						}
					}
				}
				break ;
			case 5:
				if (this._layout==0 || this._layout==3){
					index++;
					if (index < this._children.length){
						this.clearSelection();
						this.addSelection(index,true);
					}
				}
				else if (this._layout==2 || this._layout==4){
					current=this._children[index];
					k=0;
					cnt=this._children.length;
					for (i=index+1;i < cnt;i++){
						obj=this._children[i];
						if (obj.y !=current.y){
							current=obj;
							break ;
						}
						k++;
					}
					for (;i < cnt;i++){
						obj=this._children[i];
						if (obj.y !=current.y){
							this.clearSelection();
							this.addSelection(i-k-1,true);
							break ;
						}
					}
				}
				break ;
			case 7:
				if (this._layout==1 || this._layout==2 || this._layout==4){
					index--;
					if (index >=0){
						this.clearSelection();
						this.addSelection(index,true);
					}
				}
				else if (this._layout==3){
					current=this._children[index];
					k=0;
					for (i=index-1;i >=0;i--){
						obj=this._children[i];
						if (obj.x !=current.x){
							current=obj;
							break ;
						}
						k++;
					}
					for (;i >=0;i--){
						obj=this._children[i];
						if (obj.x !=current.x){
							this.clearSelection();
							this.addSelection(i+k+1,true);
							break ;
						}
					}
				}
				break ;
			}
	}

	__proto.__clickItem=function(evt){
		if (this._scrollPane !=null && this._scrollPane.isDragged)
			return;
		var item=GObject.cast(evt.currentTarget);
		this.setSelectionOnEvent(item,evt);
		if(this._scrollPane && this.scrollItemToViewOnClick)
			this._scrollPane.scrollToView(item,true);
		this.displayObject.event("fui_click_item",[item,Events.createEvent("fui_click_item",this.displayObject,evt)]);
	}

	__proto.setSelectionOnEvent=function(item,evt){
		if (!((item instanceof fairygui.GButton ))|| this._selectionMode==3)
			return;
		var dontChangeLastIndex=false;
		var button=(item);
		var index=this.childIndexToItemIndex(this.getChildIndex(item));
		if (this._selectionMode==0){
			if (!button.selected){
				this.clearSelectionExcept(button);
				button.selected=true;
			}
		}
		else {
			if (evt.shiftKey){
				if (!button.selected){
					if (this._lastSelectedIndex !=-1){
						var min=Math.min(this._lastSelectedIndex,index);
						var max=Math.max(this._lastSelectedIndex,index);
						max=Math.min(max,this.numItems-1);
						var i=0;
						if (this._virtual){
							for (i=min;i <=max;i++){
								var ii=this._virtualItems[i];
								if ((ii.obj instanceof fairygui.GButton ))
									(ii.obj).selected=true;
								ii.selected=true;
							}
						}
						else{
							for(i=min;i<=max;i++){
								var obj=this.getChildAt(i).asButton;
								if(obj!=null)
									obj.selected=true;
							}
						}
						dontChangeLastIndex=true;
					}
					else {
						button.selected=true;
					}
				}
			}
			else if (evt.ctrlKey || this._selectionMode==2){
				button.selected=!button.selected;
			}
			else {
				if (!button.selected){
					this.clearSelectionExcept(button);
					button.selected=true;
				}
				else
				this.clearSelectionExcept(button);
			}
		}
		if (!dontChangeLastIndex)
			this._lastSelectedIndex=index;
		if(button.selected)
			this.updateSelectionController(index);
	}

	__proto.resizeToFit=function(itemCount,minSize){
		(itemCount===void 0)&& (itemCount=1000000);
		(minSize===void 0)&& (minSize=0);
		this.ensureBoundsCorrect();
		var curCount=this.numItems;
		if (itemCount > curCount)
			itemCount=curCount;
		if(this._virtual){
			var lineCount=Math.ceil(itemCount / this._curLineItemCount);
			if(this._layout==0 || this._layout==2)
				this.viewHeight=lineCount *this._itemSize.y+Math.max(0,lineCount-1)*this._lineGap;
			else
			this.viewWidth=lineCount *this._itemSize.x+Math.max(0,lineCount-1)*this._columnGap;
		}
		else if(itemCount==0){
			if (this._layout==0 || this._layout==2)
				this.viewHeight=minSize;
			else
			this.viewWidth=minSize;
		}
		else {
			var i=itemCount-1;
			var obj=null;
			while (i >=0){
				obj=this.getChildAt(i);
				if (!this.foldInvisibleItems || obj.visible)
					break ;
				i--;
			}
			if (i < 0){
				if (this._layout==0 || this._layout==2)
					this.viewHeight=minSize;
				else
				this.viewWidth=minSize;
			}
			else {
				var size=0;
				if (this._layout==0 || this._layout==2){
					size=obj.y+obj.height;
					if (size < minSize)
						size=minSize;
					this.viewHeight=size;
				}
				else {
					size=obj.x+obj.width;
					if (size < minSize)
						size=minSize;
					this.viewWidth=size;
				}
			}
		}
	}

	__proto.getMaxItemWidth=function(){
		var cnt=this._children.length;
		var max=0;
		for (var i=0;i < cnt;i++){
			var child=this.getChildAt(i);
			if (child.width > max)
				max=child.width;
		}
		return max;
	}

	__proto.handleSizeChanged=function(){
		_super.prototype.handleSizeChanged.call(this);
		this.setBoundsChangedFlag();
		if (this._virtual)
			this.setVirtualListChangedFlag(true);
	}

	__proto.handleControllerChanged=function(c){
		_super.prototype.handleControllerChanged.call(this,c);
		if (this._selectionController==c)
			this.selectedIndex=c.selectedIndex;
	}

	__proto.updateSelectionController=function(index){
		if (this._selectionController !=null && !this._selectionController.changing
			&& index < this._selectionController.pageCount){
			var c=this._selectionController;
			this._selectionController=null;
			c.selectedIndex=index;
			this._selectionController=c;
		}
	}

	__proto.getSnappingPosition=function(xValue,yValue,resultPoint){
		if (this._virtual){
			if(!resultPoint)
				resultPoint=new Point();
			var saved=NaN;
			var index=0;
			if (this._layout==0 || this._layout==2){
				saved=yValue;
				fairygui.GList.pos_param=yValue;
				index=this.getIndexOnPos1(false);
				yValue=fairygui.GList.pos_param;
				if (index < this._virtualItems.length && saved-yValue > this._virtualItems[index].height / 2 && index < this._realNumItems)
					yValue+=this._virtualItems[index].height+this._lineGap;
			}
			else if (this._layout==1 || this._layout==3){
				saved=xValue;
				fairygui.GList.pos_param=xValue;
				index=this.getIndexOnPos2(false);
				xValue=fairygui.GList.pos_param;
				if (index < this._virtualItems.length && saved-xValue > this._virtualItems[index].width / 2 && index < this._realNumItems)
					xValue+=this._virtualItems[index].width+this._columnGap;
			}
			else{
				saved=xValue;
				fairygui.GList.pos_param=xValue;
				index=this.getIndexOnPos3(false);
				xValue=fairygui.GList.pos_param;
				if (index < this._virtualItems.length && saved-xValue > this._virtualItems[index].width / 2 && index < this._realNumItems)
					xValue+=this._virtualItems[index].width+this._columnGap;
			}
			resultPoint.x=xValue;
			resultPoint.y=yValue;
			return resultPoint;
		}
		else
		return _super.prototype.getSnappingPosition.call(this,xValue,yValue,resultPoint);
	}

	__proto.scrollToView=function(index,ani,setFirst){
		(ani===void 0)&& (ani=false);
		(setFirst===void 0)&& (setFirst=false);
		if (this._virtual){
			if(this._numItems==0)
				return;
			this.checkVirtualList();
			if (index >=this._virtualItems.length)
				throw new Error("Invalid child index: "+index+">"+this._virtualItems.length);
			if(this._loop)
				index=Math.floor(this._firstIndex/this._numItems)*this._numItems+index;
			var rect;
			var ii=this._virtualItems[index];
			var pos=0;
			var i=0;
			if (this._layout==0 || this._layout==2){
				for (i=this._curLineItemCount-1;i < index;i+=this._curLineItemCount)
				pos+=this._virtualItems[i].height+this._lineGap;
				rect=new Rectangle(0,pos,this._itemSize.x,ii.height);
			}
			else if (this._layout==1 || this._layout==3){
				for (i=this._curLineItemCount-1;i < index;i+=this._curLineItemCount)
				pos+=this._virtualItems[i].width+this._columnGap;
				rect=new Rectangle(pos,0,ii.width,this._itemSize.y);
			}
			else{
				var page=index / (this._curLineItemCount *this._curLineItemCount2);
				rect=new Rectangle(page *this.viewWidth+(index % this._curLineItemCount)*(ii.width+this._columnGap),
				(index / this._curLineItemCount)% this._curLineItemCount2 *(ii.height+this._lineGap),
				ii.width,ii.height);
			}
			setFirst=true;
			if (this._scrollPane !=null)
				this._scrollPane.scrollToView(rect,ani,setFirst);
		}
		else{
			var obj=this.getChildAt(index);
			if (this._scrollPane !=null)
				this._scrollPane.scrollToView(obj,ani,setFirst);
			else if (this.parent !=null && this.parent.scrollPane !=null)
			this.parent.scrollPane.scrollToView(obj,ani,setFirst);
		}
	}

	__proto.getFirstChildInView=function(){
		return this.childIndexToItemIndex(_super.prototype.getFirstChildInView.call(this));
	}

	__proto.childIndexToItemIndex=function(index){
		if (!this._virtual)
			return index;
		if (this._layout==4){
			for (var i=this._firstIndex;i < this._realNumItems;i++){
				if (this._virtualItems[i].obj !=null){
					index--;
					if (index < 0)
						return i;
				}
			}
			return index;
		}
		else{
			index+=this._firstIndex;
			if (this._loop && this._numItems > 0)
				index=index % this._numItems;
			return index;
		}
	}

	__proto.itemIndexToChildIndex=function(index){
		if (!this._virtual)
			return index;
		if (this._layout==4){
			return this.getChildIndex(this._virtualItems[index].obj);
		}
		else{
			if (this._loop && this._numItems > 0){
				var j=this._firstIndex % this._numItems;
				if (index >=j)
					index=index-j;
				else
				index=this._numItems-j+index;
			}
			else
			index-=this._firstIndex;
			return index;
		}
	}

	__proto.setVirtual=function(){
		this._setVirtual(false);
	}

	/**
	*Set the list to be virtual list,and has loop behavior.
	*/
	__proto.setVirtualAndLoop=function(){
		this._setVirtual(true);
	}

	__proto._setVirtual=function(loop){
		if(!this._virtual){
			if(this._scrollPane==null)
				throw new Error("Virtual list must be scrollable!");
			if(loop){
				if(this._layout==2 || this._layout==3)
					throw new Error("Loop list is not supported for FlowHorizontal or FlowVertical layout!");
				this._scrollPane.bouncebackEffect=false;
			}
			this._virtual=true;
			this._loop=loop;
			this._virtualItems=[];
			this.removeChildrenToPool();
			if(this._itemSize==null){
				this._itemSize=new Point();
				var obj=this.getFromPool(null);
				if (obj==null){
					throw new Error("Virtual List must have a default list item resource.");
				}
				else{
					this._itemSize.x=obj.width;
					this._itemSize.y=obj.height;
				}
				this.returnToPool(obj);
			}
			if(this._layout==0 || this._layout==2){
				this._scrollPane.scrollStep=this._itemSize.y;
				if(this._loop)
					this._scrollPane._loop=2;
			}
			else{
				this._scrollPane.scrollStep=this._itemSize.x;
				if(this._loop)
					this._scrollPane._loop=1;
			}
			this.on("fui_scroll",this,this.__scrolled);
			this.setVirtualListChangedFlag(true);
		}
	}

	__proto.refreshVirtualList=function(){
		this.setVirtualListChangedFlag(false);
	}

	__proto.checkVirtualList=function(){
		if(this._virtualListChanged!=0){
			this._refreshVirtualList();
			Laya.timer.clear(this,this._refreshVirtualList);
		}
	}

	__proto.setVirtualListChangedFlag=function(layoutChanged){
		(layoutChanged===void 0)&& (layoutChanged=false);
		if(layoutChanged)
			this._virtualListChanged=2;
		else if(this._virtualListChanged==0)
		this._virtualListChanged=1;
		Laya.timer.callLater(this,this._refreshVirtualList);
	}

	__proto._refreshVirtualList=function(){
		var layoutChanged=this._virtualListChanged==2;
		this._virtualListChanged=0;
		this._eventLocked=true;
		if (layoutChanged){
			if (this._layout==0 || this._layout==1)
				this._curLineItemCount=1;
			else if (this._layout==2){
				if (this._columnCount > 0)
					this._curLineItemCount=this._columnCount;
				else{
					this._curLineItemCount=Math.floor((this._scrollPane.viewWidth+this._columnGap)/ (this._itemSize.x+this._columnGap));
					if (this._curLineItemCount <=0)
						this._curLineItemCount=1;
				}
			}
			else if (this._layout==3){
				if (this._lineCount > 0)
					this._curLineItemCount=this._lineCount;
				else{
					this._curLineItemCount=Math.floor((this._scrollPane.viewHeight+this._lineGap)/ (this._itemSize.y+this._lineGap));
					if (this._curLineItemCount <=0)
						this._curLineItemCount=1;
				}
			}
			else{
				if (this._columnCount > 0)
					this._curLineItemCount=this._columnCount;
				else{
					this._curLineItemCount=Math.floor((this._scrollPane.viewWidth+this._columnGap)/ (this._itemSize.x+this._columnGap));
					if (this._curLineItemCount <=0)
						this._curLineItemCount=1;
				}
				if (this._lineCount > 0)
					this._curLineItemCount2=this._lineCount;
				else{
					this._curLineItemCount2=Math.floor((this._scrollPane.viewHeight+this._lineGap)/ (this._itemSize.y+this._lineGap));
					if (this._curLineItemCount2 <=0)
						this._curLineItemCount2=1;
				}
			}
		};
		var ch=0,cw=0;
		if (this._realNumItems > 0){
			var i=0;
			var len=Math.ceil(this._realNumItems / this._curLineItemCount)*this._curLineItemCount;
			var len2=Math.min(this._curLineItemCount,this._realNumItems);
			if (this._layout==0 || this._layout==2){
				for (i=0;i < len;i+=this._curLineItemCount)
				ch+=this._virtualItems[i].height+this._lineGap;
				if (ch > 0)
					ch-=this._lineGap;
				if (this._autoResizeItem)
					cw=this._scrollPane.viewWidth;
				else{
					for (i=0;i < len2;i++)
					cw+=this._virtualItems[i].width+this._columnGap;
					if (cw > 0)
						cw-=this._columnGap;
				}
			}
			else if (this._layout==1 || this._layout==3){
				for (i=0;i < len;i+=this._curLineItemCount)
				cw+=this._virtualItems[i].width+this._columnGap;
				if (cw > 0)
					cw-=this._columnGap;
				if (this._autoResizeItem)
					ch=this._scrollPane.viewHeight;
				else{
					for (i=0;i < len2;i++)
					ch+=this._virtualItems[i].height+this._lineGap;
					if (ch > 0)
						ch-=this._lineGap;
				}
			}
			else{
				var pageCount=Math.ceil(len / (this._curLineItemCount *this._curLineItemCount2));
				cw=pageCount *this.viewWidth;
				ch=this.viewHeight;
			}
		}
		this.handleAlign(cw,ch);
		this._scrollPane.setContentSize(cw,ch);
		this._eventLocked=false;
		this.handleScroll(true);
	}

	__proto.__scrolled=function(evt){
		this.handleScroll(false);
	}

	__proto.getIndexOnPos1=function(forceUpdate){
		if (this._realNumItems < this._curLineItemCount){
			GList.pos_param=0;
			return 0;
		};
		var i=0;
		var pos2=NaN;
		var pos3=NaN;
		if (this.numChildren > 0 && !forceUpdate){
			pos2=this.getChildAt(0).y;
			if (pos2 > GList.pos_param){
				for (i=this._firstIndex-this._curLineItemCount;i >=0;i-=this._curLineItemCount){
					pos2-=(this._virtualItems[i].height+this._lineGap);
					if (pos2 <=GList.pos_param){
						GList.pos_param=pos2;
						return i;
					}
				}
				GList.pos_param=0;
				return 0;
			}
			else{
				for (i=this._firstIndex;i < this._realNumItems;i+=this._curLineItemCount){
					pos3=pos2+this._virtualItems[i].height+this._lineGap;
					if (pos3 > GList.pos_param){
						GList.pos_param=pos2;
						return i;
					}
					pos2=pos3;
				}
				GList.pos_param=pos2;
				return this._realNumItems-this._curLineItemCount;
			}
		}
		else{
			pos2=0;
			for (i=0;i < this._realNumItems;i+=this._curLineItemCount){
				pos3=pos2+this._virtualItems[i].height+this._lineGap;
				if (pos3 > GList.pos_param){
					GList.pos_param=pos2;
					return i;
				}
				pos2=pos3;
			}
			GList.pos_param=pos2;
			return this._realNumItems-this._curLineItemCount;
		}
	}

	__proto.getIndexOnPos2=function(forceUpdate){
		if (this._realNumItems < this._curLineItemCount){
			GList.pos_param=0;
			return 0;
		};
		var i=0;
		var pos2=NaN;
		var pos3=NaN;
		if (this.numChildren > 0 && !forceUpdate){
			pos2=this.getChildAt(0).x;
			if (pos2 > GList.pos_param){
				for (i=this._firstIndex-this._curLineItemCount;i >=0;i-=this._curLineItemCount){
					pos2-=(this._virtualItems[i].width+this._columnGap);
					if (pos2 <=GList.pos_param){
						GList.pos_param=pos2;
						return i;
					}
				}
				GList.pos_param=0;
				return 0;
			}
			else{
				for (i=this._firstIndex;i < this._realNumItems;i+=this._curLineItemCount){
					pos3=pos2+this._virtualItems[i].width+this._columnGap;
					if (pos3 > GList.pos_param){
						GList.pos_param=pos2;
						return i;
					}
					pos2=pos3;
				}
				GList.pos_param=pos2;
				return this._realNumItems-this._curLineItemCount;
			}
		}
		else{
			pos2=0;
			for (i=0;i < this._realNumItems;i+=this._curLineItemCount){
				pos3=pos2+this._virtualItems[i].width+this._columnGap;
				if (pos3 > GList.pos_param){
					GList.pos_param=pos2;
					return i;
				}
				pos2=pos3;
			}
			GList.pos_param=pos2;
			return this._realNumItems-this._curLineItemCount;
		}
	}

	__proto.getIndexOnPos3=function(forceUpdate){
		if (this._realNumItems < this._curLineItemCount){
			GList.pos_param=0;
			return 0;
		};
		var viewWidth=this.viewWidth;
		var page=Math.floor(GList.pos_param / viewWidth);
		var startIndex=page *(this._curLineItemCount *this._curLineItemCount2);
		var pos2=page *viewWidth;
		var i=0;
		var pos3=NaN;
		for (i=0;i < this._curLineItemCount;i++){
			pos3=pos2+this._virtualItems[startIndex+i].width+this._columnGap;
			if (pos3 > GList.pos_param){
				GList.pos_param=pos2;
				return startIndex+i;
			}
			pos2=pos3;
		}
		GList.pos_param=pos2;
		return startIndex+this._curLineItemCount-1;
	}

	__proto.handleScroll=function(forceUpdate){
		if (this._eventLocked)
			return;
		if (this._layout==0 || this._layout==2){
			var enterCounter=0;
			while(this.handleScroll1(forceUpdate)){
				enterCounter++;
				forceUpdate=false;
				if(enterCounter>20){
					console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
					break ;
				}
			}
			this.handleArchOrder1();
		}
		else if (this._layout==1 || this._layout==3){
			enterCounter=0;
			while(this.handleScroll2(forceUpdate)){
				enterCounter++;
				forceUpdate=false;
				if(enterCounter>20){
					console.log("FairyGUI: list will never be filled as the item renderer function always returns a different size.");
					break ;
				}
			}
			this.handleArchOrder2();
		}
		else{
			this.handleScroll3(forceUpdate);
		}
		this._boundsChanged=false;
	}

	__proto.handleScroll1=function(forceUpdate){
		var pos=this._scrollPane.scrollingPosY;
		var max=pos+this._scrollPane.viewHeight;
		var end=max==this._scrollPane.contentHeight;
		fairygui.GList.pos_param=pos;
		var newFirstIndex=this.getIndexOnPos1(forceUpdate);
		pos=fairygui.GList.pos_param;
		if (newFirstIndex==this._firstIndex && !forceUpdate)
			return false;
		var oldFirstIndex=this._firstIndex;
		this._firstIndex=newFirstIndex;
		var curIndex=newFirstIndex;
		var forward=oldFirstIndex > newFirstIndex;
		var childCount=this.numChildren;
		var lastIndex=oldFirstIndex+childCount-1;
		var reuseIndex=forward ? lastIndex :oldFirstIndex;
		var curX=0,curY=pos;
		var needRender=false;
		var deltaSize=0;
		var firstItemDeltaSize=0;
		var url=this.defaultItem;
		var ii,ii2;
		var i=0,j=0;
		var partSize=(this._scrollPane.viewWidth-this._columnGap *(this._curLineItemCount-1))/ this._curLineItemCount;
		this.itemInfoVer++;
		while (curIndex < this._realNumItems && (end || curY < max)){
			ii=this._virtualItems[curIndex];
			if (ii.obj==null || forceUpdate){
				if (this.itemProvider !=null){
					url=this.itemProvider.runWith(curIndex % this._numItems);
					if (url==null)
						url=this._defaultItem;
					url=UIPackage.normalizeURL(url);
				}
				if (ii.obj !=null && ii.obj.resourceURL !=url){
					if ((ii.obj instanceof fairygui.GButton ))
						ii.selected=(ii.obj).selected;
					this.removeChildToPool(ii.obj);
					ii.obj=null;
				}
			}
			if (ii.obj==null){
				if (forward){
					for (j=reuseIndex;j >=oldFirstIndex;j--){
						ii2=this._virtualItems[j];
						if (ii2.obj !=null && ii2.updateFlag !=this.itemInfoVer && ii2.obj.resourceURL==url){
							if ((ii2.obj instanceof fairygui.GButton ))
								ii2.selected=(ii2.obj).selected;
							ii.obj=ii2.obj;
							ii2.obj=null;
							if (j==reuseIndex)
								reuseIndex--;
							break ;
						}
					}
				}
				else{
					for (j=reuseIndex;j <=lastIndex;j++){
						ii2=this._virtualItems[j];
						if (ii2.obj !=null && ii2.updateFlag !=this.itemInfoVer && ii2.obj.resourceURL==url){
							if ((ii2.obj instanceof fairygui.GButton ))
								ii2.selected=(ii2.obj).selected;
							ii.obj=ii2.obj;
							ii2.obj=null;
							if (j==reuseIndex)
								reuseIndex++;
							break ;
						}
					}
				}
				if (ii.obj !=null){
					this.setChildIndex(ii.obj,forward ? curIndex-newFirstIndex :this.numChildren);
				}
				else{
					ii.obj=this._pool.getObject(url);
					if (forward)
						this.addChildAt(ii.obj,curIndex-newFirstIndex);
					else
					this.addChild(ii.obj);
				}
				if ((ii.obj instanceof fairygui.GButton ))
					(ii.obj).selected=ii.selected;
				needRender=true;
			}
			else
			needRender=forceUpdate;
			if (needRender){
				if (this._autoResizeItem && (this._layout==0 || this._columnCount > 0))
					ii.obj.setSize(partSize,ii.obj.height,true);
				this.itemRenderer.runWith([curIndex % this._numItems,ii.obj]);
				if (curIndex % this._curLineItemCount==0){
					deltaSize+=Math.ceil(ii.obj.height)-ii.height;
					if (curIndex==newFirstIndex && oldFirstIndex > newFirstIndex){
						firstItemDeltaSize=Math.ceil(ii.obj.height)-ii.height;
					}
				}
				ii.width=Math.ceil(ii.obj.width);
				ii.height=Math.ceil(ii.obj.height);
			}
			ii.updateFlag=this.itemInfoVer;
			ii.obj.setXY(curX,curY);
			if (curIndex==newFirstIndex)
				max+=ii.height;
			curX+=ii.width+this._columnGap;
			if (curIndex % this._curLineItemCount==this._curLineItemCount-1){
				curX=0;
				curY+=ii.height+this._lineGap;
			}
			curIndex++;
		}
		for (i=0;i < childCount;i++){
			ii=this._virtualItems[oldFirstIndex+i];
			if (ii.updateFlag !=this.itemInfoVer && ii.obj !=null){
				if ((ii.obj instanceof fairygui.GButton ))
					ii.selected=(ii.obj).selected;
				this.removeChildToPool(ii.obj);
				ii.obj=null;
			}
		}
		childCount=this._children.length;
		for (i=0;i < childCount;i++){
			var obj=this._virtualItems[newFirstIndex+i].obj;
			if (this._children[i] !=obj)
				this.setChildIndex(obj,i);
		}
		if (deltaSize !=0 || firstItemDeltaSize !=0)
			this._scrollPane.changeContentSizeOnScrolling(0,deltaSize,0,firstItemDeltaSize);
		if (curIndex > 0 && this.numChildren > 0 && this._container.y < 0 && this.getChildAt(0).y >-this._container.y)
			return true;
		else
		return false;
	}

	__proto.handleScroll2=function(forceUpdate){
		var pos=this._scrollPane.scrollingPosX;
		var max=pos+this._scrollPane.viewWidth;
		var end=pos==this._scrollPane.contentWidth;
		fairygui.GList.pos_param=pos;
		var newFirstIndex=this.getIndexOnPos2(forceUpdate);
		pos=fairygui.GList.pos_param;
		if (newFirstIndex==this._firstIndex && !forceUpdate)
			return false;
		var oldFirstIndex=this._firstIndex;
		this._firstIndex=newFirstIndex;
		var curIndex=newFirstIndex;
		var forward=oldFirstIndex > newFirstIndex;
		var childCount=this.numChildren;
		var lastIndex=oldFirstIndex+childCount-1;
		var reuseIndex=forward ? lastIndex :oldFirstIndex;
		var curX=pos,curY=0;
		var needRender=false;
		var deltaSize=0;
		var firstItemDeltaSize=0;
		var url=this.defaultItem;
		var ii,ii2;
		var i=0,j=0;
		var partSize=(this._scrollPane.viewHeight-this._lineGap *(this._curLineItemCount-1))/ this._curLineItemCount;
		this.itemInfoVer++;
		while (curIndex < this._realNumItems && (end || curX < max)){
			ii=this._virtualItems[curIndex];
			if (ii.obj==null || forceUpdate){
				if (this.itemProvider !=null){
					url=this.itemProvider.runWith(curIndex % this._numItems);
					if (url==null)
						url=this._defaultItem;
					url=UIPackage.normalizeURL(url);
				}
				if (ii.obj !=null && ii.obj.resourceURL !=url){
					if ((ii.obj instanceof fairygui.GButton ))
						ii.selected=(ii.obj).selected;
					this.removeChildToPool(ii.obj);
					ii.obj=null;
				}
			}
			if (ii.obj==null){
				if (forward){
					for (j=reuseIndex;j >=oldFirstIndex;j--){
						ii2=this._virtualItems[j];
						if (ii2.obj !=null && ii2.updateFlag !=this.itemInfoVer && ii2.obj.resourceURL==url){
							if ((ii2.obj instanceof fairygui.GButton ))
								ii2.selected=(ii2.obj).selected;
							ii.obj=ii2.obj;
							ii2.obj=null;
							if (j==reuseIndex)
								reuseIndex--;
							break ;
						}
					}
				}
				else{
					for (j=reuseIndex;j <=lastIndex;j++){
						ii2=this._virtualItems[j];
						if (ii2.obj !=null && ii2.updateFlag !=this.itemInfoVer && ii2.obj.resourceURL==url){
							if ((ii2.obj instanceof fairygui.GButton ))
								ii2.selected=(ii2.obj).selected;
							ii.obj=ii2.obj;
							ii2.obj=null;
							if (j==reuseIndex)
								reuseIndex++;
							break ;
						}
					}
				}
				if (ii.obj !=null){
					this.setChildIndex(ii.obj,forward ? curIndex-newFirstIndex :this.numChildren);
				}
				else{
					ii.obj=this._pool.getObject(url);
					if (forward)
						this.addChildAt(ii.obj,curIndex-newFirstIndex);
					else
					this.addChild(ii.obj);
				}
				if ((ii.obj instanceof fairygui.GButton ))
					(ii.obj).selected=ii.selected;
				needRender=true;
			}
			else
			needRender=forceUpdate;
			if (needRender){
				if (this._autoResizeItem && (this._layout==1 || this._lineCount > 0))
					ii.obj.setSize(ii.obj.width,partSize,true);
				this.itemRenderer.runWith([curIndex % this._numItems,ii.obj]);
				if (curIndex % this._curLineItemCount==0){
					deltaSize+=Math.ceil(ii.obj.width)-ii.width;
					if (curIndex==newFirstIndex && oldFirstIndex > newFirstIndex){
						firstItemDeltaSize=Math.ceil(ii.obj.width)-ii.width;
					}
				}
				ii.width=Math.ceil(ii.obj.width);
				ii.height=Math.ceil(ii.obj.height);
			}
			ii.updateFlag=this.itemInfoVer;
			ii.obj.setXY(curX,curY);
			if (curIndex==newFirstIndex)
				max+=ii.width;
			curY+=ii.height+this._lineGap;
			if (curIndex % this._curLineItemCount==this._curLineItemCount-1){
				curY=0;
				curX+=ii.width+this._columnGap;
			}
			curIndex++;
		}
		for (i=0;i < childCount;i++){
			ii=this._virtualItems[oldFirstIndex+i];
			if (ii.updateFlag !=this.itemInfoVer && ii.obj !=null){
				if ((ii.obj instanceof fairygui.GButton ))
					ii.selected=(ii.obj).selected;
				this.removeChildToPool(ii.obj);
				ii.obj=null;
			}
		}
		childCount=this._children.length;
		for (i=0;i < childCount;i++){
			var obj=this._virtualItems[newFirstIndex+i].obj;
			if (this._children[i] !=obj)
				this.setChildIndex(obj,i);
		}
		if (deltaSize !=0 || firstItemDeltaSize !=0)
			this._scrollPane.changeContentSizeOnScrolling(deltaSize,0,firstItemDeltaSize,0);
		if (curIndex > 0 && this.numChildren > 0 && this._container.x < 0 && this.getChildAt(0).x >-this._container.x)
			return true;
		else
		return false;
	}

	__proto.handleScroll3=function(forceUpdate){
		var pos=this._scrollPane.scrollingPosX;
		fairygui.GList.pos_param=pos;
		var newFirstIndex=this.getIndexOnPos3(forceUpdate);
		pos=fairygui.GList.pos_param;
		if (newFirstIndex==this._firstIndex && !forceUpdate)
			return;
		var oldFirstIndex=this._firstIndex;
		this._firstIndex=newFirstIndex;
		var reuseIndex=oldFirstIndex;
		var virtualItemCount=this._virtualItems.length;
		var pageSize=this._curLineItemCount *this._curLineItemCount2;
		var startCol=newFirstIndex % this._curLineItemCount;
		var viewWidth=this.viewWidth;
		var page=Math.floor(newFirstIndex / pageSize);
		var startIndex=page *pageSize;
		var lastIndex=startIndex+pageSize *2;
		var needRender=false;
		var i=0;
		var ii,ii2;
		var col=0;
		var url=this._defaultItem;
		var partWidth=(this._scrollPane.viewWidth-this._columnGap *(this._curLineItemCount-1))/ this._curLineItemCount;
		var partHeight=(this._scrollPane.viewHeight-this._lineGap *(this._curLineItemCount2-1))/ this._curLineItemCount2;
		this.itemInfoVer++;
		for (i=startIndex;i < lastIndex;i++){
			if (i >=this._realNumItems)
				continue ;
			col=i % this._curLineItemCount;
			if (i-startIndex < pageSize){
				if (col < startCol)
					continue ;
			}
			else{
				if (col > startCol)
					continue ;
			}
			ii=this._virtualItems[i];
			ii.updateFlag=this.itemInfoVer;
		};
		var lastObj=null;
		var insertIndex=0;
		for (i=startIndex;i < lastIndex;i++){
			if (i >=this._realNumItems)
				continue ;
			ii=this._virtualItems[i];
			if (ii.updateFlag !=this.itemInfoVer)
				continue ;
			if (ii.obj==null){
				while (reuseIndex < virtualItemCount){
					ii2=this._virtualItems[reuseIndex];
					if (ii2.obj !=null && ii2.updateFlag !=this.itemInfoVer){
						if ((ii2.obj instanceof fairygui.GButton ))
							ii2.selected=(ii2.obj).selected;
						ii.obj=ii2.obj;
						ii2.obj=null;
						break ;
					}
					reuseIndex++;
				}
				if (insertIndex==-1)
					insertIndex=this.getChildIndex(lastObj)+1;
				if (ii.obj==null){
					if (this.itemProvider !=null){
						url=this.itemProvider.runWith(i % this._numItems);
						if (url==null)
							url=this._defaultItem;
						url=UIPackage.normalizeURL(url);
					}
					ii.obj=this._pool.getObject(url);
					this.addChildAt(ii.obj,insertIndex);
				}
				else{
					insertIndex=this.setChildIndexBefore(ii.obj,insertIndex);
				}
				insertIndex++;
				if ((ii.obj instanceof fairygui.GButton ))
					(ii.obj).selected=ii.selected;
				needRender=true;
			}
			else{
				needRender=forceUpdate;
				insertIndex=-1;
				lastObj=ii.obj;
			}
			if (needRender){
				if (this._autoResizeItem){
					if (this._curLineItemCount==this._columnCount && this._curLineItemCount2==this._lineCount)
						ii.obj.setSize(partWidth,partHeight,true);
					else if (this._curLineItemCount==this._columnCount)
					ii.obj.setSize(partWidth,ii.obj.height,true);
					else if (this._curLineItemCount2==this._lineCount)
					ii.obj.setSize(ii.obj.width,partHeight,true);
				}
				this.itemRenderer.runWith([i % this._numItems,ii.obj]);
				ii.width=Math.ceil(ii.obj.width);
				ii.height=Math.ceil(ii.obj.height);
			}
		};
		var borderX=(startIndex / pageSize)*viewWidth;
		var xx=borderX;
		var yy=0;
		var lineHeight=0;
		for (i=startIndex;i < lastIndex;i++){
			if (i >=this._realNumItems)
				continue ;
			ii=this._virtualItems[i];
			if (ii.updateFlag==this.itemInfoVer)
				ii.obj.setXY(xx,yy);
			if (ii.height > lineHeight)
				lineHeight=ii.height;
			if (i % this._curLineItemCount==this._curLineItemCount-1){
				xx=borderX;
				yy+=lineHeight+this._lineGap;
				lineHeight=0;
				if (i==startIndex+pageSize-1){
					borderX+=viewWidth;
					xx=borderX;
					yy=0;
				}
			}
			else
			xx+=ii.width+this._columnGap;
		}
		for (i=reuseIndex;i < virtualItemCount;i++){
			ii=this._virtualItems[i];
			if (ii.updateFlag !=this.itemInfoVer && ii.obj !=null){
				if ((ii.obj instanceof fairygui.GButton ))
					ii.selected=(ii.obj).selected;
				this.removeChildToPool(ii.obj);
				ii.obj=null;
			}
		}
	}

	__proto.handleArchOrder1=function(){
		if (this.childrenRenderOrder==2){
			var mid=this._scrollPane.posY+this.viewHeight / 2;
			var minDist=Number.POSITIVE_INFINITY;
			var dist=0;
			var apexIndex=0;
			var cnt=this.numChildren;
			for (var i=0;i < cnt;i++){
				var obj=this.getChildAt(i);
				if (!this.foldInvisibleItems || obj.visible){
					dist=Math.abs(mid-obj.y-obj.height / 2);
					if (dist < minDist){
						minDist=dist;
						apexIndex=i;
					}
				}
			}
			this.apexIndex=apexIndex;
		}
	}

	__proto.handleArchOrder2=function(){
		if (this.childrenRenderOrder==2){
			var mid=this._scrollPane.posX+this.viewWidth / 2;
			var minDist=Number.POSITIVE_INFINITY;
			var dist=0;
			var apexIndex=0;
			var cnt=this.numChildren;
			for (var i=0;i < cnt;i++){
				var obj=this.getChildAt(i);
				if (!this.foldInvisibleItems || obj.visible){
					dist=Math.abs(mid-obj.x-obj.width / 2);
					if (dist < minDist){
						minDist=dist;
						apexIndex=i;
					}
				}
			}
			this.apexIndex=apexIndex;
		}
	}

	__proto.handleAlign=function(contentWidth,contentHeight){
		var newOffsetX=0;
		var newOffsetY=0;
		if (contentHeight < this.viewHeight){
			if (this._verticalAlign=="middle")
				newOffsetY=Math.floor((this.viewHeight-contentHeight)/ 2);
			else if (this._verticalAlign=="bottom")
			newOffsetY=this.viewHeight-contentHeight;
		}
		if (contentWidth < this.viewWidth){
			if (this._align=="center")
				newOffsetX=Math.floor((this.viewWidth-contentWidth)/ 2);
			else if (this._align=="right")
			newOffsetX=this.viewWidth-contentWidth;
		}
		if (newOffsetX!=this._alignOffset.x || newOffsetY!=this._alignOffset.y){
			this._alignOffset.setTo(newOffsetX,newOffsetY);
			if (this._scrollPane !=null)
				this._scrollPane.adjustMaskContainer();
			else
			this._container.pos(this._margin.left+this._alignOffset.x,this._margin.top+this._alignOffset.y);
		}
	}

	__proto.updateBounds=function(){
		if(this._virtual)
			return;
		var i=0;
		var child;
		var curX=0;
		var curY=0;
		var maxWidth=0;
		var maxHeight=0;
		var cw=0,ch=0;
		var j=0;
		var page=0;
		var k=0;
		var cnt=this._children.length;
		var viewWidth=this.viewWidth;
		var viewHeight=this.viewHeight;
		var lineSize=0;
		var lineStart=0;
		var ratio=NaN;
		if(this._layout==0){
			for(i=0;i<cnt;i++){
				child=this.getChildAt(i);
				if (this.foldInvisibleItems && !child.visible)
					continue ;
				if (curY !=0)
					curY+=this._lineGap;
				child.y=curY;
				if (this._autoResizeItem)
					child.setSize(viewWidth,child.height,true);
				curY+=Math.ceil(child.height);
				if(child.width>maxWidth)
					maxWidth=child.width;
			}
			cw=Math.ceil(maxWidth);
			ch=curY;
		}
		else if(this._layout==1){
			for(i=0;i<cnt;i++){
				child=this.getChildAt(i);
				if (this.foldInvisibleItems && !child.visible)
					continue ;
				if(curX!=0)
					curX+=this._columnGap;
				child.x=curX;
				if (this._autoResizeItem)
					child.setSize(child.width,viewHeight,true);
				curX+=Math.ceil(child.width);
				if(child.height>maxHeight)
					maxHeight=child.height;
			}
			cw=curX;
			ch=Math.ceil(maxHeight);
		}
		else if(this._layout==2){
			if (this._autoResizeItem && this._columnCount > 0){
				for (i=0;i < cnt;i++){
					child=this.getChildAt(i);
					if (this.foldInvisibleItems && !child.visible)
						continue ;
					lineSize+=child.sourceWidth;
					j++;
					if (j==this._columnCount || i==cnt-1){
						ratio=(viewWidth-lineSize-(j-1)*this._columnGap)/ lineSize;
						curX=0;
						for (j=lineStart;j <=i;j++){
							child=this.getChildAt(j);
							if (this.foldInvisibleItems && !child.visible)
								continue ;
							child.setXY(curX,curY);
							if (j < i){
								child.setSize(child.sourceWidth+Math.round(child.sourceWidth *ratio),child.height,true);
								curX+=Math.ceil(child.width)+this._columnGap;
							}
							else{
								child.setSize(viewWidth-curX,child.height,true);
							}
							if (child.height > maxHeight)
								maxHeight=child.height;
						}
						curY+=Math.ceil(maxHeight)+this._lineGap;
						maxHeight=0;
						j=0;
						lineStart=i+1;
						lineSize=0;
					}
				}
				ch=curY+Math.ceil(maxHeight);
				cw=viewWidth;
			}
			else{
				for(i=0;i<cnt;i++){
					child=this.getChildAt(i);
					if (this.foldInvisibleItems && !child.visible)
						continue ;
					if(curX!=0)
						curX+=this._columnGap;
					if (this._columnCount !=0 && j >=this._columnCount
						|| this._columnCount==0 && curX+child.width > viewWidth && maxHeight !=0){
						curX=0;
						curY+=Math.ceil(maxHeight)+this._lineGap;
						maxHeight=0;
						j=0;
					}
					child.setXY(curX,curY);
					curX+=Math.ceil(child.width);
					if (curX > maxWidth)
						maxWidth=curX;
					if (child.height > maxHeight)
						maxHeight=child.height;
					j++;
				}
				ch=curY+Math.ceil(maxHeight);
				cw=Math.ceil(maxWidth);
			}
		}
		else if (this._layout==3){
			if (this._autoResizeItem && this._lineCount > 0){
				for (i=0;i < cnt;i++){
					child=this.getChildAt(i);
					if (this.foldInvisibleItems && !child.visible)
						continue ;
					lineSize+=child.sourceHeight;
					j++;
					if (j==this._lineCount || i==cnt-1){
						ratio=(viewHeight-lineSize-(j-1)*this._lineGap)/ lineSize;
						curY=0;
						for (j=lineStart;j <=i;j++){
							child=this.getChildAt(j);
							if (this.foldInvisibleItems && !child.visible)
								continue ;
							child.setXY(curX,curY);
							if (j < i){
								child.setSize(child.width,child.sourceHeight+Math.round(child.sourceHeight *ratio),true);
								curY+=Math.ceil(child.height)+this._lineGap;
							}
							else{
								child.setSize(child.width,viewHeight-curY,true);
							}
							if (child.width > maxWidth)
								maxWidth=child.width;
						}
						curX+=Math.ceil(maxWidth)+this._columnGap;
						maxWidth=0;
						j=0;
						lineStart=i+1;
						lineSize=0;
					}
				}
				cw=curX+Math.ceil(maxWidth);
				ch=viewHeight;
			}
			else{
				for(i=0;i<cnt;i++){
					child=this.getChildAt(i);
					if (this.foldInvisibleItems && !child.visible)
						continue ;
					if(curY!=0)
						curY+=this._lineGap;
					if (this._lineCount !=0 && j >=this._lineCount
						|| this._lineCount==0 && curY+child.height > viewHeight && maxWidth !=0){
						curY=0;
						curX+=Math.ceil(maxWidth)+this._columnGap;
						maxWidth=0;
						j=0;
					}
					child.setXY(curX,curY);
					curY+=Math.ceil(child.height);
					if (curY > maxHeight)
						maxHeight=curY;
					if (child.width > maxWidth)
						maxWidth=child.width;
					j++;
				}
				cw=curX+Math.ceil(maxWidth);
				ch=Math.ceil(maxHeight);
			}
		}
		else{
			var eachHeight=0;
			if(this._autoResizeItem && this._lineCount>0)
				eachHeight=Math.floor((viewHeight-(this._lineCount-1)*this._lineGap)/this._lineCount);
			if (this._autoResizeItem && this._columnCount > 0){
				for (i=0;i < cnt;i++){
					child=this.getChildAt(i);
					if (this.foldInvisibleItems && !child.visible)
						continue ;
					if (j==0 && (this._lineCount !=0 && k >=this._lineCount
						|| this._lineCount==0 && curY+child.height > viewHeight)){
						page++;
						curY=0;
						k=0;
					}
					lineSize+=child.sourceWidth;
					j++;
					if (j==this._columnCount || i==cnt-1){
						ratio=(viewWidth-lineSize-(j-1)*this._columnGap)/ lineSize;
						curX=0;
						for (j=lineStart;j <=i;j++){
							child=this.getChildAt(j);
							if (this.foldInvisibleItems && !child.visible)
								continue ;
							child.setXY(page *viewWidth+curX,curY);
							if (j < i){
								child.setSize(child.sourceWidth+Math.round(child.sourceWidth *ratio),
								this._lineCount>0?eachHeight:child.height,true);
								curX+=Math.ceil(child.width)+this._columnGap;
							}
							else{
								child.setSize(viewWidth-curX,this._lineCount>0?eachHeight:child.height,true);
							}
							if (child.height > maxHeight)
								maxHeight=child.height;
						}
						curY+=Math.ceil(maxHeight)+this._lineGap;
						maxHeight=0;
						j=0;
						lineStart=i+1;
						lineSize=0;
						k++;
					}
				}
			}
			else{
				for (i=0;i < cnt;i++){
					child=this.getChildAt(i);
					if (this.foldInvisibleItems && !child.visible)
						continue ;
					if (curX !=0)
						curX+=this._columnGap;
					if (this._autoResizeItem && this._lineCount > 0)
						child.setSize(child.width,eachHeight,true);
					if (this._columnCount !=0 && j >=this._columnCount
						|| this._columnCount==0 && curX+child.width > viewWidth && maxHeight !=0){
						curX=0;
						curY+=Math.ceil(maxHeight)+this._lineGap;
						maxHeight=0;
						j=0;
						k++;
						if (this._lineCount !=0 && k >=this._lineCount
							|| this._lineCount==0 && curY+child.height > viewHeight && maxWidth !=0){
							page++;
							curY=0;
							k=0;
						}
					}
					child.setXY(page *viewWidth+curX,curY);
					curX+=Math.ceil(child.width);
					if (curX > maxWidth)
						maxWidth=curX;
					if (child.height > maxHeight)
						maxHeight=child.height;
					j++;
				}
			}
			ch=page > 0 ? viewHeight :curY+Math.ceil(maxHeight);
			cw=(page+1)*viewWidth;
		}
		this.handleAlign(cw,ch);
		this.setBounds(0,0,cw,ch);
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		fairygui.GObject.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,5);
		var i=0;
		var j=0;
		var cnt=0;
		var i1=0;
		var i2=0;
		var nextPos=0;
		var str;
		this._layout=buffer.readByte();
		this._selectionMode=buffer.readByte();
		i1=buffer.readByte();
		this._align=i1==0?"left":(i1==1?"center":"right");
		i1=buffer.readByte();
		this._verticalAlign=i1==0?"top":(i1==1?"middle":"bottom");
		this._lineGap=buffer.getInt16();
		this._columnGap=buffer.getInt16();
		this._lineCount=buffer.getInt16();
		this._columnCount=buffer.getInt16();
		this._autoResizeItem=buffer.readBool();
		this._childrenRenderOrder=buffer.readByte();
		this._apexIndex=buffer.getInt16();
		if (buffer.readBool()){
			this._margin.top=buffer.getInt32();
			this._margin.bottom=buffer.getInt32();
			this._margin.left=buffer.getInt32();
			this._margin.right=buffer.getInt32();
		};
		var overflow=buffer.readByte();
		if (overflow==2){
			var savedPos=buffer.pos;
			buffer.seek(beginPos,7);
			this.setupScroll(buffer);
			buffer.pos=savedPos;
		}
		else
		this.setupOverflow(overflow);
		if (buffer.readBool())
			buffer.skip(8);
		buffer.seek(beginPos,8);
		this._defaultItem=buffer.readS();
		var itemCount=buffer.getInt16();
		for (i=0;i < itemCount;i++){
			nextPos=buffer.getInt16();
			nextPos+=buffer.pos;
			str=buffer.readS();
			if (str==null){
				str=this.defaultItem;
				if (!str){
					buffer.pos=nextPos;
					continue ;
				}
			};
			var obj=this.getFromPool(str);
			if (obj !=null){
				this.addChild(obj);
				str=buffer.readS();
				if (str !=null)
					obj.text=str;
				str=buffer.readS();
				if (str !=null && ((obj instanceof fairygui.GButton )))
					(obj).selectedTitle=str;
				str=buffer.readS();
				if (str !=null)
					obj.icon=str;
				str=buffer.readS();
				if (str !=null && ((obj instanceof fairygui.GButton )))
					(obj).selectedIcon=str;
				str=buffer.readS();
				if (str !=null)
					obj.name=str;
				if ((obj instanceof fairygui.GComponent )){
					cnt=buffer.getInt16();
					for (j=0;j < cnt;j++){
						var cc=(obj).getController(buffer.readS());
						str=buffer.readS();
						if (cc !=null)
							cc.selectedPageId=str;
					}
				}
			}
			buffer.pos=nextPos;
		}
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,6);
		var i=buffer.getInt16();
		if (i !=-1)
			this._selectionController=this.parent.getControllerAt(i);
	}

	__getset(0,__proto,'itemPool',function(){
		return this._pool;
	});

	__getset(0,__proto,'defaultItem',function(){
		return this._defaultItem;
		},function(val){
		this._defaultItem=val;
	});

	__getset(0,__proto,'virtualItemSize',function(){
		return this._itemSize;
		},function(value){
		if(this._virtual){
			if(this._itemSize==null)
				this._itemSize=new Point();
			this._itemSize.setTo(value.x,value.y);
			this.setVirtualListChangedFlag(true);
		}
	});

	__getset(0,__proto,'verticalAlign',function(){
		return this._verticalAlign;
		},function(value){
		if(this._verticalAlign!=value){
			this._verticalAlign=value;
			this.setBoundsChangedFlag();
			if (this._virtual)
				this.setVirtualListChangedFlag(true);
		}
	});

	__getset(0,__proto,'selectedIndex',function(){
		var i=0;
		if (this._virtual){
			for (i=0;i < this._realNumItems;i++){
				var ii=this._virtualItems[i];
				if (((ii.obj instanceof fairygui.GButton ))&& (ii.obj).selected
					|| ii.obj==null && ii.selected){
					if (this._loop)
						return i % this._numItems;
					else
					return i;
				}
			}
		}
		else{
			var cnt=this._children.length;
			for (i=0;i < cnt;i++){
				var obj=this._children[i].asButton;
				if (obj !=null && obj.selected)
					return i;
			}
		}
		return-1;
		},function(value){
		if (value >=0 && value < this.numItems){
			if(this._selectionMode!=0)
				this.clearSelection();
			this.addSelection(value);
		}
		else
		this.clearSelection();
	});

	__getset(0,__proto,'align',function(){
		return this._align;
		},function(value){
		if(this._align!=value){
			this._align=value;
			this.setBoundsChangedFlag();
			if (this._virtual)
				this.setVirtualListChangedFlag(true);
		}
	});

	__getset(0,__proto,'lineGap',function(){
		return this._lineGap;
		},function(value){
		if (this._lineGap !=value){
			this._lineGap=value;
			this.setBoundsChangedFlag();
			if(this._virtual)
				this.setVirtualListChangedFlag(true);
		}
	});

	__getset(0,__proto,'columnCount',function(){
		return this._columnCount;
		},function(value){
		if (this._columnCount !=value){
			this._columnCount=value;
			if (this._layout==2 || this._layout==4){
				this.setBoundsChangedFlag();
				if (this._virtual)
					this.setVirtualListChangedFlag(true);
			}
		}
	});

	/**
	*@see ListSelectionMode
	*/
	/**
	*@see ListSelectionMode
	*/
	__getset(0,__proto,'selectionMode',function(){
		return this._selectionMode;
		},function(value){
		this._selectionMode=value;
	});

	__getset(0,__proto,'lineCount',function(){
		return this._lineCount;
		},function(value){
		if (this._lineCount !=value){
			this._lineCount=value;
			if (this._layout==3 || this._layout==4){
				this.setBoundsChangedFlag();
				if (this._virtual)
					this.setVirtualListChangedFlag(true);
			}
		}
	});

	__getset(0,__proto,'columnGap',function(){
		return this._columnGap;
		},function(value){
		if(this._columnGap !=value){
			this._columnGap=value;
			this.setBoundsChangedFlag();
			if (this._virtual)
				this.setVirtualListChangedFlag(true);
		}
	});

	/**
	*Set the list item count.
	*If the list is not virtual,specified Number of items will be created.
	*If the list is virtual,only items in view will be created.
	*/
	__getset(0,__proto,'numItems',function(){
		if(this._virtual)
			return this._numItems;
		else
		return this._children.length;
		},function(value){
		var i=0;
		if (this._virtual){
			if (this.itemRenderer==null)
				throw new Error("Set itemRenderer first!");
			this._numItems=value;
			if (this._loop)
				this._realNumItems=this._numItems *6;
			else
			this._realNumItems=this._numItems;
			var oldCount=this._virtualItems.length;
			if (this._realNumItems > oldCount){
				for (i=oldCount;i < this._realNumItems;i++){
					var ii=new ItemInfo();
					ii.width=this._itemSize.x;
					ii.height=this._itemSize.y;
					this._virtualItems.push(ii);
				}
			}
			else{
				for (i=this._realNumItems;i < oldCount;i++)
				this._virtualItems[i].selected=false;
			}
			if (this._virtualListChanged !=0)
				Laya.timer.clear(this,this._refreshVirtualList);
			this._refreshVirtualList();
		}
		else{
			var cnt=this._children.length;
			if (value > cnt){
				for (i=cnt;i < value;i++){
					if (this.itemProvider==null)
						this.addItemFromPool();
					else
					this.addItemFromPool(this.itemProvider.runWith(i));
				}
			}
			else{
				this.removeChildrenToPool(value,cnt);
			}
			if (this.itemRenderer !=null){
				for (i=0;i < value;i++)
				this.itemRenderer.runWith([i,this.getChildAt(i)]);
			}
		}
	});

	__getset(0,__proto,'autoResizeItem',function(){
		return this._autoResizeItem;
		},function(value){
		if(this._autoResizeItem !=value){
			this._autoResizeItem=value;
			this.setBoundsChangedFlag();
			if (this._virtual)
				this.setVirtualListChangedFlag(true);
		}
	});

	__getset(0,__proto,'selectionController',function(){
		return this._selectionController;
		},function(value){
		this._selectionController=value;
	});

	/**
	*@see ListLayoutType
	*/
	/**
	*@see ListLayoutType
	*/
	__getset(0,__proto,'layout',function(){
		return this._layout;
		},function(value){
		if (this._layout !=value){
			this._layout=value;
			this.setBoundsChangedFlag();
			if(this._virtual)
				this.setVirtualListChangedFlag(true);
		}
	});

	GList.pos_param=NaN;
	GList.__init$=function(){
		//class ItemInfo
		ItemInfo=(function(){
			function ItemInfo(){
				this.width=0;
				this.height=0;
				this.obj=null;
				this.updateFlag=0;
				this.selected=false;
			}
			__class(ItemInfo,'');
			return ItemInfo;
		})()
	}

	return GList;
})(GComponent)


//class fairygui.GRichTextField extends fairygui.GTextField
var GRichTextField=(function(_super){
	function GRichTextField(){
		this.div=null;
		this._ubbEnabled=false;
		this._color=null;
		GRichTextField.__super.call(this);
		this._text="";
	}

	__class(GRichTextField,'fairygui.GRichTextField',_super);
	var __proto=GRichTextField.prototype;
	__proto.createDisplayObject=function(){
		this._displayObject=this.div=new HTMLDivElement();
		this._displayObject.mouseEnabled=true;
		this._displayObject["$owner"]=this;
	}

	__proto.handleSizeChanged=function(){
		this.div.size(this.width,this.height);
	}

	__getset(0,__proto,'ubbEnabled',function(){
		return this._ubbEnabled;
		},function(value){
		this._ubbEnabled=value;
	});

	__getset(0,__proto,'strokeColor',function(){
		return this.div.style.strokeColor;
		},function(value){
		this.div.style.strokeColor=value;
		this.updateGear(4);
	});

	__getset(0,__proto,'stroke',function(){
		return this.div.style.stroke;
		},function(value){
		this.div.style.stroke=value;
	});

	__getset(0,__proto,'italic',function(){
		return this.div.style.italic;
		},function(value){
		this.div.style.italic=value;
	});

	__getset(0,__proto,'valign',function(){
		return this.div.style.valign;
		},function(value){
		this.div.style.valign=value;
	});

	__getset(0,__proto,'bold',function(){
		return this.div.style.bold;
		},function(value){
		this.div.style.bold=value;
	});

	__getset(0,__proto,'font',function(){
		return this.div.style.fontFamily;
		},function(value){
		this.div.style.fontFamily=value;
	});

	__getset(0,__proto,'leading',function(){
		return this.div.style.leading;
		},function(value){
		this.div.style.leading=value;
	});

	__getset(0,__proto,'color',function(){
		return this._color;
		},function(value){
		if (this._color !=value){
			this._color=value;
			this.div.color=value;
			if (this._gearColor.controller)
				this._gearColor.updateState();
		}
	});

	__getset(0,__proto,'align',function(){
		return this.div.style.align;
		},function(value){
		this.div.style.align=value;
	});

	__getset(0,__proto,'fontSize',function(){
		return this.div.style.fontSize;
		},function(value){
		this.div.style.fontSize=value;
	});

	__getset(0,__proto,'text',function(){
		return this._text;
		},function(value){
		this._text=value;
		var text2=this._text;
		if (this._templateVars !=null)
			text2=this.parseTemplate(text2);
		if(this._ubbEnabled)
			this.div.innerHTML=ToolSet.parseUBB(text2);
		else
		this.div.innerHTML=text2;
	});

	return GRichTextField;
})(GTextField)


//class fairygui.GLabel extends fairygui.GComponent
var GLabel=(function(_super){
	function GLabel(){
		this._titleObject=null;
		this._iconObject=null;
		GLabel.__super.call(this);
	}

	__class(GLabel,'fairygui.GLabel',_super);
	var __proto=GLabel.prototype;
	Laya.imps(__proto,{"fairygui.gears.IColorGear":true})
	__proto.getTextField=function(){
		if ((this._titleObject instanceof fairygui.GTextField ))
			return this._titleObject;
		else if ((this._titleObject instanceof fairygui.GLabel ))
		return (this._titleObject).getTextField();
		else if ((this._titleObject instanceof fairygui.GButton ))
		return (this._titleObject).getTextField();
		else
		return null;
	}

	__proto.constructExtension=function(buffer){
		this._titleObject=this.getChild("title");
		this._iconObject=this.getChild("icon");
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		if (!buffer.seek(beginPos,6))
			return;
		if (buffer.readByte()!=this.packageItem.objectType)
			return;
		var str;
		str=buffer.readS();
		if (str !=null)
			this.title=str;
		str=buffer.readS();
		if (str !=null)
			this.icon=str;
		if (buffer.readBool())
			this.titleColor=buffer.readColorS();
		var iv=buffer.getInt32();
		if (iv !=0)
			this.titleFontSize=iv;
		if (buffer.readBool()){
			var input=this.getTextField();
			if (input !=null){
				str=buffer.readS();
				if (str !=null)
					input.promptText=str;
				str=buffer.readS();
				if (str !=null)
					input.restrict=str;
				iv=buffer.getInt32();
				if (iv !=0)
					input.maxLength=iv;
				iv=buffer.getInt32();
				if (iv !=0){
					if(iv==4)
						input.keyboardType="number";
					else if(iv==3)
					input.keyboardType="url";
				}
				if (buffer.readBool())
					input.password=true;
			}
			else
			buffer.skip(13);
		}
	}

	__getset(0,__proto,'editable',function(){
		if (this._titleObject && ((this._titleObject instanceof fairygui.GTextInput )))
			return this._titleObject.asTextInput.editable;
		else
		return false;
		},function(val){
		if (this._titleObject)
			this._titleObject.asTextInput.editable=val;
	});

	__getset(0,__proto,'color',function(){
		return this.titleColor;
		},function(value){
		this.titleColor=value;
	});

	__getset(0,__proto,'title',function(){
		if (this._titleObject)
			return this._titleObject.text;
		else
		return null;
		},function(value){
		if (this._titleObject)
			this._titleObject.text=value;
		this.updateGear(6);
	});

	__getset(0,__proto,'titleFontSize',function(){
		var tf=this.getTextField();
		if(tf!=null)
			return tf.fontSize;
		else
		return 0;
		},function(value){
		var tf=this.getTextField();
		if(tf!=null)
			tf.fontSize=value;
	});

	__getset(0,__proto,'titleColor',function(){
		var tf=this.getTextField();
		if(tf!=null)
			return tf.color;
		else
		return "#000000";
		},function(value){
		var tf=this.getTextField();
		if(tf!=null)
			tf.color=value;
		this.updateGear(4);
	});

	__getset(0,__proto,'text',function(){
		return this.title;
		},function(value){
		this.title=value;
	});

	__getset(0,__proto,'icon',function(){
		if(this._iconObject!=null)
			return this._iconObject.icon;
		else
		return null;
		},function(value){
		if(this._iconObject!=null)
			this._iconObject.icon=value;
		this.updateGear(7);
	});

	return GLabel;
})(GComponent)


//class fairygui.GScrollBar extends fairygui.GComponent
var GScrollBar=(function(_super){
	function GScrollBar(){
		this._grip=null;
		this._arrowButton1=null;
		this._arrowButton2=null;
		this._bar=null;
		this._target=null;
		this._vertical=false;
		this._scrollPerc=0;
		this._fixedGripSize=false;
		this._dragOffset=null;
		GScrollBar.__super.call(this);
		this._dragOffset=new laya.maths.Point();
		this._scrollPerc=0;
	}

	__class(GScrollBar,'fairygui.GScrollBar',_super);
	var __proto=GScrollBar.prototype;
	__proto.setScrollPane=function(target,vertical){
		this._target=target;
		this._vertical=vertical;
	}

	__proto.constructExtension=function(buffer){
		buffer.seek(0,6);
		this._fixedGripSize=buffer.readBool();
		this._grip=this.getChild("grip");
		if(!this._grip){
			Log.print("需要定义grip");
			return;
		}
		this._bar=this.getChild("bar");
		if(!this._bar){
			Log.print("需要定义bar");
			return;
		}
		this._arrowButton1=this.getChild("arrow1");
		this._arrowButton2=this.getChild("arrow2");
		this._grip.on("mousedown",this,this.__gripMouseDown);
		if(this._arrowButton1)
			this._arrowButton1.on("mousedown",this,this.__arrowButton1Click);
		if(this._arrowButton2)
			this._arrowButton2.on("mousedown",this,this.__arrowButton2Click);
		this.on("mousedown",this,this.__barMouseDown);
	}

	__proto.__gripMouseDown=function(evt){
		if (!this._bar)
			return;
		evt.stopPropagation();
		Laya.stage.on("mousemove",this,this.__gripMouseMove);
		Laya.stage.on("mouseup",this,this.__gripMouseUp);
		this.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,this._dragOffset);
		this._dragOffset.x-=this._grip.x;
		this._dragOffset.y-=this._grip.y;
	}

	__proto.__gripMouseMove=function(){
		var pt=this.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,fairygui.GScrollBar.sScrollbarHelperPoint);
		if (this._vertical){
			var curY=pt.y-this._dragOffset.y;
			this._target.setPercY((curY-this._bar.y)/ (this._bar.height-this._grip.height),false);
		}
		else {
			var curX=pt.x-this._dragOffset.x;
			this._target.setPercX((curX-this._bar.x)/ (this._bar.width-this._grip.width),false);
		}
	}

	__proto.__gripMouseUp=function(evt){
		if (!this._bar)
			return;
		Laya.stage.off("mousemove",this,this.__gripMouseMove);
		Laya.stage.off("mouseup",this,this.__gripMouseUp);
	}

	__proto.__arrowButton1Click=function(evt){
		evt.stopPropagation();
		if (this._vertical)
			this._target.scrollUp();
		else
		this._target.scrollLeft();
	}

	__proto.__arrowButton2Click=function(evt){
		evt.stopPropagation();
		if (this._vertical)
			this._target.scrollDown();
		else
		this._target.scrollRight();
	}

	__proto.__barMouseDown=function(evt){
		var pt=this._grip.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,fairygui.GScrollBar.sScrollbarHelperPoint);
		if (this._vertical){
			if (pt.y < 0)
				this._target.scrollUp(4);
			else
			this._target.scrollDown(4);
		}
		else {
			if (pt.x < 0)
				this._target.scrollLeft(4);
			else
			this._target.scrollRight(4);
		}
	}

	__getset(0,__proto,'minSize',function(){
		if (this._vertical)
			return (this._arrowButton1 !=null ? this._arrowButton1.height :0)+(this._arrowButton2 !=null ? this._arrowButton2.height :0);
		else
		return (this._arrowButton1 !=null ? this._arrowButton1.width :0)+(this._arrowButton2 !=null ? this._arrowButton2.width :0);
	});

	__getset(0,__proto,'scrollPerc',null,function(val){
		this._scrollPerc=val;
		if (this._vertical)
			this._grip.y=this._bar.y+(this._bar.height-this._grip.height)*this._scrollPerc;
		else
		this._grip.x=this._bar.x+(this._bar.width-this._grip.width)*this._scrollPerc;
	});

	__getset(0,__proto,'displayPerc',null,function(val){
		if (this._vertical){
			if(!this._fixedGripSize)
				this._grip.height=val *this._bar.height;
			this._grip.y=this._bar.y+(this._bar.height-this._grip.height)*this._scrollPerc;
		}
		else {
			if(!this._fixedGripSize)
				this._grip.width=val *this._bar.width;
			this._grip.x=this._bar.x+(this._bar.width-this._grip.width)*this._scrollPerc;
		}
	});

	__static(GScrollBar,
	['sScrollbarHelperPoint',function(){return this.sScrollbarHelperPoint=new Point();}
	]);
	return GScrollBar;
})(GComponent)


//class fairygui.GProgressBar extends fairygui.GComponent
var GProgressBar=(function(_super){
	function GProgressBar(){
		this._max=0;
		this._value=0;
		this._titleType=0;
		this._reverse=false;
		this._titleObject=null;
		this._aniObject=null;
		this._barObjectH=null;
		this._barObjectV=null;
		this._barMaxWidth=0;
		this._barMaxHeight=0;
		this._barMaxWidthDelta=0;
		this._barMaxHeightDelta=0;
		this._barStartX=0;
		this._barStartY=0;
		this._tweening=false;
		GProgressBar.__super.call(this);
		this._titleType=0;
		this._value=50;
		this._max=100;
	}

	__class(GProgressBar,'fairygui.GProgressBar',_super);
	var __proto=GProgressBar.prototype;
	__proto.tweenValue=function(value,duration){
		var _$this=this;
		if(this._value !=value){
			if(this._tweening){
				GTween.kill(this,false,this.update);
				this._tweening=false;
			};
			var oldValule=this._value;
			this._value=value;
			this._tweening=true;
			return GTween.to(oldValule,this._value,duration).setTarget(this,this.update).setEase(0)
			.onComplete(function(){_$this._tweening=false;},this);
		}
		else
		return null;
	}

	__proto.update=function(newValue){
		var percent=this._max!=0?Math.min(newValue / this._max,1):0;
		if(this._titleObject){
			switch(this._titleType){
				case 0:
					this._titleObject.text=Math.round(percent *100)+"%";
					break ;
				case 1:
					this._titleObject.text=Math.round(newValue)+"/"+Math.round(this._max);
					break ;
				case 2:
					this._titleObject.text=""+Math.round(newValue);
					break ;
				case 3:
					this._titleObject.text=""+Math.round(this._max);
					break ;
				}
		};
		var fullWidth=this.width-this._barMaxWidthDelta;
		var fullHeight=this.height-this._barMaxHeightDelta;
		if(!this._reverse){
			if(this._barObjectH){
				if (((this._barObjectH instanceof fairygui.GImage ))&& (this._barObjectH).fillMethod !=0)
					(this._barObjectH).fillAmount=percent;
				else
				this._barObjectH.width=Math.round(fullWidth *percent);
			}
			if(this._barObjectV){
				if (((this._barObjectV instanceof fairygui.GImage ))&& (this._barObjectV).fillMethod !=0)
					(this._barObjectV).fillAmount=percent;
				else
				this._barObjectV.height=Math.round(fullHeight *percent);
			}
		}
		else {
			if(this._barObjectH){
				if (((this._barObjectH instanceof fairygui.GImage ))&& (this._barObjectH).fillMethod !=0)
					(this._barObjectH).fillAmount=1-percent;
				else{
					this._barObjectH.width=Math.round(fullWidth *percent);
					this._barObjectH.x=this._barStartX+(fullWidth-this._barObjectH.width);
				}
			}
			if(this._barObjectV){
				if (((this._barObjectV instanceof fairygui.GImage ))&& (this._barObjectV).fillMethod !=0)
					(this._barObjectV).fillAmount=1-percent;
				else{
					this._barObjectV.height=Math.round(fullHeight *percent);
					this._barObjectV.y=this._barStartY+(fullHeight-this._barObjectV.height);
				}
			}
		}
		if((this._aniObject instanceof fairygui.GMovieClip ))
			(this._aniObject).frame=Math.round(percent *100);
	}

	__proto.constructExtension=function(buffer){
		buffer.seek(0,6);
		this._titleType=buffer.readByte();
		this._reverse=buffer.readBool();
		this._titleObject=(this.getChild("title"));
		this._barObjectH=this.getChild("bar");
		this._barObjectV=this.getChild("bar_v");
		this._aniObject=this.getChild("ani");
		if(this._barObjectH){
			this._barMaxWidth=this._barObjectH.width;
			this._barMaxWidthDelta=this.width-this._barMaxWidth;
			this._barStartX=this._barObjectH.x;
		}
		if(this._barObjectV){
			this._barMaxHeight=this._barObjectV.height;
			this._barMaxHeightDelta=this.height-this._barMaxHeight;
			this._barStartY=this._barObjectV.y;
		}
	}

	__proto.handleSizeChanged=function(){
		_super.prototype.handleSizeChanged.call(this);
		if(this._barObjectH)
			this._barMaxWidth=this.width-this._barMaxWidthDelta;
		if(this._barObjectV)
			this._barMaxHeight=this.height-this._barMaxHeightDelta;
		if(!this._underConstruct)
			this.update(this._value);
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		if (!buffer.seek(beginPos,6)){
			this.update(this._value);
			return;
		}
		if (buffer.readByte()!=this.packageItem.objectType){
			this.update(this._value);
			return;
		}
		this._value=buffer.getInt32();
		this._max=buffer.getInt32();
		this.update(this._value);
	}

	__proto.dispose=function(){
		if(this._tweening)
			GTween.kill(this);
		_super.prototype.dispose.call(this);
	}

	__getset(0,__proto,'value',function(){
		return this._value;
		},function(value){
		if(this._tweening){
			GTween.kill(this,true,this.update);
			this._tweening=false;
		}
		if(this._value !=value){
			this._value=value;
			this.update(this._value);
		}
	});

	__getset(0,__proto,'max',function(){
		return this._max;
		},function(value){
		if(this._max !=value){
			this._max=value;
			this.update(this._value);
		}
	});

	/**
	*@see ProgressTitleType
	*/
	/**
	*@see ProgressTitleType
	*/
	__getset(0,__proto,'titleType',function(){
		return this._titleType;
		},function(value){
		if(this._titleType !=value){
			this._titleType=value;
			this.update(this._value);
		}
	});

	return GProgressBar;
})(GComponent)


//class fairygui.Window extends fairygui.GComponent
var Window$2=(function(_super){
	function Window(){
		this._contentPane=null;
		this._modalWaitPane=null;
		this._closeButton=null;
		this._dragArea=null;
		this._contentArea=null;
		this._frame=null;
		this._modal=false;
		this._uiSources=null;
		this._inited=false;
		this._loading=false;
		this._requestingCmd=0;
		this.bringToFontOnClick=false;
		Window.__super.call(this);
		this.focusable=true;
		this._uiSources=[];
		this.bringToFontOnClick=UIConfig$1.bringWindowToFrontOnClick;
		this.displayObject.on("display",this,this.__onShown);
		this.displayObject.on("undisplay",this,this.__onHidden);
		this.displayObject.on("mousedown",this,this.__mouseDown);
	}

	__class(Window,'fairygui.Window',_super,'Window$2');
	var __proto=Window.prototype;
	__proto.addUISource=function(source){
		this._uiSources.push(source);
	}

	__proto.show=function(){
		GRoot.inst.showWindow(this);
	}

	__proto.showOn=function(root){
		root.showWindow(this);
	}

	__proto.hide=function(){
		if(this.isShowing)
			this.doHideAnimation();
	}

	__proto.hideImmediately=function(){
		var r=((this.parent instanceof fairygui.GRoot ))? (this.parent):null;
		if(!r)
			r=GRoot.inst;
		r.hideWindowImmediately(this);
	}

	__proto.centerOn=function(r,restraint){
		(restraint===void 0)&& (restraint=false);
		this.setXY(Math.round((r.width-this.width)/ 2),Math.round((r.height-this.height)/ 2));
		if(restraint){
			this.addRelation(r,3);
			this.addRelation(r,10);
		}
	}

	__proto.toggleStatus=function(){
		if(this.isTop)
			this.hide();
		else
		this.show();
	}

	__proto.bringToFront=function(){
		this.root.bringToFront(this);
	}

	__proto.showModalWait=function(requestingCmd){
		(requestingCmd===void 0)&& (requestingCmd=0);
		if(requestingCmd !=0)
			this._requestingCmd=requestingCmd;
		if(UIConfig$1.windowModalWaiting){
			if(!this._modalWaitPane)
				this._modalWaitPane=UIPackage.createObjectFromURL(UIConfig$1.windowModalWaiting);
			this.layoutModalWaitPane();
			this.addChild(this._modalWaitPane);
		}
	}

	__proto.layoutModalWaitPane=function(){
		if(this._contentArea !=null){
			var pt=this._frame.localToGlobal();
			pt=this.globalToLocal(pt.x,pt.y,pt);
			this._modalWaitPane.setXY(pt.x+this._contentArea.x,pt.y+this._contentArea.y);
			this._modalWaitPane.setSize(this._contentArea.width,this._contentArea.height);
		}
		else
		this._modalWaitPane.setSize(this.width,this.height);
	}

	__proto.closeModalWait=function(requestingCmd){
		(requestingCmd===void 0)&& (requestingCmd=0);
		if(requestingCmd !=0){
			if(this._requestingCmd !=requestingCmd)
				return false;
		}
		this._requestingCmd=0;
		if(this._modalWaitPane && this._modalWaitPane.parent !=null)
			this.removeChild(this._modalWaitPane);
		return true;
	}

	__proto.init=function(){
		if(this._inited || this._loading)
			return;
		if(this._uiSources.length > 0){
			this._loading=false;
			var cnt=this._uiSources.length;
			for(var i=0;i < cnt;i++){
				var lib=this._uiSources[i];
				if(!lib.loaded){
					lib.load(this.__uiLoadComplete,this);
					this._loading=true;
				}
			}
			if(!this._loading)
				this._init();
		}
		else
		this._init();
	}

	__proto.onInit=function(){}
	__proto.onShown=function(){}
	__proto.onHide=function(){}
	__proto.doShowAnimation=function(){
		this.onShown();
	}

	__proto.doHideAnimation=function(){
		this.hideImmediately();
	}

	__proto.__uiLoadComplete=function(){
		var cnt=this._uiSources.length;
		for(var i=0;i < cnt;i++){
			var lib=this._uiSources[i];
			if(!lib.loaded)
				return;
		}
		this._loading=false;
		this._init();
	}

	__proto._init=function(){
		this._inited=true;
		this.onInit();
		if(this.isShowing)
			this.doShowAnimation();
	}

	__proto.dispose=function(){
		if(this.parent !=null)
			this.hideImmediately();
		_super.prototype.dispose.call(this);
	}

	__proto.closeEventHandler=function(){
		this.hide();
	}

	__proto.__onShown=function(){
		if(!this._inited)
			this.init();
		else
		this.doShowAnimation();
	}

	__proto.__onHidden=function(){
		this.closeModalWait();
		this.onHide();
	}

	__proto.__mouseDown=function(){
		if(this.isShowing && this.bringToFontOnClick)
			this.bringToFront();
	}

	__proto.__dragStart=function(evt){
		GObject.cast(evt.currentTarget).stopDrag();
		this.startDrag();
	}

	__getset(0,__proto,'modalWaiting',function(){
		return this._modalWaitPane && this._modalWaitPane.parent !=null;
	});

	__getset(0,__proto,'modal',function(){
		return this._modal;
		},function(val){
		this._modal=val;
	});

	__getset(0,__proto,'isTop',function(){
		return this.parent !=null && this.parent.getChildIndex(this)==this.parent.numChildren-1;
	});

	__getset(0,__proto,'contentArea',function(){
		return this._contentArea;
		},function(value){
		this._contentArea=value;
	});

	__getset(0,__proto,'dragArea',function(){
		return this._dragArea;
		},function(value){
		if(this._dragArea !=value){
			if(this._dragArea !=null){
				this._dragArea.draggable=false;
				this._dragArea.off("fui_drag_start",this,this.__dragStart);
			}
			this._dragArea=value;
			if(this._dragArea !=null){
				if((this._dragArea instanceof fairygui.GGraph ))
					this._dragArea.asGraph.drawRect(0,null,null);
				this._dragArea.draggable=true;
				this._dragArea.on("fui_drag_start",this,this.__dragStart);
			}
		}
	});

	__getset(0,__proto,'isShowing',function(){
		return this.parent !=null;
	});

	__getset(0,__proto,'closeButton',function(){
		return this._closeButton;
		},function(value){
		if(this._closeButton !=null)
			this._closeButton.offClick(this,this.closeEventHandler);
		this._closeButton=value;
		if(this._closeButton !=null)
			this._closeButton.onClick(this,this.closeEventHandler);
	});

	__getset(0,__proto,'frame',function(){
		return this._frame;
	});

	__getset(0,__proto,'contentPane',function(){
		return this._contentPane;
		},function(val){
		if(this._contentPane !=val){
			if(this._contentPane !=null)
				this.removeChild(this._contentPane);
			this._contentPane=val;
			if(this._contentPane !=null){
				this.addChild(this._contentPane);
				this.setSize(this._contentPane.width,this._contentPane.height);
				this._contentPane.addRelation(this,24);
				this._frame=(this._contentPane.getChild("frame"));
				if(this._frame !=null){
					this.closeButton=this._frame.getChild("closeButton");
					this.dragArea=this._frame.getChild("dragArea");
					this.contentArea=this._frame.getChild("contentArea");
				}
			}
		}
	});

	return Window;
})(GComponent)


//class fairygui.GTextInput extends fairygui.GTextField
var GTextInput=(function(_super){
	function GTextInput(){
		this.input=null;
		GTextInput.__super.call(this);
	}

	__class(GTextInput,'fairygui.GTextInput',_super);
	var __proto=GTextInput.prototype;
	__proto.createDisplayObject=function(){
		this._displayObject=this.input=new Input();
		this._displayObject.mouseEnabled=true;
		this._displayObject["$owner"]=this;
	}

	__proto.handleSizeChanged=function(){
		this.input.size(this.width,this.height);
	}

	__proto.setup_beforeAdd=function(buffer,beginPos){
		_super.prototype.setup_beforeAdd.call(this,buffer,beginPos);
		buffer.seek(beginPos,4);
		var str=buffer.readS();
		if (str !=null)
			this.promptText=str;
		str=buffer.readS();
		if (str !=null)
			this.input.restrict=str;
		var iv=buffer.getInt32();
		if (iv !=0)
			this.input.maxChars=iv;
		iv=buffer.getInt32();
		if (iv !=0){
			if(iv==4)
				this.keyboardType="number";
			else if(iv==3)
			this.keyboardType="url";
		}
		if (buffer.readBool())
			this.password=true;
	}

	__getset(0,__proto,'promptText',function(){
		return this.input.prompt;
		},function(value){
		this.input.prompt=value;
	});

	__getset(0,__proto,'maxLength',function(){
		return this.input.maxChars;
		},function(value){
		this.input.maxChars=value;
	});

	__getset(0,__proto,'keyboardType',function(){
		return this.input.type;
		},function(value){
		this.input.type=value;
	});

	__getset(0,__proto,'password',function(){
		return this.input.type=="password";
		},function(value){
		if (value)
			this.input.type="password";
		else
		this.input.type="text";
	});

	__getset(0,__proto,'strokeColor',function(){
		return this.input.strokeColor;
		},function(value){
		this.input.strokeColor=value;
		this.updateGear(4);
	});

	__getset(0,__proto,'stroke',function(){
		return this.input.stroke;
		},function(value){
		this.input.stroke=value;
	});

	__getset(0,__proto,'fontSize',function(){
		return this.input.fontSize;
		},function(value){
		this.input.fontSize=value;
	});

	__getset(0,__proto,'align',function(){
		return this.input.align;
		},function(value){
		this.input.align=value;
	});

	__getset(0,__proto,'color',function(){
		return this.input.color;
		},function(value){
		this.input.color=value;
	});

	__getset(0,__proto,'singleLine',function(){
		return !this.input.multiline;
		},function(value){
		this.input.multiline=!value;
	});

	__getset(0,__proto,'editable',function(){
		return this.input.editable;
		},function(value){
		this.input.editable=value;
	});

	__getset(0,__proto,'italic',function(){
		return this.input.italic;
		},function(value){
		this.input.italic=value;
	});

	__getset(0,__proto,'valign',function(){
		return this.input.valign;
		},function(value){
		this.input.valign=value;
	});

	__getset(0,__proto,'bold',function(){
		return this.input.bold;
		},function(value){
		this.input.bold=value;
	});

	__getset(0,__proto,'textWidth',function(){
		return this.input.textWidth;
	});

	__getset(0,__proto,'restrict',function(){
		return this.input.restrict;
		},function(value){
		this.input.restrict=value;
	});

	__getset(0,__proto,'leading',function(){
		return this.input.leading;
		},function(value){
		this.input.leading=value;
	});

	__getset(0,__proto,'font',function(){
		return this.input.font;
		},function(value){
		this.input.font=value;
	});

	__getset(0,__proto,'text',function(){
		return this.input.text;
		},function(value){
		this.input.text=value;
	});

	return GTextInput;
})(GTextField)


//class fairygui.GSlider extends fairygui.GComponent
var GSlider=(function(_super){
	function GSlider(){
		this._max=0;
		this._value=0;
		this._titleType=0;
		this._reverse=false;
		this._titleObject=null;
		this._barObjectH=null;
		this._barObjectV=null;
		this._barMaxWidth=0;
		this._barMaxHeight=0;
		this._barMaxWidthDelta=0;
		this._barMaxHeightDelta=0;
		this._gripObject=null;
		this._clickPos=null;
		this._clickPercent=0;
		this._barStartX=0;
		this._barStartY=0;
		this.changeOnClick=true;
		/**是否可拖动开关**/
		this.canDrag=true;
		GSlider.__super.call(this);
		this._titleType=0;
		this._value=50;
		this._max=100;
		this._clickPos=new laya.maths.Point();
	}

	__class(GSlider,'fairygui.GSlider',_super);
	var __proto=GSlider.prototype;
	__proto.update=function(){
		var percent=Math.min(this._value / this._max,1);
		this.updateWidthPercent(percent);
	}

	__proto.updateWidthPercent=function(percent){
		if (this._titleObject){
			switch (this._titleType){
				case 0:
					this._titleObject.text=Math.round(percent *100)+"%";
					break ;
				case 1:
					this._titleObject.text=this._value+"/"+this._max;
					break ;
				case 2:
					this._titleObject.text=""+this._value;
					break ;
				case 3:
					this._titleObject.text=""+this._max;
					break ;
				}
		};
		var fullWidth=this.width-this._barMaxWidthDelta;
		var fullHeight=this.height-this._barMaxHeightDelta;
		if(!this._reverse){
			if(this._barObjectH)
				this._barObjectH.width=Math.round(fullWidth*percent);
			if(this._barObjectV)
				this._barObjectV.height=Math.round(fullHeight*percent);
		}
		else{
			if(this._barObjectH){
				this._barObjectH.width=Math.round(fullWidth*percent);
				this._barObjectH.x=this._barStartX+(fullWidth-this._barObjectH.width);
			}
			if(this._barObjectV){
				this._barObjectV.height=Math.round(fullHeight*percent);
				this._barObjectV.y=this._barStartY+(fullHeight-this._barObjectV.height);
			}
		}
	}

	__proto.constructExtension=function(buffer){
		buffer.seek(0,6);
		this._titleType=buffer.readByte();
		this._reverse=buffer.readBool();
		this._titleObject=(this.getChild("title"));
		this._barObjectH=this.getChild("bar");
		this._barObjectV=this.getChild("bar_v");
		this._gripObject=this.getChild("grip");
		if(this._barObjectH){
			this._barMaxWidth=this._barObjectH.width;
			this._barMaxWidthDelta=this.width-this._barMaxWidth;
			this._barStartX=this._barObjectH.x;
		}
		if(this._barObjectV){
			this._barMaxHeight=this._barObjectV.height;
			this._barMaxHeightDelta=this.height-this._barMaxHeight;
			this._barStartY=this._barObjectV.y;
		}
		if(this._gripObject){
			this._gripObject.on("mousedown",this,this.__gripMouseDown);
		}
		this.displayObject.on("mousedown",this,this.__barMouseDown);
	}

	__proto.handleSizeChanged=function(){
		_super.prototype.handleSizeChanged.call(this);
		if(this._barObjectH)
			this._barMaxWidth=this.width-this._barMaxWidthDelta;
		if(this._barObjectV)
			this._barMaxHeight=this.height-this._barMaxHeightDelta;
		if(!this._underConstruct)
			this.update();
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		if (!buffer.seek(beginPos,6)){
			this.update();
			return;
		}
		if (buffer.readByte()!=this.packageItem.objectType){
			this.update();
			return;
		}
		this._value=buffer.getInt32();
		this._max=buffer.getInt32();
		this.update();
	}

	__proto.__gripMouseDown=function(evt){
		this.canDrag=true;
		evt.stopPropagation();
		this._clickPos=this.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY);
		this._clickPercent=this._value / this._max;
		Laya.stage.on("mousemove",this,this.__gripMouseMove);
		Laya.stage.on("mouseup",this,this.__gripMouseUp);
	}

	__proto.__gripMouseMove=function(evt){
		if(!this.canDrag){
			return;
		};
		var pt=this.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY,fairygui.GSlider.sSilderHelperPoint);
		var deltaX=pt.x-this._clickPos.x;
		var deltaY=pt.y-this._clickPos.y;
		if(this._reverse){
			deltaX=-deltaX;
			deltaY=-deltaY;
		};
		var percent=NaN;
		if (this._barObjectH)
			percent=this._clickPercent+deltaX / this._barMaxWidth;
		else
		percent=this._clickPercent+deltaY / this._barMaxHeight;
		if (percent > 1)
			percent=1;
		else if (percent < 0)
		percent=0;
		var newValue=Math.round(this._max *percent);
		if (newValue !=this._value){
			this._value=newValue;
			Events.dispatch("fui_state_changed",this.displayObject,evt);
		}
		this.updateWidthPercent(percent);
	}

	__proto.__gripMouseUp=function(evt){
		Laya.stage.off("mousemove",this,this.__gripMouseMove);
		Laya.stage.off("mouseup",this,this.__gripMouseUp);
	}

	__proto.__barMouseDown=function(evt){
		if(!this.changeOnClick)
			return;
		var pt=this._gripObject.globalToLocal(evt.stageX,evt.stageY,fairygui.GSlider.sSilderHelperPoint);
		var percent=this._value/this._max;
		var delta=NaN;
		if(this._barObjectH)
			delta=(pt.x-this._gripObject.width/2)/this._barMaxWidth;
		if(this._barObjectV)
			delta=(pt.y-this._gripObject.height/2)/this._barMaxHeight;
		if(this._reverse)
			percent-=delta;
		else
		percent+=delta;
		if(percent>1)
			percent=1;
		else if(percent<0)
		percent=0;
		var newValue=Math.round(this._max*percent);
		if(newValue!=this._value){
			this._value=newValue;
			Events.dispatch("fui_state_changed",this.displayObject,evt);
		}
		this.updateWidthPercent(percent);
	}

	__getset(0,__proto,'value',function(){
		return this._value;
		},function(value){
		if (this._value !=value){
			this._value=value;
			this.update();
		}
	});

	__getset(0,__proto,'max',function(){
		return this._max;
		},function(value){
		if (this._max !=value){
			this._max=value;
			this.update();
		}
	});

	/**
	*@see ProgressTitleType
	*/
	/**
	*@see ProgressTitleType
	*/
	__getset(0,__proto,'titleType',function(){
		return this._titleType;
		},function(value){
		this._titleType=value;
	});

	__static(GSlider,
	['sSilderHelperPoint',function(){return this.sSilderHelperPoint=new Point();}
	]);
	return GSlider;
})(GComponent)


//class fairygui.GButton extends fairygui.GComponent
var GButton=(function(_super){
	function GButton(){
		this._titleObject=null;
		this._iconObject=null;
		this._relatedController=null;
		this._mode=0;
		this._selected=false;
		this._title=null;
		this._selectedTitle=null;
		this._icon=null;
		this._selectedIcon=null;
		this._sound=null;
		this._soundVolumeScale=0;
		this._pageOption=null;
		this._buttonController=null;
		this._changeStateOnClick=false;
		this._linkedPopup=null;
		this._downEffect=0;
		this._downEffectValue=0;
		this._downScaled=false;
		this._down=false;
		this._over=false;
		GButton.__super.call(this);
		this._mode=0;
		this._title="";
		this._icon="";
		this._sound=UIConfig$1.buttonSound;
		this._soundVolumeScale=UIConfig$1.buttonSoundVolumeScale;
		this._pageOption=new PageOption();
		this._changeStateOnClick=true;
		this._downEffectValue=0.8;
	}

	__class(GButton,'fairygui.GButton',_super);
	var __proto=GButton.prototype;
	__proto.getTextField=function(){
		if ((this._titleObject instanceof fairygui.GTextField ))
			return this._titleObject;
		else if ((this._titleObject instanceof fairygui.GLabel ))
		return (this._titleObject).getTextField();
		else if ((this._titleObject instanceof fairygui.GButton ))
		return (this._titleObject).getTextField();
		else
		return null;
	}

	__proto.fireClick=function(downEffect){
		(downEffect===void 0)&& (downEffect=true);
		if (downEffect && this._mode==0){
			this.setState("over");
			Laya.timer.once(100,this,this.setState,["down"],false);
			Laya.timer.once(200,this,this.setState,["up"],false);
		}
		this.__click(Events.createEvent("click",this.displayObject));
	}

	__proto.setState=function(val){
		if (this._buttonController)
			this._buttonController.selectedPage=val;
		if(this._downEffect==1){
			var cnt=this.numChildren;
			if(val=="down" || val=="selectedOver" || val=="selectedDisabled"){
				var r=this._downEffectValue *255;
				var color=Utils.toHexColor((r << 16)+(r << 8)+r);
				for(var i=0;i < cnt;i++){
					var obj=this.getChildAt(i);
					if(((obj instanceof fairygui.GImage ))|| ((obj instanceof fairygui.GLoader ))
						|| ((obj instanceof fairygui.GMovieClip )))
					(obj).color=color;
				}
			}
			else {
				for(i=0;i < cnt;i++){
					obj=this.getChildAt(i);
					if(((obj instanceof fairygui.GImage ))|| ((obj instanceof fairygui.GLoader ))
						|| ((obj instanceof fairygui.GMovieClip )))
					(obj).color="#FFFFFF";
				}
			}
		}
		else if(this._downEffect==2){
			if(val=="down" || val=="selectedOver" || val=="selectedDisabled"){
				if(!this._downScaled){
					this.setScale(this.scaleX*this._downEffectValue,this.scaleY*this._downEffectValue);
					this._downScaled=true;
				}
			}
			else{
				if(this._downScaled){
					this.setScale(this.scaleX/this._downEffectValue,this.scaleY/this._downEffectValue);
					this._downScaled=false;
				}
			}
		}
	}

	__proto.handleControllerChanged=function(c){
		_super.prototype.handleControllerChanged.call(this,c);
		if (this._relatedController==c)
			this.selected=this._pageOption.id==c.selectedPageId;
	}

	__proto.handleGrayedChanged=function(){
		if(this._buttonController && this._buttonController.hasPage("disabled")){
			if(this.grayed){
				if(this._selected && this._buttonController.hasPage("selectedDisabled"))
					this.setState("selectedDisabled");
				else
				this.setState("disabled");
			}
			else if(this._selected)
			this.setState("down");
			else
			this.setState("up");
		}
		else
		_super.prototype.handleGrayedChanged.call(this);
	}

	__proto.constructExtension=function(buffer){
		buffer.seek(0,6);
		this._mode=buffer.readByte();
		var str=buffer.readS();
		if(str)
			this._sound=str;
		this._soundVolumeScale=buffer.getFloat32();
		this._downEffect=buffer.readByte();
		this._downEffectValue=buffer.getFloat32();
		if(this._downEffect==2)
			this.setPivot(0.5,0.5,this.pivotAsAnchor);
		this._buttonController=this.getController("button");
		this._titleObject=this.getChild("title");
		this._iconObject=this.getChild("icon");
		if (this._titleObject !=null)
			this._title=this._titleObject.text;
		if (this._iconObject !=null)
			this._icon=this._iconObject.icon;
		if (this._mode==0)
			this.setState("up");
		this.on("mouseover",this,this.__rollover);
		this.on("mouseout",this,this.__rollout);
		this.on("mousedown",this,this.__mousedown);
		this.on("click",this,this.__click);
	}

	__proto.setup_afterAdd=function(buffer,beginPos){
		_super.prototype.setup_afterAdd.call(this,buffer,beginPos);
		if (!buffer.seek(beginPos,6))
			return;
		if (buffer.readByte()!=this.packageItem.objectType)
			return;
		var str;
		var iv=0;
		str=buffer.readS();
		if (str !=null)
			this.title=str;
		str=buffer.readS();
		if (str !=null)
			this.selectedTitle=str;
		str=buffer.readS();
		if (str !=null)
			this.icon=str;
		str=buffer.readS();
		if (str !=null)
			this.selectedIcon=str;
		if (buffer.readBool())
			this.titleColor=buffer.readColorS();
		iv=buffer.getInt32();
		if (iv !=0)
			this.titleFontSize=iv;
		iv=buffer.getInt16();
		if (iv >=0)
			this._relatedController=this.parent.getControllerAt(iv);
		this.pageOption.id=buffer.readS();
		str=buffer.readS();
		if (str !=null)
			this._sound=str;
		if (buffer.readBool())
			this._soundVolumeScale=buffer.getFloat32();
		this.selected=buffer.readBool();
	}

	__proto.__rollover=function(){
		if(!this._buttonController || !this._buttonController.hasPage("over"))
			return;
		this._over=true;
		if (this._down)
			return;
		if(this.grayed && this._buttonController.hasPage("disabled"))
			return;
		this.setState(this._selected ? "selectedOver" :"over");
	}

	__proto.__rollout=function(){
		if(!this._buttonController || !this._buttonController.hasPage("over"))
			return;
		this._over=false;
		if (this._down)
			return;
		if(this.grayed && this._buttonController.hasPage("disabled"))
			return;
		this.setState(this._selected ? "down" :"up");
	}

	__proto.__mousedown=function(evt){
		this._down=true;
		GRoot.inst.checkPopups(evt.target);
		Laya.stage.on("mouseup",this,this.__mouseup);
		if(this._mode==0){
			if(this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
				this.setState("selectedDisabled");
			else
			this.setState("down");
		}
		if (this._linkedPopup !=null){
			if ((this._linkedPopup instanceof fairygui.Window ))
				(this._linkedPopup).toggleStatus();
			else
			this.root.togglePopup(this._linkedPopup,this);
		}
	}

	__proto.__mouseup=function(){
		if (this._down){
			Laya.stage.off("mouseup",this,this.__mouseup);
			this._down=false;
			if(this._displayObject==null)
				return;
			if(this._mode==0){
				if(this.grayed && this._buttonController && this._buttonController.hasPage("disabled"))
					this.setState("disabled");
				else if(this._over)
				this.setState("over");
				else
				this.setState("up");
			}
		}
	}

	__proto.__click=function(evt){
		if(this._sound){
			var pi=UIPackage.getItemByURL(this._sound);
			if (pi)
				GRoot.inst.playOneShotSound(pi.file);
			else
			GRoot.inst.playOneShotSound(this._sound);
		}
		if (this._mode==1){
			if(this._changeStateOnClick){
				this.selected=!this._selected;
				Events.dispatch("fui_state_changed",this.displayObject,evt);
			}
		}
		else if (this._mode==2){
			if (this._changeStateOnClick && !this._selected){
				this.selected=true;
				Events.dispatch("fui_state_changed",this.displayObject,evt);
			}
		}
		else{
			if(this._relatedController)
				this._relatedController.selectedPageId=this._pageOption.id;
		}
	}

	__getset(0,__proto,'linkedPopup',function(){
		return this._linkedPopup;
		},function(value){
		this._linkedPopup=value;
	});

	__getset(0,__proto,'changeStateOnClick',function(){
		return this._changeStateOnClick;
		},function(value){
		this._changeStateOnClick=value;
	});

	__getset(0,__proto,'relatedController',function(){
		return this._relatedController;
		},function(val){
		if (val !=this._relatedController){
			this._relatedController=val;
			this._pageOption.controller=val;
			this._pageOption.clear();
		}
	});

	__getset(0,__proto,'selected',function(){
		return this._selected;
		},function(val){
		if (this._mode==0)
			return;
		if (this._selected !=val){
			this._selected=val;
			if(this.grayed && this._buttonController && this._buttonController.hasPage("disabled")){
				if(this._selected)
					this.setState("selectedDisabled");
				else
				this.setState("disabled");
			}
			else {
				if(this._selected)
					this.setState(this._over ? "selectedOver" :"down");
				else
				this.setState(this._over ? "over" :"up");
			}
			if(this._selectedTitle && this._titleObject)
				this._titleObject.text=this._selected ? this._selectedTitle :this._title;
			if(this._selectedIcon){
				var str=this._selected ? this._selectedIcon :this._icon;
				if(this._iconObject!=null)
					this._iconObject.icon=str;
			}
			if(this._relatedController
				&& this._parent
			&& !this._parent._buildingDisplayList){
				if(this._selected){
					this._relatedController.selectedPageId=this._pageOption.id;
					if(this._relatedController.autoRadioGroupDepth)
						this._parent.adjustRadioGroupDepth(this,this._relatedController);
				}
				else if(this._mode==1 && this._relatedController.selectedPageId==this._pageOption.id)
				this._relatedController.oppositePageId=this._pageOption.id;
			}
		}
	});

	__getset(0,__proto,'pageOption',function(){
		return this._pageOption;
	});

	__getset(0,__proto,'titleColor',function(){
		var tf=this.getTextField();
		if(tf!=null)
			return tf.color;
		else
		return "#000000";
		},function(value){
		var tf=this.getTextField();
		if(tf!=null)
			tf.color=value;
		this.updateGear(4);
	});

	__getset(0,__proto,'icon',function(){
		return this._icon;
		},function(value){
		this._icon=value;
		value=(this._selected && this._selectedIcon)? this._selectedIcon :this._icon;
		if(this._iconObject!=null)
			this._iconObject.icon=value;
		this.updateGear(7);
	});

	__getset(0,__proto,'selectedTitle',function(){
		return this._selectedTitle;
		},function(value){
		this._selectedTitle=value;
		if (this._titleObject)
			this._titleObject.text=(this._selected && this._selectedTitle)? this._selectedTitle :this._title;
	});

	__getset(0,__proto,'text',function(){
		return this.title;
		},function(value){
		this.title=value;
	});

	__getset(0,__proto,'selectedIcon',function(){
		return this._selectedIcon;
		},function(value){
		this._selectedIcon=value;
		value=(this._selected && this._selectedIcon)? this._selectedIcon :this._icon;
		if(this._iconObject!=null)
			this._iconObject.icon=value;
	});

	__getset(0,__proto,'soundVolumeScale',function(){
		return this._soundVolumeScale;
		},function(value){
		this._soundVolumeScale=value;
	});

	__getset(0,__proto,'titleFontSize',function(){
		var tf=this.getTextField();
		if(tf!=null)
			return tf.fontSize;
		else
		return 0;
		},function(value){
		var tf=this.getTextField();
		if(tf!=null)
			tf.fontSize=value;
	});

	__getset(0,__proto,'title',function(){
		return this._title;
		},function(value){
		this._title=value;
		if (this._titleObject)
			this._titleObject.text=(this._selected && this._selectedTitle)? this._selectedTitle :this._title;
		this.updateGear(6);
	});

	/**
	*@see ButtonMode
	*/
	/**
	*@see ButtonMode
	*/
	__getset(0,__proto,'mode',function(){
		return this._mode;
		},function(value){
		if (this._mode !=value){
			if (value==0)
				this.selected=false;
			this._mode=value;
		}
	});

	__getset(0,__proto,'sound',function(){
		return this._sound;
		},function(val){
		this._sound=val;
	});

	GButton.UP="up";
	GButton.DOWN="down";
	GButton.OVER="over";
	GButton.SELECTED_OVER="selectedOver";
	GButton.DISABLED="disabled";
	GButton.SELECTED_DISABLED="selectedDisabled";
	return GButton;
})(GComponent)


//class fairygui.GRoot extends fairygui.GComponent
var GRoot=(function(_super){
	function GRoot(){
		this._modalLayer=null;
		this._popupStack=null;
		this._justClosedPopups=null;
		this._modalWaitPane=null;
		this._focusedObject=null;
		this._tooltipWin=null;
		this._defaultTooltipWin=null;
		this._checkPopups=false;
		GRoot.__super.call(this);
		if(fairygui.GRoot._inst==null)
			fairygui.GRoot._inst=this;
		this.opaque=false;
		this._popupStack=[];
		this._justClosedPopups=[];
		this.displayObject.once("display",this,this.__addedToStage);
	}

	__class(GRoot,'fairygui.GRoot',_super);
	var __proto=GRoot.prototype;
	__proto.showWindow=function(win){
		this.addChild(win);
		win.requestFocus();
		if(win.x > this.width)
			win.x=this.width-win.width;
		else if(win.x+win.width < 0)
		win.x=0;
		if(win.y > this.height)
			win.y=this.height-win.height;
		else if(win.y+win.height < 0)
		win.y=0;
		this.adjustModalLayer();
	}

	__proto.hideWindow=function(win){
		win.hide();
	}

	__proto.hideWindowImmediately=function(win){
		if(win.parent==this)
			this.removeChild(win);
		this.adjustModalLayer();
	}

	__proto.bringToFront=function(win){
		var cnt=this.numChildren;
		var i=NaN;
		if(this._modalLayer.parent!=null && !win.modal)
			i=this.getChildIndex(this._modalLayer)-1;
		else
		i=cnt-1;
		for(;i >=0;i--){
			var g=this.getChildAt(i);
			if(g==win)
				return;
			if((g instanceof fairygui.Window ))
				break ;
		}
		if(i>=0)
			this.setChildIndex(win,i);
	}

	__proto.showModalWait=function(msg){
		if(UIConfig$1.globalModalWaiting !=null){
			if(this._modalWaitPane==null)
				this._modalWaitPane=UIPackage.createObjectFromURL(UIConfig$1.globalModalWaiting);
			this._modalWaitPane.setSize(this.width,this.height);
			this._modalWaitPane.addRelation(this,24);
			this.addChild(this._modalWaitPane);
			this._modalWaitPane.text=msg;
		}
	}

	__proto.closeModalWait=function(){
		if(this._modalWaitPane !=null && this._modalWaitPane.parent !=null)
			this.removeChild(this._modalWaitPane);
	}

	__proto.closeAllExceptModals=function(){
		var arr=this._children.slice();
		var cnt=arr.length;
		for(var i=0;i < cnt;i++){
			var g=arr[i];
			if(((g instanceof fairygui.Window ))&& !(g).modal)
				(g).hide();
		}
	}

	__proto.closeAllWindows=function(){
		var arr=this._children.slice();
		var cnt=arr.length;
		for(var i=0;i < cnt;i++){
			var g=arr[i];
			if((g instanceof fairygui.Window ))
				(g).hide();
		}
	}

	__proto.getTopWindow=function(){
		var cnt=this.numChildren;
		for(var i=cnt-1;i >=0;i--){
			var g=this.getChildAt(i);
			if((g instanceof fairygui.Window )){
				return (g);
			}
		}
		return null;
	}

	__proto.showPopup=function(popup,target,downward){
		if(this._popupStack.length > 0){
			var k=this._popupStack.indexOf(popup);
			if(k !=-1){
				for(var i=this._popupStack.length-1;i >=k;i--)
				this.removeChild(this._popupStack.pop());
			}
		}
		this._popupStack.push(popup);
		if (target !=null){
			var p=target;
			while (p !=null){
				if (p.parent==this){
					if (popup.sortingOrder < p.sortingOrder){
						popup.sortingOrder=p.sortingOrder;
					}
					break ;
				}
				p=p.parent;
			}
		}
		this.addChild(popup);
		this.adjustModalLayer();
		var pos;
		var sizeW=0,sizeH=0;
		if(target){
			pos=target.localToGlobal();
			sizeW=target.width;
			sizeH=target.height;
		}
		else {
			pos=this.globalToLocal(Laya.stage.mouseX,Laya.stage.mouseY);
		};
		var xx=NaN,yy=NaN;
		xx=pos.x;
		if(xx+popup.width > this.width)
			xx=xx+sizeW-popup.width;
		yy=pos.y+sizeH;
		if((downward==null && yy+popup.height > this.height)
			|| downward==false){
			yy=pos.y-popup.height-1;
			if(yy < 0){
				yy=0;
				xx+=sizeW / 2;
			}
		}
		popup.x=xx;
		popup.y=yy;
	}

	__proto.togglePopup=function(popup,target,downward){
		if(this._justClosedPopups.indexOf(popup)!=-1)
			return;
		this.showPopup(popup,target,downward);
	}

	__proto.hidePopup=function(popup){
		if(popup !=null){
			var k=this._popupStack.indexOf(popup);
			if(k !=-1){
				for(var i=this._popupStack.length-1;i >=k;i--)
				this.closePopup(this._popupStack.pop());
			}
		}
		else {
			var cnt=this._popupStack.length;
			for(i=cnt-1;i >=0;i--)
			this.closePopup(this._popupStack[i]);
			this._popupStack.length=0;
		}
	}

	__proto.closePopup=function(target){
		if(target.parent !=null){
			if((target instanceof fairygui.Window ))
				(target).hide();
			else
			this.removeChild(target);
		}
	}

	__proto.showTooltips=function(msg){
		if (this._defaultTooltipWin==null){
			var resourceURL=UIConfig$1.tooltipsWin;
			if (!resourceURL){
				Log.print("UIConfig.tooltipsWin not defined");
				return;
			}
			this._defaultTooltipWin=UIPackage.createObjectFromURL(resourceURL);
		}
		this._defaultTooltipWin.text=msg;
		this.showTooltipsWin(this._defaultTooltipWin);
	}

	__proto.showTooltipsWin=function(tooltipWin,position){
		this.hideTooltips();
		this._tooltipWin=tooltipWin;
		var xx=0;
		var yy=0;
		if (position==null){
			xx=Laya.stage.mouseX+10;
			yy=Laya.stage.mouseY+20;
		}
		else {
			xx=position.x;
			yy=position.y;
		};
		var pt=this.globalToLocal(xx,yy);
		xx=pt.x;
		yy=pt.y;
		if (xx+this._tooltipWin.width > this.width){
			xx=xx-this._tooltipWin.width-1;
			if (xx < 0)
				xx=10;
		}
		if (yy+this._tooltipWin.height > this.height){
			yy=yy-this._tooltipWin.height-1;
			if (xx-this._tooltipWin.width-1 > 0)
				xx=xx-this._tooltipWin.width-1;
			if (yy < 0)
				yy=10;
		}
		this._tooltipWin.x=xx;
		this._tooltipWin.y=yy;
		this.addChild(this._tooltipWin);
	}

	__proto.hideTooltips=function(){
		if (this._tooltipWin !=null){
			if (this._tooltipWin.parent)
				this.removeChild(this._tooltipWin);
			this._tooltipWin=null;
		}
	}

	__proto.getObjectUnderPoint=function(globalX,globalY){
		return null;
	}

	__proto.setFocus=function(value){
		if(this._focusedObject!=value){
			this._focusedObject=value;
			this.displayObject.event("fui_focus_changed");
		}
	}

	__proto.playOneShotSound=function(url,volumeScale){
		(volumeScale===void 0)&& (volumeScale=1);
		if(ToolSet.startsWith(url,"ui://"))
			return;
		SoundManager.playSound(url);
	}

	__proto.adjustModalLayer=function(){
		var cnt=this.numChildren;
		if (this._modalWaitPane !=null && this._modalWaitPane.parent !=null)
			this.setChildIndex(this._modalWaitPane,cnt-1);
		for(var i=cnt-1;i >=0;i--){
			var g=this.getChildAt(i);
			if(((g instanceof fairygui.Window ))&& (g).modal){
				if(this._modalLayer.parent==null)
					this.addChildAt(this._modalLayer,i);
				else
				this.setChildIndexBefore(this._modalLayer,i);
				return;
			}
		}
		if (this._modalLayer.parent !=null)
			this.removeChild(this._modalLayer);
	}

	__proto.__addedToStage=function(){
		Laya.stage.on("mousedown",this,this.__stageMouseDown);
		Laya.stage.on("mouseup",this,this.__stageMouseUp);
		this._modalLayer=new GGraph();
		this._modalLayer.setSize(this.width,this.height);
		this._modalLayer.drawRect(0,null,UIConfig$1.modalLayerColor);
		this._modalLayer.addRelation(this,24);
		this.displayObject.stage.on("resize",this,this.__winResize);
		this.__winResize();
	}

	__proto.checkPopups=function(clickTarget){
		if(this._checkPopups)
			return;
		this._checkPopups=true;
		this._justClosedPopups.length=0;
		if (this._popupStack.length > 0){
			var mc=clickTarget;
			while (mc !=this.displayObject.stage && mc !=null){
				if (mc["$owner"]){
					var pindex=this._popupStack.indexOf(mc["$owner"]);
					if (pindex !=-1){
						for(var i=this._popupStack.length-1;i > pindex;i--){
							var popup=this._popupStack.pop();
							this.closePopup(popup);
							this._justClosedPopups.push(popup);
						}
						return;
					}
				}
				mc=mc.parent;
			};
			var cnt=this._popupStack.length;
			for(i=cnt-1;i >=0;i--){
				popup=this._popupStack[i];
				this.closePopup(popup);
				this._justClosedPopups.push(popup);
			}
			this._popupStack.length=0;
		}
	}

	__proto.__stageMouseDown=function(evt){
		var mc=evt.target;
		while (mc !=this.displayObject.stage && mc !=null){
			if (mc["$owner"]){
				var gg=mc["$owner"];
				if (gg.touchable && gg.focusable){
					this.setFocus(gg);
					break ;
				}
			}
			mc=mc.parent;
		}
		if (this._tooltipWin !=null)
			this.hideTooltips();
		this.checkPopups(evt.target);
	}

	__proto.__stageMouseUp=function(){
		this._checkPopups=false;
	}

	__proto.__winResize=function(){
		this.setSize(Laya.stage.width,Laya.stage.height);
	}

	__getset(0,__proto,'volumeScale',function(){
		return SoundManager.soundVolume;
		},function(value){
		SoundManager.soundVolume=value;
	});

	__getset(0,__proto,'modalLayer',function(){
		return this._modalLayer;
	});

	__getset(0,__proto,'hasModalWindow',function(){
		return this._modalLayer.parent !=null;
	});

	__getset(0,__proto,'focus',function(){
		if (this._focusedObject && !this._focusedObject.onStage)
			this._focusedObject=null;
		return this._focusedObject;
		},function(value){
		if (value && (!value.focusable || !value.onStage))
			throw "invalid focus target";
		this.setFocus(value);
	});

	__getset(0,__proto,'hasAnyPopup',function(){
		return this._popupStack.length !=0;
	});

	__getset(0,__proto,'modalWaiting',function(){
		return this._modalWaitPane && this._modalWaitPane.inContainer;
	});

	__getset(1,GRoot,'inst',function(){
		if(fairygui.GRoot._inst==null)
			new GRoot();
		return fairygui.GRoot._inst;
	},fairygui.GComponent._$SET_inst);

	GRoot._inst=null;
	return GRoot;
})(GComponent)


/**
*@private
*/
//class laya.html.dom.HTMLElement extends laya.display.Sprite
var HTMLElement=(function(_super){
	function HTMLElement(){
		this.URI=null;
		this._href=null;
		HTMLElement.__super.call(this);
		this._text=HTMLElement._EMPTYTEXT;
		this.setStyle(new CSSStyle(this));
		this._getCSSStyle().valign="middle";
		this.mouseEnabled=true;
	}

	__class(HTMLElement,'laya.html.dom.HTMLElement',_super);
	var __proto=HTMLElement.prototype;
	/**
	*@private
	*/
	__proto.layaoutCallNative=function(){
		var n=0;
		if (this._childs &&(n=this._childs.length)> 0){
			for (var i=0;i < n;i++){
				this._childs[i].layaoutCallNative && this._childs[i].layaoutCallNative();
			}
		};
		var word=this._getWords();
		word ? laya.html.dom.HTMLElement.fillWords(this,word,0,0,this.style.font,this.style.color,this.style.underLine):this.graphics.clear();
	}

	__proto.appendChild=function(c){
		return this.addChild(c);
	}

	/**
	*rtl模式的getWords函數
	*/
	__proto._getWords2=function(){
		var txt=this._text.text;
		if (!txt || txt.length===0)
			return null;
		var i=0,n=0;
		var realWords;
		var drawWords;
		if (!this._text.drawWords){
			realWords=txt.split(" ");
			n=realWords.length-1;
			drawWords=[];
			for (i=0;i < n;i++){
				drawWords.push(realWords[i]," ")
			}
			if(n>=0)
				drawWords.push(realWords[n]);
			this._text.drawWords=drawWords;
			}else{
			drawWords=this._text.drawWords;
		};
		var words=this._text.words;
		if (words && words.length===drawWords.length)
			return words;
		words===null && (this._text.words=words=[]);
		words.length=drawWords.length;
		var size;
		var style=this.style;
		var fontStr=style.font;
		for (i=0,n=drawWords.length;i < n;i++){
			size=Utils.measureText(drawWords[i],fontStr);
			var tHTMLChar=words[i]=new HTMLChar(drawWords[i],size.width,size.height || style.fontSize,style);
			if (tHTMLChar.char.length > 1){
				tHTMLChar.charNum=tHTMLChar.char;
			}
			if (this.href){
				var tSprite=new Sprite();
				this.addChild(tSprite);
				tHTMLChar.setSprite(tSprite);
			}
		}
		return words;
	}

	__proto._getWords=function(){
		if (!Text.CharacterCache)return this._getWords2();
		var txt=this._text.text;
		if (!txt || txt.length===0)
			return null;
		var words=this._text.words;
		if (words && words.length===txt.length)
			return words;
		words===null && (this._text.words=words=[]);
		words.length=txt.length;
		var size;
		var style=this.style;
		var fontStr=style.font;
		var startX=0;
		for (var i=0,n=txt.length;i < n;i++){
			size=Utils.measureText(txt.charAt(i),fontStr);
			var tHTMLChar=words[i]=new HTMLChar(txt.charAt(i),size.width,size.height||style.fontSize,style);
			if (this.href){
				var tSprite=new Sprite();
				this.addChild(tSprite);
				tHTMLChar.setSprite(tSprite);
			}
		}
		return words;
	}

	__proto.showLinkSprite=function(){
		var words=this._text.words;
		if (words){
			var tLinkSpriteList=[];
			var tSprite;
			var tHtmlChar;
			for (var i=0;i < words.length;i++){
				tHtmlChar=words[i];
				tSprite=new Sprite();
				tSprite.graphics.drawRect(0,0,tHtmlChar.width,tHtmlChar.height,"#ff0000");
				tSprite.width=tHtmlChar.width;
				tSprite.height=tHtmlChar.height;
				this.addChild(tSprite);
				tLinkSpriteList.push(tSprite);
			}
		}
	}

	__proto._layoutLater=function(){
		var style=this.style;
		if ((style._type & 0x200))return;
		if (style.widthed(this)&& (this._childs.length>0 || this._getWords()!=null)&& style.block){
			Layout.later(this);
			style._type |=0x200;
		}
		else{
			this.parent && (this.parent)._layoutLater();
		}
	}

	__proto._setAttributes=function(name,value){
		switch (name){
			case 'style':
				this.style.cssText(value);
				return;
			case 'class':
				this.className=value;
				return;
			}
		_super.prototype._setAttributes.call(this,name,value);
	}

	__proto.updateHref=function(){
		if (this._href !=null){
			var words=this._getWords();
			if (words){
				var tHTMLChar;
				var tSprite;
				for (var i=0;i < words.length;i++){
					tHTMLChar=words[i];
					tSprite=tHTMLChar.getSprite();
					if (tSprite){
						tSprite.size(tHTMLChar.width,tHTMLChar.height);
						tSprite.on("click",this,this.onLinkHandler);
					}
				}
			}
		}
	}

	__proto.onLinkHandler=function(e){
		switch(e.type){
			case "click":;
				var target=this;
				while (target){
					target.event("link",[this.href]);
					target=target.parent;
				}
				break ;
			}
	}

	__proto.formatURL=function(url){
		if (!this.URI)return url;
		return URL.formatURL(url,this.URI ? this.URI.path :null);
	}

	__getset(0,__proto,'className',null,function(value){
		this.style.attrs(HTMLDocument.document.styleSheets['.'+value]);
	});

	__getset(0,__proto,'onClick',null,function(value){
		var fn;
		Laya._runScript("fn=function(event){"+value+";}");
		this.on("click",this,fn);
	});

	__getset(0,__proto,'innerTEXT',function(){
		return this._text.text;
		},function(value){
		this.text=value;
	});

	__getset(0,__proto,'text',function(){
		return this._text.text;
		},function(value){
		if (this._text==HTMLElement._EMPTYTEXT){
			this._text={text:value,words:null};
		}
		else{
			this._text.text=value;
			this._text.words && (this._text.words.length=0);
		}
		Render.isConchApp && this.layaoutCallNative();
		this._renderType |=0x800;
		this.repaint();
		this.updateHref();
	});

	__getset(0,__proto,'style',function(){
		return this._style;
	});

	__getset(0,__proto,'color',null,function(value){
		this.style.color=value;
	});

	__getset(0,__proto,'href',function(){
		return this._href;
		},function(url){
		this._href=url;
		if (url !=null){
			this._getCSSStyle().underLine=1;
			this.updateHref();
		}
	});

	__getset(0,__proto,'parent',_super.prototype._$get_parent,function(value){
		if ((value instanceof laya.html.dom.HTMLElement )){
			var p=value;
			this.URI || (this.URI=p.URI);
			this.style.inherit(p.style);
		}
		Laya.superSet(Sprite,this,'parent',value);
	});

	__getset(0,__proto,'id',null,function(value){
		HTMLDocument.document.setElementById(value,this);
	});

	HTMLElement.fillWords=function(ele,words,x,y,font,color,underLine){
		ele.graphics.clear();
		for (var i=0,n=words.length;i < n;i++){
			var a=words[i];
			ele.graphics.fillText(a.char,a.x+x,a.y+y,font,color,'left',underLine);
		}
	}

	HTMLElement._EMPTYTEXT={text:null,words:null};
	return HTMLElement;
})(Sprite)


/**
*@private
*<code>FileBitmap</code> 是图片文件资源类。
*/
//class laya.resource.FileBitmap extends laya.resource.Bitmap
var FileBitmap=(function(_super){
	function FileBitmap(){
		/**@private 文件路径全名。*/
		this._src=null;
		/**@private onload触发函数*/
		this._onload=null;
		/**@private onerror触发函数*/
		this._onerror=null;
		FileBitmap.__super.call(this);
	}

	__class(FileBitmap,'laya.resource.FileBitmap',_super);
	var __proto=FileBitmap.prototype;
	/**
	*载入完成处理函数。
	*/
	__getset(0,__proto,'onload',null,function(value){
	});

	/**
	*错误处理函数。
	*/
	__getset(0,__proto,'onerror',null,function(value){
	});

	/**
	*文件路径全名。
	*/
	__getset(0,__proto,'src',function(){
		return this._src;
		},function(value){
		this._src=value;
	});

	return FileBitmap;
})(Bitmap)


/**
*<p> <code>Text</code> 类用于创建显示对象以显示文本。</p>
*<p>
*注意：如果运行时系统找不到设定的字体，则用系统默认的字体渲染文字，从而导致显示异常。(通常电脑上显示正常，在一些移动端因缺少设置的字体而显示异常)。
*</p>
*@example
*package
*{
	*import laya.display.Text;
	*public class Text_Example
	*{
		*public function Text_Example()
		*{
			*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
			*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
			*onInit();
			*}
		*private function onInit():void
		*{
			*var text:Text=new Text();//创建一个 Text 类的实例对象 text 。
			*text.text="这个是一个 Text 文本示例。";
			*text.color="#008fff";//设置 text 的文本颜色。
			*text.font="Arial";//设置 text 的文本字体。
			*text.bold=true;//设置 text 的文本显示为粗体。
			*text.fontSize=30;//设置 text 的字体大小。
			*text.wordWrap=true;//设置 text 的文本自动换行。
			*text.x=100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
			*text.y=100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
			*text.width=300;//设置 text 的宽度。
			*text.height=200;//设置 text 的高度。
			*text.italic=true;//设置 text 的文本显示为斜体。
			*text.borderColor="#fff000";//设置 text 的文本边框颜色。
			*Laya.stage.addChild(text);//将 text 添加到显示列表。
			*}
		*}
	*}
*@example
*Text_Example();
*function Text_Example()
*{
	*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
	*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
	*onInit();
	*}
*function onInit()
*{
	*var text=new laya.display.Text();//创建一个 Text 类的实例对象 text 。
	*text.text="这个是一个 Text 文本示例。";
	*text.color="#008fff";//设置 text 的文本颜色。
	*text.font="Arial";//设置 text 的文本字体。
	*text.bold=true;//设置 text 的文本显示为粗体。
	*text.fontSize=30;//设置 text 的字体大小。
	*text.wordWrap=true;//设置 text 的文本自动换行。
	*text.x=100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
	*text.y=100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
	*text.width=300;//设置 text 的宽度。
	*text.height=200;//设置 text 的高度。
	*text.italic=true;//设置 text 的文本显示为斜体。
	*text.borderColor="#fff000";//设置 text 的文本边框颜色。
	*Laya.stage.addChild(text);//将 text 添加到显示列表。
	*}
*@example
*class Text_Example {
	*constructor(){
		*Laya.init(640,800);//设置游戏画布宽高、渲染模式。
		*Laya.stage.bgColor="#efefef";//设置画布的背景颜色。
		*this.onInit();
		*}
	*private onInit():void {
		*var text:laya.display.Text=new laya.display.Text();//创建一个 Text 类的实例对象 text 。
		*text.text="这个是一个 Text 文本示例。";
		*text.color="#008fff";//设置 text 的文本颜色。
		*text.font="Arial";//设置 text 的文本字体。
		*text.bold=true;//设置 text 的文本显示为粗体。
		*text.fontSize=30;//设置 text 的字体大小。
		*text.wordWrap=true;//设置 text 的文本自动换行。
		*text.x=100;//设置 text 对象的属性 x 的值，用于控制 text 对象的显示位置。
		*text.y=100;//设置 text 对象的属性 y 的值，用于控制 text 对象的显示位置。
		*text.width=300;//设置 text 的宽度。
		*text.height=200;//设置 text 的高度。
		*text.italic=true;//设置 text 的文本显示为斜体。
		*text.borderColor="#fff000";//设置 text 的文本边框颜色。
		*Laya.stage.addChild(text);//将 text 添加到显示列表。
		*}
	*}
*/
//class laya.display.Text extends laya.display.Sprite
var Text=(function(_super){
	function Text(){
		/**@private */
		this._clipPoint=null;
		/**当前使用的位置字体。*/
		this._currBitmapFont=null;
		/**@private 表示文本内容字符串。*/
		this._text=null;
		/**@private 表示文本内容是否发生改变。*/
		this._isChanged=false;
		/**@private 表示文本的宽度，以像素为单位。*/
		this._textWidth=0;
		/**@private 表示文本的高度，以像素为单位。*/
		this._textHeight=0;
		/**@private 存储文字行数信息。*/
		this._lines=[];
		/**@private 保存每行宽度*/
		this._lineWidths=[];
		/**@private 文本的内容位置 X 轴信息。*/
		this._startX=NaN;
		/**@private 文本的内容位置X轴信息。 */
		this._startY=NaN;
		/**@private 当前可视行索引。*/
		this._lastVisibleLineIndex=-1;
		/**@private 当前可视行索引。*/
		this._words=null;
		/**@private */
		this._charSize={};
		/**
		*是否显示下划线。
		*/
		this.underline=false;
		/**
		*下划线的颜色，为null则使用字体颜色。
		*/
		this._underlineColor=null;
		Text.__super.call(this);
		this.overflow=Text.VISIBLE;
		this._style=new CSSStyle(this);
		(this._style).wordWrap=false;
	}

	__class(Text,'laya.display.Text',_super);
	var __proto=Text.prototype;
	/**@inheritDoc */
	__proto.destroy=function(destroyChild){
		(destroyChild===void 0)&& (destroyChild=true);
		_super.prototype.destroy.call(this,destroyChild);
		this._lines=null;
		if (this._words){
			this._words.length=0;
			this._words=null;
		}
	}

	/**
	*@private
	*@inheritDoc
	*/
	__proto._getBoundPointsM=function(ifRotate){
		(ifRotate===void 0)&& (ifRotate=false);
		var rec=Rectangle.TEMP;
		rec.setTo(0,0,this.width,this.height);
		return rec._getBoundPoints();
	}

	/**
	*@inheritDoc
	*/
	__proto.getGraphicBounds=function(realSize){
		(realSize===void 0)&& (realSize=false);
		var rec=Rectangle.TEMP;
		rec.setTo(0,0,this.width,this.height);
		return rec;
	}

	/**
	*@private
	*@inheritDoc
	*/
	__proto._getCSSStyle=function(){
		return this._style;
	}

	/**
	*<p>根据指定的文本，从语言包中取当前语言的文本内容。并对此文本中的{i}文本进行替换。</p>
	*<p>设置Text.langPacks语言包后，即可使用lang获取里面的语言</p>
	*<p>例如：
	*<li>（1）text 的值为“我的名字”，先取到这个文本对应的当前语言版本里的值“My name”，将“My name”设置为当前文本的内容。</li>
	*<li>（2）text 的值为“恭喜你赢得{0}个钻石，{1}经验。”，arg1 的值为100，arg2 的值为200。
	*则先取到这个文本对应的当前语言版本里的值“Congratulations on your winning {0}diamonds,{1}experience.”，
	*然后将文本里的{0}、{1}，依据括号里的数字从0开始替换为 arg1、arg2 的值。
	*将替换处理后的文本“Congratulations on your winning 100 diamonds,200 experience.”设置为当前文本的内容。
	*</li>
	*</p>
	*@param text 文本内容。
	*@param ...args 文本替换参数。
	*/
	__proto.lang=function(text,arg1,arg2,arg3,arg4,arg5,arg6,arg7,arg8,arg9,arg10){
		text=Text.langPacks && Text.langPacks[text] ? Text.langPacks[text] :text;
		if (arguments.length < 2){
			this._text=text;
			}else {
			for (var i=0,n=arguments.length;i < n;i++){
				text=text.replace("{"+i+"}",arguments[i+1]);
			}
			this._text=text;
		}
	}

	/**
	*@private
	*/
	__proto._isPassWordMode=function(){
		var style=this._style;
		var password=style.password;
		if (("prompt" in this)&& this['prompt']==this._text)
			password=false;
		return password;
	}

	/**
	*@private
	*/
	__proto._getPassWordTxt=function(txt){
		var len=txt.length;
		var word;
		word="";
		for (var j=len;j > 0;j--){
			word+="●";
		}
		return word;
	}

	/**
	*渲染文字。
	*@param begin 开始渲染的行索引。
	*@param visibleLineCount 渲染的行数。
	*/
	__proto.renderText=function(begin,visibleLineCount){
		var graphics=this.graphics;
		graphics.clear(true);
		var ctxFont=(this.italic ? "italic " :"")+(this.bold ? "bold " :"")+this.fontSize+"px "+(Browser.onIPhone ? (laya.display.Text._fontFamilyMap[this.font] || this.font):this.font);
		Browser.context.font=ctxFont;
		var padding=this.padding;
		var startX=padding[3];
		var textAlgin="left";
		var lines=this._lines;
		var lineHeight=this.leading+this._charSize.height;
		var tCurrBitmapFont=this._currBitmapFont;
		if (tCurrBitmapFont){
			lineHeight=this.leading+tCurrBitmapFont.getMaxHeight();
		};
		var startY=padding[0];
		if ((!tCurrBitmapFont)&& this._width > 0 && this._textWidth <=this._width){
			if (this.align=="right"){
				textAlgin="right";
				startX=this._width-padding[1];
				}else if (this.align=="center"){
				textAlgin="center";
				startX=this._width *0.5+padding[3]-padding[1];
			}
		}
		if (this._height > 0){
			var tempVAlign=(this._textHeight > this._height)? "top" :this.valign;
			if (tempVAlign==="middle")
				startY=(this._height-visibleLineCount *lineHeight)*0.5+padding[0]-padding[2];
			else if (tempVAlign==="bottom")
			startY=this._height-visibleLineCount *lineHeight-padding[2];
		};
		var style=this._style;
		if (tCurrBitmapFont && tCurrBitmapFont.autoScaleSize){
			var bitmapScale=tCurrBitmapFont.fontSize / this.fontSize;
		}
		if (this._clipPoint){
			graphics.save();
			if (tCurrBitmapFont && tCurrBitmapFont.autoScaleSize){
				var tClipWidth=0;
				var tClipHeight=0;
				this._width ? tClipWidth=(this._width-padding[3]-padding[1]):tClipWidth=this._textWidth;
				this._height ? tClipHeight=(this._height-padding[0]-padding[2]):tClipHeight=this._textHeight;
				tClipWidth *=bitmapScale;
				tClipHeight *=bitmapScale;
				graphics.clipRect(padding[3],padding[0],tClipWidth,tClipHeight);
				}else {
				graphics.clipRect(padding[3],padding[0],this._width ? (this._width-padding[3]-padding[1]):this._textWidth,this._height ? (this._height-padding[0]-padding[2]):this._textHeight);
			}
		};
		var password=style.password;
		if (("prompt" in this)&& this['prompt']==this._text)
			password=false;
		var x=0,y=0;
		var end=Math.min(this._lines.length,visibleLineCount+begin)|| 1;
		for (var i=begin;i < end;i++){
			var word=lines[i];
			var _word;
			if (password){
				var len=word.length;
				word="";
				for (var j=len;j > 0;j--){
					word+="●";
				}
			}
			if (word===undefined)word="";
			x=startX-(this._clipPoint ? this._clipPoint.x :0);
			y=startY+lineHeight *i-(this._clipPoint ? this._clipPoint.y :0);
			this.underline && this.drawUnderline(textAlgin,x,y,i);
			if (tCurrBitmapFont){
				var tWidth=this.width;
				if (tCurrBitmapFont.autoScaleSize){
					tWidth=this.width *bitmapScale;
				}
				tCurrBitmapFont.drawText(word,this,x,y,this.align,tWidth);
				}else {
				if (Render.isWebGL){
					this._words || (this._words=[]);
					_word=this._words.length > (i-begin)? this._words[i-begin] :new WordText();
					_word.setText(word);
					}else {
					_word=word;
				}
				style.stroke ? graphics.fillBorderText(_word,x,y,ctxFont,this.color,style.strokeColor,style.stroke,textAlgin):graphics.fillText(_word,x,y,ctxFont,this.color,textAlgin);
			}
		}
		if (tCurrBitmapFont && tCurrBitmapFont.autoScaleSize){
			var tScale=1 / bitmapScale;
			this.scale(tScale,tScale);
		}
		if (this._clipPoint)
			graphics.restore();
		this._startX=startX;
		this._startY=startY;
	}

	/**
	*绘制下划线
	*@param x 本行坐标
	*@param y 本行坐标
	*@param lineIndex 本行索引
	*/
	__proto.drawUnderline=function(align,x,y,lineIndex){
		var lineWidth=this._lineWidths[lineIndex];
		switch (align){
			case 'center':
				x-=lineWidth / 2;
				break ;
			case 'right':
				x-=lineWidth;
				break ;
			case 'left':
			default :
				break ;
			}
		y+=this._charSize.height;
		this._graphics.drawLine(x,y,x+lineWidth,y,this.underlineColor || this.color,1);
	}

	/**
	*<p>排版文本。</p>
	*<p>进行宽高计算，渲染、重绘文本。</p>
	*/
	__proto.typeset=function(){
		this._isChanged=false;
		if (!this._text){
			this._clipPoint=null;
			this._textWidth=this._textHeight=0;
			this.graphics.clear(true);
			return;
		}
		Browser.context.font=this._getCSSStyle().font;
		this._lines.length=0;
		this._lineWidths.length=0;
		if (this._isPassWordMode()){
			this.parseLines(this._getPassWordTxt(this._text));
		}else
		this.parseLines(this._text);
		this.evalTextSize();
		if (this.checkEnabledViewportOrNot())
			this._clipPoint || (this._clipPoint=new Point(0,0));
		else
		this._clipPoint=null;
		var lineCount=this._lines.length;
		if (this.overflow !=Text.VISIBLE){
			var func=this.overflow==Text.HIDDEN ? Math.floor :Math.ceil;
			lineCount=Math.min(lineCount,func((this.height-this.padding[0]-this.padding[2])/ (this.leading+this._charSize.height)));
		};
		var startLine=this.scrollY / (this._charSize.height+this.leading)| 0;
		this.renderText(startLine,lineCount);
		this.repaint();
	}

	__proto.evalTextSize=function(){
		var nw=NaN,nh=NaN;
		nw=Math.max.apply(this,this._lineWidths);
		if (this._currBitmapFont)
			nh=this._lines.length *(this._currBitmapFont.getMaxHeight()+this.leading)+this.padding[0]+this.padding[2];
		else
		nh=this._lines.length *(this._charSize.height+this.leading)+this.padding[0]+this.padding[2];
		if (nw !=this._textWidth || nh !=this._textHeight){
			this._textWidth=nw;
			this._textHeight=nh;
			if (!this._width || !this._height)
				this.conchModel && this.conchModel.size(this._width || this._textWidth,this._height || this._textHeight);
		}
	}

	__proto.checkEnabledViewportOrNot=function(){
		return this.overflow==Text.SCROLL && ((this._width > 0 && this._textWidth > this._width)|| (this._height > 0 && this._textHeight > this._height));
	}

	/**
	*<p>快速更改显示文本。不进行排版计算，效率较高。</p>
	*<p>如果只更改文字内容，不更改文字样式，建议使用此接口，能提高效率。</p>
	*@param text 文本内容。
	*/
	__proto.changeText=function(text){
		if (this._text!==text){
			this.lang(text+"");
			if (this._graphics && this._graphics.replaceText(this._text)){
				}else {
				this.typeset();
			}
		}
	}

	/**
	*@private
	*分析文本换行。
	*/
	__proto.parseLines=function(text){
		var needWordWrapOrTruncate=this.wordWrap || this.overflow==Text.HIDDEN;
		if (needWordWrapOrTruncate){
			var wordWrapWidth=this.getWordWrapWidth();
		}
		if (this._currBitmapFont){
			this._charSize.width=this._currBitmapFont.getMaxWidth();
			this._charSize.height=this._currBitmapFont.getMaxHeight();
			}else {
			var measureResult=Browser.context.measureText(Text._testWord);
			if (Render.isConchApp && measureResult.width===0 && measureResult.height===0){
				measureResult=Browser.context.measureText('W');
			}
			this._charSize.width=measureResult.width;
			this._charSize.height=(measureResult.height || this.fontSize);
		};
		var lines=text.replace(/\r\n/g,"\n").split("\n");
		for (var i=0,n=lines.length;i < n;i++){
			var line=lines[i];
			if (needWordWrapOrTruncate)
				this.parseLine(line,wordWrapWidth);
			else {
				this._lineWidths.push(this.getTextWidth(line));
				this._lines.push(line);
			}
		}
	}

	/**
	*@private
	*解析行文本。
	*@param line 某行的文本。
	*@param wordWrapWidth 文本的显示宽度。
	*/
	__proto.parseLine=function(line,wordWrapWidth){
		var ctx=Browser.context;
		var lines=this._lines;
		var maybeIndex=0;
		var execResult;
		var charsWidth=NaN;
		var wordWidth=NaN;
		var startIndex=0;
		charsWidth=this.getTextWidth(line);
		if (charsWidth <=wordWrapWidth){
			lines.push(line);
			this._lineWidths.push(charsWidth);
			return;
		}
		charsWidth=this._charSize.width;
		maybeIndex=Math.floor(wordWrapWidth / charsWidth);
		(maybeIndex==0)&& (maybeIndex=1);
		charsWidth=this.getTextWidth(line.substring(0,maybeIndex));
		wordWidth=charsWidth;
		for (var j=maybeIndex,m=line.length;j < m;j++){
			charsWidth=this.getTextWidth(line.charAt(j));
			wordWidth+=charsWidth;
			if (wordWidth > wordWrapWidth){
				if (this.wordWrap){
					var newLine=line.substring(startIndex,j);
					if (newLine.charCodeAt(newLine.length-1)< 255){
						execResult=/(?:\w|-)+$/.exec(newLine);
						if (execResult){
							j=execResult.index+startIndex;
							if (execResult.index==0)
								j+=newLine.length;
							else
							newLine=line.substring(startIndex,j);
						}
					}else
					if (Text.RightToLeft){
						execResult=/([\u0600-\u06FF])+$/.exec(newLine);
						if(execResult){
							j=execResult.index+startIndex;
							if (execResult.index==0)
								j+=newLine.length;
							else
							newLine=line.substring(startIndex,j);
						}
					}
					lines.push(newLine);
					this._lineWidths.push(wordWidth-charsWidth);
					startIndex=j;
					if (j+maybeIndex < m){
						j+=maybeIndex;
						charsWidth=this.getTextWidth(line.substring(startIndex,j));
						wordWidth=charsWidth;
						j--;
						}else {
						lines.push(line.substring(startIndex,m));
						this._lineWidths.push(this.getTextWidth(lines[lines.length-1]));
						startIndex=-1;
						break ;
					}
					}else if (this.overflow==Text.HIDDEN){
					lines.push(line.substring(0,j));
					this._lineWidths.push(this.getTextWidth(lines[lines.length-1]));
					return;
				}
			}
		}
		if (this.wordWrap && startIndex !=-1){
			lines.push(line.substring(startIndex,m));
			this._lineWidths.push(this.getTextWidth(lines[lines.length-1]));
		}
	}

	__proto.getTextWidth=function(text){
		if (this._currBitmapFont)
			return this._currBitmapFont.getTextWidth(text);
		else
		return Browser.context.measureText(text).width;
	}

	/**
	*获取换行所需的宽度。
	*/
	__proto.getWordWrapWidth=function(){
		var p=this.padding;
		var w=NaN;
		if (this._currBitmapFont && this._currBitmapFont.autoScaleSize)
			w=this._width *(this._currBitmapFont.fontSize / this.fontSize);
		else
		w=this._width;
		if (w <=0){
			w=this.wordWrap ? 100 :Browser.width;
		}
		w <=0 && (w=100);
		return w-p[3]-p[1];
	}

	/**
	*返回字符在本类实例的父坐标系下的坐标。
	*@param charIndex 索引位置。
	*@param out （可选）输出的Point引用。
	*@return Point 字符在本类实例的父坐标系下的坐标。如果out参数不为空，则将结果赋值给指定的Point对象，否则创建一个新的Point对象返回。建议使用Point.TEMP作为out参数，可以省去Point对象创建和垃圾回收的开销，尤其是在需要频繁执行的逻辑中，比如帧循环和MOUSE_MOVE事件回调函数里面。
	*/
	__proto.getCharPoint=function(charIndex,out){
		this._isChanged && Laya.timer.runCallLater(this,this.typeset);
		var len=0,lines=this._lines,startIndex=0;
		for (var i=0,n=lines.length;i < n;i++){
			len+=lines[i].length;
			if (charIndex < len){
				var line=i;
				break ;
			}
			startIndex=len;
		};
		var ctxFont=(this.italic ? "italic " :"")+(this.bold ? "bold " :"")+this.fontSize+"px "+this.font;
		Browser.context.font=ctxFont;
		var width=this.getTextWidth(this._text.substring(startIndex,charIndex));
		var point=out || new Point();
		return point.setTo(this._startX+width-(this._clipPoint ? this._clipPoint.x :0),this._startY+line *(this._charSize.height+this.leading)-(this._clipPoint ? this._clipPoint.y :0));
	}

	__getset(0,__proto,'lines',function(){
		if (this._isChanged)
			this.typeset();
		return this._lines;
	});

	/**
	*设置纵向滚动量（px)。即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。
	*/
	/**
	*获取纵向滚动量。
	*/
	__getset(0,__proto,'scrollY',function(){
		if (!this._clipPoint)
			return 0;
		return this._clipPoint.y;
		},function(value){
		if (this.overflow !=Text.SCROLL || (this.textHeight < this._height || !this._clipPoint))
			return;
		value=value < this.padding[0] ? this.padding[0] :value;
		var maxScrollY=this._textHeight-this._height;
		value=value > maxScrollY ? maxScrollY :value;
		var startLine=value / (this._charSize.height+this.leading)| 0;
		this._lastVisibleLineIndex=startLine;
		var visibleLineCount=(this._height / (this._charSize.height+this.leading)| 0)+1;
		this._clipPoint.y=value;
		this.renderText(startLine,visibleLineCount);
	});

	/**
	*<p>设置横向滚动量。</p>
	*<p>即使设置超出滚动范围的值，也会被自动限制在可能的最大值处。</p>
	*/
	/**
	*获取横向滚动量。
	*/
	__getset(0,__proto,'scrollX',function(){
		if (!this._clipPoint)
			return 0;
		return this._clipPoint.x;
		},function(value){
		if (this.overflow !=Text.SCROLL || (this.textWidth < this._width || !this._clipPoint))
			return;
		value=value < this.padding[3] ? this.padding[3] :value;
		var maxScrollX=this._textWidth-this._width;
		value=value > maxScrollX ? maxScrollX :value;
		var visibleLineCount=this._height / (this._charSize.height+this.leading)| 0+1;
		this._clipPoint.x=value;
		this.renderText(this._lastVisibleLineIndex,visibleLineCount);
	});

	/**
	*<p>描边宽度（以像素为单位）。</p>
	*<p>默认值0，表示不描边。</p>
	*/
	__getset(0,__proto,'stroke',function(){
		return this._getCSSStyle().stroke;
		},function(value){
		this._getCSSStyle().stroke=value;
		this.isChanged=true;
	});

	/**
	*<p>描边颜色，以字符串表示。</p>
	*<p>默认值为 "#000000"（黑色）;</p>
	*/
	__getset(0,__proto,'strokeColor',function(){
		return this._getCSSStyle().strokeColor;
		},function(value){
		this._getCSSStyle().strokeColor=value;
		this.isChanged=true;
	});

	/**
	*<p>指定文本是否为粗体字。</p>
	*<p>默认值为 false，这意味着不使用粗体字。如果值为 true，则文本为粗体字。</p>
	*/
	__getset(0,__proto,'bold',function(){
		return this._getCSSStyle().bold;
		},function(value){
		this._getCSSStyle().bold=value;
		this.isChanged=true;
	});

	/**
	*<p>边距信息。</p>
	*<p>数据格式：[上边距，右边距，下边距，左边距]（边距以像素为单位）。</p>
	*/
	__getset(0,__proto,'padding',function(){
		return this._getCSSStyle().padding;
		},function(value){
		this._getCSSStyle().padding=value;
		this.isChanged=true;
	});

	/**
	*@inheritDoc
	*/
	__getset(0,__proto,'height',function(){
		if (this._height)return this._height;
		return this.textHeight;
		},function(value){
		if (value !=this._height){
			Laya.superSet(Sprite,this,'height',value);
			this.isChanged=true;
		}
	});

	/**
	*<p>表示文本是否自动换行，默认为false。</p>
	*<p>若值为true，则自动换行；否则不自动换行。</p>
	*/
	__getset(0,__proto,'wordWrap',function(){
		return this._getCSSStyle().wordWrap;
		},function(value){
		this._getCSSStyle().wordWrap=value;
		this.isChanged=true;
	});

	/**
	*获取横向可滚动最大值。
	*/
	__getset(0,__proto,'maxScrollX',function(){
		return (this.textWidth < this._width)? 0 :this._textWidth-this._width;
	});

	/**
	*一个布尔值，表示文本的属性是否有改变。若为true表示有改变。
	*/
	__getset(0,__proto,'isChanged',null,function(value){
		if (this._isChanged!==value){
			this._isChanged=value;
			value && Laya.timer.callLater(this,this.typeset);
		}
	});

	/**
	*文本边框背景颜色，以字符串表示。
	*/
	__getset(0,__proto,'borderColor',function(){
		return this._getCSSStyle().borderColor;
		},function(value){
		this._getCSSStyle().borderColor=value;
		this.isChanged=true;
	});

	/**当前文本的内容字符串。*/
	__getset(0,__proto,'text',function(){
		return this._text || "";
		},function(value){
		if (this._text!==value){
			this.lang(value+"");
			this.isChanged=true;
			this.event("change");
		}
	});

	/**
	*<p>表示文本的垂直显示方式。</p>
	*<p><b>取值：</b>
	*<li>"top"： 居顶部对齐显示。</li>
	*<li>"middle"： 居中对齐显示。</li>
	*<li>"bottom"： 居底部对齐显示。</li>
	*</p>
	*/
	__getset(0,__proto,'valign',function(){
		return this._getCSSStyle().valign;
		},function(value){
		this._getCSSStyle().valign=value;
		this.isChanged=true;
	});

	__getset(0,__proto,'underlineColor',function(){
		return this._underlineColor;
		},function(value){
		this._underlineColor=value;
		this._isChanged=true;
		this.typeset();
	});

	/**
	*<p>表示使用此文本格式的文本是否为斜体。</p>
	*<p>默认值为 false，这意味着不使用斜体。如果值为 true，则文本为斜体。</p>
	*/
	__getset(0,__proto,'italic',function(){
		return this._getCSSStyle().italic;
		},function(value){
		this._getCSSStyle().italic=value;
		this.isChanged=true;
	});

	/**
	*文本背景颜色，以字符串表示。
	*/
	__getset(0,__proto,'bgColor',function(){
		return this._getCSSStyle().backgroundColor;
		},function(value){
		this._getCSSStyle().backgroundColor=value;
		this.isChanged=true;
	});

	/**
	*<p>表示文本的颜色值。可以通过 <code>Text.defaultColor</code> 设置默认颜色。</p>
	*<p>默认值为黑色。</p>
	*/
	__getset(0,__proto,'color',function(){
		return this._getCSSStyle().color;
		},function(value){
		if (this._getCSSStyle().color !=value){
			this._getCSSStyle().color=value;
			if (!this._isChanged && this._graphics){
				this._graphics.replaceTextColor(this.color)
				}else {
				this.isChanged=true;
			}
		}
	});

	/**
	*<p>表示文本的水平显示方式。</p>
	*<p><b>取值：</b>
	*<li>"left"： 居左对齐显示。</li>
	*<li>"center"： 居中对齐显示。</li>
	*<li>"right"： 居右对齐显示。</li>
	*</p>
	*/
	__getset(0,__proto,'align',function(){
		return this._getCSSStyle().align;
		},function(value){
		this._getCSSStyle().align=value;
		this.isChanged=true;
	});

	/**
	*<p>指定文本的字体大小（以像素为单位）。</p>
	*<p>默认为20像素，可以通过 <code>Text.defaultSize</code> 设置默认大小。</p>
	*/
	__getset(0,__proto,'fontSize',function(){
		return this._getCSSStyle().fontSize;
		},function(value){
		this._getCSSStyle().fontSize=value;
		this.isChanged=true;
	});

	/**
	*表示文本的高度，以像素为单位。
	*/
	__getset(0,__proto,'textHeight',function(){
		this._isChanged && Laya.timer.runCallLater(this,this.typeset);
		return this._textHeight;
	});

	/**
	*获取纵向可滚动最大值。
	*/
	__getset(0,__proto,'maxScrollY',function(){
		return (this.textHeight < this._height)? 0 :this._textHeight-this._height;
	});

	/**
	*垂直行间距（以像素为单位）。
	*/
	__getset(0,__proto,'leading',function(){
		return this._getCSSStyle().leading;
		},function(value){
		this._getCSSStyle().leading=value;
		this.isChanged=true;
	});

	/**
	*<p>文本的字体名称，以字符串形式表示。</p>
	*<p>默认值为："Arial"，可以通过Font.defaultFont设置默认字体。</p>
	*<p>如果运行时系统找不到设定的字体，则用系统默认的字体渲染文字，从而导致显示异常。(通常电脑上显示正常，在一些移动端因缺少设置的字体而显示异常)。</p>
	*@see laya.display.css.Font#defaultFamily
	*/
	__getset(0,__proto,'font',function(){
		return this._getCSSStyle().fontFamily;
		},function(value){
		if (this._currBitmapFont){
			this._currBitmapFont=null;
			this.scale(1,1);
		}
		if (Text._bitmapFonts && Text._bitmapFonts[value]){
			this._currBitmapFont=Text._bitmapFonts[value];
		}
		this._getCSSStyle().fontFamily=value;
		this.isChanged=true;
	});

	/**
	*表示文本的宽度，以像素为单位。
	*/
	__getset(0,__proto,'textWidth',function(){
		this._isChanged && Laya.timer.runCallLater(this,this.typeset);
		return this._textWidth;
	});

	/**
	*@inheritDoc
	*/
	__getset(0,__proto,'width',function(){
		if (this._width)
			return this._width;
		return this.textWidth+this.padding[1]+this.padding[3];
		},function(value){
		if (value !=this._width){
			Laya.superSet(Sprite,this,'width',value);
			this.isChanged=true;
		}
	});

	Text.registerBitmapFont=function(name,bitmapFont){
		Text._bitmapFonts || (Text._bitmapFonts={});
		Text._bitmapFonts[name]=bitmapFont;
	}

	Text.unregisterBitmapFont=function(name,destroy){
		(destroy===void 0)&& (destroy=true);
		if (Text._bitmapFonts && Text._bitmapFonts[name]){
			var tBitmapFont=Text._bitmapFonts[name];
			if (destroy){
				tBitmapFont.destroy();
			}
			delete Text._bitmapFonts[name];
		}
	}

	Text.setTextRightToLeft=function(){
		var style;
		style=Browser.canvas.source.style;
		style.display="none";
		style.position="absolute";
		style.direction="rtl";
		Render._mainCanvas.source.style.direction="rtl";
		laya.display.Text.RightToLeft=true;
		Browser.document.body.appendChild(Browser.canvas.source);
	}

	Text.supportFont=function(font){
		Browser.context.font="10px sans-serif";
		var defaultFontWidth=Browser.context.measureText("abcji").width;
		Browser.context.font="10px "+font;
		var customFontWidth=Browser.context.measureText("abcji").width;
		console.log(defaultFontWidth,customFontWidth);
		if (defaultFontWidth===customFontWidth)return false;
		else return true;
	}

	Text._testWord="游";
	Text.langPacks=null;
	Text.VISIBLE="visible";
	Text.SCROLL="scroll";
	Text.HIDDEN="hidden";
	Text.CharacterCache=true;
	Text.RightToLeft=false;
	Text._bitmapFonts=null;
	__static(Text,
	['_fontFamilyMap',function(){return this._fontFamilyMap={"报隶" :"报隶-简","黑体" :"黑体-简","楷体" :"楷体-简","兰亭黑" :"兰亭黑-简","隶变" :"隶变-简","凌慧体" :"凌慧体-简","翩翩体" :"翩翩体-简","苹方" :"苹方-简","手札体" :"手札体-简","宋体" :"宋体-简","娃娃体" :"娃娃体-简","魏碑" :"魏碑-简","行楷" :"行楷-简","雅痞" :"雅痞-简","圆体" :"圆体-简"};}
	]);
	return Text;
})(Sprite)


/**
*<p> <code>Stage</code> 是舞台类，显示列表的根节点，所有显示对象都在舞台上显示。通过 Laya.stage 单例访问。</p>
*<p>Stage提供几种适配模式，不同的适配模式会产生不同的画布大小，画布越大，渲染压力越大，所以要选择合适的适配方案。</p>
*<p>Stage提供不同的帧率模式，帧率越高，渲染压力越大，越费电，合理使用帧率甚至动态更改帧率有利于改进手机耗电。</p>
*/
//class laya.display.Stage extends laya.display.Sprite
var Stage=(function(_super){
	function Stage(){
		/**当前焦点对象，此对象会影响当前键盘事件的派发主体。*/
		this.focus=null;
		/**设计宽度（初始化时设置的宽度Laya.init(width,height)）*/
		this.designWidth=0;
		/**设计高度（初始化时设置的高度Laya.init(width,height)）*/
		this.designHeight=0;
		/**画布是否发生翻转。*/
		this.canvasRotation=false;
		/**画布的旋转角度。*/
		this.canvasDegree=0;
		/**
		*<p>设置是否渲染，设置为false，可以停止渲染，画面会停留到最后一次渲染上，减少cpu消耗，此设置不影响时钟。</p>
		*<p>比如非激活状态，可以设置renderingEnabled=false以节省消耗。</p>
		**/
		this.renderingEnabled=true;
		/**是否启用屏幕适配，可以适配后，在某个时候关闭屏幕适配，防止某些操作导致的屏幕以外改变*/
		this.screenAdaptationEnabled=true;
		/**@private */
		this._screenMode="none";
		/**@private */
		this._scaleMode="noscale";
		/**@private */
		this._alignV="top";
		/**@private */
		this._alignH="left";
		/**@private */
		this._bgColor="black";
		/**@private */
		this._mouseMoveTime=0;
		/**@private */
		this._renderCount=0;
		/**@private */
		this._frameStartTime=NaN;
		/**@private */
		this._isFocused=false;
		/**@private */
		this._isVisibility=false;
		/**@private 3D场景*/
		this._scenes=null;
		/**@private */
		this._frameRate="fast";
		Stage.__super.call(this);
		this.offset=new Point();
		this._canvasTransform=new Matrix();
		this._previousOrientation=Browser.window.orientation;
		var _$this=this;
		this.transform=Matrix.create();
		this._scenes=[];
		this.mouseEnabled=true;
		this.hitTestPrior=true;
		this.autoSize=false;
		this._displayedInStage=true;
		this._isFocused=true;
		this._isVisibility=true;
		var window=Browser.window;
		var _this=this;
		window.addEventListener("focus",function(){
			_$this._isFocused=true;
			_this.event("focus");
			_this.event("focuschange");
		});
		window.addEventListener("blur",function(){
			_$this._isFocused=false;
			_this.event("blur");
			_this.event("focuschange");
			if (_this._isInputting())Input["inputElement"].target.focus=false;
		});
		var hidden="hidden",state="visibilityState",visibilityChange="visibilitychange";
		var document=window.document;
		if (typeof document.hidden!=="undefined"){
			visibilityChange="visibilitychange";
			state="visibilityState";
			}else if (typeof document.mozHidden!=="undefined"){
			visibilityChange="mozvisibilitychange";
			state="mozVisibilityState";
			}else if (typeof document.msHidden!=="undefined"){
			visibilityChange="msvisibilitychange";
			state="msVisibilityState";
			}else if (typeof document.webkitHidden!=="undefined"){
			visibilityChange="webkitvisibilitychange";
			state="webkitVisibilityState";
		}
		window.document.addEventListener(visibilityChange,visibleChangeFun);
		function visibleChangeFun (){
			if (Browser.document[state]=="hidden"){
				_this._setStageVisible(false);
				}else {
				_this._setStageVisible(true);
			}
		}
		window.document.addEventListener("qbrowserVisibilityChange",qbroserVisibleChangeFun);
		function qbroserVisibleChangeFun (e){
			_this._setStageVisible(!e.hidden);
		}
		window.addEventListener("resize",function(){
			var orientation=Browser.window.orientation;
			if (orientation !=null && orientation !=_$this._previousOrientation && _this._isInputting()){
				Input["inputElement"].target.focus=false;
			}
			_$this._previousOrientation=orientation;
			if (_this._isInputting())return;
			_this._resetCanvas();
		});
		window.addEventListener("orientationchange",function(e){
			_this._resetCanvas();
		});
		this.on("mousemove",this,this._onmouseMove);
		if (Browser.onMobile)this.on("mousedown",this,this._onmouseMove);
	}

	__class(Stage,'laya.display.Stage',_super);
	var __proto=Stage.prototype;
	__proto._setStageVisible=function(value){
		if (this._isVisibility==value)return;
		this._isVisibility=value;
		if (!this._isVisibility)if (this._isInputting())Input["inputElement"].target.focus=false;
		this.event("visibilitychange");
	}

	/**
	*@private
	*在移动端输入时，输入法弹出期间不进行画布尺寸重置。
	*/
	__proto._isInputting=function(){
		return (Browser.onMobile && Input.isInputting);
	}

	/**@private */
	__proto._changeCanvasSize=function(){
		this.setScreenSize(Browser.clientWidth *Browser.pixelRatio,Browser.clientHeight *Browser.pixelRatio);
	}

	/**@private */
	__proto._resetCanvas=function(){
		if (!this.screenAdaptationEnabled)return;
		var canvas=Render._mainCanvas;
		var canvasStyle=canvas.source.style;
		canvas.size(1,1);
		Laya.timer.once(100,this,this._changeCanvasSize);
	}

	/**
	*设置屏幕大小，场景会根据屏幕大小进行适配。可以动态调用此方法，来更改游戏显示的大小。
	*@param screenWidth 屏幕宽度。
	*@param screenHeight 屏幕高度。
	*/
	__proto.setScreenSize=function(screenWidth,screenHeight){
		var rotation=false;
		if (this._screenMode!=="none"){
			var screenType=screenWidth / screenHeight < 1 ? "vertical" :"horizontal";
			rotation=screenType!==this._screenMode;
			if (rotation){
				var temp=screenHeight;
				screenHeight=screenWidth;
				screenWidth=temp;
			}
		}
		this.canvasRotation=rotation;
		var canvas=Render._mainCanvas;
		var canvasStyle=canvas.source.style;
		var mat=this._canvasTransform.identity();
		var scaleMode=this._scaleMode;
		var scaleX=screenWidth / this.designWidth;
		var scaleY=screenHeight / this.designHeight;
		var canvasWidth=this.designWidth;
		var canvasHeight=this.designHeight;
		var realWidth=screenWidth;
		var realHeight=screenHeight;
		var pixelRatio=Browser.pixelRatio;
		this._width=this.designWidth;
		this._height=this.designHeight;
		switch (scaleMode){
			case "noscale":
				scaleX=scaleY=1;
				realWidth=this.designWidth;
				realHeight=this.designHeight;
				break ;
			case "showall":
				scaleX=scaleY=Math.min(scaleX,scaleY);
				canvasWidth=realWidth=Math.round(this.designWidth *scaleX);
				canvasHeight=realHeight=Math.round(this.designHeight *scaleY);
				break ;
			case "noborder":
				scaleX=scaleY=Math.max(scaleX,scaleY);
				realWidth=Math.round(this.designWidth *scaleX);
				realHeight=Math.round(this.designHeight *scaleY);
				break ;
			case "full":
				scaleX=scaleY=1;
				this._width=canvasWidth=screenWidth;
				this._height=canvasHeight=screenHeight;
				break ;
			case "fixedwidth":
				scaleY=scaleX;
				this._height=canvasHeight=Math.round(screenHeight / scaleX);
				break ;
			case "fixedheight":
				scaleX=scaleY;
				this._width=canvasWidth=Math.round(screenWidth / scaleY);
				break ;
			case "fixedauto":
				if ((screenWidth / screenHeight)< (this.designWidth / this.designHeight)){
					scaleY=scaleX;
					this._height=canvasHeight=Math.round(screenHeight / scaleX);
					}else {
					scaleX=scaleY;
					this._width=canvasWidth=Math.round(screenWidth / scaleY);
				}
				break ;
			}
		if (this.conchModel)this.conchModel.size(this._width,this._height);
		scaleX *=this.scaleX;
		scaleY *=this.scaleY;
		if (scaleX===1 && scaleY===1){
			this.transform.identity();
			}else {
			this.transform.a=this._formatData(scaleX / (realWidth / canvasWidth));
			this.transform.d=this._formatData(scaleY / (realHeight / canvasHeight));
			this.conchModel && this.conchModel.scale(this.transform.a,this.transform.d);
		}
		canvas.size(canvasWidth,canvasHeight);
		RunDriver.changeWebGLSize(canvasWidth,canvasHeight);
		mat.scale(realWidth / canvasWidth / pixelRatio,realHeight / canvasHeight / pixelRatio);
		if (this._alignH==="left")this.offset.x=0;
		else if (this._alignH==="right")this.offset.x=(screenWidth-realWidth)/pixelRatio;
		else this.offset.x=(screenWidth-realWidth)*0.5 / pixelRatio;
		if (this._alignV==="top")this.offset.y=0;
		else if (this._alignV==="bottom")this.offset.y=(screenHeight-realHeight)/pixelRatio;
		else this.offset.y=(screenHeight-realHeight)*0.5 / pixelRatio;
		this.offset.x=Math.round(this.offset.x);
		this.offset.y=Math.round(this.offset.y);
		mat.translate(this.offset.x,this.offset.y);
		this.canvasDegree=0;
		if (rotation){
			if (this._screenMode==="horizontal"){
				mat.rotate(Math.PI / 2);
				mat.translate(screenHeight / pixelRatio,0);
				this.canvasDegree=90;
				}else {
				mat.rotate(-Math.PI / 2);
				mat.translate(0,screenWidth / pixelRatio);
				this.canvasDegree=-90;
			}
		}
		mat.a=this._formatData(mat.a);
		mat.d=this._formatData(mat.d);
		mat.tx=this._formatData(mat.tx);
		mat.ty=this._formatData(mat.ty);
		canvasStyle.transformOrigin=canvasStyle.webkitTransformOrigin=canvasStyle.msTransformOrigin=canvasStyle.mozTransformOrigin=canvasStyle.oTransformOrigin="0px 0px 0px";
		canvasStyle.transform=canvasStyle.webkitTransform=canvasStyle.msTransform=canvasStyle.mozTransform=canvasStyle.oTransform="matrix("+mat.toString()+")";
		mat.translate(parseInt(canvasStyle.left)|| 0,parseInt(canvasStyle.top)|| 0);
		this.visible=true;
		this._repaint=1;
		this.event("resize");
	}

	/**@private */
	__proto._formatData=function(value){
		if (Math.abs(value)< 0.000001)return 0;
		if (Math.abs(1-value)< 0.001)return value > 0 ? 1 :-1;
		return value;
	}

	/**@inheritDoc */
	__proto.getMousePoint=function(){
		return Point.TEMP.setTo(this.mouseX,this.mouseY);
	}

	/**@inheritDoc */
	__proto.repaint=function(){
		this._repaint=1;
	}

	/**@inheritDoc */
	__proto.parentRepaint=function(){}
	/**@private */
	__proto._loop=function(){
		this.render(Render.context,0,0);
		return true;
	}

	/**@private */
	__proto._onmouseMove=function(e){
		this._mouseMoveTime=Browser.now();
	}

	/**
	*<p>获得距当前帧开始后，过了多少时间，单位为毫秒。</p>
	*<p>可以用来判断函数内时间消耗，通过合理控制每帧函数处理消耗时长，避免一帧做事情太多，对复杂计算分帧处理，能有效降低帧率波动。</p>
	*/
	__proto.getTimeFromFrameStart=function(){
		return Browser.now()-this._frameStartTime;
	}

	/**@inheritDoc */
	__proto.render=function(context,x,y){
		if (this._frameRate==="sleep" && !Render.isConchApp){
			var now=Browser.now();
			if (now-this._frameStartTime >=1000)this._frameStartTime=now;
			else return;
		}
		this._renderCount++;
		Render.isFlash && this.repaint();
		if (!this._style.visible){
			if (this._renderCount % 5===0){
				Stat.loopCount++;
				MouseManager.instance.runEvent();
				Laya.timer._update();
			}
			return;
		}
		this._frameStartTime=Browser.now();
		var frameMode=this._frameRate==="mouse" ? (((this._frameStartTime-this._mouseMoveTime)< 2000)? "fast" :"slow"):this._frameRate;
		var isFastMode=(frameMode!=="slow");
		var isDoubleLoop=(this._renderCount % 2===0);
		Stat.renderSlow=!isFastMode;
		if (isFastMode || isDoubleLoop || Render.isConchApp){
			Stat.loopCount++;
			MouseManager.instance.runEvent();
			Laya.timer._update();
			RunDriver.update3DLoop();
			var scene;
			var i=0,n=0;
			if (Render.isConchNode){
				for (i=0,n=this._scenes.length;i < n;i++){
					scene=this._scenes[i];
					(scene)&& (scene._updateSceneConch());
				}
				}else {
				for (i=0,n=this._scenes.length;i < n;i++){
					scene=this._scenes[i];
					(scene)&& (scene._updateScene());
				}
			}
			if (Render.isConchNode){
				var customList=Sprite["CustomList"];
				for (i=0,n=customList.length;i < n;i++){
					var customItem=customList[i];
					customItem.customRender(customItem.customContext,0,0);
				}
				return;
			}
		}
		if (Render.isConchNode)return;
		if (this.renderingEnabled && (isFastMode || !isDoubleLoop || Render.isConchWebGL)){
			if (Render.isWebGL){
				context.clear();
				_super.prototype.render.call(this,context,x,y);
				Stat._show&& Stat._sp && Stat._sp.render(context,x,y);
				RunDriver.clear(this._bgColor);
				RunDriver.beginFlush();
				context.flush();
				RunDriver.endFinish();
				VectorGraphManager.instance && VectorGraphManager.getInstance().endDispose();
				}else {
				RunDriver.clear(this._bgColor);
				_super.prototype.render.call(this,context,x,y);
				Stat._show&& Stat._sp && Stat._sp.render(context,x,y);
			}
		}
	}

	/**@private */
	__proto._requestFullscreen=function(){
		var element=Browser.document.documentElement;
		if (element.requestFullscreen){
			element.requestFullscreen();
			}else if (element.mozRequestFullScreen){
			element.mozRequestFullScreen();
			}else if (element.webkitRequestFullscreen){
			element.webkitRequestFullscreen();
			}else if (element.msRequestFullscreen){
			element.msRequestFullscreen();
		}
	}

	/**@private */
	__proto._fullScreenChanged=function(){
		Laya.stage.event("fullscreenchange");
	}

	/**退出全屏模式*/
	__proto.exitFullscreen=function(){
		var document=Browser.document;
		if (document.exitFullscreen){
			document.exitFullscreen();
			}else if (document.mozCancelFullScreen){
			document.mozCancelFullScreen();
			}else if (document.webkitExitFullscreen){
			document.webkitExitFullscreen();
		}
	}

	/**
	*<p>场景布局类型。</p>
	*<p><ul>取值范围：
	*<li>"none" ：不更改屏幕</li>
	*<li>"horizontal" ：自动横屏</li>
	*<li>"vertical" ：自动竖屏</li>
	*</ul></p>
	*/
	__getset(0,__proto,'screenMode',function(){
		return this._screenMode;
		},function(value){
		this._screenMode=value;
	});

	/**鼠标在 Stage 上的 X 轴坐标。*/
	__getset(0,__proto,'mouseX',function(){
		return Math.round(MouseManager.instance.mouseX / this.clientScaleX);
	});

	/**舞台的背景颜色，默认为黑色，null为透明。*/
	__getset(0,__proto,'bgColor',function(){
		return this._bgColor;
		},function(value){
		this._bgColor=value;
		this.conchModel && this.conchModel.bgColor(value);
		if (Render.isWebGL){
			if (value){
				Stage._wgColor=Color.create(value)._color;
				}else {
				if (!Browser.onMiniGame)Stage._wgColor=null;
			}
		}
		if (Browser.onLimixiu){
			Stage._wgColor=Color.create(value)._color;
		}else
		if (value){
			Render.canvas.style.background=value;
			}else {
			Render.canvas.style.background="none";
		}
	});

	__getset(0,__proto,'visible',_super.prototype._$get_visible,function(value){
		if (this.visible!==value){
			Laya.superSet(Sprite,this,'visible',value);
			var style=Render._mainCanvas.source.style;
			style.visibility=value ? "visible" :"hidden";
		}
	});

	/**
	*<p>水平对齐方式。默认值为"left"。</p>
	*<p><ul>取值范围：
	*<li>"left" ：居左对齐；</li>
	*<li>"center" ：居中对齐；</li>
	*<li>"right" ：居右对齐；</li>
	*</ul></p>
	*/
	__getset(0,__proto,'alignH',function(){
		return this._alignH;
		},function(value){
		this._alignH=value;
		Laya.timer.callLater(this,this._changeCanvasSize);
	});

	/**
	*<p>垂直对齐方式。默认值为"top"。</p>
	*<p><ul>取值范围：
	*<li>"top" ：居顶部对齐；</li>
	*<li>"middle" ：居中对齐；</li>
	*<li>"bottom" ：居底部对齐；</li>
	*</ul></p>
	*/
	__getset(0,__proto,'alignV',function(){
		return this._alignV;
		},function(value){
		this._alignV=value;
		Laya.timer.callLater(this,this._changeCanvasSize);
	});

	/**
	*<p>缩放模式。默认值为 "noscale"。</p>
	*<p><ul>取值范围：
	*<li>"noscale" ：不缩放；</li>
	*<li>"exactfit" ：全屏不等比缩放；</li>
	*<li>"showall" ：最小比例缩放；</li>
	*<li>"noborder" ：最大比例缩放；</li>
	*<li>"full" ：不缩放，stage的宽高等于屏幕宽高；</li>
	*<li>"fixedwidth" ：宽度不变，高度根据屏幕比缩放；</li>
	*<li>"fixedheight" ：高度不变，宽度根据屏幕比缩放；</li>
	*<li>"fixedauto" ：根据宽高比，自动选择使用fixedwidth或fixedheight；</li>
	*</ul></p>
	*/
	__getset(0,__proto,'scaleMode',function(){
		return this._scaleMode;
		},function(value){
		this._scaleMode=value;
		Laya.timer.callLater(this,this._changeCanvasSize);
	});

	/**当前视窗由缩放模式导致的 Y 轴缩放系数。*/
	__getset(0,__proto,'clientScaleY',function(){
		return this._transform ? this._transform.getScaleY():1;
	});

	/**
	*舞台是否处于可见状态(是否进入后台)。
	*/
	__getset(0,__proto,'isVisibility',function(){
		return this._isVisibility;
	});

	/**
	*舞台是否获得焦点。
	*/
	__getset(0,__proto,'isFocused',function(){
		return this._isFocused;
	});

	//[Deprecated]
	__getset(0,__proto,'desginHeight',function(){
		console.debug("desginHeight已经弃用，请使用designHeight代替");
		return this.designHeight;
	});

	//[Deprecated]
	__getset(0,__proto,'desginWidth',function(){
		console.debug("desginWidth已经弃用，请使用designWidth代替");
		return this.designWidth;
	});

	__getset(0,__proto,'transform',function(){
		if (this._tfChanged)this._adjustTransform();
		return this._transform=this._transform|| Matrix.create();
	},_super.prototype._$set_transform);

	__getset(0,__proto,'height',_super.prototype._$get_height,function(value){
		this.designHeight=value;
		Laya.superSet(Sprite,this,'height',value);
		Laya.timer.callLater(this,this._changeCanvasSize);
	});

	/**当前视窗由缩放模式导致的 X 轴缩放系数。*/
	__getset(0,__proto,'clientScaleX',function(){
		return this._transform ? this._transform.getScaleX():1;
	});

	/**鼠标在 Stage 上的 Y 轴坐标。*/
	__getset(0,__proto,'mouseY',function(){
		return Math.round(MouseManager.instance.mouseY / this.clientScaleY);
	});

	__getset(0,__proto,'width',_super.prototype._$get_width,function(value){
		this.designWidth=value;
		Laya.superSet(Sprite,this,'width',value);
		Laya.timer.callLater(this,this._changeCanvasSize);
	});

	/**
	*<p>是否开启全屏，用户点击后进入全屏。</p>
	*<p>兼容性提示：部分浏览器不允许点击进入全屏，比如Iphone等。</p>
	*/
	__getset(0,__proto,'fullScreenEnabled',null,function(value){
		var document=Browser.document;
		var canvas=Render.canvas;
		if (value){
			canvas.addEventListener('mousedown',this._requestFullscreen);
			canvas.addEventListener('touchstart',this._requestFullscreen);
			document.addEventListener("fullscreenchange",this._fullScreenChanged);
			document.addEventListener("mozfullscreenchange",this._fullScreenChanged);
			document.addEventListener("webkitfullscreenchange",this._fullScreenChanged);
			document.addEventListener("msfullscreenchange",this._fullScreenChanged);
			}else {
			canvas.removeEventListener('mousedown',this._requestFullscreen);
			canvas.removeEventListener('touchstart',this._requestFullscreen);
			document.removeEventListener("fullscreenchange",this._fullScreenChanged);
			document.removeEventListener("mozfullscreenchange",this._fullScreenChanged);
			document.removeEventListener("webkitfullscreenchange",this._fullScreenChanged);
			document.removeEventListener("msfullscreenchange",this._fullScreenChanged);
		}
	});

	/**帧率类型，支持三种模式：fast-60帧(默认)，slow-30帧，mouse-30帧（鼠标活动后会自动加速到60，鼠标不动2秒后降低为30帧，以节省消耗），sleep-1帧。*/
	__getset(0,__proto,'frameRate',function(){
		return this._frameRate;
		},function(value){
		this._frameRate=value;
		if (Render.isConchApp){
			switch (this._frameRate){
				case "slow":
					Browser.window.conch && Browser.window.conchConfig.setSlowFrame && Browser.window.conchConfig.setSlowFrame(true);
					break ;
				case "fast":
					Browser.window.conch && Browser.window.conchConfig.setSlowFrame && Browser.window.conchConfig.setSlowFrame(false);
					break ;
				case "mouse":
					Browser.window.conch && Browser.window.conchConfig.setMouseFrame && Browser.window.conchConfig.setMouseFrame(2000);
					break ;
				case "sleep":
					Browser.window.conch && Browser.window.conchConfig.setLimitFPS && Browser.window.conchConfig.setLimitFPS(1);
					break ;
				default :
					throw new Error("Stage:frameRate invalid.");
					break ;
				}
		}
	});

	Stage.SCALE_NOSCALE="noscale";
	Stage.SCALE_EXACTFIT="exactfit";
	Stage.SCALE_SHOWALL="showall";
	Stage.SCALE_NOBORDER="noborder";
	Stage.SCALE_FULL="full";
	Stage.SCALE_FIXED_WIDTH="fixedwidth";
	Stage.SCALE_FIXED_HEIGHT="fixedheight";
	Stage.SCALE_FIXED_AUTO="fixedauto";
	Stage.ALIGN_LEFT="left";
	Stage.ALIGN_RIGHT="right";
	Stage.ALIGN_CENTER="center";
	Stage.ALIGN_TOP="top";
	Stage.ALIGN_MIDDLE="middle";
	Stage.ALIGN_BOTTOM="bottom";
	Stage.SCREEN_NONE="none";
	Stage.SCREEN_HORIZONTAL="horizontal";
	Stage.SCREEN_VERTICAL="vertical";
	Stage.FRAME_FAST="fast";
	Stage.FRAME_SLOW="slow";
	Stage.FRAME_MOUSE="mouse";
	Stage.FRAME_SLEEP="sleep";
	Stage.FRAME_MOUSE_THREDHOLD=2000;
	__static(Stage,
	['_wgColor',function(){return this._wgColor=[0,0,0,1];}
	]);
	return Stage;
})(Sprite)


/**
*<code>HTMLCanvas</code> 是 Html Canvas 的代理类，封装了 Canvas 的属性和方法。。请不要直接使用 new HTMLCanvas！
*/
//class laya.resource.HTMLCanvas extends laya.resource.Bitmap
var HTMLCanvas=(function(_super){
	function HTMLCanvas(type,canvas){
		//this._ctx=null;
		this._is2D=false;
		HTMLCanvas.__super.call(this);
		var _$this=this;
		this._source=this;
		if (type==="2D" || (type==="AUTO" && !Render.isWebGL)){
			this._is2D=true;
			this._source=canvas || Browser.createElement("canvas");
			this._w=this._source.width;
			this._h=this._source.height;
			var o=this;
			o.getContext=function (contextID,other){
				if (_$this._ctx)return _$this._ctx;
				var ctx=_$this._ctx=_$this._source.getContext(contextID,other);
				if (ctx){
					ctx._canvas=o;
					if(!Render.isFlash&&!Browser.onLimixiu)ctx.size=function (w,h){
					};
				}
				return ctx;
			}
		}
		this.lock=true;
	}

	__class(HTMLCanvas,'laya.resource.HTMLCanvas',_super);
	var __proto=HTMLCanvas.prototype;
	/**
	*清空画布内容。
	*/
	__proto.clear=function(){
		this._ctx && this._ctx.clear();
	}

	/**
	*销毁。
	*/
	__proto.destroy=function(){
		this._ctx && this._ctx.destroy();
		this._ctx=null;
		laya.resource.Resource.prototype.destroy.call(this);
	}

	/**
	*释放。
	*/
	__proto.release=function(){}
	/**
	*@private
	*设置 Canvas 渲染上下文。
	*@param context Canvas 渲染上下文。
	*/
	__proto._setContext=function(context){
		this._ctx=context;
	}

	/**
	*获取 Canvas 渲染上下文。
	*@param contextID 上下文ID.
	*@param other
	*@return Canvas 渲染上下文 Context 对象。
	*/
	__proto.getContext=function(contextID,other){
		return this._ctx ? this._ctx :(this._ctx=HTMLCanvas._createContext(this));
	}

	/**
	*获取内存大小。
	*@return 内存大小。
	*/
	__proto.getMemSize=function(){
		return 0;
	}

	/**
	*设置宽高。
	*@param w 宽度。
	*@param h 高度。
	*/
	__proto.size=function(w,h){
		if (this._w !=w || this._h !=h ||(this._source && (this._source.width!=w || this._source.height!=h))){
			this._w=w;
			this._h=h;
			this.memorySize=this._w *this._h *4;
			this._ctx && this._ctx.size(w,h);
			this._source && (this._source.height=h,this._source.width=w);
		}
	}

	__proto.getCanvas=function(){
		return this._source;
	}

	__proto.toBase64=function(type,encoderOptions,callBack){
		if (this._source){
			if (Render.isConchApp && this._source.toBase64){
				this._source.toBase64(type,encoderOptions,callBack);
			}
			else {
				var base64Data=this._source.toDataURL(type,encoderOptions);
				callBack.call(this,base64Data);
			}
		}
	}

	/**
	*是否当作 Bitmap 对象。
	*/
	__getset(0,__proto,'asBitmap',null,function(value){
	});

	/**
	*Canvas 渲染上下文。
	*/
	__getset(0,__proto,'context',function(){
		return this._ctx;
	});

	HTMLCanvas.create=function(type,canvas){
		return new HTMLCanvas(type,canvas);
	}

	HTMLCanvas.TYPE2D="2D";
	HTMLCanvas.TYPE3D="3D";
	HTMLCanvas.TYPEAUTO="AUTO";
	HTMLCanvas._createContext=null;
	return HTMLCanvas;
})(Bitmap)


//class fairygui.display.Image extends laya.display.Sprite
var Image$1=(function(_super){
	function Image(){
		this._tex=null;
		this._scaleByTile=false;
		this._scale9Grid=null;
		this._tileGridIndice=0;
		this._textureScaleX=1;
		this._textureScaleY=1;
		this._needRebuild=0;
		this._fillMethod=0;
		this._fillOrigin=0;
		this._fillAmount=0;
		this._fillClockwise=false;
		this._mask=null;
		Image.__super.call(this);
		this.mouseEnabled=false;
	}

	__class(Image,'fairygui.display.Image',_super,'Image$1');
	var __proto=Image.prototype;
	__proto.scaleTexture=function(sx,sy){
		if(this._textureScaleX!=sx || this._textureScaleY!=sy){
			this._textureScaleX=sx;
			this._textureScaleY=sy;
			if(this._tex)
				this.size(this._tex.width*sx,this._tex.height*sy);
			this.markChanged(1);
		}
	}

	__proto.markChanged=function(flag){
		if(!this._needRebuild){
			this._needRebuild=flag;
			Laya.timer.callLater(this,this.rebuild);
		}
		else
		this._needRebuild |=flag;
	}

	__proto.rebuild=function(){
		if((this._needRebuild & 1)!=0)
			this.doDraw();
		if((this._needRebuild & 2)!=0 && this._fillMethod!=0)
			this.doFill();
		this._needRebuild=0;
	}

	__proto.doDraw=function(){
		var w=this.width;
		var h=this.height;
		var g=this.graphics;
		if(this._tex==null || w==0 || h==0){
			g.clear();
		}
		else if(this._scaleByTile){
			g.clear();
			g.fillTexture(this._tex,0,0,w,h);
		}
		else if(this._scale9Grid!=null){
			g.clear();
			var tw=this._tex.width;
			var th=this._tex.height;
			var left=this._scale9Grid.x;
			var right=Math.max(tw-this._scale9Grid.right,0);
			var top=this._scale9Grid.y;
			var bottom=Math.max(th-this._scale9Grid.bottom,0);
			var tmp=NaN;
			if (h >=(th-this._scale9Grid.height)){
				top=this._scale9Grid.y;
				bottom=th-this._scale9Grid.bottom;
			}
			else{
				tmp=this._scale9Grid.y / (th-this._scale9Grid.bottom);
				tmp=h *tmp / (1+tmp);
				top=Math.round(tmp);
				bottom=h-tmp;
			}
			if (w >=(tw-this._scale9Grid.width)){
				left=this._scale9Grid.x;
				right=tw-this._scale9Grid.right;
			}
			else{
				tmp=this._scale9Grid.x / (tw-this._scale9Grid.right);
				tmp=w *tmp / (1+tmp);
				left=Math.round(tmp);
				right=w-tmp;
			};
			var centerWidth=Math.max(w-left-right,0);
			var centerHeight=Math.max(h-top-bottom,0);
			left && top && g.drawTexture(fairygui.display.Image.getTexture(this._tex,0,0,left,top),0,0,left,top);
			right && top && g.drawTexture(fairygui.display.Image.getTexture(this._tex,tw-right,0,right,top),w-right,0,right,top);
			left && bottom && g.drawTexture(fairygui.display.Image.getTexture(this._tex,0,th-bottom,left,bottom),0,h-bottom,left,bottom);
			right && bottom && g.drawTexture(fairygui.display.Image.getTexture(this._tex,tw-right,th-bottom,right,bottom),w-right,h-bottom,right,bottom);
			centerWidth && top && this.drawTexture(0,fairygui.display.Image.getTexture(this._tex,left,0,tw-left-right,top),left,0,centerWidth,top);
			centerWidth && bottom && this.drawTexture(1,fairygui.display.Image.getTexture(this._tex,left,th-bottom,tw-left-right,bottom),left,h-bottom,centerWidth,bottom);
			centerHeight && left && this.drawTexture(2,fairygui.display.Image.getTexture(this._tex,0,top,left,th-top-bottom),0,top,left,centerHeight);
			centerHeight && right && this.drawTexture(3,fairygui.display.Image.getTexture(this._tex,tw-right,top,right,th-top-bottom),w-right,top,right,centerHeight);
			centerWidth && centerHeight && this.drawTexture(4,fairygui.display.Image.getTexture(this._tex,left,top,tw-left-right,th-top-bottom),left,top,centerWidth,centerHeight);
		}
		else {
			g.cleanByTexture(this._tex,0,0,w,h);
		}
	}

	__proto.drawTexture=function(part,tex,x,y,width,height){
		(width===void 0)&& (width=0);
		(height===void 0)&& (height=0);
		if(part==-1 || (this._tileGridIndice & (1<<part))==0)
			this.graphics.drawTexture(tex,x,y,width,height);
		else
		this.graphics.fillTexture(tex,x,y,width,height);
	}

	__proto.doFill=function(){
		var w=this.width;
		var h=this.height;
		var g=this._mask.graphics;
		g.clear();
		if(w==0 || h==0)
			return;
		var points=FillUtils.fill(w,h,this._fillMethod,this._fillOrigin,this._fillClockwise,this._fillAmount);
		if(points==null){
			this.mask=null;
			this.mask=this._mask;
			return;
		}
		g.drawPoly(0,0,points,"#FFFFFF");
	}

	__getset(0,__proto,'fillAmount',function(){
		return this._fillAmount;
		},function(value){
		if(this._fillAmount!=value){
			this._fillAmount=value;
			if(this._fillMethod!=0)
				this.markChanged(2);
		}
	});

	__getset(0,__proto,'fillClockwise',function(){
		return this._fillClockwise;
		},function(value){
		if(this._fillClockwise!=value){
			this._fillClockwise=value;
			if(this._fillMethod!=0)
				this.markChanged(2);
		}
	});

	__getset(0,__proto,'fillOrigin',function(){
		return this._fillOrigin;
		},function(value){
		if(this._fillOrigin!=value){
			this._fillOrigin=value;
			if(this._fillMethod!=0)
				this.markChanged(2);
		}
	});

	__getset(0,__proto,'fillMethod',function(){
		return this._fillMethod;
		},function(value){
		if(this._fillMethod!=value){
			this._fillMethod=value;
			if(this._fillMethod!=0){
				if(!this._mask){
					this._mask=new Sprite();
					this._mask.mouseEnabled=false;
				}
				this.mask=this._mask;
				this.markChanged(2);
			}
			else if(this.mask){
				this._mask.graphics.clear();
				this.mask=null;
			}
		}
	});

	__getset(0,__proto,'tex',function(){
		return this._tex;
		},function(value){
		if(this._tex!=value){
			this._tex=value;
			if(this._tex)
				this.size(this._tex.width*this._textureScaleX,this._tex.height*this._textureScaleY);
			else
			this.size(0,0);
			this.markChanged(1);
		}
	});

	__getset(0,__proto,'tileGridIndice',function(){
		return this._tileGridIndice;
		},function(value){
		if(this._tileGridIndice!=value){
			this._tileGridIndice=value;
			this.markChanged(1);
		}
	});

	__getset(0,__proto,'scale9Grid',function(){
		return this._scale9Grid;
		},function(value){
		this._scale9Grid=value;
		this.markChanged(1);
	});

	__getset(0,__proto,'scaleByTile',function(){
		return this._scaleByTile;
		},function(value){
		if(this._scaleByTile!=value){
			this._scaleByTile=value;
			this.markChanged(1);
		}
	});

	Image.getTexture=function(tex,x,y,width,height){
		if (width <=0)width=1;
		if (height <=0)height=1;
		tex.$_GID || (tex.$_GID=Utils.getGID())
		var key=tex.$_GID+"."+x+"."+y+"."+width+"."+height;
		var texture=WeakObject.I.get(key);
		if (!texture||!texture.source){
			texture=Texture.createFromTexture(tex,x,y,width,height);
			WeakObject.I.set(key,texture);
		}
		return texture;
	}

	return Image;
})(Sprite)


//class fairygui.display.MovieClip extends laya.display.Sprite
var MovieClip$1=(function(_super){
	function MovieClip(){
		this.interval=0;
		this.swing=false;
		this.repeatDelay=0;
		this.timeScale=1;
		this._$3__texture=null;
		this._needRebuild=false;
		this._playing=true;
		this._frameCount=0;
		this._frames=null;
		this._frame=0;
		this._boundsRect=null;
		this._start=0;
		this._end=0;
		this._times=0;
		this._endAt=0;
		this._status=0;
		//0-none,1-next loop,2-ending,3-ended
		this._endHandler=null;
		this._frameElapsed=0;
		//当前帧延迟
		this._reversed=false;
		this._repeatedCount=0;
		MovieClip.__super.call(this);
		this.mouseEnabled=false;
		this.setPlaySettings();
		this.on("display",this,this.__addToStage);
		this.on("undisplay",this,this.__removeFromStage);
	}

	__class(MovieClip,'fairygui.display.MovieClip',_super,'MovieClip$1');
	var __proto=MovieClip.prototype;
	//从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
	__proto.rewind=function(){
		this._frame=0;
		this._frameElapsed=0;
		this._reversed=false;
		this._repeatedCount=0;
		this.drawFrame();
	}

	__proto.syncStatus=function(anotherMc){
		this._frame=anotherMc._frame;
		this._frameElapsed=anotherMc._frameElapsed;
		this._reversed=anotherMc._reversed;
		this._repeatedCount=anotherMc._repeatedCount;
		this.drawFrame();
	}

	__proto.advance=function(timeInMiniseconds){
		var beginFrame=this._frame;
		var beginReversed=this._reversed;
		var backupTime=timeInMiniseconds;
		while (true){
			var tt=this.interval+this._frames[this._frame].addDelay;
			if (this._frame==0 && this._repeatedCount > 0)
				tt+=this.repeatDelay;
			if (timeInMiniseconds < tt){
				this._frameElapsed=0;
				break ;
			}
			timeInMiniseconds-=tt;
			if (this.swing){
				if (this._reversed){
					this._frame--;
					if (this._frame <=0){
						this._frame=0;
						this._repeatedCount++;
						this._reversed=!this._reversed;
					}
				}
				else{
					this._frame++;
					if (this._frame > this._frameCount-1){
						this._frame=Math.max(0,this._frameCount-2);
						this._repeatedCount++;
						this._reversed=!this._reversed;
					}
				}
			}
			else{
				this._frame++;
				if (this._frame > this._frameCount-1){
					this._frame=0;
					this._repeatedCount++;
				}
			}
			if (this._frame==beginFrame && this._reversed==beginReversed){
				var roundTime=backupTime-timeInMiniseconds;
				timeInMiniseconds-=Math.floor(timeInMiniseconds / roundTime)*roundTime;
			}
		}
		this.drawFrame();
	}

	//从start帧开始，播放到end帧（-1表示结尾），重复times次（0表示无限循环），循环结束后，停止在endAt帧（-1表示参数end）
	__proto.setPlaySettings=function(start,end,times,endAt,endHandler){
		(start===void 0)&& (start=0);
		(end===void 0)&& (end=-1);
		(times===void 0)&& (times=0);
		(endAt===void 0)&& (endAt=-1);
		this._start=start;
		this._end=end;
		if(this._end==-1 || this._end>this._frameCount-1)
			this._end=this._frameCount-1;
		this._times=times;
		this._endAt=endAt;
		if (this._endAt==-1)
			this._endAt=this._end;
		this._status=0;
		this._endHandler=endHandler;
		this.frame=start;
	}

	__proto.update=function(){
		if (!this._playing || this._frameCount==0 || this._status==3)
			return;
		var dt=Laya.timer.delta;
		if(dt>100)
			dt=100;
		if(this.timeScale!=1)
			dt *=this.timeScale;
		this._frameElapsed+=dt;
		var tt=this.interval+this._frames[this._frame].addDelay;
		if (this._frame==0 && this._repeatedCount > 0)
			tt+=this.repeatDelay;
		if (this._frameElapsed < tt)
			return;
		this._frameElapsed-=tt;
		if (this._frameElapsed > this.interval)
			this._frameElapsed=this.interval;
		if (this.swing){
			if (this._reversed){
				this._frame--;
				if (this._frame <=0){
					this._frame=0;
					this._repeatedCount++;
					this._reversed=!this._reversed;
				}
			}
			else{
				this._frame++;
				if (this._frame > this._frameCount-1){
					this._frame=Math.max(0,this._frameCount-2);
					this._repeatedCount++;
					this._reversed=!this._reversed;
				}
			}
		}
		else{
			this._frame++;
			if (this._frame > this._frameCount-1){
				this._frame=0;
				this._repeatedCount++;
			}
		}
		if (this._status==1){
			this._frame=this._start;
			this._frameElapsed=0;
			this._status=0;
		}
		else if (this._status==2){
			this._frame=this._endAt;
			this._frameElapsed=0;
			this._status=3;
			if(this._endHandler!=null){
				var handler=this._endHandler;
				this._endHandler=null;
				handler.run();
			}
		}
		else{
			if (this._frame==this._end){
				if (this._times > 0){
					this._times--;
					if (this._times==0)
						this._status=2;
					else
					this._status=1;
				}
				else if (this._start !=0)
				this._status=1;
			}
		}
		this.drawFrame();
	}

	__proto.drawFrame=function(){
		if (this._frameCount>0 && this._frame < this._frames.length){
			var frame=this._frames[this._frame];
			this.graphics.cleanByTexture(frame.texture,frame.rect.x,frame.rect.y);
		}
		else
		this.graphics.clear();
	}

	__proto.checkTimer=function(){
		if (this._playing && this._frameCount>0 && this.stage!=null)
			Laya.timer.frameLoop(1,this,this.update);
		else
		Laya.timer.clear(this,this.update);
	}

	__proto.__addToStage=function(){
		if(this._playing && this._frameCount>0)
			Laya.timer.frameLoop(1,this,this.update);
	}

	__proto.__removeFromStage=function(){
		Laya.timer.clear(this,this.update);
	}

	__getset(0,__proto,'frame',function(){
		return this._frame;
		},function(value){
		if (this._frame !=value){
			if(this._frames!=null && value>=this._frameCount)
				value=this._frameCount-1;
			this._frame=value;
			this._frameElapsed=0;
			this.drawFrame();
		}
	});

	__getset(0,__proto,'boundsRect',function(){
		return this._boundsRect;
		},function(value){
		this._boundsRect=value;
	});

	__getset(0,__proto,'playing',function(){
		return this._playing;
		},function(value){
		if(this._playing!=value){
			this._playing=value;
			this.checkTimer();
		}
	});

	__getset(0,__proto,'frameCount',function(){
		return this._frameCount;
	});

	__getset(0,__proto,'frames',function(){
		return this._frames;
		},function(value){
		this._frames=value;
		if (this._frames !=null)
			this._frameCount=this._frames.length;
		else
		this._frameCount=0;
		if(this._end==-1 || this._end > this._frameCount-1)
			this._end=this._frameCount-1;
		if(this._endAt==-1 || this._endAt > this._frameCount-1)
			this._endAt=this._frameCount-1;
		if(this._frame < 0 || this._frame > this._frameCount-1)
			this._frame=this._frameCount-1;
		this.drawFrame();
		this._frameElapsed=0;
		this._repeatedCount=0;
		this._reversed=false;
		this.checkTimer();
	});

	return MovieClip;
})(Sprite)


/**
*DIV标签
*/
//class laya.html.dom.HTMLDivElement extends laya.html.dom.HTMLElement
var HTMLDivElement=(function(_super){
	function HTMLDivElement(){
		/**实际内容的高 */
		this.contextHeight=NaN;
		/**实际内容的宽 */
		this.contextWidth=NaN;
		HTMLDivElement.__super.call(this);
		this.style.block=true;
		this.style.lineElement=true;
		this.style.width=200;
		this.style.height=200;
		HTMLStyleElement;
	}

	__class(HTMLDivElement,'laya.html.dom.HTMLDivElement',_super);
	var __proto=HTMLDivElement.prototype;
	/**
	*追加内容，解析并对显示对象排版
	*@param text
	*/
	__proto.appendHTML=function(text){
		HTMLParse.parse(this,text,this.URI);
		this.layout();
	}

	/**
	*@private
	*@param out
	*@return
	*/
	__proto._addChildsToLayout=function(out){
		var words=this._getWords();
		if (words==null && this._childs.length==0)return false;
		words && words.forEach(function(o){
			out.push(o);
		});
		var tFirstKey=true;
		for (var i=0,len=this._childs.length;i < len;i++){
			var o=this._childs[i];
			if (tFirstKey){
				tFirstKey=false;
				}else {
				out.push(null);
			}
			o._addToLayout(out)
		}
		return true;
	}

	/**
	*@private
	*@param out
	*/
	__proto._addToLayout=function(out){
		this.layout();
	}

	/**
	*@private
	*对显示内容进行排版
	*/
	__proto.layout=function(){
		if (!this.style)return;
		this.style._type |=0x200;
		var tArray=Layout.layout(this);
		if (tArray){
			if (!this._$P.mHtmlBounds)this._set$P("mHtmlBounds",new Rectangle());
			var tRectangle=this._$P.mHtmlBounds;
			tRectangle.x=tRectangle.y=0;
			tRectangle.width=this.contextWidth=tArray[0];
			tRectangle.height=this.contextHeight=tArray[1];
			this.setBounds(tRectangle);
		}
	}

	/**
	*获取对象的高
	*/
	__getset(0,__proto,'height',function(){
		if (this._height)return this._height;
		return this.contextHeight;
	},_super.prototype._$set_height);

	/**
	*获取对象的宽
	*/
	__getset(0,__proto,'width',function(){
		if (this._width)return this._width;
		return this.contextWidth;
		},function(value){
		var changed=false;
		if (value===0){
			changed=value !=this._width;
			}else{
			changed=value !=this.width;
		}
		Laya.superSet(HTMLElement,this,'width',value);
		if(changed)
			this.layout();
	});

	/**
	*设置标签内容
	*/
	__getset(0,__proto,'innerHTML',null,function(text){
		this.destroyChildren();
		this.appendHTML(text);
	});

	return HTMLDivElement;
})(HTMLElement)


/**
*@private
*/
//class laya.html.dom.HTMLImageElement extends laya.html.dom.HTMLElement
var HTMLImageElement=(function(_super){
	function HTMLImageElement(){
		this._tex=null;
		this._url=null;
		this._renderArgs=[];
		HTMLImageElement.__super.call(this);
		this.style.block=true;
	}

	__class(HTMLImageElement,'laya.html.dom.HTMLImageElement',_super);
	var __proto=HTMLImageElement.prototype;
	__proto._addToLayout=function(out){
		!this._style.absolute && out.push(this);
	}

	__proto.render=function(context,x,y){
		if (!this._tex || !this._tex.loaded || !this._tex.loaded || this._width < 1 || this._height < 1)return;
		Stat.spriteCount++;
		this._renderArgs[0]=this._tex;
		this._renderArgs[1]=this.x;
		this._renderArgs[2]=this.y;
		this._renderArgs[3]=this.width || this._tex.width;
		this._renderArgs[4]=this.height || this._tex.height;
		context.ctx.drawTexture2(x,y,this.style.translateX,this.style.translateY,this.transform,this.style.alpha,this.style.blendMode,this._renderArgs);
	}

	/**
	*@private
	*/
	__proto.layaoutCallNative=function(){
		var n=0;
		if (this._childs &&(n=this._childs.length)> 0){
			for (var i=0;i < n;i++){
				this._childs[i].layaoutCallNative && this._childs[i].layaoutCallNative();
			}
		}
	}

	__getset(0,__proto,'src',null,function(url){
		var _$this=this;
		url=this.formatURL(url);
		if (this._url==url)return;
		this._url=url;
		var tex=this._tex=Loader.getRes(url);
		if (!tex){
			this._tex=tex=new Texture();
			tex.load(url);
			Loader.cacheRes(url,tex);
		}
		function onloaded (){
			var style=_$this._style;
			var w=style.widthed(_$this)?-1:_$this._tex.width;
			var h=style.heighted(_$this)?-1:_$this._tex.height;
			if (!style.widthed(_$this)&& _$this._width !=_$this._tex.width){
				_$this.width=_$this._tex.width;
				_$this.parent && (_$this.parent)._layoutLater();
			}
			if (!style.heighted(_$this)&& _$this._height !=_$this._tex.height){
				_$this.height=_$this._tex.height;
				_$this.parent && (_$this.parent)._layoutLater();
			}
			if (Render.isConchApp){
				_$this._renderArgs[0]=_$this._tex;
				_$this._renderArgs[1]=_$this.x;
				_$this._renderArgs[2]=_$this.y;
				_$this._renderArgs[3]=_$this.width || _$this._tex.width;
				_$this._renderArgs[4]=_$this.height || _$this._tex.height;
				_$this.graphics.drawTexture(_$this._tex,0,0,_$this._renderArgs[3],_$this._renderArgs[4]);
			}
			_$this.repaint();
			_$this.parentRepaint();
		}
		tex.loaded?onloaded():tex.on("loaded",null,onloaded);
	});

	return HTMLImageElement;
})(HTMLElement)


/**
*@private
*/
//class laya.html.dom.HTMLDocument extends laya.html.dom.HTMLElement
var HTMLDocument=(function(_super){
	function HTMLDocument(){
		this.all=new Array;
		this.styleSheets=CSSStyle.styleSheets;
		HTMLDocument.__super.call(this);
	}

	__class(HTMLDocument,'laya.html.dom.HTMLDocument',_super);
	var __proto=HTMLDocument.prototype;
	__proto.getElementById=function(id){
		return this.all[id];
	}

	__proto.setElementById=function(id,e){
		this.all[id]=e;
	}

	__static(HTMLDocument,
	['document',function(){return this.document=new HTMLDocument();}
	]);
	return HTMLDocument;
})(HTMLElement)


/**
*@private
*/
//class laya.html.dom.HTMLStyleElement extends laya.html.dom.HTMLElement
var HTMLStyleElement=(function(_super){
	function HTMLStyleElement(){
		HTMLStyleElement.__super.call(this);
		this.visible=false;
	}

	__class(HTMLStyleElement,'laya.html.dom.HTMLStyleElement',_super);
	var __proto=HTMLStyleElement.prototype;
	/**
	*解析样式
	*/
	__getset(0,__proto,'text',_super.prototype._$get_text,function(value){
		CSSStyle.parseCSS(value,null);
	});

	return HTMLStyleElement;
})(HTMLElement)


/**
*@private
*/
//class laya.html.dom.HTMLBrElement extends laya.html.dom.HTMLElement
var HTMLBrElement=(function(_super){
	function HTMLBrElement(){
		HTMLBrElement.__super.call(this);
		this.style.lineElement=true;
		this.style.block=true;
	}

	__class(HTMLBrElement,'laya.html.dom.HTMLBrElement',_super);
	return HTMLBrElement;
})(HTMLElement)


/**
*@private
*<p> <code>HTMLImage</code> 用于创建 HTML Image 元素。</p>
*<p>请使用 <code>HTMLImage.create()<code>获取新实例，不要直接使用 <code>new HTMLImage<code> 。</p>
*/
//class laya.resource.HTMLImage extends laya.resource.FileBitmap
var HTMLImage=(function(_super){
	function HTMLImage(src,def){
		/**异步加载锁*/
		this._recreateLock=false;
		/**异步加载完成后是否需要释放（有可能在恢复过程中,再次被释放，用此变量做标记）*/
		this._needReleaseAgain=false;
		this._enableMerageInAtlas=true;
		HTMLImage.__super.call(this);
		this._init_(src,def);
	}

	__class(HTMLImage,'laya.resource.HTMLImage',_super);
	var __proto=HTMLImage.prototype;
	__proto._init_=function(src,def){
		this._src=src;
		this._source=new Browser.window.Image();
		if (def){
			def.onload && (this.onload=def.onload);
			def.onerror && (this.onerror=def.onerror);
			def.onCreate && def.onCreate(this);
		}
		if (src.indexOf("data:image")!=0)this._source.crossOrigin="";
		(src)&& (this._source.src=src);
	}

	/**
	*@inheritDoc
	*/
	__proto.recreateResource=function(){
		var _$this=this;
		if (this._src==="")
			throw new Error("src no null！");
		this._needReleaseAgain=false;
		if (!this._source){
			this._recreateLock=true;
			var _this=this;
			this._source=new Browser.window.Image();
			this._source.crossOrigin="";
			this._source.onload=function (){
				if (_this._needReleaseAgain){
					_this._needReleaseAgain=false;
					_this._source.onload=null;
					_this._source=null;
					return;
				}
				_this._source.onload=null;
				_this.memorySize=_$this._w *_$this._h *4;
				_this._recreateLock=false;
				_this.completeCreate();
			};
			this._source.src=this._src;
			}else {
			if (this._recreateLock)
				return;
			this.memorySize=this._w *this._h *4;
			this._recreateLock=false;
			this.completeCreate();
		}
	}

	/**
	*@inheritDoc
	*/
	__proto.disposeResource=function(){
		if (this._recreateLock)
			this._needReleaseAgain=true;
		(this._source)&& (this._source=null,this.memorySize=0);
	}

	/***调整尺寸。*/
	__proto.onresize=function(){
		this._w=this._source.width;
		this._h=this._source.height;
	}

	__getset(0,__proto,'enableMerageInAtlas',function(){
		return this._enableMerageInAtlas;
		},function(value){
		this._enableMerageInAtlas=value;
		if (Render.isConchApp){
			if (this._source)this._source.enableMerageInAtlas=value;
		}
	});

	/**
	*@inheritDoc
	*/
	__getset(0,__proto,'onerror',null,function(value){
		var _$this=this;
		this._onerror=value;
		this._source && (this._source.onerror=this._onerror !=null ? (function(){
			_$this._onerror()
		}):null);
	});

	/**
	*@inheritDoc
	*/
	__getset(0,__proto,'onload',null,function(value){
		var _$this=this;
		this._onload=value;
		this._source && (this._source.onload=this._onload !=null ? (function(){
			_$this.onresize();
			_$this._onload();
		}):null);
	});

	HTMLImage.create=function(src,def){
		return new HTMLImage(src,def);
	}

	return HTMLImage;
})(FileBitmap)


/**
*<p><code>Input</code> 类用于创建显示对象以显示和输入文本。</p>
*<p>Input 类封装了原生的文本输入框，由于不同浏览器的差异，会导致此对象的默认文本的位置与用户点击输入时的文本的位置有少许的偏差。</p>
*/
//class laya.display.Input extends laya.display.Text
var Input=(function(_super){
	function Input(){
		/**@private */
		this._focus=false;
		/**@private */
		this._multiline=false;
		/**@private */
		this._editable=true;
		/**@private */
		this._restrictPattern=null;
		this._type="text";
		/**输入提示符。*/
		this._prompt='';
		/**输入提示符颜色。*/
		this._promptColor="#A9A9A9";
		this._originColor="#000000";
		this._content='';
		Input.__super.call(this);
		this._maxChars=1E5;
		this._width=100;
		this._height=20;
		this.multiline=false;
		this.overflow=Text.SCROLL;
		this.on("mousedown",this,this._onMouseDown);
		this.on("undisplay",this,this._onUnDisplay);
	}

	__class(Input,'laya.display.Input',_super);
	var __proto=Input.prototype;
	/**
	*设置光标位置和选取字符。
	*@param startIndex 光标起始位置。
	*@param endIndex 光标结束位置。
	*/
	__proto.setSelection=function(startIndex,endIndex){
		this.focus=true;
		laya.display.Input.inputElement.selectionStart=startIndex;
		laya.display.Input.inputElement.selectionEnd=endIndex;
	}

	__proto._onUnDisplay=function(e){
		this.focus=false;
	}

	__proto._onMouseDown=function(e){
		this.focus=true;
	}

	/**
	*在输入期间，如果 Input 实例的位置改变，调用_syncInputTransform同步输入框的位置。
	*/
	__proto._syncInputTransform=function(){
		var inputElement=this.nativeInput;
		var transform=Utils.getTransformRelativeToWindow(this,this.padding[3],this.padding[0]);
		var inputWid=this._width-this.padding[1]-this.padding[3];
		var inputHei=this._height-this.padding[0]-this.padding[2];
		if (Render.isConchApp){
			inputElement.setScale(transform.scaleX,transform.scaleY);
			inputElement.setSize(inputWid,inputHei);
			inputElement.setPos(transform.x,transform.y);
			}else {
			Input.inputContainer.style.transform=Input.inputContainer.style.webkitTransform="scale("+transform.scaleX+","+transform.scaleY+") rotate("+(Laya.stage.canvasDegree)+"deg)";
			inputElement.style.width=inputWid+'px';
			inputElement.style.height=inputHei+'px';
			Input.inputContainer.style.left=transform.x+'px';
			Input.inputContainer.style.top=transform.y+'px';
		}
	}

	/**选中当前实例的所有文本。*/
	__proto.select=function(){
		this.nativeInput.select();
	}

	__proto._setInputMethod=function(){
		Input.input.parentElement && (Input.inputContainer.removeChild(Input.input));
		Input.area.parentElement && (Input.inputContainer.removeChild(Input.area));
		Input.inputElement=(this._multiline ? Input.area :Input.input);
		Input.inputContainer.appendChild(Input.inputElement);
		if (Text.RightToLeft){
			Input.inputElement.style.direction="rtl";
		}
	}

	__proto._focusIn=function(){
		laya.display.Input.isInputting=true;
		var input=this.nativeInput;
		this._focus=true;
		var cssStyle=input.style;
		cssStyle.whiteSpace=(this.wordWrap ? "pre-wrap" :"nowrap");
		this._setPromptColor();
		input.readOnly=!this._editable;
		if (Render.isConchApp){
			input.setType(this._type);
			input.setForbidEdit(!this._editable);
		}
		input.maxLength=this._maxChars;
		var padding=this.padding;
		input.type=this._type;
		input.value=this._content;
		input.placeholder=this._prompt;
		Laya.stage.off("keydown",this,this._onKeyDown);
		Laya.stage.on("keydown",this,this._onKeyDown);
		Laya.stage.focus=this;
		this.event("focus");
		if (Browser.onPC)input.focus();
		if(!Browser.onMiniGame){
			var temp=this._text;
			this._text=null;
		}
		this.typeset();
		input.setColor(this._originColor);
		input.setFontSize(this.fontSize);
		input.setFontFace(Browser.onIPhone ? (Text._fontFamilyMap[this.font] || this.font):this.font);
		if (Render.isConchApp){
			input.setMultiAble && input.setMultiAble(this._multiline);
		}
		cssStyle.lineHeight=(this.leading+this.fontSize)+"px";
		cssStyle.fontStyle=(this.italic ? "italic" :"normal");
		cssStyle.fontWeight=(this.bold ? "bold" :"normal");
		cssStyle.textAlign=this.align;
		cssStyle.padding="0 0";
		this._syncInputTransform();
		if (!Render.isConchApp && Browser.onPC)
			Laya.timer.frameLoop(1,this,this._syncInputTransform);
	}

	// 设置DOM输入框提示符颜色。
	__proto._setPromptColor=function(){
		Input.promptStyleDOM=Browser.getElementById("promptStyle");
		if (!Input.promptStyleDOM){
			Input.promptStyleDOM=Browser.createElement("style");
			Input.promptStyleDOM.setAttribute("id","promptStyle");
			Browser.document.head.appendChild(Input.promptStyleDOM);
		}
		Input.promptStyleDOM.innerText="input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {"+"color:"+this._promptColor+"}"+"input:-moz-placeholder, textarea:-moz-placeholder {"+"color:"+this._promptColor+"}"+"input::-moz-placeholder, textarea::-moz-placeholder {"+"color:"+this._promptColor+"}"+"input:-ms-input-placeholder, textarea:-ms-input-placeholder {"+"color:"+this._promptColor+"}";
	}

	/**@private */
	__proto._focusOut=function(){
		laya.display.Input.isInputting=false;
		this._focus=false;
		this._text=null;
		this._content=this.nativeInput.value;
		if (!this._content){
			Laya.superSet(Text,this,'text',this._prompt);
			Laya.superSet(Text,this,'color',this._promptColor);
			}else {
			Laya.superSet(Text,this,'text',this._content);
			Laya.superSet(Text,this,'color',this._originColor);
		}
		Laya.stage.off("keydown",this,this._onKeyDown);
		Laya.stage.focus=null;
		this.event("blur");
		if (Render.isConchApp)this.nativeInput.blur();
		Browser.onPC && Laya.timer.clear(this,this._syncInputTransform);
	}

	/**@private */
	__proto._onKeyDown=function(e){
		if (e.keyCode===13){
			if (Browser.onMobile && !this._multiline)
				this.focus=false;
			this.event("enter");
		}
	}

	__proto.changeText=function(text){
		this._content=text;
		if (this._focus){
			this.nativeInput.value=text || '';
			this.event("change");
		}else
		_super.prototype.changeText.call(this,text);
	}

	/**
	*<p>原生输入框 X 轴调整值，用来调整输入框坐标。</p>
	*<p>由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。</p>
	*@deprecated
	*/
	__getset(0,__proto,'inputElementXAdjuster',function(){
		console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。");
		return 0;
		},function(value){
		console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementXAdjuster已弃用。");
	});

	/**
	*<p>输入框类型为Input静态常量之一。</p>
	*<ul>
	*<li>TYPE_TEXT</li>
	*<li>TYPE_PASSWORD</li>
	*<li>TYPE_EMAIL</li>
	*<li>TYPE_URL</li>
	*<li>TYPE_NUMBER</li>
	*<li>TYPE_RANGE</li>
	*<li>TYPE_DATE</li>
	*<li>TYPE_MONTH</li>
	*<li>TYPE_WEEK</li>
	*<li>TYPE_TIME</li>
	*<li>TYPE_DATE_TIME</li>
	*<li>TYPE_DATE_TIME_LOCAL</li>
	*</ul>
	*<p>平台兼容性参见http://www.w3school.com.cn/html5/html_5_form_input_types.asp。</p>
	*/
	__getset(0,__proto,'type',function(){
		return this._type;
		},function(value){
		if (value=="password")
			this._getCSSStyle().password=true;
		else
		this._getCSSStyle().password=false;
		this._type=value;
		if (Render.isConchApp){
			this.nativeInput.setType(value);
		}
	});

	/**
	*是否可编辑。
	*/
	__getset(0,__proto,'editable',function(){
		return this._editable;
		},function(value){
		this._editable=value;
		if (Render.isConchApp){
			Input.input.setForbidEdit(!value);
		}
	});

	/**
	*设置输入提示符。
	*/
	__getset(0,__proto,'prompt',function(){
		return this._prompt;
		},function(value){
		if (!this._text && value)
			Laya.superSet(Text,this,'color',this._promptColor);
		this.promptColor=this._promptColor;
		if (this._text)
			Laya.superSet(Text,this,'text',(this._text==this._prompt)?value:this._text);
		else
		Laya.superSet(Text,this,'text',value);
		this._prompt=Text.langPacks && Text.langPacks[value] ? Text.langPacks[value] :value;
	});

	/**限制输入的字符。*/
	__getset(0,__proto,'restrict',function(){
		if (this._restrictPattern){
			return this._restrictPattern.source;
		}
		return "";
		},function(pattern){
		if (pattern){
			pattern="[^"+pattern+"]";
			if (pattern.indexOf("^^")>-1)
				pattern=pattern.replace("^^","");
			this._restrictPattern=new RegExp(pattern,"g");
		}else
		this._restrictPattern=null;
	});

	/**@inheritDoc */
	__getset(0,__proto,'color',_super.prototype._$get_color,function(value){
		if (this._focus)
			this.nativeInput.setColor(value);
		Laya.superSet(Text,this,'color',this._content?value:this._promptColor);
		this._originColor=value;
	});

	//[Deprecated(replacement="Input.type")]
	__getset(0,__proto,'asPassword',function(){
		return this._getCSSStyle().password;
		},function(value){
		this._getCSSStyle().password=value;
		this._type="password";
		console.warn("deprecated: 使用type=\"password\"替代设置asPassword, asPassword将在下次重大更新时删去");
		this.isChanged=true;
	});

	/**
	*<p>字符数量限制，默认为10000。</p>
	*<p>设置字符数量限制时，小于等于0的值将会限制字符数量为10000。</p>
	*/
	__getset(0,__proto,'maxChars',function(){
		return this._maxChars;
		},function(value){
		if (value <=0)
			value=1E5;
		this._maxChars=value;
	});

	//[Deprecated]
	__getset(0,__proto,'inputElementYAdjuster',function(){
		console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementYAdjuster已弃用。");
		return 0;
		},function(value){
		console.warn("deprecated: 由于即使设置了该值，在各平台和浏览器之间也不一定一致，inputElementYAdjuster已弃用。");
	});

	/**@inheritDoc */
	__getset(0,__proto,'text',function(){
		if (this._focus)
			return this.nativeInput.value;
		else
		return this._content || "";
		},function(value){
		Laya.superSet(Text,this,'color',this._originColor);
		value+='';
		if (this._focus){
			this.nativeInput.value=value || '';
			this.event("change");
			}else {
			if (!this._multiline)
				value=value.replace(/\r?\n/g,'');
			this._content=value;
			if (value)
				Laya.superSet(Text,this,'text',value);
			else {
				Laya.superSet(Text,this,'text',this._prompt);
				Laya.superSet(Text,this,'color',this.promptColor);
			}
		}
	});

	/**
	*设置输入提示符颜色。
	*/
	__getset(0,__proto,'promptColor',function(){
		return this._promptColor;
		},function(value){
		this._promptColor=value;
		if (!this._content)Laya.superSet(Text,this,'color',value);
	});

	// 因此 调用focus接口是无法都在移动平台立刻弹出键盘的
	/**
	*表示焦点是否在此实例上。
	*/
	__getset(0,__proto,'focus',function(){
		return this._focus;
		},function(value){
		var input=this.nativeInput;
		if (this._focus!==value){
			if (value){
				if (input.target){
					input.target._focusOut();
					}else {
					this._setInputMethod();
				}
				input.target=this;
				this._focusIn();
				}else {
				input.target=null;
				this._focusOut();
				Browser.document.body.scrollTop=0;
				input.blur();
				if (Render.isConchApp){
					input.setPos(-10000,-10000);
				}else if (Input.inputContainer.contains(input))
				Input.inputContainer.removeChild(input);
			}
		}
	});

	/**
	*获取对输入框的引用实例。
	*/
	__getset(0,__proto,'nativeInput',function(){
		return this._multiline ? Input.area :Input.input;
	});

	/**表示是否是多行输入框。*/
	__getset(0,__proto,'multiline',function(){
		return this._multiline;
		},function(value){
		this._multiline=value;
		this.valign=value ? "top" :"middle";
	});

	Input.__init__=function(){
		Input._createInputElement();
		if (Browser.onMobile)
			Render.canvas.addEventListener(Input.IOS_IFRAME ?(Browser.onMiniGame ? "touchend" :"click"):"touchend",Input._popupInputMethod);
	}

	Input._popupInputMethod=function(e){
		if (!laya.display.Input.isInputting)return;
		var input=laya.display.Input.inputElement;
		input.focus();
	}

	Input._createInputElement=function(){
		Input._initInput(Input.area=Browser.createElement("textarea"));
		Input._initInput(Input.input=Browser.createElement("input"));
		Input.inputContainer=Browser.createElement("div");
		Input.inputContainer.style.position="absolute";
		Input.inputContainer.style.zIndex=1E5;
		Browser.container.appendChild(Input.inputContainer);
		Input.inputContainer.setPos=function (x,y){Input.inputContainer.style.left=x+'px';Input.inputContainer.style.top=y+'px';};
	}

	Input._initInput=function(input){
		var style=input.style;
		style.cssText="position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;";
		style.resize='none';
		style.backgroundColor='transparent';
		style.border='none';
		style.outline='none';
		style.zIndex=1;
		input.addEventListener('input',Input._processInputting);
		input.addEventListener('mousemove',Input._stopEvent);
		input.addEventListener('mousedown',Input._stopEvent);
		input.addEventListener('touchmove',Input._stopEvent);
		input.setFontFace=function (fontFace){input.style.fontFamily=fontFace;};
		if(!Render.isConchApp){
			input.setColor=function (color){input.style.color=color;};
			input.setFontSize=function (fontSize){input.style.fontSize=fontSize+'px';};
		}
	}

	Input._processInputting=function(e){
		var input=laya.display.Input.inputElement.target;
		if (!input)return;
		var value=laya.display.Input.inputElement.value;
		if (input._restrictPattern){
			value=value.replace(/\u2006|\x27/g,"");
			if (input._restrictPattern.test(value)){
				value=value.replace(input._restrictPattern,"");
				laya.display.Input.inputElement.value=value;
			}
		}
		input._text=value;
		input.event("input");
	}

	Input._stopEvent=function(e){
		if (e.type=='touchmove')
			e.preventDefault();
		e.stopPropagation && e.stopPropagation();
	}

	Input.TYPE_TEXT="text";
	Input.TYPE_PASSWORD="password";
	Input.TYPE_EMAIL="email";
	Input.TYPE_URL="url";
	Input.TYPE_NUMBER="number";
	Input.TYPE_RANGE="range";
	Input.TYPE_DATE="date";
	Input.TYPE_MONTH="month";
	Input.TYPE_WEEK="week";
	Input.TYPE_TIME="time";
	Input.TYPE_DATE_TIME="datetime";
	Input.TYPE_DATE_TIME_LOCAL="datetime-local";
	Input.TYPE_SEARCH="search";
	Input.input=null;
	Input.area=null;
	Input.inputElement=null;
	Input.inputContainer=null;
	Input.confirmButton=null;
	Input.promptStyleDOM=null;
	Input.inputHeight=45;
	Input.isInputting=false;
	Input.stageMatrix=null;
	__static(Input,
	['IOS_IFRAME',function(){return this.IOS_IFRAME=(Browser.onIOS && Browser.window.top !=Browser.window.self);}
	]);
	return Input;
})(Text)


	Laya.__init([EventDispatcher,LoaderManager,EaseManager,GBasicTextField,GList,GearSize,GearColor,UIPackage,GearAnimation,Transition,Timer,RelationItem,Render,LocalStorage,GearLook,Browser]);
	/**LayaGameStart**/
	new FairyguiLib();

})(window,document,Laya);

if (typeof define === 'function' && define.amd){
	define('laya.core', ['require', "exports"], function(require, exports) {
        'use strict';
        Object.defineProperty(exports, '__esModule', { value: true });
        for (var i in Laya) {
			var o = Laya[i];
            o && o.__isclass && (exports[i] = o);
        }
    });
}