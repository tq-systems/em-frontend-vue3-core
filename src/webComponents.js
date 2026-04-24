/*
 * Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
 * Author: Ronny Freyer and the Energy Manager development team
 *
 * This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
 * You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
 * https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
 * In case of any license issues please contact license@tq-group.com.
 */

import { h, createApp } from 'vue';

export function defineVueWebComponent(tagName, vueRootComponent, additionalPlugins = []) {
    if (customElements.get(tagName)) {
        console.log(`Custom element '${tagName}' is already defined. Skipping re-registration.`);

        return;
    }
    class VueWebComponent extends HTMLElement {
        connectedCallback() {
            if (!this.firstChild) {
                const container = document.createElement('div');
                this.appendChild(container);

                const app = createApp({ render: () => h(vueRootComponent) });

                additionalPlugins.forEach(plugin => {
                    if (plugin) {
                        app.use(plugin);
                    }
                });

                app.mount(container);
                this._vueApp = app;

                this.dispatchEvent(new CustomEvent('mounted', {
                    bubbles: true,
                    composed: true,
                }));
            }
        }

        disconnectedCallback() {
            if (this._vueApp) {
                this._vueApp.unmount();
                delete this._vueApp;
            }
        }
    }

    // Register webcomponent
    customElements.define(tagName, VueWebComponent)
}
