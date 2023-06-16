import { STATUSCODES } from "../../datas/statusCodes"
import notify from "./notify";

export default async function callApi(url, data, method, cb) {

    try {
        const response = await fetch(url, {
            method: method || "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (response.ok) {
            notify("Operation successfull")
            return true
        } else {
            notify(`${STATUSCODES[response.status]}, Please try again`, "error")
            console.log("error")
            return false
        }
    }
    catch (err) {
        notify("An error occured. Please try again later.", "error")
        console.log("error")
        return false
    }

}