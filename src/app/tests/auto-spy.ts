export type Spy<T> = T & jasmine.SpyObj<T>;

/** Create an object with methods that are autoSpy-ed to use as mock dependency */
// tslint:disable-next-line: no-any
export function autoSpy<T>(obj: new (...args: any[]) => T): Spy<T> {
	const res: SpyOf<T> = {} as SpyOf<T>;

	// turns out that in target:es2015 the methods attached to the prototype are not enumerable
	// so Object.keys returns []. So to workaround that and keep some backwards compatibility
	// - merge with ownPropertyNames - that disregards the enumerable property.
	const keys = [...Object.keys(obj.prototype), ...Object.getOwnPropertyNames(obj.prototype)];

	// TODO the typing here is wrong and needs to be thought out properly
	keys.forEach((key) => {
		res[key as keyof SpyOf<T>] = jasmine.createSpy(key) as SpyOf<T>[keyof T];
	});

	return res as Spy<T>;
}

/** Keeps the types of properties of a type but assigns type of Spy to the methods */
type SpyOf<T> = T &
	// tslint:disable-next-line: no-any
	Partial<{ [k in keyof T]: T[k] extends (...args: any[]) => any ? jasmine.Spy : T[k] }>;
