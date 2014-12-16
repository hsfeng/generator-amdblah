define(['jquery', 'underscore', 'backbone', 'module', 'i18next', 'moment'],
	function($, _, Backbone, module, i18next, moment) {
		'use strict';
		var lang, LangModel = Backbone.Model.extend({
			defaults: {
				appName: 'messages',
				lang: 'en'
			},

			initialize: function() {
				var self = this,
					cacheBuster = module.config().cacheBuster;

				//init i18next
				i18next.init({
					ns: this.get('appName'),
					detectLngQS: 'lang',
					cookieName: 'lang',
					useCookie: true,
					defaultNs: this.get('appName'),
					fallbackLng: 'en',
					cacheBuster: cacheBuster,
					fallbackToDefaultNS: true,
					resGetPath: 'bundle/__ns_____lng__.json' + (cacheBuster ? ('?v=' +
						cacheBuster) : '')
				}).done(function() {
					self.set({
						'lang': i18next.lng()
					}, {
						silent: true
					});
					self.apply();
				});

				this.bind('change:lang', function() {
					i18next.setLng(self.get('lang'), function() {
						self.apply();
					});
				});

				setInterval(function() {
					self.applyTimestamp();
				}, 1000);
			},

			applyTimestamp: function() {
				$('[data-i18n-timestamp]').each(function(t, b) {
					var objectTime = $(this).data('i18n-timestamp'),
						fromNow = $(this).data('i18n-fromnow'),
						dateFormat;
					if (_.isNumber(objectTime)) {
						if (!_.isUndefined(fromNow) && fromNow) {
							$(this).html(moment(objectTime).fromNow());
						} else {
							dateFormat = $(this).data('i18n-dateformat');
							$(this).html(moment(new Date(objectTime)).format(dateFormat));
						}
					}
				});
			},

			apply: function() {
				$('body').i18n();
				var self = this,
					momentLangs = [],
					langCode, currentLang = i18next.lng().toLowerCase();
				if (currentLang !== 'en') {
					if (currentLang.indexOf('-') !== -1) {
						langCode = currentLang.split('-')[0];
						if (langCode !== 'zh' && langCode !== 'ms') {
							momentLangs.push('moment.langs/' + currentLang.split('-')[0]);
						}
					}
					momentLangs.push('moment.langs/' + currentLang);
					require(momentLangs, function() {
						moment.locale(currentLang);
						self.applyTimestamp();
					});
				} else {
					moment.locale(currentLang);
					this.applyTimestamp();
				}
			}
		});

		if (_.isUndefined(lang)) {
			lang = new LangModel({
				appName: 'messages'
			});
		}
		return lang;
	});
