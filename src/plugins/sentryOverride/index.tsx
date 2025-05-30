/*
 * Vencord, a modification for Discord's desktop app
 * Copyright (c) 2022 Vendicated and contributors
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import { Devs } from "@utils/constants";
import { Logger } from "@utils/Logger";
import definePlugin from "@utils/types";

// export default definePlugin({
//     name: "Sentry Override",
//     description: "Override sentry DSN",
//     authors: [Devs.Zhiyan114],
//     settings: definePluginSettings({
//         ClientDSN: {
//             type: OptionType.STRING,
//             description: "Your sentry client DSN that you want to redirect to",
//             default: "https://95d33ea79467d6758102cba08ff4bd80@o125145.ingest.us.sentry.io/4509414010847233"
//         },
//         tunnelURL: {
//             type: OptionType.STRING,
//             description: "Sentry Browser Tunnel URL",
//             default: "https://sntryprox.zhiyan114.com"
//         }
//     }),
//     cacheDSNVal: {} as { [key: string]: string; },
//     cacheOpt: {} as { [key: string]: string; },

//     start() {
//         const { ClientDSN, tunnelURL } = this.settings.use(["ClientDSN", "tunnelURL"]);
//         const client = window.DiscordSentry;
//         if (!client)
//             return;
//         new Logger("Sentry DSN Overrider", "#00FFFF").log("Overriding Sentry DSN");

//         this.cacheDSNVal = client.getClient()._dsn;
//         this.cacheOpt = client.getClient()._options;

//         const [, pubKey, host, pid] = ClientDSN.match(/^https:\/\/([^@]+)@([^/]+)\/(.+)$/) || [];
//         client.getClient()._dsn.host = host;
//         client.getClient()._dsn.projectId = pid;
//         client.getClient()._dsn.publicKey = pubKey;
//         client.getClient()._options.tunnel = tunnelURL;

//     },

//     stop() {
//         const client = window.DiscordSentry;
//         if (!client)
//             return;
//         new Logger("Sentry DSN Overrider", "#00FFFF").log("Resetting Sentry DSN");
//         client.getClient()._dsn.host = this.cacheDSNVal.host;
//         client.getClient()._dsn.projectId = this.cacheDSNVal.projectId;
//         client.getClient()._dsn.publicKey = this.cacheDSNVal.publicKey;
//         client.getClient()._options.tunnel = this.cacheOpt.tunnel;
//     }
// });

export default definePlugin({
    name: "Sentry Override",
    description: "Override sentry DSN",
    authors: [Devs.Zhiyan114],
    cacheClient: {} as { [key: string]: any; },

    start() {
        const client = window.DiscordSentry;
        if (!client)
            return;
        new Logger("Sentry DSN Overrider", "#00FFFF").log("Overriding Sentry DSN");

        this.cacheClient = client.getClient();

        client.init({
            dsn: "https://95d33ea79467d6758102cba08ff4bd80@o125145.ingest.us.sentry.io/4509414010847233",
            autoSessionTracking: false,
            environment: this.cacheClient._options.environment,
            release: this.cacheClient._options.release,
            beforeSend: this.cacheClient._options.beforeSend,
            integrations: this.cacheClient._options.integrations,
            ignoreErrors: this.cacheClient._options.ignoreErrors,
            denyUrls: this.cacheClient._options.denyUrls,
        });

        // client.getClient()._dsn.host = "o125145.ingest.us.sentry.io";
        // client.getClient()._dsn.projectId = "4509414010847233";
        // client.getClient()._dsn.publicKey = "95d33ea79467d6758102cba08ff4bd80";

    },

    stop() {
        const client = window.DiscordSentry;
        if (!client)
            return;
        new Logger("Sentry DSN Overrider", "#00FFFF").log("Resetting Sentry DSN - Not possible");
        // client.getClient()._dsn.host = this.cacheDSNVal.host;
        // client.getClient()._dsn.projectId = this.cacheDSNVal.projectId;
        // client.getClient()._dsn.publicKey = this.cacheDSNVal.publicKey;
        // client.getClient()._options.tunnel = this.cacheOpt.tunnel;
    }
});
