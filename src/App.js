/*global chrome*/

import React, { useEffect, useState } from "react";
import "./App.css";
import { DEFAULT_SETTINGS } from "./enums/CommonEnum";

function App() {
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);
	const [storageArea] = useState(chrome.storage.sync || chrome.storage.local);

	useEffect(() => {
		storageArea.get({ settings: DEFAULT_SETTINGS }, (result) => setSettings(result.settings));
	}, []);

	const onCheckedChanged = (key, value) => {
		setSettings((prev) => {
			const settings = { ...prev };
			settings[key] = value;
			storageArea.set({
				settings,
			});

			return settings;
		});
	};

	return (
		<div className="App">
			<div>
				<input
					id="cb-settings-autoexpandreadmore"
					type="checkbox"
					checked={settings["autoExpandReadMore"]}
					onClick={(e) => onCheckedChanged("autoExpandReadMore", e.target.checked)}
				/>
				<label htmlFor="cb-settings-autoexpandreadmore">Auto click "read more" in Post</label>
			</div>
		</div>
	);
}

export default App;
