// Exported definitions should never contain triple-slash references: 
// https://www.typescriptlang.org/docs/handbook/typings-for-npm-packages.html

import * as Enums from "./enums";
import * as Options from "./options";
import * as Infrastructure from "./infrastructure";

export {Enums};
export {Options};
export {Infrastructure};
export {Shops, Shop} from "./modules/shops";
export {Charges, Charge} from "./modules/charges";
export {Webhooks, Webhook} from "./modules/webhooks";
export {ScriptTags, ScriptTag} from "./modules/script_tags";
export {RecurringCharges, RecurringCharge} from "./modules/recurring_charges";

// Export auth functions at the top level
export {
    authorize, 
    buildAuthorizationUrl,
    isAuthenticProxyRequest,
    isAuthenticRequest,
    isAuthenticWebhook,
    isValidShopifyDomain
} from "./modules/auth";