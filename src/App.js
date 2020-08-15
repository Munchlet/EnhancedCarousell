import React, { useEffect, useState } from "react";
import "./App.css";
import { DEFAULT_SETTINGS } from "./enums/CommonEnum";
import OptionsSync from "webext-options-sync";
import { features } from "./features";

const optionsStorage = new OptionsSync();

function App() {
	const [settings, setSettings] = useState(DEFAULT_SETTINGS);
	const [currentFeatures, setCurrentFeatures] = useState([]);

	useEffect(() => {
		async function init() {
			const options = await optionsStorage.getAll();
			setSettings(options);
			console.log(options);
			const checkboxes = [];
			console.log(features);
			for (const [key, value] of Object.entries(features)) {
				// Hide category if it has only hidden configurations
				// if (!features.find((feature) => !feature.hidden)) {
				// 	continue;
				// }
				checkboxes.push({ key, value });
			}

			setCurrentFeatures(checkboxes);
		}

		init();
	}, []);

	const onCheckedChanged = (key, value) => {
		setSettings(async (prev) => {
			const settings = { ...prev };
			settings[key] = value;
			await optionsStorage.set({ [key]: value });
			return settings;
		});
	};

	return (
		<div className="App">
			<div>
				{currentFeatures.map(({ key, value }) => {
					return (
						<div key={key}>
							<input
								id={value.id}
								type="checkbox"
								checked={settings[key]}
								onClick={(e) => onCheckedChanged(key, e.target.checked)}
							/>
							<label htmlFor={value.id}>{value.label}</label>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default App;
