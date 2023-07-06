<script>
	import { setDoc, doc, deleteDoc } from 'firebase/firestore';
	import { db } from '../firebase';
	/**
	 * @type {{ id: string; timeslot: string; batch: string; program: string; main: string; faci1: string; faci2: string; faci3: string; faci4: string; observer: string; }}
	 */
	export let classInfo = {
		id: '',
		timeslot: '',
		batch: '',
		program: '',
		main: '',
		faci1: '',
		faci2: '',
		faci3: '',
		faci4: '',
		observer: ''
	};

	/**
	 * @param {string} id
	 */
	async function editClassData(id) {
		try {
			let { id, ...submitInfo } = classInfo;
			await setDoc(doc(db, 'classes', id), submitInfo);
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * @param {string} id
	 */
	async function deleteClassData(id) {
		try {
			await deleteDoc(doc(db, 'classes', id));
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="modal fade" id="editClass" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Edit Class</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row mt-3 text-center row">
						<div class="col">
							<h5>Timeslot</h5>
							<input bind:value={classInfo.timeslot} class="mb-2" />
						</div>
						<div class="col">
							<h5>Batch</h5>
							<input bind:value={classInfo.batch} class="mb-2" />
						</div>
						<div class="col">
							<h5>Program</h5>
							<input bind:value={classInfo.program} class="mb-2" />
						</div>
						<div class="col">
							<h5>Main</h5>
							<input bind:value={classInfo.main} class="mb-2" />
						</div>
						<div class="col">
							<h5>Faci1</h5>
							<input bind:value={classInfo.faci1} class="mb-2" />
						</div>

						<div class="col">
							<h5>Faci2</h5>
							<input bind:value={classInfo.faci2} class="mb-2" />
						</div>
						<div class="col">
							<h5>Faci3</h5>
							<input bind:value={classInfo.faci3} class="mb-2" />
						</div>
						<div class="col">
							<h5>Faci4</h5>
							<input bind:value={classInfo.faci4} class="mb-2" />
						</div>
						<h5>Observer</h5>
						<input bind:value={classInfo.observer} class="mb-2" />
					</div>
				</div>
				<div class="row px-5" />
			</div>
			<div class="modal-footer">
				<button
					type="button"
					class="btn btn-danger"
					data-bs-dismiss="modal"
					on:click={() => {
						deleteClassData(classInfo.id);
					}}
				>
					Delete
				</button>
				<button
					type="button"
					class="btn btn-primary"
					data-bs-dismiss="modal"
					on:click={() => {
						editClassData(classInfo.id);
					}}
				>
					Save
				</button>
			</div>
		</div>
	</div>
</div>
