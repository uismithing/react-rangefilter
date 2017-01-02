## React Rangefilter

React UI component for filtering linearly arranged data. The layout is comprised of two areas of interest: the range-browser and the focus-tray. The bounds-sliders determine the start and end of the browsed range which is then displayed across the entire width of the focus-tray. The range is a colleciton of objects arranged by a sort-value, and is automatically sorted by string or number. The focus-tray is updated each time a bounds-slider position is changed.

### Try it
See the demo at [http://www.uismithing.com/main/rangefilter](http://www.uismithing.com/main/rangefilter).

### Repository


### Install

`npm install react-rangefilter --save`

### Features
  * Full React/Flux pattern
  * Minimal dependencies (lodash, react-draggable)
  * Callbacks for onClick and onChange
  * Fluid layout
  * CSS Rich

### Deploy
`import Rangefilter from "rangefilter"`

`<Rangefilter {...props}/>`

### props
  * Panel:{}
  * Panelintervals:{}
  * Scopetrack:{}
  * Focustray:{}
  * Leftbound:{}
  * Rightbound:{}
  * Change:=>
  * Click:=>
  * Range:[{},...{}]
