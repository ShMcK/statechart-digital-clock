declare module '@avaragado/xstateful' {
	interface IConfig {
		machine: any
		reducer?: any
	}
	export function createStatefulMachine(config: IConfig): any
	export const Reducer: {
		util: any
		map: any
	}
}
