/*global chrome*/

import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [settings, setSettings] = useState({
		autoExpandReadMore: false,
		accounts: [],
	});

	useEffect(() => {
		chrome.storage.sync.get(["settings"], (result) => setSettings(result.settings));
	}, []);

	const onCheckedChanged = (key, value) => {
		setSettings((prev) => {
			const settings = { ...prev };
			settings[key] = value;
			chrome.storage.sync.set({
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
				<label for="cb-settings-autoexpandreadmore">Auto click "read more" in Listing</label>
			</div>
		</div>
	);
}

export default App;
