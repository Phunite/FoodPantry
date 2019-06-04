/**
 * tooltipster-discovery v1.0.2
 * https://github.com/louisameline/tooltipster-discovery/
 * Developed by Louis Ameline
 * @license MIT
 */
(function(root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module unless amdModuleId is set
		define(['tooltipster'], function ($) {
			return (factory($));
		});
	}
	else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like environments that support module.exports,
		// like Node.
		module.exports = factory(require('tooltipster'));
	}
	else {
		factory(jQuery);
	}
}(this, function($) {
	
	$.tooltipster._plugin({
		name: 'laa.discovery',
		core: {
			__init: function() {
				
				var self = this;
				
				// list of core variables
				self.__classNames = [];
				
				// bind on start events (triggered on mouseenter)
				$.tooltipster._on('start', function(event) {
					
					$.each(self.__classNames, function(i, className) {
						
						if (event.instance._$origin.hasClass(className)) {
							
							var instances = $.tooltipster.instances('.' + className),
								openInstances = [],
								duration;
							
							$.each(instances, function(i, instance) {
								
								if (instance !== event.instance) {
									
									// if another instance is already open
									if (instance.status().open) {
										openInstances.push(instance);
									}
								}
							});
							
							// if another instance was open
							if (openInstances.length > 0) {
								
								duration = event.instance.option('animationDuration');
								
								// we'll open the tooltip without animation
								event.instance.option('animationDuration', 0);
								
								// open and close the other open tooltips when it's done
								event.instance.open(function() {
									
									// there should be only one open tooltip at the same time, unless
									// they were opened by a method call
									$.each(openInstances, function(i, instance) {
										
										// get the current animationDuration
										duration = instance.option('animationDuration');
										
										// we'll close the tooltip without animation
										instance.option('animationDuration', 0);
										
										instance.close();
										
										// restore the animationDuration to its normal value
										instance.option('animationDuration', duration);
									});
									
									// restore the animationDuration to its normal value
									event.instance.option('animationDuration', duration);
								});
								
								// now that we have opened the tooltip, the hover trigger must be stopped
								event.stop();
							}
						}
					});
				});
			},
			group: function(className) {
				this.__classNames.push(className);
			},
			ungroup: function(className) {
				this.__classNames = $.grep(this.__classNames, function(el, i){ return el !== className });
			}
		}
	});
	
	return $;
}));
