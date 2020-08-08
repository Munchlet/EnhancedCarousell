import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
	const [settings, setSettings] = useState({
		autoExpandReadMore: false,
		accounts: [],
	});

	useEffect(() => {
		const localSettings = window.localStorage.getItem("settings");
		try {
			if (localSettings) setSettings(JSON.parse(localSettings));
		} catch (error) {}
	}, []);

	const onCheckedChanged = (key, value) => {
		setSettings((prev) => {
			const newValue = { ...prev };
			newValue[key] = value;
			window.localStorage.setItem("settings", JSON.stringify(newValue));
			return newValue;
		});
	};

	return (
		<div className="App">
			<div>
				<span>Auto click "read more" in Listing</span>
				<input
					type="checkbox"
					checked={settings["autoExpandReadMore"]}
					onClick={(e) => onCheckedChanged("autoExpandReadMore", e.target.checked)}
				/>
			</div>
		</div>
	);
}

export default App;
