type ObjectValues<T> = T[keyof T];

// Extending the ReturnType utility type to support async functions
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AwaitedReturnType<T extends (...args: any) => any> = Awaited<
	ReturnType<T>
>;

type NonUndefined<T> = T extends undefined ? never : T;
