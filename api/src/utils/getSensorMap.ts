import connector from '../config/connector';

async function getSensorMap(branchId: number) {
	const map = await connector.query(
		'SELECT * FROM `SensorMap` WHERE `branchId` = ?',
		[branchId]
	);

	// cleaning the meta object
	delete map.meta;

	return map;
}

export { getSensorMap };
