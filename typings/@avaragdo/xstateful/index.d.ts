declare module '@avaragado/xstateful' {
	interface IConfig {
		machine: any
	}
	export function createStatefulMachine(config: IConfig): any
}
