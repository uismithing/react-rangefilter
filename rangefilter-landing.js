import React, {Component, PropTypes} from "react";
import ReactDOM from "react-dom";
import {connect} from "react-redux";
import {Panel} from "react-bootstrap";
import Highlight from "react-syntax-highlight";
import Rangefilter from "react-rangefilter";
//
import {fetchRangefilterHtml} from "../actions/actions_rangefilter-landing";
import {fetchHistoryJson} from "../actions/actions_rangefilter-landing";
import {fetchRangefilterPropsexampleJs} from "../actions/actions_rangefilter-landing";
import {fetchRangefilterPropsDemoexampleJson} from "../actions/actions_rangefilter-landing";
import {fetchRangefilterRangeDemoexampleJson} from "../actions/actions_rangefilter-landing";
import {fetchRangefilterCssDemoexampleCss} from "../actions/actions_rangefilter-landing";
//
import BackgroundCanvas from "../components/background-canvas";
import {updateState} from "../toolbox/toolbox";
import ReactGA from "react-ga";
//
class RangefilterLanding extends Component
{
	//*************************
	//*************************
	// Standard Methods
	//
	constructor(props)
	{
	    super(props);
	}
	getInitialState()
	{
		return(
		{
			"Rangefilter":
			{
				"Focused":[]
			}
		});
	}
	componentWillMount()
	{
		this.props.fetchRangefilterHtml();
		this.props.fetchHistoryJson();
		this.props.fetchRangefilterPropsexampleJs();
		this.props.fetchRangefilterPropsDemoexampleJson();
		this.props.fetchRangefilterRangeDemoexampleJson();
		this.props.fetchRangefilterCssDemoexampleCss();
	}
	componentWillUnmount()
	{
		// empty
	}
	componentDidMount()
	{
		let scopeProxy
			= this;
		let rangefilterChange
			= scopeProxy.RangefilterChange;
		let navigationSection
			= 0;
		//
		let rangefilterProfile =
			{
				"Panel":
				{
					"Classname":"rangefilter-panel"
				},
				"Panelintervals":
				{
					"Classname":"rangefilter-panel-intervals"
				},
				"Scopetrack":
				{
					"Face":
					{
						"Html":"<div class='rangefilter-scopetrack-html'>graph demo</div>",
						"Classname":"rangefilter-scopetrack-face"
					},
					"Lens":
					{
						"Classname":"rangefilter-scopetrack-lens"
					}
				},
				"Scopefocus":
				{
					"Classname":"rangefilter-scopefocus"
				},
				"Focustray":
				{
					"Face":
					{
						"Classname":"rangefilter-focustray-face"
					},
					"Lens":
					{
						"Classname":"rangefilter-focustray-lens"
					}
				},
				"Leftbound":
				{
					"Classname":"rangefilter-scope-leftbound",
					"Location":"15%",
					"Markertop":
					{
						"Fill":"rgba(230,160,0,1)",
						"Points":"5,10 10,0 5,3 0,0",
						"Size":"10 10"
					},
					"Markerbottom":
					{
						"Fill":"rgba(230,160,0,1)",
						"Points":"5,0 10,10 5,7 0,10",
						"Size":"10 10"
					}
				},
				"Rightbound":
				{
					"Style":"rangefilter-scope-rightbound",
					"Location":"80%",
					"Markertop":
					{
						"Fill":"rgba(230,160,0,1)",
						"Points":"5,10 10,0 5,3 0,0",
						"Size":"10 10"
					},
					"Markerbottom":
					{
						"Fill":"rgba(230,160,0,1)",
						"Points":"5,0 10,10 5,7 0,10",
						"Size":"10 10"
					}
				},
				"Change":function(event)
				{
					scopeProxy.rangefilterChange(event);
				},
				"Click":function(event)
				{
					scopeProxy.rangefilterClick(event);
				},
				"Ready":function(event)
				{
					scopeProxy.rangefilterReady(event);
				},
				"Range":[]
			}
		//
		updateState(scopeProxy,
		{
			"Rangefilter":
			{
				"Profile":rangefilterProfile
			}
		});
		window.requestAnimationFrame(()=>
		{
			let updateNavigationState
				= scopeProxy.props.updateNavigationstateAction;
			let setViewLoaded
				= scopeProxy.props.setViewLoadedAction;
			let setLayoutMode
				= scopeProxy.props.setLayoutModeAction;
			//
			let setviewTimeout =
				setTimeout(function()
				{
					setViewLoaded(true);
					setLayoutMode("full");
					updateNavigationState(navigationSection);
				},
				500);
			//
		});
	}
	componentWillUpdate()
	{
		// empty
	}
	componentDidUpdate()
	{
		// empty
	}
	render()
	{
		let scopeProxy
			= this;
		let rangefilterHtml
			= scopeProxy.props.html;
		let rangeJson
			= scopeProxy.props.json;
		let rangefilterPropsexampleJs
			= scopeProxy.props.rangefilterPropsexampleJs;
		let rangefilterPropsDemoexampleJson
			= scopeProxy.props.rangefilterPropsDemoexampleJson;
		let rangefilterRangeDemoexampleJson
			= scopeProxy.props.rangefilterRangeDemoexampleJson;
		let rangefilterCssDemoexampleCss
			= scopeProxy.props.rangefilterCssDemoexampleCss;
		let jsonReady
			= (rangeJson !== null)
			? true
			: false;
		let profileReady
			= (_.has(scopeProxy, "state.Rangefilter.Profile"))
			? true
			: false;
		let rangefilterProfile
			= (_.has(scopeProxy, "state.Rangefilter.Profile"))
			? scopeProxy.state.Rangefilter.Profile
			: {};
		let propsDemoExample
			= (rangefilterPropsexampleJs !== null
			&& rangefilterPropsexampleJs !== undefined)
			? rangefilterPropsexampleJs
			: "";
		let propsExample
			= (rangefilterPropsDemoexampleJson !== null
			&& rangefilterPropsDemoexampleJson !== undefined)
			? JSON.stringify(rangefilterPropsDemoexampleJson, null, "\t")
			: "";
		let cssDemoExample
			= (rangefilterCssDemoexampleCss !== null
			&& rangefilterCssDemoexampleCss !== undefined)
			? rangefilterCssDemoexampleCss
			: "";
		//
		let backgroundcanvasProfile =
			{
				"Background":
				{
					"Color":"rgba(245,245,255,1)"
				},
				"Watermark":
				{
					"Name":"rangefilter",
					"Image":"anvil-watermark-filtered_480x363.png"
				}
			}
		//
		propsDemoExample
		= (propsDemoExample.length > 0)
		? propsDemoExample.replace(/"...": "..."/g, "...")
		: propsDemoExample;
		propsExample
		= (propsExample.length > 0)
		? propsExample.replace(/"...": "..."/g, "...")
		: propsExample;
		rangefilterProfile.Range
		= scopeProxy.props.json;
		//
		if(jsonReady === true
		&& profileReady === true)
		{
			return(		
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					<div id="wares-landing-content-conainer" ref="wareslandingcontent" className="wares-landing-content">
						<div id="ware-introduction-container" ref="wareintroduction" className="ware-introduction">
							<div id="ware-landing-html-container" ref="warelandinghtml" dangerouslySetInnerHTML={{"__html":rangefilterHtml}} className="ware-landing-html"/>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Properties (props)" className="detail-heading">
								<Highlight lang="javascript" value={propsExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Properties (props)" className="detail-heading">
								<Highlight lang="json" value={propsDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={false} header="Demo Styles (css)" className="detail-heading">
								<Highlight lang="css" value={cssDemoExample}/>
							</Panel>
						</div>
						<div id="ware-properties-detail-container" className="ware-properties-detail">
							<Panel collapsible defaultExpanded={true} header="Deploy" className="detail-heading">
								<Highlight lang="jsx" value={"npm install react-rangefilter -s"}/>
								<hr/>
								<Highlight lang="js" value={"import Rangefilter from 'react-rangefilter';"}/>
								<hr/>
								<Highlight lang="jsx" value={"<Rangefilter {...props}/>"}/>
							</Panel>
						</div>
						<div id="rangefilter-showcase-container" ref="rangefiltershowcase" className="rangefilter-showcase">
							<div id="rangefilter-heading-container" ref="rangefilterheading" className="rangefilter-heading">
								<div id="rangefilter-heading-headline-container" ref="rangefilterheadingheadline" className="rangefilter-heading-headline">
									Demo
								</div>
								<div id="rangefilter-heading-caption-container" ref="rangefilterheadingcaption" className="rangefilter-heading-caption">
									contingent view | combined view
								</div>
							</div>
							<div id="rangefilter-caption-container" ref="rangefiltercaption" className="rangefilter-caption">
								combined view | Noteworthy Events 1998 - 2016
							</div>
							<div id="rangefilter-title-container" ref="rangefiltertitle" className="rangefilter-title">
								<div id="rangefilter-headline-container" ref="rangefilterheadline" className="rangefilter-headline">
									<div id="performance-legend-container" ref="performancelegend" className="rangefilter-legend">
										<div id="career-legend-label-container" ref="careerlegendlabel" className="legend-label">graph demo</div>
										<div id="career-legend-swatch-container" ref="careerlegendswatch" className="legend-swatch performance-swatch-color"></div>
									</div>
									<div id="career-legend-container" ref="careerlegend" className="rangefilter-legend">
										<div id="career-legend-label-container" ref="careerlegendlabel" className="legend-label"> | career</div>
										<div id="career-legend-swatch-container" ref="careerlegendswatch" className="legend-swatch career-swatch-color"></div>
									</div>
									<div id="microsoft-legend-container" ref="microsoftlegend" className="rangefilter-legend">
										<div id="microsoft-legend-label-container" ref="microsoftlegendlabel" className="legend-label"> | microsoft</div>
										<div id="microsoft-legend-swatch-container" ref="microsoftlegendswatch" className="legend-swatch microsoft-swatch-color"></div>
									</div>
									<div id="apple-legend-container" ref="applelegend" className="rangefilter-legend">
										<div id="apple-legend-label-container" ref="applelegendlabel" className="legend-label"> | apple</div>
										<div id="apple-legend-swatch-container" ref="applelegendswatch" className="legend-swatch apple-swatch-color"></div>
									</div>
									<div id="google-legend-container" ref="googlelegend" className="rangefilter-legend">
										<div id="google-legend-label-container" ref="googlelegendlabel" className="legend-label"> | google</div>
										<div id="google-legend-swatch-container" ref="googlelegendswatch" className="legend-swatch google-swatch-color"></div>
									</div>
									<div id="web-legend-container" ref="weblegend" className="rangefilter-legend">
										<div id="web-legend-label-container" ref="weblegendlabel" className="legend-label"> | web</div>
										<div id="web-legend-swatch-container" ref="weblegendswatch" className="legend-swatch web-swatch-color"></div>
									</div>
								</div>
							</div>
							<Rangefilter {...rangefilterProfile}/>
							<div id="rangefilter-focusresults-container" ref="rangefilterfocusresults" className="rangefilter-focusresults">
								<div id="focusresults-cards-host-container" ref="focusresultscardshost" className="focusresults-cardshost"></div>
							</div>
						</div>
					</div>
					<BackgroundCanvas ref="backgroundcanvas" {...backgroundcanvasProfile}/>
				</div>
			);
		}
		else
		{
			return(
				<div id="wares-landing-container" ref="wareslanding" className="wares-landing">
					"Loading Rangefilter Content..."
				</div>
			);
		}
	}
	//*************************
	//*************************
	// Specialized Methods
	//
	rangefilterChange(Focuscollection)
	{
		let scopeProxy
			= this;
		//
		ReactGA.event(
		{
		  "category":"rangfilter_action",
		  "action":"range_change",
		  "label":"slider_moved"
		});
		updateState(scopeProxy,
		{
			"Rangefilter":
			{
				"Focused":Focuscollection
			}
		});
		this.updateFocusCards(Focuscollection);
		//
		//console.log("%c ::react-rangefilter:change event occurred::response (focus-tray items):", "color:rgba(0,200,50,1)", Focuscollection);
	}
	rangefilterClick(event)
	{
		ReactGA.event(
		{
		  "category":"rangfilter_action",
		  "action":"range_clicked",
		  "label":"item_".concat(event.Label.Text)
		});
		//console.log("%c ::react-rangefilter:click event occurred::response (clicked item):", "color:rgba(0,200,50,1)", event);
	}
	rangefilterReady(event)
	{
		//console.log("%c ::react-rangefilter:ready event occurred::response (all range items):", "color:rgba(0,200,50,1)", event);
	}
	updateFocusCards(Focuscollection)
	{
		let scopeProxy
			= this;
		let FocusresultsCardshostRef
			= this.refs.focusresultscardshost;
		//
		let focusresultsCards =
			Focuscollection.map(function(focusResult)
			{
				let cardhostId
					= "rangefilter-card-".concat(focusResult.Segment.Sort, "-container");
				let cardheadingCaption
					= focusResult.Parcel.Label.Text;
				let cardbodyMessage
					= focusResult.Parcel.Body.Text;
				let cardbodyCaption
					= focusResult.Parcel.Caption.Text;
				let segmentColor
					= focusResult.Segment.Color;
				let segmentClass
					= focusResult.Segment.Class;
				//
				let cardheadingStyle =
					{
						"background-color":segmentColor
					}
				//
				let cardthumbnailStyle =
					{
						"display":"block",
						"position":"relative",
						"float":"left",
						"width":"100px",
						"height":"100px",
						"margin":".5rem",
						"background-color":"rgba(255,255,255,1)"
					}
				//
				return(
					<div id={cardhostId} className="rangefilter-cardhost">
						<div id="focusresults-cardheading-container" style={cardheadingStyle} className="focusresults-cardheading">{cardheadingCaption}</div>
						<div id="focusresults-cardbody-container" className="focusresults-cardbody">
							<div id="focusresults-cardthumbnail-container" style={cardthumbnailStyle} className={segmentClass}></div>
							<p id="focusresults-cardbody-message-container" className="focusresults-cardbody-message">{cardbodyMessage}</p>
						</div>
						<div id="focusresults-cardbody-caption-container" className="focusresults-cardbody-caption" dangerouslySetInnerHTML={{"__html":cardbodyCaption}}/>
					</div>
				);
			});
		//
		ReactDOM.render(<div id="focusresults-cards-container" className="focusresults-cards">{focusresultsCards}</div>, document.getElementById("focusresults-cards-host-container"));
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
// Map Redux state items to this.props properties
// each time the Redux state changes. When that
// happens, the render() function is called
// and the DOM is updated according to any
// changes that happened in this.props. Use this
// to retrieve values from the Redux state and
// place them in this.props.
function mapReduxtateToProps(reduxState)
{
	return(
	{
		"json":reduxState.rangefilterReducer.json,
		"html":reduxState.rangefilterReducer.html,
		"rangefilterPropsexampleJs":reduxState.rangefilterReducer.rangefilterPropsexampleJs,
		"rangefilterPropsDemoexampleJson":reduxState.rangefilterReducer.rangefilterPropsDemoexampleJson,
		"rangefilterRangeDemoexampleJson":reduxState.rangefilterReducer.rangefilterRangeDemoexampleJson,
		"rangefilterCssDemoexampleCss":reduxState.rangefilterReducer.rangefilterCssDemoexampleCss,
		"setViewLoadedAction":reduxState.mainReducer.setViewloadedAction,
		"setLayoutModeAction":reduxState.mainReducer.setLayoutmodeAction,
		"updateNavigationstateAction":reduxState.navigationReducer.updateNavigationstateAction
	});
}
// Map Redux action-creators to this.props properties
// when the component is initialized. This gives access
// to each action-creator to the component from within
// this.props so that actions can be dispatched. Use
// this to initially establish values in the Redux state.
export default connect(mapReduxtateToProps,
{
	"fetchRangefilterHtml":fetchRangefilterHtml,
	"fetchHistoryJson":fetchHistoryJson,
	"fetchRangefilterPropsexampleJs":fetchRangefilterPropsexampleJs,
	"fetchRangefilterPropsDemoexampleJson":fetchRangefilterPropsDemoexampleJson,
	"fetchRangefilterRangeDemoexampleJson":fetchRangefilterRangeDemoexampleJson,
	"fetchRangefilterCssDemoexampleCss":fetchRangefilterCssDemoexampleCss
})(RangefilterLanding);