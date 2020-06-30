import schema from "./schema";
import {__} from '@wordpress/i18n';
import {assign} from 'lodash';

const deprecatedAttrs = [
	{
		attributes: schema,
		save: () => null,
		supports: {
			align: ['wide', 'full'],
			customClassName: false,
			html: false,
		},
		migrate(attributes) {
			const {offers} = attributes;
			const updatedOffers = offers.map((offer) => {
				return assign(offer, {
					enableBadge: true,
					customBadge: {
						text: __('Best Values', 'rehub-theme-child'),
						textColor: '#fff',
						backgroundColor: '#77B21D'
					},
				});
			});

			return assign(attributes, {
				offers: updatedOffers
			});
		},
		isEligible: function (attrs) {
			if (attrs) {
				if (!attrs.offers) {
					return false;
				}

				const {offers} = attrs;
				return !offers.some((offer) => {
					return 'enableBadge' in offer;
				});
			}

			return false;
		}
	}
];

export default deprecatedAttrs;