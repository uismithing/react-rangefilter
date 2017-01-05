## React Rangefilter

Rangefilter is a React component designed for browsing linearly arranged data sets by range. The layout is comprised of two areas of interest: the range-browser and the focus-tray. The bounds-sliders determine the start and end of the browsed range which is then displayed across the entire width of the focus-tray. The range represents a collection of objects arranged by a sort-value, and is automatically sorted by string or number. The focus-tray is updated each time a bounds-slider position is changed. Both the range and the focus-tray support the ability to display a common HTML element as a background. An onChange callback returns the focus-tray .Parcel collection. An onClick callback returns the .Parcel object of clicked focus-tray element. The component is CSS rich and highly customizable.

### Features
  * Full React/Flux pattern
  * Minimal dependencies (lodash, react-draggable)
  * Callbacks for onClick and onChange
  * Fluid layout
  * CSS Rich

### Try it
See the demo at [http://www.uismithing.com/main/rangefilter](http://www.uismithing.com/main/rangefilter).

### Repository
[https://github.com/uismithing/react-rangefilter](https://github.com/uismithing/react-rangefilter)

### Install
`npm install react-rangefilter -s`

### Deploy
`import Rangefilter from "react-rangefilter"`

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
