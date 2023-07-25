<template>
	<transition appear name="toast">
		<div
			v-if="active"
			:class="[
				`overflow-hidden max-w-[90%]  shadow-xl fixed top-4 right-4 p-4 py-5 rounded-md box border border-dark  bg-white z-[900000000000000]`,
			]"
		>
			<div :style="`width:${BORDER_WIDTH}%`" :class="[`${BG} h-1  absolute  bottom-0 left-0 transition-all duration-300`]" />
			<span @click="closeAlert()">
            <close-icon class="text-dark w-5 absolute right-2 top-2 cursor-pointer  border-[1.5px] border-dark rounded-md" @click="closeAlert()"></close-icon>


			</span>

			<div class="flex items-center pr-12 gap-3">
				<Icon :name="ICON" :class="[`${TEXT} w-7`]" />

				<div>
					<p class="text-semibold">
						{{ message }}
					</p>
				</div>
			</div>
		</div>
	</transition>
</template>

<script lang="ts" setup>
import CloseIcon from '../icons/close-icon.vue'
import {useAlert} from '../../composables/core/useAlert'
import { computed, ref, watch } from 'vue'
const { active, message, closeAlert, type, ALERT_DURATION } = useAlert()

const BORDER_WIDTH = ref(100)

watch(active, (value) => {
	let intervalSequence : any

	if (value) {
		BORDER_WIDTH.value = 100
		intervalSequence = setInterval(() => {
		const substractedValue	= (100 / (ALERT_DURATION / 75)).toFixed(1) as unknown as number
		BORDER_WIDTH.value -= substractedValue
		}, 75)

		setTimeout(() => { clearInterval(intervalSequence) }, ALERT_DURATION)
	}
})
const ICON = computed({
	get: () => {
		switch (type.value) {
			case 'ERROR':
				return 'info'
			case 'SUCCESS':
				return 'check'
			default:
				return 'info'
		}
	},
	set: () => {}
})
const BG = computed({
		get: () => {
			switch (type.value) {
				case 'ERROR':
					return 'bg-red-500'
				case 'SUCCESS':
					return 'bg-green-700'
				default:
					return 'bg-black'
			}
		},
		set: () => {}
	})
const TEXT = computed({
	get: () => {
		switch (type.value) {
			case 'ERROR':
				return 'text-red-500'
			case 'SUCCESS':
				return 'text-green-700'
			default:
				return 'text-black'
		}
	},
	set: () => {}
})
</script>

<style scoped>
/* enter transitions */
.toast-enter-active {
	animation: wobble 0.5s ease;
}

.toast-leave-to {
	opacity: 0;
	transform: translateX(100px);
}
.toast-leave-active {
	transition: all 0.3s ease;
}
@keyframes wobble {
	0% {
		transform: translateX(100px);
		opacity: 0;
	}
	50% {
		transform: translateY(0px);
		opacity: 1;
	}
	60% {
		transform: translateX(14px);
		opacity: 1;
	}
	70% {
		transform: translateX(-14px);
		opacity: 1;
	}
	80% {
		transform: translateX(7px);
		opacity: 1;
	}
	90% {
		transform: translateX(-7px);
		opacity: 1;
	}
	100% {
		transform: translateX(0px);
		opacity: 1;
	}
}
.box {
	box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.1);
}
</style>
