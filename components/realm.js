import Realm from 'realm';

const PlatsSchema = {
	name: 'Plat',
	properties: {
		_id: 'int?',
		name: 'string',
		status: 'string?',
	},
	// primaryKey: '_id',
};

async function quickStart() {
	const realm = await Realm.open({
		path: 'pffff',
		schema: [PlatsSchema],
	});

	// Add a couple of Tasks in a single, atomic transaction
	let task1, task2;
	realm.write(() => {
		task1 = realm.create('Plat', {
			// _id: 10,
			name: 'go grocery shopping',
			status: 'Open',
		});

		task2 = realm.create('Plat', {
			// _id: 12,
			name: Math.random().toString(),
			status: 'Open',
		});
		console.log(`created two tasks: ${task1.name} & ${task2.name}`);
	});
	// use task1 and task2
	// query realm for all instances of the "Task" type.
	const tasks = realm.objects('Plat');
  console.log('tasks')
  console.log(tasks[0])
console.log(JSON.stringify(tasks))
	console.log(`The lists of tasks are: ${tasks.map(task => task.name)}`);

	// filter for all tasks with a status of "Open"
	const openTasks = tasks.filtered("status = 'Open'");
	// console.log(`The lists of open tasks are: ${openTasks.map(openTask => openTask.name)}`);

	// Sort tasks by name in ascending order
	const tasksByName = tasks.sorted('name');
	// console.log(`The lists of tasks in alphabetical order are: ${tasksByName.map(taskByName => taskByName.name)}`);

	// Define the collection notification listener
	function listener(tasks, changes) {
		// Update UI in response to deleted objects
		changes.deletions.forEach(index => {
			// Deleted objects cannot be accessed directly,
			// but we can update a UI list, etc. knowing the index.
			console.log(`A task was deleted at the ${index} index`);
		});
		// Update UI in response to inserted objects
		changes.insertions.forEach(index => {
			let insertedTasks = tasks[index];
			console.log(`insertedTasks: ${JSON.stringify(insertedTasks, null, 2)}`);
			// ...
		});
		// Update UI in response to modified objects
		// `newModifications` contains object indexes from after they were modified
		changes.newModifications.forEach(index => {
			let modifiedTask = tasks[index];
			console.log(`modifiedTask: ${JSON.stringify(modifiedTask, null, 2)}`);
			// ...
		});
	}
	// Observe collection notifications.
	tasks.addListener(listener);

	realm.write(() => {
		task1.status = 'InProgress';
	});

	realm.write(() => {
		// Delete the task from the realm.
		realm.delete(task1);
		// Discard the reference.
		task1 = null;
	});

	// Remember to close the realm
	realm.close();
}
quickStart().catch(error => {
	console.log(`An error occurred: ${error}`);
});
