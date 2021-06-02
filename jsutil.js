/****************************************************************************** 
 * jsutil 
 * Reactive and quick Javascript
 * Author: Sirvan Almasi at Imperial College London
 * s.almasi@imperial.ac.uk
 *****************************************************************************/
// TODO: Set multiple variable states at once
//

// Find an element by Id
const find = id => document.getElementById(id);

// Shortened version of addEventListener
const listen = (el, event, func) => el.addEventListener(event, func);

// createElement short version 
const ce = (el, attrs={}, content=null, child=null) => {
  const µ = document.createElement(el);
  elContent(µ, content);
  if (child) µ.appendChild(child);
  for (const [key, value] of Object.entries(attrs)) {
    µ.setAttribute(key, value);}
  return µ;}

/*
 * µ: element that we want to place the content in
 * ß: content of the element [atom, value]
 */
const elContent = (µ, ß) => {
  if (ß != null) {
    if (ß[0].isAtom) {
      µ.textContent = ß[0].getValue(ß[1]);	
      contentListener(µ, ß[0], ß[1]);}
  else { µ.textContent = ß;}}}

/* Create a listener for our element */
const contentListener = (obj, atom, newVal) => {
  atom.listeners.add(obj);
  listen(obj, atom.evName, (e) => {
    obj.textContent = atom.getValue(newVal);});}

// createElement but for a div
const div = (attrs={}, content=null, child=null) =>
  ce("div", attrs, content, child);

class Atom {
  constructor(value, eventName=null) {
    this.state = value;
    this.listeners = new Set();
    this.eventName = eventName | Math.random().toString(36).substring(7);
    this.ev = new CustomEvent(this.eventName, {
      detail: { hazcheeseburger: true }});}

  static name = "Atom";

  get isAtom() {
    return true;}

  get event() {
    return this.event;}

  get evName() {
    return this.eventName;}

  getValue(obj) {
    return this.state[obj];}

  get val() {
    return this.state;}	

  set(obj, newVal) {
    this.state[obj] = newVal;
    for(let µ of this.listeners) { µ.dispatchEvent(this.ev)}}}

// Keyword shortcuts
const ƒ = ce,
      δ = ce,
      _ = undefined;
