"use strict";
import * as firebaseInstance from "firebase-admin";
import { logger } from "handlebars";
const serviceAccount = require(process.cwd() + "/bin/cred.json");

firebaseInstance.initializeApp({
	credential: firebaseInstance.credential.cert(serviceAccount),
	databaseURL: "databaseurl"
});

export const sendPushToAndriod = async function (deviceTokenArray, payload) {
	try {
		let pushPayload = {
			data: {
				"title": payload.title || '',
				"body": payload.message || '',
				"sound": "default",
				"icon": payload.icon,
				"type": payload.type.toString() || '',
				"appData": payload.appData ? JSON.stringify(payload.appData) : "{}"   // userId or other data
			}
		};
		const options ={
			priority: 'high',
			timeToLive: 60  //60  24,
		};
		await firebaseInstance.messaging().sendToDevice(deviceTokenArray, pushPayload, options)

	} catch (error) {
		return error;

	}
}

export const sendPushToIos = async function (deviceTokenArray, payload) {
	try {
		let pushPayload = {
			data: {
				"title": payload.title || "",
				"body": payload.message || "",
				"sound": "default",
				"contentType": payload.icon ? "image" : "text",
				"category": "action",
				"threadId": "RichPush",
				"icon": payload.icon,
				"type": payload.type.toString(),
				"appData": payload.appData || "{}"
			},
			notification: {
				"title": payload.title || '',
				"body": payload.message || '',
				"sound": "default",
				"priority": payload.priority ? payload.priority : "high",
				"icon": payload.icon,
				// "click_action": `${config.SERVER.WEB_URL}/${config.CONSTANT.WEB_PUSH_REDIRECT_URLS.USER_REDIRECT_URL}${params.userId}`,
				"type": payload.type.toString(),
				"appData": payload.appData || "{}"
			},

		};

		const options = {
			priority: 'high',
			timeToLive: 60//  60  24,
		};
		await firebaseInstance.messaging().sendToDevice(deviceTokenArray, pushPayload, options)

	} catch (error) {
		// logger()
		return error;
	}
}