<script>
	import { setDoc, doc, deleteDoc } from 'firebase/firestore';
	import { db } from '../firebase';
	import {timeslots, programs} from '../dummyData'
	/**
	 * @type {{ id: string; name:string; timeslots: string; programs: string;}}
	 */
	export let teacherInfo = {
		id: '',
		name: '',
		timeslots: [],
		programs: [],
	};

	/**
	 * @param {string} id
	 */
	async function editTeacherData(id) {
		try {
			let { id, ...submitInfo } = teacherInfo;
			await setDoc(doc(db, 'teachers', id), submitInfo);
		} catch (error) {
			console.log(error);
		}
	}
	/**
	 * @param {string} id
	 */
	async function deleteTeacherData(id) {
		try {
			await deleteDoc(doc(db, 'teachers', id));
		} catch (error) {
			console.log(error);
		}
	}
</script>

<div class="modal fade" id="edit" tabindex="-1">
	<div class="modal-dialog modal-dialog-centered modal-dialog-scrollable">
		<div class="modal-content">
			<div class="modal-header">
				<h5 class="modal-title">Edit Teacher</h5>
				<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" />
			</div>
			<div class="modal-body">
				<div class="container">
					<div class="row mt-3 text-center row">
						<div class="mb-2">
							<h5>Name</h5>
							<input bind:value={teacherInfo.name} class="mb-2" />
						</div>
						<div class="mb-2 col-6">
							<h5>Programs</h5>
							{#each programs as program}
								<div class="mr-1">
									<input type="checkbox" bind:group={teacherInfo.programs} value={program} /> {program}
								</div>
							{/each}
						</div>
						<div class="mb-2 col-6">
							<h5>Timeslots</h5>
							{#each timeslots as timeslot}
							<div class="mr-1">
								<input type="checkbox" bind:group={teacherInfo.timeslots} value={timeslot} /> {timeslot}
							</div>
							{/each}
						</div>
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
						deleteTeacherData(teacherInfo.id);
					}}
				>
					Delete
				</button>
				<button
					type="button"
					class="btn btn-primary"
					data-bs-dismiss="modal"
					on:click={() => {
						editTeacherData(teacherInfo.id);
					}}
				>
					Save
				</button>
			</div>
		</div>
	</div>
</div>
