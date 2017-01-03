import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import _ from "lodash";
import Draggable from "react-draggable";
//
import {updateState} from "../toolbox/toolbox";
//
export default class Rangefilter extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getChildContext()
	{
		// empty
	}
	getInitialState()
	{
		return({});
	}
	componentWillMount()
	{
		// empty
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let RangefilterpanelRef
			= this.refs.rangefilterpanel;
		let ScopetrackRef
			= this.refs.rangefilterscopetrackface;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let ScopefocusRef
			= this.refs.scopefocus;
		let PanelintervalsRef
			= this.refs.panelintervals;
		let FocustrayfaceRef
			= this.refs.focustrayface;
		let FocustrayIntervalpanRef
			= this.refs.focustrayintervalpan;
		let scopeLeft
			= ScopetrackRef.offsetLeft;
		let scopeWidth
			= ScopetrackRef.offsetWidth;
		let scopeHeight
			= ScopetrackRef.offsetHeight;
		let scopeTop
			= ScopetrackRef.offsetTop;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let rightboundWidth
			= ScopeRightboundRef.offsetWidth;
		let leftboundHeight
			= ScopeLeftboundRef.offsetHeight;
		let rightboundHeight
			= ScopeRightboundRef.offsetHeight;
		let boundarrowLeftY
			= -leftboundHeight;
		let boundarrowLeftX
			= -(leftboundWidth / 2);
		let boundarrowRightY
			= -rightboundHeight;
		let boundarrowRightX
			= -(rightboundWidth / 2);
		let boundarrowLeftTransform
			= "translateX(".concat(boundarrowLeftX.toString(), "px) ")
			.concat("translateY(".concat(boundarrowLeftY.toString(), "px)"));
		let boundarrowRightTransform
			= "translateX(".concat(boundarrowRightX.toString(), "px) ")
			.concat("translateY(".concat(boundarrowRightY.toString(), "px)"));
		let rangefilterpanelBackgroundColor
			= window.getComputedStyle(RangefilterpanelRef).getPropertyValue("background-color");
		let focustrayIntervalpanHeight
			= window.getComputedStyle(FocustrayIntervalpanRef).getPropertyValue("height");
		let panelintervalsLeftBorderStyle
			= (leftboundWidth / 2).toString()
			.concat("px solid ", rangefilterpanelBackgroundColor);
		let panelintervalsRightBorderStyle
			= (rightboundWidth / 2).toString()
			.concat("px solid ", rangefilterpanelBackgroundColor);
		let scopeRange
			= scopeWidth
			- (leftboundWidth / 2)
			- (rightboundWidth / 2);
		let leftboundLocation
			= (this.props.Leftbound.Location.indexOf("%") === -1)
			? parseInt(this.props.Leftbound.Location)
			: parseInt(this.props.Leftbound.Location) / 100 * scopeRange;
		let rightboundLocation
			= (this.props.Rightbound.Location.indexOf("%") === -1)
			? parseInt(this.props.Rightbound.Location)
			: parseInt(this.props.Rightbound.Location) / 100 * scopeRange;
		let scopefocusWidth
			= (rightboundLocation - (leftboundLocation + leftboundWidth)).toString().concat("px");
		//
		this.setListeners();
		//
		if(rightboundLocation <= (leftboundLocation + leftboundWidth))
		{
			console.error("rangefilter::bad initial values::The initial Location of the right Bound slider must be greater than the initial Location of the left Bound slider when initializing. Rangefilter did not start.");
		}
		else
		{
			updateState(scopeProxy,
			{
				"Scope":
				{
					"Style":
					{
						"width":"100%",
						"height":"auto",
						"box-sizing":"border-box"
					}
				},
				"Scopetrack":
				{
					"Face":
					{
						"Style":
						{
							"display":"block",
							"position":"relative",
							"width":"100%",
							"border-left":panelintervalsLeftBorderStyle,
							"border-right":panelintervalsRightBorderStyle,
							"box-sizing":"border-box"
						},
						"Classname":this.props.Scopetrack.Face.Classname
					},
					"Lens":
					{
						"Style":
						{
							"position":"absolute",
							"width":scopeWidth.toString().concat("px"),
							"border-left":panelintervalsLeftBorderStyle,
							"border-right":panelintervalsRightBorderStyle,
							"box-sizing":"border-box",
							"transform":"translateY(-100%)"
						},
						"Classname":this.props.Scopetrack.Lens.Classname
					}
				},
				"Panel":
				{
					"Style":
					{
						"width":"100%",
						"height":"auto",
						"box-sizing":"border-box"
					},
					"Classname":this.props.Panel.Classname
				},
				"Panelintervals":
				{
					"Style":
					{
						"position":"relative",
						"display":"inline-flex",
						"width":"auto",
						"height":focustrayIntervalpanHeight,
						"box-sizing":"border-box"
					},
					"Classname":this.props.Panelintervals.Classname
				},
				"Leftbound":
				{
					"Style":
					{
						"position":"absolute",
						"height":scopeHeight.toString().concat("px"),
						"cursor":"default",
						"box-sizing":"border-box"
					},
					"Classname":this.props.Leftbound.Classname,
					"State":{},
					"Markertop":
					{
						"Style":
						{
							"position":"absolute",
							"top":"-".concat(this.props.Leftbound.Markertop.Size.split(" ")[1]),
							"left":"50%",
							"width":this.props.Leftbound.Markertop.Size.split(" ")[0],
							"height":this.props.Leftbound.Markertop.Size.split(" ")[1],
							"transform":"translateX(-50%)"
						},
						"Svgstyle":
						{
							"display":"block"
						},
						"Points":this.props.Leftbound.Markertop.Points,
						"Fill":this.props.Leftbound.Markertop.Fill,
						"Size":this.props.Leftbound.Markertop.Size
					},
					"Markerbottom":
					{
						"Style":
						{
							"position":"absolute",
							"top":"100%",
							"left":"50%",
							"width":this.props.Leftbound.Markerbottom.Size.split(" ")[0],
							"height":this.props.Leftbound.Markerbottom.Size.split(" ")[1],
							"transform":"translateX(-50%)"
						},
						"Svgstyle":
						{
							"display":"block"
						},
						"Points":this.props.Leftbound.Markerbottom.Points,
						"Fill":this.props.Leftbound.Markerbottom.Fill,
						"Size":this.props.Leftbound.Markerbottom.Size
					},
					"Profile":
					{
						"axis":"x",
						"bounds":
						{
							"top":0,
							"right":scopeWidth,
							"bottom":0,
							"left":0
						},
						"position":
						{
							"x":leftboundLocation,
							"y":0
						},
						"onStart":this.leftboundDragstart.bind(this),
						"onStop":this.leftboundDragstop.bind(this),
						"onDrag":this.leftboundDrag.bind(this)
					}
				},
				"Rightbound":
				{
					"Style":
					{
						"position":"absolute",
						"height":scopeHeight.toString().concat("px"),
						"cursor":"default",
						"box-sizing":"border-box"
					},
					"Classname":this.props.Rightbound.Classname,
					"State":{},
					"Markertop":
					{
						"Style":
						{
							"position":"absolute",
							"top":"-".concat(this.props.Rightbound.Markertop.Size.split(" ")[1]),
							"left":"50%",
							"width":this.props.Rightbound.Markertop.Size.split(" ")[0],
							"height":this.props.Rightbound.Markertop.Size.split(" ")[1],
							"transform":"translateX(-50%)"
						},
						"Svgstyle":
						{
							"display":"block"
						},
						"Points":this.props.Rightbound.Markertop.Points,
						"Fill":this.props.Rightbound.Markertop.Fill,
						"Size":this.props.Rightbound.Markertop.Size
					},
					"Markerbottom":
					{
						"Style":
						{
							"position":"absolute",
							"top":"100%",
							"left":"50%",
							"width":this.props.Rightbound.Markerbottom.Size.split(" ")[0],
							"height":this.props.Rightbound.Markerbottom.Size.split(" ")[1],
							"transform":"translateX(-50%)"
						},
						"Svgstyle":
						{
							"display":"block"
						},
						"Points":this.props.Rightbound.Markerbottom.Points,
						"Fill":this.props.Rightbound.Markerbottom.Fill,
						"Size":this.props.Rightbound.Markerbottom.Size
					},
					"Profile":
					{
						"axis":"x",
						"bounds":
						{
							"top":0,
							"right":scopeWidth,
							"bottom":0,
							"left":0
						},
						"position":
						{
							"x":rightboundLocation,
							"y":0
						},
						"onStart":this.rightboundDragstart.bind(this),
						"onStop":this.rightboundDragstop.bind(this),
						"onDrag":this.rightboundDrag.bind(this)
					}
				},
				"Scopefocus":
				{
					"Style":
					{
						"position":"absolute",
						"width":scopefocusWidth,
						"height":scopeHeight.toString().concat("px"),
						"cursor":"default"
					},
					"Profile":
					{
						"axis":"x",
						"bounds":
						{
							"top":0,
							"right":scopeWidth,
							"bottom":0,
							"left":0
						},
						"position":
						{
							"x":(leftboundLocation + leftboundWidth),
							"y":0
						},
						"onStart":this.scopefocusDragstart.bind(this),
						"onStop":this.scopefocusDragstop.bind(this),
						"onDrag":this.scopefocusDrag.bind(this)
					},
					"Bounds":
					{
						"Collection":[]
					}
				},
				"Focustray":
				{
					"Panel":
					{
						"Style":
						{
							"width":"100%",
							"height":"auto",
							"padding":"20px 0 0 0"
						}
					},
					"Markerspan":
					{
						"Style":
						{
							"width":"100%",
							"height":"auto",
							"box-sizing":"border-box"
						}
					},
					"Intervalpan":
					{
						"Style":
						{
							"width":"100%",
							"height":"auto",
							"border-left":panelintervalsLeftBorderStyle,
							"border-right":panelintervalsRightBorderStyle,
							"overflow":"hidden",
							"box-sizing":"border-box"
						}
					},
					"Spanitems":
					{
						"Style":
						{
							"width":"100%",
							"height":"100%",
							"box-sizing":"border-box"
						}
					},
					"Face":
					{
						"Style":
						{
							"width":"100%",
							"border-left":panelintervalsLeftBorderStyle,
							"border-right":panelintervalsRightBorderStyle,
							"overflow-x":"scroll",
							"overflow-y":"hidden",
							"box-sizing":"border-box"
						},
						"Classname":this.props.Focustray.Face.Classname
					},
					"Lens":
					{
						"Style":
						{
							"position":"absolute",
							"width":scopeWidth.toString().concat("px"),
							"border-left":panelintervalsLeftBorderStyle,
							"border-right":panelintervalsRightBorderStyle,
							"pointer-events":"none",
							"box-sizing":"border-box",
							"transform":"translateY(-100%)"
						},
						"Classname":this.props.Focustray.Lens.Classname
					}
				},
				"Sortedrange":
				{
					"Collection":[],
					"Rangefactor":1
				}
			});
		}
		//
		// The values for z-index on the <Draggable> elements
		// need to be explicitly assigned. Assigned z-index
		// values from within render() (via JSX) do not appear on the
		// element once rendered to the DOM.
		Object.assign(ScopeLeftboundRef.style,
		{
			"zIndex":999
		});
		Object.assign(ScopeRightboundRef.style,
		{
			"zIndex":999
		});
		Object.assign(ScopefocusRef.style,
		{
			"zIndex":999
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		let scopeProxy
			= this;
		let scopeRange
			= this.props.Range;
		let ScopetrackRef
			= scopeProxy.refs.rangefilterscopetrackface;
		let scopeWidth
			= ScopetrackRef.offsetWidth;
		//
		window.requestAnimationFrame(function()
		{
			if(scopeProxy.state.Panelintervals.Rendered !== true)
			{
				updateState(scopeProxy,
				{
					"Panelintervals":
					{
						"Rendered":true
					}
				});
				scopeProxy.validateIntervals(scopeRange);
			}
		});
	}
	render()
	{
		let leftboundprofileOnmount =
			{
				"axis":"x",
				"bounds":
				{
					"top":0,
					"right":100,
					"bottom":0,
					"left":0
				}
			}
		//
		let rightboundprofileOnmount =
			{
				"axis":"x",
				"bounds":
				{
					"top":0,
					"right":100,
					"bottom":0,
					"left":0
				}
			}
		//
		let scopefocusprofileOnmount =
			{
				"axis":"x",
				"bounds":
				{
					"top":0,
					"right":100,
					"bottom":0,
					"left":0
				}
			}
		//
		let panelClassname
			= _.has(this, "state.Panel.Classname")
			? this.state.Panel.Classname
			: "rangefilter-panel";
		let panelStyle
			= _.has(this, "state.Panel.Style")
			? this.state.Panel.Style
			: null;
		let panelintervalsClassname
			= _.has(this, "state.Panelintervals.Classname")
			? this.state.Panelintervals.Classname
			: "rangefilter-panel-intervals";
		let panelintervalsStyle
			= _.has(this, "state.Panelintervals.Style")
			? this.state.Panelintervals.Style
			: null;
		let scopeStyle
			= _.has(this, "state.Scope.Style")
			? this.state.Scope.Style
			: null;
		let scopetrackfaceClassname
			= _.has(this, "state.Scopetrack.Face.Classname")
			? this.state.Scopetrack.Face.Classname
			: "rangefilter-scopetrack-face";
		let scopetracklensClassname
			= _.has(this, "state.Scopetrack.Lens.Classname")
			? this.state.Scopetrack.Lens.Classname
			: "rangefilter-scopetrack-lens";
		let scopetrackfaceStyle
			= _.has(this, "state.Scopetrack.Face.Style")
			? this.state.Scopetrack.Face.Style
			: null;
		let scopetracklensStyle
			= _.has(this, "state.Scopetrack.Lens.Style")
			? this.state.Scopetrack.Lens.Style
			: null;
		let leftboundStyle
			= _.has(this, "state.Leftbound.Style")
			? this.state.Leftbound.Style
			: null;
		let leftboundClassname
			= _.has(this, "state.Leftbound.Classname")
			? this.state.Leftbound.Classname
			: "rangefilter-scope-leftbound";
		let leftboundMarkertopStyle
			= _.has(this, "state.Leftbound.Markertop.Style")
			? this.state.Leftbound.Markertop.Style
			: null;
		let leftboundMarkertopSvgstyle
			= _.has(this, "state.Leftbound.Markertop.Svgstyle")
			? this.state.Leftbound.Markertop.Svgstyle
			: null;
		let leftboundMarkertopPoints
			= _.has(this, "state.Leftbound.Markertop.Points")
			? this.state.Leftbound.Markertop.Points
			: null;
		let leftboundMarkertopFill
			= _.has(this, "state.Leftbound.Markertop.Fill")
			? this.state.Leftbound.Markertop.Fill
			: null;
		let leftboundMarkertopSvgwidth
			= _.has(this, "state.Leftbound.Markertop.Size")
			? this.state.Leftbound.Markertop.Size.split(" ")[0]
			: "0px";
		let leftboundMarkertopSvgheight
			= _.has(this, "state.Leftbound.Markertop.Size")
			? this.state.Leftbound.Markertop.Size.split(" ")[1]
			: "0px";
		let leftboundMarkerbottomSvgwidth
			= _.has(this, "state.Leftbound.Markerbottom.Size")
			? this.state.Leftbound.Markerbottom.Size.split(" ")[0]
			: "0px";
		let leftboundMarkerbottomSvgheight
			= _.has(this, "state.Leftbound.Markerbottom.Size")
			? this.state.Leftbound.Markerbottom.Size.split(" ")[1]
			: "0px";
		let leftboundMarkerbottomStyle
			= _.has(this, "state.Leftbound.Markerbottom.Style")
			? this.state.Leftbound.Markerbottom.Style
			: null;
		let leftboundMarkerbottomSvgstyle
			= _.has(this, "state.Leftbound.Markerbottom.Svgstyle")
			? this.state.Leftbound.Markerbottom.Svgstyle
			: null;
		let leftboundMarkerbottomPoints
			= _.has(this, "state.Leftbound.Markerbottom.Points")
			? this.state.Leftbound.Markerbottom.Points
			: null;
		let leftboundMarkerbottomFill
			= _.has(this, "state.Leftbound.Markerbottom.Fill")
			? this.state.Leftbound.Markerbottom.Fill
			: null;
		let leftboundProfile
			= _.has(this, "state.Leftbound.Profile")
			? this.state.Leftbound.Profile
			: leftboundprofileOnmount;
		let rightboundStyle
			= _.has(this, "state.Rightbound.Style")
			? this.state.Rightbound.Style
			: null;
		let rightboundClassname
			= _.has(this, "state.Rightbound.Classname")
			? this.state.Rightbound.Classname
			: "rangefilter-scope-rightbound";
		let rightboundMarkertopStyle
			= _.has(this, "state.Rightbound.Markertop.Style")
			? this.state.Rightbound.Markertop.Style
			: null;
		let rightboundMarkertopSvgstyle
			= _.has(this, "state.Rightbound.Markertop.Svgstyle")
			? this.state.Rightbound.Markertop.Svgstyle
			: null;
		let rightboundMarkertopPoints
			= _.has(this, "state.Rightbound.Markertop.Points")
			? this.state.Rightbound.Markertop.Points
			: null;
		let rightboundMarkertopFill
			= _.has(this, "state.Rightbound.Markertop.Fill")
			? this.state.Rightbound.Markertop.Fill
			: null;
		let rightboundMarkerbottomStyle
			= _.has(this, "state.Rightbound.Markerbottom.Style")
			? this.state.Rightbound.Markerbottom.Style
			: null;
		let rightboundMarkerbottomSvgstyle
			= _.has(this, "state.Rightbound.Markerbottom.Svgstyle")
			? this.state.Rightbound.Markerbottom.Svgstyle
			: null;
		let rightboundMarkerbottomPoints
			= _.has(this, "state.Rightbound.Markerbottom.Points")
			? this.state.Rightbound.Markerbottom.Points
			: null;
		let rightboundMarkerbottomFill
			= _.has(this, "state.Rightbound.Markerbottom.Fill")
			? this.state.Rightbound.Markerbottom.Fill
			: null;
		let rightboundMarkertopSvgwidth
			= _.has(this, "state.Rightbound.Markertop.Size")
			? this.state.Rightbound.Markertop.Size.split(" ")[0]
			: "0px";
		let rightboundMarkertopSvgheight
			= _.has(this, "state.Rightbound.Markertop.Size")
			? this.state.Rightbound.Markertop.Size.split(" ")[1]
			: "0px";
		let rightboundMarkerbottomSvgwidth
			= _.has(this, "state.Rightbound.Markerbottom.Size")
			? this.state.Rightbound.Markerbottom.Size.split(" ")[0]
			: "0px";
		let rightboundMarkerbottomSvgheight
			= _.has(this, "state.Rightbound.Markerbottom.Size")
			? this.state.Rightbound.Markerbottom.Size.split(" ")[1]
			: "0px";
		let rightboundProfile
			= _.has(this, "state.Rightbound.Profile")
			? this.state.Rightbound.Profile
			: rightboundprofileOnmount;
		let scopefocusClassname
			= _.has(this, "state.Scopefocus.Classname")
			? this.state.Scopefocus.Classname
			: "rangefilter-scopefocus";
		let scopefocusStyle
			= _.has(this, "state.Scopefocus.Style")
			? this.state.Scopefocus.Style
			: null;
		let scopefocusProfile
			= _.has(this, "state.Scopefocus.Profile")
			? this.state.Scopefocus.Profile
			: scopefocusprofileOnmount;
		let focustraypanelStyle
			= _.has(this, "state.Focustray.Panel.Style")
			? this.state.Focustray.Panel.Style
			: null;
		let focustraymarkerspanStyle
			= _.has(this, "state.Focustray.Markerspan.Style")
			? this.state.Focustray.Markerspan.Style
			: null;
		let focustrayspanitemsStyle
			= _.has(this, "state.Focustray.Spanitems.Style")
			? this.state.Focustray.Spanitems.Style
			: null;
		let focustrayintervalpanStyle
			= _.has(this, "state.Focustray.Intervalpan.Style")
			? this.state.Focustray.Intervalpan.Style
			: null;
		let focustrayfaceClassname
			= _.has(this, "state.Focustray.Face.Classname")
			? this.state.Focustray.Face.Classname
			: "rangefilter-focustray-face";
		let focustraylensClassname
			= _.has(this, "state.Focustray.Lens.Classname")
			? this.state.Focustray.Lens.Classname
			: "rangefilter-focustray-lens";
		let focustrayfaceStyle
			= _.has(this, "state.Focustray.Face.Style")
			? this.state.Focustray.Face.Style
			: null;
		let focustraylensStyle
			= _.has(this, "state.Focustray.Lens.Style")
			? this.state.Focustray.Lens.Style
			: null;
		//
		return(
			<div id="rangefilter-panel-container" ref="rangefilterpanel" style={panelStyle} className={panelClassname}>
				<div id="rangefilter-scope-container" ref="rangefilterscope" style={scopeStyle}>
					<Draggable {...leftboundProfile}>
						<div id="scope-left-bound-container" ref="scopeleftbound" style={leftboundStyle} className={leftboundClassname}>
							<div id="bound-marker-lefttop-container" ref="boundmarkerlefttop" style={leftboundMarkertopStyle}>
								<svg width={leftboundMarkertopSvgwidth} height={leftboundMarkertopSvgheight} style={leftboundMarkertopSvgstyle}>
								  <polygon points={leftboundMarkertopPoints} fill={leftboundMarkertopFill}/>
								</svg>
							</div>
							<div id="bound-marker-leftbottom-container" ref="boundmarkerleftbottom" style={leftboundMarkerbottomStyle}>
								<svg width={leftboundMarkerbottomSvgwidth} height={leftboundMarkerbottomSvgheight}  style={leftboundMarkertopSvgstyle}>
								  <polygon points={leftboundMarkerbottomPoints} fill={leftboundMarkerbottomFill}/>
								</svg>
							</div>
						</div>
					</Draggable>
					<Draggable {...scopefocusProfile}>
						<div id="scope-focus-container" ref="scopefocus" style={scopefocusStyle} className={scopefocusClassname}></div>
					</Draggable>
					<Draggable {...rightboundProfile}>
						<div id="scope-right-bound-container" ref="scoperightbound"  style={rightboundStyle} className={rightboundClassname}>
							<div id="bound-marker-righttop-container" ref="boundmarkerrighttop" style={rightboundMarkertopStyle}>
								<svg width={rightboundMarkertopSvgwidth} height={rightboundMarkertopSvgheight} style={rightboundMarkertopSvgstyle}>
								  <polygon points={rightboundMarkertopPoints} fill={rightboundMarkertopFill}/>
								</svg>
							</div>
							<div id="bound-marker-rightbottom-container" ref="boundmarkerrightbottom" style={rightboundMarkerbottomStyle}>
								<svg  width={rightboundMarkerbottomSvgwidth} height={rightboundMarkerbottomSvgheight} style={rightboundMarkerbottomSvgstyle}>
								  <polygon points={rightboundMarkerbottomPoints} fill={rightboundMarkerbottomFill}/>
								</svg>
							</div>
						</div>
					</Draggable>
					<div id="rangefilter-scopetrackface-container" ref="rangefilterscopetrackface" style={scopetrackfaceStyle} className={scopetrackfaceClassname}></div>
					<div id="rangefilter-scopetracklens-container" ref="rangefilterscopetracklens" style={scopetracklensStyle} className={scopetracklensClassname}></div>
				</div>
				<div id="rangefilter-focustraypanel-container" ref="rangefilterfocustraypanel" style={focustraypanelStyle}>
					<div id="focustray-intervalpan-container" ref="focustrayintervalpan" style={focustrayintervalpanStyle} className={panelintervalsClassname}>
						<div id="panel-intervals-container" ref="panelintervals" style={panelintervalsStyle}></div>
					</div>
					<div id="focustray-markerspan-container" ref="focustraymarkerspan" style={focustraymarkerspanStyle}>
						<div id="focustray-face-container" ref="focustrayface" style={focustrayfaceStyle} className={focustrayfaceClassname}>
							<div id="focustray-spanitems-container" ref="focustrayspanitems" style={focustrayspanitemsStyle}></div>
						</div>
						<div id="focustray-lens-container" ref="focustraylens" style={focustraylensStyle} className={focustraylensClassname}></div>
					</div>
				</div>
			</div>
		);
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	setListeners()
	{
		let PanelintervalsRef
			= this.refs.panelintervals;
		let FocustrayfaceRef
			= this.refs.focustrayface;
		let scopeRange
			= this.props.Range;
		//
		FocustrayfaceRef.addEventListener("scroll", function(event)
		{
			let focustrayDeltaleft
				= -event.target.scrollLeft;
			//
			Object.assign(PanelintervalsRef.style,
			{
				"left":focustrayDeltaleft.toString().concat("px")
			});
		});
	}
	segmentClick(event)
	{
		this.props.Click(event);
	}
	validateIntervals(scopeRange)
	{
		let scopeProxy
			= this;
		let rangeIsValid
			= true;
		let rangeType
			= null;
		//
		scopeRange.map(function(rangeElement)
		{
			let elementType
				= (isNaN(Number(rangeElement.Segment.Sort)) === true)
				? typeof rangeElement.Segment.Sort
				: "number";
			//
			if(rangeType === null)
			{
				rangeType
				= elementType;
			}
			else if(elementType !== rangeType)
			{
				rangeIsValid
				= false;
			}
		});
		updateState(scopeProxy,
		{
			"Panelintervals":
			{
				"Type":rangeType
			}
		});
		if(rangeIsValid === true)
		{
			scopeRange.sort(function(first, second)
			{
				if(rangeType === "number")
				{
					var sortAction
						= Number(first.Segment.Sort)
						- Number(second.Segment.Sort);
					//
				}
				if(rangeType === "string")
				{
					var sortAction
						= (first.Segment.Sort > second.Segment.Sort)
						? 1
						: -1;
				}
				return sortAction;
			});
			window.requestAnimationFrame(function()
			{
				updateState(scopeProxy,
				{
					"Sortedrange":
					{
						"Collection":_.cloneDeep(scopeRange)
					}
				});
				scopeProxy.renderIntervals(_.cloneDeep(scopeRange));
				scopeProxy.captureScopeCollection();
			});
		}
		else
		{
			console.error("rangefilter::bad range values::Found dissimlar range types (typeof). Range intervals did not render.");
		}
	}
	renderIntervals(scopeRange)
	{
		let scopeProxy
			= this;
		let ScopetrackRef
			= this.refs.rangefilterscopetrackface;
		let ScopefocusRef
			= this.refs.scopefocus;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let PanelintervalsRef
			= this.refs.panelintervals;
		let FocustrayfaceRef
			= this.refs.focustrayface;
		let scopeLeftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let scopeRightboundWidth
			= ScopeRightboundRef.offsetWidth;
		let scopetrackWidth
			= ScopetrackRef.offsetWidth;
		let scopefocusWidth
			= ScopefocusRef.offsetWidth
			+ scopeLeftboundWidth / 2
			+ scopeRightboundWidth / 2;
		let scopeRangeClone
			= _.cloneDeep(scopeRange);
		let scopeRangeClone_
			= _.cloneDeep(scopeRange);
		let rangeType
			= this.state.Panelintervals.Type;
		let scopetrackBorderleftWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-left-width"));
		let scopetrackBorderrightWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-right-width"));
		let leftboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let leftboundTransformMatrix
			= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
		let leftboundMatrixSegments
			= leftboundMatrixRegExp.exec(leftboundTransformMatrix)[1].split(", ");
		let leftboundTranslateX
			= parseInt(leftboundMatrixSegments[4]);
		let scopePadding
			= 15;
		let scoperangeWidth
			= scopetrackWidth
			- scopetrackBorderleftWidth
			- scopetrackBorderrightWidth
			- scopePadding * 2;
		let scopefocusFactor
			= scoperangeWidth / scopefocusWidth;
		let scopeLeftboundLeft
			= -leftboundTranslateX * scopefocusFactor;
		let scopefocusScrollLeft
			= (leftboundTranslateX - scopetrackBorderleftWidth - scopeLeftboundWidth / 2) * scopefocusFactor;
		let firstElementSortvalue
			= scopeRange[0].Segment.Sort;
		//
		// For numeric Sort values, an additional object is added to
		// scopeRangeClone. This object becomes the final element in
		// the collection and acts as a spacer that causes room (1px)
		// to be left between the right edge of the scope-range and the
		// original final element. This enables the vertical segment
		// line to appear within the scope track.
		let rangeEndcapSortValue
			= Number(scopeRangeClone[(scopeRangeClone.length - 1)].Segment.Sort)
			+ (Number(scopeRangeClone[(scopeRangeClone.length - 1)].Segment.Sort) - firstElementSortvalue) / scopetrackWidth;
		//
		scopeRangeClone.push(
		{
			"Segment":
			{
				"Sort":rangeEndcapSortValue,
				"Class":""
			},
			"Label":
			{
				"Text":"",
				"Class":""
			}
		});
		let totalIntervalLabels
			= (rangeType === "number")
			? scopeRangeClone.length
			: scopeRange.length;
		let lastElementSortvalue
			= scopeRangeClone[(totalIntervalLabels - 1)].Segment.Sort;
		let elementLabelIndexCount
			= 0;
		let elementSegmentIndexCount
			= 0;
		let focustrayElementSegmentIndexCount
			= 0;
		let segmentWidth
			= [];
		let labelhostWidth
			= [];
		//
		let labelsStyle =
			{
				"position":"relative",
				"display":"inline-flex",
				"height":"100%",
				"padding":"0 0 0 ".concat(scopePadding.toString(), "px")
			}
		//
		let segmentsStyle =
			{
				"position":"relative",
				"display":"inline-flex",
				"height":"100%",
				"border-left":"solid ".concat(scopePadding.toString(), "px rgba(0,0,0,.1)"),
				"border-right":"solid ".concat(scopePadding.toString(), "px rgba(0,0,0,.1)"),
				"overflow":"hidden"
			}
		//
		if(rangeType === "string")
		{
			for(var intervalIndex in scopeRange)
			{
				var elementWidth
					= (intervalIndex < (totalIntervalLabels - 1))
					? scoperangeWidth / ((totalIntervalLabels - 1))
					- 1 / (totalIntervalLabels - 1)
					: 0;
				var focustrayElementWidth
					= (intervalIndex < (totalIntervalLabels - 1))
					? scoperangeWidth * scopefocusFactor / ((totalIntervalLabels - 1))
					- 1 / (totalIntervalLabels - 1)
					: 0;
				//
				segmentWidth.push(elementWidth.toString().concat("px"));
				labelhostWidth.push(focustrayElementWidth.toString().concat("px"));
			}
		}
		if(rangeType === "number")
		{
			for(var intervalIndex in scopeRangeClone)
			{
				var nextelementSortvalue
					= (intervalIndex < (totalIntervalLabels - 1))
					? scopeRangeClone[(Number(intervalIndex) + 1)].Segment.Sort
					: lastElementSortvalue;
				var elementSortdelta
					= Number(nextelementSortvalue)
					- Number(scopeRangeClone[intervalIndex].Segment.Sort);
				var elementWidth
					= elementSortdelta / (Number(lastElementSortvalue) - firstElementSortvalue) * scoperangeWidth;
				var focustrayElementWidth
					= elementSortdelta / (Number(lastElementSortvalue) - firstElementSortvalue) * scoperangeWidth * scopefocusFactor;
				//
				segmentWidth.push(elementWidth.toString().concat("px"));
				labelhostWidth.push(focustrayElementWidth.toString().concat("px"));
			}
		}
		let intervalLabels =
			scopeRangeClone.map(function(rangeElement)
			{
				let labelId
					= "rangefilter-interval-label";
				let labelClass
					= rangeElement.Label.Class;
				//
				let labelhostStyle =
					{
						"display":"inline-block",
						"position":"relative",
						"top":"100%",
						"width":labelhostWidth[elementLabelIndexCount],
						"float":"left"
					}
				//
				let labelStyle =
					{
						"display":"inline-block",
						"position":"relative",
						"padding":"0 0 0 .5rem",
						"vertical-align":"text-top",
						"white-space":"nowrap",
						"transform":"rotate(-90deg) translateY(-50%)",
						"transform-origin": "0% 0%"
					}
				//
				elementLabelIndexCount++;
				//
				return(
					<div id="rangefilter-intervallabel-host-container" style={labelhostStyle}>
						<div id="rangefilter-intervallabel-container" style={labelStyle} className={labelClass}>{rangeElement.Label.Text}</div>
					</div>
				);
			});
		//
		let intervalSegments =
			scopeRangeClone.map(function(rangeElement)
			{
				let segmentId
					= "rangefilter-intervalsegment-container_".concat(elementSegmentIndexCount.toString());
				let segmentBordercolor
					= rangeElement.Segment.Color;
				let segmentBorderstyle
					= (elementSegmentIndexCount === (totalIntervalLabels - 1))
					? "none"
					: "solid 1px ".concat(segmentBordercolor);
				let segmentClassname
					= rangeElement.Segment.Class;
				//
				let segmenthostStyle =
					{
						"display":"inline-block",
						"position":"relative",
						"top":"0px",
						"width":segmentWidth[elementSegmentIndexCount],
						"height":"100%",
						"float":"left",
						"border-left":segmentBorderstyle
					}
				//
				let focustraySegmenthostStyle =
					{
						"display":"inline-block",
						"position":"relative",
						"top":"0px",
						"width":labelhostWidth[elementSegmentIndexCount],
						"height":"100%",
						"float":"left",
						"border-left":segmentBorderstyle
					}
				//
				let handleClick =
					function(event)
					{
						scopeProxy.segmentClick(event);
					}
				//
				elementSegmentIndexCount++;
				//
				return(
					<div id={segmentId} style={segmenthostStyle} onClick={handleClick.bind(this, rangeElement)}></div>
				);
			});
		//
		let focustrayIntervalSegments =
			scopeRangeClone.map(function(rangeElement)
			{
				let segmentId
					= "rangefilter-intervalsegment-container_".concat(focustrayElementSegmentIndexCount.toString());
				let segmentBordercolor
					= rangeElement.Segment.Color;
				let segmentBorderstyle
					= (focustrayElementSegmentIndexCount === (totalIntervalLabels - 1))
					? "none"
					: "solid 1px ".concat(segmentBordercolor);
				let segmentClassname
					= rangeElement.Segment.Class;
				let segmentHtml
					= rangeElement.Segment.Html;
				//
				let segmenthostStyle =
					{
						"display":"inline-block",
						"position":"relative",
						"top":"0px",
						"width":labelhostWidth[focustrayElementSegmentIndexCount],
						"height":"100%",
						"float":"left",
						"border-left":segmentBorderstyle,
						"overflow":"hidden"
					}
				//
				let handleClick =
					function(event)
					{
						scopeProxy.segmentClick(event);
					}
				//
				focustrayElementSegmentIndexCount++;
				//
				return(
					<div id={segmentId} style={segmenthostStyle} className={segmentClassname} onClick={handleClick.bind(this, rangeElement)}>
						<div dangerouslySetInnerHTML={{"__html":segmentHtml}}/>
					</div>
				);
			});
		//
		ReactDOM.render(<div id="rangefilter-intervallabels-container" style={labelsStyle}>{intervalLabels}</div>, document.getElementById("panel-intervals-container"));
		ReactDOM.render(<div id="rangefilter-intervalsegments-container" style={segmentsStyle}>{intervalSegments}</div>, document.getElementById("rangefilter-scopetrackface-container"));
		ReactDOM.render(<div id="focustray-intervalsegments-container" style={segmentsStyle}>{focustrayIntervalSegments}</div>, document.getElementById("focustray-spanitems-container"));
		//
		for(var segmentIndex in scopeRange)
		{
			let segmentId
				= "rangefilter-intervalsegment-container_".concat(segmentIndex.toString());
			let segmentOffsetLeft
				= document.getElementById(segmentId).offsetLeft;
			//
			scopeRange[segmentIndex].Segment.Left
			= segmentOffsetLeft;
		}
		Object.assign(FocustrayfaceRef,
		{
			"scrollLeft":scopefocusScrollLeft
		});
		updateState(scopeProxy,
		{
			"Sortedrange":
			{
				"Collection":_.cloneDeep(scopeRange)
			}
		});
	}
	leftboundDragstart(event)
	{
		let scopeProxy
			= this;
		let ScopeRef
			= this.refs.rangefilterscope;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let scopeWidth
			= ScopeRef.offsetWidth;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let regExp
			= new RegExp(/\(([^)]+)\)/g);
		let rightboundTransformMatrix
			= window.getComputedStyle(ScopeRightboundRef, null).getPropertyValue("transform");
		let rightboundMatrixSegments
			= regExp.exec(rightboundTransformMatrix)[1].split(", ");
		let rightboundTranslateX
			= parseInt(rightboundMatrixSegments[4]);
		let adjustedRightLimit
			= rightboundTranslateX
			- parseInt(leftboundWidth);
		//
		// The .position property is used to assign a position
		// to the <Draggable> target. However, the property
		// exists, it will prevent the user from dragging
		// the target. Removing the property re-enables
		// user initiated dragging.
		if(_.has(this, "state.Leftbound.Profile.position") === true)
		{
			delete this.state.Leftbound.Profile.position;
		}
		updateState(scopeProxy,
		{
			"Leftbound":
			{
				"Profile":
				{
					"bounds":
					{
						"top":0,
						"right":adjustedRightLimit,
						"bottom":0,
						"left":0
					}
				}
			}
		});
	}
	leftboundDragstop(event)
	{
		let scopeProxy
			= this;
		let ScopetrackRef
			= this.refs.rangefilterscopetrackface;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let scopetrackBorderleftWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-left-width"));
		let leftboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let rightboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		//
		window.requestAnimationFrame(function()
		{
			let leftboundTransformMatrix
				= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
			let rightboundTransformMatrix
				= window.getComputedStyle(ScopeRightboundRef, null).getPropertyValue("transform");
			let leftboundMatrixSegments
				= leftboundMatrixRegExp.exec(leftboundTransformMatrix)[1].split(", ");
			let rightboundMatrixSegments
				= rightboundMatrixRegExp.exec(rightboundTransformMatrix)[1].split(", ");
			let leftboundTranslateX
				= parseInt(leftboundMatrixSegments[4]);
			let rightboundTranslateX
				= parseInt(rightboundMatrixSegments[4]);
			let scopefocusWidth
				= (rightboundTranslateX - (leftboundTranslateX + leftboundWidth)).toString().concat("px");
			let scopefocusLeft
				= leftboundTranslateX
				+ leftboundWidth;
			//
			updateState(scopeProxy,
			{
				"Leftbound":
				{
					"State":event
				},
				"Scopefocus":
				{
					"Style":
					{
						"width":scopefocusWidth
					},
					"Profile":
					{
						"position":
						{
							"x":scopefocusLeft,
							"y":0
						}
					}
				}
			});
			window.requestAnimationFrame(function()
			{
				scopeProxy.captureScopeCollection();
				scopeProxy.renderIntervals(scopeProxy.state.Sortedrange.Collection);
			});
		});
	}
	leftboundDrag(event)
	{
		let scopeProxy
			= this;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let leftboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let rightboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		//
		window.requestAnimationFrame(function()
		{
			let leftboundTransformMatrix
				= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
			let rightboundTransformMatrix
				= window.getComputedStyle(ScopeRightboundRef, null).getPropertyValue("transform");
			let leftboundMatrixSegments
				= leftboundMatrixRegExp.exec(leftboundTransformMatrix)[1].split(", ");
			let rightboundMatrixSegments
				= rightboundMatrixRegExp.exec(rightboundTransformMatrix)[1].split(", ");
			let leftboundTranslateX
				= parseInt(leftboundMatrixSegments[4]);
			let rightboundTranslateX
				= parseInt(rightboundMatrixSegments[4]);
			let scopefocusWidth
				= (rightboundTranslateX - (leftboundTranslateX + leftboundWidth)).toString().concat("px");
			let scopefocusLeft
				= leftboundTranslateX
				+ leftboundWidth;
			//
			updateState(scopeProxy,
			{
				"Leftbound":
				{
					"State":event
				},
				"Scopefocus":
				{
					"Style":
					{
						"width":scopefocusWidth
					},
					"Profile":
					{
						"position":
						{
							"x":scopefocusLeft,
							"y":0
						}
					}
				}
			});
		});
	}
	rightboundDragstart(event)
	{
		let scopeProxy
			= this;
		let ScopetrackRef
			= this.refs.rangefilterscopetrackface;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let rightboundWidth
			= ScopeRightboundRef.offsetWidth;
		let scopetrackWidth
			= ScopetrackRef.offsetWidth;
		let scopetrackBorderleftWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-left-width"));
		let scopetrackBorderrightWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-right-width"));
		let scopetrackEnd
			= scopetrackWidth
			- scopetrackBorderrightWidth
			- rightboundWidth / 2;
		let regExp
			= new RegExp(/\(([^)]+)\)/g);
		let leftboundTransformMatrix
			= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
		let leftboundMatrixSegments
			= regExp.exec(leftboundTransformMatrix)[1].split(", ");
		let leftboundTranslateX
			= parseInt(leftboundMatrixSegments[4]);
		let adjustedLeftLimit
			= leftboundTranslateX
			+ parseInt(leftboundWidth);
		//
		// The .position property is used to assign a location (x,y)
		// to the <Draggable> target. However, the property
		// exists, it will prevent the user from dragging
		// the target. Removing the property re-enables
		// user initiated dragging.
		if(_.has(this, "state.Rightbound.Profile.position") === true)
		{
			delete this.state.Rightbound.Profile.position;
		}
		updateState(scopeProxy,
		{
			"Rightbound":
			{
				"Profile":
				{
					"bounds":
					{
						"top":0,
						"right":scopetrackEnd,
						"bottom":0,
						"left":adjustedLeftLimit
					}
				}
			}
		});
	}
	rightboundDragstop(event)
	{
		let scopeProxy
			= this;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let leftboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let rightboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		//
		window.requestAnimationFrame(function()
		{
			let leftboundTransformMatrix
				= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
			let rightboundTransformMatrix
				= window.getComputedStyle(ScopeRightboundRef, null).getPropertyValue("transform");
			let leftboundMatrixSegments
				= leftboundMatrixRegExp.exec(leftboundTransformMatrix)[1].split(", ");
			let rightboundMatrixSegments
				= rightboundMatrixRegExp.exec(rightboundTransformMatrix)[1].split(", ");
			let leftboundTranslateX
				= parseInt(leftboundMatrixSegments[4]);
			let rightboundTranslateX
				= parseInt(rightboundMatrixSegments[4]);
			let scopefocusWidth
				= (rightboundTranslateX - (leftboundTranslateX + leftboundWidth)).toString().concat("px");
			//
			updateState(scopeProxy,
			{
				"Leftbound":
				{
					"State":event
				},
				"Scopefocus":
				{
					"Style":
					{
						"width":scopefocusWidth
					}
				}
			});
			window.requestAnimationFrame(function()
			{
				scopeProxy.captureScopeCollection();
				scopeProxy.renderIntervals(scopeProxy.state.Sortedrange.Collection);
			});
		});
	}
	rightboundDrag(event)
	{
		let scopeProxy
			= this;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let leftboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let rightboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		//
		window.requestAnimationFrame(function()
		{
			let leftboundTransformMatrix
				= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
			let rightboundTransformMatrix
				= window.getComputedStyle(ScopeRightboundRef, null).getPropertyValue("transform");
			let leftboundMatrixSegments
				= leftboundMatrixRegExp.exec(leftboundTransformMatrix)[1].split(", ");
			let rightboundMatrixSegments
				= rightboundMatrixRegExp.exec(rightboundTransformMatrix)[1].split(", ");
			let leftboundTranslateX
				= parseInt(leftboundMatrixSegments[4]);
			let rightboundTranslateX
				= parseInt(rightboundMatrixSegments[4]);
			let scopefocusWidth
				= (rightboundTranslateX - (leftboundTranslateX + leftboundWidth)).toString().concat("px");
			//
			updateState(scopeProxy,
			{
				"Rightbound":
				{
					"State":event
				},
				"Scopefocus":
				{
					"Style":
					{
						"width":scopefocusWidth
					}
				}
			});
		});
	}
	scopefocusDragstart(event)
	{
		let scopeProxy
			= this;
		let ScopetrackRef
			= this.refs.rangefilterscopetrackface;
		let ScopefocusRef
			= this.refs.scopefocus;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let rightboundWidth
			= ScopeRightboundRef.offsetWidth;
		let scopetrackWidth
			= ScopetrackRef.offsetWidth;
		let scopefocusWidth
			= ScopefocusRef.offsetWidth;
		let scopetrackBorderleftWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-left-width"));
		let scopetrackBorderrightWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-right-width"));
		let scopetrackStart
			= scopetrackBorderleftWidth
			+ leftboundWidth / 2;
		let scopetrackEnd
			= scopetrackWidth
			- scopetrackBorderrightWidth
			- rightboundWidth / 2
			- scopefocusWidth;
		//
		// The .position property is used to assign a location (x,y)
		// to the <Draggable> target. However, the property
		// exists, it will prevent the user from dragging
		// the target. Removing the property re-enables
		// user initiated dragging.
		if(_.has(this, "state.Scopefocus.Profile.position") === true)
		{
			delete this.state.Scopefocus.Profile.position;
		}
		updateState(scopeProxy,
		{
			"Scopefocus":
			{
				"State":event,
				"Profile":
				{
					"bounds":
					{
						"top":0,
						"right":scopetrackEnd,
						"bottom":0,
						"left":scopetrackStart
					}
				}
			}
		});
	}
	scopefocusDragstop(event)
	{
		let scopeProxy
			= this;
		//
		this.captureScopeCollection();
		//
		window.requestAnimationFrame(function()
		{
			scopeProxy.renderIntervals(scopeProxy.state.Sortedrange.Collection);
		});
	}
	scopefocusDrag(event)
	{
		let scopeProxy
			= this;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let ScopefocusRef
			= this.refs.scopefocus;
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let scopefocusWidth
			= ScopefocusRef.offsetWidth;
		let scopefocusMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		//
		window.requestAnimationFrame(function()
		{
			let scopefocusTransformMatrix
				= window.getComputedStyle(ScopefocusRef, null).getPropertyValue("transform");
			let scopefocusMatrixSegments
				= scopefocusMatrixRegExp.exec(scopefocusTransformMatrix)[1].split(", ");
			let scopefocusTranslateX
				= parseInt(scopefocusMatrixSegments[4]);
			let leftboundPositionX
				= scopefocusTranslateX
				- leftboundWidth;
			let rightboundPositionX
				= scopefocusTranslateX
				+ scopefocusWidth;
			//
			updateState(scopeProxy,
			{
				"Leftbound":
				{
					"Profile":
					{
						"position":
						{
							"x":leftboundPositionX,
							"y":0
						}
					}
				},
				"Rightbound":
				{
					"Profile":
					{
						"position":
						{
							"x":rightboundPositionX,
							"y":0
						}
					}
				},
				"Scopefocus":
				{
					"State":event
				}
			});
		});
	}
	updateFocusTray()
	{
		//
	}
	captureScopeCollection()
	{
		let scopeProxy
			= this;
		let ScopeLeftboundRef
			= this.refs.scopeleftbound;
		let ScopeRightboundRef
			= this.refs.scoperightbound;
		let ScopetrackRef
			= this.refs.rangefilterscopetrackface;
		let sortedRangeCollection
			= _.cloneDeep(this.state.Sortedrange.Collection);
		let leftboundWidth
			= ScopeLeftboundRef.offsetWidth;
		let rightboundWidth
			= ScopeRightboundRef.offsetWidth;
		let scopetrackBorderleftWidth
			= parseInt(window.getComputedStyle(ScopetrackRef, null).getPropertyValue("border-left-width"));
		let rangeSegmentsBorderleft
			= parseInt(window.getComputedStyle(document.getElementById("rangefilter-intervalsegments-container"), null).getPropertyValue("border-left-width"));
		let leftboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let rightboundMatrixRegExp
			= new RegExp(/\(([^)]+)\)/g);
		let captureGroup
			= [];
		//
		window.requestAnimationFrame(function()
		{
			let leftboundTransformMatrix
				= window.getComputedStyle(ScopeLeftboundRef, null).getPropertyValue("transform");
			let rightboundTransformMatrix
				= window.getComputedStyle(ScopeRightboundRef, null).getPropertyValue("transform");
			let leftboundMatrixSegments
				= leftboundMatrixRegExp.exec(leftboundTransformMatrix)[1].split(", ");
			let rightboundMatrixSegments
				= rightboundMatrixRegExp.exec(rightboundTransformMatrix)[1].split(", ");
			let leftboundTranslateX
				= parseInt(leftboundMatrixSegments[4]);
			let rightboundTranslateX
				= parseInt(rightboundMatrixSegments[4]);
			let leftboundCenterline
				= leftboundTranslateX
				+ leftboundWidth / 2
				- scopetrackBorderleftWidth
				- rangeSegmentsBorderleft;
			let rightboundCenterline
				= rightboundTranslateX
				+ rightboundWidth / 2
				- scopetrackBorderleftWidth
				- rangeSegmentsBorderleft;
			//
			sortedRangeCollection.map(function(collectionItem)
			{
				let itemLeft
					= collectionItem.Segment.Left;
				//
				if(itemLeft >= leftboundCenterline
				&& itemLeft <= rightboundCenterline)
				{
					captureGroup.push(collectionItem)
				}
			});
			scopeProxy.props.Change(captureGroup);
		});
	}
	//*************************
	//*************************
	// Assignments
	//
	static contextTypes =
		{
			// empty
		}
	//
}