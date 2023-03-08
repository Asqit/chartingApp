import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '~/App';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '~/app/store';
import '~/assets/index.css';
import '~/app/i18next';
import { Layout } from '~/components';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<Routes>
					<Route element={<Layout />}>
						<App />
					</Route>
				</Routes>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);
