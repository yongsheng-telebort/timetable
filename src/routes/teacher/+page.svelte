<script>
	// @ts-nocheck

	import SvelteTable from 'svelte-table';
	import { onMount } from 'svelte';
	import { collection, onSnapshot, doc, deleteDoc } from 'firebase/firestore';
	import { db } from '../../firebase';
	import { timeslots } from '../../dummyData';
	import CreateTeacherModal from '$lib/CreateTeacherModal.svelte';
	import EditTeacherModal from '$lib/EditTeacherModal.svelte';
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
	let selectedTeacher;
	let searchedTeacher = '';

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
		}
	];
</script>

<div class="container">
	<h1>Telebort Teacher Timetable</h1>
	<CreateButton />
	<div class="pb-3">
		<label>
			Teacher name
			<input type="text" bind:value={searchedTeacher} />
		</label>
	</div>
	<div class="row">
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
			{
			key: 'edit',
			title: 'Edit',
			renderComponent: EditButton
		}]}
			rows={teachers.filter((/** @type {{ timeslot: string; }} */ c) =>
			searchedTeacher === '' || searchedTeacher === c.name
		)}
			classNameTable={['table table-striped']}
			classNameThead={['table-primary']}
			classNameSelect={['custom-select']}
			on:clickRow={(e) => {
				selectedTeacher = e.detail.row;
			}}
		/>
	</div>
	<div class="row">
		<SvelteTable
			columns={COLUMNS}
			rows={data.filter((/** @type {{ timeslot: string; }} */ c) =>
				searchedTeacher === '' || searchedTeacher === c.main || searchedTeacher === c.faci1 ||searchedTeacher === c.faci2 ||searchedTeacher === c.faci3 ||searchedTeacher === c.faci4 || c.observer.includes(searchedTeacher) 
			)}
			classNameTable={['table table-striped']}
			classNameThead={['table-primary']}
			classNameSelect={['custom-select']}
		/>
	</div>
</div>
<EditTeacherModal teacherInfo={selectedTeacher} />
<CreateTeacherModal />
