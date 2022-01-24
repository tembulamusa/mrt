const now  = () => (new Date()).getTime();

export const getFromLocalStorage = (key) => {
    let  entry = localStorage.getItem(key);
    if (!entry) {
        return null;
    }
    let entry_data = JSON.parse(entry);
    console.log("Reading etry from local storage", entry_data.now);
    let expiry = entry_data.now  + entry_data.ttl;

    if (entry_data.ttl && expiry < now()) {
        localStorage.removeItem(key);
        return null;
    }
    return entry_data.value;
} 

export const setLocalStorage = (key, value, ttl) => {

    localStorage.setItem( key, JSON.stringify({
        ttl   : ttl || 0,
        now   : now(),
        value : value
    }));
} 
