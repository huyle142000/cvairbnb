import Axios from "axios";
import { token, DOMAIN, TOKEN, MAP_BOX_TOKEN, GEOCODING_ADDRESS_LOCATION_DOMAIN, RETRIVE_SUGGEST_LOCATION_DOMAIN } from "../utils/setting";

export class BothTokenService {
    put = (url, data) => {
        return Axios({
            method: "PUT",
            url: `${DOMAIN}${url}`,
            data,
            headers: {
                token: JSON.parse(localStorage.getItem(token)),
                TokenCyberSoft: TOKEN,
            },
        });
    };
    post = (url, data) => {
        return Axios({
            url: `${DOMAIN}${url}`,
            method: "POST",
            data,
            headers: {
                token: JSON.parse(localStorage.getItem(token)),
                TokenCyberSoft: TOKEN,
            },
        });
    };
    get = (url) => {
        return Axios({
            method: "GET",
            url: `${DOMAIN}${url}`,
            headers: {
                token: JSON.parse(localStorage.getItem(token)),
                TokenCybersoft: TOKEN,
            },
        });
    };
    delete = (url) => {
        return Axios({
            method: "DELETE",
            url: `${DOMAIN}${url}`,
            headers: {
                token: JSON.parse(localStorage.getItem(token)),
                TokenCyberSoft: TOKEN,
            },
        });
    };

    getMapBoxGeocoding = (address) => {
        return Axios({
            method: "GET",
            url: `${GEOCODING_ADDRESS_LOCATION_DOMAIN}${address}.json`,
            params: {
                access_token: MAP_BOX_TOKEN,
            },
        });
    };

    getSuggestLocation = (address) => {
        return Axios({
            method: "GET",
            url: `${RETRIVE_SUGGEST_LOCATION_DOMAIN}${address}`,
            params: {
                language: "vn",
                access_token: MAP_BOX_TOKEN,
            },
        });
    };
}
export const bothServiceToken = new BothTokenService();
