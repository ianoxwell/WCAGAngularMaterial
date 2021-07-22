import { Injectable } from '@angular/core';
import { fromEvent, Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class StorageService {
	/**
	 * Retrieves a specific item from the browser's local storage.
	 * @param key The item to be retrieved.
	 * @returns The specified item in local storage if it exists, otherwise null.
	 */
	getItem(key: string): string | null {
		return this.getStorage().getItem(key);
	}

	/**
	 * Updates or creates the given item in local storage.
	 * @param key The key of the item to create or update.
	 * @param value The value of the item to create or update.
	 */
	setItem(key: string, value: string): void {
		this.getStorage().setItem(key, value);
	}

	/**
	 * Removes the given item from local storage.
	 * @param key The key of the item to be removed.
	 */
	removeItem(key: string): void {
		this.getStorage().removeItem(key);
	}

	/**
	 * Observes a given item in local storage and updates observer
	 * when the item is updated.
	 * @param key The key of the item to be observed.
	 * @returns An observable that emits the given item's new value
	 * whenever it is updated.
	 */
	observeItem(key: string): Observable<string> {
		const storageObservable$ = fromEvent<StorageEvent>(window, 'storage').pipe(
			filter((event) => event.storageArea === this.getStorage()),
			filter((event) => event.key === key),
			map((event) => event.newValue as string)
		);

		return storageObservable$;
	}

	/**
	 * Fetches the browser's full local storage.
	 * @returns A storage object containing methods to access and update the
	 * browser's local storage.
	 */
	private getStorage(): Storage {
		return window.localStorage;
	}
}
