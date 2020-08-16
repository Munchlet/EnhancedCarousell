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
			let category = "";
			for (const [key, value] of Object.entries(features)) {
				if (category === "" || category !== value.category) {
					category = value.category;
					checkboxes.push({ type: 0, category });
				}

				checkboxes.push({ key, value, type: 1 });
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
				{currentFeatures.map(({ key, value, type, category }) => {
					if (type === 0)
						return (
							<h4 key={`div-${category}`} className="capitalize">
								{category}
							</h4>
						);

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
