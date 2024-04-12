const databaseName = "adventurer";
const databaseVersion = 2;
let db: Promise<IDBDatabase>;


export type ObjectStoreName = "stories" | "characters";

db = new Promise((resolve, reject) => {
    const databaseOpenRequest: IDBOpenDBRequest = indexedDB.open(databaseName, databaseVersion);

    databaseOpenRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        const db = (event.target as IDBOpenDBRequest).result

        db.onerror = (event) => {
            reject(event);
        }

        if (!db.objectStoreNames.contains("stories")) {
            const objectStore = db.createObjectStore("stories", {autoIncrement: true, keyPath: "id"});
            objectStore.createIndex("title", "title", {unique: false});
        }
        if (!db.objectStoreNames.contains("characters")) {
            const objectStore = db.createObjectStore("characters", {autoIncrement: true, keyPath: "id"});
            objectStore.createIndex("name", "name", {unique: true});
        }
    }

    databaseOpenRequest.onsuccess = event => {
        resolve((event.target as IDBOpenDBRequest).result)
    }
})


export function getAll<T>(objectStoreName: ObjectStoreName): Promise<T[]> {
    return db.then((db) => {
        return new Promise((resolve, reject) => {
            const data: T[] = [];
            const objectStore = db.transaction([objectStoreName], "readonly").objectStore(objectStoreName)
            const query = objectStore.openCursor();
            query.onerror = err => {
                reject(err);
            }
            query.onsuccess = (event) => {
                const cursor = event.target.result;

                if (!cursor) {
                    resolve(data);
                    return;
                }

                data.push(cursor.value);
                cursor.continue();
            }
        });

    })
}

export function save<T = any>(objectStoreName: ObjectStoreName, data: T): Promise<number> {
    return db.then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([objectStoreName], 'readwrite');

            transaction.oncomplete = (e) => {
                console.log(e);
                resolve(e);
            }

            transaction.onerror = err => {
                reject(err);
            }

            const objectStore = transaction.objectStore(objectStoreName);
            const addRequest = objectStore.add(data);
            addRequest.onsuccess = event => {
                resolve(event.target.result)
            }
        })
    });
}

export function remove(objectStoreName: ObjectStoreName, id: number) {
    return db.then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([objectStoreName], "readwrite");

            transaction.onerror = err => {
                reject(err);
            }

            transaction. oncomplete = () => {
                resolve(undefined);
            }

            transaction.objectStore(objectStoreName).delete(id);
        });
    });
}

export function update<T = any>(objectStoreName: ObjectStoreName, data: T) {
    return db.then(db => {
        return new Promise((resolve, reject) => {
            const transaction = db.transaction([objectStoreName], "readwrite");

            transaction.onerror = err => {
                reject(err);
            }

            transaction.oncomplete = () => {
                resolve(undefined);
            }

            transaction.objectStore(objectStoreName).put(data);
        });
    });
}