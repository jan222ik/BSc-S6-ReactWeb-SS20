type Callback<T> = { (value: T, oldValue: T): void }

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

    createObserver(onUpdate: Callback<T>): void {
        console.log(onUpdate);
        this.observers.push(onUpdate);
    }

    update(value: T): void {
        const old = this._value;
        this._value = value;
        this.notifyObservers(old);
    }

    notifyObservers(oldValue: T): void {
        this.observers.forEach((callback: Callback<T>) => {
            callback(this._value, oldValue);
        })
    }
}

export {Observable};
