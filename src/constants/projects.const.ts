import AchievementSeekerProject from '../projects/AchievementSeekerProject.svelte'
import GenshinMaterials from '../projects/GenshinMaterials.svelte'
import IdGenerator from '../projects/IdGenerator.svelte'
import JahminProject from '../projects/JahminProject.svelte'
import OtherProjects from '../projects/OtherProjects.svelte'

export default [
	{
		name: 'jahmin',
		component: JahminProject,
		description: `Jahmin, my pride and joy, I have been working on this app for some years now. A cross platform Music player based on
		ElectronJS and Svelte, capable of handling thousands of songs while the app is being used thanks to the use of Web Workers.`
	},
	{
		name: 'achievement_seeker',
		component: AchievementSeekerProject,
		description:
			'One of the very first big app I created. It was sadly never done. I began the project with Vue.js project then migrated to Svelte. It is an app the served as a focus on Steam achievements. There was a user authentication based on steam login, and it could fetch users achievements. The big twist is that, thanks to a funky algorithm I created, achievements would be split into : Bronze, Silver, Gold and Platinum to mimic the way PlayStation does it.'
	},
	{
		name: 'id-generator',
		component: IdGenerator,
		description: ''
	},
	{
		name: 'genshin-materials',
		component: GenshinMaterials,
		description: ''
	},
	{
		name: 'others...',
		component: OtherProjects,
		description: ''
	}
]
