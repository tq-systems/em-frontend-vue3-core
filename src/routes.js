/*
 * Copyright (c) 2026 TQ-Systems GmbH <license@tq-group.com>, D-82229 Seefeld, Germany. All rights reserved.
 * Author: Ronny Freyer and the Energy Manager development team
 *
 * This software is licensed under the TQ-Systems Product Software License Agreement Version 1.0.3 or any later version.
 * You can obtain a copy of the License Agreement in the TQS (TQ-Systems Software Licenses) folder on the following website:
 * https://www.tq-group.com/en/support/downloads/tq-software-license-conditions/
 * In case of any license issues please contact license@tq-group.com.
 */

export function createAppRoutes(emRoutes, wrapperComponent) {
    return emRoutes.flatMap(routeConfig => {
        const basePath = '/' + routeConfig.path.replace(/^\//, '');

        const children = Object.entries(routeConfig.views).map(
            ([viewKey, viewObj]) => ({
                path: viewKey,
                name: `${routeConfig.name}-${viewKey}`,
                component: wrapperComponent,
                props: { tag: viewObj.component },
                meta: { i18nkey: viewObj.i18nkey },
            })
        );

        return [
            { path: basePath, redirect: basePath + '/app' },
            { path: basePath, meta: { i18nkey: routeConfig.i18nkey }, children },
        ];
    });
}
