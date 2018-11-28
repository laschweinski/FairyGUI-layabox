
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
		class:function(o,fullName,dic,_super,miniName){
			dic && (Laya.un(o.prototype,'toString',LAYABOX.toStringForDic));
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
	var iflash=window.iflash={utils:{}};
	var LAYABOX=window.LAYABOX=window.LAYABOX || {
		classmap:Laya.__classmap,
		systemClass:Laya.__sysClass,
	};
	Function.prototype.BIND$ = function(o) {
			this.__$BiD___ || (this.__$BiD___ = LAYABOX.__bindid++);
			o.BIND$__ || (o.BIND$__={});
			var fn=o.BIND$__[this.__$BiD___];
			if(fn) return fn;
			return o.BIND$__[this.__$BiD___]=this.bind(o);
	};
	Array.CASEINSENSITIVE = 1;
	Array.DESCENDING = 2;
	Array.NUMERIC = 16;
	Array.RETURNINDEXEDARRAY = 8;
	Array.UNIQUESORT = 4;
	Object.defineProperty(Array.prototype,'fixed',{enumerable: false});
	LAYABOX.__bindid=1;	
	LAYABOX.sortonNameArray2=function(array,name,options){
		(options===void 0)&& (options=0);
		var name0=name[0],name1=name[1],type=1;
		if (options==(16 | 2))type=-1;
		return array.sort(function(a,b){
			if (b[name0]==a[name0]){
				 return type *(a[name1]-b[name1]);
			}else return type *(a[name0]-b[name0]);
		});
	};
	LAYABOX.sortonNameArray=function(array,name,options){
		(options===void 0)&& (options=0);
		var name0=name[0],type=1;
		(options==(16 | 2)) && (type=-1);
		return array.sort(function(a,b){
			if (b[name0]==a[name0]){
				for (var i=1,sz=name.length;i < sz;i++){
					var tmp=name[i];
					if (b[tmp]!=a[tmp])return type *(a[tmp]-b[tmp]);
				}
				return 0;
			}
			else return type *(a[name0]-b[name0]);
		});
	};
	LAYABOX.arraypresort=Array.prototype.sort;
	Laya.un(Array.prototype,'sortOn',function(name,options){
		if(name instanceof Function) return this.sort(name);
		if((name instanceof Array)){
			if(name.length==0)return this;
			if(name.length==2)return LAYABOX.sortonNameArray2(this,name,options);
			if(name.length>2)return LAYABOX.sortonNameArray(this,name,options);name=name[0];
		}
		if (options==16)return this.sort(function(a,b){return a[name]-b[name];});
		if (options==2)return this.sort(function(a,b){return b[name]-a[name];});
		if (options==(16 | 2))return this.sort(function(a,b){return b[name]-a[name];});
		if (options==1) return this.sort();
		return this.sort(function(a,b){return a[name]-b[name];});
	});
	Laya.un(Array.prototype,'sort',function(value){
		if(value==16) return LAYABOX.arraypresort.call(this,function (a, b) {return a - b;});
		if(value==(16|2)) return LAYABOX.arraypresort.call(this,function (a, b) {return b - a;});
		if(value==1) return LAYABOX.arraypresort.call(this);
		return LAYABOX.arraypresort.call(this,value);
	});
	LAYABOX.bind=function(obj,fn){
		return obj==null || fn==null?null:fn.BIND$(obj);
	};
	var Dictionary=window.Dictionary=iflash.utils.Dictionary=function(){};	window.Dictionary.prototype=Object.prototype;
	Laya.__classmap['Dictionary']=Dictionary;
	LAYABOX.DICKEY=0;
	LAYABOX.DICKEYS=[];
	LAYABOX.toStringForDic=function(){(!this.__DICKEY__) && (Laya.un(this,'__DICKEY__',--LAYABOX.DICKEY),LAYABOX.DICKEYS['&layadic_'+this.__DICKEY__]=this);return '&layadic_'+this.__DICKEY__;};

	return Laya;
})(window,document);

	var __un=Laya.un,__uns=Laya.uns,__static=Laya.static,__class=Laya.class,__getset=Laya.getset,__newvec=Laya.__newvec,__bind=LAYABOX.bind;
	var LAYAFNVOID=function(){};
	var LAYAFNSTR=function(){return '';}
	var LAYAFNNULL=function(){return null;}
	var LAYAFNTRUE=function(){return true;}
	var LAYAFNFALSE=function(){return false;}
	var LAYAFN0=function(){return 0;}
	var LAYAFNARRAY = function() { return []; }
	var GETEACH = function(a) { return a?a:[]; }


	Laya.Main(function(){Laya.ilaya.onInit();});


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