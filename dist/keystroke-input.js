(()=>{"use strict";const t=0,e=1,i=2,s=3,n=/Mac|Windows|Linux/gi,r={alt:"⌥",ctrl:"⌃",meta:"⌘",shift:"⇧"},a={alt:"Alt",ctrl:"Ctrl",meta:"Windows",shift:"Shift"},o={alt:"Alt",ctrl:"Ctrl",meta:"Super",shift:"Shift"},l=function(){switch(function(){const r=window.navigator.userAgent;let a=t;const o=r.match(n)[0].toLowerCase();if(!o)return a;switch(o){case"mac":a=e;break;case"windows":a=i;break;case"linux":a=s}return a}()){case e:return r;case i:return a;case s:return o}}();class h{modifiers={alt:!1,ctrl:!1,meta:!1,shift:!1};key="";constructor(t,e){t&&(this.modifiers=t),e&&(this.key=e)}toString(){let t="";return this.modifiers.alt&&(t+=l?.alt+" "),this.modifiers.ctrl&&(t+=l?.ctrl+" "),this.modifiers.meta&&(t+=l?.meta+" "),this.modifiers.shift&&(t+=l?.shift+" "),t+this.key}toJSON(){const t={modifiers:this.modifiers,key:this.key};return JSON.stringify(t)}validateAgainst(t){return t.altKey==this.modifiers.alt&&t.ctrlKey==this.modifiers.ctrl&&t.metaKey==this.modifiers.meta&&t.shiftKey==this.modifiers.shift&&t.code=="Key"+this.key.toUpperCase()}}const c=["ShiftLeft","ShiftRight","AltLeft","AltRight","ControlLeft","ControlRight","MetaLeft","MetaRight","ContextMenu","NumLock","ScrollLock","VolumeMute","VolumeDown","VolumeUp","MediaSelect","LaunchApp1","LaunchApp2"];class d extends HTMLInputElement{keystrokeValue;constructor(){super()}connectedCallback(){this.addEventListener("keyup",this.handleKeyUpEvent),this.addEventListener("keydown",this.handleKeyDownEvent),this.addEventListener("keypress",this.bypassEvent),this.setAttribute("readonly","true")}handleKeyDownEvent(t){if(t.repeat)return;const e=function(t){let e=!0;return c.includes(t)&&(e=!1),e}(t.code)?t.code.replace(/Key|Digit/gi,""):"",i=t.altKey,s=t.ctrlKey,n=t.metaKey,r=t.shiftKey,a=new h;a.modifiers={alt:i,ctrl:s,meta:n,shift:r},a.key=e,this.value=a.toString(),this.keystrokeValue=a;const o=new CustomEvent("keystrokechange",{detail:{keystroke:this.keystrokeValue}});return this.dispatchEvent(o),t.preventDefault(),t.stopImmediatePropagation(),!1}handleKeyUpEvent(t){return this.blur(),t.preventDefault(),t.stopImmediatePropagation(),!1}bypassEvent(t){return t.preventDefault(),t.stopImmediatePropagation(),!1}disconnectedCallback(){this.removeEventListener("keyup",this.handleKeyUpEvent),this.removeEventListener("keydown",this.handleKeyDownEvent),this.removeEventListener("keypress",this.bypassEvent)}}document.addEventListener("DOMContentLoaded",(t=>{customElements.define("input-keystroke",d,{extends:"input"})}))})();