<script>
	// @ts-nocheck

	import SvelteTable from 'svelte-table';
	import { onMount } from 'svelte';
	import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
	import { db } from '../firebase';
	import { timeslots } from '../dummyData';
	import CreateClassModal from '$lib/CreateClassModal.svelte';
	import EditClassModal from '$lib/EditClassModal.svelte';
	import CreateButton from '$lib/CreateButton.svelte';
	import EditButton from '$lib/EditButton.svelte';

	/**
	 * @type {any[]}
	 */
	let data = [];
	let teachers = [];
	/**
	 * @type {any}
	 */
	let selectedClass;
	let selectedTimeslot = 'All';
	let teachersOnDuty = []
	let filteredData;
	let filteredTeacher;

	$: {
		filteredData = data.filter((/** @type {{ timeslot: string; }} */ c) =>
				selectedTimeslot === 'All' ? true : c.timeslot === selectedTimeslot
			)
		teachersOnDuty = []
		filteredData.forEach((d) => {
			teachersOnDuty.push(d.faci1)
			teachersOnDuty.push(d.faci2)
			teachersOnDuty.push(d.faci3)
			teachersOnDuty.push(d.faci4)
		})
		filteredTeacher = teachers.filter((t)=> !teachersOnDuty.includes(t.name) && t.timeslots.includes(selectedTimeslot))
	}

	onMount(() => {
		getClasses();
		getTeachers();
	});
	async function getClasses() {
		try {
			onSnapshot(collection(db, 'classes'), (querySnapshot) => {
				/**
				 * @type {any[]}
				 */
				let classes = [];
				querySnapshot.forEach((doc) => {
					let item = { ...doc.data(), id: doc.id };
					classes = [item, ...classes];
				});
				data = classes;
			});
		} catch (error) {
			console.log(error);
		}
	}

	async function getTeachers() {
		try {
			onSnapshot(collection(db, 'teachers'), (querySnapshot) => {
				/**
				 * @type {any[]}
				 */
				let tchs = [];
				querySnapshot.forEach((doc) => {
					let item = { ...doc.data(), id: doc.id };
					tchs = [item, ...tchs];
				});
				teachers = tchs;
			});
		} catch (error) {
			console.log(error);
		}
	}

	const COLUMNS = [
		{
			key: 'id',
			title: 'Id',
			value: (/** @type {{ id: any; }} */ v) => v.id,
			renderValue: () => ''
		},
		{
			key: 'timeslot',
			title: 'Timeslot',
			value: (/** @type {{ timeslot: any; }} */ v) => v.timeslot,
			sortable: true
		},
		{
			key: 'batch',
			title: 'Batch',
			value: (/** @type {{ batch: any; }} */ v) => v.batch
		},
		{
			key: 'program',
			title: 'Program',
			value: (/** @type {{ program: any; }} */ v) => v.program,
			sortable: true
		},
		{
			key: 'main',
			title: 'Main',
			value: (/** @type {{ main: any; }} */ v) => v.main
		},
		{
			key: 'faci1',
			title: 'Faci1',
			value: (/** @type {{ faci1: any; }} */ v) => v.faci1,
			renderValue: (/** @type {{ faci1: any; }} */ v) => (!!v.faci1 ? v.faci1 : '?')
		},
		{
			key: 'faci2',
			title: 'Faci2',
			value: (/** @type {{ faci2: any; }} */ v) => v.faci2,
			renderValue: (/** @type {{ faci2: any; }} */ v) => (!!v.faci2 ? v.faci2 : '?')
		},
		{
			key: 'faci3',
			title: 'Faci3',
			value: (/** @type {{ faci3: any; }} */ v) => v.faci3,
			renderValue: (/** @type {{ faci3: any; }} */ v) => (!!v.faci3 ? v.faci3 : '?')
		},
		{
			key: 'faci4',
			title: 'Faci4',
			value: (/** @type {{ faci4: any; }} */ v) => v.faci4,
			renderValue: (/** @type {{ faci4: any; }} */ v) => (!!v.faci4 ? v.faci4 : '?')
		},
		{
			key: 'observer',
			title: 'Observer',
			value: (/** @type {{ observer: any; }} */ v) => v.observer
		},
		{
			key: 'edit',
			title: 'Edit/Delete',
			renderComponent: EditButton
		}
	];
</script>

<div class="container">
	<h1>Telebort Class Timetable</h1>
	<CreateButton />
	<div class="pb-3">
		<label>
			<input type="radio" bind:group={selectedTimeslot} value={'All'} />
			All
		</label>
		{#each timeslots as timeslot}
			<label class="px-2">
				<input type="radio" bind:group={selectedTimeslot} value={timeslot} />
				{timeslot}
			</label>
		{/each}
	</div>

	<div class="row">
		<SvelteTable
			columns={COLUMNS}
			rows={filteredData}
			classNameTable={['table table-striped']}
			classNameThead={['table-primary']}
			classNameSelect={['custom-select']}
			on:clickRow={(e) => {
				selectedClass = e.detail.row;
			}}
		/>
	</div>
	<div class="row">
		<h4>Available Teachers:</h4>
		<SvelteTable
			columns={[{
				key: 'id',
				title: 'Id',
				value: (/** @type {{ id: any; }} */ v) => v.id,
				renderValue: () => ''
			},
			{
				key: 'name',
				title: 'Name',
				value: (/** @type {{ name: any; }} */ v) => v.name,
				sortable: true
			},
			{
				key: 'programs',
				title: 'Programs',
				value: (/** @type {{ batch: any; }} */ v) => v.programs
			},
			{
				key: 'timeslots',
				title: 'Timeslots',
				value: (/** @type {{ program: any; }} */ v) => v.timeslots,
				sortable: true
			},
			]}
			rows={filteredTeacher}
			classNameTable={['table table-striped']}
			classNameThead={['table-primary']}
			classNameSelect={['custom-select']}
		/>
	</div>
</div>
<EditClassModal classInfo={selectedClass} />
<CreateClassModal/>
