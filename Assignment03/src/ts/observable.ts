type Callback<T> = { (value: T, oldValue: T): void }

/**
 * Generic wrapper class for a value.
 * @field value getter only.
 */
class Observable<T> {
    private _value: T;
    get value(): T {
        return this._value;
    }

    private observers: Callback<T>[];

    constructor(value: T) {
        this._value = value;
        this.observers = [];
    }

    /**
     * Creates an observer callback.
     * @param onUpdate callback of observer.
     */
    createObserver(onUpdate: Callback<T>): void {
        console.log(onUpdate);
        this.observers.push(onUpdate);
    }

    /**
     * Function to update wrapped value and notify all observers aka. execute all callbacks.
     * @param value new value of observable.
     */
    update(value: T): void {
        const old = this._value;
        this._value = value;
        this.notifyObservers(old);
    }

    /**
     * Notifies all observers aka executes all known callbacks.
     * @param oldValue added for comparisons in callbacks.
     */
    notifyObservers(oldValue: T): void {
        this.observers.forEach((callback: Callback<T>) => {
            callback(this._value, oldValue);
        })
    }
}

export {Observable};
