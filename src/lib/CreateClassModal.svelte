<script>
	import { collection, addDoc } from 'firebase/firestore';
	import { db } from '../firebase';
	import {timeslots, programs} from '../dummyData'

	/**
	 * @type {{timeslot: string; batch: string; program: string; main: string; faci1: string; faci2: string; faci3: string; faci4: string; observer: string; }}
	 */
	let classInfo = {
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

	async function createNewClass() {
		try {
			const docRef = await addDoc(collection(db, 'classes'), classInfo);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="modal fade" id="new" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">New Class</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row mt-3 text-center row">
						<div class="col-6 mb-2">
							<h5>Timeslot</h5>
							<select class="form-select" aria-label="Default select" bind:value={classInfo.timeslot}>
								{#each timeslots as timeslot}
								<option value={timeslot}>{timeslot}</option>
								{/each}
							  </select>
						</div>
						<div class="col-6 mb-2">
							<h5>Program</h5>
							<select class="form-select" aria-label="Default select" bind:value={classInfo.program}>
								{#each programs as program}
								<option value={program}>{program}</option>
								{/each}
							  </select>
						</div>
						<div class="col">
							<h5>Batch</h5>
							<input bind:value={classInfo.batch} class="mb-2" />
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
				<button type="button" class="btn btn-secondary" data-bs-dismiss="modal"> Cancel </button>
				<button
					type="button"
					class="btn btn-primary"
					data-bs-dismiss="modal"
					on:click={createNewClass}
				>
					Save
				</button>
			</div>
		</div>
	</div>
</div>
